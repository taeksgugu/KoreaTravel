"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { cities } from "@/lib/data/cities";
import { getRestaurantGuide } from "@/lib/data/restaurants";
import type { CitySlug } from "@/lib/data/types";

const categoryTabs = ["Street Food", "Traditional", "BBQ", "Cafes"];

export function RestaurantsClient({ locale }: { locale: string }) {
  const [slug, setSlug] = useState<CitySlug>(cities[0].slug);
  const [tab, setTab] = useState("Street Food");
  const city = useMemo(() => cities.find((item) => item.slug === slug) ?? cities[0], [slug]);
  const guide = useMemo(() => getRestaurantGuide(slug), [slug]);

  return (
    <section className="space-y-4 pb-4">
      <header className="space-y-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <h1 className="text-4xl font-extrabold text-slate-900">K-Food Guide</h1>
        <div className="relative">
          <input
            placeholder={locale === "ko" ? "식당 또는 음식을 검색하세요..." : "Search restaurants or dishes..."}
            className="w-full rounded-xl bg-slate-100 px-4 py-3 pr-24 text-sm text-slate-700 outline-none"
            readOnly
          />
          <button className="absolute right-2 top-1.5 rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-semibold text-white">
            Filter
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {categoryTabs.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                tab === item ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="text-sm font-medium text-slate-700">
          Select city
          <select
            value={slug}
            onChange={(e) => setSlug(e.target.value as CitySlug)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white p-3"
          >
            {cities.map((option) => (
              <option key={option.slug} value={option.slug}>
                {option.nameEn} ({option.nameKo})
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="overflow-hidden rounded-3xl bg-slate-900">
        <Image
          src="https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?auto=format&fit=crop&w=1200&q=80"
          alt="Featured Korean food"
          width={1200}
          height={560}
          className="h-56 w-full object-cover opacity-80"
        />
        <div className="-mt-28 p-4">
          <div className="inline-flex rounded-full bg-blue-700 px-3 py-1 text-xs font-bold text-white">TOP RATED</div>
          <h2 className="mt-2 text-4xl font-extrabold text-white">{city.nameEn} Must-Try</h2>
          <p className="mt-1 text-sm text-slate-200">{guide.intro}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-4xl font-extrabold text-slate-900">{tab} Near You</h2>
        {guide.categories.map((category) => (
          <article key={`${guide.citySlug}-${category.id}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex h-44 items-end bg-gradient-to-br from-blue-200 via-indigo-200 to-slate-200 p-4">
              <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-blue-700">{category.title}</span>
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900">{category.title}</h3>
                  <p className="text-sm text-slate-500">{city.nameEn}, Korea</p>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">MAP</span>
              </div>
              <p className="text-sm text-slate-700">{category.description}</p>
              <div className="pt-1">
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(category.query)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}
