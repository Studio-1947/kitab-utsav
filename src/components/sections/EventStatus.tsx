"use client";

import { EVENT } from "@/data/event";
import { useNowSeconds } from "@/hooks/useBrowserState";
import { cn } from "@/lib/utils";

const START = Math.floor(new Date(EVENT.startsAt).getTime() / 1000);
const END = Math.floor(new Date(EVENT.endsAt).getTime() / 1000);

/* Upcoming, happening now, or concluded, for a time in seconds. */
export function festivalStatus(now: number): { text: string; live: boolean } {
  if (now < START) {
    const days = Math.ceil((START - now) / 86400);
    return { text: days <= 1 ? "Starts tomorrow" : `Starts in ${days} days`, live: false };
  }
  if (now < END) {
    return { text: `Happening now · Day ${Math.min(5, Math.floor((now - START) / 86400) + 1)} of 5`, live: true };
  }
  return { text: `Concluded · Thank you, ${EVENT.city}`, live: false };
}

/* Status as plain text, with a fallback until the clock is known. */
export function EventStatusText({ fallback }: { fallback: string }) {
  const now = useNowSeconds();
  return <>{now === null ? fallback : festivalStatus(now).text}</>;
}

/* Live status pill for the current edition. */
export function EventStatus({ className }: { className?: string }) {
  const now = useNowSeconds();
  if (now === null) return <span className={cn("inline-block h-[30px]", className)} aria-hidden="true" />;
  const { text, live } = festivalStatus(now);

  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1.5 text-[0.82rem] font-semibold",
        live ? "bg-discount-tint text-accent" : "bg-surface-soft text-ink-muted",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", live ? "animate-pulse bg-accent" : "bg-ink-muted")} aria-hidden="true" />
      {text}
    </span>
  );
}
