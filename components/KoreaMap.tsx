"use client";

import type { CitySlug } from "@/lib/data/types";

export interface RankedPin {
  slug: CitySlug;
  rank: 1 | 2 | 3;
  x: number;
  y: number;
  nameEn: string;
}

interface KoreaMapProps {
  pins: RankedPin[];
  activeSlug?: CitySlug;
  onHover: (slug: CitySlug | null) => void;
  onSelect: (slug: CitySlug) => void;
}

export function KoreaMap({ pins, activeSlug, onHover, onSelect }: KoreaMapProps) {
  return (
    <div className="relative h-[720px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img src="/korea.svg" alt="Korea map" className="h-full w-full object-contain p-6" />
      {pins.map((pin) => (
        <button
          key={pin.slug}
          type="button"
          onMouseEnter={() => onHover(pin.slug)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(pin.slug)}
          onBlur={() => onHover(null)}
          onClick={() => onSelect(pin.slug)}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 px-3 py-2 text-xs font-bold shadow transition ${
            activeSlug === pin.slug
              ? "border-emerald-700 bg-emerald-700 text-white"
              : "border-slate-900 bg-white text-slate-900 hover:bg-slate-100"
          }`}
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          aria-label={`Rank ${pin.rank}: ${pin.nameEn}`}
        >
          {pin.rank}
        </button>
      ))}
    </div>
  );
}
