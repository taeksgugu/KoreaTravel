# Korea Travel (Map + Regional Content Explorer)

Korea Travel is a Next.js web app that follows a "map interaction + below list" pattern.
Users click Korean administrative regions on the map and load local travel content by category:
- Attractions
- Food
- Stay
- Events

The app is designed so the map layer can be replaced later (for example, with a custom SVG illustration) without rewriting list/data logic.

## Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS
- Mapbox GL JS (client-side map)
- Next.js Route Handlers for server API
- Cloudflare-friendly serverless structure

## Core Architecture

- `components/RegionMap.tsx`
  - Handles only map rendering and region selection events.
- `components/RegionContentPanel.tsx`
  - Handles category tabs, loading states, pagination, sorting, and API calls.
- `app/api/regions/[regionId]/items/route.ts`
  - Server-side proxy to TourAPI.
  - Normalizes data and returns consistent schema.

This separation allows map replacement without changing server/data panel logic.

## Features Implemented

1. Region map (MVP: 17 provinces/cities)
- GeoJSON at `data/regions/sido.geojson`
- Feature properties: `region_id`, `name_ko`, `name_en`, `admin_code`
- Hover highlight via cursor and click selection state
- `fitBounds` on selected polygon
- Supports drill-down overlays for key city/county subregions

2. Regional content panel
- Tabs: `Attractions`, `Food`, `Stay`, `Events`
- Skeleton loading, error state, empty state
- Pagination with `Load More`
- Sorting: `Latest`, `Title`
- Events status filter: `All`, `Ongoing`, `Upcoming`
- Per-card quick actions: `Open in Google Maps`, `VisitKorea Search`

3. Server API
- Endpoint:
  - `/api/regions/[regionId]/items?category=attractions|food|stay|events&page=1&pageSize=10&sort=latest&presetId=...&subregionId=...`
- TourAPI call only on server side
- Response normalized to:
  - `id`, `title`, `category`, `addr`, `mapx`, `mapy`, `firstImage`, `tel`, `overview`, `startDate`, `endDate`
- In-memory cache per request key for 15 minutes
- Cache headers for CDN friendliness

4. Presets (15 requested cities)
- `lib/presets.ts`
- Supports:
  - Seoul, Busan, Jeju, Incheon, Chuncheon, Gangneung, Sokcho, Jeonju, Gyeongju,
    Namhae, Damyang, Daegu, Andong, Yeosu, Boryeong
- Current strategy: preset applies region + keyword-focused query and selects connected subregion when defined

## Drill-down Strategy

Current implementation includes practical drill-down:
- Province click selects `regionId`
- Subregion overlays use extracted real sigungu geometry for requested targets (`data/regions/sigungu-selected.geojson`)
- Subregion polygons can be clicked to select `subregionId`
- Content API receives both and applies keyword + area/sigungu query when available

## Environment Variables

Create `.env.local` from `.env.example`.

Required:
- `NEXT_PUBLIC_MAPBOX_TOKEN`
- `TOUR_API_KEY`

Optional:
- `PUBLIC_DATA_API_KEY`
- `PUBLIC_FESTIVAL_API_ENDPOINT`

If `TOUR_API_KEY` is missing, API falls back to mock content.

## Run Locally

```bash
npm install
npm run dev
```

Type check:

```bash
npm run typecheck
```

Build:

```bash
npm run build
```

Cloudflare build:

```bash
npm run build:cf
```

## GeoJSON Data Source / Update Guide

MVP uses:
- `data/regions/sido.geojson` for province-level metadata
- `data/regions/sigungu-selected.geojson` for selected city/county drill-down polygons

For production-quality boundaries:
1. Obtain official SHP/GeoJSON boundary data
2. Convert SHP -> GeoJSON using GDAL/ogr2ogr
3. Simplify geometry if needed for web performance
4. Ensure each feature includes required fields:
   - `region_id`, `name_ko`, `name_en`, `admin_code`

## TourAPI Key Guide

1. Issue TourAPI key from data.go.kr / Korea Tourism API portal
2. Put the key in `.env.local` as `TOUR_API_KEY`
3. Keep key server-side only (never expose in client)

## Cloudflare Deployment Notes

- Use server-side API route proxy (`/api/regions/...`) only
- Keep secrets in Cloudflare environment variables
- Use existing scripts:
  - `npm run build:cf`
  - `npm run deploy`

## API Response Example

```json
{
  "regionId": "seoul",
  "category": "food",
  "page": 1,
  "pageSize": 10,
  "hasMore": true,
  "items": [
    {
      "id": "12345",
      "title": "Sample Place",
      "category": "food",
      "addr": "Seoul ...",
      "mapx": 126.97,
      "mapy": 37.56,
      "firstImage": null,
      "tel": null,
      "overview": null,
      "startDate": null,
      "endDate": null,
      "source": "tourapi"
    }
  ]
}
```

