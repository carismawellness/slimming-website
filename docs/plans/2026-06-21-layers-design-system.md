# Layers Design System — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a restrained ("Whisper") depth system — Liquid Gloss surfaces, brand-motif accents, and gradient-background fields (blob + dots + box grid) — across every live page of the Carisma Slimming site.

**Architecture:** One central foundation (CSS tokens + classes in `globals.css`, two presentational React components, one SVG asset) defines the *only* sanctioned way to apply effects. Application tasks then compose those primitives into individual page/component files — one file per task so they never collide. Build on the existing Interaction Design System (`--r-card`, `--r-pill`) and Gradient-Motif type language (`.grad-text`, `.highlight-glow`, `--grad-*`); do not duplicate them.

**Tech Stack:** Next.js 16 (App Router, Turbopack, React 19 server components), Tailwind v4, plain CSS in `app/globals.css`. No new dependencies.

**Verification model (replaces TDD for this visual work):** every task ends with `npm run build` (must compile + typecheck) and, for visual tasks, a Playwright mobile screenshot (390×844) compared against the previous state for the Whisper budget. Commit after each green task (auto-deploy hook pushes to `main`).

**Restraint budget (hard rule):** per viewport — at most ONE motif watermark, ONE highlight/gloss focal moment, ONE blurred blob region, ONE backdrop-filter glass layer. Dots/grid are flat CSS (cheap) but stay ≤ token opacities. If a section already has a `.cta-glow` or `.highlight-glow`, it does NOT also get a blob.

---

## Task 1: Motif asset

**Files:**
- Create: `public/motifs/strokes.svg` (the user-provided motif — flowing stroke lines, viewBox `0 0 338 96`)

**Step 1:** Save the provided motif SVG verbatim to `public/motifs/strokes.svg`. Keep its intrinsic `stroke="#96B2B2"` — it will be recolored at use sites via CSS `mask`, so the fill color in the file is irrelevant when masked.

**Step 2:** Verify it loads: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/motifs/strokes.svg` after `npm run dev`, OR confirm the file exists and is valid XML (`xmllint --noout public/motifs/strokes.svg` if available, else open in browser).

**Step 3: Commit**
```bash
git add public/motifs/strokes.svg
git commit -m "feat(layers): add brand motif stroke asset"
```

---

## Task 2: Foundation tokens + Liquid Gloss + layer-field CSS

**Files:**
- Modify: `app/globals.css` (append a new clearly-commented `LAYERS` block at end; add tokens inside existing `:root`)

**Step 1:** Inside the existing `:root { … }`, after `--white`, add (only `--grad-*` if not already present — check first, GRADIENT_MOTIF may already own them):
```css
  /* ---- Layers design system ---- */
  --grad-1: #024c27;  --grad-2: #124e59;  --grad-3: #6391ab;   /* brand sweep (skip if already defined) */
  --lg-glass-bg: rgba(255,255,255,.62);
  --lg-glass-blur: 18px;
  --lg-glass-border: rgba(255,255,255,.65);
  --lg-glass-inset: rgba(255,255,255,.85);
  --lg-glass-shadow: 0 14px 36px rgba(40,55,44,.16);
  --layer-motif-opacity: .06;
  --layer-dot-opacity: .03;
  --layer-grid-opacity: .025;
  --blob-blur: 80px;  --blob-opacity: .22;  --blob-pulse: 10s;
```

**Step 2:** Append the LAYERS class block at the end of `globals.css`:
```css
/* ============================================================
   LAYERS DESIGN SYSTEM — depth primitives (Whisper intensity)
   ============================================================ */

/* Liquid Gloss surface — the navbar/.hero-glass recipe, reusable. */
.lg-glass {
  background: var(--lg-glass-bg);
  backdrop-filter: blur(var(--lg-glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--lg-glass-blur)) saturate(180%);
  border: 1px solid var(--lg-glass-border);
  box-shadow: var(--lg-glass-shadow), inset 0 1px 0 var(--lg-glass-inset);
}
.lg-glass--panel { border-radius: var(--r-card, 16px); }   /* default callers add their own pill radius */

/* Raised feature card — sits visibly above a gradient field. */
.lg-raised {
  background: #fff;
  border: 1px solid rgba(40,55,44,.06);
  border-radius: var(--r-card, 16px);
  box-shadow: 0 1px 2px rgba(40,55,44,.06), 0 12px 28px -12px rgba(40,55,44,.22),
              inset 0 1px 0 rgba(255,255,255,.9);
  transition: transform .3s ease, box-shadow .3s ease;
}
.lg-raised--hover:hover { transform: translateY(-3px);
  box-shadow: 0 2px 4px rgba(40,55,44,.08), 0 20px 40px -16px rgba(40,55,44,.28),
              inset 0 1px 0 rgba(255,255,255,.9); }

