import type { Metadata } from "next";
import { AboutExperience } from "@/components/about/AboutExperience";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "About",
  description: "Kitab Utsav is a festival of conversation between books, readers and writers, taken from city to city by Rajkamal Prakashan Samuh.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" eyebrow="About" title="Where Books Meet Their Readers">
        <p>Kitab Utsav brings writers, readers and books together — city by city, conversation by conversation.</p>
      </PageHero>
      <AboutExperience />
    </>
  );
}
