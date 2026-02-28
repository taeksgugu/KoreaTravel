"use client";

import { useEffect, useMemo, useRef } from "react";
import mapboxgl, { LngLatBoundsLike, Map } from "mapbox-gl";
import { getExploreText } from "@/lib/explore-i18n";
import { regionGeoJson } from "@/lib/region-geojson";
import { subregionGeoJson } from "@/lib/subregions";
import type { RegionFeatureProperties, SubregionFeatureProperties } from "@/lib/types";

type Props = {
  locale: "en" | "ko";
  selectedRegionId: string;
  selectedSubregionId?: string;
  onSelectRegion: (regionId: string) => void;
  onSelectSubregion: (subregionId: string) => void;
};

const REGION_SOURCE_ID = "korea-regions";
const SUBREGION_SOURCE_ID = "korea-subregions";
const CITY_REGION_LAYER_ID = "city-region-fill";
const SUBREGION_LAYER_ID = "subregion-fill";

const CITY_LEVEL_REGION_IDS = new Set([
  "seoul",
  "incheon",
  "daejeon",
  "daegu",
  "gwangju",
  "busan",
  "ulsan",
  "sejong",
  "jeju"
]);

function flattenCoords(coords: unknown, out: [number, number][]) {
  if (!Array.isArray(coords)) return;
  if (typeof coords[0] === "number" && typeof coords[1] === "number") {
    out.push([coords[0], coords[1]]);
    return;
  }
  for (const entry of coords) flattenCoords(entry, out);
}

function getBoundsForFeature(
  feature: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>
): LngLatBoundsLike {
  const pairs: [number, number][] = [];
  flattenCoords(feature.geometry.coordinates, pairs);
  const lons = pairs.map((p) => p[0]);
  const lats = pairs.map((p) => p[1]);
  return [
    [Math.min(...lons), Math.min(...lats)],
    [Math.max(...lons), Math.max(...lats)]
  ];
}

