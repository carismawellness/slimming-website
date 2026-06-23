'use client';

import { useEffect, useRef } from 'react';
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
  {
    title: 'Lymphatic Drainage',
    desc: 'Gentle, expert-guided compressive microvibration and massage that stimulates the lymphatic system to reduce fluid, support circulation and ease that puffy, heavy feeling.',
    href: '/packages/lymphatic-drainage',
    alt: 'Lymphatic Drainage treatment',
    src: '/wix/87fc13_597101dd5e634161a957161a595de331~mv2.webp',
  },
  {
    title: 'Lipocavitation',
    desc: 'Advanced low-frequency ultrasound that breaks down fat cell membranes for natural elimination through your lymphatic system. Non-invasive, no surgery, no downtime.',
    href: '/packages/lipocavitation',
    alt: 'Lipocavitation fat reduction treatment',
    src: '/wix/f940f0_3959a9b1203c41b09ca238cd2c75ee35~mv2.webp',
  },
];

const CARD_W = 349;
const CARD_H = 465;
const GAP = 10;
const PAD = 40; // left/right breathing room

export default function ModalitiesCarousel() {
  const ref = useRef<HTMLDivElement>(null);

  // Infinite seamless loop: cards are rendered DUPLICATED back-to-back, so the
  // scrollable width is twice the real content. Whenever the scroll position
  // crosses into the second copy (>= half) we instantly subtract half a width;
  // when it reaches the very start we jump forward into copy #2. The jump is
  // exactly one content-set wide, so the visible cards are identical and the
  // wrap is invisible. Arrows are always enabled — no dead-end at either edge.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft = half - 1;
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Park inside copy #2 on mount so there's always real content to the LEFT too.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      if (el.scrollWidth > 0) el.scrollLeft = el.scrollWidth / 2 - 1;
    });
    return () => cancelAnimationFrame(id);
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
        /* color/bg !important so they beat the button's inline color (#4f7256),
           otherwise the hovered fill (#4f7256) would carry #4f7256 text = invisible. */
        .mc-card:hover .mc-explore { background-color: #4f7256 !important; color: #ffffff !important; }
        .mc-card:hover .mc-explore span { color: #ffffff !important; }
        /* Mobile: cards fit the viewport (one + a peek) instead of a fixed
           349px that overflows a phone; tighter side padding. */
        @media (max-width: 640px) {
          .mc-track { padding-left: 16px !important; padding-right: 16px !important; }
          .mc-card { width: 84vw !important; height: auto !important; min-height: 426px; }
        }
      `}</style>
      {/* Left arrow — always enabled (infinite loop, no dead-end) */}
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

      {/* Scrollable track */}
      <div
        ref={ref}
        className="mc-track flex overflow-x-auto [&::-webkit-scrollbar]:hidden"
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
        {[...CARDS, ...CARDS].map((card, i) => (
          <Link
            key={`${card.title}-${i}`}
            href={card.href}
            className="mc-card group flex-shrink-0"
            style={{
              width: `${CARD_W}px`,
              minHeight: `${CARD_H}px`,
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
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.focal ?? 'center' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px 26px 26px' }}>
              <h3 style={{ color: '#3c5a40', fontFamily: 'Trajan Pro, serif', fontSize: '18px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.25, margin: '0 0 10px' }}>
                {card.title}
              </h3>
              <p style={{ color: '#595959', fontFamily: 'Roboto, sans-serif', fontSize: '13.5px', lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>
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

      {/* Right arrow — always enabled (infinite loop, no dead-end) */}
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
    </div>
  );
}
