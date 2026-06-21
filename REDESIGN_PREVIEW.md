# Carisma Slimming — Landing Page Redesign (concept preview)

An Awwwards-level, conversion-engineered reimagining of the homepage, built **on top of
the existing Next.js codebase** as a self-contained route. The original site is untouched.

- **Live preview route:** `/preview` &nbsp;→&nbsp; `npm run dev` then open <http://localhost:3001/preview> (or :3000)
- **Original homepage:** still at `/` (unchanged)
- **Goal:** maximise qualified **free body-analysis bookings**.

---

## How to run

```bash
cd 10-Tech/slimming-website
npm install        # already includes gsap, lenis, three
npm run dev        # → http://localhost:3000/preview
npm run build      # production build (passes clean; /preview prerenders static)
```

To **promote it to the homepage** later: move the contents of `app/preview/page.tsx` into
`app/page.tsx` (and merge `preview.css` import into the root layout), or simply make `/`
render the same components. The chrome gate in `components/PreviewChromeGate.tsx` currently
hides the shared header/footer only on `/preview`.

---

## What was built

```
app/preview/                 route + scoped CSS design system
  layout.tsx                 metadata (noindex while previewing) + preview.css
  page.tsx                   section assembly
  preview.css                tokens, utilities, gradients, grain, keyframes (scoped to .cx-root)
lib/redesign/content.ts      SINGLE SOURCE OF TRUTH — every claim/asset/CTA, verbatim from the live site
components/redesign/         16 components
  motion.ts                  reduced-motion-safe reveal / count-up / scroll-progress hooks
  SmoothScroll.tsx           Lenis smooth scroll + anchor handling (disabled under reduced-motion)
  HeroCanvas.tsx             Three.js shader contour-field hero background
  Cta.tsx                    magnetic, shimmer primary button
  Reveal.tsx                 scroll-reveal wrapper
  PreviewNav.tsx             sticky glass nav + scroll-progress bar + full-screen mobile menu
  Hero / Proof / Problem / Method / Journey / Glp1 / Treatments /
  WhyCarisma / Reviews / Doctors / Faq / FinalCta / PreviewFooter / StickyCta
components/PreviewChromeGate.tsx   suppresses shared site chrome on /preview
```

---

## Design rationale

**Direction: "Clinical warmth, editorial luxury."** A Mediterranean medical-wellness brand,
not a local clinic. Built on the site's real identity:

- **Palette** (sampled from live CSS): sage `#8EB093`, deep sage `#5F7E66`, taupe `#9B8D83`,
  blue-grey CTA `#6391AB`, warm cream `#F6F2EA`, sage gradient panels.
- **Type** (real self-hosted fonts): **Trajan Pro** for editorial headlines, **Novecento Wide**
  for eyebrows/labels, **Roboto** for body.
- **Motifs:** organic asymmetric image masks (echoing the live `100px 10px` radius), soft sage
  gradients, glass cards, subtle film grain, ambient glows, generous editorial spacing.

## Conversion rationale (CRO)

- **3-second clarity above the fold:** what (doctor-led slimming), outcome (up to 1kg/week),
  credibility (#1 voted, 4.7★/300+, doctor imagery), and the next step (free body analysis).
- **Objection-first flow:** Problem (why diets fail) → Method (4 pillars) → Journey (5 low-friction
  steps) → GLP-1 (responsible) → Treatments → Why Carisma + Extended Care → Reviews → Doctors →
  FAQ (12 objections) → Final CTA.
- **CTA cadence:** the same free-analysis CTA repeats after every persuasion peak (hero, method,
  journey, GLP-1, doctors, FAQ, final) — **10 booking CTAs** total, all → the live Fresha link.
- **Always-available conversion:** desktop header CTA + **mobile sticky bottom bar** ("Book free
  consultation" + tap-to-call).
- **Trust next to action:** rating/award chips in the hero, press marquee, animated proof counters.
- **Ethical urgency:** "limited to a small number of clients each month" (real site language) — no
  fake countdowns.

## Animations & interactions added

Scroll-driven hero reveal · **Three.js shader contour-field** hero background · animated trust-stat
counters · magnetic + shimmer-sweep CTAs · scroll-progress bar · scroll-driven 5-step journey
timeline (animated progress rail + activating nodes) · staggered section reveals · floating
hero video card with floating award/rating chips · pillar & treatment & doctor card hover lift +
image zoom · grid-rows FAQ accordion · press logo marquee · full-screen mobile menu · Lenis smooth
scrolling. **All gated by `prefers-reduced-motion`** (Lenis + canvas disabled, content shown
statically) and the canvas pauses when off-screen / tab hidden, with a CSS-gradient fallback.

## Compliance notes (medical marketing)

- Nothing invented — all copy, doctor credentials, awards, reviews and claims come from the live
  site / existing repo (`lib/redesign/content.ts` documents each source).
- "Up to 1kg a week" is framed as a **possible** outcome, never a guarantee; a medical disclaimer
  sits in the footer.
- **GLP-1 is consistently framed as optional and only-if-medically-appropriate** after assessment,
  never universal.
- "Permanent fat reduction" / "guaranteed" wording: only "permanent fat reduction" is kept because
  it is **verbatim from the live site**; the live "guaranteed … programs" phrasing was softened to
  "transformation programs."
- No body-shaming, fear, or miracle language. Reviews reuse the existing real Google-listing data
  (`lib/reviews.ts`).

## QA report

| Check | Result |
|---|---|
| Production build (`npm run build`) | ✅ passes, `/preview` prerenders static |
| Console (desktop) | ✅ 0 errors, 0 warnings |
| Horizontal scroll (desktop & 390px mobile) | ✅ none |
| Responsive grids (pillars/treatments/doctors) | ✅ 4 / 4 / 3 cols desktop, stack on mobile |
| In-page anchors (8) | ✅ all resolve, smooth-scroll |
| Booking CTAs | ✅ 10 → live Fresha link; 5 tel: links |
| Sticky mobile CTA | ✅ appears after hero |
| Mobile menu / FAQ accordion | ✅ working |
| Reduced motion | ✅ Lenis + canvas disabled, content visible |

**Bugs found & fixed during QA:** inline `gridTemplateColumns` overriding responsive CSS (page was
20.6k px tall → fixed to 12.6k); `THREE.Clock` deprecation → `performance.now()`; duplicate
`display` style key (build-breaking) → removed.

## Final checklist

- [x] Premium within 3 seconds · clear offer & CTA above the fold
- [x] Doctor-led, medically responsible, trustworthy
- [x] Interactive & memorable (GSAP-class motion + Three.js), tasteful — not chaotic
- [x] Mobile-first, sticky conversion, no overflow, no CLS from layout
- [x] Fast (static prerender; Three.js lazy-loaded, perf-capped), no console errors
- [x] Preserves Carisma Slimming brand (colours, fonts, logo, claims, doctors, awards, reviews)
- [x] Not templated; dramatically beats the current page
- [x] Suitable to run paid traffic to once promoted from `/preview`

> Note: this is a **concept preview** kept out of the search index (`robots: noindex`). Promote to
> `/` when approved. Not committed/pushed — left for your review.
