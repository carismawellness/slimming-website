# Carisma Slimming — On-Page SEO Checklist (Production-Grade)

> **Purpose:** The single source of truth for a fleet of agents optimizing every page of the Carisma Slimming Next.js site (App Router, deploys to `slimming-seven.vercel.app`).
> **Brand:** Carisma Slimming — #1 voted slimming clinic in Malta. Medical weight loss, GLP-1 programmes (Ozempic/Mounjaro-style), body contouring, fat-freezing, fat-dissolving, muscle-stimulation, skin-tightening, lipocavitation, anti-cellulite, lymphatic drainage.
> **Audience:** Women 25+ in Malta. **Persona "Katya":** compassionate truth-telling, gentle structure, evidence-led, shame-free, future-focused.
> **Category:** YMYL (Your Money or Your Life) — health content. E-E-A-T is non-negotiable.
> **Locale:** Malta. Include "Malta" in primary headings where natural; never stuff.
> **Stack note:** This is a customized Next.js — read the relevant guide in `node_modules/next/dist/docs/` before writing code. The metadata/route patterns below are App Router conventions; verify against the in-repo docs before implementing.

---

## How To Use This Checklist

- Every page must pass **Section 0 (Global Mandatory Gates)** before it ships.
- Then apply the relevant **page-type playbook** (Section 11).
- Treat each `- [ ]` as a verifiable assertion. If an agent cannot verify it against the rendered page, it is **not done**.
- Prefer **one primary keyword per page** + 3–8 supporting/semantic variations. Never target the same primary keyword on two indexable pages (cannibalization).
- When unsure between "good" and "perfect," ship "good" and log the gap — do not block the page.

---

## Section 0 — Global Mandatory Gates (every indexable page)

- [ ] Exactly **one `<h1>`** on the page (see Section 1).
- [ ] Unique, keyword-led **`<title>`** 50–60 chars (see Section 2).
- [ ] Unique **meta description** 140–160 chars with a CTA (see Section 2).
- [ ] Self-referencing **canonical** URL set (see Section 3).
- [ ] Correct **robots** directive — indexable pages allow indexing; utility pages `noindex` (see Section 4).
- [ ] **Clean, lowercase, hyphenated slug** with primary keyword (see Section 3).
- [ ] **Primary keyword in the first 100 words** of body copy (see Section 5).
- [ ] At least **3 descriptive internal links** in/out (see Section 6).
- [ ] Every meaningful image has **descriptive alt text + SEO filename** (see Section 7).
- [ ] Appropriate **JSON-LD schema** present and valid (see Section 8).
- [ ] **No medical claims without evidence/disclaimer**; YMYL E-E-A-T signals present (see Section 5 + 9).
- [ ] **Core Web Vitals** on-page factors handled (see Section 10).
- [ ] **Accessibility** baseline met — overlaps with SEO (see Section 10).
- [ ] Page added to (or excluded from) **`sitemap.xml`** consistently with its robots directive.

---

## Section 1 — Heading Optimization (H1–H6)

### 1.1 The Single-H1 Rule
- [ ] Exactly one `<h1>` per page — no more, no less.
- [ ] The `<h1>` is **visible** (not `display:none`, not an `aria-hidden` logo wrapper).
- [ ] The site logo in the header is **NOT** an `<h1>` (common Next.js layout bug). Use `<Link>` + `alt`, not a heading.
- [ ] Confirm a shared `layout.tsx` is not injecting a second `<h1>` (e.g., a global hero). If it is, demote it to a `<p>`/`<span>` with styling.

```tsx
// GOOD — page.tsx owns the single H1
export default function Page() {
  return <h1>Medical Weight Loss in Malta — Carisma Slimming</h1>;
}
// BAD — layout.tsx ALSO renders <h1>{siteName}</h1> → two H1s site-wide
```

