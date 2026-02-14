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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();
  const rawCount = Number(searchParams.get("count") ?? "2");
  const count = Number.isFinite(rawCount) ? Math.min(Math.max(rawCount, 1), 2) : 2;

  if (!query) {
    return Response.json({ error: "query is required" }, { status: 400 });
  }

  const rawKey = getRuntimeEnv("TOUR_PHOTO_API_KEY") ?? getRuntimeEnv("TOUR_API_KEY");
  const key = rawKey ? normalizeServiceKey(rawKey.trim()) : "";
  if (!key) {
    return Response.json({
      photos: [] as UnsplashPhoto[],
      warning: "TOUR_PHOTO_API_KEY (or TOUR_API_KEY) is not configured."
    });
  }

  const baseParams = new URLSearchParams({
    serviceKey: key,
    numOfRows: String(count),
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "KoreaTravel",
    _type: "json",
    arrange: "A"
  });

  const searchEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/gallerySearchList");
  baseParams.forEach((value, keyName) => searchEndpoint.searchParams.set(keyName, value));
  searchEndpoint.searchParams.set("galSearchKeyword", query);

  const searchResponse = await fetch(searchEndpoint.toString(), { next: { revalidate: 3600 } });

  let items: TourPhotoItem[] = [];
  if (searchResponse.ok) {
    const searchData = (await searchResponse.json()) as TourPhotoResponse;
    items = parseItems(searchData);
  }

  if (!items.length) {
    const listEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/galleryList");
    baseParams.forEach((value, keyName) => listEndpoint.searchParams.set(keyName, value));
    const listResponse = await fetch(listEndpoint.toString(), { next: { revalidate: 3600 } });

    if (!listResponse.ok) {
      return Response.json(
        {
          error: "Failed to load tourism photos",
          debug: `upstream_status:${listResponse.status}`
        },
        { status: 502 }
      );
    }

    const listData = (await listResponse.json()) as TourPhotoResponse;
    items = parseItems(listData);
  }

  const photos: UnsplashPhoto[] = items
    .map((item) => ({
      url: item.galWebImageUrl ?? "",
      photographer: item.galPhotographer ?? "Korea Tourism Organization",
      photographerLink: "https://phoko.visitkorea.or.kr"
    }))
    .filter((photo) => photo.url.length > 0);

  return Response.json(
    { photos },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    }
  );
}
