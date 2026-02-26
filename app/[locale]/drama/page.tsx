import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DramaCards } from "@/components/DramaCards";
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
    title: "K-Drama Filming Location Guide",
    description:
      "Browse filming cities by popular K-dramas and jump to city guides and map searches.",
    alternates: {
      canonical: `/${locale}/drama`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/drama`])
      )
    }
  };
}

export default async function DramaPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">K-Drama Travel</h1>
        <p className="text-slate-700">
          This guide connects drama titles to real Korean filming areas and provides map links for trip planning.
          Trailer embeds are used for reference; filming spot descriptions are original editorial summaries.
        </p>
      </header>
      <DramaCards locale={locale} />
      <section className="space-y-2 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-bold text-slate-900">Planning Tips for Drama Location Trips</h2>
        <p className="text-slate-700">
          Combine nearby spots into half-day routes, verify opening hours for palaces/sets in advance, and pair each
          filming stop with local food and transit options to reduce travel backtracking.
        </p>
        <Link href={`/${locale}/faq`} className="text-sm font-semibold text-blue-700 underline">
          Read travel and data FAQ
        </Link>
      </section>
    </section>
  );
}
