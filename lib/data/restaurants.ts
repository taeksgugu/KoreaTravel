import { citiesBySlug } from "@/lib/data/cities";
import type { CitySlug } from "@/lib/data/types";

export interface RestaurantCategoryItem {
  id: string;
  title: string;
  description: string;
  query: string;
}

export interface RestaurantGuide {
  citySlug: CitySlug;
  cityName: string;
  intro: string;
  categories: RestaurantCategoryItem[];
}

type CityFoodProfile = {
  neighborhoods: string[];
  signatures: string[];
  markets: string[];
};

const foodProfiles: Record<CitySlug, CityFoodProfile> = {
  seoul: {
    neighborhoods: ["Myeongdong", "Hongdae", "Ikseon-dong", "Seongsu"],
    signatures: ["Korean BBQ", "Gukbap", "Korean fried chicken", "Modern hanjeongsik"],
    markets: ["Gwangjang Market", "Mangwon Market"]
  },
  busan: {
    neighborhoods: ["Haeundae", "Gwangalli", "Seomyeon", "Nampo"],
    signatures: ["Dwaeji gukbap", "Milmyeon", "Sashimi", "Seafood hotpot"],
    markets: ["Jagalchi Market", "Bupyeong Kkangtong Market"]
  },
  jeju: {
    neighborhoods: ["Aewol", "Seogwipo", "Hamdeok", "Jeju City"],
    signatures: ["Black pork BBQ", "Abalone porridge", "Hairtail stew", "Jeju seafood noodles"],
    markets: ["Dongmun Market", "Seogwipo Olle Market"]
  },
  incheon: {
    neighborhoods: ["Songdo", "Chinatown", "Bupyeong", "Wolmido"],
    signatures: ["Jjajangmyeon", "Seafood kalguksu", "Korean Chinese cuisine", "Dakgangjeong"],
    markets: ["Sinpo International Market", "Sorae Fish Market"]
  },
  chuncheon: {
    neighborhoods: ["Myeongdong Street", "Soyang Riverside", "Namyangju route", "Myeongju-dong"],
    signatures: ["Dakgalbi", "Makguksu", "Potato jeon", "Lake fish dishes"],
    markets: ["Chuncheon Traditional Market", "Nambu Market"]
  },
  gangneung: {
    neighborhoods: ["Anmok", "Gyeongpo", "Jumunjin", "Downtown Gangneung"],
    signatures: ["Chodang tofu", "Seafood noodles", "Raw fish", "Potato ongshimi"],
    markets: ["Gangneung Jungang Market", "Jumunjin Fish Market"]
  },
  sokcho: {
    neighborhoods: ["Daepo Port", "Abai Village", "Cheongcho Lake", "Sokcho Beach"],
    signatures: ["Ojingeo sundae", "Mulhoe", "Seafood stew", "Grilled fish"],
    markets: ["Sokcho Tourist Fish Market", "Daepo Port Seafood Alley"]
  },
  jeonju: {
    neighborhoods: ["Hanok Village", "Gaeksa", "Nambu Market", "Wansan"],
    signatures: ["Jeonju bibimbap", "Kongnamul gukbap", "Pajeon", "Hanjeongsik"],
    markets: ["Jeonju Nambu Market", "Moraenae Market"]
  },
  gyeongju: {
    neighborhoods: ["Hwangnidan-gil", "Bomun", "Downtown Gyeongju", "Bulguksa area"],
    signatures: ["Ssambap", "Gyeongju bread", "Mushroom hotpot", "Traditional set meals"],
    markets: ["Seongdong Market", "Jungang Market"]
  },
  namhae: {
    neighborhoods: ["Samdong", "Namhae-eup", "Mijo", "Sangju Beach"],
    signatures: ["Anchovy dishes", "Seaweed soup", "Seafood stews", "Village table meals"],
    markets: ["Namhae Traditional Market", "Mijo Harbor Market"]
  },
  damyang: {
    neighborhoods: ["Juknokwon", "Gwanbangje", "Damyang-eup", "Metasequoia Road"],
    signatures: ["Bamboo rice", "Tteokgalbi", "Duck soup", "Seasonal Jeolla side dishes"],
    markets: ["Damyang Market", "Changpyeong Market"]
  },
  daegu: {
    neighborhoods: ["Dongseong-ro", "Suseong", "Apsan", "Seomun area"],
    signatures: ["Makchang", "Napjak mandu", "Spicy stew", "Kalguksu"],
    markets: ["Seomun Market", "Chilgok Market"]
  },
  andong: {
    neighborhoods: ["Andong Downtown", "Hahoe area", "Okdong", "Woryeonggyo"],
    signatures: ["Andong jjimdak", "Heotjesabap", "Salted mackerel", "Traditional noodle soup"],
    markets: ["Andong Gu Market", "Andong Traditional Market"]
  },
  yeosu: {
    neighborhoods: ["Yeosu Expo", "Dolsan", "Old downtown", "Odongdo area"],
    signatures: ["Gat kimchi dishes", "Seafood barbecue", "Raw crab", "Seafood noodles"],
    markets: ["Yeosu Fish Market", "Gyodong Market"]
  },
  boryeong: {
    neighborhoods: ["Daecheon", "Boryeong-eup", "Muchangpo", "Ungcheon"],
    signatures: ["Seafood kalguksu", "Grilled shellfish", "Clam soup", "West coast sashimi"],
    markets: ["Daecheon Fish Market", "Boryeong Traditional Market"]
  }
};

