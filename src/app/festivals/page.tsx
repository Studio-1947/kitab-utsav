import type { Metadata } from "next";
import { EDITIONS } from "@/data/event";
import { EditionCard } from "@/components/ui/EditionCard";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Festivals",
  description: "Sixteen editions in eleven cities across seven states, in five years. Every Kitab Utsav edition on record.",
};

export default function FestivalsPage() {
  const years = [...new Set(EDITIONS.map((e) => e.year))];
  return (
    <>
      <PageHero crumb="Festivals" eyebrow="City by city" title="Kitab Utsav Editions">
        <p>
          Sixteen editions in eleven cities across seven states, in five years. Since its start in Bhopal, Kitab Utsav has reached Banaras, Patna, Chandigarh, Lucknow, Mumbai, Indore and Bareilly. Below are the editions with full details on record.
        </p>
      </PageHero>

      <div className="wrap flex flex-col gap-10 py-8 md:gap-14 md:py-14">
        {years.map((year) => (
          <section key={year} aria-labelledby={`y-${year}`}>
            <h2 id={`y-${year}`} className="mb-4 text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold tabular-nums text-ink-content">
              {year}
            </h2>
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {EDITIONS.filter((e) => e.year === year).map((e) => (
                <EditionCard key={e.slug} edition={e} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
