import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LocaleNav } from "@/components/LocaleNav";
import { isLocale, locales } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return {
    title: "KoreaTravel",
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}`])
      )
    }
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-10">
      <LocaleNav locale={locale} />
      <main className="mx-auto w-full max-w-6xl px-4">{children}</main>
    </div>
  );
}
