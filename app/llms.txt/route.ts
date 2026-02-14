export const runtime = "edge";

const body = `# KoreaTravel

> Korea travel planning site with quiz-based destination recommendations.

## Allowed content summary
- Original destination descriptions for Korean cities
- Quiz flow, recommendation logic overview, and itinerary guidance
- K-Drama filming city guide with non-copyright mood photos
- Restaurant discovery links to Google Maps searches

## Canonical base
https://visitkoreaguide.org

## Important routes
- /en
- /en/quiz
- /en/details
- /en/result
- /en/city/{slug}
- /en/drama
- /en/restaurants
- /ko (Korean locale)

## Data and media policy
- No scraped reviews from third-party review platforms
- Unsplash API images with attribution links
- No copyrighted drama screenshots
`;

export async function GET() {
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600"
    }
  });
}
