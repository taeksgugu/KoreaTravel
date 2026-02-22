"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/lib/data/quiz";
import type { UnsplashPhoto } from "@/lib/data/types";

const QUIZ_STORAGE_KEY = "koreatravel_quiz";

type OptionImageMap = Record<string, UnsplashPhoto | null>;

export function QuizClient({ locale }: { locale: string }) {
  const router = useRouter();
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

  const goBack = () => {
    if (index === 0) return;
    setIndex((prev) => prev - 1);
  };

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <header className="space-y-3 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">STEP {index + 1} OF 10</span>
          <button className="text-sm font-semibold text-blue-700" onClick={() => router.push(`/${locale}/details`)}>
            Skip
          </button>
        </div>
        <p className="text-5xl font-extrabold leading-tight text-slate-900">{current.prompt}</p>
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-blue-700" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-sm font-semibold text-slate-500">{Math.round(progress)}%</span>
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
              className={`overflow-hidden rounded-2xl border-2 text-left transition ${
                checked ? "border-blue-700 ring-2 ring-blue-200" : "border-transparent hover:border-slate-300"
              }`}
            >
              <div className="h-56 w-full bg-slate-100">
                {preview ? (
                  <img src={preview.url} alt={option.label} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-500">Loading Korea tourism photo...</div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <p className="text-2xl font-extrabold leading-tight text-slate-900">{option.label}</p>
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

      <div className="flex gap-3 border-t border-slate-100 pt-4">
        <button
          type="button"
          disabled={index === 0}
          onClick={goBack}
          className="w-1/3 rounded-xl bg-slate-100 px-5 py-3 font-bold text-slate-600 disabled:opacity-40"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={goNext}
          className="w-2/3 rounded-xl bg-blue-700 px-5 py-3 text-lg font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {index === quizQuestions.length - 1 ? "Continue to Details" : "Next"}
        </button>
      </div>
    </section>
  );
}