/* Flat CSS texture layers (zero image requests) — placed by GradientField. */
.layer-dots {
  background-image: radial-gradient(circle, rgba(2,76,39,1) 1px, transparent 1px);
  background-size: 22px 22px;
  opacity: var(--layer-dot-opacity);
}
.layer-grid {
  background-image:
    linear-gradient(rgba(18,78,89,1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(18,78,89,1) 1px, transparent 1px);
  background-size: 64px 64px;
  opacity: var(--layer-grid-opacity);
}

/* Localized pulsing blob. */
.layer-blob {
  position: absolute;
  width: 42vw; max-width: 460px; aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%,
    rgba(99,145,171,.9) 0%, rgba(2,76,39,.55) 45%, transparent 70%);
  filter: blur(var(--blob-blur));
  opacity: var(--blob-opacity);
  animation: lg-pulse var(--blob-pulse) ease-in-out infinite;
}
@keyframes lg-pulse {
  0%,100% { transform: scale(1);    opacity: calc(var(--blob-opacity) * .85); }
  50%     { transform: scale(1.12); opacity: var(--blob-opacity); }
}

/* Motif accent (recolored via mask so opacity/color follow tokens). */
.layer-motif {
  background-color: var(--grad-2);
  -webkit-mask: url(/motifs/strokes.svg) no-repeat center / contain;
  mask: url(/motifs/strokes.svg) no-repeat center / contain;
  opacity: var(--layer-motif-opacity);
}
.layer-motif--divider { -webkit-mask-repeat: repeat-x; mask-repeat: repeat-x;
  -webkit-mask-size: auto 100%; mask-size: auto 100%; }

