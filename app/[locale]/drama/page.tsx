import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dramaItems } from "@/lib/data/dramas";
import { citiesBySlug } from "@/lib/data/cities";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "").trim();
      return id.length === 11 ? id : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") ?? "";
      return id.length === 11 ? id : null;
    }
    return null;
  } catch {
    return null;
  }
}

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

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">K-Drama Filming City Guide</h1>
        <p className="mt-2 text-slate-700">
          Trailer thumbnails use official YouTube links when available. Filming spots below focus on Korea-accessible travel points.
        </p>
      </header>

      <div className="space-y-4">
        {dramaItems.map((drama) => {
          const youtubeId = drama.trailerUrl ? getYouTubeVideoId(drama.trailerUrl) : null;
          const thumbnailUrl = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null;

          return (
            <article key={drama.title} className="grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-[240px_1fr]">
              <div className="space-y-2">
                {thumbnailUrl && drama.trailerUrl ? (
                  <a href={drama.trailerUrl} target="_blank" rel="noreferrer" className="group relative block">
                    <img
                      src={thumbnailUrl}
                      alt={`${drama.title} trailer preview`}
                      className="h-40 w-full rounded-xl object-cover"
                    />
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="rounded-full bg-black/65 px-3 py-1 text-xs font-medium text-white group-hover:bg-black/80">
                        Watch Trailer
                      </span>
                    </span>
                  </a>
                ) : (
                  <div className="flex h-40 items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500">
                    Trailer link will be updated
                  </div>
                )}

                <p className="text-xs text-slate-600">{drama.trailerLabel}</p>
                {drama.trailerUrl ? (
                  <a
                    href={drama.trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-800 underline"
                  >
                    Open trailer on YouTube
                  </a>
                ) : null}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-slate-900">{drama.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{drama.koreanTitle}</p>
                <p className="mt-2 text-sm text-slate-700">{drama.description}</p>

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

                <div className="mt-4">
                  <p className="mb-2 text-sm font-medium text-slate-800">Major Filming Spots</p>
                  <div className="flex flex-wrap gap-2">
                    {drama.filmingSpots.map((spot) => (
                      <a
                        key={`${drama.title}-${spot.name}`}
                        href={spot.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        {spot.name} - {spot.city}
                      </a>
                    ))}
                  </div>
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
          );
        })}
      </div>
    </section>
  );
}

