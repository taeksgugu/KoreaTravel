import type { Locale } from "./types";

export const locales: Locale[] = ["en"];

export function isLocale(value: string): value is Locale {
  return value === "en";
}
