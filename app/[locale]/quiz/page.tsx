import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";
import { QuizClient } from "./QuizClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: "Travel Personality Quiz",
    description:
      "Answer 10 visual questions to get your personalized Korea city recommendations.",
    alternates: {
      canonical: `/${locale}/quiz`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/quiz`])
      )
    }
  };
}

export default async function QuizPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <QuizClient locale={locale} />;
}
