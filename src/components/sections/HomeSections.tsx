import Link from "next/link";
import { AUTHORS, EDITIONS, EDITION_NUMBERS, EVENT, FEATURES, JOURNEY, SPEAKERS } from "@/data/event";
import { AuthorCard, AuthorTile } from "@/components/ui/AuthorCard";
import { EditionCard } from "@/components/ui/EditionCard";
import { Icon } from "@/components/ui/Icon";
import { MoreLink } from "@/components/ui/MoreLink";
import { SectionHead } from "@/components/ui/SectionHead";
import { CITY_PHOTOS } from "@/data/cities";
import { MAP_CITIES } from "@/data/journey-map";
import { JourneyMap, type JourneyCity, type JourneyVisit } from "@/components/journey/JourneyMap";
import { cn } from "@/lib/utils";
import { DayCards } from "./DayCards";
import { Reveal } from "@/components/ui/Reveal";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { highlights, photosFor } from "@/lib/gallery";

const section = "py-12 md:py-18";

export function DayByDay() {
  return (
    <section aria-labelledby="days-title" className={section}>
      <div className="wrap">
        <Reveal><SectionHead id="days-title" eyebrow={`Five days in ${EVENT.city}`} title="Day-by-day Events" aside={<MoreLink href="/events">Events</MoreLink>} /></Reveal>
        <Reveal delay={0.08}><DayCards /></Reveal>
      </div>
    </section>
  );
}

