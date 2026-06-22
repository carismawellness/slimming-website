# Page Redesign Playbook — apply the home-page design language to any page

Follow this to bring any page up to the home-page standard. Read
[`DESIGN_LANGUAGE.md`](./DESIGN_LANGUAGE.md) first — it's the source of truth.

## Goal
Every page should feel like it belongs to the same premium, calm, doctor-led
system as the home page: continuous sage gradient flow, Trajan-uppercase headings,
light on-brand cards, `.cta-glow` CTAs, and **the animated above-the-fold motif**.

## Non-negotiables (every page)
1. **Above-the-fold motif** — the hero MUST render the animated `<HeroMotif/>`.
   - If the page uses `<PageHero …/>`: add the `motif` prop.
   - If it has a bespoke hero: import `HeroMotif` and render it behind the hero
     content (`position:relative` wrapper; motif `aria-hidden`, `pointer-events:none`,
     behind via z-index), exactly as PageHero does.
2. **Continuous gradient flow** — no flat-color seams or divider bands between
   sections. Each section's end color = the next section's start color (see
   DESIGN_LANGUAGE §3). Replace any hard `#fff`→color jumps and remove
   `MotifAccent mode="divider"` bands used as separators.
3. **Trajan headings UPPERCASE**, exactly one `<h1>`, logical H1→H2→H3.
4. **Colors from the locked tokens only** — never `#8EB093` as text, never
   `#024C27` as a section background, body text `#333`/`#595959`, headings
   `#3c5a40`/`#024C27`, sage `#4f7256` for buttons/links/icons.
5. **Cards = light pattern** (image/white panel, green Trajan title, taupe copy,
   sage outline button). Replace any dark photo-overlay or dark-green panels.
6. **CTAs** use `.cta-glow` (primary) and the sage outline (secondary).
7. **Section headers** use the eyebrow → 64px rule → Trajan H2 → sub pattern.
8. **Reduced-motion**: every animation guarded; media lazy-loaded.

## Per-section pass
- Hero → `PageHero` with `motif`, proof block, primary+secondary CTA.
- Content sections → apply the section-header pattern; set backgrounds so the
  gradient flows from the section above into the one below.
- Any card grids/carousels → the light card pattern + soft shadow + hover lift.
- Stats/commitments → the stat-trio pattern.
- Keep the global footer untouched (it's already on-system).

## Don't
- Don't restructure copy or routes/SEO (titles, canonicals, JSON-LD, FAQ data) —
  this is a *visual/design* pass. Preserve metadata and content meaning.
- Don't introduce new fonts or new type sizes (hierarchy from weight + size).
- Don't add heavy JS; reuse existing components/classes.

## QC checklist (the QC agent verifies each page)
- [ ] Hero renders `HeroMotif` (motif present in the above-the-fold).
- [ ] No flat-color seam or divider band between any two sections (gradients flow).
- [ ] No `#024C27` background; no `#8EB093` text; no dark overlay cards.
- [ ] Headings Trajan + uppercase; exactly one `<h1>`; logical order.
- [ ] CTAs use `.cta-glow` / sage outline; cards use the light pattern.
- [ ] `prefers-reduced-motion` respected; images lazy.
- [ ] `npm run build` passes (compile + TypeScript).
