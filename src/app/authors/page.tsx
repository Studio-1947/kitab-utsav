import type { Metadata } from "next";
import { AUTHORS } from "@/data/event";
import { AuthorCard } from "@/components/ui/AuthorCard";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Authors",
  description: "The writers, poets and speakers who have shared the Kitab Utsav stage, in one place.",
};

export default function AuthorsPage() {
  return (
    <>
      <PageHero crumb="Authors" eyebrow="Resources" title="Every Author, So Far">
        <p>The writers, poets and speakers who have shared the Kitab Utsav stage, in one place.</p>
      </PageHero>

      <div className="wrap grid gap-3.5 py-10 md:grid-cols-2 md:py-14 lg:grid-cols-3">
        {AUTHORS.map((a) => (
          <AuthorCard key={a.name} author={a} showEdition />
        ))}
      </div>
    </>
  );
}
