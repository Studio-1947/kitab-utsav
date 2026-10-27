import Link from "next/link";
import type { ReactNode } from "react";

/* Onward text link: "All editions →" */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="whitespace-nowrap text-[0.92rem] font-semibold text-accent no-underline hover:underline hover:underline-offset-[3px]">
      {children} →
    </Link>
  );
}
