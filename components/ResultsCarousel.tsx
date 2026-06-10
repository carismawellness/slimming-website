'use client';

import { useRef, useState } from 'react';

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#8EB093';
const greenDark = '#7ba587';
const taupe = '#9B8D83';

type Result = { name: string; before: string; after: string; quote: string };

const RESULTS: Result[] = [
  {
    name: 'Nicole Farrugia',
    before: '/results/nicole-before.png',
    after: '/results/nicole-after.png',
    quote:
      'I struggled with my weight for a long time and it was affecting my confidence and energy. The team built a plan around my real life and actually listened. For the first time the weight came off steadily — and it stayed off.',
  },
  {
    name: 'Laura Bennett',
    before: '/results/laura-before.png',
    after: '/results/laura-after.png',
    quote:
      'I had tried dieting on and off for years but my weight always came back. This helped me understand my body and hormones, and the weekly support kept me consistent even through the hard weeks.',
  },
  {
    name: 'Mary Kowalska',
    before: '/results/mary-before.png',
    after: '/results/mary-after.png',
    quote:
      'My goal was not to be skinny but to feel healthier and more toned. The change has been incredible — I have more energy, my clothes fit better and I finally feel like myself again.',
  },
  {
    name: 'Sarah Vella',
    before: '/results/sarah-before.png',
    after: '/results/sarah-after.png',
    quote:
      'After two pregnancies I thought this was just my body now. The medical approach made the difference — proper guidance, real food and treatments that actually worked alongside the plan.',
  },
];

function LeafBadge() {
  return (
    <span
      className="absolute"
      style={{ top: '10px', right: '10px', width: '26px', height: '26px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={green} aria-hidden>
        <path d="M12 2C7 6 4 10 4 15a8 8 0 0 0 16 0c0-5-3-9-8-13Zm0 4c3 2.5 5 5.5 5 9a5 5 0 0 1-5 5V6Z" />
      </svg>
    </span>
  );
}

function BAImage({ src, label }: { src: string; label: string }) {
  return (
    <div
      className="relative w-1/2"
      style={{ aspectRatio: '3 / 4', backgroundColor: '#A9C0A1', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
    >
      <div className="absolute inset-x-0 bottom-0" style={{ height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.35), transparent)' }} />
      <span className="absolute" style={{ bottom: '10px', left: '0', right: '0', textAlign: 'center', color: '#fff', fontFamily: wideFont, fontSize: '11px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

function ResultCard({ r }: { r: Result }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="flex-shrink-0 overflow-hidden"
      style={{ width: '380px', maxWidth: '85vw', background: 'linear-gradient(180deg, #DCE7D7 0%, #C4D7BC 100%)', borderTopLeftRadius: '20px', borderTopRightRadius: '60px', borderBottomLeftRadius: '60px', borderBottomRightRadius: '20px', scrollSnapAlign: 'start' }}
    >
      {/* Before / After pair */}
      <div className="relative flex" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '60px', overflow: 'hidden' }}>
        <BAImage src={r.before} label="Before" />
        <BAImage src={r.after} label="After" />
        <LeafBadge />
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
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="absolute z-10 items-center justify-center rounded-full"
            style={{ display: atStart ? 'none' : 'flex', left: '-6px', top: '40%', width: '38px', height: '38px', backgroundColor: greenDark, color: '#fff', opacity: 0.5, cursor: 'pointer', border: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="absolute z-10 items-center justify-center rounded-full"
            style={{ display: atEnd ? 'none' : 'flex', right: '-6px', top: '40%', width: '38px', height: '38px', backgroundColor: greenDark, color: '#fff', opacity: 0.5, cursor: 'pointer', border: 0 }}
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