export function Speakers() {
  return (
    <section aria-labelledby="speakers-title" className={cn(section, "bg-page-warm")}>
      <div className="wrap">
        <Reveal><SectionHead id="speakers-title" eyebrow={`Meet them in ${EVENT.city}`} title="Speakers Announced So Far" aside={<MoreLink href="/events">Events</MoreLink>} /></Reveal>
        <div className="grid gap-3.5 lg:grid-cols-3">
          {SPEAKERS.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.07} className="h-full"><AuthorCard author={a} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Writers() {
  return (
    <section aria-labelledby="writers-title" className={section}>
      <div className="wrap">
        <Reveal><SectionHead
          id="writers-title"
          eyebrow="At Kitab Utsav so far"
          title="Writers, Poets and Artists Who've Been Here"
          aside={<MoreLink href="/authors">All authors</MoreLink>}
        /></Reveal>
        <Reveal delay={0.04}><p className="-mt-3 mb-6 max-w-[60ch] text-body text-ink-muted">Selected writers who have joined Kitab Utsav across cities and editions.</p></Reveal>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AUTHORS.map((a, i) => (
            <Reveal key={a.name} delay={(i % 4) * 0.05} className="h-full"><AuthorTile author={a} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section aria-labelledby="features-title" className={cn(section, "bg-page-warm")}>
      <div className="wrap">
        <Reveal><SectionHead id="features-title" eyebrow="What happens at the festival" title="A Festival of Conversation, Built Around Books" /></Reveal>
        <Reveal delay={0.04}><p className="-mt-3 mb-6 max-w-[64ch] text-body text-ink-muted">
          At Kitab Utsav readers do more than buy books: they meet the people who write them. Sessions run from morning to night, with the exhibition open alongside.
        </p></Reveal>
        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.07} className="h-full"><div className="flex h-full gap-4 rounded-panel border border-border-content bg-surface-content p-5 transition-[border-color,box-shadow,transform] duration-300 hover:border-accent hover:shadow-card-hover motion-safe:hover:-translate-y-1">
              <span className="grid size-11 flex-none place-items-center rounded-card bg-accent-soft text-accent">
                <Icon name={f.icon} className="size-5" />
              </span>
              <div>
                <h3 className="text-card-heading text-ink-content">{f.title}</h3>
                <p className="mt-1 text-[0.92rem] leading-[1.55] text-ink-muted">{f.text}</p>
              </div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Moments() {
  return (
    <section aria-labelledby="moments-title" className={cn(section, "bg-footer-bg text-footer-ink")}>
      <div className="wrap">
        <Reveal><div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <p className="text-eyebrow uppercase text-gold">Festival moments</p>
            <h2 id="moments-title" className="mt-1.5 text-balance text-section-title">Kitab Utsav in Pictures</h2>
          </div>
          <Link href="/gallery" className="whitespace-nowrap text-[0.92rem] font-semibold text-gold no-underline hover:underline hover:underline-offset-[3px]">
            All photos →
          </Link>
        </div></Reveal>
        <Reveal delay={0.06}><PhotoCarousel photos={highlights(3)} label="Photos from recent editions" autoplay /></Reveal>
      </div>
    </section>
  );
}

/* Pin labels that sit left of the pin, where a neighbour is close on the right */
const LABEL_LEFT = new Set(["Indore", "Banaras"]);

/* One entry per city: map position, latest photo, and every visit (journey stops + editions on record). */
function journeyCities(): JourneyCity[] {
  return MAP_CITIES.map((m) => {
    const stops = JOURNEY.filter((j) => j.city === m.city);
    const visits: (JourneyVisit & { year: number })[] = stops.map((j) => {
      const e = EDITIONS.find((ed) => ed.slug === j.slug);
      return { label: j.when, dates: e?.dates, venue: e?.venue, slug: j.slug, year: e?.year ?? 0, photos: j.slug ? photosFor(j.slug).length : 0 };
    });
    for (const e of EDITIONS) {
      if (e.city === m.city && !stops.some((s) => s.slug === e.slug)) {
        visits.push({ label: String(e.year), dates: e.dates, venue: e.venue, slug: e.slug, year: e.year, photos: photosFor(e.slug).length });
      }
    }
    visits.sort((a, b) => a.year - b.year);
    const lastStop = stops[stops.length - 1];
    return {
      ...m,
      photo: CITY_PHOTOS[lastStop.photo],
      visits: visits.map((v) => ({ label: v.label, dates: v.dates, venue: v.venue, slug: v.slug, photos: v.photos })),
      current: m.city === EVENT.city,
      labelLeft: LABEL_LEFT.has(m.city),
    };
  });
}

export function Journey() {
  return (
    <section aria-labelledby="journey-title" className={section}>
      <div className="wrap">
        <Reveal><SectionHead id="journey-title" eyebrow="City by city" title={`The Journey from Bhopal to ${EVENT.city}`} aside={<MoreLink href="/festivals">All editions</MoreLink>} /></Reveal>
        <Reveal delay={0.04}><p className="-mt-3 mb-6 max-w-[60ch] text-body text-ink-muted">
          Kitab Utsav began in Bhopal in the 75th year of Rajkamal Prakashan. Since then it has travelled to Hindi-reading cities large and small.
        </p></Reveal>
        <Reveal delay={0.08}><JourneyMap cities={journeyCities()} route={JOURNEY.map((j) => j.city)} /></Reveal>
      </div>
    </section>
  );
}

export function Numbers() {
  return (
    <section aria-labelledby="numbers-title" className={cn(section, "bg-page-warm")}>
      <div className="wrap">
        <Reveal><SectionHead id="numbers-title" eyebrow={EDITION_NUMBERS.label} title={EDITION_NUMBERS.title} /></Reveal>
        <Reveal delay={0.08}><dl className="grid grid-cols-2 overflow-hidden rounded-panel bg-footer-bg text-footer-ink lg:grid-cols-4">
          {EDITION_NUMBERS.stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col-reverse items-center gap-1 px-4 py-7 text-center md:py-9",
                i % 2 === 1 && "border-l border-footer-ink/15",
                i >= 2 && "border-t border-footer-ink/15 lg:border-t-0",
                i === 2 && "lg:border-l",
              )}
            >
              <dt className="text-[0.92rem] opacity-90">{s.label}</dt>
              <dd className="text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tabular-nums text-gold">{s.value}</dd>
            </div>
          ))}
        </dl></Reveal>
      </div>
    </section>
  );
}

export function RecentEditions() {
  return (
    <section aria-labelledby="editions-title" className={section}>
      <div className="wrap">
        <Reveal><SectionHead id="editions-title" eyebrow="Festivals" title="Recent Editions" aside={<MoreLink href="/festivals">All editions</MoreLink>} /></Reveal>
        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {EDITIONS.slice(0, 6).map((e, i) => (
            <Reveal key={e.slug} delay={(i % 3) * 0.07} className="h-full"><EditionCard edition={e} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Follow() {
  return (
    <section aria-labelledby="follow-title" className="pb-12 md:pb-18">
      <div className="wrap">
        <Reveal><div className="flex flex-col gap-5 rounded-hero bg-footer-bg px-6 py-8 text-footer-ink shadow-lift transition-transform duration-500 motion-safe:hover:-translate-y-1 md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
          <div>
            <h2 id="follow-title" className="text-section-title">Follow Kitab Utsav</h2>
            <p className="mt-1.5 text-[0.95rem] opacity-90">
              Announcements, speaker lists and festival moments, first. <span className="font-semibold text-gold">{EVENT.hashtag}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a href={EVENT.instagram.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-gold bg-gold px-4 py-2.5 text-button text-footer-bg no-underline transition-transform duration-150 active:scale-[0.97]">
              <Icon name="instagram" className="size-4" /> {EVENT.instagram.handle}
            </a>
            <a href={EVENT.facebook.href} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-footer-ink px-4 py-2.5 text-button text-footer-ink no-underline transition-colors duration-200 hover:border-gold hover:text-gold">
              <Icon name="facebook" className="size-4" /> {EVENT.facebook.handle}
            </a>
          </div>
        </div></Reveal>
      </div>
    </section>
  );
}
