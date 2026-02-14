import { recommendCities } from "@/lib/recommendationEngine/engine";
import type { RecommendationInput } from "@/lib/data/types";

function isValidPayload(body: unknown): body is RecommendationInput {
  if (!body || typeof body !== "object") return false;

  const payload = body as Partial<RecommendationInput>;
  return (
    Array.isArray(payload.selectedOptionIds) &&
    typeof payload.group === "string" &&
    typeof payload.driving === "string" &&
    typeof payload.koreanLevel === "string" &&
    typeof payload.duration === "string" &&
    typeof payload.budget === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const top3 = recommendCities(body);
  return Response.json({ results: top3 });
}
