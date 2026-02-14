"use client";

import { useEffect } from "react";
import { adsenseClient } from "@/lib/adsense";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSenseUnit({
  slot,
  className
}: {
  slot: string;
  className?: string;
}) {
  useEffect(() => {
    if (!adsenseClient || !slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or script timing can prevent ad requests.
    }
  }, [slot]);

  if (!adsenseClient || !slot) {
    return null;
  }

  return (
    <aside
      className={className ?? "rounded-2xl border border-slate-200 bg-white p-4"}
      aria-label="Sponsored"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        Sponsored
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: 140 }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