### 1.2 Keyword Placement & Front-Loading
- [ ] Primary keyword appears in the `<h1>`, **front-loaded** (within the first 3–5 words).
- [ ] `<h1>` reads naturally for a human first, search engine second.
- [ ] `<h1>` is **distinct** from the `<title>` tag (overlapping but not identical wording).

```
GOOD H1:  Medical Weight Loss in Malta — Doctor-Led GLP-1 Programmes
BAD  H1:  Welcome to Our Clinic
BAD  H1:  Carisma Slimming | Home (keyword-free, brand-only)
```

### 1.3 Logical Hierarchy — No Skipped Levels
- [ ] Heading levels descend without skipping: `h1 → h2 → h3` (never `h1 → h3`).
- [ ] Headings are used for **structure**, not for font size. Style with CSS, not heading level.
- [ ] Each `<h2>` introduces a major content block; `<h3>` nests detail under its parent `<h2>`.
- [ ] No "orphan" `<h3>` that has no parent `<h2>` above it.

```
GOOD
h1 Medical Weight Loss in Malta
  h2 How Our GLP-1 Programme Works
    h3 Your First Consultation
    h3 Ongoing Medical Supervision
  h2 Is Medical Weight Loss Right for You?
  h2 Pricing & What's Included

BAD (skips h2)
h1 Medical Weight Loss in Malta
  h3 Your First Consultation   ← no h2 parent
```

### 1.4 Descriptive, Keyword-Rich Headings
- [ ] Every heading describes the content beneath it; no vague labels ("More," "Details," "Section 2").
- [ ] `<h2>`/`<h3>` use **keyword variations and long-tail phrasing**, not the exact primary keyword repeated verbatim.
- [ ] Headings answer real user questions where possible (matches voice/AI search intent).

```
GOOD H2 set (variation strategy, not repetition):
  - How GLP-1 Weight Loss Works
  - What to Expect on Mounjaro-Style Treatment in Malta
  - Side Effects & Medical Safety
  - GLP-1 vs. Traditional Dieting

BAD H2 set (keyword stuffing / repetition):
  - Weight Loss Malta
  - Weight Loss Malta Clinic
  - Best Weight Loss Malta
```

### 1.5 Locale Inclusion for Local SEO
- [ ] "Malta" (or a specific locality, e.g., "Sliema," "St Julian's") appears in the `<h1>` of money pages **where natural**.
- [ ] Do not append "Malta" to every single heading — once in `<h1>`, optionally once in an `<h2>`, is enough.
- [ ] Service-area / location signals reinforced in body, schema `areaServed`, and NAP — not by heading stuffing.

### 1.6 H2/H3 Keyword-Variation Strategy
- [ ] Map a **keyword cluster** to the page; distribute synonyms and entities across `<h2>`/`<h3>`.
- [ ] Cover **entities** Google associates with the topic (e.g., for GLP-1: appetite, semaglutide, tirzepatide, BMI, plateau, maintenance).
- [ ] Include at least one **comparison** or **"is it right for me"** heading to capture consideration-stage intent.

### 1.7 FAQ Headings
- [ ] FAQ questions are real `<h2>`/`<h3>` headings (or `<dt>` in a `<dl>`), phrased as **natural questions**.
- [ ] FAQ question wording mirrors real search queries ("How much does Ozempic cost in Malta?").
- [ ] FAQ headings are backed by `FAQPage` JSON-LD (Section 8) — question text in schema **matches** the visible heading.
- [ ] Each FAQ answer is genuinely useful (40–300 words), not a one-line dodge.

---

## Section 2 — Title Tags & Meta Descriptions (Next.js)

> In App Router, titles/descriptions come from the static `metadata` export **or** the async `generateMetadata()` function. Never hand-roll `<title>` in JSX. Verify the exact metadata API against `node_modules/next/dist/docs/` since this build may differ.

