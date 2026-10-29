import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Page hero (.cnt-hero): breadcrumb, eyebrow, title, subtitle on a soft panel. */
export function PageHero({
  crumb,
  eyebrow,
  title,
  children,
  className,
}: {
  crumb: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className="wrap pt-4 md:pt-7">
      <section
        className={cn(
          "relative overflow-hidden rounded-hero border border-border-content bg-surface-soft px-5 pb-6 pt-5 md:px-9 md:pb-9 md:pt-10",
          className,
        )}
      >
        {/* Faded Hindi wordmark, decorative */}
        <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 right-4 select-none font-display text-[clamp(5rem,14vw,10rem)] leading-none text-accent opacity-[0.05]">
          उत्सव
        </span>
        <nav aria-label="Breadcrumb" className="relative mb-3 text-meta text-ink-muted">
          <Link href="/" className="tap-area no-underline hover:text-accent">Kitab Utsav</Link>
          <span aria-hidden="true" className="mx-1.5 text-accent">›</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        {eyebrow && <p className="relative mb-2 text-eyebrow uppercase text-accent">{eyebrow}</p>}
        <h1 className="relative mb-2.5 text-balance text-[clamp(1.8rem,3.5vw,2.6rem)] font-semibold leading-[1.2] text-ink-content">{title}</h1>
        {children && <div className="relative max-w-[68ch] text-[1rem] leading-[1.6] text-ink-muted md:text-lead">{children}</div>}
      </section>
    </div>
  );
}
