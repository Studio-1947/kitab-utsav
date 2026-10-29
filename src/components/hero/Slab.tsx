import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { focusOf } from "@/data/gallery-focus";
import type { GalleryPhoto } from "@/lib/gallery";
import { photoAlt } from "@/lib/gallery";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";

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

function slopedPath(w: number, h: number, slope: number, r: number, bottomRadius = r) {
  const len = Math.hypot(w, slope);
  const ux = (w / len) * r;
  const uy = (slope / len) * r;
  return `M0 ${r}Q0 0 ${ux} ${uy}L${w - ux} ${slope - uy}Q${w} ${slope} ${w} ${slope + r}L${w} ${h - bottomRadius}Q${w} ${h} ${w - bottomRadius} ${h}L${bottomRadius} ${h}Q0 ${h} 0 ${h - bottomRadius}Z`;
}

function mask(w: number, h: number, slope: number, r: number, mirror: boolean, bottomRadius = r) {
  const flip = mirror ? ` transform="matrix(-1 0 0 1 ${w} 0)"` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path${flip} d="${slopedPath(w, h, slope, r, bottomRadius)}"/></svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return { maskImage: url, WebkitMaskImage: url, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" } as const;
}

const SHAPES = {
  left: { card: mask(W, H, SLOPE, R, false), panel: mask(PW, PH, PSLOPE, PR, false), photo: mask(W, H, SLOPE, R, false, 0) },
  right: { card: mask(W, H, SLOPE, R, true), panel: mask(PW, PH, PSLOPE, PR, true), photo: mask(W, H, SLOPE, R, true, 0) },
};

/* What the back of a slab shows when it flips over */
export type SlabBack = {
  text: string;
  details?: { icon: IconName; text: string }[];
  cta: string;
};

/*
  Flip card. Hover (mouse/trackpad) or keyboard focus turns it over to show the back:
  a short description, a few facts and a call to action. Touch screens skip the flip and the tap
  just opens the link. Reduced motion: the back fades in instead of turning.
  The back uses the mirrored outline, so once turned it lines up with the front exactly.
*/
export function Slab({
  side,
  photo,
  imageFit = "cover",
  eyebrow,
  title,
  href,
  back,
  className,
  sizes,
  preload,
}: {
  side: "left" | "right";
  photo?: GalleryPhoto | { src: string; alt: string; objectPosition?: string };
  imageFit?: "cover" | "contain";
  eyebrow: ReactNode;
  title: ReactNode;
  href: string;
  back?: SlabBack;
  className?: string;
  sizes: string;
  preload?: boolean;
}) {
  const shape = SHAPES[side];
  const backShape = SHAPES[side === "left" ? "right" : "left"];
  const turn = back
    ? "motion-safe:group-hover:[transform:rotateY(180deg)] motion-safe:group-focus-visible:[transform:rotateY(180deg)]"
    : "";

  return (
    <Link
      href={href}
      className={cn(
        "group @container relative block aspect-[200/308] w-full no-underline [perspective:1400px] max-md:aspect-[200/210] md:aspect-[200/342] drop-shadow-[0_18px_28px_rgba(40,6,6,0.35)] transition-transform duration-500 ease-nav motion-safe:hover:-translate-y-2 focus-visible:outline-none",
        className,
      )}
    >
      <span className={cn("absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] [transform-style:preserve-3d]", turn)}>
        {/* Front */}
        <span className="absolute inset-0 [backface-visibility:hidden]">
          <span className="absolute inset-0 bg-[linear-gradient(170deg,#7d1818_0%,#6a1212_55%,#5a0f0f_100%)]" style={shape.card} />

          {/* Full-height photo area: it follows the card's outer slope and ends right above the caption. */}
          <span className="absolute left-[3%] right-[3%] top-[3%] bottom-[19%] overflow-hidden bg-slab-face max-md:bottom-[23%]" style={shape.photo}>
            {photo && (
              <Image
                src={photo.src}
                alt={"alt" in photo ? photo.alt : photoAlt(photo)}
                fill
                sizes={sizes}
                preload={preload}
                className={imageFit === "contain" ? "object-contain" : "object-cover"}
                style={{ objectPosition: "objectPosition" in photo ? photo.objectPosition : focusOf(photo.src) }}
              />
            )}
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(156,23,23,0.05)_40%,rgba(110,18,18,0.55))]" />
          </span>

          {/* Caption */}
          <span className="absolute inset-x-[9%] bottom-[7%] flex flex-col gap-[0.35em] text-left text-[clamp(0.82rem,3.6vw,0.95rem)] text-white max-md:inset-x-[6%] max-md:bottom-[7%] max-md:gap-[0.3em] max-md:text-[0.95rem] md:text-[clamp(0.7rem,1.05vw,0.95rem)]">
            <span className="line-clamp-2 text-[max(0.66rem,0.72em)] font-semibold uppercase tracking-[0.08em] text-gold max-md:text-[0.7rem] md:tracking-[0.1em]">{eyebrow}</span>
            <span className="flex items-center justify-between gap-2 text-[1.35em] font-semibold leading-tight max-md:text-[1.3rem]">
              {title}
              <span aria-hidden="true" className="grid size-[1.6em] flex-none place-items-center rounded-full bg-white/12 text-[0.8em] max-md:size-8 max-md:border max-md:border-white/60 max-md:bg-transparent max-md:text-[0.95rem] max-md:font-normal transition-[background-color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-gold group-hover:text-slab">
                →
              </span>
            </span>
          </span>
        </span>

        {/* Back: turned 180° so it faces forward once the card flips. Decorative copy, so screen readers keep the short link name. */}
        {back && (
          <span
            aria-hidden="true"
            className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:opacity-0 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:[transform:none] motion-reduce:group-hover:opacity-100 motion-reduce:group-focus-visible:opacity-100"
          >
            <span className="absolute inset-0 bg-[linear-gradient(200deg,#8a1c1c_0%,#6a1212_50%,#4e0d0d_100%)]" style={backShape.card} />
            {/* Faint festival wordmark and dot texture */}
            <span className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1.5px)] [background-size:14px_14px] [mask-image:linear-gradient(160deg,#000,transparent_60%)]" style={backShape.card} />
            <span lang="hi" className="pointer-events-none absolute -bottom-[0.1em] right-[6%] select-none font-display text-[30cqw] leading-none text-white/[0.06]">
              उत्सव
            </span>

            <span className="absolute inset-x-[9%] bottom-[7%] top-[17%] flex flex-col text-left text-[clamp(0.7rem,6.4cqw,1rem)] text-white">
              <span className="line-clamp-2 text-[0.74em] font-semibold uppercase tracking-[0.1em] text-gold">{eyebrow}</span>
              <span className="mt-[0.35em] text-[1.4em] font-semibold leading-tight">{title}</span>
              <span className="mt-[0.4em] block h-0.5 w-[2.2em] rounded-full bg-gold" />
              <span className="mt-[0.8em] min-h-0 overflow-y-auto whitespace-pre-line pr-[0.2em] text-[0.92em] leading-[1.5] text-white/85">{back.text}</span>
              {back.details && (
                <span className="mt-[0.9em] flex flex-col gap-[0.45em] text-[0.84em] text-white/90">
                  {back.details.map((d) => (
                    <span key={d.text} className="flex items-start gap-[0.5em]">
                      <Icon name={d.icon} className="mt-[0.15em] size-[1.1em] text-gold" />
                      <span className="min-w-0">{d.text}</span>
                    </span>
                  ))}
                </span>
              )}
              <span className="mt-auto inline-flex items-center gap-[0.5em] self-start rounded-full bg-gold px-[1em] py-[0.55em] text-[0.88em] font-semibold text-slab">
                {back.cta} <span aria-hidden="true">→</span>
              </span>
            </span>
          </span>
        )}
      </span>
    </Link>
  );
}
