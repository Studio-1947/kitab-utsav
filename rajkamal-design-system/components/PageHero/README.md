# PageHero

The opening panel of every content page: eyebrow, page title and a one-line subtitle.

**The consumer provides** the eyebrow word (optional), the title and the subtitle.

**Rules**
- One per page, right under the breadcrumb.
- Eyebrow: `eyebrow` style, uppercase, `accent`. Title: `page-title` at `clamp(1.8rem, 3.5vw, 2.6rem)` in `ink-content`. Subtitle: `lead` in `ink-muted`, max 68ch.
- Panel: `radius-hero` 24px, 1px `border-content`, 40px × 36px padding. On the site the fill is a soft diagonal wash from `rgba(160, 54, 31, 0.08)` to `rgba(245, 232, 219, 0.45)`; this preview uses the flat `surface-soft` tint.
- Latin text in the title uses Google Sans Flex at 600, never 700.
