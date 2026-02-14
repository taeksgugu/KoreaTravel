import type { RegionPreset } from "./types";

export const regionPresets: RegionPreset[] = [
  { id: "seoul", nameEn: "Seoul", nameKo: "서울", regionId: "seoul", keywordKo: "서울", keywordEn: "Seoul", areaCode: "1", center: [126.978, 37.566] },
  { id: "busan", nameEn: "Busan", nameKo: "부산", regionId: "busan", keywordKo: "부산", keywordEn: "Busan", areaCode: "6", center: [129.075, 35.179] },
  { id: "jeju", nameEn: "Jeju", nameKo: "제주", regionId: "jeju", keywordKo: "제주", keywordEn: "Jeju", areaCode: "39", center: [126.531, 33.499] },
  { id: "incheon", nameEn: "Incheon", nameKo: "인천", regionId: "incheon", keywordKo: "인천", keywordEn: "Incheon", areaCode: "2", center: [126.705, 37.456] },
  { id: "chuncheon", nameEn: "Chuncheon", nameKo: "춘천", regionId: "gangwon", keywordKo: "춘천", keywordEn: "Chuncheon", areaCode: "32", center: [127.734, 37.881] },
  { id: "gangneung", nameEn: "Gangneung", nameKo: "강릉", regionId: "gangwon", keywordKo: "강릉", keywordEn: "Gangneung", areaCode: "32", center: [128.876, 37.752] },
  { id: "sokcho", nameEn: "Sokcho", nameKo: "속초", regionId: "gangwon", keywordKo: "속초", keywordEn: "Sokcho", areaCode: "32", center: [128.591, 38.207] },
  { id: "jeonju", nameEn: "Jeonju", nameKo: "전주", regionId: "jeonbuk", keywordKo: "전주", keywordEn: "Jeonju", areaCode: "37", center: [127.148, 35.824] },
  { id: "gyeongju", nameEn: "Gyeongju", nameKo: "경주", regionId: "gyeongbuk", keywordKo: "경주", keywordEn: "Gyeongju", areaCode: "35", center: [129.224, 35.856] },
  { id: "namhae", nameEn: "Namhae", nameKo: "남해", regionId: "gyeongnam", keywordKo: "남해", keywordEn: "Namhae", areaCode: "36", center: [127.893, 34.837] },
  { id: "damyang", nameEn: "Damyang", nameKo: "담양", regionId: "jeonnam", keywordKo: "담양", keywordEn: "Damyang", areaCode: "38", center: [126.987, 35.322] },
  { id: "daegu", nameEn: "Daegu", nameKo: "대구", regionId: "daegu", keywordKo: "대구", keywordEn: "Daegu", areaCode: "4", center: [128.602, 35.871] },
  { id: "andong", nameEn: "Andong", nameKo: "안동", regionId: "gyeongbuk", keywordKo: "안동", keywordEn: "Andong", areaCode: "35", center: [128.729, 36.568] },
  { id: "yeosu", nameEn: "Yeosu", nameKo: "여수", regionId: "jeonnam", keywordKo: "여수", keywordEn: "Yeosu", areaCode: "38", center: [127.662, 34.760] },
  { id: "boryeong", nameEn: "Boryeong", nameKo: "보령", regionId: "chungnam", keywordKo: "보령", keywordEn: "Boryeong", areaCode: "34", center: [126.612, 36.333] }
];

export const presetById = Object.fromEntries(regionPresets.map((preset) => [preset.id, preset]));

