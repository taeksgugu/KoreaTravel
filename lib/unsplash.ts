import type { UnsplashPhoto } from "@/lib/data/types";

type UnsplashSearchResponse = {
  results?: Array<{
    urls?: { regular?: string };
    user?: {
      name?: string;
      links?: { html?: string };
    };
  }>;
};

export async function fetchUnsplashPhoto(query: string): Promise<UnsplashPhoto | null> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key || !query.trim()) {
    return null;
  }

  const endpoint = new URL("https://api.unsplash.com/search/photos");
  endpoint.searchParams.set("query", query);
  endpoint.searchParams.set("per_page", "1");
  endpoint.searchParams.set("orientation", "landscape");

  const response = await fetch(endpoint.toString(), {
    headers: {
      Authorization: `Client-ID ${key}`,
      "Accept-Version": "v1"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as UnsplashSearchResponse;
  const item = data.results?.[0];
  if (!item?.urls?.regular) {
    return null;
  }

  return {
    url: item.urls.regular,
    photographer: item.user?.name ?? "Unknown",
    photographerLink: item.user?.links?.html ?? "https://unsplash.com"
  };
}

