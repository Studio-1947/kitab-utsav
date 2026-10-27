import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Discount tag (.hm-off): sits beside the price, never on the cover. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-block whitespace-nowrap rounded-pill bg-discount-tint px-2 py-0.5 align-middle text-tag text-accent", className)}>
      {children}
    </span>
  );
}
