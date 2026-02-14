import type { Locale } from "./types";

type ExploreText = {
  metadataTitle: string;
  metadataDescription: string;
  heading: string;
  description: string;
  cityPresets: string;
  selectedRegion: string;
  sort: string;
  latest: string;
  title: string;
  eventStatus: string;
  all: string;
  ongoing: string;
  upcoming: string;
  loadError: string;
  noResults: string;
  loadMore: string;
  loading: string;
  addressUnavailable: string;
  openInGoogleMaps: string;
  visitKoreaSearch: string;
  presetApplied: string;
  mapTokenHint: string;
};

const TEXT: Record<Locale, ExploreText> = {
  en: {
    metadataTitle: "Korea Region Map Explorer",
    metadataDescription:
      "Explore Korea regions and drill-down subregions to load attractions, food, stay, and event data.",
    heading: "Korea Regional Explorer",
    description:
      "Click a province and optionally drill down into key city/county polygons, then browse attractions, food, stay, and events.",
    cityPresets: "City Presets (15)",
    selectedRegion: "Selected Region",
    sort: "Sort",
    latest: "Latest",
    title: "Title",
    eventStatus: "Event status",
    all: "All",
    ongoing: "Ongoing",
    upcoming: "Upcoming",
    loadError: "Failed to load items. Please try again.",
    noResults: "No results for this region/category.",
    loadMore: "Load More",
    loading: "Loading...",
    addressUnavailable: "Address unavailable",
    openInGoogleMaps: "Open in Google Maps",
    visitKoreaSearch: "VisitKorea Search",
    presetApplied: "Preset Applied",
    mapTokenHint: "Set NEXT_PUBLIC_MAPBOX_TOKEN to enable interactive polygon map."
  },
  ko: {
    metadataTitle: "Hanguk Jido Tamsek",
    metadataDescription:
      "Sido/sigungu jido tamsek hu gwangwangji, matjip, sukbak, haengsa jeongbo reul hwagin haseyo.",
    heading: "Hanguk Jiyeok Tamseggi",
    description:
      "Sido yeongyeogeul keullik han hue piryo si sigungu ro drill-down han da eum, kategoriebyeol kontencheureul hwagin haseyo.",
    cityPresets: "Dosi Preset (15)",
    selectedRegion: "Seontaeg Doen Jiyeok",
    sort: "Jeongryeol",
    latest: "Choesin Sun",
    title: "Jemok Sun",
    eventStatus: "Haengsa Sangtae",
    all: "Jeonche",
    ongoing: "Jinhaeng Jung",
    upcoming: "Yeojeong",
    loadError: "Mongnok bulo odeul su eopseumnida. Dasi sido haejuseyo.",
    noResults: "I jiyeok/kategorie eseo gyeolgwaga eopseumnida.",
    loadMore: "Deo Bogi",
    loading: "Bulleooneun Jung...",
    addressUnavailable: "Juso Jeongbo Eopseum",
    openInGoogleMaps: "Google Jido Yelgi",
    visitKoreaSearch: "VisitKorea Geomsaek",
    presetApplied: "Preset Jeogyong",
    mapTokenHint: "Inteoraektibeu jido sayong-eun NEXT_PUBLIC_MAPBOX_TOKEN seoljeong-i pilyo hamnida."
  }
};

export function getExploreText(locale: Locale): ExploreText {
  return TEXT[locale];
}
