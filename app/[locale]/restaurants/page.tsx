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
    title: "Korea Restaurant Categories",
    description:
      "Browse city-based food categories and open targeted Google Maps searches.",
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
  return (
    <div className="space-y-4">
      <RestaurantsClient locale={locale} />
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-bold text-slate-900">How This Food Guide Works</h2>
        <p className="text-slate-700">
          We provide original category-based planning notes and map queries to help international travelers discover
          local Korean food areas efficiently. We do not copy third-party review text.
        </p>
        <p className="text-slate-700">
          Use this page to shortlist neighborhoods and cuisine types, then confirm menu, hours, and dietary details
          directly on the destination’s official channels or map listing.
        </p>
      </section>
    </div>
  );
}
