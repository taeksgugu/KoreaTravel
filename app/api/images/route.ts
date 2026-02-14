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

  const rawTrimmed = rawKey?.trim() ?? "";
  const keyCandidates = unique([key, rawTrimmed]);
  const keyParamCandidates = ["serviceKey", "ServiceKey"] as const;
  const commonParams = {
    numOfRows: String(count),
    pageNo: "1",
    MobileOS: "ETC",
    MobileApp: "KoreaTravel",
    _type: "json",
    arrange: "A"
  };

  let items: TourPhotoItem[] = [];
  let lastDebug = "no_attempt";

  for (const keyName of keyParamCandidates) {
    for (const serviceKey of keyCandidates) {
      const searchEndpoint = new URL("https://apis.data.go.kr/B551011/PhotoGalleryService/gallerySearchList");
      for (const [paramKey, value] of Object.entries(commonParams)) {
        searchEndpoint.searchParams.set(paramKey, value);
      }
      searchEndpoint.searchParams.set(keyName, serviceKey);
      searchEndpoint.searchParams.set("galSearchKeyword", query);

      const searchResponse = await fetch(searchEndpoint.toString(), { next: { revalidate: 3600 } });
      if (searchResponse.ok) {
        const searchData = (await searchResponse.json()) as TourPhotoResponse;
        items = parseItems(searchData);
        if (items.length) break;
        lastDebug = `search_ok_empty:${keyName}`;
      } else {
        const body = (await searchResponse.text()).slice(0, 180).replace(/\s+/g, " ");
        lastDebug = `search_${searchResponse.status}:${keyName}:${body}`;
      }
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

        const listResponse = await fetch(listEndpoint.toString(), { next: { revalidate: 3600 } });
        if (listResponse.ok) {
          const listData = (await listResponse.json()) as TourPhotoResponse;
          items = parseItems(listData);
          if (items.length) break;
          lastDebug = `list_ok_empty:${keyName}`;
        } else {
          const body = (await listResponse.text()).slice(0, 180).replace(/\s+/g, " ");
          lastDebug = `list_${listResponse.status}:${keyName}:${body}`;
        }
      }
      if (items.length) break;
    }
  }

  if (!items.length) {
    return Response.json(
      {
        error: "Failed to load tourism photos",
        debug: lastDebug
      },
      { status: 502 }
    );
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
