import type { RegionFeature } from "./types";
import { regionGeoJson } from "./region-geojson";

export const regionCollection = regionGeoJson as GeoJSON.FeatureCollection<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  RegionFeature["properties"]
>;

export const regions = regionCollection.features;

export const regionById = Object.fromEntries(
  regions.map((feature) => [feature.properties.region_id, feature.properties])
);

export function listRegionIds() {
  return regions.map((feature) => feature.properties.region_id);
}
