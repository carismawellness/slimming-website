'use client';

import { useEffect, useRef, useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const bodyFont = 'Roboto, sans-serif';
// Accessible brand-family colors (WCAG 2.2 AA/AAA).
// --brand-green-text: deep sage for sage text/icons/headings on white (5.42:1).
const green = '#4F7256';
// Deep taupe ink for body/quote text on the white section ground (7.54:1, AAA).
const textColor = '#5C5347';
// Muted taupe for the quiet, secondary client-name label (#6f6456 = AA on white).
const nameColor = '#6F6456';
// Section ground — used by the right-edge scroll-fade overlay so it blends seamlessly.
const sectionBg = '#FFFFFF';

type Result = { name: string; image: string; quote: string };

// Order and copy mirror the live Wix slick-carousel embed
const RESULTS: Result[] = [
  {
    name: 'NICOLE FARRUGIA',
    image: '/wix/87fc13_859aab08ea744d8c997b5cfd312823a5~mv2.webp',
    quote:
      'I struggled with my weight for a long time and it was affecting my confidence and energy and after this journey I feel lighter in my body and happier when I look at myself.',
  },
  {
    name: 'LAURA BENNETT',
    image: '/wix/87fc13_671e0f2c983242c5ad4711a7d5a7ce91~mv2.webp',
    quote:
      'I had tried dieting on and off for years but my weight always came back. This helped me reset my habits and feel more comfortable in my body again.',
  },
  {
    name: 'MARY KOWALSKA',
    image: '/wix/87fc13_c617250be48e4af7ba36007603d8533b~mv2.webp',
    quote:
      'My goal was not to be skinny but to feel healthier and more toned. The change has been gradual but very motivating and I finally feel like myself again.',
  },
  {
    name: 'ANNA LINDSTRÖM',
    image: '/wix/87fc13_7fc62a3875154ae2a204387f87a61814~mv2.webp',
    quote:
      'My issue wasn’t just weight, it was how heavy my body felt to carry. Walking, standing for long periods, even basic daily things felt tiring. I felt rounded and compressed, especially through my middle and back. Seeing this change feels like relief. I move easier, my posture is better, and I finally feel balanced in my body again.',
  },
];

function ResultCard({ r }: { r: Result }) {
  const [expanded, setExpanded] = useState(false);
  return (
    // One slide = the photo (the hero) + a minimal caption beneath it.
    // No outer card, no border, no gradient panel — the rounded image with a soft
    // drop-shadow sits directly on the section background.
    <figure
      className="rc-slide flex-shrink-0"
      style={{ margin: 0, boxSizing: 'border-box', scrollSnapAlign: 'start' }}
    >
      <img
        src={r.image}
        alt={`${r.name} before and after`}
        className="rc-photo"
        style={{
          width: '100%',
          borderRadius: '18px',
          display: 'block',
          boxShadow: '0 18px 40px rgba(40, 50, 40, 0.16)',
        }}
      />
      {/* Minimal caption: the name is a quiet label, the quote stays secondary/light. */}
      <figcaption style={{ paddingTop: '18px' }}>
        <div
          style={{
            color: nameColor,
            fontFamily: bodyFont,
            fontSize: '11.5px',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: '8px',
          }}
        >
          {r.name}
        </div>
        <p
          style={{
            color: textColor,
            fontFamily: bodyFont,
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
          {r.quote}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rc-focusable"
          aria-expanded={expanded}
          style={{
            color: green,
            fontFamily: bodyFont,
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

export default function ResultsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by roughly one slide so a fresh photo snaps into view.
    el.scrollBy({ left: dir * (el.clientWidth * 0.55), behavior: 'smooth' });
  };

  // Infinite seamless loop: the slides are rendered DUPLICATED back-to-back, so
  // the scrollable width is twice the real content. Whenever the scroll position
  // crosses into the second copy (>= half), we instantly subtract half a width;
  // when it reaches the very start (left edge) we jump forward into copy #2. The
  // jump is exactly one full set of slides, so the visible content is identical —
  // wrap is invisible. Arrows therefore never hit a dead-end and never disable.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      // Wrap when we cross into the second copy (right) or reach the very start
      // (left). The jump is exactly one content-set wide, so visuals are identical.
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half; // instant, no smooth
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft = half - 1; // instant, no smooth — land just inside copy #2
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Start parked inside the second copy of the loop (just past the first set) so
  // there's always real content to the LEFT too — the very first ‹ press scrolls
  // back into the first copy instead of dead-ending at 0 and snapping.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      if (el.scrollWidth > 0) el.scrollLeft = el.scrollWidth / 2 - 1;
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="py-24">
      {/* Focus indicator: 3px deep-sage ring (#4F7256 = 5.42:1 on white, >=3:1 AA UI),
          offset 2px, never removed. Applied to all interactive controls in this carousel.
          Slide sizing (responsive peek) and arrow/track styling live here too. */}
      <style>{`
        .rc-focusable:focus-visible {
          outline: 3px solid #4F7256;
          outline-offset: 2px;
          border-radius: 4px;
        }
        /* Hide the scrollbar on the track (webkit) — scrollbarWidth: none covers Firefox. */
        .rc-track::-webkit-scrollbar { display: none; }

        /* Slide width drives the peek of the next slide.
           Desktop: ~2 slides + a clear peek of a third.
           Tablet:  ~1.5 slides.
           Mobile:  1 slide + a peek (~86vw). */
        .rc-slide { width: 86vw; }
        @media (min-width: 640px) {
          .rc-slide { width: 60%; }   /* ~1.5 slides visible */
        }
        @media (min-width: 1024px) {
          .rc-slide { width: 42%; }   /* ~2 slides + peek */
        }

        .rc-arrow:hover { transform: translateY(-50%) scale(1.05); }
        .rc-arrow:active { transform: translateY(-50%) scale(0.98); }
      `}</style>
      <div className="mx-auto px-4" style={{ maxWidth: '1170px' }}>
        <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Real Medical Weight Loss Results in Malta
        </h2>
        <div className="mx-auto mt-3 mb-12" style={{ width: '220px', height: '1px', backgroundColor: '#6F6456' }} />

        <div className="relative">
          {/* Prominent circular arrows — real "there's more" affordances.
              Vertically centred against the photo row (the caption sits below,
              so anchoring near the image's vertical middle reads naturally). */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous results"
            className="rc-focusable rc-arrow absolute z-20 flex items-center justify-center"
            style={{
              left: '-10px',
              top: '32%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#FFFFFF',
              color: green,
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
            className="rc-focusable rc-arrow absolute z-20 flex items-center justify-center"
            style={{
              right: '-10px',
              top: '32%',
              transform: 'translateY(-50%)',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: '#FFFFFF',
              color: green,
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

          {/* Soft right-edge fade hinting there's more to scroll. Subtle, ~40px,
              pointer-events: none so it never blocks the arrow or scrolling. */}
          <div
            aria-hidden="true"
            className="absolute z-10"
            style={{
              top: 0,
              right: 0,
              bottom: 0,
              width: '48px',
              pointerEvents: 'none',
              background: `linear-gradient(to right, rgba(255,255,255,0), ${sectionBg})`,
            }}
          />

          <div
            ref={scrollRef}
            className="rc-track flex overflow-x-auto"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', gap: '28px' }}
          >
            {[...RESULTS, ...RESULTS].map((r, i) => (
              <ResultCard key={`${r.name}-${i}`} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
