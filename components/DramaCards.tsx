"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { citiesBySlug } from "@/lib/data/cities";
import { dramaItems } from "@/lib/data/dramas";

type Props = {
  locale: "en" | "ko";
};

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

export function DramaCards({ locale }: Props) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");

  const cards = useMemo(
    () =>
      dramaItems.map((drama) => {
        const youtubeId = drama.trailerUrl ? getYouTubeVideoId(drama.trailerUrl) : null;
        const thumbnailUrl = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null;
        return { drama, youtubeId, thumbnailUrl };
      }),
    []
  );

  return (
    <>
      <div className="space-y-4">
        {cards.map(({ drama, youtubeId, thumbnailUrl }) => (
          <article key={drama.title} className="grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-[240px_1fr]">
            <div className="space-y-2">
              {thumbnailUrl && youtubeId ? (
                <button
                  type="button"
                  onClick={() => {
                    setActiveVideoId(youtubeId);
                    setActiveVideoTitle(drama.title);
                  }}
                  className="group relative block w-full text-left"
                >
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
                </button>
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
        ))}
      </div>

      {activeVideoId ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => {
            setActiveVideoId(null);
            setActiveVideoTitle("");
          }}
        >
          <div
            className="w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-black/80 px-4 py-3 text-white">
              <p className="text-sm font-medium">{activeVideoTitle}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveVideoId(null);
                  setActiveVideoTitle("");
                }}
                className="rounded border border-white/30 px-2 py-1 text-xs hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

