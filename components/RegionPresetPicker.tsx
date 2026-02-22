"use client";

import { regionPresets } from "@/lib/presets";

type Props = {
  locale: "en" | "ko";
  selectedPresetId?: string;
  onSelectPreset: (presetId: string) => void;
};

export function RegionPresetPicker({ locale, selectedPresetId, onSelectPreset }: Props) {
  return (
    <section className="overflow-x-auto hide-scrollbar">
      <div className="flex gap-2 pb-1">
        {regionPresets.map((preset) => {
          const isActive = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-700 text-white shadow"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              {locale === "ko" ? preset.nameKo : preset.nameEn}
            </button>
          );
        })}
      </div>
    </section>
  );
}


