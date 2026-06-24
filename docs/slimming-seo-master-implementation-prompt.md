# Carisma Slimming SEO Master Implementation Prompt

Use this prompt to upgrade the Carisma Slimming website for maximum local Malta SEO, medical trust, conversion quality, and technical cleanliness.

This prompt is based on:

- A repo study of `carismawellness/slimming-website`.
- A live crawl sample of `https://slimming-seven.vercel.app` on 2026-06-24.
- The production target `https://www.carismaslimming.com`.
- The current sitemap, which exposes 414 URLs, including 397 blog posts.
- Current Malta SERP observations for medical weight loss, GLP-1/Ozempic/Mounjaro, fat freezing, and body contouring.
- Carisma Slimming brand voice: compassionate, evidence-led, shame-free, medically supervised, and locally Maltese.

## Role

You are a senior technical SEO strategist, medical weight-loss content strategist, local SEO specialist, Next.js engineer, and CRO specialist.

Your job is to improve every important indexable Carisma Slimming page so it can rank for high-intent Malta searches and convert qualified visitors into consultations, guide purchases, WhatsApp clicks, phone calls, quiz starts, and package bookings.

Do not write generic diet-industry SEO copy. Every page must feel specific to Carisma Slimming, Malta, doctor-led care, body composition, real-life Maltese routines, GLP-1 supervision where relevant, and the visitor's emotional state.

## Site Context

- Brand: Carisma Slimming
- Market: Malta
- Production domain: `https://www.carismaslimming.com`
- Vercel preview: `https://slimming-seven.vercel.app`
- Repo: `carismawellness/slimming-website`
- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4
- Deployment: push to `main` auto-deploys to Vercel
- Primary business goal: free consultation bookings, body composition analysis bookings, WhatsApp/phone leads, quiz starts, and package sales.

## Brand Voice Rules

All copy must follow Carisma Slimming's voice:

- Compassionate truth-telling.
- Gentle structure, not punishment.
- Evidence-led, emotion-aware.
- Safe and shame-free.
- Future-focused, present-centered.

Use language like:

- "You are not the only one who feels this way."
- "You did not fail. The plan failed you."
- "We design something you can live with on a bad day, not just a perfect one."
- "Doctor-led support, body composition data, and a plan that fits Maltese life."

Avoid:

- Shame, blame, fear, or "lack of discipline" framing.
- Crash-diet language.
- Extreme promises.
- Reducing patients to kilos only.
- Unsupported medical or treatment claims.
- "Detox" claims unless reframed carefully as lymphatic support or fluid retention support.

Core avatars:

- Busy Mum: energy, family load, guilt, restarting.
- Menopausal Professional: hormones, midlife weight gain, fatigue, metabolic frustration.
- Bride/Socialite: timeline, confidence, event readiness, no crash diet.

## Mandatory Repository Rules

Read before editing:

- `CLAUDE.md`
- `docs/BRAND_VOICE.md`
- `docs/DESIGN_GUIDELINES.md`
- `docs/PAGE_REDESIGN_PLAYBOOK.md`
- `docs/LANDING_PAGE_PLAYBOOK.md`
- Relevant page files in `app/`
- Content/data modules in `lib/services.ts`, `lib/packages/`, `lib/faq/`, `lib/blog/`, `lib/redesign/`, `lib/seo/`

Respect:

- Exactly one visible H1 per page.
- H1 should include the primary keyword and "Malta" where natural.
- Use `metadata` or `generateMetadata` for title, description, canonical, OG, and Twitter.
- JSON-LD must be built with `lib/seo/schema.ts` helpers and rendered through `JsonLd`.
- FAQ schema must match visible FAQ content and live in page scope.
- Utility pages should use noindex meta, not robots disallow.
- `npm run build` must pass before completion.

## Live Crawl Findings

### Sitemap And Route Inventory

The preview sitemap returned 414 URLs:

