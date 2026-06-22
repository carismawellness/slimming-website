'use client';

import { useEffect, useRef, useState } from 'react';

// Premium outcomes section that REPLACES the old "STEP 1-4" tab-stepper.
// Mirrors the homepage / MethodPillars "4 core pillars" design language exactly:
// same white section ground, sage petal-gradient cards, asymmetric radius, fonts,
// spacing, and a sequential IntersectionObserver scroll-in stagger.
// Brand rules: Trajan Pro uppercase headings, Novecento Wide uppercase titles,
// Roboto body. #024C27 is BANNED as a background. WCAG AA text colours.

type Outcome = { title: string; text: string; icon: string };

const OUTCOMES: Outcome[] = [
  {
    title: 'Weight Stability',
    icon: '/wix/87fc13_423d81e5360e4d79b62846fe22c58655~mv2.png',
    text:
      'You stop dreading Monday mornings. You stop stepping on the scale after a difficult weekend and writing off the week. You learn to read the trend, not the moment. One number on one day stops having power over you. You begin to trust the direction, not obsess over the distance.',
  },
  {
    title: 'Appetite Stability',
    icon: '/wix/f940f0_e7472796f93447e68c2b1d2210b09224~mv2.webp',
    text:
      'You stop arriving at meals desperate. Hunger becomes something predictable, something you can read, something that arrives on schedule rather than ambushing you. You stop making decisions when you are already too hungry to make good ones. That alone changes everything.',
  },
  {
    title: 'Energy Stability',
    icon: '/wix/f940f0_fffe93587a1d4b73b4ff7af603ebd67a~mv2.webp',
    text:
      'The 3pm crash becomes unfamiliar. You stop needing caffeine to get through the afternoon. Sleep improves without doing anything specific about sleep. Your body regulates. You notice it first in the small things: concentration, mood, the way evenings feel lighter.',
  },
  {
    title: 'Emotional Calm Around Food',
    icon: '/wix/f940f0_ba9d9802e5184f72ae39ac796ad06084~mv2.webp',
    text:
      'You go to dinner and enjoy it. You come home and do not spiral. You stop the all-or-nothing arithmetic, the mental ledger of what you ate and what it cost you. Food becomes simpler. Less loaded. You leave the table satisfied, not negotiating with yourself.',
  },
];

export default function OutcomesShowcase() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24" aria-labelledby="outcomes-heading" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .oc-card {
          opacity: 0; transform: translateY(34px); will-change: opacity, transform;
          transition:
            opacity .7s cubic-bezier(.22,.61,.36,1) var(--d, 0ms),
            transform .7s cubic-bezier(.22,.61,.36,1) var(--d, 0ms);
        }
        .oc-card[data-shown='true'] { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .oc-card { opacity: 1; transform: none; transition: none; } }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center mb-2"
          aria-hidden="true"
          style={{
            color: '#6f6456',
            fontFamily: 'Novecento Wide Book, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            letterSpacing: '3.2px',
            textTransform: 'uppercase',
          }}
        >
          What this builds
        </p>
        <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
        <h2
          id="outcomes-heading"
          className="text-center mb-5"
          style={{
            color: '#4f7256',
            fontFamily: 'Trajan Pro, serif',
            fontWeight: 400,
            fontSize: '25px',
            lineHeight: '1.3',
            textTransform: 'uppercase',
          }}
        >
          What sustainable weight loss actually looks like
        </h2>
        <p
          className="text-center mx-auto mb-12"
          style={{ color: '#5f5649', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}
        >
          Not a number you reach and lose again — four kinds of stability that quietly settle into your days and stay there.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: '28px' }} role="list">
          {OUTCOMES.map((o, i) => (
            <div
              key={o.title}
              role="listitem"
              className="oc-card"
              data-shown={shown ? 'true' : 'false'}
              style={
                {
                  ['--d' as string]: `${i * 130}ms`,
                  padding: '28px 24px',
                  background: 'linear-gradient(180deg, #F2F6EF 0%, #C9D8C1 100%)',
                  borderTopLeftRadius: '18px',
                  borderTopRightRadius: '90px',
                  borderBottomLeftRadius: '90px',
                  borderBottomRightRadius: '18px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                } as React.CSSProperties
              }
            >
              <div className="mb-5 flex items-center" style={{ height: '52px', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={o.icon}
                  alt=""
                  aria-hidden="true"
                  width={44}
                  height={44}
                  style={{ width: '44px', height: '44px', objectFit: 'contain', display: 'block' }}
                />
              </div>
              <h3
                className="mb-3 uppercase"
                style={{
                  color: '#3c5a40',
                  fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif",
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  lineHeight: '1.5',
                  borderBottom: '1px solid rgba(60,90,64,0.12)',
                  paddingBottom: '14px',
                }}
              >
                {o.title}
              </h3>
              <p
                style={{
                  color: '#5f5649',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  lineHeight: '1.65',
                  flex: 1,
                }}
              >
                {o.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
