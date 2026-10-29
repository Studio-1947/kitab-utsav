import Image from "next/image";
import { EVENT } from "@/data/event";
import { GALLERY } from "@/data/gallery";
import { buildSearchIndex } from "@/lib/search";
import { HeroSearch } from "@/components/hero/HeroSearch";
import { Slab } from "@/components/hero/Slab";
import { Typewriter } from "@/components/hero/Typewriter";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { EventStatusText } from "@/components/sections/EventStatus";
import { Reveal } from "@/components/ui/Reveal";

const photo = (src: string) => GALLERY.find((item) => item.src === src);

const BUBBLE_LINES = [
  { text: "Mai Hu Aapka Kitab Dost", lang: "hi-Latn" },
  { text: "साथ जुड़ें, साथ पढ़ें", lang: "hi", center: true },
];

const glass =
  "border border-[rgba(160,54,31,0.22)] bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(250,222,208,0.42))] backdrop-blur-xl backdrop-saturate-150 dark:border-white/25 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.2),rgba(255,255,255,0.06))]";

function SpeechBubble() {
  return (
    <span className="absolute left-[77%] top-[16%] text-[clamp(0.72rem,1vw,0.92rem)]">
      <span className="sr-only">Mai Hu Aapka Kitab Dost. साथ जुड़ें, साथ पढ़ें</span>
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


/* Phone speech bubble: sits left of Kitab Dost, grows as the line types, tail points at the mascot */
function PhoneBubble() {
  return (
    <span className="absolute left-4 top-[30px] z-10 text-[0.95rem]">
      <span className="sr-only">Mai Hu Aapka Kitab Dost. साथ जुड़ें, साथ पढ़ें</span>
      <span aria-hidden="true" className="relative block w-max max-w-[44vw] rounded-[18px] border border-white/15 bg-[#3a2a25] px-4 py-2.5 font-semibold leading-snug text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <Typewriter lines={BUBBLE_LINES} fit />
        <span className="absolute -bottom-[7px] right-[22%] size-3.5 rotate-45 border-b border-r border-white/15 bg-[#3a2a25]" />
      </span>
    </span>
  );
}

/* Phone hero, after the app design: mascot with bubble, search pill, then a swipe row of slabs */
function PhoneHero({ items }: { items: ReturnType<typeof buildSearchIndex> }) {
  return (
    <div className="relative md:hidden">
      <span aria-hidden="true" className="pointer-events-none absolute left-[58%] top-0 size-[380px] -translate-x-1/2 -translate-y-[18%] rounded-full bg-[radial-gradient(circle,rgba(203,35,35,0.28),transparent_62%)]" />

      <div className="relative h-[258px] pt-3">
        <PhoneBubble />
        <div className="relative mx-auto w-[148px] translate-x-[34px] motion-safe:animate-float">
          <Image
            src="/hero/kitabdost.png"
            alt="Kitab Dost, the Kitab Utsav mascot, greeting you with folded hands and a bag of books"
            width={852}
            height={1400}
            priority
            unoptimized
            className="h-auto w-full select-none"
            draggable={false}
          />
        </div>
      </div>

      <div className="relative z-20 px-4">
        <HeroSearch items={items} />
      </div>

      <div className="relative mt-3">
        <HeroCarousel>
          <Slab
            side="left"
            photo={photo("/gallery/bareilly-2026-002.webp")}
            eyebrow={<EventStatusText fallback="Next Kitab Utsav" />}
            title={`${EVENT.city} · ${EVENT.dateShort.replace(" to ", "–").replace("October", "Oct")}`}
            href="/events"
            sizes={PHONE}
            preload
          />
          <Slab side="right" photo={photo("/gallery/bareilly-2026-019.webp")} eyebrow="Programme" title="Day by day" href="/events" sizes={PHONE} />
          <Slab side="left" photo={photo("/gallery/bareilly-2025-219.webp")} eyebrow="Gallery" title={`${GALLERY.length} photos`} href="/gallery" sizes={PHONE} />
          <Slab side="right" photo={photo("/gallery/mumbai-2026-191.webp")} eyebrow={EVENT.venueShort.split(",")[0]} title="Book my seat" href="/#book" sizes={PHONE} />
        </HeroCarousel>
      </div>
    </div>
  );
}

const PHONE = "62vw";
const OUTER = "(max-width: 767px) 45vw, 22vw";
const INNER = "(max-width: 767px) 45vw, 17vw";

export function Hero() {
  const items = buildSearchIndex();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-page-warm pb-12 pt-8 max-md:bg-[#1b0e0a] max-md:pb-6 max-md:pt-0 md:pb-16 md:pt-12 lg:flex lg:min-h-[calc(100svh-77px)] lg:flex-col lg:justify-center lg:pb-6 xl:min-h-[calc(100svh-89px)]">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[38%] size-[620px] max-md:hidden -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(203,35,35,0.16),transparent_65%)]" />

      <h1 id="hero-title" className="sr-only">
        {EVENT.name} {EVENT.city}, {EVENT.dateLabel}, {EVENT.venueShort}
      </h1>

      <PhoneHero items={items} />

      <div className="relative px-4 max-md:hidden">
        <Reveal y={14}>
          <HeroSearch items={items} />
        </Reveal>
      </div>

      <div className="relative mx-auto mt-6 grid hero-fit w-full grid-cols-2 items-end gap-3 px-4 max-md:hidden md:mt-10 md:grid-cols-[1.32fr_1fr_1.15fr_1fr_1.32fr] md:gap-[1.4%] md:px-5">
        <div className="relative z-10 col-span-2 mx-auto -mb-2 w-[42%] max-w-[210px] md:order-3 md:mb-0 md:col-span-1 md:w-full md:max-w-none md:pb-[2%]">
          <Reveal y={30} delay={0.15}>
            <div className="relative motion-safe:animate-float">
              <Image
                src="/hero/kitabdost.png"
                alt="Kitab Dost, the Kitab Utsav mascot, greeting you with folded hands and a bag of books"
                width={852}
                height={1400}
                loading="lazy"
                unoptimized
                className="h-auto w-full select-none"
                draggable={false}
              />
              <SpeechBubble />
            </div>
          </Reveal>
        </div>

        <Reveal className="order-2 md:order-1" delay={0.05} y={40}>
          <Slab
            side="left"
            photo={{ src: "/newcontainerimg.jpg", alt: "Kitab Teras, 11 to 22 October" }}
            eyebrow="किताब टेरेस"
            title="11–22 अक्टूबर"
            href={EVENT.shopUrl}
            back={{
              text: "किताबों, पाठकों और बातचीत के साथ किताब टेरेस में आपका स्वागत है।",
              details: [{ icon: "calendar", text: "11 से 22 अक्टूबर" }],
              cta: "पुस्तकें देखें",
            }}
            sizes={OUTER}
            preload
          />
        </Reveal>

        <Reveal className="order-3 md:order-2" delay={0.12} y={40}>
          <Slab
            side="left"
            photo={{ src: "/newbook.jpg", alt: "कोई एक सौदा कार्यक्रम का पोस्टर" }}
            eyebrow="बातचीत"
            title="कोई एक सौदा"
            href="/events"
            back={{
              text: "नेहा दीक्षित की बहुचर्चित किताब ‘कोई एक सौदा’ पर बातचीत। लेखक-पत्रकार नेहा दीक्षित से बातचीत करेंगे लेखक-पत्रकार पुष्यमित्र।",
              details: [
                { icon: "calendar", text: "सोमवार, 21 सितम्बर 2026 · 5:00–6:30 pm" },
                { icon: "pin", text: "राजकमल प्रकाशन, पटना" },
              ],
              cta: "कार्यक्रम देखें",
            }}
            sizes={INNER}
          />
        </Reveal>

        <Reveal className="order-4 hidden md:order-4 md:block" delay={0.12} y={40}>
          <Slab
            side="right"
            photo={{ src: "/gangster.jpg", alt: "मेरी माँ मेरी गैंगस्टर कार्यक्रम का पोस्टर" }}
            eyebrow="लोकार्पण • बातचीत"
            title="मेरी माँ मेरी गैंगस्टर"
            href="/events"
            back={{
              text: "अरुंधति रॉय की किताब ‘मदर मेरी कम्स टू मी’ के हिन्दी संस्करण ‘मेरी माँ मेरी गैंगस्टर’ का लोकार्पण और बातचीत। इसका हिन्दी अनुवाद प्रभात मिलिंद ने किया है।",
              details: [
                { icon: "calendar", text: "शनिवार, 18 जुलाई 2026 · 6:00–7:30 pm" },
                { icon: "pin", text: "पटना, बिहार" },
              ],
              cta: "कार्यक्रम देखें",
            }}
            sizes={INNER}
          />
        </Reveal>

        <Reveal className="order-5 hidden md:order-5 md:block" delay={0.05} y={40}>
          <Slab
            side="right"
            photo={photo("/gallery/mumbai-2026-191.webp")}
            eyebrow={EVENT.venueShort.split(",")[0]}
            title="Book my seat"
            href="/#book"
            back={{
              text: "Tell us which days you plan to come and we'll keep you posted on speakers and sessions.",
              details: [
                { icon: "ticketCheck", text: "Pick one day or all five" },
                { icon: "chat", text: "Updates before your days" },
                { icon: "pin", text: EVENT.venueShort },
              ],
              cta: "Save my seat",
            }}
            sizes={OUTER}
          />
        </Reveal>
      </div>
    </section>
  );
}
