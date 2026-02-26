import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for KoreaTravel."
};

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
      <p className="text-slate-700">
        Content on KoreaTravel is provided for travel planning information. You remain responsible for final booking,
        visa, transport, and local safety decisions.
      </p>
      <p className="text-slate-700">
        We do not guarantee uninterrupted availability of external data providers or map platforms linked from this site.
      </p>
      <p className="text-slate-700">
        Reuse of original site text requires attribution to KoreaTravel.
      </p>
      <p className="text-xs text-slate-500">Effective date: 2026-02-26</p>
    </section>
  );
}