- Core commercial pages:
  - `/`
  - `/packages`
  - `/glp1`
  - `/weight-loss`
  - `/consultation`
  - `/slimming-guide`
  - `/careers`
  - `/privacy-policy`
  - `/terms-conditions`
- Package pages:
  - `/packages/fat-freezing`
  - `/packages/fat-dissolving`
  - `/packages/muscle-stimulation`
  - `/packages/skin-tightening`
  - `/packages/lipocavitation`
  - `/packages/anti-cellulite`
  - `/packages/lymphatic-drainage`
- Blog:
  - `/blog`
  - 397 blog posts from `lib/blog/posts-index.json`

### Strong Existing Foundations

- Commercial pages already exist and mostly return 200.
- Sitemap is production-domain canonicalized.
- Core package pages have BreadcrumbList and FAQPage schema.
- `/glp1` and `/weight-loss` already have FAQPage schema.
- Redirect strategy exists for legacy flat URLs and brand-name variants.
- Blog posts have BlogPosting and BreadcrumbList schema.
- Brand voice is much stronger than generic slimming competitors.

### Critical SEO Issues To Fix

1. Blog index H1 problem:
   - `/blog` currently appears to use a post title as the H1: "Visceral Fat in Women..."
   - The blog index should have its own H1 such as "Weight Loss & Slimming Blog Malta".
   - Individual post titles should not become the category page H1.

2. Overclaim and compliance risk:
   - Examples found: "Lose Up To 1KG A Week Doctor-Led & Guaranteed", "Up to 0 KG Per Week", "Loved by 0 + clients", "visible results from the first session", "eliminate toxins", "25% more muscle, reduce 30% fat".
   - Rewrite as medically careful and evidence-framed:
     - "structured doctor-led support"
     - "typical results vary"
     - "treatment suitability is assessed first"
     - "based on clinical studies/device evidence where cited"
     - "supports lymphatic flow and fluid retention" instead of "detox/eliminate toxins".

3. Broken dynamic counters/placeholders:
   - Homepage crawl showed "Up to 0 KG Per Week."
   - Consultation page showed "Loved by 0 + clients across Malta."
   - These are trust-damaging and must be fixed, hidden until hydrated, or rendered server-side with real fallback values.

4. Missing image alt text:
   - `/glp1`: 15 missing alts.
   - `/packages/fat-freezing`: 14 missing alts.
   - `/packages/muscle-stimulation`: 15 missing alts.
   - `/packages/skin-tightening`: 14 missing alts.
   - `/packages/lipocavitation`: 15 missing alts.
   - `/packages/anti-cellulite`: 15 missing alts.
   - `/packages/lymphatic-drainage`: 14 missing alts.
   - `/slimming-guide`: 10 missing alts.
   - Fix meaningful image alts and intentionally empty decorative alts.

5. Blog quality and cannibalization:
   - There are 397 blog posts.
   - Many sampled posts are aesthetics-focused rather than slimming-focused: Botox, fillers, microneedling, summer skin, lip fillers, bridal aesthetics.
   - These can confuse topical authority and should either:
     - canonicalize/migrate to Carisma Aesthetics where appropriate,
     - be noindexed if low-value,
     - or be rewritten to support slimming-specific intent.
   - Blog post meta descriptions are often very long excerpt dumps, not 150-160 character SERP copy.
   - Many sampled blog posts only show generic H2s from footer/global sections in crawl, suggesting article body headings may not be semantic enough or are not rendered as H2s.

6. Commercial heading consistency:
   - Package page H1s are sometimes lower-case and overloaded:
     - "fat freezing in malta coolsculpting fat eraser protocol"
     - "muscle stimulation in malta emsculpt neo body sculpt protocol"
   - Improve to natural, SERP-aligned H1s:
     - "Fat Freezing in Malta"
     - "EMSculpt NEO Muscle Stimulation in Malta"
     - "VelaShape Skin Tightening in Malta"

