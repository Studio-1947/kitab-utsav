"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT, NAV } from "@/data/event";
import { useScrolled } from "@/hooks/useBrowserState";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";

/* Round icon button used on the right of the nav pill */
export const navIconClass =
  "relative grid size-9 flex-none cursor-pointer place-items-center rounded-full border border-nav-line bg-nav-btn text-ink no-underline transition-[background-color,border-color,color,transform] duration-200 hover:border-accent hover:text-accent motion-safe:hover:-translate-y-0.5 active:scale-95 md:size-10";

function IconLink({ href, icon, label, external, download }: { href: string; icon: IconName; label: string; external?: boolean; download?: boolean }) {
  const common = { "aria-label": label, title: label, className: navIconClass };
  if (external || download) {
    return (
      <a href={href} {...common} {...(external ? { target: "_blank", rel: "noopener" } : { download: true })}>
        <Icon name={icon} className="size-[18px]" />
      </a>
    );
  }
  return (
    <Link href={href} {...common}>
      <Icon name={icon} className="size-[18px]" />
    </Link>
  );
}

/*
  Floating pill nav: Rajkamal emblem, page links, and round icon buttons
  (book a seat, Instagram, add to calendar, theme). Below 1200px the links move to the tab bar.
*/
export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 md:px-5 md:pt-4">
      <div
        className={cn(
          "relative mx-auto flex h-[60px] max-w-[1180px] items-center gap-3 rounded-full border border-nav-line bg-nav-bg pl-2 pr-2 backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 md:h-16 md:gap-6 md:pl-2.5 md:pr-2.5",
          scrolled ? "shadow-lift" : "shadow-card",
        )}
      >
        {/* Faint red glow at the right end, as on the reference */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 rounded-r-full bg-[radial-gradient(ellipse_at_right,rgba(203,35,35,0.14),transparent_70%)] dark:block" />

        <Link href="/" className="relative flex flex-none items-center gap-2.5 no-underline" aria-label={`${EVENT.name}, home`}>
          <span className="grid size-11 place-items-center rounded-full bg-white shadow-card ring-2 ring-logo-red/25 md:size-12">
            <Image src="/brand/rkp-favicon.svg" alt="" width={64} height={64} priority unoptimized className="size-8 md:size-9" />
          </span>
          <span className="text-[1.25rem] font-semibold leading-none text-logo-red dark:text-accent xl:hidden">{EVENT.nameHi}</span>
        </Link>

        <nav aria-label="Main" className="relative hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className="rounded-full px-3 py-2 text-[0.9rem] font-semibold text-ink-content no-underline transition-colors duration-200 hover:bg-nav-btn hover:text-accent aria-[current]:bg-nav-btn aria-[current]:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <a href={EVENT.shopUrl} target="_blank" rel="noopener" className="rounded-full px-3 py-2 text-[0.9rem] font-semibold text-ink-content no-underline transition-colors duration-200 hover:bg-nav-btn hover:text-accent">
            Shop books ↗
          </a>
        </nav>

        <div className="relative ml-auto flex items-center gap-1.5 md:gap-2">
          <IconLink href="/#book" icon="ticket" label="Book my seat" />
          <IconLink href={EVENT.instagram.href} icon="instagram" label={`Kitab Utsav on Instagram, ${EVENT.instagram.handle}`} external />
          <IconLink href={EVENT.calendarUrl} icon="calendarPlus" label={`Add Kitab Utsav ${EVENT.city} to your calendar`} download />
          <ThemeToggle className={navIconClass} />
        </div>
      </div>
    </header>
  );
}
