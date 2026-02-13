"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cities } from "@/lib/data/cities";
import type { CitySlug } from "@/lib/data/types";

export default function RestaurantsPage() {
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  const [slug, setSlug] = useState<CitySlug>(cities[0].slug);
  const city = useMemo(() => cities.find((item) => item.slug === slug) ?? cities[0], [slug]);

  return (
    <section className="mx-auto max-w-3xl space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <h1 className="text-3xl font-semibold text-slate-900">Local Restaurant Finder</h1>
      <p className="text-slate-700">
        This page provides original city food notes and Google Maps search links only. No copied reviews are used.
      </p>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Select city</span>
        <select value={slug} onChange={(e) => setSlug(e.target.value as CitySlug)} className="w-full rounded-xl border border-slate-300 p-3">
          {cities.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.nameEn} ({option.nameKo})
            </option>
          ))}
        </select>
      </label>

      <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-xl font-semibold text-slate-900">{city.nameEn} Food Snapshot</h2>
        <p className="mt-2 text-sm text-slate-700">
          Focus on seasonal specialties, neighborhood markets, and independent local kitchens. Use transit-friendly zones first,
          then expand to side districts based on your comfort level.
        </p>
        <a
          href={`https://www.google.com/maps/search/${encodeURIComponent(`${city.nameEn} local restaurants`)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
        >
          Open Google Maps Search
        </a>
      </article>

      <Link href={`/${locale}/result`} className="inline-block text-sm font-medium text-emerald-800 underline">
        Back to results
      </Link>
    </section>
  );
}
