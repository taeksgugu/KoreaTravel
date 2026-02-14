import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { presetById } from "@/lib/presets";
import { regionById } from "@/lib/regions";
import { subregionById } from "@/lib/subregions";
import { fetchRegionItems } from "@/lib/tourapi";
import type { Category, EventStatus, RegionItemsResponse } from "@/lib/types";

const CACHE_TTL_MS = 15 * 60 * 1000;
const validCategories: Category[] = ["attractions", "food", "stay", "events"];
const API_REVISION = "api-rev-2026-02-14-01";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ regionId: string }> }
) {
  const { regionId } = await context.params;

  if (!regionById[regionId]) {
    return NextResponse.json({ error: "Unknown regionId" }, { status: 400 });
  }

  const searchParams = request.nextUrl.searchParams;
  const category = (searchParams.get("category") ?? "attractions") as Category;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const pageSize = Math.min(30, Math.max(1, Number(searchParams.get("pageSize") ?? "10")));
  const sort = searchParams.get("sort") === "title" ? "title" : "latest";
  const eventStatus = (searchParams.get("eventStatus") ?? "all") as EventStatus;
  const presetId = searchParams.get("presetId") ?? undefined;
  const subregionId = searchParams.get("subregionId") ?? undefined;

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
    if (subregion.parentRegionId !== regionId) {
      return NextResponse.json({ error: "subregionId does not belong to regionId" }, { status: 400 });
    }
  }

  const cacheKey = [
    regionId,
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
    regionId,
    subregionId,
    category,
    page,
    pageSize,
    sort,
    eventStatus,
    presetId
  });

  const payload: RegionItemsResponse = {
    regionId,
    subregionId,
    presetId,
    category,
    page,
    pageSize,
    hasMore,
    debug: debug ? `${debug}|${API_REVISION}` : API_REVISION,
    items
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
