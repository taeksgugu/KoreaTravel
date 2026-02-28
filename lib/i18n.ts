export const locales = ["en"] as const;
export type Locale = "en" | "ko";

const dictionary = {
  en: {
    brand: "KoreaTravel",
    subtitle: "Find your best Korean city based on your travel personality",
    takeQuiz: "Start Travel Personality Quiz",
    details: "Travel Details",
    results: "Top Matches",
    drama: "K-Drama Spots",
    restaurants: "Food Finder"
  }
} as const;

export function t(locale: Locale) {
  return dictionary[locale === "en" ? "en" : "en"];
}

export function isLocale(value: string): value is Locale {
  return value === "en";
}
