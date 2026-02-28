import type { MetadataRoute } from "next";
import { cities } from "@/lib/data/cities";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const now = new Date();
  const locales = ["en", "ko"];
  const routes = [
    "",
    "/drama",
    "/restaurants",
    "/explore",
    "/regions",
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

  const regionLandingRoutes = locales.flatMap((locale) =>
    cities.map((city) => ({
      url: `${base}/${locale}/regions/${city.slug}`,
      lastModified: now
    }))
  );

  return [...localeRoutes, ...cityRoutes, ...regionLandingRoutes];
}

