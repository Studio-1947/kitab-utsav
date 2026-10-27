"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";
import type { SearchItem } from "@/lib/search";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const LIMIT = 7;

function search(items: SearchItem[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/);
  return items
    .filter((i) => words.every((w) => i.terms.includes(w)))
    .map((i) => ({ i, score: (i.label.toLowerCase().startsWith(q) ? 0 : 2) + (i.kind === "Photos" ? 1 : 0) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, LIMIT)
    .map((r) => r.i);
}

/* Pill search for authors, festivals, sessions, pages and photo captions, with a keyboard-friendly list. */
export function HeroSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => search(items, query), [items, query]);
  const open = focused && query.trim().length > 0;

  const go = (r: SearchItem | undefined) => {
    if (!r) return;
    setFocused(false);
    input.current?.blur();
    router.push(r.href);
  };

  return (
    <form
      role="search"
      className="relative mx-auto w-full max-w-[340px]"
      onSubmit={(e) => {
        e.preventDefault();
        go(results[active]);
      }}
    >
      <label htmlFor={`${id}-q`} className="sr-only">
        Search authors, festivals and sessions
      </label>
      <input
        ref={input}
        id={`${id}-q`}
        type="search"
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open && results[active] ? `${id}-${active}` : undefined}
        placeholder="Search authors, cities, sessions . . ."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(a + 1, results.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(a - 1, 0));
          } else if (e.key === "Escape") {
            setQuery("");
          }
        }}
        className="h-12 w-full rounded-pill border border-hero-line bg-hero-glass px-6 text-[0.98rem] text-hero-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] outline-none backdrop-blur-md transition-[border-color,box-shadow] duration-200 placeholder:text-hero-muted focus:border-accent focus:shadow-[0_0_0_4px_var(--rk-accent-soft)] [&::-webkit-search-cancel-button]:hidden"
      />

      <ul
        id={`${id}-list`}
        role="listbox"
        aria-label="Search results"
        hidden={!open}
        className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-[360px] overflow-auto rounded-panel border border-border-content bg-surface-content p-1.5 text-left shadow-lift animate-drop"
      >
        {results.length === 0 ? (
          <li className="px-3 py-3 text-[0.9rem] text-ink-muted">No matches for &ldquo;{query.trim()}&rdquo;</li>
        ) : (
          results.map((r, i) => (
            <li
              key={`${r.kind}-${r.href}-${r.label}`}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r)}
              className={cn("flex cursor-pointer items-center gap-3 rounded-input px-3 py-2.5", i === active && "bg-accent-soft")}
            >
              <span className="w-[62px] flex-none text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-accent">{r.kind}</span>
              <span className="min-w-0">
                <span className="block truncate text-[0.92rem] font-medium text-ink-content">{r.label}</span>
                <span className="block truncate text-meta text-ink-muted">{r.sub}</span>
              </span>
              <Icon name="arrowRight" className={cn("ml-auto size-4 flex-none text-accent", i !== active && "opacity-0")} />
            </li>
          ))
        )}
      </ul>
    </form>
  );
}
