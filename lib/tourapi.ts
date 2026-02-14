import { createMockItems } from "./mock-data";
import { presetById } from "./presets";
import { regionById } from "./regions";
import { subregionById } from "./subregions";
import type { Category, EventStatus, NormalizedItem } from "./types";

type FetchOptions = {
  regionId: string;
  category: Category;
  page: number;
  pageSize: number;
  sort: "latest" | "title";
  presetId?: string;
  subregionId?: string;
  eventStatus?: EventStatus;
};

type FetchResult = {
  items: NormalizedItem[];
  hasMore: boolean;
  source: "tourapi" | "mock" | "public-festival";
  debug?: string;
};

function parseYmd(value: string | null): Date | null {
  if (!value) return null;
  if (/^\d{8}$/.test(value)) {
    const y = Number(value.slice(0, 4));
    const m = Number(value.slice(4, 6)) - 1;
    const d = Number(value.slice(6, 8));
    return new Date(y, m, d);
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function filterEventsByStatus(items: NormalizedItem[], status: EventStatus): NormalizedItem[] {
  if (status === "all") return items;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return items.filter((item) => {
    const start = parseYmd(item.startDate);
    const end = parseYmd(item.endDate);
    if (status === "ongoing") {
      if (!start || !end) return false;
      return start <= today && today <= end;
    }
    if (status === "upcoming") {
      if (!start) return false;
      return start > today;
    }
    return true;
  });
}

const TOUR_API_BASE_CANDIDATES = Array.from(
  new Set(
    [
      process.env.TOUR_API_BASE_URL,
      "https://apis.data.go.kr/B551011/KorService2",
      "https://apis.data.go.kr/B551011/EngService2"
    ].filter((value): value is string => Boolean(value))
  )
);

function normalizeServiceKey(rawKey: string | undefined): string | undefined {
  if (!rawKey) return undefined;
  const trimmed = rawKey.trim();
  if (!trimmed) return undefined;
  if (!trimmed.includes("%")) return trimmed;
  try {
    return decodeURIComponent(trimmed);
  } catch {
    return trimmed;
  }
}

const contentTypeByCategory: Record<Category, string> = {
  attractions: "12",
  food: "39",
  stay: "32",
  events: "15"
};

function resolveTourApiKey() {
  return normalizeServiceKey(
    process.env.TOUR_API_KEY ??
      process.env.TOUR_API_SERVICE_KEY ??
      process.env.SERVICE_KEY ??
      process.env.SERVICEKEY
  );
}

function normalizeTourItem(raw: Record<string, unknown>, category: Category): NormalizedItem {
  return {
    id: String(raw.contentid ?? raw.contentId ?? ""),
    title: String(raw.title ?? "Untitled"),
    category,
    addr: String(raw.addr1 ?? raw.addr ?? ""),
    mapx: raw.mapx ? Number(raw.mapx) : null,
    mapy: raw.mapy ? Number(raw.mapy) : null,
    firstImage: raw.firstimage ? String(raw.firstimage) : null,
    tel: raw.tel ? String(raw.tel) : null,
    overview: raw.overview ? String(raw.overview) : null,
    startDate: raw.eventstartdate ? String(raw.eventstartdate) : null,
    endDate: raw.eventenddate ? String(raw.eventenddate) : null,
    source: "tourapi"
  };
}

function normalizePublicFestivalItem(raw: Record<string, unknown>): NormalizedItem {
  return {
    id: String(raw.id ?? raw.FESTIVAL_ID ?? raw.MNG_NO ?? Math.random()),
    title: String(raw.title ?? raw.FESTIVAL_NM ?? raw.EVENT_NM ?? "Festival"),
    category: "events",
    addr: String(raw.addr ?? raw.ADDR ?? raw.RDNMADR ?? raw.LNMADR ?? ""),
    mapx: raw.mapx ? Number(raw.mapx) : raw.LOGITUDE ? Number(raw.LOGITUDE) : null,
    mapy: raw.mapy ? Number(raw.mapy) : raw.LATITUDE ? Number(raw.LATITUDE) : null,
    firstImage: null,
    tel: raw.tel ? String(raw.tel) : raw.PHONE_NUMBER ? String(raw.PHONE_NUMBER) : null,
    overview: raw.overview ? String(raw.overview) : raw.FESTIVAL_CN ? String(raw.FESTIVAL_CN) : null,
    startDate: raw.startDate ? String(raw.startDate) : raw.OPER_STRT_DE ? String(raw.OPER_STRT_DE) : null,
    endDate: raw.endDate ? String(raw.endDate) : raw.OPER_END_DE ? String(raw.OPER_END_DE) : null,
    source: "public-festival"
  };
}

async function callTourApi(endpoint: string, params: URLSearchParams) {
  const keyCandidates = Array.from(
    new Set([params.get("serviceKey") ?? "", resolveTourApiKey() ?? ""])
  ).filter(Boolean);
  const keyParamNames = ["serviceKey", "ServiceKey"] as const;

  let lastError = "tourapi:no_attempt";

  for (const base of TOUR_API_BASE_CANDIDATES) {
    for (const keyParam of keyParamNames) {
      for (const key of keyCandidates) {
        const p = new URLSearchParams(params);
        p.delete("serviceKey");
        p.delete("ServiceKey");
        p.set(keyParam, key);

        const response = await fetch(`${base}/${endpoint}?${p.toString()}`, {
          next: { revalidate: 900 }
        });

        if (!response.ok) {
          const body = (await response.text()).slice(0, 220).replace(/\s+/g, " ");
          lastError = `tourapi_http_${response.status}:${base}:${keyParam}:${body}`;
          continue;
        }

        const json = (await response.json()) as {
          response?: {
            header?: {
              resultCode?: string;
              resultMsg?: string;
            };
            body?: {
              items?: {
                item?: Record<string, unknown>[] | Record<string, unknown>;
              };
              totalCount?: number;
            };
          };
        };

        const resultCode = String(json.response?.header?.resultCode ?? "0000");
        const resultMsg = String(json.response?.header?.resultMsg ?? "OK");
        if (resultCode !== "0000") {
          lastError = `tourapi_result_${resultCode}:${resultMsg}:${base}:${keyParam}`;
          continue;
        }

        const itemNode = json.response?.body?.items?.item;
        if (!itemNode) {
          lastError = `tourapi_empty:${base}:${endpoint}:${keyParam}`;
          continue;
        }

        const items = Array.isArray(itemNode) ? itemNode : [itemNode];
        const totalCount = Number(json.response?.body?.totalCount ?? items.length);
        if (totalCount <= 0 || items.length === 0) {
          lastError = `tourapi_empty_total:${base}:${endpoint}:${keyParam}`;
          continue;
        }

        return { items, totalCount };
      }
    }
  }

  throw new Error(lastError);
}

async function fetchPublicFestival(options: FetchOptions): Promise<NormalizedItem[] | null> {
  const endpoint = process.env.PUBLIC_FESTIVAL_API_ENDPOINT;
  const key = process.env.PUBLIC_DATA_API_KEY;
  if (!endpoint || !key) return null;

  const params = new URLSearchParams({
    serviceKey: key,
    pageNo: String(options.page),
    numOfRows: String(options.pageSize),
    type: "json"
  });

  const response = await fetch(`${endpoint}?${params.toString()}`, { next: { revalidate: 900 } });
  if (!response.ok) return null;

  const json = (await response.json()) as Record<string, unknown>;
  const rows =
    (json.data as Record<string, unknown>[] | undefined) ??
    (json.response as { body?: { items?: { item?: Record<string, unknown>[] } } } | undefined)?.body?.items?.item;

  if (!rows || !Array.isArray(rows)) return null;

  return rows.map(normalizePublicFestivalItem);
}

export async function fetchRegionItems(options: FetchOptions): Promise<FetchResult> {
  const region = regionById[options.regionId];
  if (!region) {
    const mock = createMockItems(options.regionId, options.category, options.page, options.pageSize);
    return {
      items:
        options.category === "events"
          ? filterEventsByStatus(mock.items, options.eventStatus ?? "all")
          : mock.items,
      hasMore: mock.hasMore,
      source: "mock",
      debug: "mock_reason:unknown_region"
    };
  }

  const tourApiKey = resolveTourApiKey();
  if (!tourApiKey) {
    const mock = createMockItems(region.name_en, options.category, options.page, options.pageSize);
    return {
      items:
        options.category === "events"
          ? filterEventsByStatus(mock.items, options.eventStatus ?? "all")
          : mock.items,
      hasMore: mock.hasMore,
      source: "mock",
      debug: "mock_reason:missing_tour_api_key"
    };
  }

  const preset = options.presetId ? presetById[options.presetId] : undefined;
  const subregion = options.subregionId ? subregionById[options.subregionId] : undefined;
  const lDongRegnCd = region.admin_code;
  const rawSignguCode = subregion?.sigunguCode ?? preset?.sigunguCode;
  const lDongSignguCd =
    rawSignguCode && /^\d{3}$/.test(rawSignguCode) ? rawSignguCode : undefined;
  const arrange = options.sort === "latest" ? "C" : "A";

  try {
    if (options.category === "events") {
      const festivalFallback = await fetchPublicFestival(options);
      if (festivalFallback && festivalFallback.length > 0) {
        const filteredFestival = filterEventsByStatus(
          festivalFallback,
          options.eventStatus ?? "all"
        );
        return {
          items: filteredFestival,
          hasMore: festivalFallback.length >= options.pageSize,
          source: "public-festival",
          debug: "source:public_festival_fallback"
        };
      }
    }

    const endpoint = preset || subregion ? "searchKeyword2" : "areaBasedList2";

    const params = new URLSearchParams({
      serviceKey: tourApiKey,
      MobileApp: "KoreaTravel",
      MobileOS: "ETC",
      _type: "json",
      numOfRows: String(options.pageSize),
      pageNo: String(options.page),
      arrange,
      listYN: "Y"
    });

    if (lDongRegnCd) params.set("lDongRegnCd", lDongRegnCd);
    if (lDongSignguCd) params.set("lDongSignguCd", lDongSignguCd);

    if (endpoint === "searchKeyword2") {
      params.set("keyword", subregion?.keywordKo ?? preset?.keywordKo ?? region.name_ko);
      params.set("contentTypeId", contentTypeByCategory[options.category]);
    } else {
      params.set("contentTypeId", contentTypeByCategory[options.category]);
    }

    const { items, totalCount } = await callTourApi(endpoint, params);

    const normalized = items.map((item) => normalizeTourItem(item, options.category));
    const filtered =
      options.category === "events"
        ? filterEventsByStatus(normalized, options.eventStatus ?? "all")
        : normalized;
    const hasMore = options.page * options.pageSize < totalCount;

    return {
      items: filtered,
      hasMore,
      source: "tourapi",
      debug: `source:tourapi:${endpoint}:${lDongRegnCd ?? "none"}:${lDongSignguCd ?? "none"}`
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message.slice(0, 220) : "unknown_tourapi_error";
    const mock = createMockItems(region.name_en, options.category, options.page, options.pageSize);
    return {
      items:
        options.category === "events"
          ? filterEventsByStatus(mock.items, options.eventStatus ?? "all")
          : mock.items,
      hasMore: mock.hasMore,
      source: "mock",
      debug: `mock_reason:tourapi_request_failed:${errorMessage}`
    };
  }
}
