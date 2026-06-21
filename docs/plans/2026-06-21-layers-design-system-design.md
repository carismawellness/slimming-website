# Carisma Slimming — "Layers" Design System

Date: 2026-06-21
Branch: `a11y/wcag-contrast-remediation` (continues on top of the WCAG pass +
the [Interaction Design System](./2026-06-21-interaction-design-system-design.md))
Delivery: ship to `main` (auto-deploy Stop hook is ON), green `npm run build` gated per commit.

## Goal
Add depth and a premium, tactile, lightly-3D feel to the **live site, all pages**
through a small set of composable "layer" effects — applied with **restraint**
("Whisper" intensity). Build on, never duplicate, the existing systems:
- Liquid Gloss already exists in the navbar + `.hero-glass` — promote it to a reusable primitive.
- Gradient **type** language already exists ([GRADIENT_MOTIF.md](../GRADIENT_MOTIF.md):
  `.grad-text`, `.highlight-glow`, `--grad-1/2/3`). Layers adds gradient **backgrounds**, not text.
- Radius/motion tokens (`--r-card: 16px`, `--r-pill`, 300ms ease, reduced-motion guards)
  from the Interaction Design System — reuse them.

## Locked decisions (from brainstorming)
- **Scope:** live site, every page (the `/preview` redesign is out of scope).
- **Intensity:** **Whisper / barely-there.** Effects felt before noticed. If everything
  is decorated, nothing is.
- **Motif:** deliberate accents + faint texture — large faint watermark behind select
  hero/gradient sections (~5–7%) AND thin-line stroke dividers between major sections.
  Subtly multiplied/tiled, never wall-to-wall.
- **Backgrounds:** only augment sections that **already** have a colored gradient. Keep
  the gradient; add localized (not full-width) blurred pulsing blob + faint dot pattern +
  very subtle box grid. Feature cards on top read as slightly raised.
- **Performance/A11y:** CSS-only patterns (no image requests for dots/grid); cap
  `backdrop-filter` layers; blobs animate `transform`/`opacity` only; full
  `prefers-reduced-motion`; never drop text below the locked WCAG AA tokens.

## Tokens (add to `:root` in globals.css)
```css
/* Liquid Gloss */
--lg-glass-bg: rgba(255,255,255,.62);
--lg-glass-blur: 18px;            /* saturate(180%) paired in the class */
--lg-glass-border: rgba(255,255,255,.65);
--lg-glass-inset: rgba(255,255,255,.85);
--lg-glass-shadow: 0 14px 36px rgba(40,55,44,.16);
/* Layer fields (Whisper values) */
--layer-motif-opacity: .06;
--layer-dot-opacity: .03;
--layer-grid-opacity: .025;
--blob-blur: 80px;  --blob-opacity: .22;  --blob-pulse: 10s;
/* Blob hues reuse the brand sweep already defined for the gradient motif */
--grad-1: #024C27;  --grad-2: #124E59;  --grad-3: #6391AB;  /* if not already present */
```

## Primitives (the ONLY way effects are applied — enforces restraint centrally)
1. **`.lg-glass`** — canonical Liquid Gloss surface (frosted bg + `backdrop-filter:
   blur() saturate(180%)` + hairline border + soft shadow + inset top highlight).
   Variant `.lg-glass--panel` (radius `--r-card`) vs default pill.
2. **`.lg-raised`** — feature card lifted off a gradient: layered shadow + 1px light
   edge; optional motion-safe 1-step hover lift. (Distinct from interaction-system
   `.card-lift` which is for hover-interactive review cards.)
3. **`<GradientField>`** — wraps an already-gradient section; renders behind content as
   `aria-hidden` + `pointer-events:none` layers: 1 localized blurred pulsing blob,
   faint CSS dot pattern, very subtle CSS box grid. Props to toggle each + position blob.
4. **`<MotifAccent>`** — renders the motif from `/public/motifs/strokes.svg` via CSS
   `mask` (so color/opacity follow tokens, not the asset's hardcoded `#96B2B2`).
   Modes: `watermark` (large, faint, edge-anchored) and `divider` (thin stroke band).

## Motif asset
Save the provided SVG to `public/motifs/strokes.svg` (optimized). Recolor via mask;
never inline the hardcoded stroke color. A horizontally-tiling variant may be derived
for divider use.

## Per-page application map (Whisper)
| Surface | Gloss | Blob | Dots | Grid | Motif |
|---|---|---|---|---|---|
| Footer (redo) | panel | — | faint | — | divider |
| Home | hero chips, cards | hero + 1 mid | yes | yes | watermark + dividers |
| /glp1, /weight-loss | cards, CTA | in existing gradients | yes | subtle | divider |
| /slimming-guide | cards | yes | yes | — | divider |
| /consultation | form card | 1 soft | faint | — | divider |
| /packages/* (×7) | spec cards `.lg-raised` | 1 soft/hero | faint | — | divider |
| Shared (PageHero, EvidenceCards, ModalitiesCarousel, ResultsCarousel, PackagePage, BrandBlock) | per component | where gradient exists | faint | subtle | accents |

## Footer redo
Re-skin only — keep ALL current content, links, and SEO. Contact panel + bottom bar
become an `.lg-glass--panel` floating over the existing soft sage gradient, with a
`<MotifAccent mode="divider">` above "STAY IN TOUCH".

## Orchestration (mirrors the interaction-system pattern; collision-free)
1. **Foundation commit (1 agent / me):** tokens + `.lg-glass`/`.lg-raised` in globals.css,
   `GradientField` + `MotifAccent` components, motif asset. Build must pass.
2. **Application agents in parallel — one file per agent, disjoint sets:** footer; home;
   glp1; weight-loss; slimming-guide; consultation; packages template + 7 data-driven
   pages (PackagePage is shared, so one agent); shared components.
3. **QC gate:** consistency review against "Whisper" budget, `npm run build`, Playwright
   mobile before/after screenshots. Loop until clean.

## Constraints / QC gates
- Liquid-glass nav preserved; no WCAG AA regressions; `prefers-reduced-motion` respected.
- No raw-image background requests; one blob + one glass layer per viewport where feasible.
- Restraint check: at most one motif watermark + one highlight moment per view.
- `npm run build` green before every commit (production is build-gated, but keep history clean).
