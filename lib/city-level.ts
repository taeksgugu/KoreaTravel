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

export function isCityLevelRegion(regionId: string): boolean {
  return CITY_LEVEL_REGION_IDS.has(regionId);
}

export function listCityLevelRegionIds(): string[] {
  return Array.from(CITY_LEVEL_REGION_IDS);
}