### 2.1 Title Tag
- [ ] Length **50–60 characters** (≤ ~580px). Avoid truncation in SERP.
- [ ] **Primary keyword first**, brand last, separated by `|` or `—`.
- [ ] Unique across the entire site (no two pages share a title).
- [ ] Includes "Malta" on local-intent money pages where it fits the char budget.
- [ ] Avoids ALL CAPS, emoji spam, and repeated keywords.
- [ ] Configure `metadata.title.template` in root `layout.tsx` so child pages auto-append the brand.

```tsx
// app/layout.tsx
export const metadata = {
  title: { default: "Carisma Slimming — #1 Weight Loss Clinic in Malta",
           template: "%s | Carisma Slimming Malta" },
};

// app/services/medical-weight-loss/page.tsx
export const metadata = {
  title: "Medical Weight Loss in Malta",     // → "Medical Weight Loss in Malta | Carisma Slimming Malta"
  description: "Doctor-led GLP-1 weight loss programmes in Malta...",
};
```

```
GOOD title:  Fat Freezing in Malta | Carisma Slimming   (54 chars)
BAD  title:  Home                                        (brand-less, generic)
BAD  title:  Weight Loss Malta Weight Loss Clinic Malta Best Slimming Malta (stuffed, truncates)
```

### 2.2 Meta Description
- [ ] Length **140–160 characters**.
- [ ] Contains the **primary keyword** naturally (bolded by Google when it matches the query).
- [ ] Ends with a **clear CTA** ("Book your free consultation," "Discover your plan").
- [ ] Unique per page; written for **click-through**, not keyword density.
- [ ] Speaks in Katya's compassionate, shame-free voice — no fear-mongering, no "lose 10kg fast" hype.

```
GOOD: "Doctor-led medical weight loss in Malta. Personalised GLP-1 programmes,
       real support, zero shame. Book your free consultation with Carisma today." (158)
BAD:  "We are a weight loss clinic. We do weight loss. Contact us for weight loss." (thin, no CTA)
```

### 2.3 Dynamic Metadata for Templated Pages
- [ ] Treatment/service template pages and blog posts use `generateMetadata({ params })` to produce unique title/description per slug.
- [ ] Fallback metadata exists if data is missing (never ship an empty/undefined title).
- [ ] `openGraph` and `twitter` metadata set (title, description, image, type) — affects social CTR, indirectly SEO.
- [ ] `metadataBase` is set in root layout so OG/canonical resolve to absolute URLs.

```tsx
export async function generateMetadata({ params }) {
  const t = await getTreatment(params.slug);
  if (!t) return { title: "Treatment Not Found" };
  return {
    title: `${t.name} in Malta`,
    description: t.metaDescription,
    alternates: { canonical: `/treatments/${t.slug}` },
    openGraph: { title: `${t.name} in Malta | Carisma Slimming`, images: [t.ogImage] },
  };
}
```

---

## Section 3 — URLs, Slugs & Canonicals

### 3.1 Slug / URL
- [ ] Lowercase, hyphen-separated, **no underscores, no spaces, no params** on indexable pages.
- [ ] Contains the **primary keyword**, kept short (3–5 words ideal).
- [ ] No stop-word bloat, no dates in evergreen URLs, no `.html`.
- [ ] Matches the route folder name in `app/` (App Router uses folder structure as URL).
- [ ] Stable — once published & indexed, do not change without a **301 redirect**.

```
GOOD:  /services/medical-weight-loss
GOOD:  /treatments/fat-freezing
BAD:   /services/Medical_Weight_Loss_Programme_2026
BAD:   /p?id=482
```

### 3.2 Canonical
- [ ] Every indexable page declares a **self-referencing canonical** via `alternates.canonical` in metadata.
- [ ] Canonical is **absolute** (relies on `metadataBase`) and uses the **production domain**, not the preview/Vercel URL.
- [ ] Paginated, filtered, or UTM-tagged variants canonicalize to the clean URL.
- [ ] No conflicting canonicals (page must not point canonical at a different page unless intentionally consolidating).
- [ ] Trailing-slash behavior is consistent site-wide and matches canonical.

