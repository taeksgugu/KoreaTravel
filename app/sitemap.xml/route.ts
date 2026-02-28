import { NextResponse } from "next/server";
import { cities } from "@/lib/data/cities";
import { getBaseUrl, supportedLocales } from "@/lib/site";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildUrls(base: string): string[] {
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

  const localeRoutes = supportedLocales.flatMap((locale) =>
    routes.map((route) => `${base}/${locale}${route}`)
  );

  const cityRoutes = supportedLocales.flatMap((locale) =>
    cities.map((city) => `${base}/${locale}/city/${city.slug}`)
  );

  const regionLandingRoutes = supportedLocales.flatMap((locale) =>
    cities.map((city) => `${base}/${locale}/regions/${city.slug}`)
  );

  return [...localeRoutes, ...cityRoutes, ...regionLandingRoutes];
}

export async function GET() {
  const base = getBaseUrl();
  const now = new Date().toISOString();
  const urls = buildUrls(base);

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(
      (url) =>
        `  <url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>daily</changefreq></url>`
    ),
    "</urlset>"
  ].join("\n");

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
