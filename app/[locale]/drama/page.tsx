import Link from "next/link";
import { notFound } from "next/navigation";
import { dramaItems } from "@/lib/data/dramas";
import { citiesBySlug } from "@/lib/data/cities";
import { isLocale } from "@/lib/i18n";

export default async function DramaPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <header>
        <h1 className="text-3xl font-semibold text-slate-900">K-Drama Filming City Guide</h1>
        <p className="mt-2 text-slate-700">
          No copyrighted screenshots are used. Use the city links and Google Maps search links to explore filming areas.
        </p>
      </header>

      <div className="space-y-4">
        {dramaItems.map((drama) => (
          <article key={drama.title} className="rounded-2xl border border-slate-200 p-5">
            <h2 className="text-xl font-semibold text-slate-900">{drama.title}</h2>
            <p className="mt-1 text-sm text-slate-700">{drama.note}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {drama.filmingCities.map((slug) => {
                const city = citiesBySlug[slug];
                return (
                  <Link
                    key={`${drama.title}-${slug}`}
                    href={`/${locale}/city/${slug}`}
                    className="rounded-full border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
                  >
                    {city.nameEn}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3">
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(`${drama.title} filming locations Korea`)}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-emerald-800 underline"
              >
                Google Maps search for filming locations
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
