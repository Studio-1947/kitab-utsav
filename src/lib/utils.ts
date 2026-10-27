import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the design system's custom text sizes so they
// don't get mistaken for text colours and dropped.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "page-title", "section-title", "card-heading", "eyebrow", "lead", "body", "input",
            "meta", "book-title", "price", "button", "chip", "label", "category", "tag",
            "display-hindi", "quote",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** ₹ with Indian digit grouping and no decimals: ₹1,200 */
export function rupees(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

/** "15:30" → "3:30 pm" */
export function time12(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

/** "2026-10-23" → parts for day cards, without timezone drift */
export function dayParts(isoDate: string) {
  const [y, mo, d] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d));
  const fmt = (o: Intl.DateTimeFormatOptions) => date.toLocaleDateString("en-GB", { ...o, timeZone: "UTC" });
  return {
    num: d,
    weekday: fmt({ weekday: "short" }),
    weekdayLong: fmt({ weekday: "long" }),
    month: fmt({ month: "short" }),
    monthLong: fmt({ month: "long" }),
    day: `${d} ${fmt({ month: "short" })}`,
    long: `${fmt({ weekday: "long" })}, ${d} ${fmt({ month: "long" })} ${y}`,
  };
}

/** Today's date in India as YYYY-MM-DD */
export function todayIST() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
