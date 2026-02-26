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
    keywords: [
      "Korea quiz results",
      "Korea city match",
      "Seoul Busan Jeju recommendations",
      "Korea travel personality result"
    ],
    openGraph: {
      title: "Top Korea City Results",
      description: "See your top 3 Korean city matches with ranking scores and map pins.",
      url: `${siteConfig.siteUrl}/${locale}/result`,
      images: [
        {
          url: "/quick-access/explore.png",
          width: 1200,
          height: 630,
          alt: "KoreaTravel top city result map"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Top Korea City Results",
      description: "See your top 3 Korean city matches with ranking scores and map pins.",
      images: ["/quick-access/explore.png"]
    },
    robots: {
      index: false,
      follow: true
    },
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
