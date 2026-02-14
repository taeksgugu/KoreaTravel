import { cities } from "@/lib/data/cities";
import { optionToTags } from "@/lib/data/quiz";
import type {
  DurationType,
  GroupType,
  RecommendationInput,
  RecommendationResult,
  TravelTag
} from "@/lib/data/types";

type TagScores = Record<TravelTag, number>;

const allTags: TravelTag[] = [
  "URBAN",
  "NIGHTLIFE",
  "COASTAL",
  "ISLAND",
  "MOUNTAIN",
  "FOREST",
  "SCENIC",
  "HERITAGE",
  "TRADITIONAL",
  "SPIRITUAL",
  "CULINARY",
  "AESTHETIC",
  "SLOW",
  "OFFBEAT"
];

const synergyRules = [
  {
    key: "URBAN+COASTAL",
    tags: ["URBAN", "COASTAL"] as const,
    bonus: { busan: 15, incheon: 12 }
  },
  {
    key: "COASTAL+NIGHTLIFE",
    tags: ["COASTAL", "NIGHTLIFE"] as const,
    bonus: { busan: 18, yeosu: 12 }
  },
  {
    key: "SCENIC+SLOW",
    tags: ["SCENIC", "SLOW"] as const,
    bonus: { damyang: 15, namhae: 12, chuncheon: 10 }
  },
  {
    key: "HERITAGE+CULINARY",
    tags: ["HERITAGE", "CULINARY"] as const,
    bonus: { jeonju: 18 }
  },
  {
    key: "HERITAGE+SPIRITUAL",
    tags: ["HERITAGE", "SPIRITUAL"] as const,
    bonus: { gyeongju: 15, andong: 12 }
  },
  {
    key: "ISLAND+SCENIC",
    tags: ["ISLAND", "SCENIC"] as const,
    bonus: { jeju: 20 }
  },
  {
    key: "OFFBEAT+SLOW",
    tags: ["OFFBEAT", "SLOW"] as const,
    bonus: { damyang: 12, namhae: 10 }
  },
  {
    key: "MOUNTAIN+SCENIC",
    tags: ["MOUNTAIN", "SCENIC"] as const,
    bonus: { sokcho: 15 }
  },
  {
    key: "URBAN+NIGHTLIFE",
    tags: ["URBAN", "NIGHTLIFE"] as const,
    bonus: { seoul: 15, busan: 12 }
  }
] as const;

function buildTagScores(selectedOptionIds: string[]): TagScores {
  const scores = Object.fromEntries(allTags.map((tag) => [tag, 0])) as TagScores;

  for (const optionId of selectedOptionIds) {
    const tags = optionToTags[optionId] ?? [];
    for (const tag of tags) {
      scores[tag] += 8;
    }
  }

  return scores;
}

function getLanguageMultiplier(koreanLevel: RecommendationInput["koreanLevel"], englishFriendly: number): number {
  if (koreanLevel === "NONE") return 0.7 + 0.08 * englishFriendly;
  if (koreanLevel === "BASIC") return 0.8 + 0.06 * englishFriendly;
  if (koreanLevel === "CONVERSATIONAL") return 0.9 + 0.04 * englishFriendly;
  return 1;
}

function getDurationMultiplier(duration: DurationType, cityTags: TravelTag[], carRecommended: boolean, accessScore: number): number {
  if (duration === "3_4") {
    let multiplier = 1 + (accessScore - 3) * 0.04;
    if (carRecommended) multiplier *= 0.9;
    return multiplier;
  }

  if (duration === "5_6") {
    return 1;
  }

  let multiplier = 1;
  if (cityTags.includes("ISLAND")) multiplier *= 1.2;
  if (cityTags.includes("OFFBEAT")) multiplier *= 1.15;
  if (carRecommended) multiplier *= 1.15;
  return multiplier;
}

function getGroupMultiplier(group: GroupType, cityTags: TravelTag[]): number {
  if (group === "FRIENDS" && (cityTags.includes("URBAN") || cityTags.includes("NIGHTLIFE"))) return 1.1;
  if (group === "FAMILY" && (cityTags.includes("HERITAGE") || cityTags.includes("SLOW"))) return 1.1;
  if (group === "SOLO" && (cityTags.includes("OFFBEAT") || cityTags.includes("SPIRITUAL"))) return 1.1;
  if (group === "COUPLE" && (cityTags.includes("AESTHETIC") || cityTags.includes("COASTAL"))) return 1.1;
  if (group === "GROUP" && cityTags.includes("URBAN")) return 1.05;
  return 1;
}

export function recommendCities(input: RecommendationInput): RecommendationResult[] {
  const tagScores = buildTagScores(input.selectedOptionIds);

  return cities
    .map((city) => {
      const baseScore = city.tags.reduce((sum, tag) => sum + tagScores[tag], 0);

      let synergyBonus = 0;
      const triggeredSynergies: string[] = [];

      for (const rule of synergyRules) {
        const [leftTag, rightTag] = rule.tags;
        if (tagScores[leftTag] >= 20 && tagScores[rightTag] >= 20) {
          const bonus = rule.bonus[city.slug as keyof typeof rule.bonus];
          if (bonus) {
            synergyBonus += bonus;
            triggeredSynergies.push(rule.key);
          }
        }
      }

      const drivingMultiplier = input.driving === "YES"
        ? city.carRecommended
          ? 1.18
          : 1
        : city.carRecommended
          ? 0.82
          : 1;

      const languageMultiplier = getLanguageMultiplier(input.koreanLevel, city.englishFriendly);
      const durationMultiplier = getDurationMultiplier(input.duration, city.tags, city.carRecommended, city.accessScore);
      const groupMultiplier = getGroupMultiplier(input.group, city.tags);

      const finalScore =
        (baseScore + synergyBonus) *
        drivingMultiplier *
        languageMultiplier *
        durationMultiplier *
        groupMultiplier;

      const topTags = [...city.tags]
        .sort((a, b) => tagScores[b] - tagScores[a])
        .slice(0, 3);

      const englishNote = city.englishFriendly >= 4
        ? "English support is strong in transport and major venues."
        : city.englishFriendly === 3
          ? "Basic English support is available in core tourist zones."
          : "Expect limited English support; translation apps are useful.";

      const accessNote = city.accessScore >= 4
        ? "Fast access from ICN with direct rail or high-frequency links."
        : city.accessScore === 3
          ? "Moderate access from ICN, usually with one transfer."
          : "Longer transfer time from ICN; plan buffers for connections.";

      return {
        slug: city.slug,
        cityNameEn: city.nameEn,
        cityNameKo: city.nameKo,
        score: Number(finalScore.toFixed(2)),
        reason: {
          topTags,
          synergies: triggeredSynergies,
          englishNote,
          accessNote
        }
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
