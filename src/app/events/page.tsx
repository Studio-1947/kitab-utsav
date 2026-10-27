import type { Metadata } from "next";
import { EVENT, SPEAKERS } from "@/data/event";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Schedule } from "@/components/sections/Schedule";
import { MoreLink } from "@/components/ui/MoreLink";
import { PhotoCarousel } from "@/components/gallery/PhotoCarousel";
import { photosFor } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Programme",
  description: `Day-wise programme for Kitab Utsav ${EVENT.city}, ${EVENT.dateLabel}, and the speakers announced so far.`,
};

const CURRENT_SLUG = `${EVENT.city.toLowerCase()}-${EVENT.year}`;

export default function EventsPage() {
  const bareilly = photosFor(CURRENT_SLUG);
  return (
    <>
      <PageHero crumb="Events" eyebrow={`${EVENT.city} · ${EVENT.dateLabel}`} title="Programme">
        <p>
          {EVENT.venue}. {EVENT.hours}. The book exhibition is open all day.
        </p>
      </PageHero>

      <div className="wrap py-10 md:py-14">
        <Schedule />
      </div>

      {bareilly.length > 0 && (
        <section aria-labelledby="scenes-title" className="pb-12 md:pb-18">
          <div className="wrap">
            <SectionHead id="scenes-title" eyebrow={`Kitab Utsav ${EVENT.city} ${EVENT.year}`} title="Scenes from the Festival" aside={<MoreLink href={`/gallery#${CURRENT_SLUG}`}>All {bareilly.length} photos</MoreLink>} />
            <PhotoCarousel photos={bareilly} label={`Photos from Kitab Utsav ${EVENT.city}`} />
          </div>
        </section>
      )}

      <section aria-labelledby="speakers-title" className="bg-page-warm py-12 md:py-18">
        <div className="wrap">
          <SectionHead id="speakers-title" eyebrow={`Meet them in ${EVENT.city}`} title="Speakers Announced So Far" />
          <div className="grid gap-3.5 lg:grid-cols-3">
            {SPEAKERS.map((a) => (
              <AuthorCard key={a.name} author={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
