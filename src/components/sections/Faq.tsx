import Image from "next/image";
import { EVENT, FAQS } from "@/data/event";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { FaqList } from "./FaqList";

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 bg-page-warm py-12 md:py-18">
      {/*
        Phones: heading, questions, then the help card.
        Desktop: heading and help card on the left (the card stays in view), questions on the right.
      */}
      <div className="wrap grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-7">
        <Reveal className="lg:col-start-1 lg:row-start-1">
          <p className="text-eyebrow uppercase text-accent">FAQ</p>
          <h2 id="faq-title" className="mt-2 text-balance text-[clamp(1.9rem,3.6vw,2.7rem)] font-semibold leading-[1.1] text-ink-content">
            Frequently Asked Questions
          </h2>
          <p lang="hi" className="mt-2 text-[1.1rem] text-ink-muted">
            आपके सवाल, हमारे जवाब
          </p>
        </Reveal>

        <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <FaqList faqs={FAQS} />
        </div>

        <Reveal className="self-start lg:sticky lg:top-28 lg:col-start-1 lg:row-start-2">
          <div className="relative overflow-hidden rounded-hero bg-footer-bg p-5 pr-[124px] sm:p-6 sm:pr-[132px] text-footer-ink shadow-card md:p-7 md:pr-[150px]">
            <span aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(242,182,90,0.28),transparent_70%)]" />
            <Image
              src="/hero/kitabdost.png"
              alt=""
              width={852}
              height={1400}
              sizes="130px"
              className="absolute -bottom-3 right-2 w-[104px] sm:right-3 sm:w-[112px] drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)] md:w-[128px]"
            />
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold">Kitab Dost</p>
            <p className="mt-1.5 text-[1.3rem] font-semibold leading-snug">Still curious?</p>
            <p className="mt-1 text-[0.9rem] leading-normal opacity-80">Write to the team or send us a message. We&apos;re happy to help.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={EVENT.instagram.href}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-10 items-center gap-1.5 rounded-pill bg-gold px-4 py-2 text-[0.82rem] font-semibold text-footer-bg no-underline transition-transform duration-200 hover:-translate-y-0.5"
              >
                <Icon name="instagram" className="size-4" /> Message us
              </a>
              <a
                href={EVENT.phones[0].href}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-pill border border-footer-ink/30 px-4 py-2 text-[0.82rem] font-semibold text-footer-ink no-underline transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                <Icon name="phone" className="size-4" /> Call
              </a>
            </div>
            <a href={`mailto:${EVENT.email}`} className="mt-3 inline-block break-all py-1 text-[0.82rem] text-footer-ink/75 underline-offset-[3px] hover:text-gold hover:underline">
              {EVENT.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
