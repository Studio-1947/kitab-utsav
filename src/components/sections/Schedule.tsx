"use client";

import { useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { EVENT, SCHEDULE, SCHEDULE_NOTE } from "@/data/event";
import { Icon } from "@/components/ui/Icon";
import { cn, dayParts, todayIST } from "@/lib/utils";

/* Opens the day in the URL hash (#day-3), else today during the festival, else Day 1. */
function initialDay() {
  const fromHash = /^#day-(\d)$/.exec(window.location.hash);
  if (fromHash) {
    const n = Number(fromHash[1]) - 1;
    if (n >= 0 && n < SCHEDULE.length) return n;
  }
  return Math.max(0, SCHEDULE.findIndex((d) => d.date === todayIST()));
}
function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function Schedule() {
  const fromUrl = useSyncExternalStore(subscribeHash, initialDay, () => 0);
  const [picked, setPicked] = useState<number | null>(null);
  const current = picked ?? fromUrl;
  const day = SCHEDULE[current];
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(i: number) {
    setPicked(i);
    history.replaceState(null, "", `#day-${i + 1}`);
  }

  // Arrow keys move between day tabs (WAI-ARIA tabs pattern)
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const last = SCHEDULE.length - 1;
    const to =
      e.key === "ArrowRight" ? (current + 1) % SCHEDULE.length
      : e.key === "ArrowLeft" ? (current - 1 + SCHEDULE.length) % SCHEDULE.length
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (to === null) return;
    e.preventDefault();
    select(to);
    tabs.current[to]?.focus();
  }

  return (
    <div>
      <p className="mb-5 flex items-start gap-3 rounded-banner border-[1.5px] border-dashed border-clay bg-surface-soft px-4 py-3.5 text-[0.95rem] text-ink-content">
        <Icon name="clock" className="mt-0.5 text-clay" />
        <span>
          {SCHEDULE_NOTE}{" "}
          <a href={EVENT.instagram.href} target="_blank" rel="noopener" className="font-semibold text-accent underline underline-offset-[3px]">
            {EVENT.instagram.handle}
          </a>
          .
        </span>
      </p>

      <div
        role="tablist"
        aria-label="Festival days"
        onKeyDown={onKey}
        className="no-scrollbar -mx-4 mb-5 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-auto px-4 pb-0.5 md:mx-0 md:flex-wrap md:px-0"
      >
        {SCHEDULE.map((d, i) => {
          const p = dayParts(d.date);
          const selected = i === current;
          return (
            <button
              key={d.date}
              ref={(el) => { tabs.current[i] = el; }}
              type="button"
              role="tab"
              id={`day-tab-${i}`}
              aria-selected={selected}
              aria-controls="day-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(i)}
              className={cn(
                "flex min-w-[130px] flex-none cursor-pointer snap-start flex-col items-start gap-0.5 rounded-card border px-4 py-3 text-left transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97]",
                selected ? "border-accent-fill bg-accent-fill text-on-accent" : "border-border bg-surface-card text-ink hover:border-accent hover:bg-accent-soft",
              )}
            >
              <span className={cn("text-label", !selected && "text-accent")}>Day {i + 1}</span>
              <span className="text-[1.1rem] font-semibold tabular-nums">{p.num} {p.monthLong}</span>
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="day-panel" aria-labelledby={`day-tab-${current}`} tabIndex={0} className="focus-visible:outline-offset-4">
        <h2 className="mb-3 text-[1.25rem] font-semibold text-ink-content">
          Day {current + 1}: {dayParts(day.date).long}
        </h2>
        <ol className="flex flex-col gap-2.5">
          {day.sessions.map((s) => (
            <li
              key={s.time + s.type}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1 rounded-card border border-border-content bg-surface-content px-4 py-3.5 md:grid-cols-[130px_minmax(0,1fr)_auto] md:px-5"
            >
              <span className="col-span-2 text-[0.98rem] font-semibold tabular-nums text-accent md:col-span-1">{s.time}</span>
              <span className={cn("text-[1.02rem]", s.title ? "font-semibold text-ink-content" : "italic text-ink-muted")}>
                {s.title ?? "To be announced"}
              </span>
              <span className="rounded-pill bg-accent-soft px-2.5 py-0.5 text-tag text-accent">{s.type}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
