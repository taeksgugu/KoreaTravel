import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visitkoreaguide.org";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/en/details", "/ko/details", "/en/result", "/ko/result"] }
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}
