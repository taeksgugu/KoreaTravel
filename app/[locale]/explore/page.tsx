import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainExplorer } from "@/components/MainExplorer";
import { exploreGuides } from "@/lib/data/exploreGuides";
import { getExploreText } from "@/lib/explore-i18n";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getExploreText(locale);

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical: `/${locale}/explore`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/explore`])
      )
    }
  };
}

export default async function ExplorePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="space-y-4 pb-2">
      <MainExplorer locale={locale} />
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-bold text-slate-900">How to Use Explore Regions</h2>
        <p className="text-slate-700">
          Explore starts with province-level map selection and supports drill-down for cities and counties where available.
          This helps travelers compare areas by access, local attractions, food, stay options, and events before finalizing
          an itinerary.
        </p>
        <p className="text-slate-700">
          Listings are generated from official tourism APIs when available. If live API data is unavailable, fallback data is
          clearly labeled so users can distinguish real-time results from placeholders.
        </p>
      </section>
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-3xl font-bold text-slate-900">
          {locale === "ko" ? "지역별 장문 여행 가이드" : "Long-Form Regional Travel Guides"}
        </h2>
        <p className="text-slate-700">
          {locale === "ko"
            ? "처음 방문하는 여행자가 도시 분위기와 동선을 빠르게 파악할 수 있도록, 핵심 테마별 장문 가이드를 제공합니다."
            : "Designed for first-time visitors, these editorial guides explain where to go, why each area matters, and how to build efficient routes."}
        </p>
        <div className="space-y-4">
          {exploreGuides.map((guide, idx) => (
            <article key={guide.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">
                Guide {idx + 1}
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {locale === "ko" ? guide.titleKo : guide.titleEn}
              </h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                {(locale === "ko" ? guide.bodyKo : guide.bodyEn).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-3">
                <a
                  href={guide.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-blue-700 underline"
                >
                  {locale === "ko" ? guide.mapLabelKo : guide.mapLabelEn}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

