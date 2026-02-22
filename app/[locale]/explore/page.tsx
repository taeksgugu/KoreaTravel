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
    </div>
  );
}

