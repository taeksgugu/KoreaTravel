import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const value =
    process.env.ADS_TXT_CONTENT ??
    "google.com, pub-3946429838788366, DIRECT, f08c47fec0942fa0";

  return new NextResponse(`${value}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
