import type { Metadata } from "next";
import Script from "next/script";
import { getBaseUrl } from "@/lib/site";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

const siteUrl = getBaseUrl();
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3946429838788366";
const hasAdsenseClient = adsenseClient.startsWith("ca-pub-");
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@visitkoreaguide.org";

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
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KoreaTravel",
    url: siteUrl,
    email: contactEmail
  };

  return (
    <html lang="en">
      <body>
        <Script
          id="org-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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

