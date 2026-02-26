export type Guide = {
  id: string;
  title: string;
  content: string;
  location: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  titleKo?: string;
  contentKo?: string;
};

export const guides: Guide[] = [
  {
    id: "k-drama-seoul",
    title: "The Enduring Charm of K-Dramas: A Romantic Journey Through Seoul",
    content:
      "Seoul feels like a living K-Drama set for travelers who love emotional city scenes. Start at Namsan Seoul Tower for sunset skyline views and the iconic love-lock atmosphere often seen in romance shows.\n\nThen move to Bukchon Hanok Village and nearby historic streets to experience the contrast between modern skyline and traditional architecture. For efficient routing, group Namsan, Jongno, and central palace areas into one compact day plan.",
    location: { lat: 37.5512, lng: 126.9882 },
    googleMapsUrl: "https://www.google.com/maps/search/Namsan+Seoul+Tower",
    titleKo: "K-드라마 서울 로맨틱 코스",
    contentKo:
      "서울은 K-드라마 팬에게 가장 익숙한 촬영 도시입니다. 남산서울타워에서 해질 무렵 전경을 보고, 로맨틱한 무드를 먼저 경험해보세요.\n\n이후 북촌한옥마을과 종로권역으로 이동하면 현대와 전통의 대비를 한 번에 느낄 수 있습니다. 남산-종로-궁궐 권역을 묶으면 초행자도 동선을 효율적으로 구성할 수 있습니다."
  },
  {
    id: "gwangjang-food",
    title: "Exploring Korean Street Food: A Feast at Gwangjang Market",
    content:
      "Gwangjang Market is one of the fastest ways to understand Korean food culture. You can try multiple local staples in one dense walkable zone without crossing many districts.\n\nBegin with bindaetteok and mayak kimbap, then compare noodle, pancake, and yukhoe options by texture and seasoning style. The value here is the market rhythm and variety, not only one famous stall.",
    location: { lat: 37.5704, lng: 126.9996 },
    googleMapsUrl: "https://www.google.com/maps/search/Gwangjang+Market",
    titleKo: "광장시장 미식 탐험",
    contentKo:
      "광장시장은 한국 음식 문화를 빠르게 이해하기 좋은 공간입니다. 한 구역 안에서 다양한 대표 메뉴를 연속으로 경험할 수 있습니다.\n\n빈대떡, 마약김밥, 육회 등 메뉴를 비교해서 먹어보면 한국식 양념과 식감의 차이를 명확히 느낄 수 있습니다."
  },
  {
    id: "seoul-contrast-day",
    title: "A Perfect Day in Seoul: Ancient Majesty and Modern Vibes",
    content:
      "A balanced Seoul day should combine heritage and modern city energy. Start at Gyeongbokgung Palace for royal architecture and historical context, then move to Insadong for craft shops and tea houses.\n\nIn the evening, head to Myeongdong for shopping, beauty stores, and late-night street snack culture. This sequence works because distances are manageable while the atmosphere shifts clearly from traditional to contemporary.",
    location: { lat: 37.5796, lng: 126.9770 },
    googleMapsUrl: "https://www.google.com/maps/search/Gyeongbokgung+Palace",
    titleKo: "하루 서울: 궁궐에서 야간 쇼핑까지",
    contentKo:
      "서울 하루 코스는 전통과 현대를 함께 담는 것이 핵심입니다. 경복궁에서 시작해 인사동으로 이동하면 역사와 문화 감도를 자연스럽게 높일 수 있습니다.\n\n저녁에는 명동으로 이동해 쇼핑과 K-뷰티, 길거리 음식을 한 번에 즐길 수 있습니다."
  },
  {
    id: "busan-color-route",
    title: "Busan Cultural Gem: The Colorful Alleys of Gamcheon",
    content:
      "Gamcheon Culture Village is Busan's signature visual district, but its strength is more than color. The alley layout reflects both post-war history and later art-led regeneration.\n\nAfter Gamcheon, continue to Jagalchi Market to connect scenic exploration with seafood culture. This pairing gives first-time travelers a clear Busan identity: hillside color streets and working waterfront energy.",
    location: { lat: 35.0976, lng: 129.0106 },
    googleMapsUrl: "https://www.google.com/maps/search/Gamcheon+Culture+Village",
    titleKo: "부산 감천 컬러 루트",
    contentKo:
      "감천문화마을은 부산의 대표적인 포토 스팟이지만, 역사와 재생의 맥락까지 함께 보는 것이 중요합니다.\n\n감천 이후 자갈치시장으로 이동하면 부산의 해양 생활 문화를 직접 체감할 수 있습니다."
  },
  {
    id: "temple-retreat",
    title: "Spiritual Retreat: Mindfulness in Korea's Ancient Temples",
    content:
      "For travelers who want slower pace and mental reset, temple-focused routing works well. Start with Jogyesa in central Seoul for an accessible urban pause.\n\nFor deeper immersion, Bulguksa in Gyeongju offers stronger heritage context and can be paired with temple stay style programs. This route is ideal when your itinerary goal includes rest and reflection, not only attraction volume.",
    location: { lat: 35.7900, lng: 129.3320 },
    googleMapsUrl: "https://www.google.com/maps/search/Bulguksa+Temple",
    titleKo: "사찰 힐링 루트",
    contentKo:
      "조용한 템포의 여행을 원한다면 사찰 중심 동선을 추천합니다. 서울의 조계사는 접근성이 좋아 짧은 휴식 코스로 적합합니다.\n\n경주의 불국사는 더 깊은 몰입형 경험에 맞고, 템플스테이와 연계해 일정의 밀도를 조절하기 좋습니다."
  }
];
