import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { createMockItems } from "@/lib/mock-data";
import { presetById } from "@/lib/presets";
import { normalizeRegionId } from "@/lib/region-id";
import { regionById } from "@/lib/regions";
import { subregionById } from "@/lib/subregions";
import { fetchRegionItems } from "@/lib/tourapi";
import type { Category, EventStatus, NormalizedItem, RegionItemsResponse } from "@/lib/types";

const CACHE_TTL_MS = 15 * 60 * 1000;
const validCategories: Category[] = ["attractions", "food", "stay", "events"];
const API_REVISION = "api-rev-2026-02-28-01";
const GEMINI_MODEL = "gemini-1.5-flash";
const MIN_FALLBACK_ITEMS = 6;
const GEMINI_SYSTEM_PROMPT =
  "너는 한국의 매력을 서구권 여행자에게 알리는 전문 에디터야. 제공되는 한국어 관광 정보를 바탕으로 (1) 매력적인 영문 제목, (2) 서양인의 관점에서 흥미로운 역사/문화적 맥락이 포함된 3~4문장의 영문 설명을 작성해줘. 말투는 Vibrant & Welcoming 톤이어야 해.";

type GeminiEnrichment = {
  enTitle: string;
  enDescription: string;
};

type GlobalWithGeminiCache = typeof globalThis & {
  __geminiEnrichmentCache?: Map<string, GeminiEnrichment>;
};

const globalWithGemini = globalThis as GlobalWithGeminiCache;
const geminiEnrichmentCache =
  globalWithGemini.__geminiEnrichmentCache ?? new Map<string, GeminiEnrichment>();
globalWithGemini.__geminiEnrichmentCache = geminiEnrichmentCache;

let geminiClient: GoogleGenerativeAI | null = null;

function getGeminiClient(): GoogleGenerativeAI | null {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) return null;
  if (!geminiClient) {
    geminiClient = new GoogleGenerativeAI(key);
  }
  return geminiClient;
}

function getGoogleMapsUrl(item: NormalizedItem): string | null {
  if (typeof item.mapy === "number" && typeof item.mapx === "number") {
    return `https://www.google.com/maps/search/?api=1&query=${item.mapy},${item.mapx}`;
  }
  return null;
}

function fallbackEnglish(item: NormalizedItem): GeminiEnrichment {
  return {
    enTitle: item.title,
    enDescription:
      item.overview?.trim() ||
      `${item.title} is a notable ${item.category} destination in Korea, worth adding to your trip.`
  };
}

function sanitize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

async function translateItemWithGemini(item: NormalizedItem): Promise<GeminiEnrichment> {
  const cached = geminiEnrichmentCache.get(item.id);
  if (cached) return cached;

  const client = getGeminiClient();
  if (!client) {
    const fallback = fallbackEnglish(item);
    geminiEnrichmentCache.set(item.id, fallback);
    return fallback;
  }

  try {
    const model = client.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = [
      GEMINI_SYSTEM_PROMPT,
      "아래 한국어 원문으로 영문 제목/설명을 작성해.",
      '반드시 JSON만 반환해: {"enTitle":"...","enDescription":"..."}',
      `제목: ${item.title}`,
      `주소: ${item.addr || "N/A"}`,
      `개요: ${item.overview || "N/A"}`,
      `카테고리: ${item.category}`
    ].join("\n");

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text) as { enTitle?: string; enDescription?: string };

    const enriched: GeminiEnrichment = {
      enTitle: sanitize(parsed.enTitle) || item.title,
      enDescription: sanitize(parsed.enDescription) || fallbackEnglish(item).enDescription
    };

    geminiEnrichmentCache.set(item.id, enriched);
    return enriched;
  } catch {
    const fallback = fallbackEnglish(item);
    geminiEnrichmentCache.set(item.id, fallback);
    return fallback;
  }
}

