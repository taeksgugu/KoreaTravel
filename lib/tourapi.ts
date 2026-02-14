import { createMockItems } from "./mock-data";
import { presetById } from "./presets";
import { regionById } from "./regions";
import { subregionById } from "./subregions";
import type { Category, NormalizedItem } from "./types";

type FetchOptions = {
  regionId: string;
  category: Category;
  page: number;
  pageSize: number;
  sort: "latest" | "title";
  presetId?: string;
  subregionId?: string;
};

const TOUR_API_BASE = process.env.TOUR_API_BASE_URL ?? "https://apis.data.go.kr/B551011/KorService1";

const areaCodeByRegion: Record<string, string> = {
  seoul: "1",
  incheon: "2",
  daejeon: "3",
  daegu: "4",
  gwangju: "5",
  busan: "6",
  ulsan: "7",
  sejong: "8",
  gyeonggi: "31",
  gangwon: "32",
  chungbuk: "33",
  chungnam: "34",
  gyeongbuk: "35",
  gyeongnam: "36",
  jeonbuk: "37",
  jeonnam: "38",
  jeju: "39"
};

const contentTypeByCategory: Record<Category, string> = {
  attractions: "12",
  food: "39",
  stay: "32",
  events: "15"
};

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
  const response = await fetch(`${TOUR_API_BASE}/${endpoint}?${params.toString()}`, {
    next: { revalidate: 900 }
  });

  if (!response.ok) {
    throw new Error(`TourAPI request failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    response?: {
      body?: {
        items?: {
          item?: Record<string, unknown>[] | Record<string, unknown>;
        };
        totalCount?: number;
      };
    };
  };

  const itemNode = json.response?.body?.items?.item;
  if (!itemNode) return { items: [], totalCount: 0 };

  const items = Array.isArray(itemNode) ? itemNode : [itemNode];
  const totalCount = Number(json.response?.body?.totalCount ?? items.length);

  return { items, totalCount };
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

export async function fetchRegionItems(options: FetchOptions): Promise<{ items: NormalizedItem[]; hasMore: boolean; source: "tourapi" | "mock" | "public-festival" }> {
  const region = regionById[options.regionId];
  if (!region) {
    return { ...createMockItems(options.regionId, options.category, options.page, options.pageSize), source: "mock" };
  }

  const tourApiKey = process.env.TOUR_API_KEY;
  if (!tourApiKey) {
    return { ...createMockItems(region.name_en, options.category, options.page, options.pageSize), source: "mock" };
  }

  const preset = options.presetId ? presetById[options.presetId] : undefined;
  const subregion = options.subregionId ? subregionById[options.subregionId] : undefined;
  const areaCode = subregion?.areaCode ?? preset?.areaCode ?? areaCodeByRegion[options.regionId];
  const sigunguCode = subregion?.sigunguCode ?? preset?.sigunguCode;
  const arrange = options.sort === "latest" ? "C" : "A";

  try {
    if (options.category === "events") {
      const festivalFallback = await fetchPublicFestival(options);
      if (festivalFallback && festivalFallback.length > 0) {
        return {
          items: festivalFallback,
          hasMore: festivalFallback.length >= options.pageSize,
          source: "public-festival"
        };
      }
    }

    const endpoint = preset || subregion ? "searchKeyword1" : options.category === "events" ? "searchFestival1" : "areaBasedList1";

    const params = new URLSearchParams({
      serviceKey: tourApiKey,
      MobileApp: "KoreaTravel",
      MobileOS: "ETC",
      _type: "json",
      numOfRows: String(options.pageSize),
      pageNo: String(options.page),
      arrange
    });

    if (areaCode) params.set("areaCode", areaCode);
    if (sigunguCode) params.set("sigunguCode", sigunguCode);

    if (endpoint === "searchKeyword1") {
      params.set("keyword", subregion?.keywordKo ?? preset?.keywordKo ?? region.name_ko);
      params.set("contentTypeId", contentTypeByCategory[options.category]);
    } else if (endpoint === "searchFestival1") {
      params.set("eventStartDate", new Date().toISOString().slice(0, 10).replace(/-/g, ""));
      if (subregion?.keywordKo || preset?.keywordKo) {
        params.set("keyword", subregion?.keywordKo ?? preset?.keywordKo ?? "");
      }
      params.set("contentTypeId", contentTypeByCategory[options.category]);
    } else {
      params.set("contentTypeId", contentTypeByCategory[options.category]);
    }

    const { items, totalCount } = await callTourApi(endpoint, params);

    const normalized = items.map((item) => normalizeTourItem(item, options.category));
    const hasMore = options.page * options.pageSize < totalCount;

    return { items: normalized, hasMore, source: "tourapi" };
  } catch {
    return { ...createMockItems(region.name_en, options.category, options.page, options.pageSize), source: "mock" };
  }
}
