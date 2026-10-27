import type { Metadata } from "next";
import Link from "next/link";
import { EVENT } from "@/data/event";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Kitab Utsav is a festival of conversation between books, readers and writers, taken from city to city by Rajkamal Prakashan Samuh.",
};

const HAPPENS = [
  "Conversations with writers and open reader Q&A",
  "Readings of fiction, poetry and prose",
  "Discussions on books and the questions of our time",
  "Launches of new books",
  "Dastangoi, folk performances and poetry evenings",
  "An exhibition of books from Rajkamal, Radhakrishna, Lokbharti and Rajkamal Urdu",
];

const h2 = "mb-3 mt-10 text-section-title text-ink-content";
const link = "font-medium text-accent underline underline-offset-[3px] hover:text-accent-hover";

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" eyebrow="About" title="Where Books Meet Their Readers" />

      <article className="wrap max-w-[860px] py-10 text-[1.05rem] leading-[1.75] text-ink-content md:py-14">
        <p>
          Kitab Utsav is a festival of conversation between books, readers and writers, taken from city to city by Rajkamal Prakashan Samuh under the line &ldquo;saath judein, saath padhein&rdquo; (come together, read together). In five years it has held sixteen editions in eleven cities across seven states. The idea is simple: bring books, and the people who write them, to readers in their own city. At each stop, usually for five days, sessions of readings, conversations, discussions and book launches run from morning to night alongside an exhibition of books.
        </p>

        <h2 className={h2}>How It Began</h2>
        <p>
          Kitab Utsav began in Bhopal in the 75th year of Rajkamal Prakashan. After Bhopal and Banaras came a nine-day edition in Patna in November 2022, followed by Chandigarh (February 2023), Lucknow (January 2024), Bhopal again (September 2025, the city&rsquo;s third), Bareilly (November 2025), Mumbai (February 2026), Patna (April 2026) and Indore (September 2026). In October 2026 it returns to Bareilly.
        </p>

        <h2 className={h2}>What Happens at the Festival</h2>
        <ul className="flex flex-col gap-2">
          {HAPPENS.map((h) => (
            <li key={h} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] size-1.5 flex-none rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>

        <h2 className={h2}>Rajkamal Prakashan Samuh</h2>
        <p>
          Founded in 1947, Rajkamal Prakashan is one of the leading Hindi publishing houses. The group includes Rajkamal Prakashan, Radhakrishna Prakashan, Lokbharti Prakashan and Rajkamal Urdu, with its head office in Daryaganj, New Delhi, and branches in Patna, Prayagraj and Mumbai.
        </p>
        <p className="mt-4">
          The group&rsquo;s books are available online at{" "}
          <a href={EVENT.shopUrl} target="_blank" rel="noopener" className={link}>rajkamalprakashan.com</a>. To bring Kitab Utsav to your city, write to{" "}
          <a href={`mailto:${EVENT.email}`} className={link}>{EVENT.email}</a>, or browse the{" "}
          <Link href="/festivals" className={link}>editions so far</Link>.
        </p>
      </article>
    </>
  );
}
