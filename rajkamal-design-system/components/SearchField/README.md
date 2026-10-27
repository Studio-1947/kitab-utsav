# SearchField

A pill search box for lists (Authors, E-Books, the All Books filter bar) with a leading magnifier icon.

**The consumer provides** the `<input type="search">` with a placeholder and an accessible label, and the filtering logic.

**Rules**
- 46px tall (44px and full width on phones), `radius-pill`, `surface-card` fill, 1px `border`.
- Focus: border turns `accent` with a 3px `accent-soft` halo.
- Input text is 16px so phones do not zoom on focus. Placeholder at 50% opacity.