```tsx
export const metadata = {
  metadataBase: new URL("https://slimming-seven.vercel.app"), // replace with prod domain when live
  alternates: { canonical: "/services/fat-freezing" },
};
```

> **Watch-out:** preview deploys (`*.vercel.app`) should ideally `noindex` via env-gated robots, OR canonicalize to the production domain, so preview URLs never compete in the index.

### 3.3 Redirects
- [ ] Removed/renamed URLs have **301 redirects** to the closest live equivalent (configure in `next.config.js` `redirects()` or middleware — confirm syntax in the in-repo Next docs).
- [ ] No redirect chains (A→B→C); collapse to A→C.
- [ ] No internal links pointing at known-redirecting URLs.

---

## Section 4 — Robots / Indexing Control

### 4.1 What MUST be `noindex`
- [ ] **Thank-you / confirmation** pages (`/thank-you`, `/booking-confirmed`).
- [ ] **Quiz-results / assessment-results** pages (personalized, thin, infinite variants).
- [ ] **Preview / draft / staging** pages and any `*.vercel.app` preview env.
- [ ] **Internal search results**, filtered listing permutations, and cart/checkout-style steps.
- [ ] **Utility pages** with no search value (e.g., `/unsubscribe`, `/email-preferences`).

### 4.2 What MUST stay indexable
- [ ] Homepage, all core service pages, treatment template pages, packages hub, informational guides/blog, key legal pages (privacy, terms — usually indexable but low priority).
- [ ] Paid landing pages: **decide deliberately** — if it duplicates an organic page, `noindex` it or canonicalize to the organic version to avoid cannibalization. If it's unique, index it.

### 4.3 Implementation
- [ ] Use the `robots` field in metadata (per page) for `noindex`.
- [ ] Confirm the page is **also excluded from `sitemap.xml`** when `noindex`.
- [ ] `robots.txt` does **not** block pages you want `noindex`'d (Google must crawl to see the noindex tag — never `Disallow` + `noindex` the same URL).

```tsx
// Thank-you / quiz-results / preview pages
export const metadata = {
  robots: { index: false, follow: true },
};
```

```ts
// Env-gate preview indexing (app/robots.ts)
export default function robots() {
  const isProd = process.env.VERCEL_ENV === "production";
  return isProd
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: "https://.../sitemap.xml" }
    : { rules: { userAgent: "*", disallow: "/" } };
}
```

---

## Section 5 — Content Depth & E-E-A-T (YMYL Health)

### 5.1 First-100-Words & Above-the-Fold Relevance
- [ ] Primary keyword appears **naturally within the first 100 words**.
- [ ] The opening paragraph states **what the page is, who it's for, and the next step** — no slow throat-clearing intro.
- [ ] Above-the-fold answers the searcher's core intent immediately.

### 5.2 Content Depth & Semantic Coverage
- [ ] Money/service pages: **600–1,200+ words** of genuinely useful content (not filler).
- [ ] Informational guides: **1,200–2,500+ words** with full topical coverage.
- [ ] Cover the **entity set** for the topic (e.g., GLP-1 page covers: eligibility/BMI, mechanism/appetite, expected results, side effects, cost, maintenance, alternatives).
- [ ] Address **"People Also Ask"** style questions in body or FAQ.
- [ ] No thin/duplicate content across treatment pages — each template instance has unique, treatment-specific copy.

