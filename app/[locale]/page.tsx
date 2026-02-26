import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: "Korea Travel Personality Quiz and City Recommendations",
    description:
      "Discover your best-fit Korean destinations with a travel personality quiz, trip details, and map-based results.",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}`])
      )
    }
  };
}

export default async function LocaleHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const text = t(locale);
  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KoreaTravel",
    url: `${siteConfig.siteUrl}/${locale}`,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.siteUrl}/${locale}/restaurants`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-sm">
        <Image
          src="https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=80"
          alt="Korea palace at dusk"
          width={1200}
          height={420}
          className="h-[420px] w-full object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
          <div className="mt-40 space-y-3">
            <p className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
              Welcome to Korea
            </p>
            <h1 className="text-5xl font-extrabold leading-tight text-white">{text.brand}</h1>
            <p className="text-base text-slate-100">{text.subtitle}</p>
          </div>
        </div>
      </section>
      <section className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
        <h2 className="text-3xl font-bold text-blue-800">Find your travel style</h2>
        <p className="mt-2 text-slate-700">Take our 1-minute quiz for personalized picks.</p>
        <Link
          href={`/${locale}/quiz`}
          className="mt-4 block rounded-xl bg-blue-700 py-3 text-center text-lg font-bold text-white"
        >
          Start Quiz
        </Link>
      </section>
      <section>
        <h2 className="mb-3 text-4xl font-bold text-slate-900">Quick Access</h2>
        <div className="grid grid-cols-3 gap-3">
          <Link href={`/${locale}/explore`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
            <Image
              src="/quick-access/explore.jpg"
              alt="Explore Korea"
              width={600}
              height={240}
              className="h-24 w-full rounded-xl object-cover"
            />
            <p className="pt-2 text-center text-sm font-semibold text-slate-800">Explore</p>
          </Link>
          <Link href={`/${locale}/drama`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2">
            <Image
              src="/quick-access/k-drama.jpg"
              alt="Drama spots"
              width={600}
              height={240}
              className="h-24 w-full rounded-xl object-cover"
            />
            <p className="pt-2 text-center text-sm font-semibold text-slate-800">K-Drama</p>
          </Link>
          <Link
            href={`/${locale}/restaurants`}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2"
          >
            <Image
              src="/quick-access/k-food.jpg"
              alt="Korean food"
              width={600}
              height={240}
              className="h-24 w-full rounded-xl object-cover"
            />
            <p className="pt-2 text-center text-sm font-semibold text-slate-800">K-Food</p>
          </Link>
        </div>
      </section>
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-3xl font-bold text-slate-900">How We Build Better Korea Itineraries</h2>
        <p className="text-slate-700">
          KoreaTravel combines a personality quiz with practical travel constraints to help visitors choose destinations
          that fit their pace, interests, and logistics. Our recommendations are not random lists: they are generated from
          travel vibe tags, transport accessibility from Incheon International Airport, expected language comfort, and trip duration.
        </p>
        <p className="text-slate-700">
          We focus on useful planning outcomes: where to go first, how many days to allocate, and what to prioritize for
          culture, food, coastal scenery, or nightlife. This helps first-time visitors avoid overpacked schedules and focus on
          regions that actually match their trip style.
        </p>
      </section>
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-3xl font-bold text-slate-900">Data Transparency</h2>
        <p className="text-slate-700">
          Destination listings and regional tourism records are sourced from official public tourism APIs where available.
          We publish original summaries and avoid copying social review text. Restaurant pages provide map search pathways,
          not scraped or duplicated ratings content.
        </p>
        <p className="text-slate-700">
          If a live source is temporarily unavailable, fallback data is labeled accordingly. We continuously review pages for
          outdated transport details, location changes, and event timing updates.
        </p>
      </section>
    </div>
  );
}
