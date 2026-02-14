import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";
import { RestaurantsClient } from "./RestaurantsClient";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: "Korea Restaurant Guide by City and Food Category",
    description:
      "Explore city-based Korean food categories and open focused Google Maps searches for each local cuisine type.",
    alternates: {
      canonical: `/${locale}/restaurants`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/restaurants`])
      )
    }
  };
}

export default async function RestaurantsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <RestaurantsClient locale={locale} />;
}
