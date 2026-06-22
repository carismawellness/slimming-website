# Carisma Slimming — Design Language (Master Reference)

The single source of truth for the look & feel of the site, distilled from the
home page. Every page must follow this. Pairs with:
- [`DESIGN_GUIDELINES.md`](./DESIGN_GUIDELINES.md) — palette + logo + the Trajan rule
- [`SPACING_AND_TYPE.md`](./SPACING_AND_TYPE.md) — type scale + spacing rhythm
- [`GRADIENT_MOTIF.md`](./GRADIENT_MOTIF.md) — gradient-highlight motif
- [`PAGE_REDESIGN_PLAYBOOK.md`](./PAGE_REDESIGN_PLAYBOOK.md) — how to apply this to a page

**Design ethos:** doctor-led medical authority + serene wellness + premium accessibility.
Calm and restrained, never aggressive. Depth comes from *subtle layers* (gradients,
soft dots/blobs, glass, a drifting motif), not loud effects.

---

## 1. Color tokens (canonical — `globals.css`)

**Greens (brand)**
| Hex | Role | Text use |
|---|---|---|
| `#024C27` deep forest | primary, headlines, focus ring | ✅ AAA on white |
| `#3c5a40` dark sage | section headings (H2/H3) | ✅ |
| `#4f7256` sage | buttons, links, icons, eyebrows | ✅ AA (5.42:1) |
| `#8EB093` mid sage | **decorative only** | ❌ never as text on light (2.39:1) |
| `#C9D8C1` light sage | gradient/decorative fills | ❌ |

**Neutrals:** ink `#1a1a1a` · body `#333333` · secondary `#595959` · taupe `#6f6456` · card-body taupe `#5a5043`
**Accents (decorative unless noted):** dark teal `#124e59` (AAA text ok) · slate blue `#6391ab` (decorative) · gold `#D4AF37` deco / `#8c6d18` text
**Surfaces:** white `#ffffff` · cream `#f6f4ef` · soft sage wash `#eef3ea` · `#f5f8f2` · `#D7E2D8` · `#F2F6EF` · warm `#F8F6F2` · beige `#efe7d7`
**Lines:** hairline `#E5DED7` · card border `#EAE4DB` · divider rules `#C9B8AE` / `#B9A99E`

**Rules:** never `#8EB093` (or slate/bronze/gold-deco) as small text on light; never `#024C27` as a section **background** (banned — it caused black-box regressions).

---

## 2. Typography

- **Trajan Pro** → all headings (H1–H6). **ALWAYS uppercase** (enforced globally `h1–h6{text-transform:uppercase}`; never mixed/title case — it small-caps ugly). `.font-script` is the only opt-out.
- **Novecento Wide Book** → eyebrows, labels, CTA text, nav (uppercase + tracked).
- **Roboto** → body copy.
- Scale (three roles, hierarchy from weight+size, not variety):
  - H1 hero `clamp(26px,3vw,35px)` 400 `#4f7256`
  - H2 section `clamp(24px,3.4vw,34px)` 400 `#3c5a40` (deep stat headings `#024C27`)
  - H3/eyebrow `11–18px` Novecento, letter-spacing `2.5–3.5px`
  - Body Roboto `13–16px`, line-height **1.5–1.6**, measure ~60–80ch
- Letter-spacing: eyebrows `3px`; headings `0.5–2px`.

---

## 3. The signature: continuous gradient flow

Sections never butt different flat colors against each other. Each section's
**end color = the next section's start color**, so the page reads as one evolving
wash (white → sage → white …). **No hard borders, no divider bands between sections.**

Reference chain (home):
```
Hero      radial-gradient(120% 90% at 85% 10%, #eef3ea 0%, #f6f4ef 45%, #ffffff 100%)
…white sections…  #ffffff
Results   linear-gradient(180deg,#ffffff 0%, #f5f8f2 100%)
GLP-1     linear-gradient(180deg,#f5f8f2 0%, #D7E2D8 48%, #FFFFFF 100%)   ← starts at Results' end
next      #ffffff                                                          ← matches GLP-1's end
```
When you add/replace a section, pick its gradient so both seams match its neighbors.

---

## 4. Section header pattern (use on every content section)

