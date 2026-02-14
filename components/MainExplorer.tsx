"use client";

import { useMemo, useState } from "react";
import { RegionContentPanel } from "@/components/RegionContentPanel";
import { RegionMap } from "@/components/RegionMap";
import { RegionPresetPicker } from "@/components/RegionPresetPicker";
import { presetById } from "@/lib/presets";
import { regionById } from "@/lib/regions";

type Props = {
  locale: "en" | "ko";
};

export function MainExplorer({ locale }: Props) {
  const [selectedRegionId, setSelectedRegionId] = useState("seoul");
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(undefined);

  const selectedRegionName = useMemo(() => {
    const region = regionById[selectedRegionId];
    if (!region) return selectedRegionId;
    return locale === "ko" ? region.name_ko : region.name_en;
  }, [locale, selectedRegionId]);

  return (
    <div className="space-y-4">
      <RegionPresetPicker
        selectedPresetId={selectedPresetId}
        onSelectPreset={(presetId) => {
          const preset = presetById[presetId];
          setSelectedPresetId(presetId);
          setSelectedRegionId(preset.regionId);
        }}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <RegionMap
          selectedRegionId={selectedRegionId}
          onSelectRegion={(regionId) => {
            setSelectedRegionId(regionId);
            setSelectedPresetId(undefined);
          }}
        />
        <RegionContentPanel
          regionId={selectedRegionId}
          regionName={selectedRegionName}
          presetId={selectedPresetId}
        />
      </section>
    </div>
  );
}

