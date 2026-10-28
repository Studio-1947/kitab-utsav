import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { focusOf } from "@/data/gallery-focus";
import type { GalleryPhoto } from "@/lib/gallery";
import { photoAlt } from "@/lib/gallery";
import { cn } from "@/lib/utils";

/*
  A rounded slab whose top edge slopes down towards the centre of the hero.
  The shape is an SVG mask with a fixed aspect ratio, so corners stay round at any size.
*/
const W = 200;
const H = 342; // card ratio ≈ 0.585
const SLOPE = 34; // how far the top edge drops across the card
const R = 34;

const PW = 176;
const PH = 168; // photo panel
const PSLOPE = 30;
const PR = 28;

function slopedPath(w: number, h: number, slope: number, r: number) {
  const len = Math.hypot(w, slope);
  const ux = (w / len) * r;
  const uy = (slope / len) * r;
  return `M0 ${r}Q0 0 ${ux} ${uy}L${w - ux} ${slope - uy}Q${w} ${slope} ${w} ${slope + r}L${w} ${h - r}Q${w} ${h} ${w - r} ${h}L${r} ${h}Q0 ${h} 0 ${h - r}Z`;
}

function mask(w: number, h: number, slope: number, r: number, mirror: boolean) {
  const flip = mirror ? ` transform="matrix(-1 0 0 1 ${w} 0)"` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path${flip} d="${slopedPath(w, h, slope, r)}"/></svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return { maskImage: url, WebkitMaskImage: url, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" } as const;
}

const SHAPES = {
  left: { card: mask(W, H, SLOPE, R, false), panel: mask(PW, PH, PSLOPE, PR, false) },
  right: { card: mask(W, H, SLOPE, R, true), panel: mask(PW, PH, PSLOPE, PR, true) },
};

export function Slab({
  side,
  photo,
  eyebrow,
  title,
  href,
  className,
  sizes,
  preload,
}: {
  side: "left" | "right";
  photo?: GalleryPhoto;
  eyebrow: ReactNode;
  title: ReactNode;
  href: string;
  className?: string;
  sizes: string;
  preload?: boolean;
}) {
  const shape = SHAPES[side];
  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-[200/342] w-full no-underline drop-shadow-[0_18px_28px_rgba(40,6,6,0.35)] transition-transform duration-500 ease-nav motion-safe:hover:-translate-y-2",
        className,
      )}
    >
      <span className="absolute inset-0 bg-[linear-gradient(170deg,#7d1818_0%,#6a1212_55%,#5a0f0f_100%)]" style={shape.card} />

      {/* Photo panel, inset near the top with the same slope */}
      <span className="absolute left-[6%] right-[6%] top-[4.2%] aspect-[176/168] overflow-hidden bg-slab-face" style={shape.panel}>
        {photo && (
          <Image
            src={photo.src}
            alt={photoAlt(photo)}
            fill
            sizes={sizes}
            preload={preload}
            className="object-cover"
            style={{ objectPosition: focusOf(photo.src) }}
          />
        )}
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(156,23,23,0.05)_40%,rgba(110,18,18,0.55))]" />
      </span>

      {/* Caption */}
      <span className="absolute inset-x-[9%] bottom-[7%] flex flex-col gap-[0.35em] text-left text-[clamp(0.7rem,1.05vw,0.95rem)] text-white">
        <span className="text-[0.72em] font-semibold uppercase tracking-[0.1em] text-gold">{eyebrow}</span>
        <span className="flex items-center justify-between gap-2 text-[1.35em] font-semibold leading-tight">
          {title}
          <span aria-hidden="true" className="grid size-[1.6em] flex-none place-items-center rounded-full bg-white/12 text-[0.8em] transition-[background-color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-gold group-hover:text-slab">
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
