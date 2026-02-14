# KoreaTravel (K-Travel Type)

English-first web application for international travelers entering via Incheon (ICN), with a visual quiz and city recommendation engine.

## Stack

- Next.js App Router
- TypeScript
- Edge-compatible API routes
- Tailwind CSS
- Unsplash API proxy

## Core Features

- 10-question visual travel personality quiz (Unsplash image options)
- Travel details input (group, driving, Korean level, duration, budget)
- Server-side recommendation engine with strict weighted scoring and synergy bonuses
- Top 3 city results with ranked custom SVG map pins
- Hover preview with Unsplash photos and required photographer credit links
- Detailed city itinerary pages (3-4 / 5-6 / 7+ day plans)
- K-Drama filming city guide (Google Maps links only)
- Restaurant finder (Google Maps search links only)
- i18n routes (`/en`, `/ko`) with English default redirect

## Project Structure

- `app/[locale]/page.tsx`
- `app/[locale]/quiz/page.tsx`
- `app/[locale]/details/page.tsx`
- `app/[locale]/result/page.tsx`
- `app/[locale]/city/[slug]/page.tsx`
- `app/[locale]/drama/page.tsx`
- `app/[locale]/restaurants/page.tsx`
- `app/api/recommend/route.ts`
- `app/api/images/route.ts`
- `lib/recommendationEngine/engine.ts`
- `lib/data/*.ts`
- `components/*.tsx`
- `public/korea.svg`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env.local
```

Set:

```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
NEXT_PUBLIC_SITE_URL=https://visitkoreaguide.org
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-3946429838788366
NEXT_PUBLIC_ADSENSE_SLOT_HOME=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_RESULT=2345678901
NEXT_PUBLIC_ADSENSE_SLOT_CITY=3456789012
```

3. Run development server:

```bash
npm run dev
```

4. Type check:

```bash
npm run typecheck
```

## Recommendation Formula

Implemented server-side in `app/api/recommend` and `lib/recommendationEngine/engine.ts`.

`FinalScore = (BaseScore + SynergyBonus) * DrivingMultiplier * LanguageMultiplier * DurationMultiplier * GroupMultiplier`

- Quiz option to tag score: `+8` each
- Synergy threshold: both tags `>= 20`
- Driving, language, duration, and group multipliers follow the provided specification
- Top 3 results sorted by `FinalScore`

## Legal/Data Safety

- No scraping from Instagram, Naver, blogs, or review sites
- No copied Google reviews
- Images are requested through Unsplash API proxy only
- Every shown image includes photographer credit + profile link
- K-Drama page uses text and links only (no copyrighted screenshots)
- Restaurants page provides Google Maps search links only
- All descriptions are original text

## SEO Baseline

The project includes SEO essentials aligned with Google's starter guidance:
- Clear page titles and page descriptions for key routes
- Canonical and alternate-language metadata for locale routes
- `robots.txt` via `app/robots.ts`
- `sitemap.xml` via `app/sitemap.ts`
- Structured data (JSON-LD `WebSite`) on locale homepage
- Crawl-friendly internal links and semantic heading structure

## GEO / AI Search Enhancements

Aligned with Google's AI Search guidance (May 21, 2025):
- Stronger preview controls via `robots` metadata (`max-snippet`, `max-image-preview`, `max-video-preview`)
- Structured data expanded only where visible content exists (FAQ, destination, breadcrumb, collection page)
- FAQ sections added to key pages to improve long-tail and follow-up query coverage
- Multimodal support improved with descriptive image `alt` text and explicit image dimensions
- `app/llms.txt/route.ts` added as an AI crawler discovery aid

## Google AdSense

AdSense integration is enabled with:
- Global AdSense script + account meta tag in `app/layout.tsx`
- Reusable ad unit component in `components/AdSenseUnit.tsx`
- Placement in high-intent pages only (home/result/city) to avoid ad-heavy layouts
- Explicit `Sponsored` label for ad blocks
- `public/ads.txt` placeholder file (replace `pub-xxxxxxxxxxxxxxxx` with your publisher ID)

Quality policy choices in this project:
- Keep primary travel content as the main focus, ads are secondary
- Avoid deceptive ad placement near critical navigation/actions
- Keep ad count moderate per page and preserve readability

## Cloudflare Deployment (Workers Builds)

This repository is configured for Cloudflare Workers deployment using OpenNext.

Required files:
- `wrangler.toml`
- `open-next.config.ts`

Recommended Cloudflare build settings:

1. Build command:
```bash
npm run build:cf
```
`build:cf` clears `.next` and `.open-next` first to avoid stale cache artifacts in CI.

2. Deploy command:
```bash
npm run deploy
```

3. Environment variables / secrets:
- `UNSPLASH_ACCESS_KEY` (required for image proxy route)

Notes:
- `npm run build` is plain Next.js build for local verification.
- Use `npm run build:cf` before `wrangler deploy` so `.open-next/worker.js` is generated.
- OpenNext build is best run in Linux (Cloudflare CI environment is Linux).

## GitHub

Target repo:
`https://github.com/taeksgugu/KoreaTravel`
