# Button

Pill-shaped buttons for every action on the site: Add to cart, Buy now, Subscribe, form submits and the wishlist heart.

**Variants** (class names as on the site):
- `.bk-btn--buy`: filled primary. `accent-fill` with `on-accent` text, `accent-hover` on hover. One per view: Buy now, Subscribe, Send.
- `.bk-btn--cart`: outline in `accent`, `accent-soft` on hover. Add to cart and secondary actions. Carries the cart icon.
- `.bk-btn--ghost`: neutral outline (`.cnt-btn--ghost` on content pages). Turns accent on hover.
- `.bk-btn--wish`: round 38px icon button (34px inside cards) with a heart. `.is-on` fills the heart in `wish-red`.
- `.is-added`: Add to cart turns `good` and reads "Added" for 1.6s after a tap, with a toast.

**The consumer provides** a `<button>` (or `<a>` for navigation), the label in sentence case, and an `aria-label` for icon buttons.

**Rules**
- Always `radius-pill`. Label in the `button` style (0.85rem / 600; 0.78rem inside book cards).
- Buttons press to `scale(0.97)`.
- Book cards have no Buy now: one row of Add to cart plus the wishlist heart.
- In dark theme the filled button is coral `#f28b7d` with dark text. Never put white text on it.