async function enrichItems(items: NormalizedItem[], locale: "en" | "ko"): Promise<NormalizedItem[]> {
  return Promise.all(
    items.map(async (item) => {
      const googleMapsUrl = getGoogleMapsUrl(item);
      if (locale === "en") {
        const translated = await translateItemWithGemini(item);
        return {
          ...item,
          enTitle: translated.enTitle,
          enDescription: translated.enDescription,
          googleMapsUrl
        };
      }

      return {
        ...item,
        enTitle: item.title,
        enDescription: item.overview ?? "",
        googleMapsUrl
      };
    })
  );
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ regionId: string }> }
) {
  const { regionId } = await context.params;
  const normalizedRegionId = normalizeRegionId(regionId);

  if (!regionById[normalizedRegionId]) {
    return NextResponse.json({ error: "Unknown regionId" }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const category = (searchParams.get("category") ?? "attractions") as Category;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const requestedPageSize = searchParams.get("pageSize") ?? searchParams.get("limit") ?? "10";
  const pageSize = Math.min(30, Math.max(1, Number(requestedPageSize)));
  const sort = searchParams.get("sort") === "title" ? "title" : "latest";
  const eventStatus = (searchParams.get("eventStatus") ?? "all") as EventStatus;
  const presetId = searchParams.get("presetId") ?? undefined;
  const subregionId = searchParams.get("subregionId") ?? undefined;
  const localeParam = searchParams.get("locale") ?? searchParams.get("lang") ?? "en";
  const locale = localeParam === "ko" ? "ko" : "en";

  if (!validCategories.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (!["all", "ongoing", "upcoming"].includes(eventStatus)) {
    return NextResponse.json({ error: "Invalid eventStatus" }, { status: 400 });
  }

  if (presetId && !presetById[presetId]) {
    return NextResponse.json({ error: "Invalid presetId" }, { status: 400 });
  }

  if (subregionId) {
    const subregion = subregionById[subregionId];
    if (!subregion) {
      return NextResponse.json({ error: "Invalid subregionId" }, { status: 400 });
    }
    if (subregion.parentRegionId !== normalizedRegionId) {
      return NextResponse.json({ error: "subregionId does not belong to regionId" }, { status: 400 });
    }
  }

  const cacheKey = [
    normalizedRegionId,
    locale,
    subregionId ?? "none",
    category,
    page,
    pageSize,
    sort,
    eventStatus,
    presetId ?? "none"
  ].join(":");
  const cached = getCache<RegionItemsResponse>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=600"
      }
    });
  }

  const { items, hasMore, debug } = await fetchRegionItems({
    regionId: normalizedRegionId,
    subregionId,
    category,
    page,
    pageSize,
    sort,
    locale: "ko",
    eventStatus,
    presetId
  });

  let enrichedItems = await enrichItems(items, locale);
  const shouldGuardWithMock =
    enrichedItems.length === 0 &&
    Boolean(
      debug?.startsWith("mock_reason:") ||
        debug?.includes("tourapi_request_failed") ||
        debug?.includes("missing_tour_api_key") ||
        debug?.includes("tourapi_empty_payload_fallback")
    );

  if (shouldGuardWithMock) {
    const mock = createMockItems(
      normalizedRegionId,
      category,
      page,
      Math.max(pageSize, MIN_FALLBACK_ITEMS)
    );
    enrichedItems = await enrichItems(mock.items, locale);
  }

  const payload: RegionItemsResponse = {
    regionId: normalizedRegionId,
    subregionId,
    presetId,
    category,
    page,
    pageSize,
    hasMore: shouldGuardWithMock ? false : hasMore,
    debug: debug
      ? `${debug}${shouldGuardWithMock ? "|guard:empty_items_replaced" : ""}|${API_REVISION}`
      : `${shouldGuardWithMock ? "guard:empty_items_replaced|" : ""}${API_REVISION}`,
    items: enrichedItems
  };

  const isMockResponse =
    (payload.debug?.startsWith("mock_reason:") ?? false) ||
    (payload.items.length > 0 && payload.items.every((item) => item.source === "mock"));

  if (!isMockResponse) {
    setCache(cacheKey, payload, CACHE_TTL_MS);
  }

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": isMockResponse
        ? "no-store"
        : "public, s-maxage=900, stale-while-revalidate=600"
    }
  });
}
