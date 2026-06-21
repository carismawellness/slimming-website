# Carisma Slimming — Key-Message Gradient Motif

A reusable, brand-coloured way to make the **one key word / key message** in a
heading pop — the same family as the `.cta-glow` button treatment (soft brand
gradient + blurred glow halo + depth shadow), applied to **type** instead of a pill.

Use it sparingly: **one highlighted phrase per hero / per section.** If everything
is highlighted, nothing is. Pairs with the spacing rules in
[`SPACING_AND_TYPE.md`](./SPACING_AND_TYPE.md) — generous space first, gradient second.

> Colours below reference the brand palette in [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md).
> Keep them in sync with the canonical tokens — change them here only by changing the tokens.

---

## Brand gradient stops

A green → teal → slate-blue sweep (the brand's cool family), warm enough to feel
premium, never the rainbow of a generic AI site.

| Token | Hex | Role in the sweep |
|---|---|---|
| Deep forest green | `#024C27` | Start (anchor, AAA as solid text) |
| Dark teal | `#124E59` | Mid |
| Slate blue | `#6391AB` | End (decorative-only as solid, fine inside a gradient) |
| Sage (alt mid) | `#8EB093` | Optional lighter mid for large display |
| Gold | `#D4AF37` | Optional warm accent stop — use rarely, for premium copy |

CSS variables (add to `:root` in `globals.css`):

```css
:root {
  --grad-1: #024C27;  /* deep forest */
  --grad-2: #124E59;  /* dark teal   */
  --grad-3: #6391AB;  /* slate blue  */
  --grad-angle: 100deg;
}
```

---

## 1. Gradient text — the highlighted key word

Mirrors the CTA's gradient fill, clipped to the glyphs. **Display sizes only**
(hero H1 / large H2). Never on body or small text — clipped gradient text drops
below AA contrast at small sizes.

```css
/* Highlight one key word inside a heading: <span class="grad-text">searching</span> */
.grad-text {
  background-image: linear-gradient(
    var(--grad-angle),
    var(--grad-1) 0%,
    var(--grad-2) 50%,
    var(--grad-3) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  /* Fallback for browsers without background-clip: text */
  -webkit-text-fill-color: transparent;
}

/* Accessibility / robustness fallback: if clip isn't supported, show solid forest */
@supports not ((-webkit-background-clip: text) or (background-clip: text)) {
  .grad-text { color: var(--grad-1); -webkit-text-fill-color: var(--grad-1); }
}
```

**React usage** (highlight the keyword, leave the rest of the line solid):

```tsx
<h1>
  Rank where your customers are <span className="grad-text">searching</span>.
</h1>
```

---

## 2. Highlight glow — the soft gradient + blur + depth behind a key message

The type-block sibling of `.cta-glow`: a faint brand-gradient wash with a blurred
halo and soft depth shadow, sitting *behind* a key message block (a stat, a promise,
a one-line value prop). Subtle — it should read as "lit", not as a coloured box.

```css
/* Wrap a key message: <div class="highlight-glow"> … </div> */
.highlight-glow {
  position: relative;
  isolation: isolate;
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  /* faint brand wash */
  background-image: linear-gradient(
    135deg,
    rgba(2, 76, 39, 0.06) 0%,
    rgba(99, 145, 171, 0.06) 100%
  );
  /* depth shadow + inset top highlight — same recipe as .cta-glow */
  box-shadow:
    0 10px 30px -8px rgba(2, 76, 39, 0.18),
    0 2px 8px -2px rgba(18, 78, 89, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

/* the blurred halo */
.highlight-glow::before {
  content: "";
  position: absolute;
  inset: -1px;
  z-index: -1;
  border-radius: inherit;
  background: linear-gradient(135deg, var(--grad-1), var(--grad-3));
  opacity: 0.18;
  filter: blur(22px);
}

@media (prefers-reduced-motion: reduce) {
  .highlight-glow { transition: none; }
}
```

**React usage:**

```tsx
<p className="highlight-glow text-lg">
  Lose up to <strong>1&nbsp;kg a week</strong> — medically measured, verified, and
  reviewed by a doctor every step.
</p>
```

---

## Rules

- **One highlight per view.** One gradient word in the hero H1; at most one
  `highlight-glow` block per section.
- **Display type only** for `.grad-text` (≥ ~28px). Body stays solid ink.
- **Keep contrast.** The surrounding heading text stays a solid AAA colour
  (`#1A1A1A` ink or `#024C27` forest); the gradient is the *accent*, not the whole line.
- **Brand sweep, not rainbow.** Cool green→teal→slate; gold only for rare premium copy.
- **Respect spacing first.** The effect works because the type around it is generous
  and calm — see [`SPACING_AND_TYPE.md`](./SPACING_AND_TYPE.md).
- Sibling pattern: the button equivalent is `.cta-glow` in `globals.css`.

---

## Rollout (when the design-system refactor settles)

1. Add the `--grad-*` vars + `.grad-text` / `.highlight-glow` to `globals.css`.
2. Optionally wrap as `<GradientText>` / `<HighlightGlow>` components for ergonomics.
3. Apply **one** gradient keyword to each page's hero H1 (heroes are centralised in
   `components/PageHero.tsx`, so most of this is one prop), and one `highlight-glow`
   to each page's single most important message.
