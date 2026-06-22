'use client';

import { useEffect, useRef, useState } from 'react';

// Mirrors the homepage "4 core pillars" section design exactly (same colours,
// fonts, card gradient, petal radius, spacing) — with a scroll-in stagger added.
// Copy is deliberately intriguing (the method itself is the €30 guide); the four
// pillars use consistent "<X> to eat" wording.

type Pillar = { title: string; subheading: string; items: string[]; icon: React.ReactNode };

const PILLARS: Pillar[] = [
  {
    title: 'When to Eat',
    subheading: 'The timing that quietly ends the afternoon crash.',
    items: ['Two simple defaults to choose between', 'A rhythm that fits your day — not the reverse'],
    icon: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  },
  {
    title: 'What to Eat',
    subheading: 'No banned foods — one quiet rule instead.',
    items: ['The signal that decides how full you feel', 'Built around real Maltese ingredients'],
    icon: (<><path d="M12 3v18" /><path d="M7 3v6a2 2 0 0 0 4 0V3" /><path d="M17 3c-1.5 0-2.5 2-2.5 5s1 4 2.5 4v6" /></>),
  },
  {
    title: 'How Much to Eat',
    subheading: 'Portions without scales, apps or counting.',
    items: ['A visual rule your hands already know', 'Works at home and at the table out'],
    icon: (<><path d="M5 11a7 7 0 0 1 14 0" /><path d="M3 11h18" /><path d="M12 4v3M8 18h8" /></>),
  },
  {
    title: 'Which Order to Eat',
    subheading: 'Same plate, re-sequenced — most eat it backwards.',
    items: ['The order that changes how you feel', 'Holds even when the pasta arrives first'],
    icon: (<><path d="M4 7h13l-3-3M20 17H7l3 3" /></>),
  },
];

export default function MethodPillars() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24" aria-labelledby="method-heading" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .mp-card {
          opacity: 0; transform: translateY(34px); will-change: opacity, transform;
          transition:
            opacity .7s cubic-bezier(.22,.61,.36,1) var(--d, 0ms),
            transform .7s cubic-bezier(.22,.61,.36,1) var(--d, 0ms);
        }
        .mp-card[data-shown='true'] { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .mp-card { opacity: 1; transform: none; transition: none; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center mb-2" aria-hidden="true" style={{ color: '#6f6456', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: 400, fontSize: '16px', letterSpacing: '3.2px', textTransform: 'uppercase' }}>
          The Method
        </p>
        <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
        <h2 id="method-heading" className="text-center mb-5" style={{ color: '#4f7256', fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: '25px', lineHeight: '1.3', textTransform: 'uppercase' }}>
          The Four-Pillar Method
        </h2>
        <p className="text-center mx-auto mb-12" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}>
          Every plan that failed you asked for too many decisions, made under pressure. This one asks four — and answers each. One clear answer to each. That is the entire structure.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '28px' }} role="list">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              role="listitem"
              className="mp-card"
              data-shown={shown ? 'true' : 'false'}
              style={{
                ['--d' as string]: `${i * 130}ms`,
                padding: '28px 24px',
                background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)',
                borderTopLeftRadius: '18px', borderTopRightRadius: '90px', borderBottomLeftRadius: '90px', borderBottomRightRadius: '18px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
              } as React.CSSProperties}
            >
              <div className="mb-5 flex items-center" style={{ height: '52px', flexShrink: 0 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3c5a40" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{p.icon}</svg>
              </div>
              <h3 className="mb-2 uppercase" style={{ color: '#3c5a40', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', fontWeight: 700, letterSpacing: '1px', lineHeight: '1.5' }}>
                {p.title}
              </h3>
              <p className="mb-4" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: '1.6', borderBottom: '1px solid rgba(60,90,64,0.12)', paddingBottom: '14px' }}>
                {p.subheading}
              </p>
              <ul className="space-y-3" style={{ flex: 1 }}>
                {p.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2" style={{ color: '#5a4f43', fontFamily: 'Roboto, sans-serif', fontSize: '13px', lineHeight: '1.55' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3c5a40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
