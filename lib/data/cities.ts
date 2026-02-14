import type { City } from "@/lib/data/types";

export const cities: City[] = [
  {
    slug: "seoul",
    nameEn: "Seoul",
    nameKo: "서울",
    tags: ["URBAN", "NIGHTLIFE", "CULINARY", "AESTHETIC"],
    englishFriendly: 5,
    carRecommended: false,
    accessScore: 5,
    coordinates: { x: 46, y: 26 },
    summary: "Korea's capital with palace heritage, night neighborhoods, and global food streets.",
    itineraryShort: [
      "Day 1: Gyeongbokgung, Bukchon, and Insadong tea houses.",
      "Day 2: Hongdae nightlife and Han River sunset cycling.",
      "Day 3-4: Gangnam design spots and museum cluster."
    ],
    itineraryMedium: [
      "Day 1-2: Historic core and palace circuit.",
      "Day 3: Street food focus in Gwangjang and Mangwon.",
      "Day 4: Day trip to Suwon fortress.",
      "Day 5-6: Shopping and K-culture districts."
    ],
    itineraryLong: [
      "Week 1: Split across history, nightlife, modern art, and food districts.",
      "Add nearby escapes: DMZ tour, Incheon old town, and mountain hikes.",
      "Use Seoul as a rail hub for short city hops."
    ],
    fromIcn: "AREX express train reaches Seoul Station in about 45 minutes; limousine buses connect major districts.",
    transport: "T-money card on subway and buses is the fastest way; taxis are easy to hail by app.",
    unsplashQuery: "Seoul city night",
    mapsQuery: "Seoul local restaurants"
  },
  {
    slug: "busan",
    nameEn: "Busan",
    nameKo: "부산",
    tags: ["URBAN", "COASTAL", "NIGHTLIFE", "SCENIC", "CULINARY"],
    englishFriendly: 4,
    carRecommended: false,
    accessScore: 4,
    coordinates: { x: 67, y: 66 },
    summary: "A coastal metropolis with beaches, seafood markets, and vibrant evening districts.",
    itineraryShort: [
      "Day 1: Haeundae and Dongbaek coastal walk.",
      "Day 2: Jagalchi market and Gamcheon culture village.",
      "Day 3-4: Gwangalli bridge night views and cafe streets."
    ],
    itineraryMedium: [
      "Day 1-2: Beach and skyline neighborhoods.",
      "Day 3: Temple by the sea at Haedong Yonggungsa.",
      "Day 4: Seafood classes and market tasting route.",
      "Day 5-6: Day trip to nearby geoje coast or hot springs."
    ],
    itineraryLong: [
      "Week 1: Slow loop of beaches, mountain viewpoints, and art villages.",
      "Add ferry-linked islands and regional food tours."
    ],
    fromIcn: "From ICN, domestic flight to Gimhae is fastest; KTX via Seoul is a rail alternative.",
    transport: "Metro plus local buses cover major areas; coastal taxis are convenient late at night.",
    unsplashQuery: "Busan beach skyline",
    mapsQuery: "Busan local restaurants"
  },
  {
    slug: "jeju",
    nameEn: "Jeju",
    nameKo: "제주",
    tags: ["ISLAND", "COASTAL", "SCENIC", "SLOW", "AESTHETIC"],
    englishFriendly: 3,
    carRecommended: true,
    accessScore: 3,
    coordinates: { x: 33, y: 91 },
    summary: "Volcanic island landscapes with lava trails, coast drives, and relaxed village cafes.",
    itineraryShort: [
      "Day 1: East coast villages and sunrise peak.",
      "Day 2: Hallasan foothills and tea fields.",
      "Day 3-4: West coast sunset route and local markets."
    ],
    itineraryMedium: [
      "Day 1-2: Jeju City, beaches, and coastal cliffs.",
      "Day 3: Hallasan hiking option.",
      "Day 4: Museums and orchard zones.",
      "Day 5-6: Udo island and slow village stays."
    ],
    itineraryLong: [
      "Week 1: Full clockwise island drive with hiking and beach rest days.",
      "Add eco trails, diving spots, and local craft classes."
    ],
    fromIcn: "Direct flights from ICN to Jeju are frequent throughout the day.",
    transport: "Rental car is most practical for reaching cliffs, farms, and dispersed scenic points.",
    unsplashQuery: "Jeju island coast",
    mapsQuery: "Jeju local restaurants"
  },
  {
    slug: "incheon",
    nameEn: "Incheon",
    nameKo: "인천",
    tags: ["URBAN", "COASTAL", "HERITAGE", "CULINARY"],
    englishFriendly: 4,
    carRecommended: false,
    accessScore: 5,
    coordinates: { x: 38, y: 27 },
    summary: "Gateway city with Chinatown heritage, port history, and tidal park landscapes.",
    itineraryShort: [
      "Day 1: Songdo waterfront and Central Park.",
      "Day 2: Chinatown and open port museum zone.",
      "Day 3-4: Wolmido coast and island ferry day."
    ],
    itineraryMedium: [
      "Day 1-2: New city architecture and waterfront cycling.",
      "Day 3: Historic district deep dive.",
      "Day 4: Seafood market and harbor cruise.",
      "Day 5-6: Ganghwa heritage sites."
    ],
    itineraryLong: [
      "Week 1: Combine islands, city museums, and Seoul side trips.",
      "Stay near airport line for easy transfers."
    ],
    fromIcn: "Incheon Airport Railroad and buses reach major Incheon areas quickly.",
    transport: "Subway and buses are efficient; airport-region taxis are straightforward.",
    unsplashQuery: "Incheon Songdo",
    mapsQuery: "Incheon local restaurants"
  },
  {
    slug: "chuncheon",
    nameEn: "Chuncheon",
    nameKo: "춘천",
    tags: ["SCENIC", "SLOW", "OFFBEAT", "FOREST"],
    englishFriendly: 3,
    carRecommended: true,
    accessScore: 4,
    coordinates: { x: 54, y: 24 },
    summary: "Lake city known for forested bike routes, gentle pace, and local dakgalbi culture.",
    itineraryShort: [
      "Day 1: Soyang riverside and dakgalbi street.",
      "Day 2: Nami-area island and rail-bike route.",
      "Day 3-4: Garden trails and lakeside cafes."
    ],
    itineraryMedium: [
      "Day 1-2: Lake belt and old rail lines.",
      "Day 3: Rural markets and craft spaces.",
      "Day 4: Mountain valley picnic routes.",
      "Day 5-6: Gapyeong day loops."
    ],
    itineraryLong: [
      "Week 1: Slow countryside circuit with village pensions and lake kayaking.",
      "Add national park stops in Gangwon."
    ],
    fromIcn: "Airport bus or transfer via Seoul to ITX Cheongchun gives easy access.",
    transport: "Car helps with lake outskirts, though central sights are bus-accessible.",
    unsplashQuery: "Chuncheon lake",
    mapsQuery: "Chuncheon local restaurants"
  },
  {
    slug: "gangneung",
    nameEn: "Gangneung",
    nameKo: "강릉",
    tags: ["COASTAL", "SCENIC", "AESTHETIC", "SLOW"],
    englishFriendly: 3,
    carRecommended: true,
    accessScore: 3,
    coordinates: { x: 66, y: 31 },
    summary: "East coast beach city with coffee streets, pine trails, and sunrise viewpoints.",
    itineraryShort: [
      "Day 1: Anmok coffee street and beach sunset.",
      "Day 2: Ojukheon heritage and pine forest trail.",
      "Day 3-4: Coastal rail path and seafood night market."
    ],
    itineraryMedium: [
      "Day 1-2: Main beaches and cafe neighborhoods.",
      "Day 3: Mountain temple side trip.",
      "Day 4: Slow art galleries and local bakeries.",
      "Day 5-6: Donghae coast drive."
    ],
    itineraryLong: [
      "Week 1: East coast road trip base with beach and mountain alternation.",
      "Add winter ski extension when in season."
    ],
    fromIcn: "KTX from Seoul Station to Gangneung is the most predictable route from ICN transfers.",
    transport: "Car is useful for scattered beaches and cliff viewpoints.",
    unsplashQuery: "Gangneung beach",
    mapsQuery: "Gangneung local restaurants"
  },
  {
    slug: "sokcho",
    nameEn: "Sokcho",
    nameKo: "속초",
    tags: ["MOUNTAIN", "SCENIC", "COASTAL", "OFFBEAT"],
    englishFriendly: 3,
    carRecommended: true,
    accessScore: 3,
    coordinates: { x: 70, y: 24 },
    summary: "Sea-to-mountain gateway for Seoraksan hikes and fresh harbor seafood.",
    itineraryShort: [
      "Day 1: Sokcho harbor walk and seafood market.",
      "Day 2: Seoraksan cable car and valley route.",
      "Day 3-4: Beach rest plus Abai village ferry."
    ],
    itineraryMedium: [
      "Day 1-2: Coastal city and local eateries.",
      "Day 3: Full mountain trail day.",
      "Day 4: Temple and scenic road.",
      "Day 5-6: Yangyang surf extension."
    ],
    itineraryLong: [
      "Week 1: Outdoor-focused base with alternating mountain and coast days.",
      "Add national park trekking around Gangwon."
    ],
    fromIcn: "Express bus from Seoul or direct airport-region coaches in peak season.",
    transport: "Car simplifies early trail access and nearby coastal villages.",
    unsplashQuery: "Sokcho seoraksan",
    mapsQuery: "Sokcho local restaurants"
  },
  {
    slug: "jeonju",
    nameEn: "Jeonju",
    nameKo: "전주",
    tags: ["HERITAGE", "TRADITIONAL", "CULINARY", "SLOW"],
    englishFriendly: 3,
    carRecommended: false,
    accessScore: 3,
    coordinates: { x: 40, y: 52 },
    summary: "Traditional hanok city famous for culinary heritage and walkable old quarters.",
    itineraryShort: [
      "Day 1: Hanok village alleys and craft shops.",
      "Day 2: Bibimbap and local market tasting course.",
      "Day 3-4: Shrine route and nearby countryside village."
    ],
    itineraryMedium: [
      "Day 1-2: Historic district and museums.",
      "Day 3: Slow food workshops.",
      "Day 4: River walking and bookstore cafes.",
      "Day 5-6: Jinan or Wanju side trips."
    ],
    itineraryLong: [
      "Week 1: Food-focused immersion with traditional stay and cultural classes.",
      "Add nearby mountain temples and farms."
    ],
    fromIcn: "KTX or intercity bus via Seoul links ICN to Jeonju efficiently.",
    transport: "Main attractions are walkable; city buses cover outskirts.",
    unsplashQuery: "Jeonju hanok",
    mapsQuery: "Jeonju local restaurants"
  },
  {
    slug: "gyeongju",
    nameEn: "Gyeongju",
    nameKo: "경주",
    tags: ["HERITAGE", "SPIRITUAL", "TRADITIONAL", "SCENIC"],
    englishFriendly: 2,
    carRecommended: true,
    accessScore: 3,
    coordinates: { x: 63, y: 56 },
    summary: "Ancient Silla capital with tomb parks, temple complexes, and lantern-lit old streets.",
    itineraryShort: [
      "Day 1: Daereungwon tomb park and old observatory.",
      "Day 2: Bulguksa and Seokguram temple route.",
      "Day 3-4: Wolji pond nights and museum day."
    ],
    itineraryMedium: [
      "Day 1-2: Core heritage circuit.",
      "Day 3: Temple mountains and village roads.",
      "Day 4: Hanok stay and evening lantern walk.",
      "Day 5-6: Pohang coast side trip."
    ],
    itineraryLong: [
      "Week 1: Deep historical itinerary with archaeological sites and local rituals.",
      "Add nearby cultural towns in North Gyeongsang."
    ],
    fromIcn: "KTX to Singyeongju station from Seoul transfer is the fastest rail option.",
    transport: "Car helps link spread-out temples and historical parks.",
    unsplashQuery: "Gyeongju historic",
    mapsQuery: "Gyeongju local restaurants"
  },
  {
    slug: "namhae",
    nameEn: "Namhae",
    nameKo: "남해",
    tags: ["COASTAL", "SCENIC", "SLOW", "OFFBEAT"],
    englishFriendly: 2,
    carRecommended: true,
    accessScore: 2,
    coordinates: { x: 45, y: 74 },
    summary: "Quiet southern county with terraced coast roads, sea gardens, and village viewpoints.",
    itineraryShort: [
      "Day 1: German village and cliff coast road.",
      "Day 2: Daraengi rice terraces and harbor sunset.",
      "Day 3-4: Slow farm stay and sea walk trails."
    ],
    itineraryMedium: [
      "Day 1-2: Key coastal drives and panoramas.",
      "Day 3: Local fisheries and market lunch.",
      "Day 4: Island bridge circuit.",
      "Day 5-6: Nearby Tongyeong extension."
    ],
    itineraryLong: [
      "Week 1: Rural coast immersion with multiple village homestays.",
      "Add southern archipelago ferry days."
    ],
    fromIcn: "Bus and rail combinations via Jinju are common, with final local bus or taxi legs.",
    transport: "A car is strongly recommended for remote viewpoints and low-frequency buses.",
    unsplashQuery: "Namhae coast",
    mapsQuery: "Namhae local restaurants"
  },
  {
    slug: "damyang",
    nameEn: "Damyang",
    nameKo: "담양",
    tags: ["FOREST", "SCENIC", "SLOW", "OFFBEAT"],
    englishFriendly: 2,
    carRecommended: true,
    accessScore: 2,
    coordinates: { x: 35, y: 60 },
    summary: "Bamboo groves and calm rural scenery ideal for offbeat slow travel.",
    itineraryShort: [
      "Day 1: Juknokwon bamboo forest and tea break.",
      "Day 2: Metasequoia road and village lunch.",
      "Day 3-4: Garden routes and pension retreat."
    ],
    itineraryMedium: [
      "Day 1-2: Forest and landscape photography loops.",
      "Day 3: Traditional market and craft center.",
      "Day 4: Nearby Gwangju art district.",
      "Day 5-6: Countryside cycling trails."
    ],
    itineraryLong: [
      "Week 1: Slow wellness-focused stay with forest walks and food workshops.",
      "Add Jeolla inland towns for hidden heritage."
    ],
    fromIcn: "Travel via Gwangju by KTX or bus, then continue by regional bus or taxi.",
    transport: "Car is best for connecting groves, gardens, and rural cafes.",
    unsplashQuery: "Damyang bamboo",
    mapsQuery: "Damyang local restaurants"
  },
  {
    slug: "daegu",
    nameEn: "Daegu",
    nameKo: "대구",
    tags: ["URBAN", "CULINARY", "TRADITIONAL", "NIGHTLIFE"],
    englishFriendly: 3,
    carRecommended: false,
    accessScore: 3,
    coordinates: { x: 54, y: 49 },
    summary: "Large inland city with market food lanes, modern nightlife, and temple mountains nearby.",
    itineraryShort: [
      "Day 1: Seomun market food route.",
      "Day 2: Modern downtown and cafe alleys.",
      "Day 3-4: Palgongsan temple side trip."
    ],
    itineraryMedium: [
      "Day 1-2: Market culture and urban core.",
      "Day 3: Museum and design district.",
      "Day 4: Mountain cable car route.",
      "Day 5-6: Day trip to nearby heritage towns."
    ],
    itineraryLong: [
      "Week 1: Mix of urban food scene and spiritual mountain routes.",
      "Use Daegu as a transport center for southern inland Korea."
    ],
    fromIcn: "KTX via Seoul reaches Dongdaegu efficiently; domestic flights are another option.",
    transport: "Metro and buses are practical in the urban center.",
    unsplashQuery: "Daegu city",
    mapsQuery: "Daegu local restaurants"
  },
  {
    slug: "andong",
    nameEn: "Andong",
    nameKo: "안동",
    tags: ["HERITAGE", "SPIRITUAL", "TRADITIONAL", "SLOW"],
    englishFriendly: 2,
    carRecommended: true,
    accessScore: 2,
    coordinates: { x: 60, y: 43 },
    summary: "Confucian heritage city with village architecture, rituals, and slower cultural experiences.",
    itineraryShort: [
      "Day 1: Hahoe village and mask museum.",
      "Day 2: River cliffs and cultural center.",
      "Day 3-4: Academy sites and hanok stay."
    ],
    itineraryMedium: [
      "Day 1-2: Core UNESCO heritage route.",
      "Day 3: Temple valleys and slow tea houses.",
      "Day 4: Traditional performance evening.",
      "Day 5-6: Mountain roads and local farms."
    ],
    itineraryLong: [
      "Week 1: Deep traditional immersion with workshops and local festivals.",
      "Add nearby Yeongju and mountain monasteries."
    ],
    fromIcn: "Rail or bus via Seoul or Daegu, then regional transfer to Andong.",
    transport: "Car helps with spread-out academy sites and village zones.",
    unsplashQuery: "Andong village",
    mapsQuery: "Andong local restaurants"
  },
  {
    slug: "yeosu",
    nameEn: "Yeosu",
    nameKo: "여수",
    tags: ["COASTAL", "NIGHTLIFE", "SCENIC", "AESTHETIC"],
    englishFriendly: 2,
    carRecommended: true,
    accessScore: 2,
    coordinates: { x: 45, y: 67 },
    summary: "Southern harbor city known for nighttime bay views and island-dotted sea scenery.",
    itineraryShort: [
      "Day 1: Cable car and marine park.",
      "Day 2: Harbor food lanes and night cruise.",
      "Day 3-4: Island ferry and coast village walk."
    ],
    itineraryMedium: [
      "Day 1-2: Bay and downtown evening route.",
      "Day 3: Odongdo island nature trails.",
      "Day 4: Local seafood cooking class.",
      "Day 5-6: Suncheon bay extension."
    ],
    itineraryLong: [
      "Week 1: Multi-island south coast trip with Yeosu as base.",
      "Add nearby tea plantations and wetlands."
    ],
    fromIcn: "KTX via Seoul to Yeosu Expo station is the simplest long-distance route.",
    transport: "Car supports late returns from viewpoints and intercity scenic drives.",
    unsplashQuery: "Yeosu harbor night",
    mapsQuery: "Yeosu local restaurants"
  },
  {
    slug: "boryeong",
    nameEn: "Boryeong",
    nameKo: "보령",
    tags: ["COASTAL", "OFFBEAT", "SCENIC", "SLOW"],
    englishFriendly: 2,
    carRecommended: true,
    accessScore: 3,
    coordinates: { x: 31, y: 44 },
    summary: "West coast escape with broad tidal flats, beach festivals, and relaxed town rhythms.",
    itineraryShort: [
      "Day 1: Daecheon beach and mud-themed waterfront.",
      "Day 2: Island ferry and fish market.",
      "Day 3-4: Coast cycling and sunset piers."
    ],
    itineraryMedium: [
      "Day 1-2: Beach and coastal boardwalk loops.",
      "Day 3: Quiet village beaches.",
      "Day 4: Seafood route and craft market.",
      "Day 5-6: Taean peninsula day trip."
    ],
    itineraryLong: [
      "Week 1: West coast slow itinerary with small ports and island stops.",
      "Add inland temple and forest detours."
    ],
    fromIcn: "Intercity buses from the capital region connect directly to Boryeong terminals.",
    transport: "Car is useful for exploring beaches and ferry points outside downtown.",
    unsplashQuery: "Boryeong beach",
    mapsQuery: "Boryeong local restaurants"
  }
];

export const citiesBySlug = Object.fromEntries(
  cities.map((city) => [city.slug, city])
) as Record<City["slug"], City>;
