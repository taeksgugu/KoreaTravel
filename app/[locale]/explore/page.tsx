import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { MainExplorer } from "@/components/MainExplorer";
import { getExploreText } from "@/lib/explore-i18n";
import { isLocale } from "@/lib/i18n";
import { siteConfig, supportedLocales } from "@/lib/site";

function renderParagraphWithLinks(paragraph: string) {
  const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(paragraph)) !== null) {
    const [fullMatch, label, href] = match;
    const start = match.index;

    if (start > lastIndex) {
      nodes.push(paragraph.slice(lastIndex, start));
    }

    nodes.push(
      <a
        key={`${href}-${start}`}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-blue-900 underline decoration-blue-900 hover:text-blue-700"
      >
        {label}
      </a>
    );

    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < paragraph.length) {
    nodes.push(paragraph.slice(lastIndex));
  }

  return nodes;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getExploreText(locale);

  return {
    title: t.metadataTitle,
    description: t.metadataDescription,
    alternates: {
      canonical: `/${locale}/explore`,
      languages: Object.fromEntries(
        supportedLocales.map((item) => [item, `${siteConfig.siteUrl}/${item}/explore`])
      )
    }
  };
}

export default async function ExplorePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="space-y-4 pb-2">
      <MainExplorer locale={locale} />
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-2xl font-bold text-slate-900">
          {locale === "ko" ? "도시 탐색 사용 가이드" : "How to Use Explore Cities"}
        </h2>
        <p className="text-slate-700">
          {locale === "ko"
            ? "Explore는 도시 단위 탐색을 기본으로 제공하며, 필요한 경우 시군구 드릴다운으로 더 세부 지역까지 확인할 수 있습니다. 최종 일정 전에 접근성, 관광지, 맛집, 숙박, 행사 정보를 한 화면에서 비교해 보세요."
            : "Explore is designed around city-level selection. When available, you can drill down into specific districts for finer planning. Compare access, attractions, food, stay options, and events before finalizing your itinerary."}
        </p>
        <p className="text-slate-700">
          {locale === "ko"
            ? "목록 데이터는 공식 관광 API를 우선 사용하며, 라이브 데이터가 일시적으로 불가할 때는 대체 데이터를 명확히 구분해 표시합니다."
            : "Listings use official tourism APIs when available. If live data is temporarily unavailable, clearly labeled fallback content is shown so the page never appears empty."}
        </p>
      </section>
      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-3xl font-bold text-slate-900">
          {locale === "ko" ? "지역별 장문 여행 가이드" : "Long-Form Regional Travel Guides"}
        </h2>
        <p className="text-slate-700">
          {locale === "ko"
            ? "처음 방문하는 여행자가 도시 분위기와 동선을 빠르게 파악할 수 있도록, 핵심 테마별 장문 가이드를 제공합니다."
            : "Designed for first-time visitors, these editorial guides explain where to go, why each area matters, and how to build efficient routes."}
        </p>
        <div className="space-y-4">
          {guides.map((guide, idx) => (
            <article key={guide.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">Guide {idx + 1}</p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">
                {locale === "ko" ? guide.titleKo ?? guide.title : guide.title}
              </h3>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
                {(locale === "ko" ? guide.contentKo ?? guide.content : guide.content)
                  .split("\n\n")
                  .map((paragraph) => (
                    <p key={paragraph}>{renderParagraphWithLinks(paragraph)}</p>
                  ))}
              </div>
              <div className="mt-3">
                <a
                  href={guide.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-blue-700 underline"
                >
                  {locale === "ko" ? "Google Maps에서 보기" : "Open in Google Maps"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
