import type { Category, NormalizedItem } from "./types";

const categoryLabel: Record<Category, string> = {
  attractions: "Attraction",
  food: "Food Spot",
  stay: "Stay",
  events: "Event"
};

export function createMockItems(regionLabel: string, category: Category, page: number, pageSize: number): { items: NormalizedItem[]; hasMore: boolean } {
  const start = (page - 1) * pageSize;
  const total = 36;
  const end = Math.min(start + pageSize, total);

  const items: NormalizedItem[] = Array.from({ length: Math.max(0, end - start) }).map((_, idx) => {
    const order = start + idx + 1;
    const eventStart = `2026-0${((order % 6) + 3).toString()}-0${((order % 8) + 1).toString()}`;
    const eventEnd = `2026-0${((order % 6) + 3).toString()}-1${((order % 8) + 1).toString()}`;
    return {
      id: `mock-${regionLabel}-${category}-${order}`,
      title: `${regionLabel} ${categoryLabel[category]} ${order}`,
      category,
      addr: `${regionLabel} sample address ${order}`,
      mapx: 127.0 + (order % 10) * 0.01,
      mapy: 37.0 + (order % 10) * 0.01,
      firstImage: null,
      tel: null,
      overview: `Mock content for ${regionLabel} ${category} #${order}. Configure TOUR_API_KEY to use live data.`,
      startDate: category === "events" ? eventStart : null,
      endDate: category === "events" ? eventEnd : null,
      source: "mock"
    };
  });

  return {
    items,
    hasMore: end < total
  };
}

