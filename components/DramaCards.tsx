"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  const featured = cards.slice(0, 4);
  const spotlight = cards.slice(0, 6);

  return (
    <>
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {[
          locale === "ko" ? "인기" : "Trending",
          locale === "ko" ? "로맨스" : "Romance",
          locale === "ko" ? "스릴러" : "Thriller",
          locale === "ko" ? "판타지" : "Fantasy"
        ].map((tab, idx) => (
          <button
            key={tab}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${idx === 0 ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-4xl font-extrabold text-slate-900">Must-Visit Locations</h2>
        <div className="grid grid-cols-2 gap-3">
          {featured.map(({ drama, youtubeId, thumbnailUrl }) => (
            <button
              key={drama.title}
              type="button"
              onClick={() => {
                if (!youtubeId) return;
                setActiveVideoId(youtubeId);
                setActiveVideoTitle(drama.title);
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl text-left"
            >
              {thumbnailUrl ? (
                <Image
                  src={thumbnailUrl}
                  alt={drama.title}
                  width={640}
                  height={800}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="h-full w-full bg-slate-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-0 p-3">
                <h3 className="line-clamp-2 text-2xl font-bold leading-tight text-white">{drama.title}</h3>
                <p className="mt-1 text-sm text-white/85">{drama.filmingSpots.length} Locations</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-4xl font-extrabold text-slate-900">Guardian Spotlight</h2>
          <span className="text-sm font-semibold text-blue-700">View All</span>
        </div>
        <div className="space-y-3">
          {spotlight.map(({ drama }, idx) => {
            const spot = drama.filmingSpots[0];
            if (!spot) return null;
            const city = citiesBySlug[drama.filmingCities[0]];
            const youtubeId = drama.trailerUrl ? getYouTubeVideoId(drama.trailerUrl) : null;
            const thumbnailUrl = youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/mqdefault.jpg` : null;

            return (
              <article key={`${drama.title}-${spot.name}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="grid grid-cols-[120px_1fr]">
                  <div className="relative h-full min-h-28 bg-slate-100">
                    {thumbnailUrl ? (
                      <Image
                        src={thumbnailUrl}
                        alt={drama.title}
                        width={320}
                        height={180}
                        className="h-full w-full object-cover"
                        unoptimized
                      />
                    ) : null}
                    <span className="absolute left-2 top-2 rounded-md bg-blue-700 px-2 py-1 text-xs font-bold text-white">EP {String(idx + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xl font-bold text-slate-900">{spot.name}</h3>
                    <p className="mt-1 line-clamp-2 text-sm italic text-slate-600">{drama.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-slate-500">{spot.city || city?.nameEn}</p>
                      <a href={spot.mapUrl} target="_blank" rel="noreferrer" className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
                        Map
                      </a>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Link href={`/${locale}/city/${drama.filmingCities[0]}`} className="text-xs font-semibold text-blue-700 underline">
                        City Guide
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

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
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl bg-black" onClick={(event) => event.stopPropagation()}>
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

