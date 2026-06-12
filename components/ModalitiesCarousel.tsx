'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CARDS = [
  {
    title: 'Weight Loss',
    desc: "A doctor-led, all-in-one weight loss program that combines nutrition, movement, body contouring treatments and accountability to change your body and habits for good. Malta's most comprehensive slimming system.",
    href: '/packages',
    placeholder: 'Weight Loss modality image',
    src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    focal: '51% 22%',
  },
  {
    title: 'GLP-1 (Mounjaro & Ozempic)',
    desc: 'Prescription-only medical weight loss medication, used when medically appropriate, to calm appetite and support steady fat reduction alongside your personalised slimming plan.',
    href: '/medical-weight-loss',
    placeholder: 'GLP-1 modality image',
    src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
  },
  {
    title: 'Fat Reduction',
    desc: 'Targeted non surgical fat removal using CoolSculpting fat freezing (cryolipolysis) Medical guidance and a tailored caloric deficit for those last stubborn areas. FDA-cleared and performed at our Malta clinic.',
    href: '/fat-reduction',
    placeholder: 'Fat Reduction modality image',
    src: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
  },
  {
    title: 'Muscle Stimulation',
    desc: 'High-intensity electromagnetic body sculpting sessions with EMSculpt NEO that contract your muscles thousands of times to build strength, reduce fat and help shape your silhouette, without surgery or downtime.',
    href: '/muscle-stimulation',
    placeholder: 'Muscle Stimulation modality image',
    src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
  },
  {
    title: 'Skin Tightening',
    desc: 'Non-invasive skin tightening with VelaShape III that combines radiofrequency, infrared and vacuum therapy to firm loose skin, smooth cellulite and reduce circumference, no surgery, no downtime.',
    href: '/skin-tightening',
    placeholder: 'Skin Tightening modality image',
    src: '/wix/87fc13_adb56c71648b421998e77dbea4ec5fb8~mv2.jpg',
  },
  {
    title: 'Anti-Cellulite',
    desc: 'Targeted cellulite reduction and lymphatic drainage to smooth dimpled skin, reduce fluid retention and improve skin texture. Ideal after weight loss or as part of your slimming program.',
    href: '/anti-cellulite',
    placeholder: 'Anti-Cellulite modality image',
    src: '/wix/87fc13_5dde946fd77046908ec6b65db211836a~mv2.jpg',
  },
];

export default function ModalitiesCarousel() {
  const modalitiesRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateArrows = () => {
    const el = modalitiesRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  return (
    <div className="relative">
      {!atStart && (
        <button
          onClick={() => modalitiesRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}
          aria-label="Previous"
          className="hidden md:flex items-center justify-center absolute z-20"
          style={{ left: '-10px', top: '42%', transform: 'translateY(-50%)', width: '52px', height: '52px', backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', color: '#9B8D83', fontSize: '22px', opacity: 0.5 }}
        >‹</button>
      )}
      <div
        ref={modalitiesRef}
        onScroll={updateArrows}
        className="flex overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ gap: '10px', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', marginRight: 'calc(50% - 50vw)' }}
      >
        {CARDS.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="relative block overflow-hidden flex-shrink-0"
            style={{ width: '349px', aspectRatio: '349 / 465', borderRadius: '6px', scrollSnapAlign: 'start' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.src}
              alt={card.placeholder}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: card.focal ?? 'center' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(95,85,75,0.15) 0%, rgba(85,76,66,0.5) 50%, rgba(63,56,49,0.9) 100%)' }} />
            <div className="absolute inset-x-0 bottom-0" style={{ padding: '0 30px 30px' }}>
              <h3 className="mb-3" style={{ color: '#ffffff', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {card.title}
              </h3>
              <p className="mb-5" style={{ color: '#EFEBE6', fontFamily: 'Roboto, sans-serif', fontSize: '13px', lineHeight: '1.55' }}>
                {card.desc}
              </p>
              <span className="block text-center" style={{ border: '1px solid rgba(255,255,255,0.85)', color: '#ffffff', fontFamily: 'Novecento Wide Book, sans-serif', fontSize: '13px', letterSpacing: '1px', padding: '14px 0' }}>
                EXPLORE
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!atEnd && (
        <button
          onClick={() => modalitiesRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}
          aria-label="Next"
          className="hidden md:flex items-center justify-center absolute z-20"
          style={{ right: '-10px', top: '42%', transform: 'translateY(-50%)', width: '52px', height: '52px', backgroundColor: '#ffffff', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', color: '#9B8D83', fontSize: '22px', opacity: 0.5 }}
        >›</button>
      )}
    </div>
  );
}
