import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MainExplorer } from "@/components/MainExplorer";
import { isLocale } from "@/lib/locales";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: locale === "ko" ? "Korea Travel 지도 탐색" : "Korea Travel Map Explorer",
    description:
      locale === "ko"
        ? "행정구역 지도를 클릭해 관광지, 맛집, 숙박, 행사를 탐색하세요."
        : "Click Korea regions to browse attractions, food, stay, and events."
  };
}

export default async function LocalePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">
          {locale === "ko" ? "대한민국 지역 여행 탐색" : "Korea Regional Travel Explorer"}
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          {locale === "ko"
            ? "지도에서 시/도를 클릭하고 아래 패널에서 관광지, 맛집, 숙박, 행사 정보를 확인하세요. 15개 도시 프리셋도 지원합니다."
            : "Click provinces on the map and browse attractions, food, stay, and events below. Includes 15 city presets."}
        </p>
      </section>
      <MainExplorer locale={locale} />
    </div>
  );
}

