# Carisma Slimming SEO Upgrade - Multi-Agent Implementation Prompt

Use this prompt to execute the full Carisma Slimming SEO upgrade with multiple agents working in parallel, then verify, commit, push to `main`, and confirm the Vercel deployment.

This is the execution companion to:

- `docs/slimming-seo-master-implementation-prompt.md`

## Master Objective

Upgrade the full Carisma Slimming website for:

- local Malta SEO,
- medical weight-loss authority,
- GLP-1/Ozempic/Mounjaro search intent,
- non-surgical body-contouring search intent,
- technical SEO cleanliness,
- schema completeness,
- internal linking,
- conversion tracking,
- mobile conversion,
- and safe, shame-free, evidence-led brand voice.

Primary commercial outcomes:

- Free consultation bookings.
- Body composition analysis bookings.
- WhatsApp and phone leads.
- Quiz starts/completions.
- Slimming guide purchases.
- Package bookings.

Primary site:

- Production: `https://www.carismaslimming.com`
- Preview: `https://slimming-seven.vercel.app`
- Repo: `carismawellness/slimming-website`
- Local path: `10-Tech/slimming-website`
- Deployment: push to `main` auto-deploys to Vercel.

## Required Reading For Every Agent

Every agent must read these before editing:

- `CLAUDE.md`
- `docs/BRAND_VOICE.md`
- `docs/DESIGN_GUIDELINES.md`
- `docs/PAGE_REDESIGN_PLAYBOOK.md`
- `docs/LANDING_PAGE_PLAYBOOK.md`
- `docs/slimming-seo-master-implementation-prompt.md`

Every agent must follow the Carisma Slimming voice:

- compassionate truth-telling,
- gentle structure,
- evidence-led,
- shame-free,
- future-focused,
- never crash-diet or blame-based.

## Operating Model

Use one orchestrator and multiple implementation agents.

The orchestrator owns:

- canonical strategy,
- keyword map,
- file ownership,
- agent sequencing,
- conflict resolution,
- final QA,
- build,
- commit,
- push,
- Vercel deployment check,
- final report.

Implementation agents own narrow domains. They must not edit files outside their assigned scope unless the orchestrator explicitly allows it.

Use isolated git worktrees or separate branches for each agent when possible. If not possible, agents must work only in non-overlapping files and report exact files changed before integration.

## Global Non-Negotiables

All agents must obey:

- Exactly one visible H1 per page.
- Each indexable page has one primary keyword.
- No duplicate title/meta on core pages.
- No indexable duplicate pages for the same keyword.
- JSON-LD must match visible content.
- FAQPage only when full FAQ answers are visible in HTML.
- Do not fabricate doctors, credentials, address, opening hours, awards, review counts, or testimonials.
- Do not guarantee medical outcomes.
- Do not use fear, shame, crash-diet urgency, or blame.
- Soften unsupported treatment claims.
- Use descriptive internal links.
- Keep production canonicals on `https://www.carismaslimming.com`.
- Run verification before handing back.

## Known Site Issues To Assign

The live study found:

1. `/blog` appears to use a post title as H1 instead of a blog index H1.
2. Sitemap has 414 URLs, including 397 blog posts that need inventory and pruning/optimization strategy.
3. Many blog posts are aesthetics-focused and may belong on Carisma Aesthetics, not Slimming.
4. Blog meta descriptions are often long excerpt dumps.
5. Sampled blog posts may lack semantic article H2/H3 structure.
6. Homepage shows broken/fallback counter text like "Up to 0 KG Per Week."
7. Consultation page shows "Loved by 0 + clients across Malta."
8. Commercial pages have missing image alt text, especially `/glp1` and package pages.
9. Some claims need medical/legal review:
   - "guaranteed"
   - "up to 1kg/week"
   - exact body-composition percentage claims
   - "visible results from first session"
   - "eliminate toxins"
   - "cellulite-free"
10. Package H1s are sometimes keyword strings rather than polished natural H1s.
11. Local trust pages are missing or underdeveloped.
12. CTA/event tracking needs standardization.

## Parallel Workstreams

After Agent 0 defines canonical and file-ownership strategy, run Agents 1-8 in parallel where possible.

### Agent 0 - Orchestrator / SEO Architect

Scope:

- Owns strategy, shared files, integration, final verification, commit, push, deployment check.

Initial tasks:

