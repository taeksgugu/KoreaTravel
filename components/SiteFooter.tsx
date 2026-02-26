"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <Link href={`/${locale}/about` as never} className="underline">
          About
        </Link>
        <Link href={`/${locale}/editorial-policy` as never} className="underline">
          Editorial Policy
        </Link>
        <Link href={`/${locale}/privacy` as never} className="underline">
          Privacy
        </Link>
        <Link href={`/${locale}/terms` as never} className="underline">
          Terms
        </Link>
        <Link href={`/${locale}/contact` as never} className="underline">
          Contact
        </Link>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        KoreaTravel provides original travel planning content for international visitors.
        Last editorial update: February 2026.
      </p>
    </footer>
  );
}
