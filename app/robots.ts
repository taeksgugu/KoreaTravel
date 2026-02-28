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
          "/ko/details",
          "/en/result",
          "/ko/result",
          "/en/quiz",
          "/ko/quiz"
        ]
      }
    ],
    sitemap: `${base}/sitemap.xml`,
    host
  };
}
