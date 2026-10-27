import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-eyebrow uppercase text-accent", className)}>{children}</p>;
}

/* Eyebrow + section title, with an optional note or link on the right. */
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
    <div className={cn("mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 id={id} className="mt-1.5 text-balance text-section-title text-ink-content">
          {title}
        </h2>
      </div>
      {aside}
    </div>
  );
}
