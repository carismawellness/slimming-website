'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CARDS = [
  {
    title: 'Weight Loss',
    desc: "A doctor-led, all-in-one weight loss program that combines nutrition, movement, body contouring treatments and accountability to change your body and habits for good. Malta's most comprehensive slimming system.",
    href: '/weight-loss',
    alt: 'Weight Loss modality',
    src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    focal: '51% 22%',
  },
  {
    title: 'GLP-1 (Mounjaro & Ozempic)',
    desc: 'Prescription-only medical weight loss medication, used when medically appropriate, to calm appetite and support steady fat reduction alongside your personalised slimming plan.',
    href: '/glp1',
    alt: 'GLP-1 medical weight loss modality',
    src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
  },
  {
    title: 'Fat Reduction',
    desc: 'Targeted non surgical fat removal using CoolSculpting fat freezing (cryolipolysis) Medical guidance and a tailored caloric deficit for those last stubborn areas. FDA-cleared and performed at our Malta clinic.',
    href: '/packages/fat-freezing',
    alt: 'Fat Reduction modality',
    src: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
  },
  {
    title: 'Muscle Stimulation',
    desc: 'High-intensity electromagnetic body sculpting sessions with EMSculpt NEO that contract your muscles thousands of times to build strength, reduce fat and help shape your silhouette, without surgery or downtime.',
    href: '/packages/muscle-stimulation',
    alt: 'Muscle Stimulation modality',
    src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
  },
  {
    title: 'Skin Tightening',
    desc: 'Non-invasive skin tightening with VelaShape III that combines radiofrequency, infrared and vacuum therapy to firm loose skin, smooth cellulite and reduce circumference, no surgery, no downtime.',
    href: '/packages/skin-tightening',
    alt: 'Skin Tightening modality',
    src: '/wix/87fc13_adb56c71648b421998e77dbea4ec5fb8~mv2.jpg',
  },
  {
    title: 'Anti-Cellulite',
    desc: 'Targeted cellulite reduction and lymphatic drainage to smooth dimpled skin, reduce fluid retention and improve skin texture. Ideal after weight loss or as part of your slimming program.',
    href: '/packages/anti-cellulite',
    alt: 'Anti-Cellulite modality',
    src: '/wix/87fc13_5dde946fd77046908ec6b65db211836a~mv2.jpg',
  },
];

const CARD_W = 349;
const CARD_H = 465;
const GAP = 10;
const PAD = 40; // left/right breathing room

export default function ModalitiesCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = () => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  };

  useEffect(() => {
    sync();
    const el = ref.current;
    if (el) el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      if (el) el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  const scroll = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * (CARD_W + GAP), behavior: 'smooth' });

  return (
    <div className="relative">
      <style>{`
        .mc-card { transition: transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease; }
        .mc-img { transition: transform .5s ease; }
        @media (prefers-reduced-motion: no-preference) {
          .mc-card:hover { transform: translateY(-6px); box-shadow: 0 18px 44px rgba(60,90,64,0.16); }
          .mc-card:hover .mc-img { transform: scale(1.05); }
        }
        .mc-card:hover .mc-explore { background-color: #4f7256; color: #ffffff; }
      `}</style>
      {/* Left arrow */}
      {!atStart && (
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="hidden md:flex items-center justify-center absolute z-20 transition-transform duration-300 ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
          style={{
            left: '12px',
            top: 'calc(50% - 26px)',
            width: '52px',
            height: '52px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            color: '#6f6456',
            fontSize: '26px',
            lineHeight: 1,
            border: 'none',
            cursor: 'pointer',
            borderRadius: '999px',
          }}
        >
          ‹
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={ref}
        className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={{
          gap: `${GAP}px`,
          scrollSnapType: 'x mandatory',
          /* scroll-padding-left must match paddingLeft so snap targets are correct */
          scrollPaddingLeft: `${PAD}px`,
          scrollbarWidth: 'none',
          paddingLeft: `${PAD}px`,
          paddingRight: `${PAD}px`,
        }}
      >
        {CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="mc-card group flex-shrink-0"
            style={{
              width: `${CARD_W}px`,
              height: `${CARD_H}px`,
              borderRadius: '20px',
              overflow: 'hidden',
              scrollSnapAlign: 'start',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
              border: '1px solid #EAE4DB',
              boxShadow: '0 10px 30px rgba(60,90,64,0.10)',
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '206px', flexShrink: 0, overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.src}
                alt={card.alt}
                className="mc-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.focal ?? 'center', display: 'block' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px 26px 26px' }}>
              <h3 style={{ color: '#3c5a40', fontFamily: 'Trajan Pro, serif', fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25, margin: '0 0 10px' }}>
                {card.title}
              </h3>
              <p style={{ color: '#595959', fontFamily: 'Roboto, sans-serif', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px', flex: 1, display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {card.desc}
              </p>
              <span
                className="mc-explore"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1.5px solid #4f7256', color: '#4f7256', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '12.5px', letterSpacing: '2px', padding: '13px 0', textTransform: 'uppercase', borderRadius: '999px', transition: 'background-color .3s ease, color .3s ease' }}
              >
                Explore <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Right arrow */}
      {!atEnd && (
        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="hidden md:flex items-center justify-center absolute z-20 transition-transform duration-300 ease-out hover:scale-[1.04] motion-reduce:transition-none motion-reduce:hover:scale-100"
          style={{
            right: '12px',
            top: 'calc(50% - 26px)',
            width: '52px',
            height: '52px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            color: '#6f6456',
            fontSize: '26px',
            lineHeight: 1,
            border: 'none',
            cursor: 'pointer',
            borderRadius: '999px',
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}