7. Duplicate and alias strategy:
   - `next.config.ts` redirects:
     - `/medical-weight-loss` -> `/weight-loss`
     - `/glp-1` -> `/glp1`
     - `/fat-freezing` -> `/packages/fat-freezing`
     - `/muscle-stimulation` -> `/packages/muscle-stimulation`
     - `/skin-tightening` -> `/packages/skin-tightening`
     - `/anti-cellulite` -> `/packages/anti-cellulite`
     - `/lymphatic-drainage` -> `/packages/lymphatic-drainage`
   - This is useful, but the orchestrator must ensure sitemap only lists canonical destinations and no duplicate pages are indexable.

8. Local trust and E-E-A-T gaps:
   - Improve or create pages for:
     - `/contact` or keep `/consultation` as contact canonical with enough location detail.
     - `/about`
     - `/meet-the-doctors`
     - `/reviews`
     - `/medical-weight-loss-clinic-malta`
     - `/slimming-clinic-malta`
     - `/body-contouring-clinic-malta`
     - `/safety-and-aftercare`
   - If exact address, opening hours, credentials, review counts, or awards are not verified, flag them for manual confirmation instead of fabricating.

## SEO Strategy

### Core Keyword Map

| Page | Primary keyword | Secondary keywords | Search intent |
|---|---|---|---|
| `/` | weight loss clinic Malta | slimming clinic Malta, doctor-led slimming Malta, Carisma Slimming | Brand + local commercial |
| `/weight-loss` | medical weight loss Malta | doctor-led weight loss Malta, weight loss program Malta, weight loss after 30 Malta | High-intent medical programme |
| `/glp1` | GLP-1 weight loss Malta | Ozempic Malta, Mounjaro Malta, weight loss injections Malta, medical weight loss injections Malta | High-intent medical/medication |
| `/consultation` | free weight loss consultation Malta | body composition analysis Malta, slimming consultation Malta | Conversion/local |
| `/packages` | body contouring Malta | slimming treatments Malta, non-surgical body contouring Malta | Category/commercial |
| `/packages/fat-freezing` | fat freezing Malta | CoolSculpting Malta, cryolipolysis Malta, stubborn fat treatment Malta | Commercial treatment |
| `/packages/fat-dissolving` | fat dissolving injections Malta | Lemon Bottle Malta, Aqualyx Malta, double chin fat dissolving Malta | Commercial treatment |
| `/packages/muscle-stimulation` | EMSculpt NEO Malta | muscle stimulation Malta, body sculpting Malta, build muscle burn fat Malta | Commercial treatment |
| `/packages/skin-tightening` | skin tightening Malta | VelaShape III Malta, RF skin tightening Malta, loose skin after weight loss Malta | Commercial treatment |
| `/packages/lipocavitation` | lipocavitation Malta | ultrasound cavitation Malta, non-invasive fat reduction Malta | Commercial treatment |
| `/packages/anti-cellulite` | cellulite treatment Malta | VelaShape cellulite Malta, cellulite smoothing Malta | Commercial treatment |
| `/packages/lymphatic-drainage` | lymphatic drainage Malta | lymphatic drainage massage Malta, fluid retention Malta, bloating treatment Malta | Commercial wellness |
| `/slimming-guide` | weight loss guide Malta | Maltese meal plan, sustainable weight loss Malta, slimming guide | Product/info-commercial |

### Priority Topic Clusters

Build topical authority around these clusters:

1. Medical Weight Loss Malta
   - medical weight loss
   - GLP-1
   - Ozempic
   - Mounjaro
   - weight loss after 30/40/menopause
   - PCOS, insulin resistance, visceral fat, emotional eating, cortisol

2. Non-Surgical Body Contouring Malta
   - fat freezing
   - fat dissolving injections
   - lipocavitation
   - EMSculpt NEO
   - skin tightening
   - cellulite treatment
   - lymphatic drainage

3. Sustainable Slimming For Maltese Life
   - Maltese food culture
   - festas/family meals/weekends
   - meal timing
   - portion guidance
   - relapse prevention
   - busy mums
   - menopause
   - brides/events

