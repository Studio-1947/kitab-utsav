"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GALLERY_GROUPS, groupLabel, photoAlt, type GalleryPhoto } from "@/lib/gallery";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Lightbox } from "./Lightbox";

const PAGE = 30;

/*
  Filterable photo wall. The edition filter lives in the URL hash
  (/gallery#indore-2026) so edition cards can link straight to it.
*/
export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [group, setGroup] = useState("all");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const read = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      setGroup(GALLERY_GROUPS.some((g) => g.slug === hash) ? hash : "all");
      setShown(PAGE);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const pick = (slug: string) => {
    setGroup(slug);
    setShown(PAGE);
    history.replaceState(null, "", slug === "all" ? window.location.pathname : `#${slug}`);
  };

  const list = group === "all" ? photos : photos.filter((p) => p.edition === group);
  const visible = list.slice(0, shown);

  return (
    <>
      <div role="group" aria-label="Filter by edition" className="no-scrollbar -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
        <Chip pressed={group === "all"} onClick={() => pick("all")}>
          All <span className="tabular-nums opacity-70">{photos.length}</span>
        </Chip>
        {GALLERY_GROUPS.map((g) => {
          const n = photos.filter((p) => p.edition === g.slug).length;
          return n ? (
            <Chip key={g.slug} pressed={group === g.slug} onClick={() => pick(g.slug)}>
              {g.label} <span className="tabular-nums opacity-70">{n}</span>
            </Chip>
          ) : null;
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {list.length} photos{group !== "all" ? ` from ${groupLabel(group)}` : ""}
      </p>

      <ul className="columns-2 gap-2.5 md:columns-3 md:gap-3.5 xl:columns-4">
        {visible.map((p, i) => (
          <li key={p.src} className="mb-2.5 break-inside-avoid md:mb-3.5">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block w-full cursor-zoom-in overflow-hidden rounded-card border border-border-content shadow-card transition-[box-shadow,transform] duration-300 hover:shadow-card-hover focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-0.5"
              style={{ backgroundColor: p.color }}
              aria-label={`Open photo: ${photoAlt(p)}`}
            >
              <Image
                src={p.src}
                alt=""
                width={p.w}
                height={p.h}
                sizes="(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 300px"
                className="block h-auto w-full transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 bg-[linear-gradient(transparent,rgba(20,8,5,0.85))] px-3 pb-2.5 pt-10 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-gold">{groupLabel(p.edition)}</span>
                {p.title && (
                  <span lang="hi" className="line-clamp-2 text-[0.82rem] leading-snug">
                    {p.title}
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {shown < list.length && (
        <div className="mt-6 flex justify-center">
          <Button variant="outline" size="lg" onClick={() => setShown((s) => s + PAGE)}>
            Show more photos <span className="tabular-nums opacity-70">({list.length - shown})</span>
          </Button>
        </div>
      )}

      {open !== null && <Lightbox photos={list} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}
