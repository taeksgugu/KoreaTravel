export const siteConfig = {
  name: "KoreaTravel",
  description: "Travel personality quiz and destination guide for Korea",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://visitkoreaguide.org"
};

export const supportedLocales = ["en", "ko"] as const;

