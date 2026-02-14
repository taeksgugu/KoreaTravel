"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { KoreaMap } from "@/components/KoreaMap";
import { adsenseSlots } from "@/lib/adsense";
import { citiesBySlug } from "@/lib/data/cities";
import type { RecommendationInput, RecommendationResult, CitySlug, UnsplashPhoto } from "@/lib/data/types";

const QUIZ_STORAGE_KEY = "koreatravel_quiz";
const DETAIL_STORAGE_KEY = "koreatravel_details";

const medals: Array<1 | 2 | 3> = [1, 2, 3];

export function ResultClient({ locale }: { locale: string }) {
  const router = useRouter();
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredSlug, setHoveredSlug] = useState<CitySlug | null>(null);
  const [imageMap, setImageMap] = useState<Record<string, UnsplashPhoto[]>>({});

  useEffect(() => {
    async function runRecommendation() {
      const quizRaw = localStorage.getItem(QUIZ_STORAGE_KEY);
      const detailRaw = localStorage.getItem(DETAIL_STORAGE_KEY);

      if (!quizRaw || !detailRaw) {
        router.replace(`/${locale}/quiz`);
        return;
      }

      const quiz = JSON.parse(quizRaw) as { selectedOptionIds: string[] };
      const details = JSON.parse(detailRaw) as Omit<RecommendationInput, "selectedOptionIds">;
      const payload: RecommendationInput = {
        selectedOptionIds: quiz.selectedOptionIds,
        ...details
      };

      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => null);

      if (!response?.ok) {
        setLoading(false);
        return;
      }

      const data = (await response.json()) as { results: RecommendationResult[] };
      setResults(data.results ?? []);
      setHoveredSlug(data.results?.[0]?.slug ?? null);
      setLoading(false);

      const imagesEntries = await Promise.all(
        (data.results ?? []).map(async (result) => {
          const city = citiesBySlug[result.slug];
          const imageResponse = await fetch(
            `/api/images?query=${encodeURIComponent(city.unsplashQuery)}&count=2`
          ).catch(() => null);

          if (!imageResponse?.ok) return [result.slug, []] as const;

          const imageData = (await imageResponse.json()) as { photos?: UnsplashPhoto[] };
          return [result.slug, imageData.photos ?? []] as const;
        })
      );

      setImageMap(Object.fromEntries(imagesEntries));
    }

    void runRecommendation();
  }, [locale, router]);

  const pins = useMemo(
    () =>
      results.map((result, idx) => {
        const city = citiesBySlug[result.slug];
        return {
          slug: result.slug,
          rank: medals[idx] ?? 3,
          x: city.coordinates.x,
          y: city.coordinates.y,
          nameEn: city.nameEn
        };
      }),
    [results]
  );

  const previewCity = hoveredSlug ? citiesBySlug[hoveredSlug] : null;
  const previewPhotos = hoveredSlug ? imageMap[hoveredSlug] ?? [] : [];

  if (loading) {
    return <div className="rounded-2xl border border-slate-200 bg-white p-6">Calculating your top Korean cities...</div>;
  }

  if (!results.length) {
    return <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">Could not generate recommendations. Please retake the quiz.</div>;
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-slate-900">Your Top 3 Korea Cities</h1>
          {results.map((result, index) => {
            const city = citiesBySlug[result.slug];
            return (
              <article
                key={result.slug}
                onMouseEnter={() => setHoveredSlug(result.slug)}
                className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
                  hoveredSlug === result.slug ? "border-emerald-700" : "border-slate-200"
                }`}
              >
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-700">Rank #{index + 1}</p>
                <h2 className="text-xl font-semibold text-slate-900">{city.nameEn} ({city.nameKo})</h2>
                <p className="mt-2 text-sm text-slate-600">Score: {result.score}</p>
                <p className="mt-2 text-sm text-slate-700">Top tags: {result.reason.topTags.join(", ")}</p>
                <p className="mt-1 text-sm text-slate-700">Synergy: {result.reason.synergies.length ? result.reason.synergies.join(" | ") : "None"}</p>
                <p className="mt-1 text-sm text-slate-700">{result.reason.englishNote}</p>
                <p className="mt-1 text-sm text-slate-700">{result.reason.accessNote}</p>
              </article>
            );
          })}
        </div>

        <div className="space-y-4">
          <KoreaMap
            pins={pins}
            activeSlug={hoveredSlug ?? undefined}
            onHover={setHoveredSlug}
            onSelect={(slug) => router.push(`/${locale}/city/${slug}`)}
          />

          {previewCity && (
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Preview: {previewCity.nameEn}</h3>
              <p className="mt-1 text-sm text-slate-700">{previewCity.summary}</p>
              <p className="mt-2 text-sm text-slate-600">Tags: {previewCity.tags.slice(0, 3).join(", ")}</p>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {previewPhotos.slice(0, 2).map((photo) => (
                  <figure key={photo.url} className="space-y-1">
                    <img src={photo.url} alt={previewCity.nameEn} className="h-32 w-full rounded-xl object-cover" />
                    <figcaption className="text-xs text-slate-500">
                      Photo by{" "}
                      <a href={photo.photographerLink} target="_blank" rel="noreferrer" className="underline">
                        {photo.photographer}
                      </a>
                    </figcaption>
                  </figure>
                ))}
              </div>

              <div className="mt-4">
                <Link
                  href={`/${locale}/city/${previewCity.slug}`}
                  className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
                >
                  View Details
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>
      <AdSenseUnit slot={adsenseSlots.result} />
    </div>
  );
}