```
[eyebrow]   Novecento 12px, #4f7256, letter-spacing 3px, UPPERCASE
[rule]      width 64px, height 1px, background #4f7256, centered, margin 18px auto
[H2]        Trajan, clamp(24px,3.4vw,34px), #3c5a40, UPPERCASE, line-height 1.25
[sub]       Roboto 16px, #595959, line-height 1.6, max-width ~620px, centered
```

---

## 5. Above-the-fold HERO (PageHero) — REQUIRED on every page

Use `<PageHero …/>` for every page's hero. **Always pass `motif`** so the animated
`<HeroMotif/>` renders (this is a brand signature — it must be on every above-the-fold).

- Background default: the hero radial sage wash (above).
- Layout: copy left (≈60%) / arch media right (≈40%); full-height `100svh`-ish.
- Copy: optional `#1 voted` pill → eyebrow → **H1** (Trajan, `em:true` word renders lighter sage `#7ba587`) → sub → bullets (sage check badges) → **primary `.cta-glow`** + **secondary outline** → proof line (stars · "4.9 · 800+ verified reviews").
- Media: **arch** frame `border-radius: 210px 210px 22px 22px`, shadow `0 30px 70px -28px rgba(40,55,44,.45)`; floating `.hero-glass` proof cards (blur 14px, `cx-float` animation).
- `HeroMotif`: 2D-canvas sage "constellation" — soft dots drift up + link to neighbors + repel from cursor; lazy, offscreen-paused, **static under reduced-motion**.

---

## 6. Component patterns

**CTA `.cta-glow`** — sage gradient pill `linear-gradient(135deg,#557b5b,#4f7256,#3e5c44)` + glow halo + underline-reveal + `scale(1.04)` hover (reduced-motion-safe). Primary CTA everywhere.

**Outline button** — 1.5px `#4f7256` border, sage text, pill `999px`; hover fills sage / white text.

**Treatment carousel card** (light, on-brand): image top (206px, cover) → white panel → Trajan title `#3c5a40` → Roboto `#595959` (4-line clamp) → sage outline Explore (hover-fills) → card `border 1px #EAE4DB`, radius `20px`, shadow `0 10px 30px rgba(60,90,64,.10)`, hover lift `-6px` + image `scale(1.05)`. Prev/next arrows are 52px white pills. **Never dark photo-overlay cards.**

**Pillar card** — gradient `linear-gradient(180deg,#F2F6EF,#C9D8C1)`, organic radius `18px/90px/90px/18px`, icon + Novecento title `#3c5a40` + checklist.

**Stat trio** — Trajan value `clamp(40–60px)` `#024C27` + Novecento label + Roboto desc; thin sage dividers; staggered fade-rise reveal.

**Footer** — one unified gradient `<footer>` (sage wash), no dark green. Columns: brand (+ Instagram grid) · Explore · Get in touch; slim search; bottom-right **parallax rose motif** (`FooterRose`: SVG mask, sage `#AECBB4`, drifts with cursor, bottom-petals just kissing the bottom edge).

---

## 7. Radii · shadows · motion

- **Radii:** pills/badges `999px`; cards/containers/inputs `16–20px`; hero arch `210px/22px`; images `10–20px`.
- **Shadows:** subtle `0 4px 16px rgba(40,55,44,.08)` · card hover `0 10px 28px rgba(40,55,44,.16)` · lift `0 22px 48px -12px rgba(40,55,44,.28)` · hero arch `0 30px 70px -28px rgba(40,55,44,.45)`.
- **Motion:** 0.3s ease (hovers), 0.7s cubic reveals, parallax 0.6s. **Every animation wrapped in `prefers-reduced-motion: reduce`.** Lazy-load media; pause offscreen canvases.

---

## 8. Accessibility (locked)

- WCAG **AA** color tokens only (see §1). One `<h1>` per page; logical H1→H2→H3.
- Focus ring `3px #024c27` (white ring + sage halo on dark/CTA). Inputs: `16px` radius + sage focus ring.
- Skip-to-content link. Decorative layers `aria-hidden` + `pointer-events:none`. Non-color link cues (underline).

---

## 9. Do / Don't

✅ Continuous gradients between sections · Trajan uppercase · light cards · `.cta-glow` primary · `motif` hero on every page · reduced-motion guards · generous spacing.
❌ Flat color seams / divider bands · mixed-case Trajan · `#024C27` backgrounds · `#8EB093` as text · dark overlay cards · animations without reduced-motion · new font sizes (use weight).
