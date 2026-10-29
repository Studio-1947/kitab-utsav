import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-eyebrow uppercase text-accent", className)}>{children}</p>;
}

/*
  Eyebrow + section title, with an optional note or link on the right.
  The link stays on the title's row at every width, so phones don't spend a line on it.
*/
export function SectionHead({
  eyebrow,
  title,
  id,
  aside,
  className,
}: {
  eyebrow: string;
  title: string;
  id: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-x-4 gap-y-3 md:mb-7 md:gap-x-6", className)}>
      <div className="min-w-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-1.5 text-balance text-section-title text-ink-content">
          {title}
        </h2>
      </div>
      {aside && <div className="flex-none pb-1">{aside}</div>}
    </div>
  );
}