1. Read all required docs.
2. Inspect:
   - `app/sitemap.ts`
   - `app/robots.ts`
   - `next.config.ts`
   - `app/layout.tsx`
   - `app/page.tsx`
   - `app/blog/page.tsx`
   - `app/blog/[slug]/page.tsx`
   - `app/packages/[service]/page.tsx`
   - `lib/packages/`
   - `lib/faq/`
   - `lib/blog/posts-index.json`
   - `lib/seo/schema.ts`
3. Define canonical strategy for:
   - `/weight-loss` vs `/medical-weight-loss`
   - `/glp1` vs `/glp-1`
   - `/packages/fat-freezing` vs `/fat-freezing`, `/coolsculpting`, `/cryolipolysis`
   - `/packages/muscle-stimulation` vs `/muscle-stimulation`, `/emsculpt`, `/emsculpt-neo`
   - `/packages/skin-tightening` vs `/skin-tightening`, `/velashape`
   - `/packages/anti-cellulite` vs `/anti-cellulite`, `/cellulite-treatment`
   - `/packages/lymphatic-drainage` vs `/lymphatic-drainage`
   - off-topic blog posts that may belong on Carisma Aesthetics.
4. Assign shared-risk files.
5. Integrate agent outputs.
6. Run final QA.
7. Commit and push to `main` only after build passes.
8. Confirm Vercel deployment status for the pushed SHA.

Shared-risk files controlled by Agent 0 unless delegated:

- `next.config.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/layout.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/packages/[service]/page.tsx`
- `components/Footer.tsx`
- `components/PageHero.tsx`
- `components/PackagePage.tsx`
- `lib/seo/schema.ts`
- `lib/search-index.ts`

Return:

- Canonical strategy table.
- Workstreams merged.
- Final QA results.
- Commit SHA.
- Vercel deployment check result.

### Agent 1 - Technical SEO, Sitemap, Robots, Metadata, Schema Infrastructure

Likely files:

- `app/sitemap.ts`
- `app/robots.ts`
- `next.config.ts`
- `app/layout.tsx`
- `lib/seo/schema.ts`
- `lib/seo/JsonLd.tsx`
- route-level metadata files as approved.

Tasks:

1. Ensure sitemap contains only canonical, indexable 200 URLs.
2. Confirm preview/staging indexation strategy.
3. Confirm utility pages are noindexed and crawlable.
4. Ensure production canonicals self-reference `https://www.carismaslimming.com`.
5. Add or improve schema helpers:
   - MedicalBusiness/LocalBusiness
   - WebSite
   - BreadcrumbList
   - Service
   - MedicalWebPage
   - MedicalProcedure
   - FAQPage
   - BlogPosting
   - Product/Offer for `/slimming-guide` if appropriate
   - Person/Physician for doctor sections
6. Ensure page-scoped FAQ schema does not leak onto nested routes.
7. Ensure OG/Twitter defaults exist.
8. Support Agent 6 with blog canonical/noindex classification if needed.

Constraints:

- Do not rewrite commercial copy.
- Do not mass-edit 397 blog posts.

Return:

- Technical SEO changes.
- Redirect/canonical changes.
- Schema helpers changed.
- Verification commands and results.

### Agent 2 - Homepage, Weight Loss, GLP-1, Consultation

Likely files:

- `app/page.tsx`
- `app/weight-loss/page.tsx`
- `app/glp1/page.tsx`
- `app/consultation/page.tsx`
- `app/medical-weight-loss-lp/page.tsx`
- `lib/faq/glp1.ts`
- `lib/faq/weight-loss.ts`
- `lib/redesign/content.ts`
- related components if scoped and approved.

Primary keywords:

- weight loss clinic Malta
- medical weight loss Malta
- GLP-1 weight loss Malta
- Ozempic Malta
- Mounjaro Malta
- free weight loss consultation Malta
- body composition analysis Malta

Tasks:

1. Fix broken counters:
   - "Up to 0 KG Per Week."
   - "Loved by 0 + clients across Malta."
2. Improve titles, descriptions, H1s, intros, H2s, FAQs, and internal links.
3. Reframe guarantee/claims in medically careful language.
4. Strengthen doctor-led body composition, nutrition, movement, and maintenance positioning.
5. For `/glp1`, add:
   - eligibility,
   - contraindications,
   - side effects,
   - prescription-only/suitability language,
   - monitoring,
   - maintenance/exit strategy,
   - "not medication alone" positioning.
