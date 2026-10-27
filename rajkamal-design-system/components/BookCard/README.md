# BookCard

The one book card used everywhere a book appears: home shelves, All Books, collections, author and imprint pages, related books and offers.

**Anatomy, top to bottom:** square cover in `cover-well`, genre line (`category`, uppercase, `accent`), title (`book-title`, 2 lines max), author (`meta`, 75% opacity), price row (`price` in `accent`, struck original at 50%, discount Tag), then actions (Add to cart + wishlist heart).

**The consumer provides** the cover image URL, romanised title, author, genre, selling price, original price, discount percent, the book page link and stock state. On the site the markup comes from `RKBookCard` in `kt/book-card.js`.

**Rules**
- Show the cover whole (`object-fit: contain`) and draw nothing on it. The discount sits beside the price.
- No cover image: `.hm-cover.no-img` shows the title in white on a warm brown block instead of a broken image.
- Out of stock: replace the actions with the `.hm-oos` pill ("Out of stock").
- Every card in a row has the same height: title fixed at 2 lines, author and genre at 1 line with ellipsis.
- Grid: `repeat(auto-fill, minmax(210px, 1fr))`. On phones, always 2 columns, title 0.86rem, discount tag on its own line.
- `radius-card` 16px, 1px `border`, `shadow-card` (none in dark).
