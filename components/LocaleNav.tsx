"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function LocaleNav({ locale }: { locale: Locale }) {
  return (
    <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
      <Link href={`/${locale}`} className="text-xl font-semibold tracking-tight text-slate-900">
        KoreaTravel
      </Link>
      <div className="flex gap-3 text-sm text-slate-700">
        <Link href={`/${locale}/quiz`} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100">Quiz</Link>
        <Link href={`/${locale}/explore`} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100">Explore</Link>
        <Link href={`/${locale}/drama`} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100">Drama</Link>
        <Link href={`/${locale}/restaurants`} className="rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100">Restaurants</Link>
        <Link href={locale === "en" ? "/ko" : "/en"} className="rounded-full border border-emerald-700 px-3 py-1 text-emerald-800 hover:bg-emerald-50">
          {locale === "en" ? "KO" : "EN"}
        </Link>
      </div>
    </nav>
  );
}
