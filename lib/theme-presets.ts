import type { Category } from "./types";

export type ThemePreset = {
  id: string;
  titleEn: string;
  titleKo: string;
  descEn: string;
  descKo: string;
  regionId: string;
  presetId?: string;
  subregionId?: string;
  category: Category;
};

export const themePresets: ThemePreset[] = [
  {
    id: "kdrama-night",
    titleEn: "K-Drama Night Seoul",
    titleKo: "K-드라마 나이트 서울",
    descEn: "Namsan views, city lights, romance spots",
    descKo: "남산 야경, 시티 라이트, 로맨틱 스팟",
    regionId: "seoul",
    presetId: "seoul",
    category: "attractions"
  },
  {
    id: "coastal-healing",
    titleEn: "Coastal Healing Trip",
    titleKo: "해안 힐링 여행",
    descEn: "Ocean views, sunrise points, relaxed pace",
    descKo: "오션뷰, 일출 명소, 여유로운 동선",
    regionId: "jeju",
    presetId: "jeju",
    category: "attractions"
  },
  {
    id: "local-foodie",
    titleEn: "Local Foodie Route",
    titleKo: "로컬 미식 루트",
    descEn: "Markets, street food, iconic local dishes",
    descKo: "시장, 길거리 음식, 대표 향토 요리",
    regionId: "busan",
    presetId: "busan",
    category: "food"
  },
  {
    id: "heritage-slow",
    titleEn: "Heritage Slow Walk",
    titleKo: "헤리티지 슬로 워크",
    descEn: "Hanok villages, temples, historical lanes",
    descKo: "한옥마을, 사찰, 역사 골목",
    regionId: "gyeongbuk",
    presetId: "gyeongju",
    category: "attractions"
  },
  {
    id: "festival-hunter",
    titleEn: "Festival Hunter",
    titleKo: "축제 헌터",
    descEn: "Seasonal events and local celebrations",
    descKo: "계절별 이벤트와 지역 축제",
    regionId: "seoul",
    presetId: "seoul",
    category: "events"
  }
];
