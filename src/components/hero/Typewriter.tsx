"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_MS = 85;
const ERASE_MS = 40;
const HOLD_MS = 1600;
const GAP_MS = 350;

/* Split into user-perceived letters so Hindi vowel signs stay with their consonant. */
function letters(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

/*
  Types each line, holds, erases, then moves to the next, on a loop.
  An invisible copy of every line reserves the space, so the bubble never changes size.
  Reduced motion: all lines shown at once, no animation.
  A line with `center` sits in the middle of the space set by the widest line.
*/
/* `fit`: no space holders, so the bubble grows with the typed text. */
export function Typewriter({ lines, fit }: { lines: { text: string; lang: string; center?: boolean }[]; fit?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [line, setLine] = useState(0);
  const [count, setCount] = useState(0);
  const [erasing, setErasing] = useState(false);

  const current = letters(lines[line].text);

  useEffect(() => {
    if (reduceMotion) return;
    let delay: number;
    let next: () => void;
    if (!erasing && count < current.length) {
      delay = TYPE_MS;
      next = () => setCount((c) => c + 1);
    } else if (!erasing) {
      delay = HOLD_MS;
      next = () => setErasing(true);
    } else if (count > 0) {
      delay = ERASE_MS;
      next = () => setCount((c) => c - 1);
    } else {
      delay = GAP_MS;
      next = () => {
        setErasing(false);
        setLine((l) => (l + 1) % lines.length);
      };
    }
    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [reduceMotion, erasing, count, current.length, lines.length]);

  if (reduceMotion) {
    return (
      <span className="flex flex-col">
        {lines.map((l) => (
          <span key={l.text} lang={l.lang} className={l.center ? "text-center" : undefined}>
            {l.text}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className="grid">
      {/* Space holders: the widest/tallest line sets the bubble size */}
      {!fit && lines.map((l) => (
        <span key={l.text} lang={l.lang} className="invisible [grid-area:1/1]">
          {l.text}
          <span className="inline-block w-[0.5em]" />
        </span>
      ))}
      <span lang={lines[line].lang} className={`[grid-area:1/1] ${lines[line].center && !fit ? "text-center" : ""}`}>
        {current.slice(0, count).join("")}
        <span className="ml-[1px] inline-block h-[1.05em] w-[2px] translate-y-[0.15em] bg-current motion-safe:animate-[caret_1s_steps(1)_infinite]" />
      </span>
    </span>
  );
}