function makeCategories(citySlug: CitySlug): RestaurantCategoryItem[] {
  const city = citiesBySlug[citySlug];
  const profile = foodProfiles[citySlug];
  const cityName = city.nameEn;
  const coreArea = profile.neighborhoods[0];

  return [
    {
      id: "signature",
      title: "Signature Local Dishes",
      description: `Best starting point for ${cityName}: ${profile.signatures.join(", ")}.`,
      query: `${cityName} ${profile.signatures[0]} restaurants`
    },
    {
      id: "market",
      title: "Market Food Zone",
      description: `Street-food and old-school local picks around ${profile.markets.join(" / ")}.`,
      query: `${cityName} ${profile.markets[0]} food`
    },
    {
      id: "neighborhood",
      title: "Popular Neighborhood Picks",
      description: `Restaurant clusters around ${profile.neighborhoods.join(", ")}.`,
      query: `${cityName} ${coreArea} local restaurants`
    },
    {
      id: "seafood",
      title: city.tags.includes("COASTAL") ? "Seafood Specialists" : "Regional Specialty Kitchens",
      description: city.tags.includes("COASTAL")
        ? "Fresh catch restaurants and harbor-side seafood spots."
        : "Regional dishes and chef-run local specialty spaces.",
      query: city.tags.includes("COASTAL")
        ? `${cityName} seafood restaurants`
        : `${cityName} local specialty restaurants`
    },
    {
      id: "cafe",
      title: "Cafe and Dessert Route",
      description: "Coffee, dessert bars, and slow-break food stops near walkable zones.",
      query: `${cityName} dessert cafe`
    },
    {
      id: "night",
      title: "Late Evening Food",
      description: "Open-late dining options for post-sightseeing meals.",
      query: `${cityName} late night food`
    },
    {
      id: "family",
      title: "Family-Friendly Dining",
      description: "Spacious spots with balanced menus and easier seating.",
      query: `${cityName} family friendly restaurants`
    },
    {
      id: "vegetarian",
      title: "Vegetarian and Halal-Friendly Search",
      description: "Useful query for dietary planning before you move between districts.",
      query: `${cityName} vegetarian halal friendly restaurants`
    }
  ];
}

export function getRestaurantGuide(citySlug: CitySlug): RestaurantGuide {
  const city = citiesBySlug[citySlug];
  return {
    citySlug,
    cityName: city.nameEn,
    intro:
      "Original category guide for search planning. Links are Google Maps search queries only, so you can review options safely in real time.",
    categories: makeCategories(citySlug)
  };
}

