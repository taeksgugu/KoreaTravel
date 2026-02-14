"use client";

import { useEffect, useMemo, useState } from "react";
import { getExploreText } from "@/lib/explore-i18n";
import type { Category, EventStatus, NormalizedItem, RegionItemsResponse } from "@/lib/types";

type Props = {
  locale: "en" | "ko";
  regionId: string;
  regionName: string;
  subregionId?: string;
  subregionName?: string;
  presetId?: string;
};

export function RegionContentPanel({
  locale,
  regionId,
  regionName,
  subregionId,
  subregionName,
  presetId
}: Props) {
  const t = getExploreText(locale);
  const tabs: { id: Category; label: string }[] = [
    { id: "attractions", label: locale === "ko" ? "관광지" : "Attractions" },
    { id: "food", label: locale === "ko" ? "맛집" : "Food" },
    { id: "stay", label: locale === "ko" ? "숙박" : "Stay" },
    { id: "events", label: locale === "ko" ? "행사" : "Events" }
  ];

  const [category, setCategory] = useState<Category>("attractions");
  const [items, setItems] = useState<NormalizedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState<"latest" | "title">("latest");
  const [eventStatus, setEventStatus] = useState<EventStatus>("all");

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [regionId, category, sort, eventStatus, presetId, subregionId]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);

      const query = new URLSearchParams({
        category,
        page: String(page),
        pageSize: "10",
        sort,
        locale
      });
      if (category === "events") query.set("eventStatus", eventStatus);

      if (presetId) query.set("presetId", presetId);
      if (subregionId) query.set("subregionId", subregionId);

      try {
        const response = await fetch(`/api/regions/${regionId}/items?${query.toString()}`);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const payload = (await response.json()) as RegionItemsResponse;
        if (ignore) return;

        setItems((prev) => (page === 1 ? payload.items : [...prev, ...payload.items]));
        setHasMore(payload.hasMore);
      } catch {
        if (ignore) return;
        setError(t.loadError);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    void load();

    return () => {
      ignore = true;
    };
  }, [category, eventStatus, locale, page, presetId, regionId, sort, subregionId, t.loadError]);

  const headerTitle = useMemo(() => {
    const base = subregionName ? `${regionName} / ${subregionName}` : regionName;
    return presetId ? `${base} (${t.presetApplied})` : base;
  }, [presetId, regionName, subregionName, t.presetApplied]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{t.selectedRegion}</p>
          <h2 className="text-xl font-semibold text-slate-900">{headerTitle}</h2>
        </div>

        <label className="text-sm text-slate-700">
          {t.sort}
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as "latest" | "title")}
            className="ml-2 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
          >
            <option value="latest">{t.latest}</option>
            <option value="title">{t.title}</option>
          </select>
        </label>
      </div>

      {category === "events" ? (
        <div className="mt-3">
          <label className="text-sm text-slate-700">
            {t.eventStatus}
            <select
              value={eventStatus}
              onChange={(event) => setEventStatus(event.target.value as EventStatus)}
              className="ml-2 rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm"
            >
              <option value="all">{t.all}</option>
              <option value="ongoing">{t.ongoing}</option>
              <option value="upcoming">{t.upcoming}</option>
            </select>
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = tab.id === category;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {loading && page === 1 ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-36 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : null}

      {error ? <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p> : null}

      {!loading && !error && items.length === 0 ? (
        <p className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">{t.noResults}</p>
      ) : null}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 p-3">
            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{item.addr || t.addressUnavailable}</p>
            {item.overview ? <p className="mt-2 line-clamp-3 text-sm text-slate-700">{item.overview}</p> : null}
            {item.startDate ? (
              <p className="mt-2 text-xs text-slate-500">
                {item.startDate} {item.endDate ? `~ ${item.endDate}` : ""}
              </p>
            ) : null}
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span>{item.category}</span>
              <span>{item.source}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(item.addr ? `${item.title} ${item.addr}` : item.title)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                {t.openInGoogleMaps}
              </a>
              <a
                href={`https://english.visitkorea.or.kr/svc/search/searchList.do?query=${encodeURIComponent(item.title)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
              >
                {t.visitKoreaSearch}
              </a>
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t.loading : t.loadMore}
          </button>
        </div>
      ) : null}
    </section>
  );
}