### 5.3 E-E-A-T Signals (critical for YMYL health)
- [ ] **Experience:** real before/after context, patient journeys, what actually happens in clinic (with consent/disclaimers).
- [ ] **Expertise:** content reviewed/authored by named, credentialed medical staff (doctor/nurse). Show a **byline + reviewer + credentials**.
- [ ] **Authoritativeness:** "#1 voted slimming clinic in Malta" claim is substantiated; cite the award/source. Link to relevant authoritative sources.
- [ ] **Trust:** clear NAP, clinic address in Malta, registration/licensing info, transparent pricing or "from" pricing, real reviews, privacy policy linked.
- [ ] **Medical accuracy:** GLP-1 / medication content includes safety info, contraindications, "prescription-only / consultation required," and a disclaimer that this is not medical advice.
- [ ] **Last reviewed / updated date** shown on health content and reflected in schema.
- [ ] **Compassionate, shame-free framing** per Katya — never "obese," "fat," fear-based, or before/after body-shaming language.

```
GOOD framing:  "Weight is rarely about willpower. Our doctor-led programme in Malta
                addresses the biology behind it — gently, and with you every step."
BAD  framing:  "Stop being lazy. Lose that ugly fat fast with our miracle jab!"
```

### 5.4 Keyword Usage Hygiene
- [ ] Primary keyword density natural (~0.5–1.5%); no stuffing.
- [ ] Synonyms, entities, and long-tails distributed through body and subheadings.
- [ ] No hidden text, no keyword-stuffed footers, no doorway-page patterns.

---

## Section 6 — Internal Linking

- [ ] Each page has **3+ contextual internal links** in body copy with **descriptive anchor text**.
- [ ] Anchors describe the destination, not "click here" / "read more."
- [ ] Service pages link **down** to relevant treatment pages and **up/across** to the packages hub.
- [ ] Informational guides link to the relevant **money page** (guide on GLP-1 → medical weight loss service page).
- [ ] **Reciprocal linking** where logical (related treatments link to each other — e.g., fat-freezing ↔ fat-dissolving).
- [ ] Use Next.js `<Link>` (real `<a href>`), never JS-only `onClick` navigation (uncrawlable).
- [ ] No orphan pages — every indexable page is reachable from at least one other indexable page within ~3 clicks of the homepage.
- [ ] Breadcrumb navigation present on deep pages (and backed by `BreadcrumbList` schema, Section 8).

```
GOOD anchor:  Learn more about our <a href="/services/glp-1-weight-loss">doctor-led GLP-1 programmes in Malta</a>.
BAD  anchor:  To find out more, <a href="/services/glp-1-weight-loss">click here</a>.
```

---

## Section 7 — Images (Alt Text, Filenames, Delivery)

- [ ] Every meaningful image has **descriptive alt text** (purely decorative images get `alt=""`).
- [ ] Alt text describes the image **and** includes keyword/locale **only when natural** — never stuff.
- [ ] **SEO-friendly filenames**: lowercase, hyphenated, descriptive.
- [ ] Use `next/image` for automatic responsive sizing, lazy-loading, and modern formats (WebP/AVIF). Confirm the image API in the in-repo Next docs.
- [ ] **LCP / hero image:** set `priority` and explicit `width`/`height` (or `fill` + sized container) to prevent CLS.
- [ ] Below-fold images lazy-load (default with `next/image`).
- [ ] Before/after and medical imagery used with consent + disclaimer ("results vary").
- [ ] `ImageObject` included in schema where relevant (treatment pages, articles).

```
GOOD filename:  fat-freezing-treatment-malta.webp
BAD  filename:  IMG_2048.jpg / DSC0001.png

GOOD alt:  "Carisma Slimming nurse performing a fat-freezing treatment in our Malta clinic"
BAD  alt:  "image" / "fat freezing malta weight loss malta slimming malta best clinic"
```

---

## Section 8 — Schema / JSON-LD

> Inject via a `<script type="application/ld+json">` (e.g., a `<JsonLd>` component rendered in the page). Validate every block with Google's Rich Results Test. Schema must **match visible content**.

