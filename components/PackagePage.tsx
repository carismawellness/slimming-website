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

import { useState, useEffect } from 'react';
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

/* ---------- palette / fonts (shared with the site) ---------- */
/* GREEN stays the bright brand sage but is DECORATIVE ONLY (gradient fills,
   image backings) — it is 2.39:1 on white and fails WCAG as text/UI border.
   GREEN_TEXT is the locked accessible deep-sage (--brand-green-text family,
   deepened to #456849 = 6.31:1 on white / >=4.5:1 on every panel here) used
   for ALL sage TEXT, ICONS, LINKS, INPUT, HEADINGS and meaningful borders. */
const GREEN = '#8EB093';
const GREEN_TEXT = '#456849';
/* Taupe text darkened to the locked accessible value (5.78:1 on white,
   >=4.5:1 on the #dfe8db sage price panels). One value replaces the old
   #9B8D83 / #7C7268 / #AFA39D-as-text so every taupe string clears AA. */
const TAUPE = '#6F6456';
const TAUPE_DK = '#6F6456';
/* TAUPE_LT keeps a lighter tone ONLY for decorative round bullet dots /
   chevrons (non-informational graphics); all taupe-light *text* (fineprint)
   is switched to TAUPE below. */
const TAUPE_LT = '#AFA39D';

const SERIF = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const WIDE = 'Novecento Wide Book, Novecento Wide, sans-serif';
const BODY = 'Roboto, sans-serif';

/* ---------- shared assets ---------- */
const W = '/wix/';
const BADGE = W + 'f940f0_c4008d16bc3245f7bc8663f5b60d7a82~mv2.png';
const GOOGLE = W + '87fc13_c507b5f7e86f4eed970b757bc84a8ec4~mv2.png';
const CHECK = W + '87fc13_59346c1121b34e759ebf20eba3054c8c~mv2.png';
const DIFF_BG = W + '87fc13_eed9276b67e74ae99994e6bab4bcd409~mv2.png';
const WELL_BG = W + 'f940f0_9f944ed58e3f4919bf87ef224beb4f94~mv2.png';
const PARKING = W + '87fc13_0426ba92e1fa4e9ebce44215146be031~mv2.png';
/* live order + rendered sizes (measured on carismaslimming.com: 173x54, 61x54, 204x64, 61x54, 86x54) */
const PRESS = [
  { src: W + 'f940f0_8c40f03f50684bf8adc6d9ca0cb2be9e~mv2.jpg', alt: 'Malta Daily', h: 54 },
  { src: W + 'f940f0_e6f0bd96c9d04debaa8d8b609cbf68e6~mv2.jpeg', alt: '89.7 Bay', h: 54 },
  { src: W + 'f940f0_8bd141199fea4275a1222b62f24f2d98~mv2.jpeg', alt: 'Lovin Malta', h: 64 },
  { src: W + 'f940f0_2120887ab6ef4957b02ff004e804beaf~mv2.png', alt: 'Times of Malta', h: 54 },
  { src: W + 'f940f0_0db6f1508426404eacea3b33b0e9112d~mv2.png', alt: 'Malta Today', h: 54 },
];
const PRESS_HEADING_DEFAULT = ['malta’s trusted clinic for', 'non surgical fat reduction'];

const CONTAINER: React.CSSProperties = { maxWidth: 1040, marginLeft: 'auto', marginRight: 'auto', paddingLeft: 24, paddingRight: 24 };

/* ---------- shared pieces ---------- */
function Eyebrow({ children, align = 'center', size = 15 }: { children: React.ReactNode; align?: 'center' | 'left'; size?: number }) {
  return (
    <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: size, fontWeight: 400, letterSpacing: 'normal', textTransform: 'uppercase', textAlign: align, margin: 0 }}>
      {children}
    </p>
  );
}

function SectionHeading({ children, align = 'center', size = 28 }: { children: React.ReactNode; align?: 'center' | 'left'; size?: number }) {
  return (
    <h2 style={{ color: GREEN_TEXT, fontFamily: SERIF, fontWeight: 400, fontSize: size, lineHeight: 1.4, letterSpacing: 'normal', textTransform: 'uppercase', textAlign: align, margin: 0 }}>
      {children}
    </h2>
  );
}

function CTA({ children = 'Claim your spot now', full = false, wide = false }: { variant?: 'green' | 'blue'; children?: React.ReactNode; full?: boolean; wide?: boolean }) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="cta-glow"
      style={{ display: full ? 'block' : 'inline-block', color: '#fff', fontFamily: WIDE, fontWeight: 700, fontSize: 14, letterSpacing: '1.4px', textTransform: 'uppercase', textAlign: 'center', textDecoration: 'none', padding: wide ? '15px 70px' : '15px 38px' }}
    >
      {children}
    </a>
  );
}

