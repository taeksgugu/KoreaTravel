import type { CitySlug } from "@/lib/data/types";

export interface DramaSpot {
  name: string;
  city: string;
  mapUrl: string;
}

export interface DramaItem {
  title: string;
  koreanTitle: string;
  trailerUrl?: string;
  trailerLabel: string;
  description: string;
  filmingCities: CitySlug[];
  filmingSpots: DramaSpot[];
}

export const dramaItems: DramaItem[] = [
  {
    title: "Goblin (Guardian: The Lonely and Great God)",
    koreanTitle: "도깨비",
    trailerUrl: "https://www.youtube.com/watch?v=S94ukM8C17A",
    trailerLabel: "Official Trailer (YouTube)",
    description:
      "A 939-year-old goblin seeks his human bride to end his immortal life. A fantasy romance with iconic OST and emotional storytelling.",
    filmingCities: ["gangneung", "seoul", "incheon"],
    filmingSpots: [
      {
        name: "Jumunjin Breakwater",
        city: "Gangneung",
        mapUrl: "https://maps.google.com/?q=Jumunjin+Breakwater+Gangneung"
      },
      {
        name: "Deoksugung Stonewall Walkway",
        city: "Seoul",
        mapUrl: "https://maps.google.com/?q=Deoksugung+Stonewall+Walkway"
      }
    ]
  },
  {
    title: "Crash Landing on You",
    koreanTitle: "사랑의 불시착",
    trailerUrl: "https://www.youtube.com/watch?v=eXMjTXL2Vks",
    trailerLabel: "Official Trailer (Netflix)",
    description:
      "A South Korean heiress accidentally lands in North Korea and meets a North Korean officer. A global hit with romance and tension.",
    filmingCities: ["seoul", "incheon"],
    filmingSpots: [
      {
        name: "N Seoul Tower",
        city: "Seoul",
        mapUrl: "https://maps.google.com/?q=N+Seoul+Tower"
      },
      {
        name: "Muhak Market",
        city: "Chungju",
        mapUrl: "https://maps.google.com/?q=Muhak+Market+Chungju"
      }
    ]
  },
  {
    title: "Mr. Sunshine",
    koreanTitle: "미스터 션샤인",
    trailerUrl: "https://www.youtube.com/watch?v=1TkdeD8wfQM",
    trailerLabel: "Official Trailer",
    description:
      "Set in the early 1900s, this historical epic follows a Korean boy who returns as a U.S. Marine officer amid political turmoil.",
    filmingCities: ["seoul", "andong", "gyeongju"],
    filmingSpots: [
      {
        name: "Suncheon Open Film Set",
        city: "Suncheon",
        mapUrl: "https://maps.google.com/?q=Suncheon+Open+Film+Set"
      },
      {
        name: "Gunsan Modern History Museum Area",
        city: "Gunsan",
        mapUrl: "https://maps.google.com/?q=Gunsan+Modern+History+Museum"
      }
    ]
  },
  {
    title: "Extraordinary Attorney Woo",
    koreanTitle: "이상한 변호사 우영우",
    trailerUrl: "https://www.youtube.com/watch?v=9SdYFYflVbw",
    trailerLabel: "Official Trailer (Netflix)",
    description:
      "Woo Young-woo, a brilliant lawyer on the autism spectrum, navigates courtroom challenges and personal growth in a warm legal drama.",
    filmingCities: ["seoul", "busan", "jeju"],
    filmingSpots: [
      {
        name: "Gwanggyo Lake Park",
        city: "Suwon",
        mapUrl: "https://maps.google.com/?q=Gwanggyo+Lake+Park"
      },
      {
        name: "Jeju Countryside (Sodeok-dong motif)",
        city: "Jeju",
        mapUrl: "https://maps.google.com/?q=Jeju+Island"
      }
    ]
  },
  {
    title: "Our Blues",
    koreanTitle: "우리들의 블루스",
    trailerUrl: "https://www.youtube.com/watch?v=JkQzv-3oM9Y",
    trailerLabel: "Official Trailer",
    description:
      "An omnibus-style drama about intertwined lives on Jeju Island, known for emotional storytelling and ocean landscapes.",
    filmingCities: ["jeju"],
    filmingSpots: [
      {
        name: "Seongsan Ilchulbong",
        city: "Jeju",
        mapUrl: "https://maps.google.com/?q=Seongsan+Ilchulbong"
      },
      {
        name: "Jeju Seaside Villages",
        city: "Jeju",
        mapUrl: "https://maps.google.com/?q=Jeju+Island"
      }
    ]
  },
  {
    title: "Love in the Moonlight",
    koreanTitle: "구르미 그린 달빛",
    trailerUrl: "https://www.youtube.com/watch?v=J9uH8cWvU8U",
    trailerLabel: "Official Trailer",
    description:
      "A Joseon-era romance between a crown prince and a woman disguised as a eunuch, with charming palace-era backdrops.",
    filmingCities: ["seoul", "jeonju"],
    filmingSpots: [
      {
        name: "Gyeongbokgung Palace",
        city: "Seoul",
        mapUrl: "https://maps.google.com/?q=Gyeongbokgung+Palace"
      },
      {
        name: "Jeonju Hanok Village",
        city: "Jeonju",
        mapUrl: "https://maps.google.com/?q=Jeonju+Hanok+Village"
      }
    ]
  },
  {
    title: "Itaewon Class",
    koreanTitle: "이태원 클라쓰",
    trailerUrl: "https://www.youtube.com/watch?v=NeaHNQJ1kCo",
    trailerLabel: "Official Trailer (Netflix)",
    description:
      "After tragedy, a young man opens a pub in Itaewon and challenges a powerful food conglomerate in a story of grit and ambition.",
    filmingCities: ["seoul"],
    filmingSpots: [
      {
        name: "Itaewon Street",
        city: "Seoul",
        mapUrl: "https://maps.google.com/?q=Itaewon+Street"
      },
      {
        name: "Noksapyeong Bridge",
        city: "Seoul",
        mapUrl: "https://maps.google.com/?q=Noksapyeong+Bridge"
      }
    ]
  },
  {
    title: "Can This Love Be Translated?",
    koreanTitle: "이 사랑도 통역되나요",
    trailerLabel: "Official Teaser (to be updated)",
    description:
      "A romantic story between a global star and her interpreter, featuring stylish urban and cultural settings.",
    filmingCities: ["seoul"],
    filmingSpots: [
      {
        name: "Raum Art Center",
        city: "Seoul",
        mapUrl: "https://maps.google.com/?q=Raum+Art+Center+Seoul"
      },
      {
        name: "Hwieu Coffee",
        city: "Goyang",
        mapUrl: "https://maps.google.com/?q=Hwieu+Coffee+Goyang"
      }
    ]
  }
];

