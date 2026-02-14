"use client";

import type { Subregion } from "@/lib/types";

type Props = {
  locale: "en" | "ko";
  subregions: Subregion[];
  selectedSubregionId?: string;
  onSelectSubregion: (subregionId: string | undefined) => void;
};

export function SubregionPicker({
  locale,
  subregions,
  selectedSubregionId,
  onSelectSubregion
}: Props) {
  if (!subregions.length) return null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">
          {locale === "ko" ? "시/군/구 드릴다운" : "City/County Drill-down"}
        </h2>
        <button
          type="button"
          className="text-xs text-slate-500 underline"
          onClick={() => onSelectSubregion(undefined)}
        >
          {locale === "ko" ? "전체 보기" : "Clear"}
        </button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {subregions.map((item) => {
          const active = item.id === selectedSubregionId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSubregion(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                active
                  ? "bg-indigo-700 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {locale === "ko" ? item.nameKo : item.nameEn}
            </button>
          );
        })}
      </div>
    </section>
  );
}
