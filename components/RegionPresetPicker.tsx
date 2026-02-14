"use client";

import { regionPresets } from "@/lib/presets";

type Props = {
  selectedPresetId?: string;
  onSelectPreset: (presetId: string) => void;
};

export function RegionPresetPicker({ selectedPresetId, onSelectPreset }: Props) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-600">City Presets (15)</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {regionPresets.map((preset) => {
          const isActive = preset.id === selectedPresetId;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPreset(preset.id)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                isActive
                  ? "bg-teal-700 text-white"
                  : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {preset.nameEn}
            </button>
          );
        })}
      </div>
    </section>
  );
}

