import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

/* Line icons: no fill, 2px round stroke in currentColor (design-system rule). */
const PATHS = {
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  ticket: <><path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /><path d="M13 5v2M13 11v2M13 17v2" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  book: <><path d="M4 19.5V5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2zm0 0A2 2 0 0 0 6 22h13" /><path d="M9 7h6" /></>,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-5A8 8 0 1 1 21 12z" />,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  music: <><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></>,
  bag: <><path d="M3 9h18l-1.5 11h-15z" /><path d="M8 9V7a4 4 0 0 1 8 0v2" /></>,
  home: <path d="M3 11 12 3l9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  ticketCheck: <><path d="M2 9a3 3 0 0 0 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 0 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /><path d="m9 12 2 2 4-4" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  calendarPlus: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M12 13v5M9.5 15.5h5" /></>,
  bookOpen: <path d="M2 5.5C4.5 4 7.5 4 12 6c4.5-2 7.5-2 10-.5V19c-2.5-1.5-5.5-1.5-10 .5-4.5-2-7.5-2-10-.5zM12 6v13.5" />,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></>,
  sparkle: <><path d="M10 3c.6 3.6 2.4 5.4 6 6-3.6.6-5.4 2.4-6 6-.6-3.6-2.4-5.4-6-6 3.6-.6 5.4-2.4 6-6z" /><path d="M18 14c.3 1.8 1.2 2.7 3 3-1.8.3-2.7 1.2-3 3-.3-1.8-1.2-2.7-3-3 1.8-.3 2.7-1.2 3-3z" /></>,
  library: <path d="M4 20V5h3v15M9 20V8h3v12M14.5 20.5 17 6.5l3 .6-2.5 14M3 20.5h18" />,
  stage: <path d="M3 4h18M5 4v3a7 7 0 0 0 14 0V4M8 20h8M12 14v6M3 4c0 2 1 3 2 3M21 4c0 2-1 3-2 3" />,
  pen: <><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /><path d="m14.5 5.5 3 3" /></>,
  signature: <><path d="M3 17c3-1 4-9 6-9s-1 9 2 9 3-5 5-5 1 4 3 4h2" /><path d="M3 21h18" /></>,
  directions: <><path d="M12 2 2 12l10 10 10-10z" /><path d="M9 13v-2a1 1 0 0 1 1-1h5M13 8l2 2-2 2" /></>,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  photo: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></>,
  youtube: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h0" /></>,
  facebook: <path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2z" />,
  x: <path d="M4 4l16 16M20 4 4 20" />,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
  whatsapp: <><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></>,
  heart: <path d="M12 20s-7.4-4.5-9.1-9.2C1.8 7.6 4 4.5 7.3 4.5c2 0 3.5 1 4.7 2.7 1.2-1.7 2.7-2.7 4.7-2.7 3.3 0 5.5 3.1 4.4 6.3C19.4 15.5 12 20 12 20z" />,
  cart: <><circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" /><path d="M2.5 3.5h2.6l2.2 11a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.4-1.1L21 8H6" /></>,
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("size-[18px] flex-none fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]", className)}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
