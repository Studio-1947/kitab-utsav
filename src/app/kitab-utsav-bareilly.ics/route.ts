import { EVENT } from "@/data/event";

/*
  "Add to calendar" file for the current edition, prerendered at build time.
  One all-day-range event; times are local Indian time (UTC+5:30 → UTC).
*/
function utc(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

// Escape text per RFC 5545
const esc = (s: string) => s.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;");

export async function GET() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Rajkamal Prakashan//Kitab Utsav//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:kitab-utsav-${EVENT.city.toLowerCase()}-${EVENT.year}@rajkamalprakashan.com`,
    "DTSTAMP:20261001T000000Z",
    `DTSTART:${utc(EVENT.startsAt)}`,
    `DTEND:${utc(EVENT.endsAt)}`,
    `SUMMARY:${esc(`Kitab Utsav ${EVENT.city} (${EVENT.nameHi})`)}`,
    `LOCATION:${esc(EVENT.venue)}`,
    `DESCRIPTION:${esc(`${EVENT.dateLabel}. ${EVENT.hours}. Author meets, book launches, poetry readings, panel talks, workshops and a book exhibition. By ${EVENT.hostGroup}.`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="kitab-utsav-${EVENT.city.toLowerCase()}.ics"`,
    },
  });
}
