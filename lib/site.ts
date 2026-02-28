function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getBaseUrl(): string {
  const raw =
    process.env.BASE_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://visitkoreaguide.org";
  return stripTrailingSlash(raw);
}

export const siteConfig = {
  name: "KoreaTravel",
  description: "Travel personality quiz and destination guide for Korea",
  siteUrl: getBaseUrl()
};

export const supportedLocales = ["en"] as const;
