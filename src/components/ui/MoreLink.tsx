import Link from "next/link";
import type { ReactNode } from "react";

/* Onward text link: "All editions →". tap-area gives it a finger-sized hit box. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="tap-area whitespace-nowrap text-[0.88rem] font-semibold text-accent no-underline hover:underline hover:underline-offset-[3px] md:text-[0.92rem]">
      {children} →
    </Link>
  );
}