6. Fix missing alt text on `/glp1`.
7. Ensure visible FAQs align with FAQPage schema.
8. Link to `/packages`, `/consultation`, `/slimming-guide`, and high-value blog cluster pages.

Constraints:

- Do not make unsupported claims around medication.
- Do not imply guaranteed prescription.
- Do not use shame-based weight-loss copy.

Return:

- Pages changed.
- Title/meta/H1/canonical table.
- Claims softened.
- FAQ/schema status.
- Alt text fixes.
- Verification.

### Agent 3 - Package Category And Body Contouring Package Pages

Likely files:

- `app/packages/page.tsx`
- `app/packages/[service]/page.tsx`
- `components/PackagePage.tsx` only if delegated.
- `lib/packages/fat-freezing.ts`
- `lib/packages/fat-dissolving.ts`
- `lib/packages/muscle-stimulation.ts`
- `lib/packages/skin-tightening.ts`
- `lib/packages/lipocavitation.ts`
- `lib/packages/anti-cellulite.ts`
- `lib/packages/lymphatic-drainage.ts`
- `lib/packages/index.ts`
- `lib/packages/types.ts`

Primary keywords:

- body contouring Malta
- fat freezing Malta
- CoolSculpting Malta
- fat dissolving injections Malta
- EMSculpt NEO Malta
- skin tightening Malta
- lipocavitation Malta
- cellulite treatment Malta
- lymphatic drainage Malta

Tasks:

1. Upgrade `/packages` as a body-contouring hub.
2. Add comparison table if component system supports it:
   - best for,
   - areas,
   - session count,
   - downtime,
   - price/from price,
   - related page.
3. Rewrite package H1s to natural SEO H1s.
4. Improve package metadata and intros.
5. Fix missing alt text on all package pages.
6. Soften claims:
   - avoid "cellulite-free"
   - avoid "eliminate toxins"
   - qualify device percentage claims
   - avoid "permanent" unless carefully explained.
7. Add suitability, contraindications, sessions, downtime, results timeline, pricing, and aftercare.
8. Add internal links to relevant sibling package pages, `/weight-loss`, `/glp1`, `/consultation`, and blog posts.
9. Ensure FAQPage and MedicalProcedure schema match visible content.

Constraints:

- Do not edit GLP-1/weight-loss pages.
- Do not fabricate clinical citations.

Return:

- Pages changed.
- New H1/title/meta per package.
- Alt fixes.
- Claims softened/flagged.
- Schema status.

### Agent 4 - Slimming Guide Product/Page SEO

Likely files:

- `app/slimming-guide/page.tsx`
- `app/slimming-guide/*`
- guide purchase/order modal components:
  - `components/GuideOrderModal.tsx`
  - `app/api/order-guide/route.ts` only if approved.

Primary keywords:

- weight loss guide Malta
- sustainable weight loss Malta
- Maltese meal plan
- slimming guide Malta

Tasks:

1. Improve SEO title, meta, H1, intro, and product positioning.
2. Clarify what the guide includes.
3. Add who it is for/not for.
4. Link to consultation and relevant blog cluster.
5. Add Product/Offer schema if the guide is purchasable and visible price/content supports it.
6. Fix missing image alt text.
7. Track guide purchase/order CTA clicks.

Constraints:

- Do not change checkout/order behavior unless explicitly approved.
- Do not overpromise weight loss from the guide alone.

Return:

- Page changes.
- Schema changes.
- CTA tracking.
- Manual review items.

### Agent 5 - Local Trust, Doctors, Reviews, Contact, Footer, E-E-A-T

Likely files:

- `components/Footer.tsx`
- `components/DoctorProfiles.tsx`
- `components/DoctorCards.tsx`
- `components/GlobalBottom.tsx`
- `lib/doctors.ts`
- `lib/reviews.ts`
- `lib/fresha-reviews.ts`
- new approved routes:
  - `app/about/page.tsx`
  - `app/meet-the-doctors/page.tsx`
  - `app/reviews/page.tsx`
  - `app/slimming-clinic-malta/page.tsx`
  - `app/medical-weight-loss-clinic-malta/page.tsx`
  - `app/body-contouring-clinic-malta/page.tsx`
  - `app/safety-and-aftercare/page.tsx`

Tasks:

1. Strengthen local SEO:
   - NAP,
   - address,
   - phone,
   - WhatsApp,
   - opening hours,
   - location/parking,
   - map/contact path.
