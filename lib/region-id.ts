import { regionById } from "@/lib/regions";

function compact(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\\s_\\-]+/g, "")
    .replace(/[^\\p{L}\\p{N}]/gu, "");
}

const manualAliases: Record<string, string> = {
  "서울": "seoul",
  "서울특별시": "seoul",
  "부산": "busan",
  "부산광역시": "busan",
  "인천": "incheon",
  "인천광역시": "incheon",
  "대구": "daegu",
  "대구광역시": "daegu",
  "대전": "daejeon",
  "대전광역시": "daejeon",
  "광주": "gwangju",
  "광주광역시": "gwangju",
  "울산": "ulsan",
  "울산광역시": "ulsan",
  "세종": "sejong",
  "세종특별자치시": "sejong",
  "경기": "gyeonggi",
  "경기도": "gyeonggi",
  "강원": "gangwon",
  "강원도": "gangwon",
  "충북": "chungbuk",
  "충청북도": "chungbuk",
  "충남": "chungnam",
  "충청남도": "chungnam",
  "전북": "jeonbuk",
  "전라북도": "jeonbuk",
  "전남": "jeonnam",
  "전라남도": "jeonnam",
  "경북": "gyeongbuk",
  "경상북도": "gyeongbuk",
  "경남": "gyeongnam",
  "경상남도": "gyeongnam",
  "제주": "jeju",
  "제주도": "jeju",
  "제주특별자치도": "jeju"
};

const aliasMap = (() => {
  const map = new Map<string, string>();

  Object.entries(regionById).forEach(([regionId, region]) => {
    map.set(compact(regionId), regionId);
    map.set(compact(region.name_en), regionId);
    map.set(compact(region.name_ko), regionId);
  });

  Object.entries(manualAliases).forEach(([alias, regionId]) => {
    map.set(compact(alias), regionId);
  });

  return map;
})();

export function normalizeRegionId(input: string): string {
  const normalizedKey = compact(input);
  return aliasMap.get(normalizedKey) ?? input.trim().toLowerCase();
}

