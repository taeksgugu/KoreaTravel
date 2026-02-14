import type { UnsplashPhoto } from "@/lib/data/types";
import { getRuntimeEnv } from "@/lib/runtimeEnv";

type TourPhotoItem = {
  galWebImageUrl?: string;
  galPhotographer?: string;
  galTitle?: string;
  galSearchKeyword?: string;
  galPhotographyLocation?: string;
};

type TourPhotoResponse = {
  response?: {
    body?: {
      items?: {
        item?: TourPhotoItem[] | TourPhotoItem;
      };
    };
  };
};

function normalizeServiceKey(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.length > 0)));
}

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildKeywordCandidates(query: string): string[] {
  const q = query.toLowerCase();
  const locationMap: Array<[string, string]> = [
    ["seoul", "서울"],
    ["busan", "부산"],
    ["jeju", "제주"],
    ["incheon", "인천"],
    ["gangneung", "강릉"],
    ["sokcho", "속초"],
    ["jeonju", "전주"],
    ["gyeongju", "경주"],
    ["daegu", "대구"],
    ["andong", "안동"],
    ["yeosu", "여수"],
    ["boryeong", "보령"],
    ["chuncheon", "춘천"],
    ["namhae", "남해"],
    ["damyang", "담양"],
    ["korea", "한국"]
  ];
  const themeMap: Array<[string[], string]> = [
    [["night", "nightlife", "neon"], "야경"],
    [["beach", "coast", "coastal", "ocean", "harbor", "harbour", "sea"], "바다"],
    [["mountain", "hiking", "trail"], "산"],
    [["forest", "bamboo"], "숲"],
    [["temple", "spiritual"], "사찰"],
    [["traditional", "hanok", "heritage", "palace"], "전통"],
    [["food", "restaurant", "street food", "market", "culinary"], "음식"],
    [["island"], "섬"],
    [["city", "urban", "skyline"], "도시"],
    [["cafe", "aesthetic"], "카페"]
  ];

  const locations = locationMap.filter(([needle]) => q.includes(needle)).map(([, ko]) => ko);
  const themes = themeMap
    .filter(([needles]) => needles.some((needle) => q.includes(needle)))
    .map(([, ko]) => ko);

  const candidates: string[] = [];
  if (locations.length && themes.length) {
    candidates.push(`${locations[0]} ${themes[0]}`);
  }
  candidates.push(...locations, ...themes, query);

  return unique(candidates).slice(0, 6);
}

function relevanceScore(item: TourPhotoItem, candidates: string[]): number {
  const text = `${item.galTitle ?? ""} ${item.galSearchKeyword ?? ""} ${item.galPhotographyLocation ?? ""}`.toLowerCase();
  let score = 0;
  for (const candidate of candidates) {
    const c = candidate.toLowerCase();
    if (text.includes(c)) score += 3;
    const pieces = c.split(/\s+/).filter(Boolean);
    for (const piece of pieces) {
      if (piece.length >= 2 && text.includes(piece)) score += 1;
    }
  }
  return score;
}

function parseItems(data: TourPhotoResponse): TourPhotoItem[] {
  const rawItem = data.response?.body?.items?.item;
  if (Array.isArray(rawItem)) return rawItem;
  return rawItem ? [rawItem] : [];
}

export async function fetchUnsplashPhoto(query: string): Promise<UnsplashPhoto | null> {
  const rawKey = getRuntimeEnv("TOUR_PHOTO_API_KEY") ?? getRuntimeEnv("TOUR_API_KEY");
  const key = rawKey ? normalizeServiceKey(rawKey.trim()) : "";
  if (!key || !query.trim()) {
    return null;
  }

  try {
    const rawTrimmed = rawKey?.trim() ?? "";
    const keyCandidates = unique([key, rawTrimmed]);
    const keyParamCandidates = ["serviceKey", "ServiceKey"] as const;
    const searchEndpointCandidates = [
      "https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1",
      "https://apis.data.go.kr/B551011/PhotoGalleryService/gallerySearchList"
    ];
    const listEndpointCandidates = [
      "https://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1",
      "https://apis.data.go.kr/B551011/PhotoGalleryService/galleryList"
    ];
    const queryHash = hashString(query);
    const keywordCandidates = buildKeywordCandidates(query);
    const fallbackPageNo = String((queryHash % 20) + 1);
    const commonParams = {
      numOfRows: "1",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "KoreaTravel",
      _type: "json",
      arrange: "A"
    };

    let items: TourPhotoItem[] = [];
    for (const keyword of keywordCandidates) {
      for (const endpointUrl of searchEndpointCandidates) {
        for (const keyName of keyParamCandidates) {
          for (const serviceKey of keyCandidates) {
            const searchEndpoint = new URL(endpointUrl);
            for (const [paramKey, value] of Object.entries(commonParams)) {
              searchEndpoint.searchParams.set(paramKey, value);
            }
            searchEndpoint.searchParams.set(keyName, serviceKey);
            searchEndpoint.searchParams.set("galSearchKeyword", keyword);

            const response = await fetch(searchEndpoint.toString(), {
              next: { revalidate: 3600 }
            });

            if (!response.ok) continue;
            const data = (await response.json()) as TourPhotoResponse;
            const found = parseItems(data);
            if (found.length) {
              items = items.concat(found);
              break;
            }
          }
          if (items.length >= 8) break;
        }
        if (items.length >= 8) break;
      }
      if (items.length >= 8) break;
    }

    if (!items.length) {
      for (const endpointUrl of listEndpointCandidates) {
        for (const keyName of keyParamCandidates) {
          for (const serviceKey of keyCandidates) {
            const listEndpoint = new URL(endpointUrl);
            for (const [paramKey, value] of Object.entries({
              ...commonParams,
              numOfRows: "10",
              pageNo: fallbackPageNo
            })) {
              listEndpoint.searchParams.set(paramKey, value);
            }
            listEndpoint.searchParams.set(keyName, serviceKey);

            const listResponse = await fetch(listEndpoint.toString(), {
              next: { revalidate: 3600 }
            });
            if (!listResponse.ok) continue;

            const listData = (await listResponse.json()) as TourPhotoResponse;
            items = parseItems(listData);
            if (items.length) break;
          }
          if (items.length) break;
        }
        if (items.length) break;
      }
    }

    const ranked = items.sort(
      (a, b) => relevanceScore(b, keywordCandidates) - relevanceScore(a, keywordCandidates)
    );
    const withImage = ranked.filter(
      (item) => typeof item.galWebImageUrl === "string" && item.galWebImageUrl.trim().length > 0
    );
    const item = withImage.length ? withImage[queryHash % withImage.length] : undefined;
    if (!item) {
      return null;
    }

    return {
      url: item.galWebImageUrl!,
      photographer: item.galPhotographer ?? "Korea Tourism Organization",
      photographerLink: "https://phoko.visitkorea.or.kr"
    };
  } catch {
    return null;
  }
}
