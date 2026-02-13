import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dramaItems } from "@/lib/data/dramas";
import { citiesBySlug } from "@/lib/data/cities";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";
import { fetchUnsplashPhoto } from "@/lib/unsplash";

export const dynamic = "force-dynamic";

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
  if (!isLocale(locale)) {
    notFound();
  }

  const dramaVisuals = await Promise.all(
    dramaItems.map(async (drama) => ({
      title: drama.title,
      photo: await fetchUnsplashPhoto(drama.visualQuery).catch(() => null)
    }))
  );
  const visualByTitle = Object.fromEntries(
    dramaVisuals.map((item) => [item.title, item.photo])
  ) as Record<string, Awaited<ReturnType<typeof fetchUnsplashPhoto>>>;

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">K-Drama Filming City Guide</h1>
        <p className="mt-2 text-slate-700">
          No copyrighted screenshots are used. Visuals below are Unsplash mood photos with credits.
        </p>
      </header>

      <div className="space-y-4">
        {dramaItems.map((drama) => (
          <article key={drama.title} className="grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-[240px_1fr]">
            <div className="space-y-2">
              {visualByTitle[drama.title]?.url ? (
                <img
                  src={visualByTitle[drama.title]?.url}
                  alt={`${drama.title} mood visual`}
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
                  Image available after Unsplash key setup
                </div>
              )}
              {visualByTitle[drama.title]?.photographer ? (
                <p className="text-xs text-slate-500">
                  Photo by{" "}
                  <a
                    href={visualByTitle[drama.title]?.photographerLink}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {visualByTitle[drama.title]?.photographer}
                  </a>
                </p>
              ) : null}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900">{drama.title}</h2>
              <p className="mt-1 text-sm text-slate-700">{drama.note}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {drama.filmingCities.map((slug) => {
                  const city = citiesBySlug[slug];
                  return (
                    <Link
                      key={`${drama.title}-${slug}`}
                      href={`/${locale}/city/${slug}`}
                      className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
                    >
                      {city.nameEn}
                    </Link>
                  );
                })}
              </div>
              <div className="mt-3">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(`${drama.title} filming locations Korea`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-emerald-800 underline"
                >
                  Google Maps search for filming locations
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
