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
  const t = getExploreText(locale);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">{t.heading}</h1>
        <p className="mt-2 text-sm text-slate-700">{t.description}</p>
      </section>
      <MainExplorer locale={locale} />
    </div>
  );
}

