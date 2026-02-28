import Link from "next/link";
import { citiesBySlug } from "@/lib/data/cities";
import type { CitySlug } from "@/lib/data/types";

const starterSlugs: CitySlug[] = ["seoul", "busan", "jeju"];

export function ResultFallbackPanel({ locale }: { locale: string }) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">We couldn’t load your results.</h2>
      <p className="text-slate-700">
        Your quiz data might be missing or your network request may have failed. You can retry the quiz or continue with starter city guides.
      </p>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/${locale}/quiz`}
          className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Retake Quiz
        </Link>
        <Link
          href={`/${locale}/explore`}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Explore Cities
        </Link>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {starterSlugs.map((slug) => {
          const city = citiesBySlug[slug];
          return (
            <Link
              key={slug}
              href={`/${locale}/city/${slug}`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-300 hover:bg-blue-50"
            >
              <h3 className="font-semibold text-slate-900">{city.nameEn}</h3>
              <p className="mt-1 text-sm text-slate-600">{city.summary}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
