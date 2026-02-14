export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

const dictionary = {
  en: {
    brand: "KoreaTravel",
    subtitle: "Find your best Korean city based on your travel personality",
    takeQuiz: "Start Travel Personality Quiz",
    details: "Travel Details",
    results: "Top Matches",
    drama: "K-Drama Spots",
    restaurants: "Food Finder"
  },
  ko: {
    brand: "코리아트래블",
    subtitle: "여행 성향으로 한국 도시를 추천받아 보세요",
    takeQuiz: "여행 성향 퀴즈 시작",
    details: "여행 정보",
    results: "추천 결과",
    drama: "드라마 촬영지",
    restaurants: "맛집 찾기"
  }
} as const;

export function t(locale: Locale) {
  return dictionary[locale];
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
