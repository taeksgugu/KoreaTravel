import type { Locale } from "./types";

export const locales: Locale[] = ["en", "ko"];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ko";
}

