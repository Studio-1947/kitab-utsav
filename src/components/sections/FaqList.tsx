"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/* Numbered accordion, one answer open at a time. Answers slide open by animating grid rows 0fr → 1fr. */
export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((f, i) => {
        const on = open === i;
        const btn = `${base}-q${i}`;
        const panel = `${base}-a${i}`;
        return (
          <Reveal key={f.q} delay={i * 0.06}>
            <div
              className={cn(
                "group relative overflow-hidden rounded-panel border bg-surface-content text-ink-content shadow-card transition-[border-color,box-shadow] duration-500",
                on ? "border-accent/50 shadow-card-hover" : "border-border-content hover:border-accent/50",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-1 origin-top bg-accent-fill transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  on ? "scale-y-100" : "scale-y-0",
                )}
              />
              <h3 className="m-0">
                <button
                  id={btn}
                  type="button"
                  aria-expanded={on}
                  aria-controls={panel}
                  onClick={() => setOpen(on ? null : i)}
                  className="flex w-full cursor-pointer items-center gap-3 bg-transparent px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 text-left text-inherit focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent md:px-7"
                >
                  <span aria-hidden="true" className="w-6 flex-none text-[0.85rem] sm:w-7 font-semibold tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1 text-[1rem] font-semibold leading-snug md:text-[1.12rem]">{f.q}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative grid size-9 flex-none place-items-center rounded-full border transition-[background-color,border-color,color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      on ? "rotate-45 border-accent-fill bg-accent-fill text-on-accent" : "border-border-content text-accent group-hover:border-accent",
                    )}
                  >
                    <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                    <span className="absolute h-3.5 w-0.5 rounded-full bg-current" />
                  </span>
                </button>
              </h3>
              <div
                id={panel}
                role="region"
                aria-labelledby={btn}
                inert={!on}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p
                    className={cn(
                      "pb-5 pl-[52px] pr-4 text-[0.95rem] leading-[1.7] sm:pb-6 sm:pl-16 sm:pr-5 text-ink-muted transition-[opacity,translate] duration-500 ease-out motion-reduce:transition-none md:pl-[4.5rem] md:pr-16",
                      on ? "translate-y-0 opacity-100 delay-100" : "-translate-y-1.5 opacity-0",
                    )}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