### 8.1 Organization / MedicalBusiness / LocalBusiness (site-wide)
- [ ] `MedicalBusiness` (or `MedicalClinic`) + `LocalBusiness` on homepage / sitewide.
- [ ] Includes `name`, `url`, `logo`, `image`, `telephone`, `priceRange`, `address` (PostalAddress, Malta), `geo`, `openingHoursSpecification`, `areaServed: "Malta"`, `sameAs` (social profiles).
- [ ] `aggregateRating` only if you have genuine, on-page, verifiable reviews (never fabricate).

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Carisma Slimming",
  "url": "https://slimming-seven.vercel.app",
  "image": "https://.../clinic.jpg",
  "telephone": "+356 ...",
  "priceRange": "€€",
  "address": { "@type": "PostalAddress", "addressCountry": "MT", "addressLocality": "..." },
  "areaServed": { "@type": "Country", "name": "Malta" },
  "medicalSpecialty": "Bariatric"
}
```

### 8.2 Service (per service/treatment page)
- [ ] `Service` (or `MedicalProcedure`/`MedicalTherapy` for clinical treatments) with `name`, `description`, `provider` (→ the MedicalBusiness), `areaServed: "Malta"`, and `offers` if pricing is shown.

### 8.3 FAQPage
- [ ] `FAQPage` on any page with a real FAQ section; each `Question`/`Answer` **matches the visible FAQ text exactly**.
- [ ] Do not mark up FAQs that aren't visible on the page.

### 8.4 BreadcrumbList
- [ ] `BreadcrumbList` on all non-homepage pages, mirroring the visible breadcrumb trail.

### 8.5 Article / MedicalWebPage (guides/blog)
- [ ] `Article` (or `MedicalWebPage`) with `headline`, `author` (credentialed), `reviewedBy`, `datePublished`, `dateModified`, `image`, `publisher`.

### 8.6 Validation
- [ ] All JSON-LD passes Rich Results Test with **zero errors** (warnings acceptable).
- [ ] No conflicting duplicate types; one coherent graph (use `@graph` if combining).

---

## Section 9 — YMYL / Compliance Layer (Slimming-Specific)

- [ ] Medication/GLP-1 pages state treatment is **prescription-only and requires medical consultation**.
- [ ] Generic disclaimer present: "This page is for information only and is not medical advice."
- [ ] No guaranteed-outcome claims ("guaranteed to lose X kg"). Use "results vary," "typical results."
- [ ] No comparative drug brand misuse — describe as "GLP-1 / Mounjaro-style / Ozempic-style" responsibly, not as endorsements.
- [ ] Pricing transparency where claimed; "from €X" must be truthful.
- [ ] Awards/claims ("#1 voted") are substantiated and dated.
- [ ] Cookie/privacy/data handling linked (relevant for lead-gen forms under GDPR/Malta law).

---

## Section 10 — Core Web Vitals & Accessibility (On-Page Factors)

### 10.1 Core Web Vitals
- [ ] **LCP < 2.5s:** hero image uses `next/image` `priority`; critical text not blocked by heavy JS.
- [ ] **CLS < 0.1:** all images/embeds have explicit dimensions; fonts use `next/font` with `display: swap`; no layout-shifting injected banners.
- [ ] **INP < 200ms:** minimize heavy client components; prefer Server Components; defer non-critical JS.
- [ ] Fonts self-hosted via `next/font` (no render-blocking external font CSS).
- [ ] No oversized images shipped (serve WebP/AVIF at the rendered size).

### 10.2 Accessibility (overlaps SEO)
- [ ] Logical heading order doubles as the screen-reader outline (see Section 1.3).
- [ ] All images have appropriate `alt` (Section 7).
- [ ] Color contrast ≥ WCAG AA, especially CTA buttons.
- [ ] Interactive elements are real `<button>`/`<a>` with accessible names; forms have `<label>`s.
- [ ] `lang` attribute set on `<html>` (`<html lang="en">`).
- [ ] Focus states visible; keyboard navigable.

---

## Section 11 — Page-Type Heading & SEO Playbook

> For each type: the H1 pattern, H2/H3 skeleton, title/meta, indexability, and schema.

### 11.1 Homepage
- **H1 (one):** brand + core value + locale.
  `GOOD: "Malta's #1 Voted Slimming Clinic — Medical Weight Loss That Works"`
- **H2 skeleton:**
  - "Our Weight Loss & Body Contouring Treatments in Malta"
  - "Why Women in Malta Choose Carisma Slimming"
  - "Doctor-Led, Shame-Free, Evidence-Based"
  - "Real Results, Real Support" (testimonials)
  - "Book Your Free Consultation"
- **Title:** `Carisma Slimming — #1 Weight Loss Clinic in Malta`
- **Meta:** value + treatments + CTA, ~155 chars.
- **Index:** YES. **Canonical:** self (root).
- **Schema:** `MedicalBusiness` + `LocalBusiness` + `WebSite`.