@media (prefers-reduced-motion: reduce) {
  .layer-blob { animation: none; }
  .lg-raised, .lg-raised--hover:hover { transition: none; }
}
```

**Step 3:** Run `npm run build`. Expected: compiles, no TS/CSS errors.

**Step 4: Commit**
```bash
git add app/globals.css
git commit -m "feat(layers): add Liquid Gloss + layer-field tokens and classes"
```

---

## Task 3: `GradientField` + `MotifAccent` components

**Files:**
- Create: `components/layers/GradientField.tsx`
- Create: `components/layers/MotifAccent.tsx`

**Step 1:** `MotifAccent.tsx` — pure server component, decorative (aria-hidden):
```tsx
type Props = {
  mode?: 'watermark' | 'divider';
  className?: string;
  style?: React.CSSProperties;
};
export default function MotifAccent({ mode = 'watermark', className = '', style }: Props) {
  const base: React.CSSProperties =
    mode === 'divider'
      ? { width: '100%', height: 28, ...style }
      : { width: 'min(60vw, 680px)', aspectRatio: '338 / 96', ...style };
  return (
    <span
      aria-hidden
      className={`layer-motif ${mode === 'divider' ? 'layer-motif--divider' : ''} ${className}`}
      style={{ display: 'block', pointerEvents: 'none', ...base }}
    />
  );
}
```

**Step 2:** `GradientField.tsx` — wraps a section; renders decorative layers behind children. Children must establish stacking via `position: relative`.
```tsx
import MotifAccent from './MotifAccent';
type Props = {
  children: React.ReactNode;
  blob?: false | { top?: string; left?: string; right?: string; bottom?: string };
  dots?: boolean;
  grid?: boolean;
  motif?: false | 'watermark';
  className?: string;
  style?: React.CSSProperties;
};
export default function GradientField({
  children, blob = { top: '10%', right: '-6%' }, dots = true, grid = false,
  motif = false, className = '', style,
}: Props) {
  return (
    <div className={className} style={{ position: 'relative', isolation: 'isolate', overflow: 'hidden', ...style }}>
      <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        {dots && <span className="layer-dots" style={{ position: 'absolute', inset: 0 }} />}
        {grid && <span className="layer-grid" style={{ position: 'absolute', inset: 0 }} />}
        {blob && <span className="layer-blob" style={{ position: 'absolute', ...blob }} />}
        {motif && (
          <MotifAccent mode="watermark"
            style={{ position: 'absolute', right: '-4%', bottom: '-8%', opacity: 'var(--layer-motif-opacity)' }} />
        )}
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
```

**Step 3:** Run `npm run build`. Expected: compiles.

**Step 4: Commit**
```bash
git add components/layers/
git commit -m "feat(layers): add GradientField + MotifAccent primitives"
```

---

## Task 4: Footer redo (proof-of-concept surface)

**Files:**
- Modify: `components/Footer.tsx`

**Steps:** Wrap the contact panel + bottom bar in `.lg-glass--panel` floating over the existing sage gradient (keep the gradient on `<footer>`). Add `<MotifAccent mode="divider" />` immediately above the "STAY IN TOUCH" heading. Preserve ALL existing links, copy, icons, ARIA, and the AA color tokens. Do not change layout/structure beyond adding the glass wrapper + divider.

**Verify:** `npm run build`; `npm run dev` + Playwright at 390×844 — confirm glass panel renders, divider is faint, all links present, no horizontal overflow, contrast unchanged.

**Commit:** `git add components/Footer.tsx && git commit -m "feat(layers): re-skin footer with Liquid Gloss panel + motif divider"`

---

## Tasks 5–13: Per-surface application (one file per task — parallel-safe)

For EACH task: import `GradientField`/`MotifAccent` and/or apply `.lg-glass*` / `.lg-raised`. Only augment sections that ALREADY have a colored gradient. Respect the restraint budget. Preserve all copy, props, classNames, SEO/JSON-LD, and AA tokens (per repo CLAUDE.md "surgical edits"). End each with `npm run build` + a 390×844 Playwright screenshot, then commit `feat(layers): apply depth to <surface>`.

- **Task 5 — `app/page.tsx` (home):** hero gradient → `GradientField` (blob + dots + grid + `motif="watermark"`); feature/benefit cards → `.lg-raised`; one motif divider between major sections. Budget: one watermark total.
- **Task 6 — `app/glp1/page.tsx`:** existing gradient sections → `GradientField` (blob + dots); CTA stays `.cta-glow` (no blob beside it); spec cards → `.lg-raised`; one divider.
- **Task 7 — `app/weight-loss/page.tsx`:** same pattern as glp1.
- **Task 8 — `app/slimming-guide/page.tsx` (+ `OutcomeStepper.tsx`):** gradient sections → `GradientField` (blob + dots); cards → `.lg-raised`; divider.
- **Task 9 — `app/consultation/page.tsx`:** wrap the form column in `.lg-glass--panel` (do NOT touch the GHL iframe markup); one soft blob behind it; faint dots; divider.
- **Task 10 — `components/PackagePage.tsx` (shared template → covers all 7 `/packages/*`):** hero gradient → `GradientField` (one soft blob + faint dots); spec cards → `.lg-raised`; divider. Verify on 2–3 of the 7 routes.
- **Task 11 — `components/PageHero.tsx`:** promote the existing `.hero-glass` proof cards (already gloss — leave) and ensure its blurred backdrop uses the blob token; add optional `motif` watermark prop (off by default).
- **Task 12 — `components/EvidenceCards.tsx` + `components/ModalitiesCarousel.tsx`:** cards → `.lg-raised`; where each has a gradient, add faint dots only (no blob — these are dense).
- **Task 13 — `components/ResultsCarousel.tsx` + `components/BrandBlock.tsx`:** BrandBlock gradient → `GradientField` (blob + faint dots + divider); ResultsCarousel cards → `.lg-raised`.

---

## Task 14: QC gate + consistency pass

**Steps:**
1. `npm run build` (final, must be green).
2. Playwright sweep at 390×844 AND 1280×800 over `/`, `/glp1`, `/weight-loss`, `/slimming-guide`, `/consultation`, `/packages/fat-freezing`, footer — capture screenshots.
3. Restraint audit: confirm ≤1 watermark, ≤1 blob, ≤1 glass layer per viewport; no section both `.cta-glow` and blob; dot/grid opacities at token values.
4. A11y: re-run a contrast spot-check on any text now sitting over a field; toggle `prefers-reduced-motion` and confirm blobs freeze.
5. Fix any drift (re-dispatch the owning task), then commit `chore(layers): QC consistency + mobile screenshots`.

---

## Orchestration note
Tasks 1–3 are sequential (foundation; later tasks depend on them). Task 4 validates the look on one surface — get a human glance before fanning out. Tasks 5–13 touch disjoint files and can run in parallel (subagents), then Task 14 gates. Each task self-verifies with build + screenshot before commit; the auto-deploy hook ships each green commit to production.
