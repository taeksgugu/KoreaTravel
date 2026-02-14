import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visitkoreaguide.org";
  const now = new Date();
  const locales = ["en", "ko"];
  const routes = ["", "/quiz", "/details", "/result", "/drama", "/restaurants", "/explore"];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: now
    }))
  );
}
