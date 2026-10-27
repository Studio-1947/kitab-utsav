import Image from "next/image";
import Link from "next/link";
import { EVENT } from "@/data/event";
import { Icon } from "@/components/ui/Icon";

const colTitle = "mb-1 border-b border-footer-ink/20 pb-3 text-eyebrow uppercase text-gold";
const colLink = "no-underline [overflow-wrap:anywhere] hover:text-gold";

/* Footer is always footer-bg with footer-ink and gold highlights, in both themes. */
export function Footer() {
  return (
    <footer className="bg-footer-bg pb-6 pt-10 text-footer-ink md:pt-18">
      <div className="wrap grid gap-8 md:grid-cols-3 xl:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-3.5 md:col-span-3 xl:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/brand/rkp-logo-text-only-white.svg" alt="Rajkamal Prakashan" width={827} height={378} unoptimized className="h-auto w-[120px]" />
            <span className="border-l border-footer-ink/30 pl-3 text-[1.4rem] font-semibold leading-none text-gold">{EVENT.nameHi}</span>
          </div>
          <p className="max-w-[36ch] text-[0.9rem] opacity-90">Readings · Conversations · Discussions · Book launches · Book exhibition</p>
          <a href={`mailto:${EVENT.email}`} className={`${colLink} text-[0.9rem]`}>{EVENT.email}</a>
          <div className="flex gap-2">
            <a href={EVENT.instagram.href} target="_blank" rel="noopener" aria-label={`Instagram ${EVENT.instagram.handle}`} className="grid size-[38px] place-items-center rounded-full border-[1.5px] border-footer-ink transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-footer-bg">
              <Icon name="instagram" className="size-[17px]" />
            </a>
            <a href={EVENT.facebook.href} target="_blank" rel="noopener" aria-label={`Facebook ${EVENT.facebook.handle}`} className="grid size-[38px] place-items-center rounded-full border-[1.5px] border-footer-ink transition-colors duration-200 hover:border-gold hover:bg-gold hover:text-footer-bg">
              <Icon name="facebook" className="size-[17px]" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[0.9rem]">
          <h3 className={colTitle}>Kitab Utsav</h3>
          <Link href="/about" className={colLink}>About</Link>
          <Link href="/festivals" className={colLink}>Festivals</Link>
          <Link href="/events" className={colLink}>Events</Link>
          <Link href="/visit" className={colLink}>Visit</Link>
          <Link href="/#faq" className={colLink}>FAQ</Link>
        </div>

        <div className="flex flex-col gap-2 text-[0.9rem]">
          <h3 className={colTitle}>Get Involved</h3>
          <a href={EVENT.calendarUrl} download className={colLink}>Add to calendar</a>
          <a href={`mailto:${EVENT.email}?subject=${encodeURIComponent("Invite Kitab Utsav to our city")}`} className={colLink}>Invite Kitab Utsav</a>
          <a href={EVENT.shopUrl} target="_blank" rel="noopener" className={colLink}>By {EVENT.hostGroup} ↗</a>
        </div>
      </div>

      <div className="wrap mt-10 flex flex-wrap justify-between gap-2 border-t border-footer-ink/20 pt-4.5 text-meta opacity-85">
        <span>Kitab Utsav, an initiative by {EVENT.host}. © {EVENT.year}</span>
        <span>
          Designed by {" "}
          <a href="https://www.1947.io" target="_blank" rel="noopener" className="font-semibold text-gold underline-offset-4 transition-colors hover:text-footer-ink hover:underline">
            Studio 1947
          </a>
        </span>
      </div>
    </footer>
  );
}
