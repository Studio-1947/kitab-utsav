Rajkamal Prakashan Samuh is a Hindi publishing house, trusted for 75+ years, selling books, e-books and gift offers online. The site is warm and bookish: cream paper, brick-red ink, rounded pill controls, one sans family that sets both Hindi and English. Book covers are the hero of every page. The UI stays quiet around them.

## Principles

- **The cover is shown whole.** Never crop a cover or draw on it. Covers sit in a square `cover-well` with `object-fit: contain`. Discounts go beside the price, never on the cover.
- **One accent does the work.** `accent` marks every action, price and active state. Do not add a second accent hue for UI. `crimson`, `clay` and `gold` belong to specific places (menus, Kitab Teras, offer banners).
- **Pills, not boxes.** Buttons, chips, search fields, tags and toasts all use `radius-pill`. Cards use `radius-card` (16px) or `radius-panel` (18px).
- **Borders before shadows.** Cards have a 1px `border`. In dark theme, shadows go to `none` and the border carries the edge.
- **Nothing shifts.** Counts use tabular figures in a fixed slot, badges keep their space, and controls in one row share one height.
- **Phone first for shopping.** Up to 1199px a floating bottom tab bar (Home · Explore · Profile · Wishlist · Cart) replaces the nav links. Filters open as sheets from the bottom.

## Content fundamentals

- **Two languages, one voice.** Book titles, author names and genre names in Hindi are set in Devanagari (`मिट्टी से जुड़ें`, `हिन्दी दिवस`). Interface words are English: "All Books", "Add to cart", "View all →", "Track Your Order". The page `lang` is `hi`.
- **Romanised titles on cards.** Catalogue cards use the romanised title as listed ("Mitro Marjani", "Path Ke Sathi"), with the author below.
- **Title Case for navigation and headings** ("Publish With Us", "Return & Exchange", "Our Family of Imprints"). Sentence case for buttons and messages ("Add to cart", "Clear filters", "Show 24 e-books").
- **Uppercase only for small labels**: eyebrows (`eyebrow`) and genre lines on cards (`category`), with letter-spacing. Trust strip lines use uppercase too ("FAST DISPATCH", "GENUINE BOOKS").
- **Plain, warm, factual.** "Ships in 7 Days · Original · Returns · Free above ₹1,200". Use the middle dot `·` to join short facts.
- **Prices** in rupees with the ₹ sign and no decimals on cards: "₹200", struck "₹250", tag "20% off".
- **Arrows as text** for onward links: "View all →", "See the full collection on rajkamalprakashan.com ↗" (↗ means it leaves the site).
- **No emoji** in the interface. The footer contact lines are the one legacy exception.

## Colour

- Page ground is `page` (warm white `#fffdfb`; dark `#1a0d0a`). The homepage and Kitab Teras pages use `page-warm`.
- Set body text in `ink` on `page` and `surface-card`. Content pages (About, FAQ, policies, forms) use `ink-content` for headings and labels, and `ink-muted` for subtitles and notes.
- Use `accent` for prices, category lines, links, outline buttons, active chips and focus borders. In dark theme it becomes a light coral `#ffab98`.
- Filled primary buttons use `accent-fill` with `on-accent` text. In dark theme the fill is `#f28b7d` with dark text `#3a0d08`. Never put white text on the dark-theme fill.
- Cards: `surface-card` for books and lists, `surface-content` for content pages, both with a `border`/`border-content` outline.
- Tints: `accent-soft` for hover and focus halos, `discount-tint` behind the discount tag.
- Status: `good` for "Added" and success, `bad` for errors. Pair each with a word or icon. Do not rely on colour alone.
- `wish-red` is only for the filled heart on a wishlisted book.
- The footer is always `footer-bg` with `footer-ink` and `gold` highlights, in both themes.
- Known gaps, kept as the code has them: `border` is decorative (1.5:1) and too faint to be the only edge of an input; the struck-through original price at 50% opacity is about 3:1; the input focus halo is faint, so focus depends on the accent border; the dark `discount-tint` is a blue tint.

## Typography

- One family for everything: **Google Sans Flex** (weights 300–700), falling back to **Noto Sans Devanagari** (400, 500, 600) for Hindi. Both load from Google Fonts:
  `https://fonts.googleapis.com/css2?family=Google+Sans+Flex:wght@300..700&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap`
