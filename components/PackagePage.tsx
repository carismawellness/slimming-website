'use client';

/* ============================================================
   Data-driven slimming-package template — a pixel-faithful
   recreation of the shared carismaslimming.com treatment-page
   layout. Renders the 11 body sections from a PackageContent
   object (lib/packages/*). Global Header + BrandBlock + Footer
   come from app/layout.tsx.

   Section order:
     1  Hero (with optional looping video)
     2  The secret to a more defined, confident look
     3  Malta's trusted clinic — press logos (shared)
     4  Four named benefits
     5  Eligibility — treatable areas
     6  The Carisma difference — we are not another diet clinic (shared)
     7  Package treatments — proven efficacy
     8  Dual / starter pack
     9  Malta's #1 leading wellness chain (+ location map)
     10 Frequently asked questions
     11 Evidence based approach (research cards)
   ============================================================ */

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { BOOKING_URL } from '@/lib/services';
import {
  PackageContent,
  SHARED_DIFFERENCE_BULLETS,
  SHARED_DIFFERENCE_INTRO,
  SHARED_COMMITMENT,
  SHARED_WHY_MALTA,
} from '@/lib/packages/types';
import { testimonials as TESTIMONIALS, Testimonial } from '@/lib/packages/testimonials';
import TreatmentBodyMap from '@/components/treatments/TreatmentBodyMap';

/* ---------- palette / fonts (shared with the site) ---------- */
/* GREEN_TEXT is the locked accessible sage (#4f7256 from globals.css) used for ALL
   sage TEXT, ICONS, LINKS and meaningful borders; HEADING_GREEN (#3c5a40) is the
   locked dark-sage for section headings. Bright sage #8EB093 is decorative-only and
   is applied via gradients/CSS, never as a token here. */
const GREEN_TEXT = '#4f7256';
/* Locked dark-sage for section headings (H2/H3). */
const HEADING_GREEN = '#3c5a40';
/* Taupe text darkened to the locked accessible value (5.78:1 on white,
   >=4.5:1 on the #dfe8db sage price panels). */
const TAUPE = '#6F6456';
const TAUPE_DK = '#6F6456';
/* TAUPE_LT is for decorative round bullet dots/chevrons only (non-informational);
   all taupe-light *text* (fineprint) uses TAUPE for AA compliance. */
const TAUPE_LT = '#AFA39D';

const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

/* ---------- shared assets ---------- */
const W = '/wix/';
const BADGE = W + 'f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png';
const GOOGLE = W + '87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png';
const CHECK = W + '87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png';
const DIFF_BG = W + '87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.webp';
const WELL_BG = W + 'f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png';
const PARKING = W + '87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png';
/* live order + rendered sizes (measured on carismaslimming.com) */
const PRESS = [
  { src: W + 'f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg', alt: 'Malta Daily', h: 54 },
  { src: W + 'f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg', alt: '89.7 Bay', h: 54 },
  { src: W + 'f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg', alt: 'Lovin Malta', h: 64 },
  { src: W + 'f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png', alt: 'Times of Malta', h: 54 },
  { src: W + 'f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png', alt: 'Malta Today', h: 54 },
];
const PRESS_HEADING_DEFAULT = ["malta's trusted clinic for", 'non surgical fat reduction'];

const CONTAINER: React.CSSProperties = { maxWidth: 1040, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 };

/* FIX 2 — the template already prints a hardcoded "Proven efficacy" label above
   the efficacy bullets. Some services' `ptEfficacyBullets[0]` ALSO start with
   "Proven efficacy" (optionally followed by ":" / "—" / "-"), which renders the
   words twice. Strip that leading phrase (case-insensitive, with surrounding
   whitespace) from each bullet before printing. Applied in BOTH render branches. */
function stripProvenEfficacy(text: string): string {
  return text.replace(/^\s*proven efficacy\s*[:—-]?\s*/i, '');
}

/* ---------- shared pieces ---------- */
function Eyebrow({ children, align = 'center', size = 15 }: { children: React.ReactNode; align?: 'center' | 'left'; size?: number }) {
  return (
    <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: size, fontWeight: 400, letterSpacing: 'normal', textTransform: 'uppercase', textAlign: align, margin: 0 }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, align = 'center', size = 28, id }: { children: React.ReactNode; align?: 'center' | 'left'; size?: number; id?: string }) {
  return (
    <h2 id={id} style={{ color: HEADING_GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: size, lineHeight: 1.4, letterSpacing: 'normal', textTransform: 'uppercase', textAlign: align, margin: 0 }}>
      {children}
    </h2>
  );
}

/* P2 — single, unambiguous CTA → Fresha booking. Min 44px touch target +
   accessible label. The former secondary "Free Body Analysis" outline button
   has been removed site-wide so every CTA is one clear action. */
