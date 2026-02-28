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
    mapTokenHint: "Interactive map is temporarily unavailable."
  },
  ko: {
    metadataTitle: "한국 지역 탐색",
    metadataDescription: "지도를 클릭해 지역을 선택하고 카테고리별 콘텐츠를 탐색하세요.",
    heading: "한국 지역 탐색",
    description: "지역을 선택한 뒤 관광지, 맛집, 숙박, 행사 정보를 확인하세요.",
    cityPresets: "도시 프리셋 (15)",
    selectedRegion: "선택한 지역",
    sort: "정렬",
    latest: "최신순",
    title: "이름순",
    eventStatus: "행사 상태",
    all: "전체",
    ongoing: "진행중",
    upcoming: "예정",
    loadError: "불러오기에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    noResults: "이 지역/카테고리에서 결과가 없습니다.",
    loadMore: "더 보기",
    loading: "불러오는 중...",
    addressUnavailable: "주소 정보 없음",
    openInGoogleMaps: "Google 지도 열기",
    visitKoreaSearch: "VisitKorea 검색",
    presetApplied: "프리셋 적용",
    mapTokenHint: "인터랙티브 지도를 잠시 사용할 수 없습니다."
  }
};

export function getExploreText(locale: Locale): ExploreText {
  return TEXT[locale];
}
