# Toast

A short confirmation that drops in at the top of the screen after an action: added to cart, saved to wishlist.

**The consumer provides** the message and the icon (cart with a tick, heart, or check). On the site, call `toast()` from `kt/mobile-nav.js`.

**Rules**
- Pill on `toast-bg` with `toast-ink` text (it inverts against the theme), 0.88rem / 500.
- Icon in a 34px yellow `toast-icon` disc.
- Appears 92px from the top (below the header), drops in with a slight scale, and leaves after about 2s.
- One line that names what happened: "Added to cart".
