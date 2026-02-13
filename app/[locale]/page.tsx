import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, t } from "@/lib/i18n";

export default async function LocaleHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const text = t(locale);

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">K-Travel Type</p>
        <h1 className="text-4xl font-semibold leading-tight text-slate-900">{text.brand}</h1>
        <p className="max-w-xl text-lg text-slate-700">{text.subtitle}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/${locale}/quiz`}
            className="rounded-full bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800"
          >
            {text.takeQuiz}
          </Link>
          <Link
            href={`/${locale}/drama`}
            className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-800 hover:bg-slate-50"
          >
            {text.drama}
          </Link>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">How it works</h2>
        <ol className="list-decimal space-y-2 pl-5 text-slate-700">
          <li>Take a 10-question visual quiz.</li>
          <li>Add your group, driving plan, Korean level, duration, and budget.</li>
          <li>Get your top 3 Korean cities with map-based previews.</li>
          <li>Open full city itineraries, drama spots, and food guides.</li>
        </ol>
      </div>
    </section>
  );
}
