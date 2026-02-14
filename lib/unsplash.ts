import type { UnsplashPhoto } from "@/lib/data/types";
import { getRuntimeEnv } from "@/lib/runtimeEnv";

type TourPhotoItem = {
  galWebImageUrl?: string;
  galPhotographer?: string;
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
    const commonParams = {
      numOfRows: "1",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "KoreaTravel",
      _type: "json",
      arrange: "A"
    };

    let items: TourPhotoItem[] = [];
    for (const keyName of keyParamCandidates) {
      for (const serviceKey of keyCandidates) {
        const searchEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/gallerySearchList");
        for (const [paramKey, value] of Object.entries(commonParams)) {
          searchEndpoint.searchParams.set(paramKey, value);
        }
        searchEndpoint.searchParams.set(keyName, serviceKey);
        searchEndpoint.searchParams.set("galSearchKeyword", query);

        const response = await fetch(searchEndpoint.toString(), {
          next: { revalidate: 3600 }
        });

        if (!response.ok) continue;
        const data = (await response.json()) as TourPhotoResponse;
        items = parseItems(data);
        if (items.length) break;
      }
      if (items.length) break;
    }

    if (!items.length) {
      for (const keyName of keyParamCandidates) {
        for (const serviceKey of keyCandidates) {
          const listEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/galleryList");
          for (const [paramKey, value] of Object.entries(commonParams)) {
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
    }

    const item = items[0];
    if (!item?.galWebImageUrl) {
      return null;
    }

    return {
      url: item.galWebImageUrl,
      photographer: item.galPhotographer ?? "Korea Tourism Organization",
      photographerLink: "https://phoko.visitkorea.or.kr"
    };
  } catch {
    return null;
  }
}
