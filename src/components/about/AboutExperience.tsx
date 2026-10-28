"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { EVENT, JOURNEY_STATS } from "@/data/event";
import { focusOf } from "@/data/gallery-focus";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const CHAPTERS = [
  {
    year: "2021",
    city: "Bhopal",
    title: "A festival begins with a conversation",
    text: "Kitab Utsav began in Bhopal, in Rajkamal Prakashan’s 75th year, with one clear invitation: bring writers and readers into the same room.",
    image: "/gallery/bhopal-2025-301.webp",
    alt: "A writer speaking at Kitab Utsav in Bhopal",
  },
  {
    year: "2022",
    city: "Patna",
    title: "The conversation travels",
    text: "From Bhopal and Banaras to a nine-day Patna edition, the festival started finding its rhythm: books on display, sessions all day, and readers staying for one more conversation.",
    image: "/gallery/patna-2026-150.webp",
    alt: "Audience members at a Kitab Utsav session in Patna",
  },
  {
    year: "2026",
    city: "Bareilly",
    title: "A growing community, city by city",
    text: "Five years on, Kitab Utsav has carried that same energy across India — returning to cities, meeting new readers, and making room for the next story.",
    image: "/gallery/bareilly-2026-004.webp",
    alt: "Two writers in conversation at Kitab Utsav Bareilly",
  },
] as const;

const MOMENTS: { title: string; eyebrow: string; text: string; icon: IconName; image: string; alt: string }[] = [
  {
    title: "Listen",
    eyebrow: "Readings & performances",
    text: "Fiction, poetry, prose and performance — heard in the voices that make them live on the page.",
    icon: "bookOpen",
    image: "/gallery/bareilly-2026-028.webp",
    alt: "A reader on stage at Kitab Utsav",
  },
  {
    title: "Meet",
    eyebrow: "Conversations & questions",
    text: "Writers, critics and readers stay with the questions a little longer, with room for a real exchange.",
    icon: "chat",
    image: "/gallery/mumbai-2026-195.webp",
    alt: "A conversation on stage at Kitab Utsav Mumbai",
  },
  {
    title: "Discover",
    eyebrow: "Books & new ideas",
    text: "New releases, old favourites and an exhibition from Rajkamal, Radhakrishna, Lokbharti and Rajkamal Urdu.",
    icon: "library",
    image: "/gallery/bareilly-2026-015.webp",
    alt: "Visitors browsing books at Kitab Utsav",
  },
];

const rise = { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] as const };

