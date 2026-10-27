# Chip

A pill toggle for filtering lists: genres, author letters (अ आ इ / A B C), order status, the policy switcher on phones.

**The consumer provides** a `<button>` with the label, an optional count in an `<i>`, and `aria-pressed` for the selected state.

**Rules**
- `chip` style (0.86rem / 500), 1px `border`, `radius-pill`, 8px × 14px padding. `.au-chip--sm` is 6px × 12px at 0.8rem.
- Hover fills with `accent-soft`. Selected (`aria-pressed="true"`) fills with `accent` and `on-accent` text.
- Counts use tabular figures in a 2-character slot so chips keep their width when numbers change.
- Long rows scroll sideways inside a strip (`kt/strip.js`) with a thin position indicator, edge to edge on phones.
