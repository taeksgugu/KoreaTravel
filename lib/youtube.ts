export type YouTubePreview = {
  videoId: string;
  title: string;
  watchUrl: string;
  thumbnailUrl: string;
};

function decodeHtml(value: string): string {
  return value
    .replace(/\\u0026/g, "&")
    .replace(/\\u003d/g, "=")
    .replace(/\\u002f/g, "/");
}

export async function fetchYouTubePreview(searchQuery: string): Promise<YouTubePreview | null> {
  const query = searchQuery.trim();
  if (!query) return null;

  const endpoint = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  const response = await fetch(endpoint, {
    next: { revalidate: 60 * 60 * 12 },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36"
    }
  });

  if (!response.ok) return null;
  const html = await response.text();

  const idMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
  if (!idMatch) return null;

  const titleMatch = html.match(/"title":\{"runs":\[\{"text":"([^"]+)"/);
  const videoId = idMatch[1];
  const title = decodeHtml(titleMatch?.[1] ?? "YouTube video");

  return {
    videoId,
    title,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  };
}

