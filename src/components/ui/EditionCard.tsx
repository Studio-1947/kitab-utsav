import Image from "next/image";
import Link from "next/link";
import type { Edition } from "@/data/event";
import { coverFor, photoAlt, photosFor } from "@/lib/gallery";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { Skyline } from "./Skyline";

/* One edition of Kitab Utsav: cover photo (when there is one), status, city, dates, venue, with a faded year and skyline. */
export function EditionCard({ edition }: { edition: Edition }) {
  const cover = coverFor(edition.slug);
  const count = photosFor(edition.slug).length;

  return (
    <article
      id={edition.slug}
      className={cn(
        "group relative flex min-h-[220px] scroll-mt-24 flex-col overflow-hidden rounded-panel bg-surface-content text-ink-content shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:border-accent hover:shadow-card-hover motion-safe:hover:-translate-y-1",
        edition.upcoming ? "border-[1.5px] border-dashed border-accent" : "border border-border-content",
      )}
    >
      {cover && (
        <Link href={`/gallery#${edition.slug}`} className="relative block h-[180px] overflow-hidden" style={{ backgroundColor: cover.color }} tabIndex={-1} aria-hidden="true">
          <Image
            src={cover.src}
            alt={photoAlt(cover)}
            fill
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1023px) 50vw, 400px"
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.04]"
          />
          <span className="absolute inset-0 bg-[linear-gradient(transparent_55%,rgba(20,8,5,0.55))]" />
        </Link>
      )}

      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <span aria-hidden="true" className={cn("pointer-events-none absolute right-4 select-none text-[4.2rem] font-semibold leading-none tabular-nums text-gold opacity-40 dark:opacity-15", cover ? "-top-14 text-white opacity-80 dark:opacity-60" : "top-1")}>
          {edition.year}
        </span>
        <Skyline sun={false} className="pointer-events-none absolute bottom-0 right-0 h-20 w-auto text-border opacity-80" />

        <span
          className={cn(
            "relative self-start rounded-pill px-2.5 py-0.5 text-tag",
            edition.upcoming ? "bg-accent-fill text-on-accent" : "bg-surface-soft text-ink-muted",
          )}
        >
          {edition.upcoming ? "Upcoming" : "Past edition"}
        </span>
        <h3 className="relative mt-3 text-[1.6rem] font-semibold leading-tight">{edition.city}</h3>
        <p className="relative mt-1 text-[0.95rem] font-semibold text-accent">{edition.dates}</p>
        {edition.venue && <p className="relative mt-auto max-w-[34ch] pt-6 text-[0.86rem] leading-normal text-ink-muted">{edition.venue}</p>}
        {count > 0 && (
          <Link href={`/gallery#${edition.slug}`} className="relative mt-4 inline-flex items-center gap-1.5 self-start text-[0.88rem] font-semibold text-accent no-underline hover:underline hover:underline-offset-[3px]">
            <Icon name="photo" className="size-4" /> {count} photos →
          </Link>
        )}
      </div>
    </article>
  );
}
