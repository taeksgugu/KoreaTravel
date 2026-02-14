import type { Metadata } from "next";
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
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">K-Drama Filming City Guide</h1>
        <p className="mt-2 text-slate-700">
          Click trailer thumbnails to open YouTube embed playback. Closing the modal removes the player and stops video immediately.
        </p>
      </header>
      <DramaCards locale={locale} />
    </section>
  );
}

