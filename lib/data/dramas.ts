import type { CitySlug } from "@/lib/data/types";

export interface DramaItem {
  title: string;
  filmingCities: CitySlug[];
  note: string;
  visualQuery: string;
}

export const dramaItems: DramaItem[] = [
  {
    title: "Goblin",
    filmingCities: ["seoul", "gangneung", "incheon"],
    note: "Romance-fantasy landmarks and cinematic coastal streets.",
    visualQuery: "Korea old street night"
  },
  {
    title: "Crash Landing on You",
    filmingCities: ["seoul", "jeju", "incheon"],
    note: "Urban panoramas with iconic cafe and shoreline scenes.",
    visualQuery: "Korea couple scenic travel"
  },
  {
    title: "Extraordinary Attorney Woo",
    filmingCities: ["seoul", "busan", "jeju"],
    note: "Modern city visuals and harbor-side episode locations.",
    visualQuery: "Korea harbor skyline"
  },
  {
    title: "Mr. Sunshine",
    filmingCities: ["andong", "gyeongju", "seoul"],
    note: "Historic architecture and traditional village atmospheres.",
    visualQuery: "Korea traditional village"
  },
  {
    title: "Our Blues",
    filmingCities: ["jeju"],
    note: "Island life storytelling in fishing villages and coasts.",
    visualQuery: "Jeju fishing village coast"
  }
];