- **The heaviest weight anywhere is 600.** Headings, `strong`, `b`, `th` and `dt` are all 600. Body text is 400. Card titles and chips are 500.
- Use the styles in the type scale: `page-title` once per page, `section-title` for sections, `lead` under the title, `body` for reading, `book-title`, `price`, `meta` and `category` on cards, `button` on every button, `label` on form fields.
- Sizes are in rem off a 16px root. The site uses many in-between sizes (0.72–0.92rem); new work should pick from this scale.
- `display-hindi` (Yatra One) is only the homepage hero headline. `quote` (Georgia italic) is only author life dates and short quotes.
- Search inputs use 16px so phones do not zoom on focus.

## Spacing and layout

- Page column: max `container` (1224px), side gutter `space-28` on desktop and `space-16` on phones.
- Gaps come in small steps: `space-6`, `space-8` (most common), `space-10`, `space-12`, `space-14`. Use `gap` on flex and grid, not margins.
- Card padding: `space-12` for book cards, `space-24` for content cards, `space-18` for form cards.
- Book grids: `repeat(auto-fill, minmax(210px, 1fr))` with a gap of `space-18` × `space-16`. On phones, always 2 columns, gap `space-12` × `space-10`.
- Content pages: a 2-column layout with a sticky side panel (switcher and "On this page"). On phones the side panel becomes a sideways chip strip.
- Sticky banners and filter bars sit under the 76px header on desktop. On phones they pin to `env(safe-area-inset-top)`.
- Breakpoints: `bp-phone` 720px, `bp-tablet` 980px, `bp-tablet-wide` 1199px, `bp-desktop` 1200px, `bp-wide` 1280px, `bp-shelf` 1340px.
- Respect safe areas: fixed bars and toasts add `env(safe-area-inset-*)`.

## Shape, depth and states

- Radii: `radius-pill` for controls, `radius-round` for icon buttons, `radius-card` 16px for book cards, `radius-panel` 18px for content cards, `radius-hero` 24px for the page hero, `radius-input` 12px for form inputs, `radius-banner` 14px for banners.
- Shadows are warm brown, never grey: `shadow-card` at rest, `shadow-card-hover` or `shadow-lift` on hover. In dark theme they turn neutral black or `none`.
- Hover: fill with `accent-soft` (chips, outline buttons), darken to `accent-hover` (filled buttons), or turn the border accent (content cards).
- Press: buttons scale to 0.97.
- Focus: an accent border plus a 3px `focus-halo`. Menus and Hindi Pakhwara cards use a 3px `crimson` outline with a 4px offset.
- Selected chip: `accent` fill, white label.
- Added to cart: the button turns `good`, reads "Added" for 1.6s, and the cart icon hops.

## Motion

- Most transitions are 0.2s ease (colour, background, border). Transforms use 0.15s. Theme changes cross-fade over 0.3s.
- The nav uses `cubic-bezier(0.22, 0.61, 0.36, 1)` over 0.6s when it shrinks on scroll.
- Toasts drop in from the top with a small scale (0.96 → 1).
- Every animation has a `prefers-reduced-motion: reduce` override (49 in the code). Keep that rule for new work.

## Theme

- Light is the default (`<html data-theme="light">`). Dark is `data-theme="dark"`, chosen with the sun/moon pill button and saved as `localStorage["rk-theme"]`.
- Every colour token has both values. Dark is a deep brown, not black: `page` `#1a0d0a`, cards are white at 6% over it.

## Iconography

- Icons are inline SVG line drawings: `fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round`, usually 16–18px. They take the text colour of their button.
- Onward arrows inside round buttons are drawn with a CSS mask, not a font glyph, so they sit centred on every phone.
- Social icons (YouTube, Instagram, Facebook, X, LinkedIn, Threads) are drawn SVGs in round cream-outline buttons that fill gold on hover.
- There is no icon font and no emoji in the UI.

## Logos and imprints

- The Rajkamal mark and wordmark are single-ink SVGs in `logo-red` (`#CB2323`). Use `rkp-logo.svg` on light grounds and `rkp-logo-dark.svg` (red emblem, white wordmark) on dark. The desktop header shows the full logo at the top of the page and shrinks to the round emblem (`rkp-favicon.svg`) on scroll. Tablets keep the full logo.
- `rkp-logo-text-only-white.svg` is for the footer and other red or dark grounds.
- The Imprints group holds the twelve imprint logos (Rajkamal, Radhakrishna, Lokbharti, Sarthak, Funda and others) as PNGs, for the Publications page.

## Components

Each component below has guidelines and a static preview, styled by `components/bundle.css` with the same class names the site uses (`.bk-btn`, `.hm-card`, `.au-chip`, `.fm-field`, `.cnt-card`, `.cnt-hero`, `.rk-toast`). The site is plain HTML, CSS and JavaScript, not a React library, so there is no JavaScript bundle. To build a new page, link `tokens.css` and `bundle.css` and write the markup shown in each preview.
