import Image from "next/image";
import { rupees } from "@/lib/utils";

export type Book = {
  title: string;
  author: string;
  category: string;
  price: number;
  mrp: number;
  cover?: string;
  href: string;
};
import { buttonClass } from "./Button";
import { Tag } from "./Tag";

/*
  Book card (.hm-card). The cover is shown whole in a square cover-well
  (object-fit: contain), never cropped or drawn on.
*/
export function BookCard({ book }: { book: Book }) {
  const off = Math.round((1 - book.price / book.mrp) * 100);
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-border bg-surface-card text-ink shadow-card transition-[box-shadow,transform] duration-300 hover:shadow-card-hover motion-safe:hover:-translate-y-1">
      <a href={book.href} target="_blank" rel="noopener" className="relative block aspect-square overflow-hidden bg-cover-well" tabIndex={-1} aria-hidden="true">
        {book.cover ? (
          <Image src={book.cover} alt="" fill sizes="(max-width: 720px) 50vw, 280px" className="object-contain transition-transform duration-500 motion-safe:group-hover:scale-105" />
        ) : (
          <span className="grid size-full place-items-center bg-[linear-gradient(155deg,#8a3a2a,#4a1a12)] p-3.5 text-center text-book-title font-semibold text-white">
            {book.title}
          </span>
        )}
      </a>
      <div className="flex flex-1 flex-col gap-1 px-3 pb-3.5 pt-3">
        <p className="truncate text-category uppercase text-accent">{book.category}</p>
        <h3 className="line-clamp-2 h-[2.6em] text-book-title">
          <a href={book.href} target="_blank" rel="noopener" className="no-underline hover:text-accent">{book.title}</a>
        </h3>
        <p className="truncate text-meta opacity-75">{book.author}</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 tabular-nums">
          <strong className="text-price text-accent">{rupees(book.price)}</strong>
          <s className="text-meta opacity-50">{rupees(book.mrp)}</s>
          {off > 0 && <Tag>{off}% off</Tag>}
        </div>
        <div className="mt-auto pt-1">
          <a href={book.href} target="_blank" rel="noopener" className={buttonClass({ variant: "outline", className: "w-full px-2 text-[0.78rem]" })}>
            View book ↗
          </a>
        </div>
      </div>
    </article>
  );
}