### 11.2 Core Service Page (e.g., Medical Weight Loss, GLP-1)
- **H1:** `[Service] in Malta — [differentiator]`
  `GOOD: "Medical Weight Loss in Malta — Doctor-Led GLP-1 Programmes"`
- **H2/H3 skeleton:**
  - "How [Service] Works" → H3 steps (consultation, plan, supervision, maintenance)
  - "Is [Service] Right for You?" (eligibility/BMI)
  - "What to Expect & Realistic Results"
  - "Safety & Side Effects"
  - "Pricing & What's Included"
  - "Frequently Asked Questions" (FAQPage)
- **Title:** keyword-first + Malta + brand.
- **Index:** YES. **Canonical:** self.
- **Schema:** `Service`/`MedicalProcedure` + `FAQPage` + `BreadcrumbList`.
- **Must include:** first-100-words keyword, E-E-A-T byline/reviewer, internal links to related treatments + packages hub, disclaimer.

### 11.3 Paid Landing Page (Meta/Google Ads)
- **H1:** message-match to the ad's promise + locale.
  `GOOD: "Lose Weight in Malta with Doctor-Led Support — Free Consultation"`
- **H2/H3 skeleton:** problem → solution → proof (testimonials) → offer → single strong CTA repeated; minimal nav, conversion-focused.
- **Title/Meta:** still set them (for any indexed variant).
- **Index:** DECIDE — if it duplicates an organic page, `noindex` OR canonical → organic page to avoid cannibalization. If unique, index.
- **Schema:** `Service` + `FAQPage` if FAQs present.
- **Note:** one focused CTA, fast LCP, no leaks to header/footer link maze. Tracking params must canonicalize to clean URL.

### 11.4 Informational Guide / Blog Post
- **H1:** the searchable question/topic.
  `GOOD: "GLP-1 Weight Loss in Malta: A Complete, Honest Guide"`
- **H2/H3 skeleton:** definition → how it works → benefits → risks/side effects → cost in Malta → alternatives → "is it right for you" → FAQ → CTA to service page.
- **Title:** topic-first, can include year for freshness if genuinely updated.
- **Index:** YES. **Canonical:** self.
- **Schema:** `Article`/`MedicalWebPage` + `FAQPage` + `BreadcrumbList`.
- **Must include:** author + medical reviewer + dates, deep semantic coverage, internal link to the matching money page with descriptive anchor.

### 11.5 Packages Hub
- **H1:** `Weight Loss & Body Contouring Packages in Malta`
- **H2/H3 skeleton:**
  - one H2 per package tier/category, H3 for what's included
  - "How to Choose Your Package"
  - "Compare Packages"
  - "Book a Free Consultation"
- **Title:** `Slimming & Weight Loss Packages in Malta | Carisma Slimming`
- **Index:** YES. **Canonical:** self.
- **Schema:** `OfferCatalog`/`ItemList` linking to each package/service; `BreadcrumbList`.
- **Must include:** descriptive internal links **down** to each treatment/service page.

