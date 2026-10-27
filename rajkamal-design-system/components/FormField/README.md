# FormField

A labelled input, select or textarea for the site's forms: Contact, Publish With Us, Work With Us, Report an Issue, sign in and checkout.

**The consumer provides** the label text (an optional hint in an `<i>`), the control, and an `.fm-err` message. Validation rules come from `kt/forms.js`; add `data-rule` to unusual fields.

**Rules**
- Label in `label` style (0.82rem / 600, `ink-content`), 6px above the control.
- Control: `radius-input` 12px, 11px × 13px padding, 1px `border-content`, `page` fill, 0.92rem text.
- Focus: `accent` border plus `focus-halo`.
- Error: add `.is-bad` to the field. The border and message turn `bad`, and the message says how to fix it ("Enter a 10-digit mobile number").
- Checkbox (`.fm-check`): 18px box in `accent`, label in `ink-muted`.
- Selects use a drawn chevron, not the browser arrow.
