# Doctor 3D Carousel Showcase — Design

Date: 2026-06-22
Branch: current working branch (live site auto-deploys on commit)

## Goal
Replace the tedious long-scroll stack of three doctor profiles in the global
`BrandBlock` with an award-winning **3D coverflow carousel** (Three.js) that shows
one screen, no scroll, with premium motion — without hurting mobile performance.

## Approved decisions (brainstorming)
- **Layout:** true Three.js **3D card carousel**, **coverflow style** (front card flat
  and large, side cards recede/dim).
- **Bio:** **tight 2–3 line highlight** per doctor (distilled from the full bio by us),
  with **"Read more"** expanding the full bio in place. Full text stays in the DOM (SEO).
- **Scope:** the global `BrandBlock` doctors section (the homepage/global-bottom one).
  Component is reusable elsewhere later.

## The three doctors (content source: current `BrandBlock` DOCTORS array)
1. Dr. Zaid Teebi — Medical Consultant · 30+ years (slimming/weight-loss lead)
2. Dr. Giovanni Scornavacca — Aesthetic Doctor · 20+ years
3. Dr. Francesca Chircop — Medical Aesthetics · 8+ years
Each has a portrait image (reuse the existing `image` paths) + a long bio (kept as `fullBio`).

## Layout & interaction
- Section: eyebrow + H2 "Meet Your Doctors".
- **3D ring of 3 portrait cards** (coverflow): front-center card large/sharp; side cards
  angled back + dimmed. **Drag/swipe to spin**; **‹ ›** buttons + dots; clicking a side
  card brings it to front. Subtle idle drift (motion-safe).
- **HTML panel for the active doctor** (not in WebGL): name · role · years · highlight ·
  Read-more (expands fullBio) · **[Book Free Body Analysis]** (dispatches the existing
  `openConsultationModal` event). Desktop = canvas left / panel right; mobile = canvas top
  / panel below.

## Why text is HTML, not WebGL
Portraits live in the 3D scene (the motion); all names/roles/bios are DOM text → crisp,
accessible, SEO-safe. Canvas is `aria-hidden`; a visually-hidden list of all three doctors
+ real prev/next buttons drive switching for keyboard/SR users.

## Performance & safety (load-bearing)
- `three` is **code-split** via `next/dynamic(..., { ssr:false })` — not in the initial bundle.
- Canvas **mounts only when the section scrolls into view** (IntersectionObserver).
- Render loop **pauses when offscreen**; geometries/materials/textures **disposed** on unmount;
  `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))`.
- **`prefers-reduced-motion`** → no auto-spin/tween; instant switch.
- **Graceful fallback** → if WebGL is unavailable or context lost, render a flat CSS
  swipe-carousel / featured-switcher of the same cards. Never a broken canvas.
- Scene is minimal: 3 textured planes (no post-processing / heavy shaders).

## Components & data
- `lib/doctors.ts` — single source of truth: `{ name, role, years, highlight, fullBio, image }[]`.
- `components/doctors/DoctorShowcase.tsx` — client wrapper: active-index state, HTML panel,
  lazy-mount via IntersectionObserver + dynamic import, reduced-motion / no-WebGL fallback,
  prev/next + dots, keyboard support.
- `components/doctors/DoctorCarousel3D.tsx` — Three.js coverflow scene (dynamic, `ssr:false`).
  Props: `images`, `activeIndex`, `onActiveChange`, `reducedMotion`. Owns scene/camera/renderer
  lifecycle, drag controls, tweened transitions (GSAP or lerp), disposal.
- `components/DoctorShowcaseFallback.tsx` (or inline in Showcase) — flat fallback carousel.
- Edit `components/BrandBlock.tsx` — replace the stacked doctor `<section>` with `<DoctorShowcase />`;
  move the `DOCTORS` data into `lib/doctors.ts`.

## Accessibility
- One `<h2>` for the section; each doctor name is a heading or labelled region in the panel.
- Canvas `aria-hidden`; controls are real `<button>`s with labels; arrow keys rotate; dots are
  a tablist or radio group; active state announced via the panel (aria-live polite on name).
- Contrast preserved (locked AA tokens); focus-visible rings on controls.

## QC / constraints
- `npm run build` green. No new dependencies (three/gsap already installed).
- Verify on desktop + mobile viewport: switch works, fallback works (simulate no-WebGL),
  reduced-motion path, no layout overflow, initial bundle unaffected (three is split).
- Keep the existing bios verbatim as `fullBio` (no content loss / SEO regression).
