"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { groupLabel, photoAlt, type GalleryPhoto } from "@/lib/gallery";
import { Icon } from "@/components/ui/Icon";
import { Lightbox } from "./Lightbox";

const SPEED = 45; // px per second for the continuous glide
const NUDGE_MS = 550; // arrow-button slide duration

/*
  Row of photos. Arrows slide one photo either way, drag/swipe moves it, tapping opens the viewer.
  With `autoplay`, the row glides continuously and loops seamlessly (the list is rendered twice).
  It holds still on mouse hover, keyboard focus, while the viewer is open,
  off screen, and for reduced motion.
*/
export function PhotoCarousel({ photos, label, autoplay = false }: { photos: GalleryPhoto[]; label: string; autoplay?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const pos = useRef(0); // current offset in px
  const nudge = useRef<{ from: number; to: number; start: number } | null>(null);
  const drag = useRef<{ x: number; pos: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  const [open, setOpen] = useState<number | null>(null);
  const [held, setHeld] = useState(false); // hover or focus
  const [inView, setInView] = useState(false);
  const reduceMotion = useReducedMotion();

  const gliding = autoplay && !reduceMotion && !held && open === null;
  const glidingRef = useRef(gliding);
  useEffect(() => {
    glidingRef.current = gliding;
  }, [gliding]);

  // Width of one copy of the list (the loop length).
  const loopWidth = () => {
    const el = track.current;
    if (!el) return 0;
    const second = el.children[photos.length] as HTMLElement | undefined;
    return second ? second.offsetLeft - (el.children[0] as HTMLElement).offsetLeft : el.scrollWidth;
  };

  // Looping strips wrap around; plain strips stop at either end.
  const maxPos = () => {
    const el = track.current;
    const box = el?.parentElement;
    if (!el || !box) return 0;
    const pad = parseFloat(getComputedStyle(box).paddingLeft) || 0;
    return Math.max(0, el.scrollWidth + pad * 2 - box.clientWidth);
  };
  const wrap = (x: number) => {
    if (!autoplay) return Math.min(Math.max(x, 0), maxPos());
    const w = loopWidth();
    return w ? ((x % w) + w) % w : x;
  };

  const paint = () => {
    if (track.current) track.current.style.transform = `translate3d(${-pos.current}px,0,0)`;
  };

  // Slide one photo forward or back.
  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const base = items[0].offsetLeft;
    const at = pos.current;
    const offsets = items.map((li) => li.offsetLeft - base);
    let to = dir === 1 ? offsets.find((o) => o > at + 2) ?? at : [...offsets].reverse().find((o) => o < at - 2) ?? at - (offsets[1] ?? 300);
    if (dir === -1 && at < 2) to = -(offsets[1] ?? 300);
    if (!autoplay) {
      const max = maxPos();
      if (dir === 1 && at >= max - 2) to = 0;
      else if (dir === -1 && at < 2) to = max;
      else to = Math.min(Math.max(to, 0), max);
    }
    if (reduceMotion) {
      pos.current = wrap(to);
      paint();
      return;
    }
    nudge.current = { from: at, to, start: performance.now() };
  };

  // On screen?
  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // Animation loop: arrow slides, then the steady glide.
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const n = nudge.current;
      if (n) {
        const t = Math.min((now - n.start) / NUDGE_MS, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        pos.current = n.from + (n.to - n.from) * ease;
        if (t === 1) {
          nudge.current = null;
          pos.current = wrap(pos.current);
        }
        paint();
      } else if (glidingRef.current && !drag.current && !document.hidden) {
        pos.current = wrap(pos.current + SPEED * dt);
        paint();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    nudge.current = null;
    drag.current = { x: e.clientX, pos: pos.current, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 6 && !d.moved) {
      d.moved = true;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    if (d.moved) {
      pos.current = wrap(d.pos - dx);
      paint();
    }
  };
  const onPointerUp = () => {
    suppressClick.current = !!drag.current?.moved;
    drag.current = null;
  };

  const button =
    "grid size-11 place-items-center rounded-pill border border-border bg-surface-content text-ink-content shadow-card transition-[background-color,border-color,transform] duration-200 hover:border-accent hover:text-accent active:scale-95";

  const loop = autoplay ? [...photos, ...photos] : photos;

  return (
    <div
      ref={root}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={(e) => e.target.matches(":focus-visible") && setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setHeld(false)}
    >
      <div className="-mx-4 overflow-hidden px-4 md:mx-0 md:px-0">
        <ul
          ref={track}
          aria-label={label}
          className="flex cursor-grab touch-pan-y select-none gap-2.5 pb-2 will-change-transform active:cursor-grabbing md:gap-3.5"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
        >
          {loop.map((p, i) => {
            const copy = i >= photos.length;
            return (
              <li key={`${p.src}-${copy ? 1 : 0}`} className="flex-none" aria-hidden={copy || undefined}>
                <button
                  type="button"
                  tabIndex={copy ? -1 : undefined}
                  onClick={() => setOpen(i % photos.length)}
                  aria-label={`Open photo: ${photoAlt(p)}`}
                  className="group relative block h-[240px] cursor-zoom-in overflow-hidden rounded-card border border-border-content shadow-card focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent md:h-[300px]"
                  style={{ backgroundColor: p.color, aspectRatio: `${Math.min(Math.max(p.w / p.h, 0.75), 1.5)}` }}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    draggable={false}
                    sizes="(max-width: 767px) 360px, 450px"
                    className="pointer-events-none object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(transparent,rgba(20,8,5,0.8))] px-3 pb-2.5 pt-8 text-left text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-gold">
                    {groupLabel(p.edition)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={button}>
          <Icon name="arrowLeft" className="size-5" />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next photo" className={button}>
          <Icon name="arrowRight" className="size-5" />
        </button>
      </div>

      {open !== null && <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </div>
  );
}
