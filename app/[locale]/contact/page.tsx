import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact KoreaTravel editorial and support team."
};

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
      <p className="text-slate-700">
        For corrections, partnership inquiries, or policy questions, contact:
      </p>
      <p className="rounded-xl bg-slate-50 p-3 font-medium text-slate-900">
        Email: hello@visitkoreaguide.org
      </p>
      <p className="text-sm text-slate-600">
        We review reported issues on destination details, transport information, and broken links.
      </p>
      <p className="text-xs text-slate-500">Response target: within 3 business days.</p>
    </section>
  );
}
