"use client";

import { Children, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Phone hero: slabs in a sideways swipe row that snaps card by card, with the next card peeking in.
  Cards other than the current one tilt slightly away. Dots underneath follow the scroll.
*/
export function HeroCarousel({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    if (!first) return;
    const step = first.offsetWidth + 12; // card width + gap-3
    setCurrent(Math.max(0, Math.min(slides.length - 1, Math.round(el.scrollLeft / step))));
  };

  return (
    <div>
      <div
        ref={track}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-px-4 px-4 pb-4 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn(
              "w-[60.5vw] max-w-[260px] flex-none snap-start transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              i > current && "motion-safe:[transform:perspective(900px)_rotateY(-8deg)_rotateZ(1.5deg)]",
              i < current && "motion-safe:[transform:perspective(900px)_rotateY(8deg)_rotateZ(-1.5deg)]",
            )}
          >
            {slide}
          </div>
        ))}
        {/* Lets the last card snap to the left edge */}
        <span aria-hidden="true" className="w-px flex-none" />
      </div>

      <div aria-hidden="true" className="flex justify-center gap-1.5">
        {slides.map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 rounded-full transition-[width,background-color] duration-300", i === current ? "w-5 bg-[#f08c78]" : "w-1.5 bg-white/30")}
          />
        ))}
      </div>
    </div>
  );
}
