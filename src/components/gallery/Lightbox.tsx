"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { groupLabel, photoAlt, type GalleryPhoto } from "@/lib/gallery";
import { Icon } from "@/components/ui/Icon";

/* Full-screen photo viewer: arrows / swipe to move, Esc or backdrop to close. */
export function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: GalleryPhoto[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const photo = photos[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);
  const count = photos.length;
  const go = (step: number) => onIndex((index + step + count) % count);

  // Focus the close button, lock page scroll, and return focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onIndex((index + 1) % count);
      else if (e.key === "ArrowLeft") onIndex((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, count, onIndex, onClose]);

  if (!photo) return null;
  const nav = "grid size-11 place-items-center rounded-pill bg-white/10 text-white backdrop-blur transition-colors duration-200 hover:bg-white/20 active:scale-95";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[200] flex flex-col bg-[rgba(20,8,5,0.94)] animate-drop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 pb-2 pt-[calc(12px+env(safe-area-inset-top))] text-white md:px-6">
        <p className="text-meta tabular-nums opacity-80">
          {index + 1} / {count}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className={nav}>
          <Icon name="close" className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 md:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="relative h-full w-full" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <Image
            key={photo.src}
            src={photo.src}
            alt={photoAlt(photo)}
            fill
            sizes="100vw"
            className="object-contain"
            style={{ backgroundColor: "transparent" }}
          />
        </div>
        {count > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${nav} absolute left-3 top-1/2 hidden -translate-y-1/2 md:grid`}>
              <Icon name="arrowLeft" className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${nav} absolute right-3 top-1/2 hidden -translate-y-1/2 md:grid`}>
              <Icon name="arrowRight" className="size-5" />
            </button>
          </>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-[860px] flex-col gap-1 px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pt-3 text-center text-white md:px-6">
        <p className="text-eyebrow uppercase text-gold">Kitab Utsav {groupLabel(photo.edition)}</p>
        {photo.title && (
          <p lang="hi" className="text-[0.98rem] leading-normal">
            {photo.title}
          </p>
        )}
        <a href={photo.href} target="_blank" rel="noopener" className="mx-auto mt-1 inline-flex items-center gap-1.5 text-meta text-white/75 no-underline hover:text-gold">
          <Icon name="instagram" className="size-4" />
          {photo.credit ? `Photo: ${photo.credit}` : "View on Instagram"}
        </a>
        {count > 1 && (
          <div className="mt-2 flex justify-center gap-3 md:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={nav}>
              <Icon name="arrowLeft" className="size-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className={nav}>
              <Icon name="arrowRight" className="size-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
