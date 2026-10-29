"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT } from "@/data/event";
import { Icon, type IconName } from "@/components/ui/Icon";

type Tab = { href: string; label: string; icon: IconName; badge?: number; external?: boolean };

/* Tablets (768–1199px) */
const TABS: Tab[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/events", label: "Events", icon: "calendar" },
  { href: "/authors", label: "Authors", icon: "bookOpen" },
  { href: "/visit", label: "Visit", icon: "pin" },
  { href: "/#book", label: "Book seat", icon: "ticket" },
];

/*
  Phones: app-style bar. Profile, wishlist and cart go to the shop, like the header icons on larger screens.
  TEMPORARY: badge counts are placeholders, same as the header.
*/
const PHONE_TABS: Tab[] = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/events", label: "Explore", icon: "compass" },
  { href: EVENT.shopUrl, label: "Profile", icon: "user", external: true },
  { href: EVENT.shopUrl, label: "Wishlist", icon: "heart", badge: 1, external: true },
  { href: EVENT.shopUrl, label: "Cart", icon: "cart", badge: 7, external: true },
];

function TabLink({ tab, current, className }: { tab: Tab; current: boolean; className: string }) {
  const inner = (
    <>
      <span className="relative">
        <Icon name={tab.icon} className="size-5" />
        {tab.badge ? (
          <span aria-hidden="true" className="absolute -right-2.5 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#e5533d] px-1 text-[0.66rem] font-semibold leading-none text-white">
            {tab.badge}
          </span>
        ) : null}
      </span>
      {tab.label}
    </>
  );
  const label = tab.badge ? `${tab.label} (${tab.badge})` : undefined;
  if (tab.external) {
    return (
      <a href={tab.href} target="_blank" rel="noopener" aria-label={label} className={className}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={tab.href} aria-current={current ? "page" : undefined} aria-label={label} className={className}>
      {inner}
    </Link>
  );
}

/* Floating bottom tab bar, replaces the nav links below 1200px. */
export function TabBar() {
  const pathname = usePathname();
  return (
    <>
      <nav
        aria-label="Quick links"
        className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[60] mx-auto grid max-w-[560px] grid-cols-5 rounded-pill border border-border bg-tabbar-bg p-1.5 shadow-tabbar backdrop-blur-md max-md:hidden xl:hidden"
      >
        {TABS.map((t) => (
          <TabLink
            key={t.href}
            tab={t}
            current={pathname === t.href}
            className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-pill py-1.5 text-[0.72rem] font-medium leading-tight text-ink no-underline transition-[background-color,color,transform] duration-200 active:scale-95 aria-[current]:bg-accent-soft aria-[current]:text-accent"
          />
        ))}
      </nav>

      <nav
        aria-label="Quick links"
        className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[60] grid grid-cols-5 rounded-[30px] border border-white/10 bg-[#1f110c]/95 p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.45)] backdrop-blur-md md:hidden"
      >
        {PHONE_TABS.map((t) => (
          <TabLink
            key={t.label}
            tab={t}
            current={!t.external && pathname === t.href}
            className="flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-[24px] text-[0.72rem] font-semibold leading-tight text-[#f7e8da] no-underline transition-[background-color,color,transform] duration-200 active:scale-95 aria-[current]:bg-[#3a2a25] aria-[current]:text-[#f08c78]"
          />
        ))}
      </nav>
    </>
  );
}
