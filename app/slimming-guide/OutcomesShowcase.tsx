'use client';

import { useEffect, useRef, useState } from 'react';

// Outcomes section — deliberately a DIFFERENT visual language from the four-pillar
// petal cards directly above it. An editorial numbered list: large outlined index
// numerals + hairline dividers on a clean white ground, with a sequential
// IntersectionObserver scroll-in stagger. No gradient cards.
// Brand rules: Trajan Pro uppercase headings, Novecento Wide uppercase titles,
// Roboto body, WCAG AA text colours, #024C27 never used as a background.

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
  const ref = useRef<HTMLOListElement>(null);

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
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24" aria-labelledby="outcomes-heading" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .oc-row {
          opacity: 0; transform: translateY(28px); will-change: opacity, transform;
          transition:
            opacity .75s cubic-bezier(.22,.61,.36,1) var(--d, 0ms),
            transform .75s cubic-bezier(.22,.61,.36,1) var(--d, 0ms);
        }
        .oc-row[data-shown='true'] { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) { .oc-row { opacity: 1; transform: none; transition: none; } }
      `}</style>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center mb-2"
          aria-hidden="true"
          style={{ color: '#6f6456', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: 400, fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase' }}
        >
          What this builds
        </p>
        <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
        <h2
          id="outcomes-heading"
          className="text-center mb-5"
          style={{ color: '#4f7256', fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.3, textTransform: 'uppercase' }}
        >
          What sustainable weight loss actually looks like
        </h2>
        <p
          className="text-center mx-auto mb-14"
          style={{ color: '#5f5649', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px' }}
        >
          Not a number you reach and lose again — four kinds of stability that quietly settle into your days and stay there.
        </p>

        <ol ref={ref} className="mx-auto" style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: '760px' }}>
          {OUTCOMES.map((o, i) => (
            <li
              key={o.title}
              className="oc-row"
              data-shown={shown ? 'true' : 'false'}
              style={{ ['--d' as string]: `${i * 140}ms` } as React.CSSProperties}
            >
              <div
                className="grid items-start"
                style={{
                  gridTemplateColumns: 'clamp(64px, 14vw, 104px) 1fr',
                  gap: 'clamp(18px, 4vw, 40px)',
                  padding: 'clamp(26px, 4vw, 38px) 0',
                  borderTop: i === 0 ? 'none' : '1px solid rgba(60,90,64,0.14)',
                }}
              >
                {/* Left: large outlined index numeral + small icon */}
                <div className="flex flex-col items-start" style={{ gap: '10px' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: 'Trajan Pro, serif',
                      fontSize: 'clamp(38px, 7vw, 64px)',
                      lineHeight: 0.9,
                      fontWeight: 400,
                      color: 'transparent',
                      WebkitTextStroke: '1px #9bb89e',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.icon} alt="" aria-hidden="true" width={34} height={34} style={{ width: '34px', height: '34px', objectFit: 'contain', display: 'block', opacity: 0.9 }} />
                </div>

                {/* Right: title + body */}
                <div>
                  <h3
                    className="uppercase"
                    style={{ color: '#3c5a40', fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '1px', lineHeight: 1.4, margin: '0 0 12px' }}
                  >
                    {o.title}
                  </h3>
                  <p style={{ color: '#5f5649', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: 1.7, margin: 0 }}>
                    {o.text}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
