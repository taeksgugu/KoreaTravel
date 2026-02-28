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

async function checkRegion(regionId) {
  const response = await fetch(
    `${baseUrl}/api/regions/${regionId}/items?category=attractions&limit=12&lang=en&page=1&ts=${Date.now()}`
  );
  assert(response.ok, `/api/regions/${regionId}/items failed with ${response.status}`);
  const payload = await response.json();
  const count = Array.isArray(payload.items) ? payload.items.length : 0;

  assert(payload.regionId === regionId, `region mismatch: requested=${regionId}, got=${payload.regionId}`);
  assert(count > 0, `API returned empty items for ${regionId}`);
  assert(payload.diagnostics?.requestedRegionId === regionId, `missing diagnostics.requestedRegionId for ${regionId}`);
  assert(payload.diagnostics?.normalizedRegionId === regionId, `missing diagnostics.normalizedRegionId for ${regionId}`);

  if (expectFallback) {
    assert(
      String(payload.debug || "").includes("mock_reason:"),
      `VERIFY_EXPECT_FALLBACK=1 set, but ${regionId} response is not mock fallback`
    );
    assert(count >= 6, `Fallback item count for ${regionId} should be >= 6, got ${count}`);
  }

  console.log(
    `[ok] /api/regions/${regionId}/items count=${count} admin=${payload.diagnostics?.resolvedAdminCode ?? "none"} area=${payload.diagnostics?.resolvedAreaCode ?? "none"} debug=${payload.debug ?? "none"}`
  );
}

async function run() {
  console.log(`[verify] baseUrl=${baseUrl}`);

  const ads = await checkTextEndpoint("/ads.txt", "text/plain");
  console.log(`[ok] /ads.txt ${ads.status} ${ads.contentType}`);

  const sitemap = await checkTextEndpoint("/sitemap.xml", "xml");
  assert(sitemap.text.includes("<urlset"), "/sitemap.xml is not a valid sitemap payload");
  for (const requiredPath of ["/en", "/en/explore", "/en/city/seoul"]) {
    const escapedPath = requiredPath.replaceAll("/", "\\/");
    const pattern = new RegExp(`<loc>https?:\\/\\/[^<]+${escapedPath}<\\/loc>`);
    assert(pattern.test(sitemap.text), `/sitemap.xml missing ${requiredPath}`);
  }
  console.log(`[ok] /sitemap.xml ${sitemap.status} ${sitemap.contentType}`);

  const robots = await checkTextEndpoint("/robots.txt", "text/plain");
  assert(robots.text.toLowerCase().includes("sitemap:"), "/robots.txt does not include sitemap");
  console.log(`[ok] /robots.txt ${robots.status} ${robots.contentType}`);

  for (const path of ["/en/explore"]) {
    const response = await fetch(`${baseUrl}${path}`);
    assert(response.ok, `${path} failed with ${response.status}`);
    console.log(`[ok] ${path} ${response.status}`);
  }

  const koResponse = await fetch(`${baseUrl}/ko/explore`, { redirect: "manual" });
  assert([301, 302, 307, 308].includes(koResponse.status), `/ko/explore should redirect, got ${koResponse.status}`);
  console.log(`[ok] /ko/explore redirects with ${koResponse.status}`);

  await checkRegion("seoul");
  await checkRegion("jeju");

  console.log("[verify] all checks passed");
}

run().catch((error) => {
  console.error(`[verify] FAILED: ${error.message}`);
  process.exit(1);
});
