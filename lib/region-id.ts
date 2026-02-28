import { regionById } from "@/lib/regions";

function compact(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[\s_-]+/g, "")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

const manualAliases: Record<string, string> = {
  seoul: "seoul",
  "서울": "seoul",
  "서울특별시": "seoul",
  busan: "busan",
  "부산": "busan",
  "부산광역시": "busan",
  incheon: "incheon",
  "인천": "incheon",
  "인천광역시": "incheon",
  daegu: "daegu",
  "대구": "daegu",
  "대구광역시": "daegu",
  daejeon: "daejeon",
  "대전": "daejeon",
  "대전광역시": "daejeon",
  gwangju: "gwangju",
  "광주": "gwangju",
  "광주광역시": "gwangju",
  ulsan: "ulsan",
  "울산": "ulsan",
  "울산광역시": "ulsan",
  sejong: "sejong",
  "세종": "sejong",
  "세종특별자치시": "sejong",
  gyeonggi: "gyeonggi",
  "경기": "gyeonggi",
  "경기도": "gyeonggi",
  gangwon: "gangwon",
  "강원": "gangwon",
  "강원도": "gangwon",
  chungbuk: "chungbuk",
  "충북": "chungbuk",
  "충청북도": "chungbuk",
  chungnam: "chungnam",
  "충남": "chungnam",
  "충청남도": "chungnam",
  jeonbuk: "jeonbuk",
  "전북": "jeonbuk",
  "전라북도": "jeonbuk",
  jeonnam: "jeonnam",
  "전남": "jeonnam",
  "전라남도": "jeonnam",
  gyeongbuk: "gyeongbuk",
  "경북": "gyeongbuk",
  "경상북도": "gyeongbuk",
  gyeongnam: "gyeongnam",
  "경남": "gyeongnam",
  "경상남도": "gyeongnam",
  jeju: "jeju",
  "제주": "jeju",
  "제주도": "jeju",
  "제주특별자치도": "jeju"
};

const aliasMap = (() => {
  const map = new Map<string, string>();

  for (const [regionId, region] of Object.entries(regionById)) {
    map.set(compact(regionId), regionId);
    map.set(compact(region.name_en), regionId);
    map.set(compact(region.name_ko), regionId);
  }

  for (const [alias, regionId] of Object.entries(manualAliases)) {
    map.set(compact(alias), regionId);
  }

  return map;
})();

export function normalizeRegionId(input: string): string {
  const normalizedKey = compact(input);
  return aliasMap.get(normalizedKey) ?? input.trim().toLowerCase();
}
