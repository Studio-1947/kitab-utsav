import type { Metadata } from "next";
import { GALLERY } from "@/data/gallery";
import { EVENT } from "@/data/event";
import { PageHero } from "@/components/ui/PageHero";
import { PhotoGallery } from "@/components/gallery/PhotoGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from Kitab Utsav in Bareilly, Indore, Patna, Mumbai and Bhopal: conversations, readings, book launches, performances and the book exhibition.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero crumb="Gallery" eyebrow="Festival moments" title="Kitab Utsav in Pictures">
        <p>
          Conversations, readings, book launches, performances and the book exhibition, from {GALLERY.length} photos across recent editions. Tap a photo to see it full size. More on{" "}
          <a href={EVENT.instagram.href} target="_blank" rel="noopener" className="font-medium text-accent underline underline-offset-[3px] hover:text-accent-hover">
            {EVENT.instagram.handle}
          </a>
          .
        </p>
      </PageHero>

      <div className="wrap py-6 md:py-12">
        <PhotoGallery photos={GALLERY} />
      </div>
    </>
  );
}