4. Doctor-Led Trust
   - doctors
   - body composition analysis
   - suitability
   - contraindications
   - safety
   - maintenance
   - aftercare

## Page Requirements

Every commercial page must include:

1. Unique SEO title:
   - 50-60 characters where possible.
   - Primary keyword near the front.
   - Include Malta.
   - Add trust or differentiated angle.

2. Unique meta description:
   - 140-160 characters where possible.
   - Include Malta, service benefit, doctor-led trust, and soft CTA.
   - Do not use excerpt dumps.

3. One optimized H1:
   - Natural language.
   - Includes main topic and Malta.
   - Avoid keyword-stuffed strings.

4. First 100 words:
   - Include treatment/program concept, Malta, Carisma Slimming, doctor-led/supervised care, and consultation intent.

5. Above-the-fold:
   - Clear H1.
   - Local modifier.
   - Doctor-led trust proof.
   - Primary CTA.
   - Secondary CTA.
   - Price/from-price where appropriate.
   - Review/award proof if verified.
   - Real clinic/treatment/practitioner image.

6. Content depth:
   - Core commercial pages: 1,200-2,000 useful words.
   - Treatment/package pages: 1,000-1,800 useful words.
   - Blog posts: prune, noindex, migrate, or strengthen based on strategic value.

7. Required content sections:
   - What it is.
   - Who it is for.
   - Who it may not be suitable for.
   - How consultation/body composition analysis works.
   - How the treatment/program works.
   - Timeline and sessions.
   - Expected results with careful language.
   - Risks, side effects, or suitability considerations.
   - Pricing/package inclusions.
   - FAQs.
   - Related treatments/programs.
   - Doctor-led trust.

8. Schema:
   - Homepage: MedicalBusiness or LocalBusiness, Organization, WebSite.
   - Commercial pages: BreadcrumbList, Service, FAQPage where visible, MedicalWebPage/MedicalProcedure where appropriate.
   - Blog: BlogPosting/Article, BreadcrumbList.
   - Doctors: Person/Physician where visible.
   - Location/contact: MedicalBusiness with PostalAddress, GeoCoordinates, openingHours, telephone.

9. Internal linking:
   - Homepage -> `/weight-loss`, `/glp1`, `/packages`, `/consultation`, `/slimming-guide`.
   - `/weight-loss` -> `/glp1`, `/packages`, `/consultation`, weight-loss blog cluster.
   - `/glp1` -> `/weight-loss`, `/consultation`, GLP-1 guide posts, safety/doctor pages.
   - Package pages -> `/packages`, `/weight-loss`, relevant sibling package pages, relevant blog posts.
   - Blog posts -> one primary commercial page and 2-3 supporting posts.

10. Local SEO:
   - Add Malta in page title/H1/intro.
   - Add location/contact details where verified.
   - Link to consultation/contact/location page.
   - Add full NAP and opening hours in footer if verified.
   - Add Google Business/Fresha/review proof if verified.

## Page-Specific Upgrade Notes

### Homepage

Fix:

- Broken counter copy such as "Up to 0 KG Per Week."
- Ensure title/meta align with "weight loss clinic Malta".
- Add direct internal links to the highest-value commercial pages.
- Strengthen doctor-led body composition and Malta lifestyle positioning.

### `/weight-loss`

Target: `medical weight loss Malta`.

Improve:

- H1 should include "Medical Weight Loss in Malta" and avoid "guaranteed" if not legally reviewed.
- Explain the full programme: assessment, nutrition, movement, check-ins, treatments, GLP-1 where suitable.
- Add who is suitable/not suitable.
- Add maintenance and relapse-prevention.
- Add pricing/package structure if approved.
- Link to `/glp1`, `/packages`, `/consultation`, and relevant blog posts.

### `/glp1`

Target: `GLP-1 weight loss Malta`.

Improve:

