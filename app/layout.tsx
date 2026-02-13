import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "KoreaTravel",
    template: "%s | KoreaTravel"
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Korea travel",
    "Korea itinerary",
    "Korea trip planner",
    "Korea city guide",
    "K-Travel Type"
  ],
  openGraph: {
    type: "website",
    url: siteConfig.siteUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en">
      <head>
        {adsenseClient ? (
          <meta name="google-adsense-account" content={adsenseClient} />
        ) : null}
      </head>
      <body>
        {children}
        {adsenseClient ? (
          <Script
            async
            id="adsense-script"
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </body>
    </html>
  );
}
