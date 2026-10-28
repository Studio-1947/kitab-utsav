"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Author } from "@/data/event";
import { Icon } from "@/components/ui/Icon";
import { authorSlug } from "@/components/ui/AuthorCard";
import { cn } from "@/lib/utils";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
type Sort = "az" | "latest";

function initialOf(author: Author) {
  return author.name.trim().charAt(0).toUpperCase();
}

function AuthorPortrait({ author }: { author: Author }) {
  if (!author.photo) {
    return (
      <span aria-hidden="true" className="grid size-24 place-items-center rounded-full bg-accent-soft text-[2rem] font-semibold text-accent">
        {initialOf(author)}
      </span>
    );
  }
  return <Image src={author.photo} alt={`Portrait of ${author.name}`} width={96} height={96} className="size-24 rounded-full bg-cover-well object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.04] group-hover:grayscale-0" />;
}

export function AuthorsDirectory({ authors }: { authors: Author[] }) {
  const [letter, setLetter] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("az");
  const normalized = query.trim().toLocaleLowerCase();

  const filtered = useMemo(() => {
    const list = authors.filter((author) => {
      const name = author.name.toLocaleLowerCase();
      return (!letter || initialOf(author) === letter) && (!normalized || name.includes(normalized));
    });
    return list.sort((a, b) => sort === "az" ? a.name.localeCompare(b.name) : b.year - a.year || a.name.localeCompare(b.name));
  }, [authors, letter, normalized, sort]);

  const foundLetters = new Set(authors.map(initialOf));

  return (
    <main className="wrap py-5 md:py-7">
      <nav aria-label="Breadcrumb" className="mb-3 text-meta text-ink-muted">
        <Link href="/" className="no-underline hover:text-accent">Kitab Utsav</Link>
        <span aria-hidden="true" className="mx-1.5 text-accent">›</span>
        <span aria-current="page" className="text-ink-content">Authors</span>
      </nav>
      <section className="relative overflow-hidden rounded-hero border border-border-content bg-[radial-gradient(circle_at_78%_10%,var(--color-accent-soft),transparent_30%),linear-gradient(135deg,var(--color-surface-content),var(--color-surface-soft))] px-5 py-7 shadow-card md:px-10 md:py-9">
        <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-9 size-48 rounded-full border-[20px] border-accent/5" />
        <div className="relative flex items-center gap-4 md:gap-5">
          <span aria-hidden="true" className="grid size-14 place-items-center rounded-card bg-accent-fill text-on-accent shadow-card md:size-16"><Icon name="pen" className="size-7" /></span>
          <div>
            <p className="text-eyebrow uppercase text-accent">The voices of Kitab Utsav</p>
            <h1 className="mt-1 text-[clamp(2rem,4vw,3.1rem)] font-semibold leading-none text-ink-content">Authors</h1>
          </div>
        </div>
      </section>

      <section aria-labelledby="directory-title" className="py-8 md:py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p id="directory-title" className="text-eyebrow uppercase text-accent">Find an author</p>
            <p className="mt-1 text-body text-ink-muted">Writers, poets and speakers who have shared a Kitab Utsav stage.</p>
          </div>
          <button type="button" onClick={() => { setLetter(null); setQuery(""); }} className="cursor-pointer text-[0.86rem] font-semibold text-accent underline underline-offset-[3px] hover:text-accent-hover">Reset filters</button>
        </div>

        <div role="group" aria-label="Filter authors by first letter" className="no-scrollbar mt-5 flex gap-1.5 overflow-x-auto pb-1">
          <button type="button" aria-pressed={letter === null} onClick={() => setLetter(null)} className={cn("grid size-9 flex-none cursor-pointer place-items-center rounded-sm border text-[0.78rem] font-semibold transition-colors", letter === null ? "border-accent-fill bg-accent-fill text-on-accent" : "border-border-content bg-surface-content text-ink-content hover:border-accent hover:text-accent")}>All</button>
          {LETTERS.map((item) => {
            const available = foundLetters.has(item);
            const active = letter === item;
            return <button key={item} type="button" disabled={!available} aria-pressed={active} onClick={() => setLetter(item)} className={cn("grid size-9 flex-none place-items-center rounded-sm border text-[0.78rem] font-semibold transition-colors", active ? "border-accent-fill bg-accent-fill text-on-accent" : "border-border-content bg-surface-content text-ink-content hover:border-accent hover:text-accent", !available && "cursor-not-allowed opacity-35")}>{item}</button>;
          })}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <label className="flex items-center gap-2.5 rounded-input border border-border-content bg-surface-content px-4 py-3 text-ink-muted shadow-card focus-within:border-accent focus-within:shadow-focus">
            <Icon name="search" className="size-[19px] text-accent" />
            <span className="sr-only">Search authors by name</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search by name..." className="min-w-0 flex-1 bg-transparent text-input text-ink-content outline-none placeholder:text-ink-muted" />
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-input border border-border-content bg-surface-content px-3.5 py-3 text-input font-semibold text-ink-content shadow-card hover:border-accent">
            <Icon name="directions" className="size-[18px] text-accent" />
            <span className="sr-only">Sort authors</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as Sort)} className="cursor-pointer bg-transparent outline-none">
              <option value="az">A–Z</option>
              <option value="latest">Newest festival first</option>
            </select>
          </label>
        </div>

        <p aria-live="polite" className="mt-4 text-[0.88rem] text-ink-muted">Showing <span className="font-semibold text-ink-content">{filtered.length}</span> of {authors.length} authors{letter ? ` whose name starts with ${letter}` : ""}{normalized ? ` matching “${query.trim()}”` : ""}.</p>

        {filtered.length ? (
          <ul className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((author) => (
              <li key={author.name} id={authorSlug(author)} className="scroll-mt-24">
                <article className="group flex h-full flex-col items-center rounded-panel border border-border-content bg-surface-content px-5 pb-5 pt-6 text-center text-ink-content shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover">
                  <AuthorPortrait author={author} />
                  <p className="mt-4 text-[1.12rem] font-semibold leading-snug">{author.name}</p>
                  <p lang="hi" className="mt-0.5 min-h-[1.4em] text-[0.88rem] text-ink-muted">{author.nameHi}</p>
                  <p className="mt-3 min-h-[2.8em] text-[0.78rem] font-medium leading-[1.4] text-accent">{author.role}</p>
                  <div className="mt-5 flex w-full items-center justify-between gap-3 border-t border-border-content pt-3.5 text-[0.78rem]">
                    <span className="inline-flex items-center gap-1.5 text-ink-muted"><Icon name="pin" className="size-3.5 text-accent" /> {author.city} · {author.year}</span>
                    <Link href={`#${authorSlug(author)}`} className="rounded-pill bg-accent-soft px-2.5 py-1 font-semibold text-accent no-underline transition-colors hover:bg-accent-fill hover:text-on-accent">View profile</Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 grid min-h-56 place-items-center rounded-panel border border-dashed border-border-content bg-surface-soft p-6 text-center">
            <div>
              <span aria-hidden="true" className="mx-auto grid size-12 place-items-center rounded-full bg-accent-soft text-accent"><Icon name="bookOpen" className="size-6" /></span>
              <p className="mt-3 font-semibold text-ink-content">No authors found</p>
              <p className="mt-1 text-[0.9rem] text-ink-muted">Try a different letter or search term.</p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