function CTA({ children = 'Claim your spot now', full = false, wide = false }: { variant?: 'green' | 'blue'; children?: React.ReactNode; full?: boolean; wide?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: full ? 'column' : 'row', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start' }}>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${String(children)} (opens in new tab)`}
        className="cta-glow"
        style={{
          color: '#fff',
          fontFamily: WIDE,
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '1.4px',
          textTransform: 'uppercase',
          textAlign: 'center',
          textDecoration: 'none',
          padding: wide ? '15px 70px' : '15px 38px',
          /* P2 — min touch target */
          minHeight: '44px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </a>
    </div>
  );
}

/* P1 — aria-hidden on purely decorative tick image */
function Tick({ size = 18 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={CHECK} alt="" aria-hidden="true" style={{ width: size, height: 'auto', flexShrink: 0, marginTop: 3 }} />;
}

/* Sage SVG tick (#4f7256 — locked accessible token, ~4.3:1 on white, clears the
   3:1 icon threshold). Used on white grounds where the legacy sage CHECK image
   would render low-contrast. Decorative, aria-hidden. */
function CheckMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <path d="M20 6L9 17l-5-5" stroke="#4f7256" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Plain round bullet — decorative, aria-hidden */
function Dot() {
  return <span aria-hidden="true" style={{ color: TAUPE_LT, fontSize: 18, lineHeight: 1.1, flexShrink: 0 }}>&bull;</span>;
}

/* Social share row shown under an expanded FAQ answer. */
function ShareIcons({ url }: { url: string }) {
  const ic: React.CSSProperties = { color: TAUPE, display: 'inline-flex', alignItems: 'center' };
  const enc = encodeURIComponent(url);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
      {/* P1 + P9 — external links with rel + aria-label */}
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook (opens in new tab)" style={ic}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H7.4v3.2h2.8V21h3.3z" /></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${enc}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X / Twitter (opens in new tab)" style={ic}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.1 3.8H5.3l12.5 16.3z" /></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn (opens in new tab)" style={ic}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6.5 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" /></svg>
      </a>
      {/* P2 — icon-only button needs aria-label */}
      <button
        type="button"
        aria-label="Copy page link to clipboard"
        onClick={() => { void navigator.clipboard?.writeText(url); }}
        style={{ ...ic, background: 'none', border: 'none', cursor: 'pointer', padding: '8px', minHeight: '44px', minWidth: '44px' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
      </button>
    </span>
  );
}

function Stars({ size = 18, withGoogle = false }: { size?: number; withGoogle?: boolean }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {withGoogle && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={GOOGLE} alt="Google" style={{ width: size + 1, height: size + 1 }} />
      )}
      {/* P1 — meaningful aria-label on star rating */}
      <span style={{ color: GREEN_TEXT, fontSize: size, letterSpacing: 2, lineHeight: 1 }} role="img" aria-label="5 out of 5 stars">{'★'.repeat(5)}</span>
      <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 14 }}>Over 800+ Reviews</span>
    </span>
  );
}

/* ---------- testimonials — mirrors app/weight-loss/page.tsx TestimonialsSection
   ("Real results from real clients" / "The change our clients feel first"):
   a 3-up card-lift grid with star row → quote → name. Adapted to PackagePage's
   inline-style tokens and fed per-service reviews (testimonials[c.id]). Keeps the
   before/after photo each body-contouring review carries, as conversion proof.
   The heading is an H3 because it sits inside the H2 "secret" section. ---------- */
/* One slide = the full before/after composite (the hero) + a minimal caption
   beneath it. Mirrors ResultsCarousel's ResultCard EXACTLY: the image renders at
   width:100% with NO forced aspectRatio and NO objectFit:cover, so the wide
   baked Before|After composite shows in full and is never cropped. No outer card,
   no overlay labels, no centre divider — the rounded image with a soft drop-shadow
   sits directly on the section background. */
function TestimonialQuoteCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <figure style={{ margin: 0, boxSizing: 'border-box' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={t.image}
        alt={`${t.name} before and after body contouring treatment`}
        style={{
          width: '100%',
          borderRadius: '18px',
          display: 'block',
          boxShadow: '0 18px 40px rgba(40, 50, 40, 0.16)',
        }}
      />
      {/* Minimal caption: name is a quiet uppercase taupe label, quote stays
          secondary/light with a 2-line clamp + Read more/less toggle. */}
      <figcaption style={{ paddingTop: '18px' }}>
        <div
          style={{
            color: TAUPE,
            fontFamily: BODY,
            fontSize: '11.5px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '8px',
          }}
        >
          {t.name}
        </div>
        <p
          style={{
            color: '#5C5347',
            fontFamily: BODY,
            fontSize: '13.5px',
            lineHeight: 1.6,
            fontWeight: 300,
            margin: 0,
            ...(expanded
              ? {}
              : {
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }),
          }}
        >
          {t.quote}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rc-focusable"
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${t.name}'s review` : `Read full review by ${t.name}`}
          style={{
            color: GREEN_TEXT,
            fontFamily: BODY,
            fontSize: '12.5px',
            textDecoration: 'underline',
            cursor: 'pointer',
            background: 'transparent',
            padding: 0,
            border: 0,
            marginTop: '6px',
          }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
      </figcaption>
    </figure>
  );
}

/* Horizontal scroll-snap carousel that mirrors components/ResultsCarousel EXACTLY
   (the /glp1 before/after system): a flex scroll track with scroll-snap and a
   responsive peek (86vw / 60% / 42%), white circular ‹/› arrows, a soft right-edge
   white fade, hidden scrollbar, and a :focus-visible sage ring. Each slide is the
   full before/after composite — no crop, no overlay labels, no centre divider.
   All names/quotes stay in the SSR DOM, so SEO and a11y are preserved.
   Reduced-motion safe (smooth scroll falls back to auto). */
function TestimonialsSection({ items }: { items: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    // Scroll by roughly one slide so a fresh photo snaps into view.
    el.scrollBy({ left: dir * (el.clientWidth * 0.55), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <section aria-labelledby="testimonials-heading" style={{ marginTop: 48 }}>
      {/* Focus indicator: 3px deep-sage ring (#4F7256 on white), offset 2px.
          Slide sizing (responsive peek), arrow hover and hidden scrollbar live
          here too — all identical to ResultsCarousel. */}
      <style>{`
        .rc-focusable:focus-visible {
          outline: 3px solid #4F7256;
          outline-offset: 2px;
          border-radius: 4px;
        }
        .fr-testi-track::-webkit-scrollbar { display: none; }
        .fr-testi-slide { width: 86vw; }
        @media (min-width: 640px) {
          .fr-testi-slide { width: 60%; }
        }
        @media (min-width: 1024px) {
          .fr-testi-slide { width: 42%; }
        }
        .fr-testi-arrow:hover { transform: translateY(-50%) scale(1.05); }
        .fr-testi-arrow:active { transform: translateY(-50%) scale(0.98); }
      `}</style>
      <Eyebrow>Real results from real clients</Eyebrow>
      <div style={{ marginTop: 8 }}>
        {/* H3 — sits inside the H2 "secret" section, preserving heading order */}
        <h3 id="testimonials-heading" style={{ color: HEADING_GREEN, fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.4, textTransform: 'uppercase', textAlign: 'center', margin: 0 }}>
          The change our clients feel first
        </h3>
      </div>
      <p style={{ ...({ color: TAUPE, fontFamily: BODY, fontSize: 15, lineHeight: 1.7 } as React.CSSProperties), textAlign: 'center', maxWidth: 560, margin: '16px auto 0' }}>
        A small sample of the hundreds of people across Malta who came to us after everything else had stopped working.
      </p>

      <div style={{ position: 'relative', marginTop: 40 }}>
        {/* Prominent circular arrows — anchored near the image's vertical middle
            (caption sits below). Identical to ResultsCarousel. */}
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous results"
          className="rc-focusable fr-testi-arrow absolute z-20 flex items-center justify-center"
          style={{
            left: '-10px',
            top: '32%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: GREEN_TEXT,
            fontSize: '22px',
            cursor: 'pointer',
            border: 0,
            lineHeight: 1,
            boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
            transition: 'transform 0.18s ease',
          }}
        >
          <span aria-hidden="true" style={{ marginTop: '-2px' }}>‹</span>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next results"
          className="rc-focusable fr-testi-arrow absolute z-20 flex items-center justify-center"
          style={{
            right: '-10px',
            top: '32%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: GREEN_TEXT,
            fontSize: '22px',
            cursor: 'pointer',
            border: 0,
            lineHeight: 1,
            boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
            transition: 'transform 0.18s ease',
          }}
        >
          <span aria-hidden="true" style={{ marginTop: '-2px' }}>›</span>
        </button>

        {/* Soft right-edge fade hinting there's more to scroll. */}
        <div
          aria-hidden="true"
          className="absolute z-10"
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            width: '48px',
            pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(255,255,255,0), #FFFFFF)',
          }}
        />

        <div
          ref={scrollRef}
          className="fr-testi-track flex overflow-x-auto"
          style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', gap: '28px' }}
        >
          {items.map((t) => (
            <div
              key={t.name}
              className="fr-testi-slide flex-shrink-0"
              style={{ scrollSnapAlign: 'start' }}
            >
              <TestimonialQuoteCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- evidence carousel ----------
   FIX 1 — the evidence cards used to sit in a rigid `repeat(3,1fr)` grid, so a
   service with 4 cards (muscle-stimulation, anti-cellulite, lipocavitation)
   orphaned the 4th card alone on a second row — the rejected "3 + odd one out".
   This is now a horizontal scroll-snap carousel that REUSES the in-file
   TestimonialsSection / ResultsCarousel pattern: a flex track with
   `overflow-x:auto`, scroll-snap, a hidden scrollbar, and white circular ‹/›
   arrows that appear ONLY when the track is actually scrollable (driven by
   atStart / atEnd / canScroll state). The card design (eyebrow tag pill, image,
   title, "WHAT IT DOES", body, Read more) and equal heights are unchanged.

   Layout by card count:
     • Desktop: each card is ~1/3 the row (so exactly 3 fit; a 4th peeks +
       scrolls). With exactly 3 cards the track isn't scrollable → NO arrows,
       NO fade, so it looks identical to the old clean 3-up row.
     • Mobile: cards ~85vw, swipeable, stack/scroll cleanly.
   All cards are preserved (no trimming) with no orphan on any count.
   Reduced-motion safe (smooth scroll falls back to auto via the same media
   rule that disables .fr-testi-track transitions; scrollBy honours it too). */
function EvidenceCarousel({
  items,
  openEv,
  setOpenEv,
}: {
  items: PackageContent['evidence'];
  openEv: number | null;
  setOpenEv: (v: number | null) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [canScroll, setCanScroll] = useState(false);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const scrollable = max > 2;
    setCanScroll(scrollable);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  };

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
    // Re-measure when the card set changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = typeof window !== 'undefined'
      && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div style={{ position: 'relative', marginTop: 40 }}>
      <style>{`
        .fr-ev-track::-webkit-scrollbar { display: none; }
        .fr-ev-slide { width: 85vw; }
        @media (min-width: 640px) { .fr-ev-slide { width: 46%; } }
        /* Desktop: ~1/3 of the row so exactly 3 are visible (gap-aware). */
        @media (min-width: 1024px) { .fr-ev-slide { width: calc((100% - 48px) / 3); } }
        .fr-ev-arrow:hover { transform: translateY(-50%) scale(1.05); }
        .fr-ev-arrow:active { transform: translateY(-50%) scale(0.98); }
      `}</style>

      {/* White circular ‹/› arrows — rendered ONLY when the track is scrollable
          (4+ cards on desktop, or any overflow on narrow screens), and each is
          disabled/hidden at its respective end. A 3-card row never shows them. */}
      {canScroll && !atStart && (
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Previous evidence"
          className="rc-focusable fr-ev-arrow absolute z-20 flex items-center justify-center"
          style={{
            left: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: GREEN_TEXT,
            fontSize: '22px',
            cursor: 'pointer',
            border: 0,
            lineHeight: 1,
            boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
            transition: 'transform 0.18s ease',
          }}
        >
          <span aria-hidden="true" style={{ marginTop: '-2px' }}>‹</span>
        </button>
      )}
      {canScroll && !atEnd && (
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Next evidence"
          className="rc-focusable fr-ev-arrow absolute z-20 flex items-center justify-center"
          style={{
            right: '-10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: '#FFFFFF',
            color: GREEN_TEXT,
            fontSize: '22px',
            cursor: 'pointer',
            border: 0,
            lineHeight: 1,
            boxShadow: '0 4px 16px rgba(0,0,0,0.16)',
            transition: 'transform 0.18s ease',
          }}
        >
          <span aria-hidden="true" style={{ marginTop: '-2px' }}>›</span>
        </button>
      )}

      {/* Soft right-edge fade — only while there's more to scroll to the right. */}
      {canScroll && !atEnd && (
        <div
          aria-hidden="true"
          className="absolute z-10"
          style={{
            top: 0,
            right: 0,
            bottom: 0,
            width: '48px',
            pointerEvents: 'none',
            background: 'linear-gradient(to right, rgba(255,255,255,0), #FFFFFF)',
          }}
        />
      )}

      <div
        ref={scrollRef}
        className="fr-ev-track flex overflow-x-auto"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', gap: '24px', alignItems: 'stretch' }}
      >
        {items.map((e, i) => {
          const open = openEv === i;
          const panelId = `ev-panel-${i}`;
          const btnId = `ev-btn-${i}`;
          return (
            <div
              key={e.title}
              className="fr-ev-slide flex-shrink-0"
              style={{ scrollSnapAlign: 'start', position: 'relative', paddingTop: 16, display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
                <div style={{ border: `2px solid ${GREEN_TEXT}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: '#eef3ea', position: 'relative', height: 186 }}>
                  {/* P3 — next/image for evidence images */}
                  <Image src={e.img} alt="" fill sizes="(max-width: 640px) 85vw, (max-width: 1024px) 46vw, 33vw" style={{ objectFit: 'cover' }} />
                </div>
                <span style={{ position: 'absolute', top: -14, left: 18, backgroundColor: '#fff', color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 600, fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: 999, border: `2px solid ${GREEN_TEXT}`, whiteSpace: 'nowrap' }}>{e.tag}</span>
              </div>
              <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #F2F6EF 100%)', border: '1px solid #e8e2da', borderRadius: 16, marginTop: -70, padding: '92px 30px 30px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* P6 — H3 within evidence section */}
                <h3 style={{ color: GREEN_TEXT, fontFamily: SERIF, fontWeight: 400, fontSize: 20, lineHeight: 1.3, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'pre-line', margin: 0 }}>{e.title}</h3>
                <div style={{ width: 90, height: 1, backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} />
                <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
                <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: '0 0 6px', ...(open ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }) }}>{e.does}</p>
                {open && (
                  <div id={panelId} role="region" aria-labelledby={btnId}>
                    <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {e.results.map((r) => (
                        <li key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <Dot /><span style={{ color: TAUPE, fontFamily: BODY, fontSize: 13.5, lineHeight: 1.7 }}>{r}</span>
                        </li>
                      ))}
                    </ul>
                    {e.foot && <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{e.foot}</p>}
                  </div>
                )}
                <button
                  id={btnId}
                  onClick={() => setOpenEv(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  style={{
                    marginTop: 'auto',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: TAUPE,
                    fontFamily: BODY,
                    fontSize: 15,
                    fontStyle: 'italic',
                    textDecoration: 'underline',
                    padding: '8px 0',
                    display: 'block',
                    /* P2 — min touch target */
                    minHeight: '44px',
                  }}
                >
                  {open ? 'Read less' : 'Read more'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================ */
export default function PackagePage({ content: c }: { content: PackageContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [faqQuery, setFaqQuery] = useState('');
  const [openEv, setOpenEv] = useState<number | null>(null);

  const body: React.CSSProperties = { color: TAUPE, fontFamily: BODY, fontSize: 15, lineHeight: 1.7, margin: 0 };
  const differenceBullets = c.differenceBullets ?? SHARED_DIFFERENCE_BULLETS;
  const commitment = c.commitment ?? SHARED_COMMITMENT;
  const whyMalta = c.whyMalta ?? SHARED_WHY_MALTA;
  const hidden = c.hide ?? {};

  return (
    <>
      {/* P1 — Skip-to-main-content: first focusable element */}
      <a
        href="#pkg-main"
        style={{
          position: 'fixed',
          top: '-100%',
          left: 16,
          zIndex: 9999,
          background: '#fff',
          color: GREEN_TEXT,
          padding: '8px 16px',
          borderRadius: 6,
          fontFamily: BODY,
          fontSize: 14,
          fontWeight: 700,
          textDecoration: 'underline',
          transition: 'top 0.2s',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '16px'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-100%'; }}
      >
        Skip to main content
      </a>

      {/* Clean, neutral page ground (white → very light off-white). The former
          page-wide teal/sage gradient wash has been removed so the template reads
          premium and minimal — matching the home / weight-loss aesthetic. Section
          separation comes from whitespace and thin rules, not green gradients. */}
      <div
        id="pkg-main"
        style={{
          fontFamily: BODY,
          backgroundColor: '#ffffff',
        }}
      >
        {/* ===================== 1. HERO ===================== */}
        <PageHero
          headline={(() => {
            const parts = c.heroTitle.split(/\s*[—–]\s*/).filter(Boolean);
            return parts.length > 1
              ? [{ text: parts[0] }, { text: parts.slice(1).join(' — '), em: true }]
              : [{ text: c.heroTitle }];
          })()}
          sub={c.heroDescription}
          bullets={c.heroIncludes.map((t) => ({ text: t }))}
          primaryCta={{ text: 'Claim Your Spot Now', href: BOOKING_URL, external: true }}
          media={c.heroVideo
            ? { type: 'video', src: c.heroVideo, poster: c.heroImage, alt: c.heroSubheading }
            : { type: 'image', src: c.heroImage, alt: c.heroSubheading }}
          proof={{ rating: '4.9', reviews: '800+', awardSrc: BADGE, awardText: '#1 voted clinic\nMalta' }}
          offer={{ totalValue: c.heroTotalValue, todayPrice: c.heroTodayPrice, note: c.heroPriceNote }}
          compactHeadline
          motif
        />

        {/* The standalone price band that used to sit here has been removed — the
            offer (total value → today's price → note) now renders inside the hero
            via the PageHero `offer` prop above, so it's the first thing seen above
            the fold without duplicating the price further down the page. */}

        {/* ===================== 2. SOCIAL PROOF — before / after ===================== */}
        {/* The old "secret" heading band has been removed: after the hero the page now
            goes straight to before/after social proof, then into the explanatory copy
            block. The legal fineprint disclaimers are kept as a subtle footnote below
            the proof so nothing legal is lost. */}
        <section aria-labelledby="testimonials-heading" style={{ paddingTop: 72, paddingBottom: 80 }}>
          {!hidden.testimonials && TESTIMONIALS[c.id] && TESTIMONIALS[c.id].length > 0 && (
            <div style={{ ...CONTAINER, maxWidth: 1120 }}>
              <TestimonialsSection items={TESTIMONIALS[c.id]} />
            </div>
          )}

          {/* explanatory copy block — clean two-column (image + text + CTA) matching
              the weight-loss / GLP-1 section design: white ground, thin sage rule,
              asymmetric-arch image, no page-wide gradient wash. */}
          <div style={{ ...CONTAINER, maxWidth: 1040, marginTop: 64 }}>
            <div style={{ width: 64, height: 1, backgroundColor: GREEN_TEXT, margin: '0 auto 18px' }} aria-hidden="true" />
            <SectionHeading>{c.secretSubheading}</SectionHeading>

            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center', marginTop: 40 }} className="fr-2col">
                {/* P3 — next/image with explicit dimensions + meaningful alt */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: c.secretImageRatio ?? '394 / 510' }}>
                  <Image
                    src={c.secretImage}
                    alt={c.secretSubheading}
                    fill
                    sizes="(max-width: 860px) 100vw, 45vw"
                    style={{ objectFit: 'cover', borderRadius: '100px 10px', display: 'block' }}
                  />
                </div>
                <div>
                  <p style={{ ...body, marginBottom: 18 }}>{c.secretIntro}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }} aria-label="Key points">
                    {c.secretBullets.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Dot /><span style={{ ...body }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ ...body, marginBottom: c.secretClosing2 ? 18 : 24 }}>
                    {c.secretClosingBold && c.secretClosing.includes(c.secretClosingBold) ? (
                      <>{c.secretClosing.slice(0, c.secretClosing.indexOf(c.secretClosingBold))}<strong>{c.secretClosingBold}</strong>{c.secretClosing.slice(c.secretClosing.indexOf(c.secretClosingBold) + c.secretClosingBold.length)}</>
                    ) : c.secretClosing}
                  </p>
                  {c.secretClosing2 && (
                    <p style={{ ...body, marginBottom: 24 }}>
                      {c.secretClosing2.lead && <span style={{ color: GREEN_TEXT, fontWeight: 700 }}>{c.secretClosing2.lead} </span>}
                      {c.secretClosing2.text}
                    </p>
                  )}
                  <CTA variant="blue" full />
                </div>
            </div>
          </div>
        </section>

        {/* ===================== 3. PRESS ===================== */}
        <section aria-label="Press coverage" style={{ paddingTop: 36, paddingBottom: 72 }}>
          <div style={CONTAINER}>
            <SectionHeading>
              {(c.pressHeading ?? PRESS_HEADING_DEFAULT).map((l, i, arr) => (
                <span key={i}>{l}{i < arr.length - 1 && <br />}</span>
              ))}
            </SectionHeading>
            {/* P1 — meaningful alt text on press logos */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 40, marginTop: 28 }}>
              {PRESS.map((p) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={p.src} src={p.src} alt={`${p.alt} logo`} style={{ height: p.h, width: 'auto' }} />
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 4. BENEFITS ===================== */}
        {!hidden.benefits && c.benefits.length > 0 && (
          <section aria-labelledby="benefits-heading" style={{ paddingTop: 48, paddingBottom: 84 }}>
            <div style={{ ...CONTAINER, maxWidth: 1180 }}>
              <h2 id="benefits-heading" className="sr-only">Treatment Benefits</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }} className="fr-benefits">
                {c.benefits.map((b) => (
                  <div key={b.title} style={{ background: '#ffffff', border: '1px solid #e8e2da', borderRadius: '22px 22px 0 22px', padding: '28px 24px 34px', boxShadow: '0 4px 18px rgba(120,114,104,0.08)' }}>
                    {/* P1 — decorative benefit icon gets aria-hidden */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.icon} alt="" aria-hidden="true" style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: 18 }} />
                    {/* P6 — H3 under visually hidden H2 section heading */}
                    <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px', lineHeight: 1.3 }}>{b.title}</h3>
                    <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{b.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== 4b. VALUE PROPS ===== */}
        {c.valueProps && (
          <section aria-labelledby="value-props-heading" style={{ paddingTop: 48, paddingBottom: 84 }}>
            <div style={CONTAINER}>
              <SectionHeading id="value-props-heading" size={24}>
                <span style={{ whiteSpace: 'pre-line' }}>{c.valueProps.heading}</span>
              </SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center', marginTop: 40 }} className="fr-2col">
                <div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {c.valueProps.bullets.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <Dot /><span style={{ ...body, fontSize: 14 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <CTA variant="blue" />
                  <div style={{ marginTop: 18 }}><Stars withGoogle /></div>
                </div>
                {/* P3 — next/image with aspect ratio */}
                <div style={{ position: 'relative', width: '100%', maxWidth: 384, aspectRatio: '384 / 362', marginInline: 'auto' }}>
                  <Image
                    src={c.valueProps.image}
                    alt={c.valueProps.heading}
                    fill
                    sizes="(max-width: 860px) 100vw, 40vw"
                    style={{ objectFit: 'cover', borderRadius: '100px 10px' }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== 4c. COMMITMENT PANEL ===== */}
        {c.commitmentPanel && (
          <section aria-labelledby="commitment-heading" style={{ ...CONTAINER, maxWidth: 1120, paddingTop: 60, paddingBottom: 84 }}>
            <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f2ec 0%, #e7ece2 100%)', borderRadius: 16, padding: '48px 48px 44px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WELL_BG} alt="" aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', width: 560, opacity: 0.28, pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Eyebrow>{c.commitmentPanel.eyebrow}</Eyebrow>
                <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 16px' }} />
                <SectionHeading id="commitment-heading">{c.commitmentPanel.heading}</SectionHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 40, maxWidth: 480 }}>
                  {[{ h: c.commitmentPanel.leftHeading, items: c.commitmentPanel.left }, { h: c.commitmentPanel.rightHeading, items: c.commitmentPanel.right }].map((col) => (
                    <div key={col.h}>
                      {/* P6 — H3 within the section */}
                      <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>{col.h}</h3>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {col.items.map((x) => (
                          <li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}>
                            <Dot /><span>{x}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
                  <CTA variant="blue" />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: TAUPE, fontFamily: WIDE, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={PARKING} alt="" aria-hidden="true" style={{ width: 22, height: 'auto' }} />
                    Complimentary on-site parking
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================== 5. ELIGIBILITY ===================== */}
        {!hidden.eligibility && c.areas.length > 0 && (
          <TreatmentBodyMap serviceId={c.id} heading={c.eligHeading} intro={c.eligIntro} />
        )}

        {/* ===================== 6. DIFFERENCE ===================== */}
        {!hidden.difference && (
          <section aria-labelledby="difference-heading" style={{ position: 'relative', paddingTop: 72, paddingBottom: 96, overflow: 'hidden', backgroundColor: '#ffffff' }}>
            {/* faint decorative motif (was a heavy 0.5-opacity green wash spanning the
                section — now a barely-there tint so the ground reads clean white). */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={DIFF_BG} alt="" aria-hidden="true" style={{ position: 'absolute', left: 0, top: '40%', width: '100%', opacity: 0.32, pointerEvents: 'none', zIndex: 0 }} />
            <div style={{ ...CONTAINER, position: 'relative', zIndex: 1 }}>
              <Eyebrow>the carisma difference</Eyebrow>
              <div style={{ marginTop: 10 }}>
                <SectionHeading id="difference-heading">
                  We Are Not Another Diet Clinic —<br />Malta&rsquo;s Doctor-Led Body Transformation Programme
                </SectionHeading>
              </div>
              <p style={{ ...body, textAlign: 'center', maxWidth: 720, margin: '18px auto 0' }}>{SHARED_DIFFERENCE_INTRO}</p>

              {/* Clean, high-contrast card: white ground, dark-ink uppercase body text
                  (#5a5043, ~7.3:1 on white), sage SVG tick icons (#4f7256, ~4.3:1 — clears
                  the 3:1 icon threshold). Replaces the prior muddy sage-on-sage gradient. */}
              <div style={{ marginTop: 36, marginLeft: 'auto', marginRight: 'auto', maxWidth: 560, background: '#ffffff', border: '1px solid #e8e2da', borderRadius: 16, padding: '34px 36px', boxShadow: '0 6px 26px rgba(120,114,104,0.12)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }} aria-label="The Carisma difference">
                  {differenceBullets.map((d) => (
                    <li key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <CheckMark size={18} /><span style={{ color: '#5a5043', fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', lineHeight: 1.5 }}>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ===================== 7. MULTIDISCIPLINARY TREATMENT + PROVEN EFFICACY ===================== */}
        {/* Redesigned to match the weight-loss / GLP-1 aesthetic: clean white ground,
            centred eyebrow → thin sage rule → serif H2, then a calm two-column block.
            The treatment BEFORE/AFTER image uses the GLP-1 asymmetric-arch treatment
            (90px diagonal corners + soft shadow) on a white card — no heavy sage
            gradient ground, no overlapping decorative image clutter. */}
        {!hidden.packageCard && (
          <section aria-labelledby="pt-heading" style={{ paddingTop: 64, paddingBottom: 84, backgroundColor: '#ffffff' }}>
            <div style={{ ...CONTAINER, maxWidth: 1040 }}>
              {c.ptEyebrow && <Eyebrow>{c.ptEyebrow}</Eyebrow>}
              <div aria-hidden="true" style={{ width: 64, height: 1, backgroundColor: GREEN_TEXT, margin: c.ptEyebrow ? '18px auto 0' : '0 auto' }} />
              {c.ptHeading && (
                <div style={{ marginTop: 18 }}>
                  <SectionHeading id="pt-heading" size={26}>
                    <span style={{ whiteSpace: 'pre-line' }}>{c.ptHeading}</span>
                  </SectionHeading>
                </div>
              )}

              {c.ptLayout === 'centered' ? (
                <>
                  {c.ptCardEyebrow && <div style={{ marginTop: 40 }}><SectionHeading size={22}>{c.ptCardEyebrow}</SectionHeading></div>}
                  <div style={{ maxWidth: 820, margin: '20px auto 0' }}>
                    {c.ptParas.map((p, i) => (
                      <p key={p} style={{ ...body, textAlign: 'center', marginBottom: 14, fontWeight: i === 0 && c.ptLeadBold ? 700 : 400 }}>{p}</p>
                    ))}
                  </div>
                  <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center' }} className="fr-2col">
                    {/* PROVEN EFFICACY column */}
                    <div>
                      <p style={{ color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 700, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 16px' }}>Proven efficacy</p>
                      {c.ptEfficacyTitle && c.ptEfficacyTitle.trim().toLowerCase() !== 'proven efficacy' && <p style={{ ...body, marginBottom: 16 }}>{c.ptEfficacyTitle}</p>}
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 13 }}>
                        {c.ptEfficacyBullets.map((b) => (
                          <li key={b} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                            <CheckMark size={18} /><span style={{ ...body, fontSize: 14 }}>{stripProvenEfficacy(b)}</span>
                          </li>
                        ))}
                      </ul>
                      {c.ptClosing && <p style={{ ...body, fontSize: 14, marginBottom: 22 }}>{c.ptClosing}</p>}
                      {c.ptCardCta && <CTA variant="blue">{c.ptCardCta}</CTA>}
                    </div>
                    {/* treatment before/after — GLP-1-style asymmetric arch on white */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', overflow: 'hidden', borderRadius: '90px 16px 90px 16px', boxShadow: '0 16px 36px rgba(0,0,0,0.12)' }}>
                        <Image src={c.ptImage} alt={c.ptCardEyebrow ? `${c.ptCardEyebrow} treatment at Carisma Slimming, Malta` : 'Body contouring treatment at Carisma Slimming, Malta'} fill sizes="(max-width: 860px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '0.92fr 1.08fr', gap: 56, alignItems: 'center' }} className="fr-2col">
                  {/* treatment before/after — GLP-1-style asymmetric arch on white */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: '90px 16px 90px 16px', boxShadow: '0 16px 36px rgba(0,0,0,0.12)' }}>
                      <Image src={c.ptImage} alt={c.ptCardEyebrow ? `${c.ptCardEyebrow} treatment at Carisma Slimming, Malta` : 'Body contouring treatment at Carisma Slimming, Malta'} fill sizes="(max-width: 860px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div>
                    {c.ptTitleStyle === 'serif' ? (
                      <div style={{ borderBottom: '1px solid #e8e2da', paddingBottom: 14, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                        <p style={{ color: GREEN_TEXT, fontFamily: SERIF, fontWeight: 400, fontSize: 18, letterSpacing: 'normal', textTransform: 'uppercase', margin: 0 }}>{c.ptCardEyebrow}</p>
                        {c.ptCardTag && (
                          <>
                            <span style={{ width: 1, alignSelf: 'stretch', backgroundColor: '#d9d2ca' }} aria-hidden="true" />
                            <p style={{ color: TAUPE, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: 'normal', margin: 0 }}>{c.ptCardTag}</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                        <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>{c.ptCardEyebrow}</p>
                        {c.ptCardTag && <span style={{ color: GREEN_TEXT, fontFamily: WIDE, fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', border: `1px solid ${GREEN_TEXT}`, borderRadius: 999, padding: '5px 14px', whiteSpace: 'nowrap' }}>{c.ptCardTag}</span>}
                      </div>
                    )}
                    {c.ptParas.map((p, i) => (
                      <p key={p} style={{ ...body, marginBottom: 14, fontWeight: i === 0 && c.ptLeadBold ? 700 : 400 }}>{p}</p>
                    ))}
                    <p style={{ color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 700, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase', margin: '20px 0 14px' }}>Proven efficacy</p>
                    {c.ptEfficacyTitle && c.ptEfficacyTitle.trim().toLowerCase() !== 'proven efficacy' && <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.7, margin: '0 0 14px' }}>{c.ptEfficacyTitle}</p>}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                      {c.ptEfficacyBullets.map((b) => (
                        <li key={b} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                          <CheckMark size={18} /><span style={{ ...body, fontSize: 14 }}>{stripProvenEfficacy(b)}</span>
                        </li>
                      ))}
                    </ul>
                    {c.ptClosing && <p style={{ ...body, fontSize: 14, margin: '16px 0 0' }}>{c.ptClosing}</p>}
                    {c.ptCardCta && <div style={{ marginTop: 22 }}><CTA variant="blue">{c.ptCardCta}</CTA></div>}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ===================== 8. DUAL / STARTER PACK ===================== */}
        {!hidden.dual && (
          <section aria-labelledby="dual-heading" style={{ paddingTop: 48, paddingBottom: 84 }}>
            <div style={CONTAINER}>
              {c.dualEyebrow && <div style={{ marginBottom: 10 }}><Eyebrow>{c.dualEyebrow}</Eyebrow></div>}
              <SectionHeading id="dual-heading" size={25}>
                {c.dualHeading.map((l, i) => (<span key={i}>{l}{i < c.dualHeading.length - 1 && <br />}</span>))}
              </SectionHeading>

              <div style={{ marginTop: 36, background: 'linear-gradient(150deg, #eef1ea 0%, #e7ece2 100%)', borderRadius: 16, padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }} className="fr-2col">
                <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'space-around' }}>
                  {c.dualMini.map((m) => (
                    <div key={m.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0, width: 54, height: 54, border: '1px solid #d7dcd4', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.icon} alt="" aria-hidden="true" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                      </span>
                      <div>
                        {/* P6 — H3 within the section */}
                        <h3 style={{ color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 700, fontSize: 13, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '4px 0 6px' }}>{m.title}</h3>
                        <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{m.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '30px 30px' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 }} aria-label="Package inclusions">
                    {c.dualIncludes.map((it) => (
                      <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>
                        <Dot /><span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <div style={{ background: 'linear-gradient(150deg, #dfe8db 0%, #eef2ea 100%)', borderRadius: 16, padding: '18px 20px' }}>
                    <p style={{ color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 700, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>
                      TOTAL VALUE: {c.dualTotalValue} TODAY: <span style={{ color: TAUPE, fontSize: 18 }}>{c.dualTodayPrice}</span>
                    </p>
                    <div style={{ marginTop: 16, marginBottom: 14 }}><CTA variant="blue" full>{c.dualCtaLabel ?? 'Claim your spot now'}</CTA></div>
                    <Stars withGoogle />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== 8b. OFFER ===== */}
        {c.offer && (
          <section aria-labelledby="offer-heading" style={{ paddingTop: 48, paddingBottom: 84 }}>
            <div style={CONTAINER}>
              <SectionHeading id="offer-heading" size={24}>{c.offer.introHeading}</SectionHeading>
              <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 44, alignItems: 'center', marginTop: 36 }} className="fr-2col">
                {/* P3 — next/image */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '9 / 10', borderRadius: '10px 100px', overflow: 'hidden' }}>
                  <Image src={c.offer.introImage} alt={c.offer.introHeading} fill sizes="(max-width: 860px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  {c.offer.introParas.map((p) => (
                    <p key={p} style={{ ...body, fontSize: 14, marginBottom: 14 }}>{p}</p>
                  ))}
                  <div style={{ marginTop: 8 }}><CTA variant="blue" /></div>
                </div>
              </div>

              <div style={{ marginTop: 40, background: 'linear-gradient(150deg, #f1f3ee 0%, #e3eadf 100%)', borderRadius: 16, padding: 22, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 22, alignItems: 'stretch' }} className="fr-2col">
                <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '32px 30px' }}>
                  <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 8px' }}>{c.offer.tagline}</p>
                  <p style={{ ...body, fontSize: 13.5, marginBottom: 18 }}>{c.offer.subline}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }} aria-label="Offer inclusions">
                    {c.offer.includes.map((it) => (
                      <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>
                        <Dot /><span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                    TOTAL VALUE: {c.offer.totalValue} TODAY: <span style={{ color: GREEN_TEXT }}>{c.offer.todayPrice}</span>
                  </p>
                  <div style={{ marginBottom: 14 }}><CTA variant="blue" full>{c.offer.buttonLabel}</CTA></div>
                  <Stars withGoogle />
                </div>
                {/* P3 — next/image for card image */}
                <div style={{ position: 'relative', width: '100%', borderRadius: '100px 10px', overflow: 'hidden' }}>
                  <Image src={c.offer.cardImage} alt={`${c.offer.tagline} — package visual`} fill sizes="(max-width: 860px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================== 9. WELLNESS CHAIN + MAP ===================== */}
        {!hidden.wellness && (
          <section aria-labelledby="wellness-heading" style={{ ...CONTAINER, maxWidth: 1120, paddingTop: 60, paddingBottom: 84 }}>
            <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f2ec 0%, #e7ece2 100%)', borderRadius: 16, padding: '48px 48px 44px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={WELL_BG} alt="" aria-hidden="true" style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', width: 560, opacity: 0.28, pointerEvents: 'none', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <Eyebrow>the carisma difference</Eyebrow>
                <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 16px' }} />
                <SectionHeading id="wellness-heading">Malta&rsquo;s #1 Voted Slimming &amp; Wellness Clinic</SectionHeading>

                <div style={{ display: 'grid', gridTemplateColumns: hidden.map ? '1fr' : '1fr 1fr', gap: 48, marginTop: 40, alignItems: 'start' }} className="fr-2col">
                  <div>
                    {/* P6 — H3 under H2 section heading */}
                    <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>Our Commitment to Your Results</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {commitment.map((x) => (
                        <li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}>
                          <Dot /><span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>Why Women in Malta Choose Carisma</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {whyMalta.map((x) => (
                        <li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}>
                          <Dot /><span>{x}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {!hidden.map && (
                    <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 26px rgba(120,114,104,0.18)' }}>
                      {/* P1 — iframe needs title */}
                      <iframe
                        title={`${c.id} clinic location in Malta`}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`}
                        width="100%"
                        height="360"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ border: 0, display: 'block' }}
                        aria-label="Google Maps showing clinic location in Malta"
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
                  <CTA variant="blue" />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: TAUPE, fontFamily: WIDE, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={PARKING} alt="" aria-hidden="true" style={{ width: 22, height: 'auto' }} />
                    Complimentary on-site parking
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===================== 10. FAQ ===================== */}
        <section aria-labelledby="faq-heading" style={{ paddingTop: 84, paddingBottom: 84 }}>
          <div style={{ ...CONTAINER, maxWidth: 960 }}>
            <div className="fr-faqrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <SectionHeading id="faq-heading" size={28}>Frequently Asked Questions</SectionHeading>
              {/* P8 — linked label for search input */}
              <label htmlFor="faq-search" className="sr-only">Search frequently asked questions</label>
              <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: 256, borderBottom: '1px solid #d9d2ca' }}>
                <input
                  id="faq-search"
                  type="search"
                  value={faqQuery}
                  onChange={(e) => { setFaqQuery(e.target.value); setOpenFaq(null); }}
                  placeholder="Search questions…"
                  aria-label="Search frequently asked questions"
                  className="fr-faqsearch"
                  style={{ width: '100%', border: 'none', background: 'none', color: GREEN_TEXT, fontFamily: BODY, fontSize: 16, padding: '8px 30px 8px 2px' }}
                />
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={GREEN_TEXT} strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ position: 'absolute', right: 4 }}>
                  <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
                </svg>
              </span>
            </div>

            {/* P1 — live region so screen readers announce filtered results */}
            <div style={{ marginTop: 36 }} role="region" aria-live="polite" aria-label="FAQ answers">
              {c.faqs
                .filter((f) => !faqQuery || (f.q + ' ' + f.a).toLowerCase().includes(faqQuery.toLowerCase()))
                .map((f, i) => {
                  const open = openFaq === i;
                  const panelId = `faq-panel-${i}`;
                  const btnId = `faq-btn-${i}`;
                  return (
                    <div key={f.q} style={{ borderBottom: '1px solid #e6e1da', marginBottom: 24 }}>
                      {/* P1 — aria-expanded + aria-controls for accordion */}
                      <button
                        id={btnId}
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        style={{
                          width: '100%',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '26px 4px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: 16,
                          textAlign: 'left',
                          /* P2 — min touch target */
                          minHeight: '44px',
                        }}
                      >
                        <span style={{ color: GREEN_TEXT, fontFamily: WIDE, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>{f.q}</span>
                        <span
                          aria-hidden="true"
                          style={{
                            color: TAUPE_LT,
                            fontSize: 18,
                            flexShrink: 0,
                            transform: open ? 'rotate(180deg)' : 'none',
                            /* P7 — respect reduced motion */
                            transition: 'transform .2s',
                          }}
                        >
                          &#8964;
                        </span>
                      </button>
                      {open && (
                        <div id={panelId} role="region" aria-labelledby={btnId} style={{ padding: '0 4px 22px' }}>
                          <p style={{ ...body, fontSize: 16, margin: '0 0 16px', maxWidth: 760 }}>{f.a}</p>
                          <ShareIcons url={c.liveUrl} />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {c.faqCtaLabel !== '' && (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
                <CTA variant="blue">{c.faqCtaLabel ?? 'Claim your spot now'}</CTA>
              </div>
            )}
          </div>
        </section>

        {/* ===================== 11. EVIDENCE ===================== */}
        {!hidden.evidence && c.evidence.length > 0 && (
          <section aria-labelledby="evidence-heading" style={{ paddingTop: 48, paddingBottom: 96 }}>
            <div style={{ ...CONTAINER, maxWidth: 1100 }}>
              <Eyebrow>{c.evidenceEyebrow}</Eyebrow>
              <div style={{ width: 320, maxWidth: '60%', height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 0' }} />
              <div style={{ marginTop: 14 }}>
                <SectionHeading id="evidence-heading" size={24}>Evidence-Based Clinical Approach</SectionHeading>
              </div>

              {/* Scroll-snap carousel (see EvidenceCarousel): 3 cards → clean
                  3-up row with no arrows; 4+ cards → a 4th peeks and scrolls,
                  with white ‹/› arrows. No orphaned card on any count. */}
              <EvidenceCarousel items={c.evidence} openEv={openEv} setOpenEv={setOpenEv} />

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}>
                <CTA variant="blue">{c.evidenceCtaLabel ?? 'Claim your spot now'}</CTA>
              </div>
            </div>
          </section>
        )}

        <style>{`
          .fr-faqsearch::placeholder { color: ${GREEN_TEXT}; opacity: 1; }
          .fr-faqsearch:focus-visible { outline: 3px solid ${GREEN_TEXT}; outline-offset: 2px; }
          /* P7 — prefers-reduced-motion: disable testimonial card hover transitions */
          @media (prefers-reduced-motion: reduce) {
            .fr-testi-track *, .fr-ev-track * { transition: none !important; animation: none !important; }
          }
          @media (max-width: 860px) {
            .fr-hero-grid, .fr-2col, .fr-benefits { grid-template-columns: 1fr !important; }
            .fr-hero-img { order: -1; }
          }
          @media (max-width: 560px) { .fr-benefits { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </>
  );
}
