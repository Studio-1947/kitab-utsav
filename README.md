# Kitab Utsav · किताब उत्सव

Website for Kitab Utsav, the travelling book festival by Rajkamal Prakashan Samuh. Pages: Home, Festivals, Events (programme), Authors, About, Visit, plus an add-to-calendar file.
Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4, following the
design system in [`rajkamal-design-system/`](rajkamal-design-system/README.md).

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (the page is fully static)
npm run lint
```

## Where things live

| What | Where |
| --- | --- |
| **All content** (current edition, programme, authors, editions, FAQ, social) | `src/data/event.ts` |
| Pages | `src/app/{festivals,events,authors,about,visit}/page.tsx` |
| Add-to-calendar file | `src/app/kitab-utsav-bareilly.ics/route.ts` |
| Design tokens (light + dark colours, shadows) | `src/styles/tokens.css` |
| Tokens → Tailwind theme (colours, type scale, radii, breakpoints) | `src/app/globals.css` |
| Design-system components (Button, BookCard, Chip, Tag, ContentCard, FormField, Toast) | `src/components/ui/` |
| Header, footer, phone tab bar, theme toggle | `src/components/layout/` |
| Page sections | `src/components/sections/` |
| Registration Server Action | `src/app/actions.ts` |
| Logos, imprint logos, sample covers | `public/` (copied from the design system) |

## Design system in Tailwind

Tokens are exposed as Tailwind utilities, so stick to them instead of raw values:

- Colour: `bg-page`, `bg-page-warm`, `bg-surface-card`, `text-ink`, `text-ink-muted`, `text-accent`, `bg-accent-fill text-on-accent`, `border-border`, `bg-footer-bg text-footer-ink`, `text-gold`, ...
- Type: `text-section-title`, `text-eyebrow uppercase`, `text-lead`, `text-meta`, `text-book-title`, `text-price`, `text-category uppercase`, `font-display` (hero headline only)
- Shape: `rounded-pill`, `rounded-card` (16), `rounded-panel` (18), `rounded-hero` (24), `rounded-input` (12)
- Depth: `shadow-card`, `shadow-card-hover`, `shadow-lift`
- Breakpoints match the design system: `md` = above phone (721px), `lg` = above tablet (981px), `xl` = desktop (1200px)
- Page column: the `wrap` utility (max 1224px, 16px / 28px gutters)

Dark theme is `<html data-theme="dark">`, saved as `localStorage["rk-theme"]`; every token switches automatically. Use `dark:` only for rare one-offs.

## Still to do

- Programme: only Day 1's outline is published; days 2–5 reuse it with sessions "To be announced" (`SCHEDULE`)
- Booking: `register()` in `src/app/actions.ts` validates but does not save yet (see the TODO)
- Hindi language toggle from the reference design is not built
- Author photos/videos: authors show Devanagari monograms until real images are added
