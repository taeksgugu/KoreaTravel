import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainExplorer } from "@/components/MainExplorer";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: "Korea Region Map Explorer",
    description: "Explore Korea regions and drill-down subregions to load attractions, food, stay, and event data.",
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
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Korea Regional Explorer</h1>
        <p className="mt-2 text-sm text-slate-700">
          Click a province and optionally drill down into key city/county polygons, then browse attractions,
          food, stay, and events.
        </p>
      </section>
      <MainExplorer locale={locale} />
    </div>
  );
}