2. Strengthen E-E-A-T:
   - doctor profiles,
   - credentials,
   - review proof,
   - awards,
   - safety process,
   - medical suitability.
3. Add or improve trust/location pages approved by orchestrator.
4. Add Person/Physician and MedicalBusiness schema where visible content supports it.
5. Improve footer links without keyword spam.

Constraints:

- Do not invent address, credentials, or review counts.
- If verified data is missing, flag manual content needed.

Return:

- Pages/components changed.
- Local signals added.
- Schema added.
- Manual data required.

### Agent 6 - Blog Inventory, Pruning, Internal Linking, Content Clusters

Likely files:

- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/blog/page/[page]/page.tsx`
- `lib/blog/posts-index.json`
- blog source/content files if present/generated.
- `lib/search-index.ts`

Tasks:

1. Fix `/blog` H1 so the blog index targets:
   - `Weight Loss & Slimming Blog Malta`
2. Create an inventory of all 397 posts and classify:
   - keep and optimize,
   - consolidate,
   - redirect,
   - noindex,
   - migrate to Carisma Aesthetics,
   - delete only with redirect plan.
3. Prioritize high-value Slimming posts:
   - visceral fat,
   - hormones,
   - PCOS,
   - cortisol,
   - emotional eating,
   - insulin resistance,
   - weight loss after 40,
   - Ozempic/GLP-1,
   - body contouring,
   - CoolSculpting price,
   - fat freezing,
   - ultrasound cavitation,
   - anti-cellulite,
   - skin tightening.
4. Identify off-topic aesthetics posts:
   - Botox,
   - fillers,
   - lip fillers,
   - microneedling,
   - laser hair removal,
   - skin-only aesthetics,
   - bridal aesthetics.
5. Rewrite blog meta descriptions where feasible.
6. Ensure article body headings are semantic H2/H3.
7. Add internal links from blog posts to commercial pages using descriptive anchors.
8. Improve BlogPosting schema:
   - headline,
   - description,
   - author,
   - datePublished,
   - dateModified,
   - image,
   - publisher.

Constraints:

- Do not mass-delete posts without redirect/noindex strategy.
- Do not migrate content into Aesthetics repo unless orchestrator explicitly expands scope.
- Avoid making the blog outrank/cannibalize the money page for transactional keywords.

Return:

- Inventory summary.
- Posts changed.
- Posts recommended for noindex/migration/redirect.
- Internal links added.
- Metadata/schema fixes.

### Agent 7 - Analytics, CTA Tracking, Mobile Conversion

Likely files:

- `components/BookConsultationButton.tsx`
- `components/MobileStickyCTA.tsx`
- `components/StickyBookingBar.tsx`
- `components/StickyCta.tsx`
- `components/ConsultationModal.tsx`
- `components/QuizModal.tsx`
- `components/GuideOrderModal.tsx`
- CTA components in `components/redesign/`

Tasks:

1. Audit CTA behavior:
   - consultation,
   - WhatsApp,
   - phone,
   - quiz,
   - guide purchase,
   - package booking,
   - Fresha/external booking.
2. Standardize CTA labels:
   - Book Free Consultation
   - WhatsApp Us
   - Take the Quiz
   - Download/Get the Guide
   - View Packages
3. Add/verify events:
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
4. Payloads:
   - page path,
   - page type,
   - package/service slug,
   - CTA label,
   - section,
   - destination URL.
5. Confirm mobile sticky CTA works and does not obscure content.

Constraints:

- Do not add third-party scripts without approval.
- If tracking IDs are missing, implement clean event hooks/dataLayer pushes and flag manual setup.

Return:

- Events added.
- CTA issues fixed.
- Manual analytics setup needed.

### Agent 8 - Performance, Images, Core Web Vitals

Likely files:

- image-heavy components,
- `components/HeroVideo*`,
- package page image usage,
- `next.config.ts` only if delegated,
- public assets if optimization is approved.

Tasks:

1. Identify LCP images on core pages.
2. Ensure hero images are prioritized correctly.
3. Lazy-load below-fold images.
4. Add width/height/sizes where missing.
5. Reduce layout shift from dynamic counters, images, modals, videos.
6. Ensure videos are optimized and not blocking hero content.
7. Fix meaningful alt attributes not already handled by page agents.

Constraints:

- Do not do broad asset rewrites unless approved.
- Avoid changing visual design.

Return:

- Performance fixes.
- Images optimized/fixed.
- Remaining asset risks.

### Agent 9 - Independent Final QA Reviewer

Runs after all implementation agents are merged.

Tasks:

1. Crawl sitemap URLs.
2. Verify:
   - status 200 for sitemap URLs,
   - correct canonicals,
   - one H1 per page,
   - title/meta present and reasonable,
   - no core duplicate titles/metas,
   - no "0" fallback counters,
   - no unsupported guarantee/detox/cellulite-free claims,
   - schema matches visible content,
   - no production pages noindexed,
   - utility pages noindexed,
   - no preview URLs in production metadata,
   - meaningful image alts on core pages,
   - CTA links work.
3. Run:
   - `npm run build`
   - targeted lint/type checks if needed.
4. Produce blocker list for orchestrator.

Return:

- Pass/fail report.
- Defects with page/file references.
- Residual risk.

## Parallel Execution Plan

Run first:

1. Agent 0: strategy and file ownership.

Then run in parallel:

- Agent 1: technical SEO/schema.
- Agent 2: homepage, weight-loss, GLP-1, consultation.
- Agent 3: packages/body contouring.
- Agent 4: slimming guide.
- Agent 5: trust/local/E-E-A-T/footer.
- Agent 6: blog inventory and clusters.
- Agent 7: analytics/CTA.
- Agent 8: performance/images.

Then run sequentially:

1. Agent 0 integrates outputs.
2. Agent 9 QA review.
3. Agent 0 fixes blockers.
4. Final build.
5. Commit.
6. Push to `main`.
7. Confirm Vercel deployment.
8. Final report.

## File Ownership Rules

Agents must avoid editing the same files in parallel.

Shared-risk files:

- `next.config.ts`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/packages/[service]/page.tsx`
- `components/Footer.tsx`
- `components/PageHero.tsx`
- `components/PackagePage.tsx`
- `components/ModalitiesCarousel.tsx`
- `components/results/ResultsGuarantee.tsx`
- `lib/seo/schema.ts`
- `lib/search-index.ts`

