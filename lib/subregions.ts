import { subregionGeoJson } from "./subregion-geojson";
import type { Subregion, SubregionFeatureProperties } from "./types";

function getCenter(geometry: GeoJSON.MultiPolygon): [number, number] {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (const polygon of geometry.coordinates) {
    for (const ring of polygon) {
      for (const [x, y] of ring) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  return [(minX + maxX) / 2, (minY + maxY) / 2];
}

export const subregions: Subregion[] = subregionGeoJson.features.map((feature) => ({
  id: feature.properties.subregion_id,
  parentRegionId: feature.properties.parent_region_id,
  nameEn: feature.properties.name_en,
  nameKo: feature.properties.name_ko,
  keywordEn: feature.properties.name_en,
  keywordKo: feature.properties.name_ko,
  areaCode: feature.properties.area_code,
  sigunguCode: feature.properties.sigungu_code,
  center: getCenter(feature.geometry)
}));

export const subregionById = Object.fromEntries(subregions.map((item) => [item.id, item]));

export const subregionsByRegion = subregions.reduce<Record<string, Subregion[]>>((acc, item) => {
  if (!acc[item.parentRegionId]) acc[item.parentRegionId] = [];
  acc[item.parentRegionId].push(item);
  return acc;
}, {});

export const subregionFeatureById = Object.fromEntries(
  subregionGeoJson.features.map((feature) => [feature.properties.subregion_id, feature])
);

export type { SubregionFeatureProperties };
export { subregionGeoJson };
