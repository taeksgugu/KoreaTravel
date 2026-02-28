"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const labels = {
    en: {
      about: "About",
      editorialPolicy: "Editorial Policy",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      faq: "FAQ",
      notice:
        "KoreaTravel provides original travel planning content for international visitors. Last editorial update: February 2026."
    },
    ko: {
      about: "소개",
      editorialPolicy: "편집 원칙",
      privacy: "개인정보처리방침",
      terms: "이용약관",
      contact: "문의하기",
      faq: "자주 묻는 질문",
      notice:
        "KoreaTravel은 해외 방문자를 위한 원본 여행 계획 콘텐츠를 제공합니다. 최종 편집 업데이트: 2026년 2월."
    }
  } as const;

  return (
    <footer className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <Link href={`/${locale}/about` as never} className="underline">
          {labels[locale].about}
        </Link>
        <Link href={`/${locale}/editorial-policy` as never} className="underline">
          {labels[locale].editorialPolicy}
        </Link>
        <Link href={`/${locale}/privacy` as never} className="underline">
          {labels[locale].privacy}
        </Link>
        <Link href={`/${locale}/terms` as never} className="underline">
          {labels[locale].terms}
        </Link>
        <Link href={`/${locale}/contact` as never} className="underline">
          {labels[locale].contact}
        </Link>
        <Link href={`/${locale}/faq` as never} className="underline">
          {labels[locale].faq}
        </Link>
      </div>
      <p className="mt-3 text-xs text-slate-500">{labels[locale].notice}</p>
    </footer>
  );
}
