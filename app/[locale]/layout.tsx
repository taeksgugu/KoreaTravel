import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/locales";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ko" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-slate-900">Korea Travel</h1>
          <nav className="flex gap-3 text-sm">
            <Link href="/en" className={locale === "en" ? "font-semibold text-teal-700" : "text-slate-600"}>EN</Link>
            <Link href="/ko" className={locale === "ko" ? "font-semibold text-teal-700" : "text-slate-600"}>KO</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  );
}
