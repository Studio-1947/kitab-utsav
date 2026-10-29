import Image from "next/image";
import type { Author } from "@/data/event";
import { cn } from "@/lib/utils";

/* "Adnan Kafeel Darvesh" → "adnan-kafeel-darvesh", the author's anchor on /authors */
export const authorSlug = (a: Pick<Author, "name">) => a.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/* Round monogram with the author's name in Devanagari. */
export function Monogram({ nameHi, size = "lg" }: { nameHi: string; size?: "md" | "lg" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid flex-none place-items-center rounded-full bg-accent-fill p-2 text-center font-semibold leading-tight text-on-accent ring-4 ring-accent-soft",
        size === "lg" ? "size-20 text-[0.95rem]" : "size-14 text-[0.72rem]",
      )}
    >
      {nameHi}
    </span>
  );
}

/* Round portrait, or the Devanagari monogram when there is no photo yet. */
export function Avatar({ author, size = "lg" }: { author: Author; size?: "md" | "lg" }) {
  if (!author.photo) return <Monogram nameHi={author.nameHi} size={size} />;
  return (
    <Image
      src={author.photo}
      alt=""
      width={size === "lg" ? 80 : 56}
      height={size === "lg" ? 80 : 56}
      className={cn("flex-none rounded-full bg-cover-well object-cover ring-4 ring-accent-soft", size === "lg" ? "size-20" : "size-14")}
    />
  );
}

/* Author with full bio (speakers, authors page). */
export function AuthorCard({ author, showEdition = false }: { author: Author; showEdition?: boolean }) {
  return (
    <article id={showEdition ? authorSlug(author) : undefined} className="flex scroll-mt-24 gap-3.5 rounded-panel border border-border-content bg-surface-content p-4 sm:gap-4 sm:p-5 text-ink-content shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:border-accent hover:shadow-card-hover motion-safe:hover:-translate-y-1 md:p-6">
      <Avatar author={author} />
      <div className="flex min-w-0 flex-col gap-1">
        <h3 className="text-[1.15rem] font-semibold leading-tight">{author.name}</h3>
        <p className="text-label text-accent">{author.role}</p>
        <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-ink-muted">{author.bio}</p>
        {showEdition && (
          <p className="mt-1.5 text-category uppercase text-ink-muted">
            {author.city} · {author.year}
          </p>
        )}
      </div>
    </article>
  );
}

/* Compact tile: role, name, city · year (writers who've been here). */
export function AuthorTile({ author }: { author: Author }) {
  return (
    <article className="flex items-center gap-3.5 rounded-card border border-border bg-surface-card p-3.5 text-ink shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:border-accent hover:shadow-card-hover motion-safe:hover:-translate-y-1">
      <Avatar author={author} size="md" />
      <div className="min-w-0">
        <p className="truncate text-category uppercase text-accent">{author.role}</p>
        <h3 className="truncate text-[1.02rem] font-semibold text-ink-content">{author.name}</h3>
        <p className="text-meta tabular-nums text-ink-muted">
          {author.city} · {author.year}
        </p>
      </div>
    </article>
  );
}
