import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dramaItems } from "@/lib/data/dramas";
import { citiesBySlug } from "@/lib/data/cities";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";
import { fetchUnsplashPhoto } from "@/lib/unsplash";
import { fetchYouTubePreview } from "@/lib/youtube";

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
    dramaItems.map(async (drama) => {
      const firstCity = citiesBySlug[drama.filmingCities[0]];
      const candidates = [
        drama.visualQuery,
        `${drama.title} Korea travel`,
        firstCity?.unsplashQuery ?? ""
      ].filter((value) => value.length > 0);

      let photo = null;
      for (const candidate of candidates) {
        photo = await fetchUnsplashPhoto(candidate).catch(() => null);
        if (photo?.url) break;
      }

      return {
        title: drama.title,
        photo
      };
    })
  );

  const dramaVideos = await Promise.all(
    dramaItems.map(async (drama) => ({
      title: drama.title,
      video: await fetchYouTubePreview(`${drama.youtubeQuery} trailer`).catch(() => null)
    }))
  );

  const visualByTitle = Object.fromEntries(
    dramaVisuals.map((item) => [item.title, item.photo])
  ) as Record<string, Awaited<ReturnType<typeof fetchUnsplashPhoto>>>;
  const videoByTitle = Object.fromEntries(
    dramaVideos.map((item) => [item.title, item.video])
  ) as Record<string, Awaited<ReturnType<typeof fetchYouTubePreview>>>;

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">K-Drama Filming City Guide</h1>
        <p className="mt-2 text-slate-700">
          No copyrighted screenshots are used. Visuals below are sourced from Korea Tourism Organization photo data.
        </p>
      </header>

      <div className="space-y-4">
        {dramaItems.map((drama) => (
          <article key={drama.title} className="grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-[240px_1fr]">
            <div className="space-y-2">
              {videoByTitle[drama.title]?.thumbnailUrl ? (
                <a
                  href={videoByTitle[drama.title]?.watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block"
                >
                  <img
                    src={videoByTitle[drama.title]?.thumbnailUrl}
                    alt={`${drama.title} YouTube preview`}
                    className="h-40 w-full rounded-xl object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white group-hover:bg-black/80">
                      Watch on YouTube
                    </span>
                  </span>
                </a>
              ) : visualByTitle[drama.title]?.url ? (
                <img
                  src={visualByTitle[drama.title]?.url}
                  alt={`${drama.title} tourism photo`}
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
                  No YouTube preview or tourism photo found
                </div>
              )}
              {videoByTitle[drama.title]?.watchUrl ? (
                <p className="text-xs text-slate-500">
                  Video:{" "}
                  <a
                    href={videoByTitle[drama.title]?.watchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline"
                  >
                    {videoByTitle[drama.title]?.title ?? "YouTube"}
                  </a>
                </p>
              ) : null}
              {!videoByTitle[drama.title]?.watchUrl && visualByTitle[drama.title]?.photographer ? (
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
              {drama.relatedSpots?.length ? (
                <div className="mt-3 space-y-1 text-sm">
                  <p className="font-medium text-slate-800">Related spots</p>
                  <div className="flex flex-wrap gap-2">
                    {drama.relatedSpots.map((spot) => (
                      <a
                        key={`${drama.title}-${spot.name}`}
                        href={`https://www.google.com/maps/search/${encodeURIComponent(spot.mapsQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        {spot.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
