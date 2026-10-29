"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { SCHEDULE } from "@/data/event";
import { cn, dayParts, todayIST } from "@/lib/utils";

const noop = () => () => {};

/* Five day cards. Today's card is filled while the festival is on. */
export function DayCards() {
  const today = useSyncExternalStore(noop, todayIST, () => "");
  const hasToday = SCHEDULE.some((d) => d.date === today);

  return (
    <ol className="rail md:rail-off md:grid md:grid-cols-5 md:gap-2.5">
      {SCHEDULE.map((d, i) => {
        const p = dayParts(d.date);
        const on = hasToday ? d.date === today : i === 0;
        return (
          <li key={d.date} className="w-[36%] min-w-[124px] md:w-auto md:min-w-0">
            <Link
              href={`/events#day-${i + 1}`}
              aria-current={d.date === today ? "date" : undefined}
              className={cn(
                "flex h-full flex-col gap-0.5 rounded-card border p-4 no-underline transition-[background-color,border-color,box-shadow,transform] duration-300 hover:shadow-card-hover motion-safe:hover:-translate-y-1 active:scale-[0.97] md:p-5",
                on ? "border-accent-fill bg-accent-fill text-on-accent" : "border-border bg-surface-card text-ink hover:border-accent hover:bg-accent-soft",
              )}
            >
              <span className={cn("text-label", !on && "text-accent")}>Day {i + 1}</span>
              <span className="text-[1.85rem] font-semibold leading-tight tabular-nums md:text-[2rem]">{p.num}</span>
              <span className="text-[0.98rem]">{p.month} {p.weekday}</span>
              <span className="mt-2.5 text-meta opacity-80">{d.date === today ? "Today · Sessions soon" : "Sessions soon"}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
