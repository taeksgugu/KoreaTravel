"use client";

import { useMemo, useState } from "react";
import { RegionContentPanel } from "@/components/RegionContentPanel";
import { RegionMap } from "@/components/RegionMap";
import { RegionPresetPicker } from "@/components/RegionPresetPicker";
import { SubregionPicker } from "@/components/SubregionPicker";
import { presetById } from "@/lib/presets";
import { regionById } from "@/lib/regions";
import { subregionById, subregionsByRegion } from "@/lib/subregions";

type Props = {
  locale: "en" | "ko";
};

export function MainExplorer({ locale }: Props) {
  const [selectedRegionId, setSelectedRegionId] = useState("seoul");
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(undefined);
  const [selectedSubregionId, setSelectedSubregionId] = useState<string | undefined>(undefined);

  const selectedRegionName = useMemo(() => {
    const region = regionById[selectedRegionId];
    if (!region) return selectedRegionId;
    return locale === "ko" ? region.name_ko : region.name_en;
  }, [locale, selectedRegionId]);

  const availableSubregions = useMemo(
    () => subregionsByRegion[selectedRegionId] ?? [],
    [selectedRegionId]
  );

  const selectedSubregionName = useMemo(() => {
    if (!selectedSubregionId) return undefined;
    const subregion = subregionById[selectedSubregionId];
    if (!subregion) return undefined;
    return locale === "ko" ? subregion.nameKo : subregion.nameEn;
  }, [locale, selectedSubregionId]);

  return (
    <div className="space-y-4">
      <RegionPresetPicker
        selectedPresetId={selectedPresetId}
        onSelectPreset={(presetId) => {
          const preset = presetById[presetId];
          setSelectedPresetId(presetId);
          setSelectedRegionId(preset.regionId);
          setSelectedSubregionId(preset.subregionId);
        }}
      />

      <SubregionPicker
        locale={locale}
        subregions={availableSubregions}
        selectedSubregionId={selectedSubregionId}
        onSelectSubregion={(subregionId) => {
          setSelectedSubregionId(subregionId);
          setSelectedPresetId(undefined);
        }}
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <RegionMap
          selectedRegionId={selectedRegionId}
          selectedSubregionId={selectedSubregionId}
          onSelectRegion={(regionId) => {
            setSelectedRegionId(regionId);
            setSelectedPresetId(undefined);
            if (!(subregionsByRegion[regionId] ?? []).some((item) => item.id === selectedSubregionId)) {
              setSelectedSubregionId(undefined);
            }
          }}
          onSelectSubregion={(subregionId) => {
            setSelectedSubregionId(subregionId);
            setSelectedPresetId(undefined);
          }}
        />
        <RegionContentPanel
          locale={locale}
          regionId={selectedRegionId}
          regionName={selectedRegionName}
          subregionId={selectedSubregionId}
          subregionName={selectedSubregionName}
          presetId={selectedPresetId}
        />
      </section>
    </div>
  );
}
