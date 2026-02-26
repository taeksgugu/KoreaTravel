import type { MetadataRoute } from "next";
import { cities } from "@/lib/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visitkoreaguide.org";
  const now = new Date();
  const locales = ["en", "ko"];
  const routes = [
    "",
    "/drama",
    "/restaurants",
    "/explore",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/editorial-policy"
  ];

  const localeRoutes = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route}`,
      lastModified: now
    }))
  );

  const cityRoutes = locales.flatMap((locale) =>
    cities.map((city) => ({
      url: `${base}/${locale}/city/${city.slug}`,
      lastModified: now
    }))
  );

  return [...localeRoutes, ...cityRoutes];
}
