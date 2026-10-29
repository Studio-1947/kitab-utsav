import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* Filter chip (.au-chip). Selected = accent fill, on-accent label. */
export function Chip({
  pressed,
  className,
  ...rest
}: { pressed: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      className={cn(
        "inline-flex min-h-10 flex-none cursor-pointer items-center gap-1.5 rounded-pill border border-border bg-transparent px-3.5 py-2 text-chip text-inherit transition-colors duration-150",
        "hover:bg-accent-soft aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent",
        className,
      )}
      {...rest}
    />
  );
}
