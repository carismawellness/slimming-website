# Carisma Slimming — Site-wide Interaction Design System

Date: 2026-06-21
Branch: `a11y/wcag-contrast-remediation` (continues on top of the WCAG contrast pass)

## Goal
Apply one consistent rounded, animated interaction language across every page of the
live site (the `/preview` redesign is out of scope). Preserve the desktop liquid-glass
nav and the WCAG 2.2 AA contrast achieved in the prior pass.

## Locked decisions
- **Radius:** `--r-pill: 999px` for all buttons; `--r-card: 16px` for cards, inputs,
  containers, images; avatars/icon-chips stay circular.
- **Packages nav:** keep all 7 treatments, reorganized into a 2-column mega-menu.
- **Mobile sticky CTA:** "Book Your Free Consultation" → `/consultation`, mobile only,
  above the cookie banner, suppressed on `/preview`.

## System spec
1. **Tokens & motion** (globals.css): radius tokens; 300ms ease transitions; all
   transforms wrapped in `prefers-reduced-motion: reduce` guards.
2. **Buttons** `.btn` / `.btn-primary` (sage fill) / `.btn-secondary` (outline): pill;
   hover = `scale(1.04)` + color invert + underline reveal. Invert must stay AA
   (sage text `#4f7256` on white = 5.42:1).
3. **Inputs**: 16px radius; focus = ink border `#1a1a1a` + soft 4px outline ring
   (sage `#4f7256`). Fix the `:where()` zero-specificity focus-ring bug so focus is
   never invisible (raise selector specificity).
4. **Cards** `.card`: 16px, soft shadow, border darkens on hover. `.card-lift`
   (review/testimonial cards): hover `translateY(-6px)` + `scale(1.02)` + elevated shadow.
5. **Header**: desktop glass nav unchanged; Packages 2-col mega-menu; mobile logo
   38px → ~26–28px.
6. **Mobile sticky CTA**: new `MobileStickyCTA.tsx`, wired into layout via the chrome
   gate, hidden ≥ md; pages get bottom padding so content is never covered.

## Orchestration
Central tokens agent → nav agent + layout agent → ~14 shared-component agents +
16 page agents (throttled in waves of 6) → QC gate (Playwright), loop until clean.
Collision-free: one file per agent.

## Constraints / QC gates
- Desktop liquid-glass nav preserved.
- No WCAG AA contrast regressions from new hover/invert/focus states.
- `prefers-reduced-motion` respected.
- Mobile sticky CTA sits above the cookie banner and is hidden on desktop.
