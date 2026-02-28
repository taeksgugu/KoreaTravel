"use client";

import { useMemo, useState } from "react";
import { RegionContentPanel } from "@/components/RegionContentPanel";
import { RegionMap } from "@/components/RegionMap";
import { RegionPresetPicker } from "@/components/RegionPresetPicker";
import { SubregionPicker } from "@/components/SubregionPicker";
import { presetById } from "@/lib/presets";
import { regionById } from "@/lib/regions";
import { subregionById, subregionsByRegion } from "@/lib/subregions";
import { themePresets } from "@/lib/theme-presets";
import type { Category } from "@/lib/types";

type Props = {
  locale: "en" | "ko";
};

export function MainExplorer({ locale }: Props) {
  const [selectedRegionId, setSelectedRegionId] = useState("seoul");
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(undefined);
  const [selectedSubregionId, setSelectedSubregionId] = useState<string | undefined>(undefined);
  const [preferredCategory, setPreferredCategory] = useState<Category | undefined>(undefined);

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
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm font-semibold text-slate-700">{locale === "ko" ? "서울, 대한민국" : "Seoul, South Korea"}</p>
        <div className="mt-3 rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
          {locale === "ko"
            ? "여행지, 도시, 맛집을 검색해보세요"
            : "Search destinations, cities, or food"}
        </div>
      </section>

      <section>
        <div className="mb-2 flex items-end justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900">{locale === "ko" ? "지역 탐색" : "Explore Regions"}</h2>
            <p className="text-slate-500">{locale === "ko" ? "도시/시군구를 탭해 상세정보 보기" : "Tap a city to discover more"}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">
          {locale === "ko" ? "테마 여행 시작하기" : "Start With a Travel Theme"}
        </h3>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {themePresets.map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                setSelectedRegionId(theme.regionId);
                setSelectedPresetId(theme.presetId);
                setSelectedSubregionId(theme.subregionId);
                setPreferredCategory(theme.category);
              }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-left hover:border-blue-300 hover:bg-blue-50"
            >
              <p className="text-sm font-semibold text-blue-700">
                {locale === "ko" ? theme.titleKo : theme.titleEn}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {locale === "ko" ? theme.descKo : theme.descEn}
              </p>
            </button>
          ))}
        </div>
      </section>

      <RegionPresetPicker
        locale={locale}
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
          locale={locale}
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
          preferredCategory={preferredCategory}
        />
      </section>
    </div>
  );
}

