import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

/* Toast (.rk-toast): a pill that drops in from the top. */
export function Toast({ icon = "check", children }: { icon?: IconName; children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-[calc(16px+env(safe-area-inset-top))] z-[90] -translate-x-1/2" role="status" aria-live="polite">
      <div className="inline-flex animate-toast items-center gap-2.5 rounded-pill bg-toast-bg py-2 pl-2 pr-[18px] text-[0.88rem] font-medium text-toast-ink shadow-toast">
        <span className="grid size-[34px] flex-none place-items-center rounded-full bg-toast-icon text-[#4a140c]">
          <Icon name={icon} />
        </span>
        {children}
      </div>
    </div>
  );
}
