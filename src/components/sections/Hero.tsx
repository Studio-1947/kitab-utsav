import Image from "next/image";
import { EVENT } from "@/data/event";
import { GALLERY } from "@/data/gallery";
import { buildSearchIndex } from "@/lib/search";
import { HeroSearch } from "@/components/hero/HeroSearch";
import { Slab } from "@/components/hero/Slab";
import { Typewriter } from "@/components/hero/Typewriter";
import { Reveal } from "@/components/ui/Reveal";
import { EventStatusText } from "./EventStatus";

const photo = (src: string) => GALLERY.find((p) => p.src === src);

/*
  Kitab Dost's speech bubble, in frosted glass. It sits up and to the right of the head,
  clear of the face. The zero-size anchor is the tail tip (77% across, 16% down the image),
  just off the top-right of the head, so the tail points down towards the mouth.
  The Henglish and Hindi lines are typed out in turn (Typewriter.tsx).
*/
const BUBBLE_LINES = [
  { text: "Mai Aapka Kitab Dost", lang: "hi-Latn" },
  { text: "मैं आपका किताब दोस्त", lang: "hi" },
];

const glass =
  "border border-[rgba(160,54,31,0.22)] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(250,222,208,0.42))] backdrop-blur-xl backdrop-saturate-150 dark:border-white/25 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))]";

function SpeechBubble() {
  return (
    <span className="absolute left-[77%] top-[16%] text-[clamp(0.72rem,1vw,0.92rem)]">
      <span className="sr-only">Mai Aapka Kitab Dost (मैं आपका किताब दोस्त)</span>
      {/* Tail: tip at the anchor, base tucked into the bubble's bottom-left corner */}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 size-[1.9em] bg-[linear-gradient(135deg,rgba(244,206,190,0.85),rgba(236,190,172,0.7))] backdrop-blur-xl [clip-path:polygon(0_100%,46%_8%,92%_54%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.1))]"
      />
      <span
        aria-hidden="true"
        className={`absolute bottom-[0.95em] left-[0.95em] w-max max-w-[7.6em] rounded-[1.25em] px-[1em] py-[0.6em] text-left font-semibold leading-snug text-hero-ink shadow-[0_10px_30px_rgba(122,58,29,0.2),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)] md:max-w-none md:whitespace-nowrap ${glass}`}
      >
        <Typewriter lines={BUBBLE_LINES} />
      </span>
    </span>
  );
}

const OUTER ="(max-width: 767px) 45vw, 22vw";
const INNER = "(max-width: 767px) 45vw, 17vw";

/*
  Hero: search pill, then four red slabs angled towards Kitab Dost, the festival mascot.
  Outer slabs are taller; every slab sits on the same baseline.
*/
export function Hero() {
  const items = buildSearchIndex();

  return (
    <section aria-labelledby="hero-title" className="relative -mt-[72px] overflow-hidden bg-page-warm pb-12 pt-[104px] md:-mt-20 md:pb-16 md:pt-[128px]">
      {/* Soft red glow behind the mascot */}
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] size-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(203,35,35,0.16),transparent_65%)]" />

      <h1 id="hero-title" className="sr-only">
        {EVENT.name} {EVENT.city}, {EVENT.dateLabel}, {EVENT.venueShort}
      </h1>

      <div className="relative px-4">
        <Reveal y={14}>
          <HeroSearch items={items} />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-8 grid max-w-[1440px] grid-cols-2 items-end gap-3 px-4 md:mt-10 md:grid-cols-[1.32fr_1fr_1.15fr_1fr_1.32fr] md:gap-[1.4%] md:px-5">
        {/* Kitab Dost: first on phones, centre column from tablet up */}
        <div className="relative z-10 col-span-2 mx-auto w-[46%] max-w-[230px] md:order-3 md:col-span-1 md:w-full md:max-w-none md:pb-[2%]">
          <Reveal y={30} delay={0.15}>
            <div className="relative motion-safe:animate-float">
              <Image
                src="/hero/kitabdost.png"
                alt="Kitab Dost, the Kitab Utsav mascot, greeting you with folded hands and a bag of books"
                width={852}
                height={1400}
                loading="lazy"
                unoptimized // served as the lossless PNG; the optimizer's re-compression softened it
                className="h-auto w-full select-none"
                draggable={false}
              />
              <SpeechBubble />
            </div>
          </Reveal>
        </div>

        <Reveal className="order-1 md:order-1" delay={0.05} y={40}>
          <Slab
            side="left"
            photo={photo("/gallery/bareilly-2026-002.webp")}
            eyebrow={<EventStatusText fallback="Next Kitab Utsav" />}
            title={`${EVENT.city} · ${EVENT.dateShort.replace(" to ", "–").replace("October", "Oct")}`}
            href="/events"
            sizes={OUTER}
            preload
          />
        </Reveal>
        <Reveal className="order-3 md:order-2" delay={0.12} y={40}>
          <Slab side="left" photo={photo("/gallery/bareilly-2026-019.webp")} eyebrow="Programme" title="Day by day" href="/events" sizes={INNER} />
        </Reveal>
        <Reveal className="order-4 md:order-4" delay={0.12} y={40}>
          <Slab side="right" photo={photo("/gallery/bareilly-2025-219.webp")} eyebrow="Gallery" title={`${GALLERY.length} photos`} href="/gallery" sizes={INNER} />
        </Reveal>
        <Reveal className="order-2 md:order-5" delay={0.05} y={40}>
          <Slab side="right" photo={photo("/gallery/mumbai-2026-191.webp")} eyebrow={EVENT.venueShort.split(",")[0]} title="Book my seat" href="/#book" sizes={OUTER} />
        </Reveal>
      </div>
    </section>
  );
}
