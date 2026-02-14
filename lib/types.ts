export type Locale = "en" | "ko";

export type Category = "attractions" | "food" | "stay" | "events";

export type RegionFeatureProperties = {
  region_id: string;
  name_ko: string;
  name_en: string;
  admin_code?: string;
};

export type RegionFeature = GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon, RegionFeatureProperties>;

export type SubregionFeatureProperties = {
  subregion_id: string;
  parent_region_id: string;
  name_ko: string;
  name_en: string;
  area_code?: string;
  sigungu_code?: string;
};

export type NormalizedItem = {
  id: string;
  title: string;
  category: Category;
  addr: string;
  mapx: number | null;
  mapy: number | null;
  firstImage: string | null;
  tel: string | null;
  overview: string | null;
  startDate: string | null;
  endDate: string | null;
  source: "tourapi" | "mock" | "public-festival";
};

export type RegionItemsResponse = {
  regionId: string;
  subregionId?: string;
  presetId?: string;
  category: Category;
  page: number;
  pageSize: number;
  hasMore: boolean;
  items: NormalizedItem[];
};

export type RegionPreset = {
  id: string;
  nameEn: string;
  nameKo: string;
  regionId: string;
  subregionId?: string;
  keywordKo: string;
  keywordEn: string;
  areaCode?: string;
  sigunguCode?: string;
  center: [number, number];
};

export type Subregion = {
  id: string;
  parentRegionId: string;
  nameEn: string;
  nameKo: string;
  keywordEn: string;
  keywordKo: string;
  areaCode?: string;
  sigunguCode?: string;
  center: [number, number];
};

