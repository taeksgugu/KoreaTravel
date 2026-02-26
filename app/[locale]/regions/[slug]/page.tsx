import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { citiesBySlug } from "@/lib/data/cities";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

export function generateStaticParams() {
  return ["en", "ko"].flatMap((locale) =>
    Object.keys(citiesBySlug).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const city = citiesBySlug[slug as keyof typeof citiesBySlug];
  if (!city) return {};

  const keywordSet = [
    `${city.nameEn} travel`,
    `${city.nameEn} itinerary`,
    `${city.nameEn} attractions`,
    `${city.nameEn} food guide`,
    `${city.nameEn} transport`,
    "Korea region guide",
    ...city.tags.map((tag) => `${city.nameEn} ${tag.toLowerCase()}`)
  ];

  return {
    title: `${city.nameEn} Region Guide`,
    description: `${city.summary} Includes route planning, transport context, food ideas, and themed travel tags.`,
    keywords: keywordSet,
    openGraph: {
      title: `${city.nameEn} Region Guide`,
      description: `${city.summary} Includes route planning, transport context, food ideas, and themed travel tags.`,
      url: `${siteConfig.siteUrl}/${locale}/regions/${city.slug}`,
      images: [
        {
          url: "/quick-access/explore.png",
          width: 1200,
          height: 630,
          alt: `${city.nameEn} region guide`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.nameEn} Region Guide`,
      description: `${city.summary} Includes route planning, transport context, food ideas, and themed travel tags.`,
      images: ["/quick-access/explore.png"]
    },
    alternates: {
      canonical: `/${locale}/regions/${city.slug}`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/regions/${city.slug}`])
      )
    }
  };
}

export default async function RegionLandingPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const city = citiesBySlug[slug as keyof typeof citiesBySlug];
  if (!city) notFound();

  return (
    <article className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Region Landing</p>
        <h1 className="text-3xl font-bold text-slate-900">
          {city.nameEn} ({city.nameKo})
        </h1>
        <p className="text-slate-700">{city.summary}</p>
        <p className="text-sm text-slate-600">Themes: {city.tags.join(", ")}</p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Why {city.nameEn} Works for First-Time Visitors</h2>
        <p className="text-slate-700">
          {city.nameEn} combines accessibility from ICN, local transport practicality, and distinctive travel themes that can
          anchor a focused Korea itinerary. This page is designed for search-driven planning: you can evaluate route logic,
          style fit, and activity density before committing your schedule.
        </p>
        <p className="text-slate-700">
          From a planning perspective, prioritize attractions that align with your pace. If your trip is short, focus on
          high-access neighborhoods and compact day loops. For longer stays, add nearby districts and slower thematic routes.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">3-4 Days</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {city.itineraryShort.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">5-6 Days</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {city.itineraryMedium.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">7+ Days</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {city.itineraryLong.map((line) => (
              <li key={line}>- {line}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">Access from ICN</h3>
          <p className="mt-2 text-sm text-slate-700">{city.fromIcn}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-900">Local Transport</h3>
          <p className="mt-2 text-sm text-slate-700">{city.transport}</p>
        </div>
      </section>

      <footer className="flex flex-wrap gap-3">
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(city.mapsQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Open {city.nameEn} on Google Maps
        </a>
        <Link
          href={`/${locale}/city/${city.slug}`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          Open Full City Detail
        </Link>
      </footer>
    </article>
  );
}
