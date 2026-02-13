export const TAGS = [
  "URBAN",
  "NIGHTLIFE",
  "COASTAL",
  "ISLAND",
  "MOUNTAIN",
  "FOREST",
  "SCENIC",
  "HERITAGE",
  "TRADITIONAL",
  "SPIRITUAL",
  "CULINARY",
  "AESTHETIC",
  "SLOW",
  "OFFBEAT"
] as const;

export type TravelTag = (typeof TAGS)[number];

export type CitySlug =
  | "seoul"
  | "busan"
  | "jeju"
  | "incheon"
  | "chuncheon"
  | "gangneung"
  | "sokcho"
  | "jeonju"
  | "gyeongju"
  | "namhae"
  | "damyang"
  | "daegu"
  | "andong"
  | "yeosu"
  | "boryeong";

export type GroupType = "FRIENDS" | "FAMILY" | "SOLO" | "COUPLE" | "GROUP";
export type KoreanLevel = "NONE" | "BASIC" | "CONVERSATIONAL" | "FLUENT";
export type DurationType = "3_4" | "5_6" | "7_PLUS";
export type DrivingType = "YES" | "NO";

export interface City {
  slug: CitySlug;
  nameEn: string;
  nameKo: string;
  tags: TravelTag[];
  englishFriendly: 1 | 2 | 3 | 4 | 5;
  carRecommended: boolean;
  accessScore: 1 | 2 | 3 | 4 | 5;
  coordinates: { x: number; y: number };
  summary: string;
  itineraryShort: string[];
  itineraryMedium: string[];
  itineraryLong: string[];
  fromIcn: string;
  transport: string;
  unsplashQuery: string;
  mapsQuery: string;
}

export interface QuizOption {
  id: string;
  label: string;
  imageQuery: string;
  tags: TravelTag[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export interface RecommendationInput {
  selectedOptionIds: string[];
  group: GroupType;
  driving: DrivingType;
  koreanLevel: KoreanLevel;
  duration: DurationType;
  budget: string;
}

export interface RecommendationReason {
  topTags: TravelTag[];
  synergies: string[];
  englishNote: string;
  accessNote: string;
}

export interface RecommendationResult {
  slug: CitySlug;
  cityNameEn: string;
  cityNameKo: string;
  score: number;
  reason: RecommendationReason;
}

export interface UnsplashPhoto {
  url: string;
  photographer: string;
  photographerLink: string;
}
