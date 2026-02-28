const baseUrl = (process.argv[2] || process.env.VERIFY_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");
const expectFallback = process.env.VERIFY_EXPECT_FALLBACK === "1";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function checkTextEndpoint(path, expectedContentType) {
  const response = await fetch(`${baseUrl}${path}`);
  const text = await response.text();
  assert(response.ok, `${path} failed with ${response.status}`);
  assert(
    (response.headers.get("content-type") || "").includes(expectedContentType),
    `${path} content-type mismatch: ${response.headers.get("content-type")}`
  );
  return { status: response.status, contentType: response.headers.get("content-type"), text };
}

async function run() {
  console.log(`[verify] baseUrl=${baseUrl}`);

  const ads = await checkTextEndpoint("/ads.txt", "text/plain");
  console.log(`[ok] /ads.txt ${ads.status} ${ads.contentType}`);

  const sitemap = await checkTextEndpoint("/sitemap.xml", "xml");
  assert(sitemap.text.includes("<urlset"), "/sitemap.xml is not a valid sitemap payload");
  console.log(`[ok] /sitemap.xml ${sitemap.status} ${sitemap.contentType}`);

  const robots = await checkTextEndpoint("/robots.txt", "text/plain");
  assert(robots.text.toLowerCase().includes("sitemap:"), "/robots.txt does not include sitemap");
  console.log(`[ok] /robots.txt ${robots.status} ${robots.contentType}`);

  for (const path of ["/en/explore", "/ko/explore"]) {
    const response = await fetch(`${baseUrl}${path}`);
    assert(response.ok, `${path} failed with ${response.status}`);
    console.log(`[ok] ${path} ${response.status}`);
  }

  const apiResponse = await fetch(
    `${baseUrl}/api/regions/seoul/items?category=attractions&limit=12&lang=en&page=1`
  );
  assert(apiResponse.ok, `/api/regions/seoul/items failed with ${apiResponse.status}`);
  const payload = await apiResponse.json();
  const count = Array.isArray(payload.items) ? payload.items.length : 0;
  assert(count > 0, "API returned empty items");
  console.log(`[ok] /api/regions/seoul/items count=${count} debug=${payload.debug ?? "none"}`);

  if (expectFallback) {
    assert(
      String(payload.debug || "").includes("mock_reason:"),
      "VERIFY_EXPECT_FALLBACK=1 set, but response is not mock fallback"
    );
    assert(count >= 6, `Fallback item count should be >= 6, got ${count}`);
    console.log("[ok] fallback guard verified (mock with >=6 items)");
  }

  console.log("[verify] all checks passed");
}

run().catch((error) => {
  console.error(`[verify] FAILED: ${error.message}`);
  process.exit(1);
});

