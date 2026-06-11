'use client';

import { useRef, useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#8EB093';
const greenDark = '#7ba587';
const taupe = '#9B8D83';

type Result = { name: string; image: string; quote: string };

const RESULTS: Result[] = [
  {
    name: 'Anna Lindström',
    image: '/wix/87fc13_7fc62a3875154ae2a204387f87a61814~mv2.png',
    quote:
      "My issue wasn't just weight, it was how heavy my body felt to carry. Walking, stairs, even getting through the day felt harder than it should. This program gave me back my lightness and my energy.",
  },
  {
    name: 'Nicole Farrugia',
    image: '/wix/87fc13_859aab08ea744d8c997b5cfd312823a5~mv2.png',
    quote:
      'I struggled with my weight for a long time and it was affecting my confidence and energy. The team built a plan around my real life and actually listened. For the first time the weight came off steadily — and it stayed off.',
  },
  {
    name: 'Laura Bennett',
    image: '/wix/87fc13_671e0f2c983242c5ad4711a7d5a7ce91~mv2.png',
    quote:
      'I had tried dieting on and off for years but my weight always came back. This helped me understand my body and hormones, and the weekly support kept me consistent even through the hard weeks.',
  },
  {
    name: 'Mary Kowalska',
    image: '/wix/87fc13_c617250be48e4af7ba36007603d8533b~mv2.png',
    quote:
      'My goal was not to be skinny but to feel healthier and more toned. The change has been incredible — I have more energy, my clothes fit better and I finally feel like myself again.',
  },
];

function ResultCard({ r }: { r: Result }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="flex-shrink-0 overflow-hidden"
      style={{ width: '380px', maxWidth: '85vw', background: 'linear-gradient(180deg, #95B598 0%, #AEC5AC 45%, #B8CDB2 100%)', borderTopLeftRadius: '20px', borderTopRightRadius: '60px', borderBottomLeftRadius: '60px', borderBottomRightRadius: '20px', scrollSnapAlign: 'start' }}
    >
      {/* Combined before / after image */}
      <div style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '60px', overflow: 'hidden' }}>
        <img src={r.image} alt={`${r.name} before and after`} style={{ width: '100%', height: 'auto', display: 'block' }} />
      </div>
      {/* Quote + name */}
      <div className="px-6 pt-5 pb-7">
        <p
          style={{
            color: taupe,
            fontFamily: bodyFont,
            fontSize: '15px',
            lineHeight: 1.6,
            ...(expanded ? {} : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }),
          }}
        >
          {r.quote}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2"
          style={{ color: taupe, fontFamily: bodyFont, fontSize: '14px', textDecoration: 'underline', cursor: 'pointer', background: 'transparent' }}
        >
          {expanded ? 'Read less' : 'Read more'}
        </button>
        <p className="mt-5" style={{ color: taupe, fontFamily: wideFont, fontSize: '14px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
          {r.name}
        </p>
      </div>
    </div>
  );
}

export default function ResultsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 404, behavior: 'smooth' });
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center" style={{ color: green, fontFamily: headingFont, fontWeight: 400, fontSize: '28px', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Medical Weight Loss Results
        </h2>
        <div className="mx-auto mt-3 mb-10" style={{ width: '180px', height: '1px', backgroundColor: '#B9A99E' }} />

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="absolute z-10 items-center justify-center rounded-full"
            style={{ display: atStart ? 'none' : 'flex', left: '-6px', top: '38%', width: '38px', height: '38px', backgroundColor: greenDark, color: '#fff', opacity: 0.5, cursor: 'pointer', border: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="absolute z-10 items-center justify-center rounded-full"
            style={{ display: atEnd ? 'none' : 'flex', right: '-6px', top: '38%', width: '38px', height: '38px', backgroundColor: greenDark, color: '#fff', opacity: 0.5, cursor: 'pointer', border: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          <div
            ref={scrollRef}
            onScroll={updateArrows}
            className="flex gap-6 overflow-x-auto pb-4"
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
