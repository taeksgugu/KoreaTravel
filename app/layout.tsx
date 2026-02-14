import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://visitkoreaguide.org";
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3946429838788366";
const hasAdsenseClient = adsenseClient.startsWith("ca-pub-");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KoreaTravel",
    template: "%s | KoreaTravel"
  },
  description: "Interactive Korea travel guide with quiz, region explorer, drama spots, and restaurant ideas.",
  keywords: [
    "Korea travel",
    "South Korea itinerary",
    "Korea destinations",
    "Korea travel quiz",
    "Korea map explorer"
  ],
  openGraph: {
    type: "website",
    siteName: "KoreaTravel",
    title: "KoreaTravel",
    description: "Find destinations in Korea with map exploration and personalized travel recommendations.",
    url: siteUrl
  },
  twitter: {
    card: "summary_large_image",
    title: "KoreaTravel",
    description: "Find destinations in Korea with map exploration and personalized travel recommendations."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {hasAdsenseClient ? (
          <Script
            id="adsense-loader"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
        {children}
      </body>
    </html>
  );
}
