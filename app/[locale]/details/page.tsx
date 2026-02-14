import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";
import { DetailsClient } from "./DetailsClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: "Trip Details Input",
    description:
      "Add group type, driving plan, Korean level, duration, and budget for better recommendations.",
    alternates: {
      canonical: `/${locale}/details`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/details`])
      )
    }
  };
}

export default async function DetailsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <DetailsClient locale={locale} />;
}
