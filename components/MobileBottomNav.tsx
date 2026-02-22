"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type Item = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  );
}

function IconExplore() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 3 14 21l-3.5-7.5L3 10l18-7Z" />
    </svg>
  );
}

function IconDrama() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 6v12M16 6v12" />
    </svg>
  );
}

function IconFood() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3v8M10 3v8M8 3v18" />
      <path d="M16 3c2 2 2 6 0 8v10" />
    </svg>
  );
}

export function MobileBottomNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const items: Item[] = [
    { key: "home", label: "Home", href: `/${locale}`, icon: <IconHome /> },
    { key: "explore", label: "Explore", href: `/${locale}/explore`, icon: <IconExplore /> },
    { key: "drama", label: "Drama", href: `/${locale}/drama`, icon: <IconDrama /> },
    { key: "food", label: "K-Food", href: `/${locale}/restaurants`, icon: <IconFood /> }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto grid h-16 w-full max-w-[560px] grid-cols-4 px-2">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.key}
              href={item.href as never}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
                active ? "text-blue-700" : "text-slate-400"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
