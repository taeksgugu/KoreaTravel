import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KoreaTravel",
  description: "Travel personality quiz and destination guide for Korea"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