- Clear Ozempic/Mounjaro/GLP-1 terminology.
- Eligibility, contraindications, side effects, monitoring, bloodwork if relevant, maintenance, exit strategy.
- Emphasize "not medication alone".
- Avoid implying automatic prescription.
- Add physician credentials and medical review notes.
- Fix 15 missing alt texts.

### `/consultation`

Target: `free weight loss consultation Malta`.

Improve:

- Fix "Loved by 0 + clients".
- Clarify body composition analysis, doctor/practitioner meeting, plan recommendations, no-pressure next step.
- Add local address/contact/opening hours if verified.
- Add conversion tracking for booking, call, WhatsApp.

### `/packages`

Target: `body contouring Malta`.

Improve:

- Make it a true category hub with short, unique descriptions for each package.
- Add comparison table: goal, best for, sessions, downtime, price/from price, related treatment.
- Add links to body-contouring blog posts.
- Add ItemList schema.

### Package Pages

Each package page must:

- Use natural H1s.
- Explain suitability and contraindications.
- Clarify technology and mechanism.
- Explain sessions/timeline/downtime.
- Add pricing and package inclusions.
- Soften overclaims.
- Fix alt text.
- Add relevant internal links.

Important compliance notes:

- Fat freezing: mention cryolipolysis, stubborn fat, not weight-loss replacement, rare PAH risk if medically approved.
- Fat dissolving: mention suitability, swelling/bruising, number of sessions, contraindications.
- EMSculpt: cite device evidence carefully; avoid universal "25% muscle/30% fat" claims unless sourced and qualified.
- Skin tightening: distinguish tightening/firming from weight loss.
- Lipocavitation: avoid "fat elimination" overclaims; explain ultrasound cavitation carefully.
- Anti-cellulite: avoid "cellulite-free"; use "smoother-looking skin" and realistic expectations.
- Lymphatic drainage: avoid "eliminate toxins"; use fluid retention, swelling, bloating, post-treatment support where appropriate.

### `/slimming-guide`

Target: `weight loss guide Malta`.

Improve:

- Add product/schema strategy if the guide is purchasable.
- Clarify what is inside, who it is for, how it fits with the clinic programme.
- Link to consultation and relevant blog cluster.
- Fix 10 missing alt texts.

### Blog

The blog is the largest SEO opportunity and the largest risk.

Do a content inventory of all 397 posts and classify each as:

- Keep and optimize.
- Consolidate.
- Redirect.
- Noindex.
- Migrate to Carisma Aesthetics.
- Delete only if there is no SEO/user value and redirects are handled.

Priority fixes:

- `/blog` index H1.
- Meta descriptions that are too long.
- Thin or off-topic aesthetics posts.
- Missing semantic H2/H3 structure inside articles.
- Internal links from blog posts to commercial pages.
- Canonical/noindex decisions for off-brand posts.

High-value existing Slimming blog posts to strengthen:

- `/blog/visceral-fat-malta`
- `/blog/hormone-imbalance-weight-gain-malta`
- `/blog/pcos-weight-loss-malta`
- `/blog/cortisol-belly-fat-malta`
- `/blog/emotional-eating-weight-loss-malta`
- `/blog/insulin-resistance-weight-gain-malta`
- `/blog/weight-loss-after-40-malta`
- `/blog/ozempic-glp1-malta-guide`
- `/blog/body-contouring-malta`
- `/blog/body-contouring-malta-1`
- `/blog/coolsculpting-malta-price`
- `/blog/fat-freezing-in-malta-what-it-is-how-it-works-and-what-to-realistically-expect`
- `/blog/ultrasound-cavitation-malta`
- `/blog/anti-cellulite-treatment-velashape-malta`
- `/blog/skin-tightening-treatment-malta`

Off-topic or cross-brand posts to review:

- Botox/fillers posts.
- Lip filler posts.
- Microneedling/aesthetic skin posts.
- Bridal aesthetic posts.
- Laser hair removal posts.
- Under-eye filler posts.

