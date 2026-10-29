import Image from "next/image";
import Link from "next/link";
import { EVENT, type Author } from "@/data/event";
import { authorSlug } from "./AuthorCard";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

/* Photo filling its round frame, or the Devanagari name on a red disc when there is no photo yet. */
function Portrait({ author, px, monoText, className }: { author: Author; px: number; monoText: string; className?: string }) {
  if (author.photo) {
    return <Image src={author.photo} alt="" width={px} height={px} className={cn("size-full rounded-full bg-cover-well object-cover", className)} />;
  }
  return (
    <span
      aria-hidden="true"
      lang="hi"
      className={cn(
        "grid size-full place-items-center rounded-full bg-[linear-gradient(140deg,var(--color-slab-face),var(--color-slab))] p-3 text-center font-semibold leading-tight text-white",
        monoText,
        className,
      )}
    >
      {author.nameHi}
    </span>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/* Speaker for the current edition: coloured band, large portrait, full bio. */
export function SpeakerCard({ author, index, total }: { author: Author; index: number; total: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-hero border border-border-content bg-surface-content text-ink-content shadow-card transition-[border-color,box-shadow,transform] duration-500 hover:border-accent/40 hover:shadow-card-hover motion-safe:hover:-translate-y-1.5">
      <div className="relative h-36 overflow-hidden bg-[linear-gradient(135deg,var(--color-slab-face),var(--color-slab))]">
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1.5px)] [background-size:14px_14px] [mask-image:linear-gradient(115deg,transparent_30%,#000)]"
        />
        <span
          aria-hidden="true"
          lang="hi"
          className="absolute -bottom-5 right-0 whitespace-nowrap text-[5.5rem] font-bold leading-none text-white/10 transition-transform duration-700 ease-out group-hover:-translate-x-4"
        >
          {author.nameHi}
        </span>
        <div className="absolute inset-x-5 top-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/25 bg-white/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur">
            <Icon name="mic" className="size-3.5" /> Speaker · {EVENT.city}
          </span>
          <span className="text-[0.78rem] font-semibold tabular-nums text-white/70">
            {pad(index + 1)} / {pad(total)}
          </span>
        </div>
      </div>

      <div className="relative -mt-16 px-5 md:px-6">
        <div className="relative size-32 rounded-full bg-surface-content p-1.5 shadow-[0_12px_30px_-12px_rgba(60,10,10,0.55)]">
          <div className="size-full overflow-hidden rounded-full">
            <Portrait author={author} px={128} monoText="text-[1.05rem]" className="transition-transform duration-700 ease-out group-hover:scale-[1.07]" />
          </div>
          <span aria-hidden="true" className="absolute bottom-1.5 right-0.5 grid size-9 place-items-center rounded-full border-[3px] border-surface-content bg-gold text-footer-bg">
            <Icon name="pen" className="size-4" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 md:px-6 md:pb-6">
        <p className="text-eyebrow uppercase text-accent">{author.role}</p>
        <h3 className="mt-1.5 text-[1.4rem] font-semibold leading-tight md:text-[1.55rem]">{author.name}</h3>
        <p lang="hi" className="mt-0.5 text-ink-muted">
          {author.nameHi}
        </p>
        <p className="mt-3 text-[0.92rem] leading-[1.6] text-ink-muted md:text-[0.93rem] md:leading-[1.65]">{author.bio}</p>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-content pt-4 text-[0.85rem]">
          <span className="inline-flex items-center gap-1.5 text-ink-muted">
            <Icon name="calendar" className="size-4 text-accent" /> {EVENT.dateShort}
          </span>
          <Link
            href={`/authors#${authorSlug(author)}`}
            aria-label={`${author.name}: profile`}
            className="tap-area inline-flex items-center gap-1 font-semibold text-accent no-underline hover:underline hover:underline-offset-[3px]"
          >
            Profile <Icon name="arrowRight" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* Writer from a past or current edition: centred portrait with a gradient ring. */
export function WriterCard({ author }: { author: Author }) {
  return (
    <Link
      href={`/authors#${authorSlug(author)}`}
      className="group relative flex h-full flex-col items-center overflow-hidden rounded-panel border border-border-content bg-surface-content px-3 pb-5 pt-7 text-center text-ink-content no-underline shadow-card transition-[border-color,box-shadow,transform] duration-500 hover:border-accent/40 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-1 sm:px-5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(ellipse_at_top,var(--color-accent-soft),transparent_72%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="absolute right-2.5 top-2.5 rounded-pill bg-page-warm px-2 py-0.5 text-[0.7rem] font-semibold tabular-nums text-ink-muted">{author.year}</span>

      <div className="relative size-24 sm:size-28">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,var(--color-accent),var(--color-gold),var(--color-accent))] transition-transform duration-700 ease-out group-hover:rotate-180"
        />
        <div className="absolute inset-[3px] overflow-hidden rounded-full bg-surface-content p-[3px]">
          <Portrait author={author} px={112} monoText="text-[0.8rem] sm:text-[0.88rem]" className="transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
        </div>
      </div>

      <h3 className="relative mt-4 text-[1.02rem] font-semibold leading-snug sm:text-[1.1rem]">{author.name}</h3>
      <p lang="hi" className="relative text-[0.88rem] text-ink-muted">
        {author.nameHi}
      </p>
      <p className="relative mt-2.5 rounded-pill bg-accent-soft px-2.5 py-1 text-[0.72rem] font-semibold leading-tight text-accent">{author.role}</p>
      <p className="relative mt-auto inline-flex items-center gap-1 pt-4 text-meta text-ink-muted">
        <Icon name="pin" className="size-3.5 text-accent" /> {author.city}
      </p>
    </Link>
  );
}

/* Closing tile for the writers grid: totals, a stack of faces and a link to everyone. */
export function WritersSummary({ authors, className }: { authors: Author[]; className?: string }) {
  const cities = new Set(authors.map((a) => a.city)).size;
  const since = Math.min(...authors.map((a) => a.year));
  const faces = authors.filter((a) => a.photo).slice(0, 5);
  return (
    <div className={cn("relative flex flex-col justify-between gap-5 overflow-hidden rounded-panel bg-footer-bg p-6 text-footer-ink shadow-card md:flex-row md:items-center md:p-8", className)}>
      <span aria-hidden="true" lang="hi" className="pointer-events-none absolute -bottom-8 -right-2 whitespace-nowrap text-[7rem] font-bold leading-none text-white/[0.04]">
        लेखक
      </span>
      <div className="relative">
        <div className="flex -space-x-3">
          {faces.map((a) => (
            <span key={a.name} className="size-11 overflow-hidden rounded-full ring-[3px] ring-footer-bg">
              <Portrait author={a} px={44} monoText="" />
            </span>
          ))}
        </div>
        <p className="mt-4 text-[1.25rem] font-semibold leading-snug">
          {authors.length} writers · {cities} cities · since {since}
        </p>
        <p className="mt-1 text-[0.92rem] opacity-80">Poets, novelists, critics and translators, in conversation with readers.</p>
      </div>
      <Link
        href="/authors"
        className="relative inline-flex flex-none items-center gap-2 self-start rounded-pill bg-gold px-5 py-2.5 text-button text-footer-bg no-underline transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] md:self-center"
      >
        Meet all authors <Icon name="arrowRight" className="size-4" />
      </Link>
    </div>
  );
}
