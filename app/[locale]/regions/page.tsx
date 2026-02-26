import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cities } from "@/lib/data/cities";
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
    title: "Korea Regions and City Landing Pages",
    description:
      "Browse crawlable Korea city landing pages with travel themes, route ideas, food focus, and transport notes.",
    keywords: [
      "Korea regions",
      "Korea city guides",
      "Seoul Jeju Busan travel pages",
      "Korea travel themes"
    ],
    openGraph: {
      title: "Korea Regions and City Landing Pages",
      description:
        "Browse crawlable Korea city landing pages with travel themes, route ideas, food focus, and transport notes.",
      url: `${siteConfig.siteUrl}/${locale}/regions`,
      images: [
        {
          url: "/quick-access/explore.png",
          width: 1200,
          height: 630,
          alt: "Korea regions and city landing pages"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Korea Regions and City Landing Pages",
      description:
        "Browse crawlable Korea city landing pages with travel themes, route ideas, food focus, and transport notes.",
      images: ["/quick-access/explore.png"]
    },
    alternates: {
      canonical: `/${locale}/regions`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/regions`])
      )
    }
  };
}

export default async function RegionsIndexPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5">
      <h1 className="text-3xl font-bold text-slate-900">Korea Regions</h1>
      <p className="text-slate-700">
        Use these region landing pages for city-specific planning details, travel themes, and itinerary context.
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/${locale}/regions/${city.slug}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">{city.tags.slice(0, 2).join(" / ")}</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{city.nameEn}</p>
            <p className="text-sm text-slate-600">{city.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

