import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainExplorer } from "@/components/MainExplorer";
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
    </div>
  );
}

