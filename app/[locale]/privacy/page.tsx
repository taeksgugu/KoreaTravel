import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for KoreaTravel."
};

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="text-slate-700">
        KoreaTravel does not require account registration. We may process limited technical data such as
        page requests and diagnostics to operate and secure the service.
      </p>
      <p className="text-slate-700">
        Third-party services, including analytics and advertising platforms, may use cookies or similar technologies
        according to their own policies.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-lg font-semibold text-slate-900">Advertising and Cookies (Google AdSense)</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-700">
          <li>
            Third-party vendors, including Google, use cookies based on prior visits to this website or other websites.
          </li>
          <li>
            Google advertising cookies enable Google and its partners to serve ads to users based on their visits to this site and/or other sites on the Internet.
          </li>
          <li>
            Users can opt out of personalized advertising by visiting Google Ad Settings.
          </li>
        </ul>
      </div>
      <p className="text-slate-700">
        You can request privacy inquiries via hello@visitkoreaguide.org.
      </p>
      <p className="text-xs text-slate-500">Effective date: 2026-02-26</p>
    </section>
  );
}
