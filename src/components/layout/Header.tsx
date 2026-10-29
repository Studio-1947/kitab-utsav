"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT, NAV } from "@/data/event";
import { useScrolled } from "@/hooks/useBrowserState";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";
import { ThemeToggle } from "./ThemeToggle";

/* Round outlined icon button on the right of the bar */
export const navIconClass =
  "relative grid size-11 flex-none cursor-pointer place-items-center rounded-full border border-bar-btn-line bg-bar-btn text-bar-ink no-underline transition-[background-color,border-color,color,transform] duration-200 hover:border-accent hover:text-accent active:scale-95 xl:size-[46px]";

/* Red count bubble on the top-right of an icon button */
function Badge({ count }: { count: number }) {
  return (
    <span aria-hidden="true" className="absolute -right-1 -top-1 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-wish-red px-1 text-[0.68rem] font-semibold leading-none text-white ring-2 ring-page dark:ring-[#1b1210]">
      {count}
    </span>
  );
}

function IconLink({ href, icon, label, external, download, className, iconClass, badge }: { href: string; icon: IconName; label: string; external?: boolean; download?: boolean; className?: string; iconClass?: string; badge?: number }) {
  const common = { "aria-label": badge ? `${label} (${badge})` : label, title: label, className: cn(navIconClass, className) };
  const inner = (
    <>
      <Icon name={icon} className={cn("size-5", iconClass)} />
      {badge ? <Badge count={badge} /> : null}
    </>
  );
  if (external || download) {
    return (
      <a href={href} {...common} {...(external ? { target: "_blank", rel: "noopener" } : { download: true })}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} {...common}>
      {inner}
    </Link>
  );
}

const linkClass =
  "relative whitespace-nowrap px-3 py-2 text-[1rem] font-medium 2xl:px-3.5 2xl:text-[1.02rem] text-bar-ink no-underline transition-colors duration-200 hover:text-accent " +
  // Active page: short accent bar under the label
  "after:absolute after:inset-x-3 after:-bottom-0.5 2xl:after:inset-x-3.5 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-accent after:transition-transform after:duration-300 aria-[current]:after:scale-x-100";

/*
  Full-width top bar, after the Rajkamal Prakashan Samuh site:
  logo on the left, page links centred, round icon buttons on the right.
  Below 1200px the links move to the bottom tab bar; on phones only calendar + theme stay here.
*/
export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const homeMobileIcon = pathname === "/" ? "max-md:border-white/20 max-md:bg-white/[0.04] max-md:text-white" : "";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-bar-line bg-bar-bg backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300",
        pathname === "/" && "max-md:border-transparent max-md:bg-[#1b0e0a] max-md:text-[#fff4ed]",
        scrolled && "shadow-lift",
      )}
    >
      {/* Soft lift in the middle of the bar, as on the reference */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_0%,var(--color-bar-glow),transparent_70%)]" />

      <div className="relative mx-auto flex h-16 max-w-[1504px] items-center gap-4 px-4 max-md:h-[68px] max-md:gap-2 md:h-[76px] md:px-7 xl:h-[88px] xl:px-10">
        <div className="flex flex-1 basis-0 items-center">
          <Link href="/" className="flex-none no-underline" aria-label={`${EVENT.name}, home`}>
            <Image src="/brand/rkp-logo.svg" alt="" width={1257} height={378} priority unoptimized className="h-9 w-auto dark:hidden max-md:hidden sm:h-10 md:h-11 xl:h-[50px]" />
            <Image src="/brand/rkp-logo-dark.svg" alt="" width={1354} height={428} priority unoptimized className="hidden h-9 w-auto dark:block max-md:block max-md:h-9 sm:h-10 md:h-11 xl:h-[50px]" />
          </Link>
        </div>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <a href={EVENT.shopUrl} target="_blank" rel="noopener" className={linkClass}>
            Shop books ↗
          </a>
        </nav>

        <div className="flex flex-1 basis-0 items-center justify-end gap-2 sm:gap-2.5">
          {/*
            TEMPORARY: shop-style icons (account, WhatsApp, wishlist, cart) copied from the Rajkamal site.
            Badge counts are placeholders. The festival icons they replace were:
            Book my seat (/#book, "ticket"), Instagram (EVENT.instagram, "instagram"), Add to calendar (EVENT.calendarUrl, "calendarPlus").
          */}
          <IconLink href="/authors" icon="search" label="Search" className={cn("md:hidden", homeMobileIcon)} />
          <IconLink href={EVENT.shopUrl} icon="user" label="My account" external className="hidden md:grid" />
          <IconLink href="https://wa.me/919810281912" icon="whatsapp" label="Chat on WhatsApp" external className={homeMobileIcon} />
          <IconLink href={EVENT.shopUrl} icon="heart" label="Wishlist" external badge={1} iconClass="fill-current text-wish-red dark:text-[#f6a29c]" className="hidden md:grid" />
          <IconLink href={EVENT.shopUrl} icon="cart" label="Cart" external badge={7} className="hidden md:grid" />
          <ThemeToggle className={cn(navIconClass, homeMobileIcon)} />
        </div>
      </div>
    </header>
  );
}
