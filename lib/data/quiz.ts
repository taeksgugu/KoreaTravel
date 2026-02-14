import type { QuizQuestion } from "@/lib/data/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "Pick your ideal first morning in Korea.",
    options: [
      { id: "q1_o1", label: "Rooftop skyline brunch", imageQuery: "Seoul rooftop brunch", tags: ["URBAN", "AESTHETIC"] },
      { id: "q1_o2", label: "Sunrise at the beach", imageQuery: "Korea beach sunrise", tags: ["COASTAL", "SCENIC"] },
      { id: "q1_o3", label: "Temple bell in the mountains", imageQuery: "Korea mountain temple", tags: ["MOUNTAIN", "SPIRITUAL"] },
      { id: "q1_o4", label: "Quiet bamboo walk", imageQuery: "Korea bamboo forest", tags: ["FOREST", "SLOW"] }
    ]
  },
  {
    id: "q2",
    prompt: "Your evening energy is closest to...",
    options: [
      { id: "q2_o1", label: "Live bars and neon streets", imageQuery: "Korea nightlife street", tags: ["NIGHTLIFE", "URBAN"] },
      { id: "q2_o2", label: "Harbor night view", imageQuery: "Korea harbor night", tags: ["COASTAL", "AESTHETIC"] },
      { id: "q2_o3", label: "Traditional tea house", imageQuery: "Korea traditional tea house", tags: ["TRADITIONAL", "SLOW"] },
      { id: "q2_o4", label: "Local alley wandering", imageQuery: "Korea local alley", tags: ["OFFBEAT", "CULINARY"] }
    ]
  },
  {
    id: "q3",
    prompt: "What type of scenery keeps you excited?",
    options: [
      { id: "q3_o1", label: "Glass towers and city lights", imageQuery: "Korea city skyline", tags: ["URBAN", "NIGHTLIFE"] },
      { id: "q3_o2", label: "Cliffs and sea roads", imageQuery: "Korea coast road", tags: ["COASTAL", "SCENIC"] },
      { id: "q3_o3", label: "Ancient palaces and shrines", imageQuery: "Korea palace", tags: ["HERITAGE", "TRADITIONAL"] },
      { id: "q3_o4", label: "Island horizons", imageQuery: "Jeju island landscape", tags: ["ISLAND", "SCENIC"] }
    ]
  },
  {
    id: "q4",
    prompt: "Choose a food mood.",
    options: [
      { id: "q4_o1", label: "Street food sprint", imageQuery: "Korea street food", tags: ["CULINARY", "URBAN"] },
      { id: "q4_o2", label: "Seafood market feast", imageQuery: "Korea seafood market", tags: ["COASTAL", "CULINARY"] },
      { id: "q4_o3", label: "Hanok table dinner", imageQuery: "Korea hanok meal", tags: ["TRADITIONAL", "HERITAGE"] },
      { id: "q4_o4", label: "Farm-to-table slow meal", imageQuery: "Korea local farm meal", tags: ["SLOW", "OFFBEAT"] }
    ]
  },
  {
    id: "q5",
    prompt: "Your preferred travel pace is...",
    options: [
      { id: "q5_o1", label: "Packed all-day plan", imageQuery: "Korea busy city day", tags: ["URBAN", "NIGHTLIFE"] },
      { id: "q5_o2", label: "Balanced with scenic breaks", imageQuery: "Korea scenic cafe", tags: ["SCENIC", "AESTHETIC"] },
      { id: "q5_o3", label: "One meaningful site a day", imageQuery: "Korea heritage site", tags: ["HERITAGE", "SPIRITUAL"] },
      { id: "q5_o4", label: "Slow and spontaneous", imageQuery: "Korea countryside road", tags: ["SLOW", "OFFBEAT"] }
    ]
  },
  {
    id: "q6",
    prompt: "Pick a day-trip theme.",
    options: [
      { id: "q6_o1", label: "Design district and shopping", imageQuery: "Korea design district", tags: ["AESTHETIC", "URBAN"] },
      { id: "q6_o2", label: "Lighthouse and beach train", imageQuery: "Korea coastal train", tags: ["COASTAL", "SCENIC"] },
      { id: "q6_o3", label: "Mountain valley hiking", imageQuery: "Korea mountain trail", tags: ["MOUNTAIN", "FOREST"] },
      { id: "q6_o4", label: "Traditional village workshop", imageQuery: "Korea village workshop", tags: ["TRADITIONAL", "HERITAGE"] }
    ]
  },
  {
    id: "q7",
    prompt: "How adventurous should your route feel?",
    options: [
      { id: "q7_o1", label: "Comfortable and connected", imageQuery: "Korea subway", tags: ["URBAN", "CULINARY"] },
      { id: "q7_o2", label: "Scenic but easy", imageQuery: "Korea scenic road trip", tags: ["SCENIC", "COASTAL"] },
      { id: "q7_o3", label: "Ritual and history focused", imageQuery: "Korea temple heritage", tags: ["SPIRITUAL", "HERITAGE"] },
      { id: "q7_o4", label: "Hidden, less-touristed corners", imageQuery: "Korea hidden village", tags: ["OFFBEAT", "SLOW"] }
    ]
  },
  {
    id: "q8",
    prompt: "Choose your social style.",
    options: [
      { id: "q8_o1", label: "Big crowds and events", imageQuery: "Korea festival crowd", tags: ["NIGHTLIFE", "URBAN"] },
      { id: "q8_o2", label: "Promenade and ocean breeze", imageQuery: "Korea ocean promenade", tags: ["COASTAL", "AESTHETIC"] },
      { id: "q8_o3", label: "Small cultural circles", imageQuery: "Korea traditional performance", tags: ["TRADITIONAL", "SPIRITUAL"] },
      { id: "q8_o4", label: "Mostly independent exploration", imageQuery: "Korea solo traveler", tags: ["OFFBEAT", "MOUNTAIN"] }
    ]
  },
  {
    id: "q9",
    prompt: "Which photo set would you post most?",
    options: [
      { id: "q9_o1", label: "City architecture", imageQuery: "Korea modern architecture", tags: ["AESTHETIC", "URBAN"] },
      { id: "q9_o2", label: "Colorful harbor nights", imageQuery: "Korea harbor lights", tags: ["NIGHTLIFE", "COASTAL"] },
      { id: "q9_o3", label: "Stone paths and old roofs", imageQuery: "Korea hanok roof", tags: ["HERITAGE", "TRADITIONAL"] },
      { id: "q9_o4", label: "Waterfalls and ridges", imageQuery: "Korea mountain waterfall", tags: ["MOUNTAIN", "SCENIC"] }
    ]
  },
  {
    id: "q10",
    prompt: "Final pick: your ideal overall vibe.",
    options: [
      { id: "q10_o1", label: "Fast, stylish, always open", imageQuery: "Seoul night district", tags: ["URBAN", "NIGHTLIFE"] },
      { id: "q10_o2", label: "Sea breeze and night lights", imageQuery: "Busan night beach", tags: ["COASTAL", "AESTHETIC"] },
      { id: "q10_o3", label: "Cultural depth and ritual", imageQuery: "Korea temple ritual", tags: ["SPIRITUAL", "HERITAGE"] },
      { id: "q10_o4", label: "Quiet roads and hidden places", imageQuery: "Korea rural road", tags: ["SLOW", "OFFBEAT"] }
    ]
  }
];

export const optionToTags = Object.fromEntries(
  quizQuestions.flatMap((question) =>
    question.options.map((option) => [option.id, option.tags])
  )
);
