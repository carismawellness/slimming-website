# Carisma Slimming — Spacing & Type Scale

The discipline that makes a page read "designed" instead of "AI-generated":
**a tiny type scale, hierarchy from weight + size, and generous breathing room.**
Adapted to the brand fonts in [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md)
(Novecento Wide / Trajan Pro / Roboto) — *not* generic tutorial fonts.

---

## 1. Three sizes. Nothing more.

Most AI-built sites use 6–8 random font sizes and everything competes for
attention. **Use three roles, never more — let weight do the rest.**

| Role | Font | Weight | Size (desktop) | Use |
|---|---|---|---|---|
| **Heading** | Novecento Wide / Trajan Pro | 700–800 | `clamp(2rem, 4vw, 2.75rem)` (~32–44px) | H1/H2 display |
| **Body** | Roboto | 400–500 | `clamp(0.95rem, 1vw, 1.0625rem)` (~15–17px) | Paragraphs, descriptions |
| **Caption** | Novecento Wide | 600–700, **uppercase + tracked** | ~11–12px | Eyebrows, labels, meta |

- Need a "bigger" or "smaller" feel? **Change weight, not size.** Order comes from
  weight + size, never from adding new sizes.
- H3/sub-labels are the **caption** role (uppercase, tracked), not a new size.

---

## 2. Line height & measure (the single biggest readability fix)

- **Body line-height: 1.5×.** Never the cramped 1.1–1.2× that AI defaults to.
- **Measure: 60–80 characters per line.** Cap text columns with
  `max-width: 65ch` (≈ `max-w-[65ch]`). Wider than ~80ch and the eye loses its place.
- **Headings: 1.05–1.15× line-height** (tight is fine for display; never for body).

```css
:root { --measure: 65ch; }
.prose-body { line-height: 1.5; max-width: var(--measure); }
.headline   { line-height: 1.1; }
```

---

## 3. Spacing rhythm

- Space on a consistent scale (Tailwind's `4 / 6 / 8 / 12 / 16 / 24` — i.e. 8px base).
- **Section padding:** `py-20` to `py-28` on desktop; let sections breathe.
- **Within a block:** eyebrow → `mb-3/4`, headline → `mb-5/6`, body → `mb-8`.
- More whitespace around a key message makes it feel important — pair with the
  `.highlight-glow` motif in [`GRADIENT_MOTIF.md`](./GRADIENT_MOTIF.md).

---

## 4. Do / Don't

- ✅ Three type roles; hierarchy from weight + size.
- ✅ 1.5× body line-height, 60–80ch measure.
- ✅ One display font for headings, one for body — consistently.
- ❌ A new font size for every element.
- ❌ Walls of text at full container width.
- ❌ Bright sage `#8EB093` as small body text (decorative only — see DESIGN_GUIDELINES).
