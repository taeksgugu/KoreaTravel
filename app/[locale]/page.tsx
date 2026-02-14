import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { adsenseSlots } from "@/lib/adsense";
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
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Korea Travel Personality Quiz and City Recommendations",
    url: `${siteConfig.siteUrl}/${locale}`,
    inLanguage: locale,
    description:
      "Discover your best-fit Korean destinations with a travel personality quiz, trip details, and map-based results."
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does the KoreaTravel recommendation work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The system scores your quiz vibe tags and travel details, then returns top city matches with reasons and access notes from Incheon."
        }
      },
      {
        "@type": "Question",
        name: "Can I use KoreaTravel without speaking Korean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Recommendations include English-accessibility notes and practical transport tips for international visitors."
        }
      },
      {
        "@type": "Question",
        name: "Where do the travel photos come from?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Photos are served through the Unsplash API with photographer attribution and profile links."
        }
      }
    ]
  };

  return (
    <div className="space-y-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">K-Travel Type</p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">{text.brand}</h1>
          <p className="max-w-xl text-lg text-slate-700">{text.subtitle}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href={`/${locale}/quiz`}
              className="rounded-full bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800"
            >
              {text.takeQuiz}
            </Link>
            <Link
              href={`/${locale}/drama`}
              className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50"
            >
              {text.drama}
            </Link>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">How it works</h2>
          <ol className="list-decimal space-y-2 pl-5 text-slate-700">
            <li>Take a 10-question visual quiz.</li>
            <li>Add your group, driving plan, Korean level, duration, and budget.</li>
            <li>Get your top 3 Korean cities with map-based previews.</li>
            <li>Open full city itineraries, drama spots, and food guides.</li>
          </ol>
        </div>
      </section>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4 text-slate-700">
          <article>
            <h3 className="font-semibold text-slate-900">How does the recommendation engine rank cities?</h3>
            <p className="mt-1 text-sm">
              It combines your quiz tag matches with trip details like group type, driving, Korean level,
              and trip duration to score each city.
            </p>
          </article>
          <article>
            <h3 className="font-semibold text-slate-900">Is this useful for first-time visitors to Korea?</h3>
            <p className="mt-1 text-sm">
              Yes. The result cards include ICN access notes and English-friendliness guidance for each city.
            </p>
          </article>
          <article>
            <h3 className="font-semibold text-slate-900">Do you use copied reviews from other sites?</h3>
            <p className="mt-1 text-sm">
              No. The platform uses original descriptions and links out to Google Maps searches for discovery.
            </p>
          </article>
        </div>
      </section>
      <AdSenseUnit slot={adsenseSlots.home} />
    </div>
  );
}