export function AboutExperience() {
  const [chapter, setChapter] = useState(0);
  const [moment, setMoment] = useState(0);
  const chapterTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const momentTabs = useRef<(HTMLButtonElement | null)[]>([]);
  const chapterId = useId();
  const momentId = useId();
  const reducedMotion = useReducedMotion();
  const activeChapter = CHAPTERS[chapter];
  const activeMoment = MOMENTS[moment];

  const move = (event: KeyboardEvent<HTMLDivElement>, current: number, total: number, select: (next: number) => void, tabs: RefObject<(HTMLButtonElement | null)[]>) => {
    const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (current + 1) % total
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (current - 1 + total) % total
      : event.key === "Home" ? 0
      : event.key === "End" ? total - 1
      : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabs.current[next]?.focus();
  };

  return (
    <main className="overflow-hidden">
      <section className="wrap py-10 md:py-14">
        <div className="grid items-center gap-7 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -22 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={rise}
          >
            <p className="text-eyebrow uppercase text-accent">Saath judein, saath padhein</p>
            <h2 className="mt-2 max-w-[13ch] text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1.03] text-ink-content">Books become brighter when they are shared.</h2>
            <p className="mt-5 max-w-[56ch] text-[1.05rem] leading-[1.7] text-ink-muted">
              Kitab Utsav is a travelling festival of conversations between books, readers and writers. For five days at a time, a city turns into a place to listen, ask, discover and take a new book home.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {JOURNEY_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...rise, delay: index * 0.07 }}
                  className="rounded-card border border-border-content bg-surface-content px-3 py-3.5 shadow-card"
                >
                  <p className="text-[1.8rem] font-semibold leading-none tabular-nums text-accent">{stat.value}</p>
                  <p className="mt-1 text-[0.73rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: 22 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ ...rise, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[680px] py-4 sm:py-7"
          >
            <motion.figure whileHover={reducedMotion ? undefined : { y: -5 }} transition={rise} className="relative ml-auto aspect-[4/3] w-[82%] overflow-hidden rounded-hero bg-footer-bg shadow-lift">
              <Image src="/gallery/bareilly-2026-004.webp" alt="Writers in conversation at Kitab Utsav" fill sizes="(max-width: 1023px) 82vw, 530px" className="object-cover" style={{ objectPosition: focusOf("/gallery/bareilly-2026-004.webp") }} />
              <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(140deg,transparent_35%,rgba(33,9,6,0.45))]" />
              <figcaption className="absolute bottom-4 left-4 rounded-pill bg-footer-bg/80 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-gold backdrop-blur sm:bottom-5 sm:left-5">A room full of stories</figcaption>
            </motion.figure>
            <motion.figure whileHover={reducedMotion ? undefined : { y: 4 }} transition={rise} className="absolute bottom-0 left-0 aspect-square w-[42%] overflow-hidden rounded-card border-[5px] border-page-warm bg-surface-content shadow-card">
              <Image src="/gallery/mumbai-2026-191.webp" alt="A reader at Kitab Utsav Mumbai" fill sizes="(max-width: 1023px) 42vw, 270px" className="object-cover" style={{ objectPosition: focusOf("/gallery/mumbai-2026-191.webp") }} />
            </motion.figure>
            <span aria-hidden="true" className="absolute right-[5%] top-0 grid size-16 place-items-center rounded-full border-4 border-page-warm bg-gold text-[1.5rem] text-footer-bg shadow-card sm:size-20 sm:text-[1.8rem]">✦</span>
          </motion.div>
        </div>
      </section>

      <section className="bg-page-warm py-12 md:py-18">
        <div className="wrap grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="text-eyebrow uppercase text-accent">The journey</p>
            <h2 className="mt-2 text-section-title text-ink-content">One idea, many cities.</h2>
            <p className="mt-3 max-w-[48ch] text-body text-ink-muted">Choose a chapter to see how a small gathering grew into a travelling community of readers.</p>
            <div role="tablist" aria-label="Kitab Utsav story chapters" onKeyDown={(event) => move(event, chapter, CHAPTERS.length, setChapter, chapterTabs)} className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {CHAPTERS.map((item, index) => {
                const selected = index === chapter;
                return (
                  <button
                    key={item.year}
                    ref={(element) => { chapterTabs.current[index] = element; }}
                    id={`${chapterId}-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${chapterId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setChapter(index)}
                    className={cn("group flex min-w-[145px] cursor-pointer items-center gap-3 rounded-card border px-4 py-3 text-left transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98] lg:min-w-0", selected ? "border-accent-fill bg-accent-fill text-on-accent shadow-card" : "border-border-content bg-surface-content text-ink-content hover:-translate-y-0.5 hover:border-accent")}
                  >
                    <span className={cn("text-[1.3rem] font-semibold tabular-nums", selected ? "text-gold" : "text-accent")}>{item.year}</span>
                    <span className="text-[0.9rem] font-semibold">{item.city}</span>
                    <Icon name="arrowRight" className={cn("ml-auto size-4 transition-transform duration-300", selected && "translate-x-0.5")} />
                  </button>
                );
              })}
            </div>
          </div>

          <div id={`${chapterId}-panel`} role="tabpanel" aria-labelledby={`${chapterId}-tab-${chapter}`} className="min-h-[360px] overflow-hidden rounded-hero bg-footer-bg shadow-lift sm:min-h-[400px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article key={activeChapter.year} initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reducedMotion ? undefined : { opacity: 0, y: -12 }} transition={rise} className="relative flex min-h-[360px] flex-col justify-end overflow-hidden p-5 text-white sm:min-h-[400px] sm:p-7">
                <Image src={activeChapter.image} alt={activeChapter.alt} fill sizes="(max-width: 1023px) 100vw, 600px" className="object-cover" style={{ objectPosition: focusOf(activeChapter.image) }} />
                <span aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(27,8,5,0.08)_15%,rgba(27,8,5,0.86)_88%)]" />
                <div className="relative z-20">
                  <p className="text-eyebrow uppercase text-gold">{activeChapter.year} · {activeChapter.city}</p>
                  <h3 className="mt-2 max-w-[18ch] text-[clamp(1.7rem,3vw,2.5rem)] font-semibold leading-tight">{activeChapter.title}</h3>
                  <p className="mt-3 max-w-[56ch] text-[0.98rem] leading-[1.65] text-white/85">{activeChapter.text}</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="wrap py-12 md:py-18">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-eyebrow uppercase text-accent">A festival, in three moves</p>
          <h2 className="mt-2 text-section-title text-ink-content">Stay for what catches your attention.</h2>
          <p className="mt-3 text-body text-ink-muted">Every edition is built for both the familiar and the unexpected. Pick a moment to explore it.</p>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-8">
          <div role="tablist" aria-label="Festival moments" onKeyDown={(event) => move(event, moment, MOMENTS.length, setMoment, momentTabs)} className="flex flex-col gap-2.5">
            {MOMENTS.map((item, index) => {
              const selected = index === moment;
              return (
                <button
                  key={item.title}
                  ref={(element) => { momentTabs.current[index] = element; }}
                  id={`${momentId}-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${momentId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setMoment(index)}
                  className={cn("group flex cursor-pointer items-center gap-4 rounded-card border p-4 text-left transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.98]", selected ? "border-accent bg-accent-soft" : "border-border-content bg-surface-content hover:border-accent hover:shadow-card")}
                >
                  <span className={cn("grid size-11 place-items-center rounded-full transition-colors", selected ? "bg-accent-fill text-on-accent" : "bg-surface-soft text-accent")}><Icon name={item.icon} className="size-5" /></span>
                  <span><span className="block text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-accent">{item.eyebrow}</span><span className="block mt-0.5 text-[1.1rem] font-semibold text-ink-content">{item.title}</span></span>
                  <Icon name="arrowRight" className={cn("ml-auto size-4 text-accent transition-transform duration-300", selected && "translate-x-1")} />
                </button>
              );
            })}
          </div>

          <div id={`${momentId}-panel`} role="tabpanel" aria-labelledby={`${momentId}-tab-${moment}`} className="min-h-[340px] overflow-hidden rounded-hero bg-footer-bg shadow-lift">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article key={activeMoment.title} initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={reducedMotion ? undefined : { opacity: 0, scale: 1.015 }} transition={rise} className="relative flex min-h-[340px] flex-col justify-end overflow-hidden p-5 text-white sm:p-7">
                <Image src={activeMoment.image} alt={activeMoment.alt} fill sizes="(max-width: 1023px) 100vw, 650px" className="object-cover" style={{ objectPosition: focusOf(activeMoment.image) }} />
                <span aria-hidden="true" className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(26,8,5,0.02)_25%,rgba(26,8,5,0.87)_92%)]" />
                <div className="relative z-20">
                  <span className="mb-5 grid size-12 place-items-center rounded-full bg-gold text-footer-bg"><Icon name={activeMoment.icon} className="size-6" /></span>
                  <p className="text-eyebrow uppercase text-gold">{activeMoment.eyebrow}</p>
                  <h3 className="mt-2 text-[clamp(1.8rem,3.2vw,2.7rem)] font-semibold leading-none">{activeMoment.title}</h3>
                  <p className="mt-3 max-w-[52ch] text-[1rem] leading-[1.65] text-white/85">{activeMoment.text}</p>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="bg-footer-bg py-12 text-footer-ink md:py-18">
        <div className="wrap grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-eyebrow uppercase text-gold">Rajkamal Prakashan Samuh</p>
            <h2 className="mt-2 max-w-[17ch] text-[clamp(1.8rem,3.6vw,3rem)] font-semibold leading-tight">Stories have a home here.</h2>
            <p className="mt-4 max-w-[60ch] text-[1rem] leading-[1.7] text-footer-ink/80">Founded in 1947, Rajkamal Prakashan Samuh brings Rajkamal, Radhakrishna, Lokbharti and Rajkamal Urdu together under one publishing family.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link href="/festivals" className="inline-flex items-center gap-2 rounded-pill bg-gold px-5 py-3 text-button text-footer-bg no-underline transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]">Explore the editions <Icon name="arrowRight" className="size-4" /></Link>
            <a href={`mailto:${EVENT.email}`} className="inline-flex items-center gap-2 rounded-pill border border-footer-ink/30 px-5 py-3 text-button text-footer-ink no-underline transition-colors duration-200 hover:border-gold hover:text-gold">Bring it to your city <Icon name="arrowRight" className="size-4" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
