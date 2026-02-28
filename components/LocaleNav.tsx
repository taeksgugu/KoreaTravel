"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export function LocaleNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const labels = {
    en: {
      explore: "Explore Korea",
      drama: "K-Drama Travel",
      restaurants: "K-Food Guide",
      quiz: "Travel Quiz",
      home: "K-Journey Guide"
    },
    ko: {
      explore: "한국 지역 탐색",
      drama: "K-드라마 여행",
      restaurants: "K-푸드 가이드",
      quiz: "여행 퀴즈",
      home: "K-저니 가이드"
    }
  } as const;

  const pageTitle = pathname.includes("/explore")
    ? labels[locale].explore
    : pathname.includes("/drama")
      ? labels[locale].drama
      : pathname.includes("/restaurants")
        ? labels[locale].restaurants
        : pathname.includes("/quiz")
          ? labels[locale].quiz
          : labels[locale].home;

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[560px] items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
          </span>
          <Link href={`/${locale}`} className="text-xl font-bold tracking-tight text-slate-900">
            {pageTitle}
          </Link>
        </div>
        <Link
          href={locale === "en" ? "/ko" : "/en"}
          className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
        >
          {locale === "en" ? "KO" : "EN"}
        </Link>
      </div>
    </nav>
  );
}
