'use client';

import Image from 'next/image';
import MotifAccent from '@/components/layers/MotifAccent';

// Above-the-fold hero for the Carisma Slimming Guide page.
// - Softer mid-sage→light gradient so the white glass nav reads cleanly on it.
// - Headline strictly 2 lines.
// - "€30" lives ONLY as a floating chip (not duplicated as body text).
// - Compact vertical rhythm so the whole hero (incl. CTA) fits above the fold.
// BRAND RULES: #024C27 banned as bg (mid sage #4f7256 used); white text on the
// sage region is AA; Trajan headings always uppercase.

const PRODUCT_URL =
  'https://www.carismaslimming.com/product-page/the-carisma-slimming-weight-loss-guide-malta';

const HEADING = "'Trajan Pro', serif";
const LABEL = "'Novecento Wide Book', 'Novecento Wide', sans-serif";
const BODY = "'Roboto', sans-serif";

const checklist: { lead: string; rest: string }[] = [
  { lead: 'What to eat', rest: '— and what to swap, using local Maltese ingredients' },
  { lead: 'When to eat', rest: '— simple meal timing that fits your schedule' },
  { lead: '30+ recipes', rest: '— built for the Mediterranean kitchen' },
  { lead: 'A structure', rest: '— that works around social dinners and busy days' },
];

type Chip = { label: string; top?: string; left?: string; right?: string; bottom?: string };
const chips: Chip[] = [
  { label: '30+ RECIPES', top: '5%', left: '-3%' },
  { label: 'BUILT FOR MALTA', top: '42%', right: '-5%' },
  { label: 'FOR ONLY €30', bottom: '7%', left: '3%' },
];

export default function GuideHero() {
  return (
    <section
      aria-labelledby="guide-hero-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        // Softer mid-sage → light: the white glass nav sits cleanly on #4f7256
        // (no harsh near-black-green at the top), white text stays AA.
        backgroundImage:
          'linear-gradient(168deg, #4f7256 0%, #5e8366 32%, #93b196 60%, #C9D8C1 84%, #F5F8F2 100%)',
        paddingTop: 'clamp(92px, 12vh, 116px)',
        paddingBottom: 'clamp(36px, 5vh, 64px)',
      }}
    >
      <style>{`
        @keyframes guideHeroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes guideHeroChip { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        .guide-hero-book { animation: guideHeroFloat 6.5s ease-in-out infinite; }
        .guide-hero-chip { animation: guideHeroChip 5s ease-in-out infinite; }
        .guide-hero-chip--b { animation-delay: 1.1s; }
        .guide-hero-chip--c { animation-delay: 2.3s; }
        @media (prefers-reduced-motion: reduce) { .guide-hero-book, .guide-hero-chip { animation: none; } }
        @media (max-width: 860px) { .guide-hero-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
      `}</style>

      <MotifAccent
        mode="divider"
        style={{ position: 'absolute', top: 'clamp(80px, 11vh, 104px)', left: 'clamp(20px, 6vw, 80px)', width: 'min(40vw, 320px)', opacity: 0.16, color: '#F5F8F2' }}
      />

      <div
        className="guide-hero-grid"
        style={{
          position: 'relative',
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'center',
        }}
      >
        {/* LEFT: copy on sage → white text */}
        <div style={{ position: 'relative', zIndex: 2, color: '#ffffff' }}>
          <p style={{ fontFamily: LABEL, textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: 'clamp(10px, 1vw, 12px)', margin: '0 0 14px', color: '#e7efe4' }}>
            Recipes, meal timing &amp; a structured plan
          </p>

          <h1
            id="guide-hero-heading"
            style={{
              fontFamily: HEADING,
              textTransform: 'uppercase',
              lineHeight: 1.04,
              letterSpacing: '0.01em',
              fontSize: 'clamp(1.7rem, 3.2vw, 2.5rem)',
              margin: '0 0 16px',
              color: '#ffffff',
            }}
          >
            The Weight-Loss Guide
            <span style={{ display: 'block', color: '#dbe7d6', marginTop: 4 }}>Built for Maltese Life</span>
          </h1>

          <p style={{ fontFamily: BODY, fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)', lineHeight: 1.5, maxWidth: 500, margin: '0 0 22px', color: '#f0f5ee' }}>
            A doctor-backed system you can actually follow — no crash diets, no calorie counting.
          </p>

          <ul style={{ listStyle: 'none', margin: '0 0 26px', padding: 0, display: 'grid', gap: 10, maxWidth: 540 }}>
            {checklist.map((item) => (
              <li key={item.lead} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontFamily: BODY, fontSize: 'clamp(0.9rem, 1.2vw, 1.02rem)', lineHeight: 1.4, color: '#f0f5ee' }}>
                <span aria-hidden style={{ flex: '0 0 auto', width: 20, height: 20, marginTop: 1, borderRadius: '50%', background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>✓</span>
                <span><strong style={{ fontWeight: 700, color: '#ffffff' }}>{item.lead}</strong> {item.rest}</span>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 22px' }}>
            <a
              href={PRODUCT_URL}
              className="cta-glow"
              style={{ display: 'inline-block', fontFamily: LABEL, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)', fontWeight: 700, padding: '15px 32px', textDecoration: 'none' }}
            >
              Get the Slimming Guide
            </a>
            <span style={{ fontFamily: BODY, fontSize: 'clamp(0.82rem, 1vw, 0.92rem)', color: '#f0f5ee', whiteSpace: 'nowrap' }}>
              <span style={{ color: '#ffe6a3' }}>★</span> 4.9 · 800+ verified reviews
            </span>
          </div>
        </div>

        {/* RIGHT: floating book + glow + chips (no boxed container) */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'clamp(300px, 38vw, 440px)', zIndex: 1 }}>
          <div aria-hidden style={{ position: 'absolute', width: 'min(78%, 420px)', aspectRatio: '1 / 1', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(245,248,242,0.24) 42%, rgba(245,248,242,0) 70%)', filter: 'blur(6px)' }} />
          <div className="guide-hero-book" style={{ position: 'relative', width: 'min(82%, 380px)', filter: 'drop-shadow(0 24px 40px rgba(34, 56, 38, 0.42))' }}>
            <Image
              src="/wix/f940f0_a2ae67089c094ea4a1ed8c7a81f3c315~mv2.webp"
              alt="The Carisma Slimming Guide book — Maltese recipes, meal timing and a structured weight-loss plan"
              width={460}
              height={575}
              priority
              sizes="(max-width: 768px) 64vw, 380px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          {chips.map((chip, i) => (
            <span
              key={chip.label}
              className={`guide-hero-chip ${i === 1 ? 'guide-hero-chip--b' : i === 2 ? 'guide-hero-chip--c' : ''}`}
              style={{ position: 'absolute', top: chip.top, left: chip.left, right: chip.right, bottom: chip.bottom, zIndex: 3, fontFamily: LABEL, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 700, color: '#3c5a40', background: 'rgba(255, 255, 255, 0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.9)', borderRadius: 999, padding: '9px 16px', boxShadow: '0 8px 22px rgba(34, 56, 38, 0.18)', whiteSpace: 'nowrap' }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
