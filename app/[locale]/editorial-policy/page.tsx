import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How KoreaTravel creates, reviews, and updates destination content."
};

export default async function EditorialPolicyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Editorial Policy</h1>
      <p className="text-slate-700">
        We publish original summaries for destinations, itineraries, and local travel contexts.
        We avoid copying user-generated reviews and do not scrape restricted websites.
      </p>
      <div className="rounded-2xl bg-slate-50 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Quality Standards</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li>Source priority: official tourism APIs and official transport information</li>
          <li>Manual review for clarity, location accuracy, and traveler relevance</li>
          <li>Scheduled updates when key data changes (events, access, closures)</li>
          <li>Corrections published when users report inaccuracies</li>
        </ul>
      </div>
      <p className="text-slate-700">
        If a data source is unavailable, we clearly label fallback content as mock or estimated.
      </p>
      <p className="text-xs text-slate-500">Last reviewed: 2026-02-26</p>
    </section>
  );
}
