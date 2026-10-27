"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/ui/Icon";

const TABS: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/events", label: "Events", icon: "calendar" },
  { href: "/authors", label: "Authors", icon: "bookOpen" },
  { href: "/visit", label: "Visit", icon: "pin" },
  { href: "/#book", label: "Book seat", icon: "ticket" },
];

/* Floating bottom tab bar, replaces the nav links below 1200px. */
export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[60] mx-auto grid max-w-[560px] grid-cols-5 rounded-pill border border-border bg-tabbar-bg p-1.5 shadow-tabbar backdrop-blur-md xl:hidden"
    >
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={pathname === t.href ? "page" : undefined}
          className="flex flex-col items-center gap-0.5 rounded-pill py-1.5 text-[0.7rem] font-medium text-ink no-underline transition-[background-color,color,transform] duration-200 active:scale-95 aria-[current]:bg-accent-soft aria-[current]:text-accent"
        >
          <Icon name={t.icon} className="size-5" />
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
