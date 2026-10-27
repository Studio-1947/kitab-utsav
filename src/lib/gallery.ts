import { GALLERY, type GalleryPhoto } from "@/data/gallery";

export type { GalleryPhoto };

/* Photo groups shown in the gallery, newest first. Slugs match EDITIONS where there is one. */
export const GALLERY_GROUPS: { slug: string; label: string }[] = [
  { slug: "bareilly-2026", label: "Bareilly 2026" },
  { slug: "indore-2026", label: "Indore 2026" },
  { slug: "patna-2026", label: "Patna 2026" },
  { slug: "mumbai-2026", label: "Mumbai 2026" },
  { slug: "bareilly-2025", label: "Bareilly 2025" },
  { slug: "bhopal-2025", label: "Bhopal 2025" },
  { slug: "delhi-2025", label: "World Book Fair, Delhi 2025" },
];

export const groupLabel = (slug: string) => GALLERY_GROUPS.find((g) => g.slug === slug)?.label ?? slug;

/* Hand-picked cover photo for each group */
const COVERS: Record<string, string> = {
  "bareilly-2026": "/gallery/bareilly-2026-002.webp",
  "indore-2026": "/gallery/indore-2026-052.webp",
  "patna-2026": "/gallery/patna-2026-150.webp",
  "mumbai-2026": "/gallery/mumbai-2026-191.webp",
  "bareilly-2025": "/gallery/bareilly-2025-230.webp",
  "bhopal-2025": "/gallery/bhopal-2025-301.webp",
  "delhi-2025": "/gallery/delhi-2025-352.webp",
};

export function photosFor(slug: string): GalleryPhoto[] {
  return GALLERY.filter((p) => p.edition === slug);
}

export function coverFor(slug: string): GalleryPhoto | undefined {
  const photos = photosFor(slug);
  return photos.find((p) => p.src === COVERS[slug]) ?? photos[0];
}

/* A spread of photos across editions, for the home page strip */
export function highlights(perGroup = 3): GalleryPhoto[] {
  const picks: GalleryPhoto[] = [];
  for (const g of GALLERY_GROUPS) {
    const photos = photosFor(g.slug);
    if (!photos.length) continue;
    const step = Math.max(1, Math.floor(photos.length / perGroup));
    for (let i = 0; i < perGroup && i * step < photos.length; i++) picks.push(photos[i * step]);
  }
  return picks;
}

/* Alt text: the session title when there is one, otherwise the edition */
export function photoAlt(p: GalleryPhoto) {
  return p.title || `A moment from Kitab Utsav ${groupLabel(p.edition)}`;
}
