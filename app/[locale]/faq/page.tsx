import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "KoreaTravel FAQ",
  description: "Frequently asked questions about data sources, recommendations, and travel planning."
};

export default async function FaqPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const faqs = [
    {
      q: "Where do destination listings come from?",
      a: "We use official public tourism APIs when available and clearly label fallback content when live data is unavailable."
    },
    {
      q: "Do you copy social reviews?",
      a: "No. KoreaTravel publishes original planning text and uses map search links rather than copied review snippets."
    },
    {
      q: "How are city recommendations calculated?",
      a: "Recommendations combine quiz vibe tags with travel constraints like language comfort, duration, access, and transport preference."
    },
    {
      q: "How often is content updated?",
      a: "Core editorial pages are reviewed periodically and when major travel data changes are detected."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">KoreaTravel FAQ</h1>
      <p className="text-slate-700">
        Answers about recommendations, source data, and quality control for {siteConfig.name}.
      </p>
      <div className="space-y-3">
        {faqs.map((item) => (
          <article key={item.q} className="rounded-2xl border border-slate-200 p-4">
            <h2 className="text-lg font-semibold text-slate-900">{item.q}</h2>
            <p className="mt-2 text-slate-700">{item.a}</p>
          </article>
        ))}
      </div>
      <p className="text-xs text-slate-500">Last updated: 2026-02-26</p>
    </section>
  );
}