These may belong on Carisma Aesthetics rather than Carisma Slimming.

## Competitor And SERP Notes

Current SERP competitors and comparison references include:

- St Mary's Clinic for non-surgical weight loss and body contouring.
- Heart Beat Malta for medical weight loss clinic positioning.
- Serenity Clinic, DoctorAM Clinics, Dermatec, Near2Perfection, Ayur Veda for slimming/body contouring.
- Carisma Slimming itself appears for relevant searches and is cited in Reddit discussion around Ozempic/medical weight loss.
- Times of Malta coverage has recently increased public awareness of GLP-1 access in Malta.
- International medical references such as Stanford/Vanderbilt medical weight-loss programme pages are useful models for E-E-A-T structure.
- Authoritative treatment references like ASPS/Harvard/WebMD/CoolSculpting official pages are useful for claim-safety framing.

Beat competitors by:

- Clearer doctor-led programme structure.
- Better local Malta lifestyle specificity.
- Safer GLP-1 education.
- Stronger body composition and maintenance content.
- Clear pricing/package inclusion.
- Better FAQ schema and internal linking.
- Better topical separation between medical weight loss and body contouring.

## Technical SEO Checklist

Verify:

- Sitemap contains only canonical, indexable 200 URLs.
- Utility pages are noindexed and crawlable.
- Preview/staging is not indexable if not intended.
- Production canonicals self-reference `https://www.carismaslimming.com`.
- No duplicate title/meta on core pages.
- No indexable duplicate keyword pages.
- `/blog` has a blog index H1, not a post H1.
- OG and Twitter tags exist.
- BreadcrumbList present where appropriate.
- Service schema on commercial pages.
- FAQPage only when FAQs are visible.
- BlogPosting schema on posts.
- MedicalBusiness schema on homepage/location/contact.
- Image alts fixed.
- No fake reviews or unverifiable claims.
- No "0" counter fallbacks.
- No unsupported guarantee claims.
- Phone, WhatsApp, booking, quiz, guide purchase links work.
- Mobile sticky CTA works.
- `npm run build` passes.

## Analytics And CRO Tracking

Track:

- `book_consultation_click`
- `whatsapp_click`
- `phone_click`
- `quiz_start`
- `quiz_complete`
- `guide_purchase_click`
- `package_cta_click`
- `pricing_view`
- `faq_open`
- `blog_to_service_click`
- `body_analysis_click`
- `treatment_page_view`
- `glp1_page_view`

Event payloads should include:

- page path
- page type
- package/service slug
- CTA label
- section
- destination URL
- device category if available

## Deliverables

After implementation, provide:

1. Pages updated.
2. For each page: primary keyword, title, meta description, H1, canonical.
3. Redirects/canonical changes.
4. Schema types added.
5. FAQs added and FAQPage status.
6. Internal links added.
7. Blog inventory decisions.
8. Image alt fixes.
9. Claims softened or flagged.
10. Analytics events added.
11. Build/crawl/QA results.
12. Manual review items.

## Suggested Execution Order

1. Technical foundations:
   - sitemap/canonical/noindex
   - `/blog` H1
   - counter fallback bugs
   - metadata/OG defaults

2. Core money pages:
   - `/weight-loss`
   - `/glp1`
   - `/consultation`
   - `/packages`

3. Package pages:
   - fat freezing
   - fat dissolving
   - EMSculpt/muscle stimulation
   - skin tightening
   - lipocavitation
   - anti-cellulite
   - lymphatic drainage

4. Trust/local pages:
   - doctor profiles
   - reviews
   - contact/location
   - safety/aftercare

5. Blog cluster cleanup.

6. Analytics and CTA QA.

7. Final build and deployment verification.

## Final Instruction

Optimize for organic growth and qualified leads, but protect medical credibility first. Carisma Slimming should not sound like another diet clinic. It should feel like the safest, most structured, doctor-led place in Malta for women who are tired of starting over and ready for a plan that finally fits real life.
