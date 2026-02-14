import type { UnsplashPhoto } from "@/lib/data/types";
import { getRuntimeEnv } from "@/lib/runtimeEnv";

type UnsplashSearchResponse = {
  results?: Array<{
    urls?: { regular?: string };
    user?: {
      name?: string;
      links?: { html?: string };
    };
  }>;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();
  const rawCount = Number(searchParams.get("count") ?? "2");
  const count = Number.isFinite(rawCount) ? Math.min(Math.max(rawCount, 1), 2) : 2;

  if (!query) {
    return Response.json({ error: "query is required" }, { status: 400 });
  }

  const key = getRuntimeEnv("UNSPLASH_ACCESS_KEY");
  if (!key) {
    return Response.json({ photos: [] as UnsplashPhoto[], warning: "UNSPLASH_ACCESS_KEY is not configured." });
  }

  const endpoint = new URL("https://api.unsplash.com/search/photos");
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("per_page", String(count));
  endpoint.searchParams.set("orientation", "landscape");

  const response = await fetch(endpoint.toString(), {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return Response.json({ error: "Failed to load Unsplash photos" }, { status: 502 });
  }

  const data = (await response.json()) as UnsplashSearchResponse;
  const photos: UnsplashPhoto[] = (data.results ?? []).map((item) => ({
    url: item.urls?.regular ?? "",
    photographer: item.user?.name ?? "Unknown",
    photographerLink: item.user?.links?.html ?? "https://unsplash.com"
  })).filter((photo) => photo.url.length > 0);

  return Response.json(
    { photos },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
      }
    }
  );
}
