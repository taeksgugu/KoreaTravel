import type { CitySlug } from "@/lib/data/types";

export interface DramaItem {
  title: string;
  filmingCities: CitySlug[];
  note: string;
  visualQuery: string;
  youtubeQuery: string;
  relatedSpots?: Array<{ name: string; mapsQuery: string }>;
}

export const dramaItems: DramaItem[] = [
  {
    title: "Goblin",
    filmingCities: ["seoul", "gangneung", "incheon"],
    note: "Romance-fantasy landmarks and cinematic coastal streets.",
    visualQuery: "Korea old street night",
    youtubeQuery: "Goblin official trailer"
  },
  {
    title: "Crash Landing on You",
    filmingCities: ["seoul", "jeju", "incheon"],
    note: "Urban panoramas with iconic cafe and shoreline scenes.",
    visualQuery: "Korea couple scenic travel",
    youtubeQuery: "Crash Landing on You official trailer"
  },
  {
    title: "Extraordinary Attorney Woo",
    filmingCities: ["seoul", "busan", "jeju"],
    note: "Modern city visuals and harbor-side episode locations.",
    visualQuery: "Korea harbor skyline",
    youtubeQuery: "Extraordinary Attorney Woo official trailer"
  },
  {
    title: "Mr. Sunshine",
    filmingCities: ["andong", "gyeongju", "seoul"],
    note: "Historic architecture and traditional village atmospheres.",
    visualQuery: "Korea traditional village",
    youtubeQuery: "Mr. Sunshine official trailer"
  },
  {
    title: "Our Blues",
    filmingCities: ["jeju"],
    note: "Island life storytelling in fishing villages and coasts.",
    visualQuery: "Jeju fishing village coast",
    youtubeQuery: "Our Blues official trailer"
  },
  {
    title: "Can This Love Be Translated?",
    filmingCities: ["seoul"],
    note: "Multilingual rom-com production reportedly filmed across Korea and overseas locations.",
    visualQuery: "Seoul city romance night",
    youtubeQuery: "Can This Love Be Translated Netflix",
    relatedSpots: [
      { name: "Seoul (Korea)", mapsQuery: "Seoul filming locations" },
      { name: "Kamakura (Japan)", mapsQuery: "Kamakura Komachi Street" },
      { name: "Horseshoe Canyon (Canada)", mapsQuery: "Horseshoe Canyon Alberta" },
      { name: "Tuscan Hill Towns (Italy)", mapsQuery: "Tuscany hill towns Italy" }
    ]
  }
];
