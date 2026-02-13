import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSenseUnit } from "@/components/AdSenseUnit";
import { adsenseSlots } from "@/lib/adsense";
import { citiesBySlug } from "@/lib/data/cities";
import { isLocale } from "@/lib/i18n";

export default async function CityPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const city = citiesBySlug[slug as keyof typeof citiesBySlug];
  if (!city) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">City Guide</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">{city.nameEn} ({city.nameKo})</h1>
          <p className="mt-3 max-w-3xl text-slate-700">{city.summary}</p>
          <p className="mt-3 text-sm text-slate-600">Tags: {city.tags.join(", ")}</p>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">3-4 Day Plan</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {city.itineraryShort.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">5-6 Day Plan</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {city.itineraryMedium.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">7+ Day Plan</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {city.itineraryLong.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Getting There from ICN</h2>
            <p className="mt-3 text-sm text-slate-700">{city.fromIcn}</p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Internal Transport Guide</h2>
            <p className="mt-3 text-sm text-slate-700">{city.transport}</p>
          </article>
        </div>

        <div className="flex flex-wrap gap-3 pb-8">
          <Link href={`/${locale}/result`} className="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">
            Back to Results
          </Link>
          <a
            href={`https://www.google.com/maps/search/${encodeURIComponent(city.mapsQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Open Google Maps Search
          </a>
        </div>
      </section>
      <AdSenseUnit slot={adsenseSlots.city} />
    </div>
  );
}
