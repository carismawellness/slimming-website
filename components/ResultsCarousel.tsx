'use client';

import { useRef, useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#8EB093';
const textColor = '#9B8C81';

type Result = { name: string; image: string; quote: string };

// Order and copy mirror the live Wix slick-carousel embed
const RESULTS: Result[] = [
  {
    name: 'NICOLE FARRUGIA',
    image: '/wix/87fc13_859aab08ea744d8c997b5cfd312823a5~mv2.png',
    quote:
      'I struggled with my weight for a long time and it was affecting my confidence and energy and after this journey I feel lighter in my body and happier when I look at myself.',
  },
  {
    name: 'LAURA BENNETT',
    image: '/wix/87fc13_671e0f2c983242c5ad4711a7d5a7ce91~mv2.png',
    quote:
      'I had tried dieting on and off for years but my weight always came back. This helped me reset my habits and feel more comfortable in my body again.',
  },
  {
    name: 'MARY KOWALSKA',
    image: '/wix/87fc13_c617250be48e4af7ba36007603d8533b~mv2.png',
    quote:
      'My goal was not to be skinny but to feel healthier and more toned. The change has been gradual but very motivating and I finally feel like myself again.',
  },
  {
    name: 'ANNA LINDSTRÖM',
    image: '/wix/87fc13_7fc62a3875154ae2a204387f87a61814~mv2.png',
    quote:
      'My issue wasn’t just weight, it was how heavy my body felt to carry. Walking, standing for long periods, even basic daily things felt tiring. I felt rounded and compressed, especially through my middle and back. Seeing this change feels like relief. I move easier, my posture is better, and I finally feel balanced in my body again.',
  },
];

function ResultCard({ r }: { r: Result }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="flex-shrink-0"
      style={{ width: 'calc(33.333% - 20px)', minWidth: '280px', background: '#fff', borderRadius: '16px', padding: '20px 10px', margin: '0 10px', boxSizing: 'border-box', scrollSnapAlign: 'start' }}
    >
      <img src={r.image} alt={`${r.name} before and after`} style={{ width: '100%', borderRadius: '16px', display: 'block', position: 'relative', zIndex: 1 }} />
      <div
        style={{ background: 'linear-gradient(178deg, #F8F6F2 42%, #C9D8C1 100%)', borderRadius: '16px', padding: '15px', paddingTop: '70px', marginTop: '-91px' }}
      >
        <p
          style={{
            color: textColor,
            fontFamily: bodyFont,
            fontSize: '14px',
            marginBottom: '5px',
            ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }),
          }}
        >
          {r.quote}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          style={{ color: textColor, fontFamily: bodyFont, fontSize: '14px', textDecoration: 'underline', cursor: 'pointer', background: 'transparent', padding: 0, border: 0 }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
        <h3 style={{ color: textColor, fontFamily: bodyFont, fontSize: '16px', fontWeight: 500, marginTop: '24px', marginBottom: '5px' }}>
          {r.name}
        </h3>
      </div>
    </div>
  );
}

export default function ResultsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth / 3), behavior: 'smooth' });
  };

  return (
    <section className="py-16">
      <div className="mx-auto px-4" style={{ maxWidth: '1170px' }}>
        <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Medical Weight Loss Results
        </h2>
        <div className="mx-auto mt-3 mb-10" style={{ width: '220px', height: '1px', backgroundColor: '#B9A99E' }} />

        <div className="relative" style={{ padding: '0 35px' }}>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="absolute z-10 flex items-center justify-center"
            style={{ left: '-4px', top: '38%', width: '35px', height: '35px', background: 'transparent', color: green, fontSize: '26px', cursor: 'pointer', border: 0, lineHeight: 1 }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="absolute z-10 flex items-center justify-center"
            style={{ right: '-4px', top: '38%', width: '35px', height: '35px', background: 'transparent', color: green, fontSize: '26px', cursor: 'pointer', border: 0, lineHeight: 1 }}
          >
            →
          </button>

          <div
            ref={scrollRef}
            className="flex overflow-x-auto"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
          >
            {RESULTS.map((r) => (
              <ResultCard key={r.name} r={r} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
