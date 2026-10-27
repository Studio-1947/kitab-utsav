import { cn } from "@/lib/utils";

/* A city skyline as a single-weight line drawing, with a gold sun. Decorative. */
export function Skyline({ className, sun = true }: { className?: string; sun?: boolean }) {
  return (
    <svg viewBox="0 0 240 100" aria-hidden="true" preserveAspectRatio="xMidYMax meet" className={cn("block", className)}>
      {sun && <circle cx="40" cy="22" r="7" className="fill-gold" />}
      <g className="fill-none stroke-current [stroke-linejoin:round] [stroke-width:1.5]">
        <path d="M0 98h240" />
        <path d="M2 98V74h22v24M8 82h10" />
        <path d="M24 98V60h22v38M30 66h10" />
        <path d="M46 98V44h8v-6h12v6h8v54M54 52h12" />
        <path d="M74 98V66h20v32M80 72h8" />
        <path d="M94 98V48h8v-6h10v6h6v50M100 56h12" />
        <path d="M118 98V72h18v26M136 98V62h20v36M142 70h8" />
        <path d="M156 98V78a8 8 0 0 1 16 0v20" />
        <path d="M172 98V54h24v44M178 62h12" />
        <path d="M196 98V70h18v28M214 98V58h24v40M220 66h12" />
        <path d="M120 98v-10a6 6 0 0 1 12 0v10" />
      </g>
    </svg>
  );
}
