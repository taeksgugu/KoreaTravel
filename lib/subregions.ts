import type { Subregion, SubregionFeatureProperties } from "./types";

const DRILLDOWN_SUBREGIONS: Subregion[] = [
  {
    id: "chuncheon",
    parentRegionId: "gangwon",
    nameEn: "Chuncheon",
    nameKo: "춘천",
    keywordEn: "Chuncheon",
    keywordKo: "춘천",
    areaCode: "32",
    sigunguCode: "13",
    center: [127.734, 37.881]
  },
  {
    id: "gangneung",
    parentRegionId: "gangwon",
    nameEn: "Gangneung",
    nameKo: "강릉",
    keywordEn: "Gangneung",
    keywordKo: "강릉",
    areaCode: "32",
    sigunguCode: "1",
    center: [128.876, 37.752]
  },
  {
    id: "sokcho",
    parentRegionId: "gangwon",
    nameEn: "Sokcho",
    nameKo: "속초",
    keywordEn: "Sokcho",
    keywordKo: "속초",
    areaCode: "32",
    sigunguCode: "5",
    center: [128.591, 38.207]
  },
  {
    id: "jeonju",
    parentRegionId: "jeonbuk",
    nameEn: "Jeonju",
    nameKo: "전주",
    keywordEn: "Jeonju",
    keywordKo: "전주",
    areaCode: "37",
    sigunguCode: "12",
    center: [127.148, 35.824]
  },
  {
    id: "gyeongju",
    parentRegionId: "gyeongbuk",
    nameEn: "Gyeongju",
    nameKo: "경주",
    keywordEn: "Gyeongju",
    keywordKo: "경주",
    areaCode: "35",
    sigunguCode: "2",
    center: [129.224, 35.856]
  },
  {
    id: "namhae",
    parentRegionId: "gyeongnam",
    nameEn: "Namhae",
    nameKo: "남해",
    keywordEn: "Namhae",
    keywordKo: "남해",
    areaCode: "36",
    sigunguCode: "16",
    center: [127.893, 34.837]
  },
  {
    id: "damyang",
    parentRegionId: "jeonnam",
    nameEn: "Damyang",
    nameKo: "담양",
    keywordEn: "Damyang",
    keywordKo: "담양",
    areaCode: "38",
    sigunguCode: "7",
    center: [126.987, 35.322]
  },
  {
    id: "andong",
    parentRegionId: "gyeongbuk",
    nameEn: "Andong",
    nameKo: "안동",
    keywordEn: "Andong",
    keywordKo: "안동",
    areaCode: "35",
    sigunguCode: "11",
    center: [128.729, 36.568]
  },
  {
    id: "yeosu",
    parentRegionId: "jeonnam",
    nameEn: "Yeosu",
    nameKo: "여수",
    keywordEn: "Yeosu",
    keywordKo: "여수",
    areaCode: "38",
    sigunguCode: "13",
    center: [127.662, 34.760]
  },
  {
    id: "boryeong",
    parentRegionId: "chungnam",
    nameEn: "Boryeong",
    nameKo: "보령",
    keywordEn: "Boryeong",
    keywordKo: "보령",
    areaCode: "34",
    sigunguCode: "5",
    center: [126.612, 36.333]
  }
];

function boxAround(center: [number, number], dx = 0.12, dy = 0.09): GeoJSON.Polygon {
  const [x, y] = center;
  return {
    type: "Polygon",
    coordinates: [
      [
        [x - dx, y - dy],
        [x + dx, y - dy],
        [x + dx, y + dy],
        [x - dx, y + dy],
        [x - dx, y - dy]
      ]
    ]
  };
}

export const subregions = DRILLDOWN_SUBREGIONS;

export const subregionById = Object.fromEntries(subregions.map((item) => [item.id, item]));

export const subregionsByRegion = subregions.reduce<Record<string, Subregion[]>>((acc, item) => {
  if (!acc[item.parentRegionId]) acc[item.parentRegionId] = [];
  acc[item.parentRegionId].push(item);
  return acc;
}, {});

export const subregionGeoJson: GeoJSON.FeatureCollection<
  GeoJSON.Polygon,
  SubregionFeatureProperties
> = {
  type: "FeatureCollection",
  features: subregions.map((subregion) => ({
    type: "Feature",
    properties: {
      subregion_id: subregion.id,
      parent_region_id: subregion.parentRegionId,
      name_en: subregion.nameEn,
      name_ko: subregion.nameKo,
      area_code: subregion.areaCode,
      sigungu_code: subregion.sigunguCode
    },
    geometry: boxAround(subregion.center)
  }))
};
