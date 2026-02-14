"use client";

import { useEffect, useRef } from "react";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import type { CitySlug } from "@/lib/data/types";
import { presetById } from "@/lib/presets";

export interface ResultPin {
  slug: CitySlug;
  rank: 1 | 2 | 3;
  nameEn: string;
}

interface ResultMapboxProps {
  pins: ResultPin[];
  activeSlug?: CitySlug;
  onHover: (slug: CitySlug | null) => void;
  onSelect: (slug: CitySlug) => void;
}

export function ResultMapbox({ pins, activeSlug, onHover, onSelect }: ResultMapboxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!containerRef.current || mapRef.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [127.8, 36.2],
      zoom: 5.7,
      minZoom: 5.2,
      maxZoom: 10
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, [mapboxToken]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    for (const pin of pins) {
      const preset = presetById[pin.slug];
      if (!preset) continue;

      const el = document.createElement("button");
      const active = activeSlug === pin.slug;
      el.type = "button";
      el.className =
        "h-9 w-9 rounded-full border-2 text-xs font-bold shadow-md transition " +
        (active
          ? "border-emerald-700 bg-emerald-700 text-white"
          : "border-slate-900 bg-white text-slate-900 hover:bg-slate-100");
      el.textContent = String(pin.rank);
      el.setAttribute("aria-label", `Rank ${pin.rank}: ${pin.nameEn}`);
      el.onmouseenter = () => onHover(pin.slug);
      el.onmouseleave = () => onHover(null);
      el.onclick = () => onSelect(pin.slug);

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([preset.center[0], preset.center[1]])
        .addTo(map);

      markersRef.current.push(marker);
    }
  }, [pins, activeSlug, onHover, onSelect]);

  if (!mapboxToken) {
    return (
      <div className="flex h-[720px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
        Set NEXT_PUBLIC_MAPBOX_TOKEN to enable interactive map view.
      </div>
    );
  }

  return <div ref={containerRef} className="h-[720px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm" />;
}

