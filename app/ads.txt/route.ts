import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const configured = process.env.ADS_TXT_CONTENT?.trim();
  const value = configured
    ? configured
    : [
        "# Configure ADS_TXT_CONTENT in your environment for production verification.",
        "google.com, pub-3946429838788366, DIRECT, f08c47fec0942fa0"
      ].join("\n");

  return new NextResponse(`${value}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
