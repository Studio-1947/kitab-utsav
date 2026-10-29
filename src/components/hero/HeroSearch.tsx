"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

/* Browser voice typing (Chrome, Edge, Safari). Typed loosely: it isn't in the TS DOM library yet. */
type Recognition = {
  lang: string;
  interimResults: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
  const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
const noopSubscribe = () => () => {};

/* Words cycled after "Search" in the empty field */
const HINTS = ["Authors", "Cities", "Sessions"];
const HINT_MS = 2400;

/*
  "Search Authors" → "Search Cities" → "Search Sessions" → … The word rises from below
  while the old one leaves upwards. Reduced motion: the word swaps without movement.
*/
function RotatingHint({ listening }: { listening: boolean }) {
  const reduceMotion = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (listening) return;
    const t = window.setInterval(() => setI((n) => (n + 1) % HINTS.length), HINT_MS);
    return () => window.clearInterval(t);
  }, [listening]);

  if (listening) return <>Listening…</>;

  return (
    <>
      Search
      {/* Gap set with margin: the wrapper is a flex row, which drops plain spaces */}
      <span className="relative ml-[0.3em] inline-flex h-[1.5em] overflow-hidden align-bottom">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={HINTS[i]}
            initial={reduceMotion ? { opacity: 0 } : { y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="block leading-[1.5em]"
          >
            {HINTS[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </>
  );
}

/* Pill search for authors, festivals, sessions, pages and photo captions, with a keyboard-friendly list. */
export function HeroSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter();
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const [listening, setListening] = useState(false);
  const recognition = useRef<Recognition | null>(null);
  // Mic shows only where voice typing exists; false on the server so hydration matches
  const canListen = useSyncExternalStore(noopSubscribe, () => recognitionCtor() !== null, () => false);

  const results = useMemo(() => search(items, query), [items, query]);
  const open = focused && query.trim().length > 0;

  const go = (r: SearchItem | undefined) => {
    if (!r) return;
    setFocused(false);
    input.current?.blur();
    router.push(r.href);
  };

  const listen = () => {
    if (listening) {
      recognition.current?.stop();
      return;
    }
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    const r = new Ctor();
    r.lang = "hi-IN"; // understands Hindi and Indian-English names
    r.interimResults = true;
    r.onresult = (e) => {
      const text = Array.from(e.results, (res) => res[0].transcript).join("");
      setQuery(text);
      setActive(0);
    };
    r.onend = r.onerror = () => {
      setListening(false);
      input.current?.focus();
    };
    recognition.current = r;
    setListening(true);
    r.start();
  };

  return (
    <form
      role="search"
      className="relative mx-auto w-full max-w-[440px]"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[active]) go(results[active]);
        else input.current?.focus();
      }}
    >
      {/* Pill: search icon, field, mic (outlined) and go (filled) */}
      <div className="flex h-[58px] items-center gap-2 rounded-pill border border-hero-line bg-hero-glass pl-5 pr-[5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-[border-color,box-shadow] duration-200 focus-within:border-accent focus-within:shadow-[0_0_0_4px_var(--rk-accent-soft)] dark:bg-white/[0.04] md:h-[60px]">
        <Icon name="search" className="size-5 flex-none text-hero-muted" />
        <label htmlFor={`${id}-q`} className="sr-only">
          Search authors, festivals and sessions
        </label>
        <div className="relative flex h-full min-w-0 flex-1 items-center">
          <input
            ref={input}
            id={`${id}-q`}
            type="search"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-activedescendant={open && results[active] ? `${id}-${active}` : undefined}
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
            className="h-full w-full min-w-0 bg-transparent pl-1 text-[16px] text-hero-ink outline-none md:text-[1.02rem] [&::-webkit-search-cancel-button]:hidden"
          />
          {/* Animated placeholder, shown while the field is empty */}
          {!query && (
            <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1 flex items-center whitespace-nowrap text-[16px] text-hero-muted md:text-[1.02rem]">
              <RotatingHint listening={listening} />
            </span>
          )}
        </div>
        {canListen && (
          <button
            type="button"
            onClick={listen}
            aria-pressed={listening}
            aria-label={listening ? "Stop voice search" : "Search by voice"}
            title={listening ? "Stop voice search" : "Search by voice"}
            className={cn(
              "grid size-[38px] flex-none cursor-pointer place-items-center rounded-full border text-hero-muted transition-[border-color,color,background-color,transform] duration-200 hover:border-accent hover:text-accent active:scale-95",
              listening ? "border-accent bg-accent-soft text-accent motion-safe:animate-pulse" : "border-hero-line",
            )}
          >
            <Icon name="mic" className="size-[18px]" />
          </button>
        )}
        <button
          type="submit"
          aria-label="Search"
          title="Search"
          className="grid size-12 flex-none cursor-pointer place-items-center rounded-full bg-accent-fill text-on-accent shadow-[0_6px_16px_-6px_rgba(160,54,31,0.6)] transition-[background-color,transform] duration-200 hover:bg-accent-hover active:scale-95"
        >
          <Icon name="arrowRight" className="size-5 [stroke-width:2.25]" />
        </button>
      </div>

      <ul
        id={`${id}-list`}
        role="listbox"
        aria-label="Search results"
        hidden={!open}
        className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-[min(360px,55svh)] overflow-auto overscroll-contain rounded-panel border border-border-content bg-surface-content p-1.5 text-left shadow-lift animate-drop"
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
