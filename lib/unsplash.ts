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
    const baseParams = new URLSearchParams({
      serviceKey: key,
      numOfRows: "1",
      pageNo: "1",
      MobileOS: "ETC",
      MobileApp: "KoreaTravel",
      _type: "json",
      arrange: "A"
    });

    const searchEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/gallerySearchList");
    baseParams.forEach((value, keyName) => searchEndpoint.searchParams.set(keyName, value));
    searchEndpoint.searchParams.set("galSearchKeyword", query);

    const response = await fetch(searchEndpoint.toString(), {
      next: { revalidate: 3600 }
    });

    let items: TourPhotoItem[] = [];
    if (response.ok) {
      const data = (await response.json()) as TourPhotoResponse;
      items = parseItems(data);
    }

    if (!items.length) {
      const listEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/galleryList");
      baseParams.forEach((value, keyName) => listEndpoint.searchParams.set(keyName, value));
      const listResponse = await fetch(listEndpoint.toString(), {
        next: { revalidate: 3600 }
      });
      if (!listResponse.ok) return null;
      const listData = (await listResponse.json()) as TourPhotoResponse;
      items = parseItems(listData);
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
