import type { Metadata } from "next";
import Link from "next/link";
import { EVENT, mapsDirectionsUrl, mapsEmbedUrl } from "@/data/event";
import { buttonClass } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Visit",
  description: `Plan your visit to Kitab Utsav ${EVENT.city}: ${EVENT.dateLabel}, ${EVENT.hours}, at ${EVENT.venue}.`,
};

function Row({ icon, label, children }: { icon: IconName; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <Icon name={icon} className="mt-0.5 text-accent" />
      <div>
        <dt className="text-label text-ink-muted">{label}</dt>
        <dd className="mt-0.5 text-[1.02rem] leading-normal text-ink-content">{children}</dd>
      </div>
    </div>
  );
}

const link = "font-medium text-accent underline underline-offset-[3px] hover:text-accent-hover";

export default function VisitPage() {
  return (
    <>
      <PageHero crumb="Visit" eyebrow={`${EVENT.city} · ${EVENT.dateLabel}`} title="Plan Your Visit" />

      <div className="wrap grid items-start gap-6 py-10 md:py-14 lg:grid-cols-[1.4fr_1fr]">
        <div className="overflow-hidden rounded-panel border-[1.5px] border-dashed border-border bg-cover-well">
          <iframe
            title={`Map: ${EVENT.venueShort}`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full border-0 lg:aspect-[16/11]"
          />
        </div>

        <aside className="rounded-panel border border-border-content bg-surface-content p-5 shadow-card md:p-7">
          <dl className="flex flex-col gap-5">
            <Row icon="calendar" label="Dates">{EVENT.dateLabel}</Row>
            <Row icon="clock" label="Time">{EVENT.hours}</Row>
            <Row icon="pin" label="Venue">{EVENT.venue}</Row>
            <Row icon="chat" label="Contact">
              {EVENT.phones.map((p, i) => (
                <span key={p.href}>
                  {i > 0 && ", "}
                  <a href={p.href} className={`${link} whitespace-nowrap tabular-nums`}>{p.label}</a>
                </span>
              ))}
              <br />
              <a href={`mailto:${EVENT.email}`} className={link}>{EVENT.email}</a>
            </Row>
          </dl>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a href={mapsDirectionsUrl} target="_blank" rel="noopener" className={buttonClass({ size: "lg" })}>
              <Icon name="pin" className="size-4" /> Get directions
            </a>
            <a href={EVENT.calendarUrl} download className={buttonClass({ variant: "outline", size: "lg" })}>
              <Icon name="calendarPlus" className="size-4" /> Add to calendar
            </a>
          </div>
        </aside>
      </div>

      <section aria-labelledby="know-title" className="wrap pb-14">
        <h2 id="know-title" className="mb-4 text-section-title text-ink-content">Good to Know</h2>
        <ul className="flex flex-col gap-2.5 text-[1.05rem] text-ink-content">
          {[
            <>The festival is open all five days from {EVENT.hoursShort}.</>,
            <>Session timings for each day are on the <Link href="/events" className={link}>programme</Link> page.</>,
            <>The book exhibition is open all day.</>,
            <>For the latest on entry and registration, follow <a href={EVENT.instagram.href} target="_blank" rel="noopener" className={link}>{EVENT.instagram.handle}</a>.</>,
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.65em] size-1.5 flex-none rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
