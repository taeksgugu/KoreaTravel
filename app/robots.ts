import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  const host = new URL(base).host;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/en/details",
          "/en/result",
          "/en/quiz"
        ]
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host
  };
}
