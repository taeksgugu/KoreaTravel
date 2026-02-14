import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";
import { ResultClient } from "./ResultClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: "Top Korea City Results",
    description:
      "See your top 3 Korean city matches with ranking scores and map pins.",
    alternates: {
      canonical: `/${locale}/result`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/result`])
      )
    }
  };
}

export default async function ResultPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <ResultClient locale={locale} />;
}