function Tick({ size = 18 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={CHECK} alt="" style={{ width: size, height: 'auto', flexShrink: 0, marginTop: 3 }} />;
}

/* Plain round bullet — the live pages use simple dots (not check icons) everywhere
   except the "we are not another diet clinic" card. */
function Dot() {
  return <span style={{ color: TAUPE_LT, fontSize: 18, lineHeight: 1.1, flexShrink: 0 }}>&bull;</span>;
}

/* Social share row shown under an expanded FAQ answer (live Wix FAQ widget). */
function ShareIcons({ url }: { url: string }) {
  const ic: React.CSSProperties = { color: TAUPE, display: 'inline-flex', alignItems: 'center' };
  const enc = encodeURIComponent(url);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${enc}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" style={ic}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.6c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.3H7.4v3.2h2.8V21h3.3z" /></svg>
      </a>
      <a href={`https://twitter.com/intent/tweet?url=${enc}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" style={ic}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1.6 2H8l4.4 5.9L18.9 2zm-1.1 18.1h1.7L7.1 3.8H5.3l12.5 16.3z" /></svg>
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" style={ic}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6.5 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4V9z" /></svg>
      </a>
      <button type="button" aria-label="Copy link" onClick={() => { void navigator.clipboard?.writeText(url); }} style={{ ...ic, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
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
      <span style={{ color: GREEN_TEXT, fontSize: size, letterSpacing: 2, lineHeight: 1 }} role="img" aria-label="5 out of 5 stars">{'★'.repeat(5)}</span>
      <span style={{ color: TAUPE, fontFamily: BODY, fontSize: 14 }}>Over 200+ Reviews</span>
    </span>
  );
}

/* ---------- before/after testimonial carousel ----------
   Faithful recreation of the live Wix HTML embed (Slick carousel):
   each slide is a combined before/after image with an overlapping
   quote card, three shown at a time on desktop. */
function TestimonialCard({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '20px 10px', margin: '0 10px', boxSizing: 'border-box' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.image} alt={`${t.name} before and after`} style={{ width: '100%', borderRadius: 16, display: 'block' }} />
      <div style={{ background: 'linear-gradient(178deg, #F8F6F2 42%, #C9D8C1 100%)', borderRadius: 16, padding: '15px', paddingTop: 70, marginTop: -91 }}>
        <p
          style={{
            color: '#655B4E', fontFamily: BODY, fontSize: 14, lineHeight: 1.5, margin: '0 0 5px',
            ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
          }}
        >
          {t.quote}
        </p>
        <button type="button" onClick={() => setExpanded((v) => !v)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 14, textDecoration: 'underline', color: '#655B4E', fontFamily: BODY }}>
          {expanded ? 'Read less' : 'Read more'}
        </button>
        <h3 style={{ fontSize: 16, fontWeight: 500, color: '#655B4E', margin: '24px 0 5px', fontFamily: BODY }}>{t.name}</h3>
      </div>
    </div>
  );
}

function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;
  const per = Math.min(3, n);
  const visible = Array.from({ length: per }, (_, i) => items[(start + i) % n]);
  // The live Wix embed is a Slick carousel with autoplay: true, autoplaySpeed: 3000.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setStart((s) => (s + 1) % n), 3000);
    return () => clearInterval(id);
  }, [paused, n]);
  const arrow: React.CSSProperties = { position: 'absolute', top: '38%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer', background: 'rgba(0,0,0,0)', color: GREEN_TEXT, fontSize: 24, lineHeight: 1, zIndex: 2 };
  return (
    <div style={{ position: 'relative', padding: '0 36px', marginTop: 36 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <button type="button" aria-label="Previous" onClick={() => setStart((start - 1 + n) % n)} style={{ ...arrow, left: 0 }}>&#8592;</button>
      <div className="fr-testi" style={{ display: 'flex' }}>
        {visible.map((t, i) => (
          <div key={`${start}-${i}`} style={{ flex: '1 1 0', minWidth: 0 }}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
      <button type="button" aria-label="Next" onClick={() => setStart((start + 1) % n)} style={{ ...arrow, right: 0 }}>&#8594;</button>
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
  // A section renders unless explicitly hidden for this package.
  const hidden = c.hide ?? {};

  return (
    <div style={{ backgroundColor: '#ffffff', fontFamily: BODY }}>
      {/* ===================== 1. HERO ===================== */}
      <PageHero
        headline={(() => {
          // Split the title on an em/en-dash into ≤2 lines (2nd line sage); else one line.
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
        proof={{ rating: '4.9', reviews: '200+', awardSrc: BADGE, awardText: '#1 voted clinic\nMalta' }}
        compactHeadline
      />

      {/* ===== offer band (preserves hero offer info) ===== */}
      <section style={{ paddingTop: 8, paddingBottom: 40 }}>
        <div style={{ ...CONTAINER, maxWidth: 760, textAlign: 'center' }}>
          {!hidden.heroSubheading && c.heroSubheading && (
            <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 15, margin: '0 0 14px' }}>{c.heroSubheading}</p>
          )}
          <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 16, margin: '0 0 4px' }}>
            <span style={{ fontWeight: 700 }}>TOTAL VALUE:</span> {c.heroTotalValue} <span style={{ fontWeight: 700 }}>TODAY:</span> {c.heroTodayPrice}
          </p>
          {c.heroPriceNote && <p style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12, margin: '0 0 18px' }}>{c.heroPriceNote}</p>}
          <div style={{ display: 'inline-block', marginBottom: 16 }}><CTA variant="green" wide>Claim your spot now</CTA></div>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}><Stars withGoogle size={22} /></div>
          <div>
            {c.heroFineprint.map((f) => (
              <p key={f} style={{ color: TAUPE, fontFamily: BODY, fontSize: 11, lineHeight: 1.5, margin: '0 auto', maxWidth: 460 }}>{f}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 2. SECRET (+ before/after testimonials) ===================== */}
      <section style={{ paddingTop: 84, paddingBottom: 84 }}>
        <div style={{ ...CONTAINER, maxWidth: 1180 }}>
          <SectionHeading>{c.secretHeading.map((l, i) => (<span key={i}>{l}{i < c.secretHeading.length - 1 && <br />}</span>))}</SectionHeading>
          <div style={{ width: 280, maxWidth: '60%', height: 1, backgroundColor: '#d9d2ca', margin: '18px auto 0' }} />

          {!hidden.testimonials && TESTIMONIALS[c.id] && TESTIMONIALS[c.id].length > 0 && (
            <TestimonialCarousel items={TESTIMONIALS[c.id]} />
          )}
        </div>

        <div style={{ ...CONTAINER, marginTop: 84 }}>
          {/* live: 980px rounded panel, gradient measured as linear-gradient(0deg, #F8F6F2 44.74%, rgba(142,176,147,0.4) 100%) */}
          <div style={{ maxWidth: 980, marginLeft: 'auto', marginRight: 'auto', borderRadius: 18, background: 'linear-gradient(0deg, #F8F6F2 44.74%, rgba(142,176,147,0.4) 100%)', padding: '48px 44px' }}>
            <SectionHeading>{c.secretSubheading}</SectionHeading>

            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 48, alignItems: 'center', marginTop: 36 }} className="fr-2col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.secretImage} alt={c.secretSubheading} style={{ width: '100%', aspectRatio: c.secretImageRatio ?? '394 / 510', objectFit: 'cover', borderRadius: '100px 10px', display: 'block' }} />
              <div>
                <p style={{ ...body, marginBottom: 18 }}>{c.secretIntro}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {c.secretBullets.map((b) => (
                    <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <Dot /><span style={{ ...body }}>{b}</span>
                    </li>
                  ))}
                </ul>
                <p style={{ ...body, marginBottom: c.secretClosing2 ? 18 : 24 }}>{c.secretClosingBold && c.secretClosing.includes(c.secretClosingBold) ? (<>{c.secretClosing.slice(0, c.secretClosing.indexOf(c.secretClosingBold))}<strong>{c.secretClosingBold}</strong>{c.secretClosing.slice(c.secretClosing.indexOf(c.secretClosingBold) + c.secretClosingBold.length)}</>) : c.secretClosing}</p>
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
        </div>
      </section>

      {/* ===================== 3. PRESS ===================== */}
      <section style={{ paddingTop: 36, paddingBottom: 72 }}>
        <div style={CONTAINER}>
          <SectionHeading>{(c.pressHeading ?? PRESS_HEADING_DEFAULT).map((l, i, arr) => (<span key={i}>{l}{i < arr.length - 1 && <br />}</span>))}</SectionHeading>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 40, marginTop: 28 }}>
            {PRESS.map((p) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={p.src} src={p.src} alt={p.alt} style={{ height: p.h, width: 'auto' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 4. BENEFITS ===================== */}
      {!hidden.benefits && c.benefits.length > 0 && (
      <section style={{ paddingTop: 48, paddingBottom: 84 }}>
        <div style={{ ...CONTAINER, maxWidth: 1180 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22 }} className="fr-benefits">
            {c.benefits.map((b) => (
              <div key={b.title} style={{ background: 'linear-gradient(189deg, #F8F6F2 44.74%, rgba(142,176,147,0.4) 100%)', borderRadius: '22px 22px 0 22px', padding: '28px 24px 34px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.icon} alt="" style={{ width: 52, height: 52, objectFit: 'contain', marginBottom: 18 }} />
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px', lineHeight: 1.3 }}>{b.title}</h3>
                <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ===== 4b. VALUE PROPS ("created for those who value…") ===== */}
      {c.valueProps && (
      <section style={{ paddingTop: 48, paddingBottom: 84 }}>
        <div style={CONTAINER}>
          {/* live: 24px, explicit break after "confidence," (data carries the \n) */}
          <SectionHeading size={24}><span style={{ whiteSpace: 'pre-line' }}>{c.valueProps.heading}</span></SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center', marginTop: 40 }} className="fr-2col">
            <div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.valueProps.bullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ color: TAUPE_LT, fontSize: 18, lineHeight: 1.1, flexShrink: 0 }}>&bull;</span>
                    <span style={{ ...body, fontSize: 14 }}>{b}</span>
                  </li>
                ))}
              </ul>
              <CTA variant="blue" />
              <div style={{ marginTop: 18 }}><Stars withGoogle /></div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.valueProps.image} alt={c.valueProps.heading} style={{ width: '100%', maxWidth: 384, aspectRatio: '384 / 362', objectFit: 'cover', borderRadius: '100px 10px', display: 'block', marginInline: 'auto' }} />
          </div>
        </div>
      </section>
      )}

      {/* ===== 4c. COMMITMENT PANEL ("35+ years delivering results") ===== */}
      {c.commitmentPanel && (
      <section style={{ ...CONTAINER, maxWidth: 1120, paddingTop: 60, paddingBottom: 84 }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f2ec 0%, #e7ece2 100%)', borderRadius: 24, padding: '48px 48px 44px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WELL_BG} alt="" aria-hidden style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', width: 560, opacity: 0.28, pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>{c.commitmentPanel.eyebrow}</Eyebrow>
            <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 16px' }} />
            <SectionHeading>{c.commitmentPanel.heading}</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 40, maxWidth: 480 }}>
              {[{ h: c.commitmentPanel.leftHeading, items: c.commitmentPanel.left }, { h: c.commitmentPanel.rightHeading, items: c.commitmentPanel.right }].map((col) => (
                <div key={col.h}>
                  <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>{col.h}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {col.items.map((x) => (
                      <li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}><span style={{ color: TAUPE_LT }}>&bull;</span><span>{x}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              <CTA variant="blue" />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: TAUPE, fontFamily: WIDE, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PARKING} alt="" style={{ width: 22, height: 'auto' }} />
                Complimentary on-site parking
              </span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ===================== 5. ELIGIBILITY ===================== */}
      {!hidden.eligibility && c.areas.length > 0 && (
      <section style={{ paddingTop: 48, paddingBottom: 84 }}>
        <div style={CONTAINER}>
          <Eyebrow>{c.eligEyebrow ?? 'eligibility criteria'}</Eyebrow>
          <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 14px' }} />
          <SectionHeading>{c.eligHeading}</SectionHeading>

          <div style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 44, alignItems: 'center', marginTop: 36 }} className="fr-2col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.eligImage} alt={c.eligHeading} style={{ width: '100%', aspectRatio: c.eligImageRatio, objectFit: c.eligImageRatio ? 'cover' : undefined, borderRadius: 16, display: 'block' }} />
            <div>
              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 16, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 20px', lineHeight: 1.6, maxWidth: 330 }}>{c.eligIntro}</p>
              {c.eligListStyle === 'checks' ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {c.areas.map((a) => (
                    <li key={a} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <Tick size={18} /><span style={{ ...body }}>{a}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {c.areas.map((a, i) => (
                    <div key={a} style={{ gridColumn: i === c.areas.length - 1 && c.areas.length % 2 === 1 ? '1 / -1' : 'auto', backgroundColor: '#fff', border: '1px solid #E5E0D8', borderRadius: 10, padding: '14px 16px', textAlign: 'center', color: TAUPE, fontFamily: WIDE, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{a}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ===================== 6. DIFFERENCE ===================== */}
      {!hidden.difference && (
      <section style={{ position: 'relative', paddingTop: 72, paddingBottom: 96, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={DIFF_BG} alt="" aria-hidden style={{ position: 'absolute', left: 0, top: '40%', width: '100%', opacity: 0.5, pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ ...CONTAINER, position: 'relative', zIndex: 1 }}>
          <Eyebrow>the carisma difference</Eyebrow>
          <div style={{ marginTop: 10 }}><SectionHeading>We Are Not Another Diet Clinic —<br />Malta&rsquo;s Doctor-Led Body Transformation Programme</SectionHeading></div>
          <p style={{ ...body, textAlign: 'center', maxWidth: 720, margin: '18px auto 0' }}>{SHARED_DIFFERENCE_INTRO}</p>

          <div style={{ marginTop: 36, marginLeft: 'auto', marginRight: 'auto', maxWidth: 560, background: 'linear-gradient(150deg, #eef2ec 0%, #e0e8df 100%)', borderRadius: 18, padding: '34px 36px' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {differenceBullets.map((d) => (
                <li key={d} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Tick size={18} /><span style={{ color: TAUPE, fontFamily: WIDE, fontSize: 12.5, letterSpacing: '0.4px', textTransform: 'uppercase', lineHeight: 1.5 }}>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      )}

      {/* ===================== 7. PACKAGE TREATMENTS ===================== */}
      {!hidden.packageCard && (
      <section style={{ paddingTop: 48, paddingBottom: 84 }}>
        <div style={CONTAINER}>
          {c.ptEyebrow && <Eyebrow>{c.ptEyebrow}</Eyebrow>}
          {/* live: short centered taupe hairline under the section eyebrow
              (wixui-horizontal-line, 116x1 #9B8D83, 15px below — measured on live
              skin-tightening / anti-cellulite / muscle-stimulation / lipocavitation / fat-reduction) */}
          {c.ptEyebrow && <div aria-hidden style={{ width: 116, height: 1, backgroundColor: TAUPE, margin: '15px auto 0' }} />}
          {c.ptHeading && <div style={{ marginTop: 8 }}><SectionHeading size={25}><span style={{ whiteSpace: 'pre-line' }}>{c.ptHeading}</span></SectionHeading></div>}

          {c.ptLayout === 'centered' ? (
            /* live lymphatic-drainage: white card, centered serif title, centered intro
               paragraphs, then text left / images right with an in-card blue CTA */
            <div style={{ marginTop: 36, backgroundColor: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 6px 26px rgba(120,114,104,0.14)' }}>
              <SectionHeading>{c.ptCardEyebrow}</SectionHeading>
              <div style={{ maxWidth: 880, margin: '20px auto 0' }}>
                {c.ptParas.map((p, i) => (<p key={p} style={{ ...body, textAlign: 'center', marginBottom: 14, fontWeight: i === 0 && c.ptLeadBold ? 700 : 400 }}>{p}</p>))}
              </div>
              <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 40, alignItems: 'start' }} className="fr-2col">
                <div>
                  {c.ptEfficacyTitle && <p style={{ ...body, marginBottom: 14 }}>{c.ptEfficacyTitle}</p>}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {c.ptEfficacyBullets.map((b) => (
                      <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                        <Dot /><span style={{ ...body, fontSize: 14 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                  {c.ptClosing && <p style={{ ...body, fontSize: 14, marginBottom: 20 }}>{c.ptClosing}</p>}
                  {c.ptCardCta && <CTA variant="blue">{c.ptCardCta}</CTA>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.ptImage} alt="" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
                  {(c.ptImage2 || c.ptImage3) && (
                    <div style={{ display: 'flex', gap: 18 }}>
                      {[c.ptImage2, c.ptImage3].filter(Boolean).map((img) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={img} src={img} alt="" style={{ width: 0, flex: '1 1 0', borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
          <div style={{ marginTop: 36, background: 'linear-gradient(150deg, #f1f3ee 0%, #e2e9df 100%)', borderRadius: 20, padding: 36, display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 40, alignItems: 'center' }} className="fr-2col">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.ptImage} alt="Before and after" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
              {c.ptImage2 && (
                <div style={{ position: 'relative' }}>
                  {c.ptDecorImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.ptDecorImage} alt="" aria-hidden style={{ position: 'absolute', left: -36, bottom: -36, width: 515, maxWidth: '60vw', height: 'auto', pointerEvents: 'none' }} />
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.ptImage2} alt="" style={{ width: c.ptImage2Width ?? '100%', height: 'auto', borderRadius: 12, position: 'relative' }} />
                </div>
              )}
            </div>
            <div>
              {c.ptTitleStyle === 'serif' ? (
                /* live anti-cellulite + skin-tightening header: green serif title | vertical rule | plain bold taupe tag,
                   1px rgba(142,176,147,0.62) hairline below (measured on both live pages) */
                <div style={{ borderBottom: '1px solid rgba(142,176,147,0.62)', paddingBottom: 14, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <p style={{ color: GREEN_TEXT, fontFamily: SERIF, fontWeight: 400, fontSize: 18, letterSpacing: 'normal', textTransform: 'uppercase', margin: 0 }}>{c.ptCardEyebrow}</p>
                  {c.ptCardTag && (
                    <>
                      <span style={{ width: 1, alignSelf: 'stretch', backgroundColor: '#d9d2ca' }} aria-hidden />
                      <p style={{ color: TAUPE, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: 'normal', margin: 0 }}>{c.ptCardTag}</p>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 14, flexWrap: 'wrap' }}>
                  <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: 0 }}>{c.ptCardEyebrow}</p>
                  {c.ptCardTag && <span style={{ color: GREEN_TEXT, fontFamily: WIDE, fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', border: `1px solid ${GREEN_TEXT}`, borderRadius: 20, padding: '5px 14px', whiteSpace: 'nowrap' }}>{c.ptCardTag}</span>}
                </div>
              )}
              {c.ptParas.map((p, i) => (<p key={p} style={{ ...body, marginBottom: 14, fontWeight: i === 0 && c.ptLeadBold ? 700 : 400 }}>{p}</p>))}
              {c.ptEfficacyTitle && <p style={{ color: TAUPE, fontFamily: WIDE, fontWeight: 400, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '4px 0 14px' }}>{c.ptEfficacyTitle}</p>}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.ptEfficacyBullets.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Dot /><span style={{ ...body, fontSize: 14 }}>{b}</span>
                  </li>
                ))}
              </ul>
              {c.ptClosing && <p style={{ ...body, fontSize: 14, margin: '16px 0 0' }}>{c.ptClosing}</p>}
              {c.ptCardCta && <div style={{ marginTop: 20 }}><CTA variant="blue">{c.ptCardCta}</CTA></div>}
            </div>
          </div>
          )}
        </div>
      </section>
      )}

      {/* ===================== 8. DUAL / STARTER PACK ===================== */}
      {!hidden.dual && (
      <section style={{ paddingTop: 48, paddingBottom: 84 }}>
        <div style={CONTAINER}>
          {c.dualEyebrow && <div style={{ marginBottom: 10 }}><Eyebrow>{c.dualEyebrow}</Eyebrow></div>}
          <SectionHeading size={25}>{c.dualHeading.map((l, i) => (<span key={i}>{l}{i < c.dualHeading.length - 1 && <br />}</span>))}</SectionHeading>

          <div style={{ marginTop: 36, background: 'linear-gradient(150deg, #eef1ea 0%, #e7ece2 100%)', borderRadius: 22, padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }} className="fr-2col">
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '34px 30px', display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'space-around' }}>
              {c.dualMini.map((m) => (
                <div key={m.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ flexShrink: 0, width: 54, height: 54, border: '1px solid #d7dcd4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.icon} alt="" style={{ width: 24, height: 24, objectFit: 'contain' }} />
                  </span>
                  <div>
                    <p style={{ color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 700, fontSize: 13, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '4px 0 6px' }}>{m.title}</p>
                    <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '30px 30px' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.dualIncludes.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>
                    <span style={{ color: TAUPE_LT, lineHeight: 1.2 }}>&bull;</span><span>{it}</span>
                  </li>
                ))}
              </ul>
              {/* live price box: sage at the top fading to cream, green label, larger taupe price */}
              <div style={{ background: 'linear-gradient(150deg, #dfe8db 0%, #eef2ea 100%)', borderRadius: 12, padding: '18px 20px' }}>
                <p style={{ color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 700, fontSize: 14, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  TOTAL VALUE: {c.dualTotalValue} TODAY: <span style={{ color: TAUPE, fontSize: 18 }}>{c.dualTodayPrice}</span>
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
                  {c.dualFineprint.map((f) => (<p key={f} style={{ color: TAUPE, fontFamily: BODY, fontSize: 11, lineHeight: 1.5, margin: 0 }}>{f}</p>))}
                </div>
                <div style={{ marginBottom: 14 }}><CTA variant="blue" full>{c.dualCtaLabel ?? 'Claim your spot now'}</CTA></div>
                <Stars withGoogle />
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ===== 8b. OFFER (bespoke; intro block + pricing card) ===== */}
      {c.offer && (
      <section style={{ paddingTop: 48, paddingBottom: 84 }}>
        <div style={CONTAINER}>
          <SectionHeading size={24}>{c.offer.introHeading}</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 44, alignItems: 'center', marginTop: 36 }} className="fr-2col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.offer.introImage} alt={c.offer.introHeading} style={{ width: '100%', borderRadius: '10px 100px', display: 'block' }} />
            <div>
              {c.offer.introParas.map((p) => (<p key={p} style={{ ...body, fontSize: 14, marginBottom: 14 }}>{p}</p>))}
              <div style={{ marginTop: 8 }}><CTA variant="blue" /></div>
            </div>
          </div>

          {/* pricing card */}
          <div style={{ marginTop: 40, background: 'linear-gradient(150deg, #f1f3ee 0%, #e3eadf 100%)', borderRadius: 22, padding: 22, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 22, alignItems: 'stretch' }} className="fr-2col">
            <div style={{ backgroundColor: '#fff', borderRadius: 16, padding: '32px 30px' }}>
              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 8px' }}>{c.offer.tagline}</p>
              <p style={{ ...body, fontSize: 13.5, marginBottom: 18 }}>{c.offer.subline}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {c.offer.includes.map((it) => (
                  <li key={it} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5 }}>
                    <span style={{ color: TAUPE_LT, lineHeight: 1.2 }}>&bull;</span><span>{it}</span>
                  </li>
                ))}
              </ul>
              <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 16px' }}>
                TOTAL VALUE: {c.offer.totalValue} TODAY: <span style={{ color: GREEN_TEXT }}>{c.offer.todayPrice}</span>
              </p>
              <div style={{ marginBottom: 14 }}><CTA variant="blue" full>{c.offer.buttonLabel}</CTA></div>
              <Stars withGoogle />
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.offer.cardImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '100px 10px', display: 'block' }} />
          </div>
        </div>
      </section>
      )}

      {/* ===================== 9. WELLNESS CHAIN + MAP ===================== */}
      {!hidden.wellness && (
      <section style={{ ...CONTAINER, maxWidth: 1120, paddingTop: 60, paddingBottom: 84 }}>
        <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #f5f2ec 0%, #e7ece2 100%)', borderRadius: 24, padding: '48px 48px 44px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={WELL_BG} alt="" aria-hidden style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%, -50%)', width: 560, opacity: 0.28, pointerEvents: 'none', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Eyebrow>the carisma difference</Eyebrow>
            <div style={{ width: 90, height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 16px' }} />
            <SectionHeading>Malta&rsquo;s #1 Voted Slimming &amp; Wellness Clinic</SectionHeading>

            <div style={{ display: 'grid', gridTemplateColumns: hidden.map ? '1fr' : '1fr 1fr', gap: 48, marginTop: 40, alignItems: 'start' }} className="fr-2col">
              <div>
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>Our Commitment to Your Results</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {commitment.map((x) => (<li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}><span style={{ color: TAUPE_LT }}>&bull;</span><span>{x}</span></li>))}
                </ul>
                <h3 style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 18px' }}>Why Women in Malta Choose Carisma</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {whyMalta.map((x) => (<li key={x} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: TAUPE, fontFamily: BODY, fontSize: 14.5, lineHeight: 1.55 }}><span style={{ color: TAUPE_LT }}>&bull;</span><span>{x}</span></li>))}
                </ul>
              </div>
              {!hidden.map && (
              <div style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 26px rgba(120,114,104,0.18)' }}>
                <iframe title={`${c.id} clinic location in Malta`} src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`} width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ border: 0, display: 'block' }} />
              </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
              <CTA variant="blue" />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: TAUPE, fontFamily: WIDE, fontSize: 13, letterSpacing: '1px', textTransform: 'uppercase' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PARKING} alt="" style={{ width: 22, height: 'auto' }} />
                Complimentary on-site parking
              </span>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ===================== 10. FAQ ===================== */}
      <section style={{ paddingTop: 84, paddingBottom: 84 }}>
        <div style={{ ...CONTAINER, maxWidth: 960 }}>
          {/* live Wix FAQ widget: heading left-of-center + underlined search field on the right */}
          <div className="fr-faqrow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <SectionHeading size={28}>Frequently Asked Questions</SectionHeading>
            <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', width: 256, borderBottom: '1px solid #d9d2ca' }}>
              <input
                type="text"
                value={faqQuery}
                onChange={(e) => { setFaqQuery(e.target.value); setOpenFaq(null); }}
                placeholder="Looking for something?"
                aria-label="Search frequently asked questions"
                className="fr-faqsearch"
                style={{ width: '100%', border: 'none', background: 'none', color: GREEN_TEXT, fontFamily: BODY, fontSize: 16, padding: '8px 30px 8px 2px' }}
              />
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={GREEN_TEXT} strokeWidth="2" strokeLinecap="round" aria-hidden style={{ position: 'absolute', right: 4 }}>
                <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" />
              </svg>
            </span>
          </div>
          <div style={{ marginTop: 36 }}>
            {c.faqs.filter((f) => !faqQuery || (f.q + ' ' + f.a).toLowerCase().includes(faqQuery.toLowerCase())).map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} style={{ borderBottom: '1px solid #e6e1da', marginBottom: 24 }}>
                  <button onClick={() => setOpenFaq(open ? null : i)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '26px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textAlign: 'left' }}>
                    <span style={{ color: GREEN_TEXT, fontFamily: WIDE, fontSize: 15, letterSpacing: '0.5px', textTransform: 'uppercase', lineHeight: 1.4 }}>{f.q}</span>
                    <span style={{ color: TAUPE_LT, fontSize: 18, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>&#8964;</span>
                  </button>
                  {open && (
                    <div style={{ padding: '0 4px 22px' }}>
                      <p style={{ ...body, fontSize: 16, margin: '0 0 16px', maxWidth: 760 }}>{f.a}</p>
                      <ShareIcons url={c.liveUrl} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* live: centered blue CTA between the FAQ list and the evidence section
              (skipped when faqCtaLabel is '' — live fat-dissolving has no FAQ CTA) */}
          {c.faqCtaLabel !== '' && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}><CTA variant="blue">{c.faqCtaLabel ?? 'Claim my spot now'}</CTA></div>
          )}
        </div>
      </section>

      {/* ===================== 11. EVIDENCE ===================== */}
      {!hidden.evidence && c.evidence.length > 0 && (
      <section style={{ paddingTop: 48, paddingBottom: 96 }}>
        <div style={{ ...CONTAINER, maxWidth: 1100 }}>
          <Eyebrow>{c.evidenceEyebrow}</Eyebrow>
          <div style={{ width: 320, maxWidth: '60%', height: 1, backgroundColor: '#d9d2ca', margin: '10px auto 0' }} />
          <div style={{ marginTop: 14 }}><SectionHeading size={24}>Evidence-Based Clinical Approach</SectionHeading></div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 40 }} className="fr-evgrid">
            {c.evidence.map((e, i) => {
              const open = openEv === i;
              const centerLast = i === c.evidence.length - 1 && c.evidence.length % 2 === 1;
              return (
                <div key={e.title} style={{ position: 'relative', paddingTop: 16, gridColumn: centerLast ? '1 / -1' : 'auto', maxWidth: centerLast ? 560 : undefined, justifySelf: centerLast ? 'center' : 'stretch', width: centerLast ? '100%' : undefined }}>
                  {/* petal-shaped, green-bordered image poking above the card, with overlapping tag pill */}
                  <div style={{ position: 'relative', width: '92%', margin: '0 auto', zIndex: 2 }}>
                    <div style={{ border: `2px solid ${GREEN_TEXT}`, borderRadius: '20px 80px', overflow: 'hidden', backgroundColor: GREEN }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={e.img} alt="" style={{ width: '100%', height: 186, objectFit: 'cover', display: 'block' }} />
                    </div>
                    <span style={{ position: 'absolute', top: -14, left: 18, backgroundColor: '#fff', color: GREEN_TEXT, fontFamily: WIDE, fontWeight: 600, fontSize: 12, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '7px 18px', borderRadius: 30, border: `2px solid ${GREEN_TEXT}`, whiteSpace: 'nowrap' }}>{e.tag}</span>
                  </div>
                  {/* gradient card sitting behind the lower part of the image */}
                  <div style={{ background: 'linear-gradient(180deg, #F8F6F2 0%, rgba(142,176,147,0.4) 100%)', borderRadius: 16, marginTop: -70, padding: '92px 30px 30px', position: 'relative', zIndex: 1 }}>
                    <h3 style={{ color: GREEN_TEXT, fontFamily: SERIF, fontWeight: 400, fontSize: 20, lineHeight: 1.3, textTransform: 'uppercase', textAlign: 'center', whiteSpace: 'pre-line', margin: 0 }}>{e.title}</h3>
                    <div style={{ width: 90, height: 1, backgroundColor: '#cfc8bf', margin: '16px auto 20px' }} />
                    <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 8px' }}>What it does</p>
                    <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 14, lineHeight: 1.6, margin: '0 0 6px', ...(open ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }) }}>{e.does}</p>
                    {open && (
                      <>
                        <p style={{ color: TAUPE_DK, fontFamily: WIDE, fontWeight: 700, fontSize: 12, letterSpacing: '1px', textTransform: 'uppercase', margin: '14px 0 8px' }}>Key results</p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {e.results.map((r) => (<li key={r} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}><span style={{ color: TAUPE_LT }}>&bull;</span><span style={{ ...body, fontSize: 13.5 }}>{r}</span></li>))}
                        </ul>
                        {e.foot && <p style={{ color: TAUPE, fontFamily: BODY, fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>{e.foot}</p>}
                      </>
                    )}
                    <button onClick={() => setOpenEv(open ? null : i)} style={{ marginTop: open ? 14 : 8, background: 'none', border: 'none', cursor: 'pointer', color: TAUPE, fontFamily: BODY, fontSize: 15, fontStyle: 'italic', textDecoration: 'underline', padding: 0, display: 'block' }}>{open ? 'Read less' : 'Read more'}</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 44 }}><CTA variant="blue">{c.evidenceCtaLabel ?? 'Claim my spot now'}</CTA></div>
        </div>
      </section>
      )}

      <style>{`
        .fr-faqsearch::placeholder { color: ${GREEN_TEXT}; opacity: 1; }
        .fr-faqsearch:focus-visible { outline: 3px solid ${GREEN_TEXT}; outline-offset: 2px; }
        @media (max-width: 860px) {
          .fr-hero-grid, .fr-2col, .fr-benefits, .fr-evgrid { grid-template-columns: 1fr !important; }
          .fr-evgrid > div { grid-column: auto !important; }
          .fr-testi { flex-direction: column !important; }
          .fr-hero-img { order: -1; }
        }
        @media (max-width: 560px) { .fr-benefits { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