### 11.6 Treatment / Service Template (dynamic, per-treatment)
> Applies to fat-freezing, fat-dissolving, muscle-stimulation, skin-tightening, lipocavitation, anti-cellulite, lymphatic drainage.
- **H1:** `${treatment.name} in Malta` (front-loaded, locale).
  `GOOD: "Fat Freezing in Malta — Non-Invasive Body Contouring"`
- **H2/H3 skeleton (template-driven, unique copy per instance):**
  - "What Is [Treatment]?"
  - "How [Treatment] Works"
  - "Who Is It For / Areas Treated"
  - "Results & How Many Sessions"
  - "[Treatment] vs [Related Treatment]"
  - "Pricing"
  - "FAQ"
- **Metadata:** via `generateMetadata({ params })` — unique title/description/canonical per slug.
- **Index:** YES (each unique). **Canonical:** self per slug.
- **Schema:** `MedicalProcedure`/`Service` + `FAQPage` + `BreadcrumbList`.
- **Guard:** never ship near-duplicate template instances — enforce unique intro, results, and FAQ per treatment.

### 11.7 Conversion / Thank-You / Quiz-Results (utility)
- **H1:** human confirmation, keyword-free is fine.
  `GOOD: "Thank You — We'll Be in Touch Shortly"`
- **Index:** **NO** — `robots: { index: false, follow: true }`.
- **Excluded** from `sitemap.xml`.
- **Schema:** none required.
- **Note:** still set a `<title>`; still single-H1; can include a soft next-step link (follow allowed).

### 11.8 Legal Pages (Privacy, Terms, Cookies)
- **H1:** plain and exact: `"Privacy Policy"`, `"Terms & Conditions"`.
- **H2/H3:** clear section headings (Data We Collect, How We Use It, Your Rights, Contact).
- **Title:** `Privacy Policy | Carisma Slimming Malta`
- **Index:** YES (usually) but low priority; keep in sitemap with low `priority`.
- **Schema:** none required (optional `WebPage`).
- **Note:** must be present and linked in footer for trust/E-E-A-T and GDPR compliance.

---

## Section 12 — Per-Page Verification Block (agents fill this in)

Before marking a page "optimized," confirm and record:

- [ ] **Primary keyword:** ________________
- [ ] **Page type:** ________________ (→ applied playbook 11.x)
- [ ] **H1 verified single + front-loaded:** ☐
- [ ] **Title (chars):** ________________ ( /60 )
- [ ] **Meta description (chars):** ________________ ( /160 )
- [ ] **Canonical URL:** ________________
- [ ] **Robots directive:** index / noindex
- [ ] **In sitemap?** consistent with robots: ☐
- [ ] **Heading hierarchy — no skips:** ☐
- [ ] **First-100-words keyword:** ☐
- [ ] **Internal links (count + descriptive anchors):** ____
- [ ] **All images alt + filename:** ☐
- [ ] **Schema types present + valid (Rich Results Test):** ________________
- [ ] **E-E-A-T (byline/reviewer/date/disclaimer):** ☐ (YMYL pages)
- [ ] **CWV check (LCP/CLS/INP):** ☐
- [ ] **Accessibility baseline:** ☐
- [ ] **Cannibalization check (no duplicate primary keyword target):** ☐

---

## Quick Reference — Numbers

| Item | Target |
|---|---|
| H1 per page | exactly 1 |
| Title length | 50–60 chars |
| Meta description | 140–160 chars |
| Primary keyword in body | within first 100 words |
| Service page word count | 600–1,200+ |
| Guide word count | 1,200–2,500+ |
| Internal links per page | 3+ descriptive |
| LCP / CLS / INP | < 2.5s / < 0.1 / < 200ms |
| Keyword density | ~0.5–1.5%, natural |

---

*Owner: SEO. Apply Section 0 + the matching Section 11 playbook to every page. Log gaps; never claim a page done without the Section 12 verification block filled.*
