import type { RegionFeatureProperties } from "./types";

export const regionGeoJson: GeoJSON.FeatureCollection<
  GeoJSON.Polygon | GeoJSON.MultiPolygon,
  RegionFeatureProperties
> = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { region_id: "seoul", name_ko: "서울", name_en: "Seoul", admin_code: "11" }, geometry: { type: "Polygon", coordinates: [[[126.88, 37.42], [127.18, 37.42], [127.18, 37.7], [126.88, 37.7], [126.88, 37.42]]] } },
    { type: "Feature", properties: { region_id: "incheon", name_ko: "인천", name_en: "Incheon", admin_code: "28" }, geometry: { type: "Polygon", coordinates: [[[126.3, 37.2], [126.95, 37.2], [126.95, 37.75], [126.3, 37.75], [126.3, 37.2]]] } },
    { type: "Feature", properties: { region_id: "gyeonggi", name_ko: "경기", name_en: "Gyeonggi", admin_code: "41" }, geometry: { type: "Polygon", coordinates: [[[126.55, 36.9], [127.75, 36.9], [127.75, 38.3], [126.55, 38.3], [126.55, 36.9]]] } },
    { type: "Feature", properties: { region_id: "gangwon", name_ko: "강원", name_en: "Gangwon", admin_code: "42" }, geometry: { type: "Polygon", coordinates: [[[127.35, 37], [129.45, 37], [129.45, 38.65], [127.35, 38.65], [127.35, 37]]] } },
    { type: "Feature", properties: { region_id: "chungbuk", name_ko: "충북", name_en: "Chungbuk", admin_code: "43" }, geometry: { type: "Polygon", coordinates: [[[127.2, 36.2], [128.35, 36.2], [128.35, 37.35], [127.2, 37.35], [127.2, 36.2]]] } },
    { type: "Feature", properties: { region_id: "chungnam", name_ko: "충남", name_en: "Chungnam", admin_code: "44" }, geometry: { type: "Polygon", coordinates: [[[126.35, 35.95], [127.3, 35.95], [127.3, 37.1], [126.35, 37.1], [126.35, 35.95]]] } },
    { type: "Feature", properties: { region_id: "daejeon", name_ko: "대전", name_en: "Daejeon", admin_code: "30" }, geometry: { type: "Polygon", coordinates: [[[127.26, 36.24], [127.5, 36.24], [127.5, 36.46], [127.26, 36.46], [127.26, 36.24]]] } },
    { type: "Feature", properties: { region_id: "sejong", name_ko: "세종", name_en: "Sejong", admin_code: "36" }, geometry: { type: "Polygon", coordinates: [[[127.18, 36.42], [127.36, 36.42], [127.36, 36.6], [127.18, 36.6], [127.18, 36.42]]] } },
    { type: "Feature", properties: { region_id: "jeonbuk", name_ko: "전북", name_en: "Jeonbuk", admin_code: "45" }, geometry: { type: "Polygon", coordinates: [[[126.6, 35.2], [127.7, 35.2], [127.7, 36.25], [126.6, 36.25], [126.6, 35.2]]] } },
    { type: "Feature", properties: { region_id: "jeonnam", name_ko: "전남", name_en: "Jeonnam", admin_code: "46" }, geometry: { type: "Polygon", coordinates: [[[126.05, 34.15], [127.7, 34.15], [127.7, 35.35], [126.05, 35.35], [126.05, 34.15]]] } },
    { type: "Feature", properties: { region_id: "gwangju", name_ko: "광주", name_en: "Gwangju", admin_code: "29" }, geometry: { type: "Polygon", coordinates: [[[126.78, 35.05], [127.02, 35.05], [127.02, 35.25], [126.78, 35.25], [126.78, 35.05]]] } },
    { type: "Feature", properties: { region_id: "gyeongbuk", name_ko: "경북", name_en: "Gyeongbuk", admin_code: "47" }, geometry: { type: "Polygon", coordinates: [[[128.1, 35.4], [129.6, 35.4], [129.6, 37.25], [128.1, 37.25], [128.1, 35.4]]] } },
    { type: "Feature", properties: { region_id: "gyeongnam", name_ko: "경남", name_en: "Gyeongnam", admin_code: "48" }, geometry: { type: "Polygon", coordinates: [[[127.45, 34.55], [129.1, 34.55], [129.1, 35.95], [127.45, 35.95], [127.45, 34.55]]] } },
    { type: "Feature", properties: { region_id: "daegu", name_ko: "대구", name_en: "Daegu", admin_code: "27" }, geometry: { type: "Polygon", coordinates: [[[128.45, 35.75], [128.75, 35.75], [128.75, 36], [128.45, 36], [128.45, 35.75]]] } },
    { type: "Feature", properties: { region_id: "ulsan", name_ko: "울산", name_en: "Ulsan", admin_code: "31" }, geometry: { type: "Polygon", coordinates: [[[129.1, 35.4], [129.45, 35.4], [129.45, 35.7], [129.1, 35.7], [129.1, 35.4]]] } },
    { type: "Feature", properties: { region_id: "busan", name_ko: "부산", name_en: "Busan", admin_code: "26" }, geometry: { type: "Polygon", coordinates: [[[128.8, 35], [129.35, 35], [129.35, 35.35], [128.8, 35.35], [128.8, 35]]] } },
    { type: "Feature", properties: { region_id: "jeju", name_ko: "제주", name_en: "Jeju", admin_code: "50" }, geometry: { type: "Polygon", coordinates: [[[126.1, 33.1], [126.95, 33.1], [126.95, 33.65], [126.1, 33.65], [126.1, 33.1]]] } }
  ]
};
