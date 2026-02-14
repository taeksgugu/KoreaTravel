import { NextRequest, NextResponse } from "next/server";
import { getCache, setCache } from "@/lib/cache";
import { presetById } from "@/lib/presets";
import { regionById } from "@/lib/regions";
import { fetchRegionItems } from "@/lib/tourapi";
import type { Category, RegionItemsResponse } from "@/lib/types";

const CACHE_TTL_MS = 15 * 60 * 1000;
const validCategories: Category[] = ["attractions", "food", "stay", "events"];

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
  const presetId = searchParams.get("presetId") ?? undefined;

  if (!validCategories.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  if (presetId && !presetById[presetId]) {
    return NextResponse.json({ error: "Invalid presetId" }, { status: 400 });
  }

  const cacheKey = [regionId, category, page, pageSize, sort, presetId ?? "none"].join(":");
  const cached = getCache<RegionItemsResponse>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=600"
      }
    });
  }

  const { items, hasMore } = await fetchRegionItems({
    regionId,
    category,
    page,
    pageSize,
    sort,
    presetId
  });

  const payload: RegionItemsResponse = {
    regionId,
    presetId,
    category,
    page,
    pageSize,
    hasMore,
    items
  };

  setCache(cacheKey, payload, CACHE_TTL_MS);

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=600"
    }
  });
}

