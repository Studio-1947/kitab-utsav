import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";

/* Content card (.cnt-card): border first, accent border on hover. */
export function ContentCard({
  icon,
  title,
  children,
  className,
}: {
  icon?: IconName;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-panel border border-border-content bg-surface-content p-6 text-ink-content transition-[border-color,box-shadow] duration-200 hover:border-accent hover:shadow-card-hover",
        className,
      )}
    >
      {icon && (
        <span className="mb-3 grid size-10 place-items-center rounded-full bg-accent-soft text-accent">
          <Icon name={icon} />
        </span>
      )}
      <h3 className="mb-2 text-card-heading">{title}</h3>
      <div className="text-[0.92rem] leading-[1.55] text-ink-muted [overflow-wrap:anywhere]">{children}</div>
    </div>
  );
}
