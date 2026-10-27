"use client";

import { Icon } from "@/components/ui/Icon";
import { setTheme, useTheme } from "@/hooks/useBrowserState";
import { cn } from "@/lib/utils";

/* Sun/moon button. Choice is saved as localStorage["rk-theme"]. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        "grid size-10 cursor-pointer place-items-center rounded-pill border border-border bg-transparent text-ink transition-[background-color,border-color,transform] duration-200 hover:border-accent hover:bg-accent-soft active:scale-[0.97]",
        className,
      )}
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} className="size-[18px]" />
    </button>
  );
}
