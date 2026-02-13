import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "KoreaTravel",
  description: "Travel personality quiz and destination guide for Korea"
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
