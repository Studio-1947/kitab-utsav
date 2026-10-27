import { AUTHORS, EDITIONS, NAV, SCHEDULE } from "@/data/event";
import { GALLERY } from "@/data/gallery";
import { authorSlug } from "@/components/ui/AuthorCard";
import { groupLabel } from "@/lib/gallery";

export type SearchItem = {
  kind: "Author" | "Festival" | "Session" | "Page" | "Photos";
  label: string;
  sub: string;
  href: string;
  /** Lower-case text the query is matched against */
  terms: string;
};

const item = (i: Omit<SearchItem, "terms">, ...extra: string[]): SearchItem => ({
  ...i,
  terms: [i.label, i.sub, ...extra].join(" ").toLowerCase(),
});

/* Everything the hero search can find, built on the server. */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const a of AUTHORS) {
    items.push(item({ kind: "Author", label: a.name, sub: `${a.role} · ${a.city} ${a.year}`, href: `/authors#${authorSlug(a)}` }, a.nameHi));
  }
  for (const e of EDITIONS) {
    items.push(item({ kind: "Festival", label: `Kitab Utsav ${e.city} ${e.year}`, sub: e.dates, href: `/festivals#${e.slug}` }, e.venue ?? ""));
  }
  const sessions = new Set<string>();
  for (const day of SCHEDULE) for (const s of day.sessions) if (s.title) sessions.add(s.title);
  for (const title of sessions) items.push(item({ kind: "Session", label: title, sub: "Programme", href: "/events" }));
  for (const n of NAV) items.push(item({ kind: "Page", label: n.label, sub: "Page", href: n.href }));

  // Photo captions name the sessions and speakers of past editions.
  const seen = new Set<string>();
  for (const p of GALLERY) {
    if (!p.title || seen.has(p.title)) continue;
    seen.add(p.title);
    items.push(item({ kind: "Photos", label: p.title, sub: groupLabel(p.edition), href: `/gallery#${p.edition}` }));
  }
  return items;
}
