"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/data/quiz";
import type { UnsplashPhoto } from "@/lib/data/types";

const QUIZ_STORAGE_KEY = "koreatravel_quiz";

type OptionImageMap = Record<string, UnsplashPhoto | null>;

export default function QuizPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [optionImages, setOptionImages] = useState<OptionImageMap>({});

  const current = quizQuestions[index];
  const selectedOptionId = selected[current.id];
  const progress = ((index + 1) / quizQuestions.length) * 100;

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      const entries = await Promise.all(
        current.options.map(async (option) => {
          const response = await fetch(
            `/api/images?query=${encodeURIComponent(option.imageQuery)}&count=1`
          ).catch(() => null);

          if (!response?.ok) return [option.id, null] as const;

          const data = (await response.json()) as { photos?: UnsplashPhoto[] };
          return [option.id, data.photos?.[0] ?? null] as const;
        })
      );

      if (!cancelled) {
        setOptionImages((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      }
    }

    void loadImages();

    return () => {
      cancelled = true;
    };
  }, [current]);

  const canContinue = Boolean(selectedOptionId);

  const allAnswered = useMemo(
    () => quizQuestions.every((question) => Boolean(selected[question.id])),
    [selected]
  );

  const goNext = () => {
    if (!canContinue) return;

    if (index < quizQuestions.length - 1) {
      setIndex((prev) => prev + 1);
      return;
    }

    if (!allAnswered) return;

    const selectedOptionIds = quizQuestions.map((question) => selected[question.id]);
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify({ selectedOptionIds }));
    router.push(`/${locale}/details`);
  };

  return (
    <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Travel Personality Quiz
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Question {index + 1} of 10</h1>
        <p className="text-lg text-slate-700">{current.prompt}</p>
        <div className="h-2 w-full rounded-full bg-slate-100">
          <div className="h-2 rounded-full bg-emerald-700" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {current.options.map((option) => {
          const preview = optionImages[option.id];
          const checked = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelected((prev) => ({ ...prev, [current.id]: option.id }))}
              className={`overflow-hidden rounded-2xl border text-left transition ${
                checked ? "border-emerald-700 ring-2 ring-emerald-200" : "border-slate-200 hover:border-slate-400"
              }`}
            >
              <div className="h-40 w-full bg-slate-100">
                {preview ? (
                  <img src={preview.url} alt={option.label} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading Unsplash image...</div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <p className="font-medium text-slate-900">{option.label}</p>
                {preview && (
                  <p className="text-xs text-slate-500">
                    Photo by{" "}
                    <a href={preview.photographerLink} target="_blank" rel="noreferrer" className="underline">
                      {preview.photographer}
                    </a>
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={goNext}
          className="rounded-full bg-emerald-700 px-5 py-2.5 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {index === quizQuestions.length - 1 ? "Continue to Details" : "Next"}
        </button>
      </div>
    </section>
  );
}
