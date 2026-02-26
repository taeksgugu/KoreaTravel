export type ExploreGuide = {
  id: string;
  titleEn: string;
  titleKo: string;
  bodyEn: string[];
  bodyKo: string[];
  mapLabelEn: string;
  mapLabelKo: string;
  mapUrl: string;
};

export const exploreGuides: ExploreGuide[] = [
  {
    id: "kdrama-seoul",
    titleEn: "The Enduring Charm of K-Drama Seoul",
    titleKo: "K-드라마 서울의 로맨틱 동선",
    bodyEn: [
      "Seoul is one of the most recognizable K-Drama backdrops in the world, and the best way to experience it is to move through places where city views and emotion naturally overlap. Start at Namsan Seoul Tower, where sunset gives you both the skyline and the classic love-lock atmosphere that appears repeatedly in Korean romance dramas.",
      "After dark, continue to Bukchon Hanok Village and nearby historic streets to see the contrast that makes Seoul feel cinematic: modern towers in one direction and preserved hanok neighborhoods in the other. If you are planning a drama-themed day, keep travel time compact by grouping Namsan, Jongno, and central palace districts into one route."
    ],
    bodyKo: [
      "서울은 전 세계 K-드라마 팬에게 가장 익숙한 촬영 도시입니다. 첫 코스는 남산서울타워가 좋습니다. 해질 무렵 케이블카를 타고 올라가면 도시 전경과 로맨틱한 무드를 동시에 느낄 수 있습니다.",
      "이후 북촌한옥마을과 종로 일대로 이동하면 서울의 매력이 더 분명해집니다. 한쪽에는 현대적인 스카이라인이, 다른 쪽에는 전통 골목이 공존합니다. 드라마 테마 일정은 남산-종로-궁궐권역을 묶어 동선을 짜는 것이 효율적입니다."
    ],
    mapLabelEn: "Open Namsan Seoul Tower",
    mapLabelKo: "남산서울타워 지도 열기",
    mapUrl: "https://www.google.com/maps/search/Namsan+Seoul+Tower"
  },
  {
    id: "gwangjang-food",
    titleEn: "Street Food Immersion at Gwangjang Market",
    titleKo: "광장시장에서 만나는 한국 스트리트 푸드",
    bodyEn: [
      "If you want to understand Korean food culture quickly, Gwangjang Market is one of the most efficient places to begin. The market combines long-running family stalls, fast turnover, and concentrated local specialties in a single walkable zone, so first-time travelers can taste widely without moving across multiple districts.",
      "Start with bindaetteok and mayak kimbap, then compare textures and seasoning styles across noodle, pancake, and raw beef dishes. The value of this area is not one single famous stall, but the density of options and the live market rhythm. Arrive before peak dinner hours if you want shorter queues and easier seating."
    ],
    bodyKo: [
      "한국 음식 문화를 빠르게 이해하고 싶다면 광장시장이 가장 효율적인 출발점 중 하나입니다. 한 구역 안에서 전통 노포와 인기 분식, 지역 대표 메뉴를 연속으로 경험할 수 있어 초행자에게 특히 좋습니다.",
      "빈대떡과 마약김밥으로 시작한 뒤 면류, 전, 육회류를 비교해서 먹어보면 한국식 양념과 식감 차이를 명확히 느낄 수 있습니다. 핵심은 특정 한 집보다도 다양한 선택지와 시장의 에너지 자체에 있습니다."
    ],
    mapLabelEn: "Open Gwangjang Market",
    mapLabelKo: "광장시장 지도 열기",
    mapUrl: "https://www.google.com/maps/search/Gwangjang+Market"
  },
  {
    id: "seoul-contrast-day",
    titleEn: "One-Day Seoul: Palace Heritage to Night Shopping",
    titleKo: "하루 서울 코스: 궁궐에서 야간 쇼핑까지",
    bodyEn: [
      "A balanced one-day Seoul itinerary should combine historical depth and modern city energy. Begin at Gyeongbokgung Palace to anchor your day with architecture, royal history, and ceremonial spaces, then move toward Insadong for craft shops, tea houses, and street-level cultural browsing.",
      "In the evening, shift to Myeongdong to experience Korea’s high-density retail zone, where beauty, street snacks, and trend-driven storefronts operate late. This sequence works well because travel distances stay manageable while the mood changes clearly from tradition to contemporary urban pace."
    ],
    bodyKo: [
      "서울을 하루에 효율적으로 보려면 전통과 현대를 한 동선에 담는 것이 좋습니다. 오전에는 경복궁에서 궁궐 건축과 역사 분위기를 먼저 경험하고, 이후 인사동으로 이동해 공예 상점과 전통 찻집을 둘러보세요.",
      "저녁에는 명동으로 넘어가 쇼핑, K-뷰티, 길거리 음식을 한 번에 즐길 수 있습니다. 이 코스는 이동 부담이 크지 않으면서도 전통에서 현대로 분위기 전환이 확실하다는 장점이 있습니다."
    ],
    mapLabelEn: "Open Gyeongbokgung Palace",
    mapLabelKo: "경복궁 지도 열기",
    mapUrl: "https://www.google.com/maps/search/Gyeongbokgung+Palace"
  },
  {
    id: "busan-gamcheon",
    titleEn: "Busan Color Route: Gamcheon to Jagalchi",
    titleKo: "부산 컬러 루트: 감천에서 자갈치까지",
    bodyEn: [
      "Gamcheon Culture Village is one of Busan’s most photogenic neighborhoods, but its real value is cultural layering. The alleys, stairs, and mural zones reflect both post-war history and later art-driven regeneration. Walk slowly and plan extra time for elevation changes between viewpoints.",
      "After Gamcheon, continue to Jagalchi Market to connect visual exploration with local seafood culture. This pairing gives travelers a full Busan signature: hillside color streets plus working waterfront market energy. If you start early, both locations fit comfortably into a half-day to full-day plan."
    ],
    bodyKo: [
      "감천문화마을은 부산에서 가장 사진이 잘 나오는 장소 중 하나지만, 핵심 가치는 색감만이 아니라 역사와 재생의 맥락입니다. 골목과 계단을 천천히 걸으며 전망 포인트를 따라 이동하면 마을의 구조를 더 잘 이해할 수 있습니다.",
      "이후 자갈치시장으로 내려오면 부산의 또 다른 얼굴인 해산물 시장 문화를 바로 체감할 수 있습니다. 감천+자갈치 조합은 부산의 풍경과 생활 문화를 함께 보여주는 대표 코스입니다."
    ],
    mapLabelEn: "Open Gamcheon Culture Village",
    mapLabelKo: "감천문화마을 지도 열기",
    mapUrl: "https://www.google.com/maps/search/Gamcheon+Culture+Village"
  },
  {
    id: "temple-mindfulness",
    titleEn: "Temple Mindfulness Route: Jogyesa to Bulguksa",
    titleKo: "템플 마인드풀니스 루트: 조계사와 불국사",
    bodyEn: [
      "Travelers looking for a calmer pace can build a temple-focused route that begins in Seoul and extends to Gyeongju. Jogyesa Temple is accessible in central Seoul and works as a short urban reset between busy shopping or museum schedules.",
      "For deeper immersion, Bulguksa in Gyeongju offers a stronger heritage context and can be paired with temple stay programs, early morning walks, and low-noise reflection time. This route is especially useful for visitors who want mental rest as part of their Korea itinerary, not only sightseeing volume."
    ],
    bodyKo: [
      "조용한 여행 템포를 원한다면 사찰 중심 동선을 추천합니다. 서울 도심의 조계사는 접근성이 좋아 바쁜 일정 사이에 짧게 마음을 정리하기에 적합합니다.",
      "더 깊은 경험을 원한다면 경주의 불국사와 템플스테이 프로그램을 함께 고려해보세요. 이 코스는 단순 관광지 체크가 아니라 휴식과 몰입을 여행 목적에 포함시키고 싶은 분들에게 특히 잘 맞습니다."
    ],
    mapLabelEn: "Open Bulguksa Temple",
    mapLabelKo: "불국사 지도 열기",
    mapUrl: "https://www.google.com/maps/search/Bulguksa+Temple"
  }
];