If an agent needs a shared-risk file:

1. Stop.
2. Report the exact change needed.
3. Wait for orchestrator ownership decision.

## Per-Agent Output Template

```markdown
## Agent [number] Summary

### Scope
- Assigned pages/files:
- Changed pages/files:

### SEO Changes
| Page | Primary Keyword | Title | Meta Description | H1 | Canonical |
|---|---|---|---|---|---|

### Content Changes
- Sections added/improved:
- FAQs added/improved:
- Internal links added:
- Claims softened:
- Image alt fixes:

### Schema Changes
- BreadcrumbList:
- Service:
- FAQPage:
- MedicalWebPage/MedicalProcedure:
- BlogPosting:
- Product/Offer:
- Person/Physician:
- MedicalBusiness:

### Verification
- Commands run:
- Result:

### Risks / Manual Review
- Medical/legal claims:
- Missing verified data:
- Open questions:
```

## Orchestrator Final Report Template

```markdown
# Carisma Slimming SEO Implementation Report

## Deployment
- Commit SHA:
- Pushed to main:
- Vercel deployment:
- Production URL checked:

## Pages Updated
| Page | Keyword | Title | Meta | H1 | Schema | Status |
|---|---|---|---|---|---|---|

## Technical SEO
- Sitemap:
- Robots/noindex:
- Redirects:
- Canonicals:
- Broken links:
- Duplicate metadata:

## Content And Claims
- Claims softened:
- Manual medical/legal review:
- Blog inventory decisions:
- Off-topic posts:

## Schema
- Homepage:
- Weight-loss/GLP-1:
- Package pages:
- Blog:
- Trust/location:

## Internal Linking
- Money page links:
- Blog support links:
- Footer/navigation links:

## Analytics / CRO
- Events added:
- CTA fixes:
- Mobile sticky CTA:
- Quiz/guide tracking:

## Verification
- Build:
- Crawl:
- H1/title/meta:
- Schema:
- Image alts:
- CTA links:

## Remaining Manual Items
- Doctor credentials:
- Review count:
- Awards:
- Address/opening hours:
- Pricing:
- Medical/legal sign-off:
```

## Final Instruction For Codex

Build this carefully and push live only after local verification is green. The site should feel like the safest doctor-led slimming clinic in Malta: structured, medically credible, emotionally intelligent, technically clean, and easy to act on from mobile.
