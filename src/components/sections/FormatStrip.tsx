import { FORMATS } from "@/data/event";

/* Slow-moving strip of what happens at the festival. Stops for reduced motion. */
export function FormatStrip() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex flex-none items-center gap-8 pr-8">
      {FORMATS.map((f) => (
        <li key={f} className="flex items-center gap-2.5 whitespace-nowrap">
          <span className="text-gold" aria-hidden="true">✦</span>
          {f}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden bg-footer-bg py-4 text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-footer-ink" aria-label="At the festival">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center">
        {row(false)}
        <span className="contents motion-reduce:hidden">{row(true)}</span>
      </div>
    </div>
  );
}
