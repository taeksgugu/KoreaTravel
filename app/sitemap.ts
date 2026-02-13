import type { MetadataRoute } from "next";
import { cities } from "@/lib/data/cities";
import { siteConfig, supportedLocales } from "@/lib/site";

const basePaths = ["", "/quiz", "/details", "/result", "/drama", "/restaurants"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const localePages = supportedLocales.flatMap((locale) =>
    basePaths.map((path) => ({
      url: `${siteConfig.siteUrl}/${locale}${path}`,
      lastModified: now
    }))
  );

  const cityPages = supportedLocales.flatMap((locale) =>
    cities.map((city) => ({
      url: `${siteConfig.siteUrl}/${locale}/city/${city.slug}`,
      lastModified: now
    }))
  );

  return [
    { url: siteConfig.siteUrl, lastModified: now },
    ...localePages,
    ...cityPages
  ];
}

