"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CityPhoto } from "@/data/cities";
import { MAP_SIZE } from "@/data/journey-map";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export type JourneyVisit = { label: string; dates?: string; venue?: string; slug?: string; photos: number };
export type JourneyCity = {
  city: string;
  cityHi: string;
  x: number;
  y: number;
  photo: CityPhoto;
  visits: JourneyVisit[];
  current: boolean;
  /** Label sits to the left of the pin (where a neighbour is close on the right) */
  labelLeft?: boolean;
};

/* The part of the map shown: north and central India, where the festival has been. */
const VIEW = { x: 100, y: 250, w: 1400, h: 1400 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/* Gentle arc between two stops, bowing to one side */
function arc(a: { x: number; y: number }, b: { x: number; y: number }, i: number) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const bend = (i % 2 ? 1 : -1) * 0.18;
  return `Q${mx - dy * bend} ${my + dx * bend} ${b.x} ${b.y}`;
}

export function JourneyMap({ cities, route }: { cities: JourneyCity[]; route: string[] }) {
  const [selected, setSelected] = useState(() => cities.find((c) => c.current)?.city ?? cities[0].city);
  const active = cities.find((c) => c.city === selected) ?? cities[0];
  const latest = [...active.visits].reverse().find((v) => v.slug);

  const stops = route.map((name) => cities.find((c) => c.city === name)!).filter(Boolean);
  const routePath = stops.reduce((d, s, i) => (i === 0 ? `M${s.x} ${s.y}` : `${d} ${arc(stops[i - 1], s, i)}`), "");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-8">
      {/* Map */}
      <div className="relative overflow-hidden rounded-hero border border-border-content bg-surface-content shadow-card">
        <div className="relative aspect-square [mask-image:radial-gradient(ellipse_at_center,#000_62%,transparent_100%)]">
          {/* Full-size map, shifted so the VIEW window fills the box */}
          <div
            className="absolute"
            style={{
              left: `-${pct(VIEW.x, VIEW.w)}`,
              top: `-${pct(VIEW.y, VIEW.h)}`,
              width: pct(MAP_SIZE.w, VIEW.w),
              height: pct(MAP_SIZE.h, VIEW.h),
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-ink-muted opacity-35 dark:opacity-30"
              style={{ maskImage: "url(/map.svg)", WebkitMaskImage: "url(/map.svg)", maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
            />

            {/* Route, in the order the festival travelled */}
            <svg aria-hidden="true" viewBox={`0 0 ${MAP_SIZE.w} ${MAP_SIZE.h}`} className="absolute inset-0 h-full w-full overflow-visible">
              <path d={routePath} fill="none" className="stroke-accent" strokeWidth={5} strokeLinecap="round" strokeDasharray="2 16" opacity={0.75}>
                <animate attributeName="stroke-dashoffset" from="0" to="-180" dur="6s" repeatCount="indefinite" />
              </path>
            </svg>

            {/* Pins */}
            {cities.map((c) => {
              const on = c.city === active.city;
              return (
                <button
                  key={c.city}
                  type="button"
                  onClick={() => setSelected(c.city)}
                  aria-pressed={on}
                  aria-label={`${c.city}: ${c.visits.length} ${c.visits.length === 1 ? "visit" : "visits"}`}
                  className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-3 focus-visible:outline-none md:p-2"
                  style={{ left: pct(c.x, MAP_SIZE.w), top: pct(c.y, MAP_SIZE.h) }}
                >
                  {(c.current || on) && <span aria-hidden="true" className={cn("absolute inset-0 m-auto size-5 rounded-full motion-safe:animate-ping", c.current ? "bg-gold" : "bg-accent", "opacity-60")} />}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative block rounded-full border-2 border-white shadow-[0_2px_8px_rgba(40,6,6,0.35)] transition-[transform,background-color] duration-300 group-hover:scale-125 group-focus-visible:ring-4 group-focus-visible:ring-accent/40",
                      on ? "size-4 bg-accent-fill" : c.current ? "size-3.5 bg-gold" : "size-3 bg-accent",
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap rounded-pill px-2 py-0.5 text-[0.7rem] font-semibold shadow-card transition-colors duration-200 md:text-[0.76rem]",
                      c.labelLeft ? "right-full -mr-1 md:mr-0.5" : "left-full -ml-1 md:ml-0.5",
                      on ? "bg-accent-fill text-on-accent" : "bg-surface-content/90 text-ink-content group-hover:text-accent",
                    )}
                  >
                    {c.city}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <p className="pointer-events-none absolute bottom-3 left-4 right-4 text-meta text-ink-muted">Tap a city to see its festivals</p>
      </div>

      {/* Details for the selected city */}
      <div className="flex flex-col gap-4">
        <article key={active.city} aria-live="polite" className="overflow-hidden rounded-panel border border-border-content bg-surface-content shadow-card animate-drop">
          <figure className="relative aspect-[16/9] bg-cover-well">
            <Image src={active.photo.src} alt={active.photo.alt} fill sizes="(max-width: 1023px) 100vw, 480px" className="object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(transparent_45%,rgba(20,8,5,0.75))]" />
            <div className="absolute inset-x-5 bottom-4 text-white">
              <p lang="hi" className="text-[0.95rem] font-medium text-gold">{active.cityHi}</p>
              <h3 className="text-[1.8rem] font-semibold leading-tight">{active.city}</h3>
            </div>
            <figcaption className="absolute right-2 top-2 rounded-pill bg-black/35 px-2 py-0.5 text-[0.6rem] text-white/85 backdrop-blur">
              <a href={active.photo.source} target="_blank" rel="noopener" className="text-inherit no-underline hover:underline">
                © {active.photo.author}
              </a>
              {" · "}
              <a href={active.photo.licenseUrl} target="_blank" rel="noopener license" className="text-inherit no-underline hover:underline">
                {active.photo.license}
              </a>
            </figcaption>
          </figure>

          <div className="p-4 sm:p-5">
            <p className="text-eyebrow uppercase text-accent">
              {active.visits.length} {active.visits.length === 1 ? "visit" : "visits"}
            </p>
            <ol className="mt-3 flex flex-col gap-3">
              {active.visits.map((v) => (
                <li key={v.label + (v.slug ?? "")} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1.5 size-2 flex-none rounded-full bg-accent" />
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-content">{v.dates ?? v.label}</p>
                    {v.venue && <p className="text-[0.88rem] leading-normal text-ink-muted">{v.venue}</p>}
                    {!v.slug && <p className="text-[0.88rem] text-ink-muted">Details soon</p>}
                  </div>
                </li>
              ))}
            </ol>

            {latest?.slug && (
              <div className="mt-5 flex flex-wrap gap-2 [&>a]:min-h-11 [&>a]:flex-1 md:[&>a]:min-h-0 md:[&>a]:flex-none">
                <Link href={`/festivals#${latest.slug}`} className={buttonClass()}>
                  Explore details
                </Link>
                {latest.photos > 0 && (
                  <Link href={`/gallery#${latest.slug}`} className={buttonClass({ variant: "outline" })}>
                    <Icon name="photo" className="size-4" /> {latest.photos} photos
                  </Link>
                )}
              </div>
            )}
          </div>
        </article>

        {/* All stops, in order: the keyboard- and list-friendly way to pick a city */}
        <ol aria-label="The journey, stop by stop" className="flex flex-wrap gap-2">
          {route.map((name, i) => (
            <li key={`${name}-${i}`}>
              <button
                type="button"
                onClick={() => setSelected(name)}
                aria-pressed={name === active.city}
                className="inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-pill border border-border bg-transparent px-3.5 py-1.5 text-[0.85rem] md:min-h-0 md:px-3 md:text-[0.82rem] font-medium text-ink-content transition-colors duration-150 hover:border-accent hover:text-accent aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent"
              >
                <span className="text-[0.7rem] tabular-nums text-ink-muted">{i + 1}</span>
                {name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