export function RegionMap({
  locale,
  selectedRegionId,
  selectedSubregionId,
  onSelectRegion,
  onSelectSubregion
}: Props) {
  const t = getExploreText(locale);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const featureByRegion = useMemo(() => {
    const features = regionGeoJson.features as GeoJSON.Feature<
      GeoJSON.Polygon | GeoJSON.MultiPolygon,
      RegionFeatureProperties
    >[];
    return Object.fromEntries(features.map((feature) => [feature.properties.region_id, feature]));
  }, []);

  const cityOnlyRegionGeoJson = useMemo(() => {
    const features = regionGeoJson.features.filter((feature) =>
      CITY_LEVEL_REGION_IDS.has(feature.properties.region_id)
    );
    return {
      type: "FeatureCollection",
      features
    } as GeoJSON.FeatureCollection<GeoJSON.Polygon | GeoJSON.MultiPolygon, RegionFeatureProperties>;
  }, []);

  const featureBySubregion = useMemo(() => {
    const features = subregionGeoJson.features as GeoJSON.Feature<
      GeoJSON.Polygon | GeoJSON.MultiPolygon,
      SubregionFeatureProperties
    >[];
    return Object.fromEntries(features.map((feature) => [feature.properties.subregion_id, feature]));
  }, []);

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/guguskorea/cmm3k1940009m01pt5a35cgnx",
      center: [127.75, 36.2],
      zoom: 5.8,
      minZoom: 5,
      maxZoom: 11
    });
    map.showTileBoundaries = false;
    map.showCollisionBoxes = false;

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource(REGION_SOURCE_ID, {
        type: "geojson",
        data: cityOnlyRegionGeoJson as GeoJSON.FeatureCollection
      });

      map.addSource(SUBREGION_SOURCE_ID, {
        type: "geojson",
        data: subregionGeoJson as GeoJSON.FeatureCollection
      });

      map.addLayer({
        id: CITY_REGION_LAYER_ID,
        type: "fill",
        source: REGION_SOURCE_ID,
        paint: {
          "fill-color": ["case", ["==", ["get", "region_id"], selectedRegionId], "#0f766e", "#94a3b8"],
          "fill-opacity": ["case", ["==", ["get", "region_id"], selectedRegionId], 0.7, 0.35]
        }
      });

      map.addLayer({
        id: SUBREGION_LAYER_ID,
        type: "fill",
        source: SUBREGION_SOURCE_ID,
        paint: {
          "fill-color": ["case", ["==", ["get", "subregion_id"], selectedSubregionId ?? ""], "#4338ca", "#6366f1"],
          "fill-opacity": ["case", ["==", ["get", "subregion_id"], selectedSubregionId ?? ""], 0.72, 0.32]
        }
      });

      map.addLayer({
        id: "city-region-line",
        type: "line",
        source: REGION_SOURCE_ID,
        paint: {
          "line-color": "#0f172a",
          "line-width": 1.2
        }
      });

      map.addLayer({
        id: "subregion-line",
        type: "line",
        source: SUBREGION_SOURCE_ID,
        paint: {
          "line-color": "#312e81",
          "line-width": 1
        }
      });

      map.on("mousemove", CITY_REGION_LAYER_ID, (event) => {
        if (event.features?.[0]) map.getCanvas().style.cursor = "pointer";
      });

      map.on("mousemove", SUBREGION_LAYER_ID, (event) => {
        if (event.features?.[0]) map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", CITY_REGION_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseleave", SUBREGION_LAYER_ID, () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", CITY_REGION_LAYER_ID, (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        onSelectRegion((feature.properties as RegionFeatureProperties).region_id);
      });

      map.on("click", SUBREGION_LAYER_ID, (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        const properties = feature.properties as SubregionFeatureProperties;
        onSelectRegion(properties.parent_region_id);
        onSelectSubregion(properties.subregion_id);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [cityOnlyRegionGeoJson, mapboxToken, onSelectRegion, onSelectSubregion, selectedRegionId, selectedSubregionId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource(REGION_SOURCE_ID) || !map.getSource(SUBREGION_SOURCE_ID)) return;

    map.setPaintProperty(CITY_REGION_LAYER_ID, "fill-color", [
      "case",
      ["==", ["get", "region_id"], selectedRegionId],
      "#0f766e",
      "#94a3b8"
    ]);
    map.setPaintProperty(CITY_REGION_LAYER_ID, "fill-opacity", [
      "case",
      ["==", ["get", "region_id"], selectedRegionId],
      0.7,
      0.35
    ]);

    map.setPaintProperty(SUBREGION_LAYER_ID, "fill-color", [
      "case",
      ["==", ["get", "subregion_id"], selectedSubregionId ?? ""],
      "#4338ca",
      "#6366f1"
    ]);

    map.setPaintProperty(SUBREGION_LAYER_ID, "fill-opacity", [
      "case",
      ["==", ["get", "subregion_id"], selectedSubregionId ?? ""],
      0.72,
      0.32
    ]);

    if (selectedSubregionId && featureBySubregion[selectedSubregionId]) {
      map.fitBounds(getBoundsForFeature(featureBySubregion[selectedSubregionId]), {
        padding: 40,
        duration: 500,
        maxZoom: 9.2
      });
      return;
    }

    if (featureByRegion[selectedRegionId]) {
      map.fitBounds(getBoundsForFeature(featureByRegion[selectedRegionId]), {
        padding: 40,
        duration: 500,
        maxZoom: 8.2
      });
    }
  }, [featureByRegion, featureBySubregion, selectedRegionId, selectedSubregionId]);

  if (!mapboxToken) {
    return (
      <div className="flex h-[460px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 text-center">
        <p className="text-lg font-semibold text-slate-800">{t.mapTokenHint}</p>
        <p className="mt-2 max-w-md text-sm text-slate-600">
          {locale === "ko"
            ? "프리셋 버튼이나 테마 카드를 눌러 지역 콘텐츠를 먼저 탐색할 수 있습니다."
            : "You can still explore content using city presets or travel themes above."}
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="h-[460px] w-full rounded-3xl border border-slate-200 bg-white" />;
}

