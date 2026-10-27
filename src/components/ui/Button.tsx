import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/*
  Design-system button (.bk-btn). Always a pill.
  primary = filled accent ("Buy now"), outline = accent border ("Add to cart"), ghost = quiet.
*/
type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-pill font-sans text-button no-underline cursor-pointer select-none " +
  "transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] " +
  "focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-fill text-on-accent border-[1.5px] border-accent-fill hover:bg-accent-hover hover:border-accent-hover",
  outline: "bg-transparent text-accent border-[1.5px] border-accent hover:bg-accent-soft",
  ghost: "bg-transparent text-ink-content border border-border-content hover:bg-surface-soft hover:border-accent hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-4 py-[9px]",
  lg: "px-[22px] py-[13px] text-[0.92rem]",
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function buttonClass({ variant = "primary", size = "md", className }: Common = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant, size, className, ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClass({ variant, size, className })} {...rest} />;
}

export function ButtonLink({ variant, size, className, ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ variant, size, className })} {...rest} />;
}
