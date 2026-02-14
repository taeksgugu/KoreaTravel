"use client";

import { useEffect, useMemo, useRef } from "react";
import mapboxgl, { LngLatBoundsLike, Map } from "mapbox-gl";
import { regionGeoJson } from "@/lib/region-geojson";
import { subregionGeoJson } from "@/lib/subregions";
import type { RegionFeatureProperties, SubregionFeatureProperties } from "@/lib/types";

type Props = {
  selectedRegionId: string;
  selectedSubregionId?: string;
  onSelectRegion: (regionId: string) => void;
  onSelectSubregion: (subregionId: string) => void;
};

const REGION_SOURCE_ID = "korea-regions";
const SUBREGION_SOURCE_ID = "korea-subregions";

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
  selectedRegionId,
  selectedSubregionId,
  onSelectRegion,
  onSelectSubregion
}: Props) {
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
      style: "mapbox://styles/mapbox/light-v11",
      center: [127.75, 36.2],
      zoom: 5.8,
      minZoom: 5,
      maxZoom: 11
    });

    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

    map.on("load", () => {
      map.addSource(REGION_SOURCE_ID, {
        type: "geojson",
        data: regionGeoJson as GeoJSON.FeatureCollection
      });

      map.addSource(SUBREGION_SOURCE_ID, {
        type: "geojson",
        data: subregionGeoJson as GeoJSON.FeatureCollection
      });

      map.addLayer({
        id: "region-fill",
        type: "fill",
        source: REGION_SOURCE_ID,
        paint: {
          "fill-color": ["case", ["==", ["get", "region_id"], selectedRegionId], "#0f766e", "#94a3b8"],
          "fill-opacity": ["case", ["==", ["get", "region_id"], selectedRegionId], 0.7, 0.35]
        }
      });

      map.addLayer({
        id: "subregion-fill",
        type: "fill",
        source: SUBREGION_SOURCE_ID,
        filter: ["==", ["get", "parent_region_id"], selectedRegionId],
        paint: {
          "fill-color": ["case", ["==", ["get", "subregion_id"], selectedSubregionId ?? ""], "#4338ca", "#6366f1"],
          "fill-opacity": ["case", ["==", ["get", "subregion_id"], selectedSubregionId ?? ""], 0.65, 0.35]
        }
      });

      map.addLayer({
        id: "region-line",
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
        filter: ["==", ["get", "parent_region_id"], selectedRegionId],
        paint: {
          "line-color": "#312e81",
          "line-width": 1
        }
      });

      map.on("mousemove", "region-fill", (event) => {
        if (event.features?.[0]) map.getCanvas().style.cursor = "pointer";
      });

      map.on("mousemove", "subregion-fill", (event) => {
        if (event.features?.[0]) map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "region-fill", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("mouseleave", "subregion-fill", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "region-fill", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        onSelectRegion((feature.properties as RegionFeatureProperties).region_id);
      });

      map.on("click", "subregion-fill", (event) => {
        const feature = event.features?.[0];
        if (!feature) return;
        onSelectSubregion((feature.properties as SubregionFeatureProperties).subregion_id);
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [mapboxToken, onSelectRegion, onSelectSubregion, selectedRegionId, selectedSubregionId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.getSource(REGION_SOURCE_ID) || !map.getSource(SUBREGION_SOURCE_ID)) return;

    map.setPaintProperty("region-fill", "fill-color", [
      "case",
      ["==", ["get", "region_id"], selectedRegionId],
      "#0f766e",
      "#94a3b8"
    ]);
    map.setPaintProperty("region-fill", "fill-opacity", [
      "case",
      ["==", ["get", "region_id"], selectedRegionId],
      0.7,
      0.35
    ]);

    map.setFilter("subregion-fill", ["==", ["get", "parent_region_id"], selectedRegionId]);
    map.setFilter("subregion-line", ["==", ["get", "parent_region_id"], selectedRegionId]);
    map.setPaintProperty("subregion-fill", "fill-color", [
      "case",
      ["==", ["get", "subregion_id"], selectedSubregionId ?? ""],
      "#4338ca",
      "#6366f1"
    ]);

    map.setPaintProperty("subregion-fill", "fill-opacity", [
      "case",
      ["==", ["get", "subregion_id"], selectedSubregionId ?? ""],
      0.65,
      0.35
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
      <div className="flex h-[460px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
        Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local to enable interactive polygon map.
      </div>
    );
  }

  return <div ref={containerRef} className="h-[460px] w-full rounded-2xl border border-slate-200" />;
}
