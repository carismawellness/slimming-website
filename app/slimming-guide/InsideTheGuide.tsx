'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// "Inside the Guide" — brings the 3D page renders back to make the page feel rich,
// but as a DELIBERATE 3-up showcase (tilted renders + captions) rather than the
// chaotic overlapping mockups we had before. Sequential scroll-in stagger.
// Brand: Trajan uppercase headings, Novecento Wide labels, Roboto body, AA colours.

type Item = { src: string; w: number; h: number; rot: string; label: string; caption: string };

const ITEMS: Item[] = [
  {
    src: '/wix/f940f0_ba288e10728a451e8acef9cbbaeaf46a~mv2.webp',
    w: 750,
    h: 500,
    rot: '-3deg',
    label: '30+ Recipes',
    caption: 'Real meals built for the Maltese kitchen — with timings, portions and method.',
  },
  {
    src: '/wix/f940f0_05727f0f2b8049c69b8b60ee2cf16360~mv2.webp',
    w: 600,
    h: 400,
    rot: '2deg',
    label: 'The method on paper',
    caption: 'Plate-building, portion logic and a troubleshooting grid you will actually use.',
  },
  {
    src: '/wix/f940f0_04682b1e57084d5bb6306b1bb52d3534~mv2.webp',
    w: 480,
    h: 360,
    rot: '4deg',
    label: 'Myth vs truth',
    caption: 'The thinking that makes it stick — calm, evidence-led, shame-free.',
  },
];

export default function InsideTheGuide() {
  const [shown, setShown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    <section className="py-24" aria-labelledby="inside-heading" style={{ backgroundColor: '#ffffff' }}>
      <style>{`
        .ig-item {
          opacity: 0; transform: translateY(30px);
          transition: opacity .75s cubic-bezier(.22,.61,.36,1) var(--d,0ms), transform .75s cubic-bezier(.22,.61,.36,1) var(--d,0ms);
          will-change: opacity, transform;
        }
        .ig-item[data-shown='true'] { opacity: 1; transform: none; }
        .ig-render { transition: transform .5s cubic-bezier(.22,.61,.36,1); }
        .ig-item:hover .ig-render { transform: rotate(0deg) translateY(-6px); }
        @media (prefers-reduced-motion: reduce) { .ig-item, .ig-render { transition: none; opacity: 1; transform: none; } }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center mb-2"
          aria-hidden="true"
          style={{ color: '#6f6456', fontFamily: 'Novecento Wide Book, sans-serif', fontWeight: 400, fontSize: '15px', letterSpacing: '3.2px', textTransform: 'uppercase' }}
        >
          Inside the guide
        </p>
        <div className="mx-auto mb-4" aria-hidden="true" style={{ width: '90px', height: '1px', backgroundColor: '#C9B8AE' }} />
        <h2
          id="inside-heading"
          className="text-center mb-5"
          style={{ color: '#4f7256', fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: 'clamp(22px, 3vw, 28px)', lineHeight: 1.3, textTransform: 'uppercase' }}
        >
          Everything, mapped out
        </h2>
        <p
          className="text-center mx-auto mb-16"
          style={{ color: '#5f5649', fontFamily: 'Roboto, sans-serif', fontSize: '15px', lineHeight: 1.7, maxWidth: '620px' }}
        >
          Not a PDF of rules. A practical system you can hold — the recipes, the plate logic, and the reasoning that makes it work in real Maltese life.
        </p>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 'clamp(28px, 5vw, 56px)' }}>
          {ITEMS.map((it, i) => (
            <div
              key={it.label}
              className="ig-item flex flex-col items-center text-center"
              data-shown={shown ? 'true' : 'false'}
              style={{ ['--d' as string]: `${i * 150}ms` } as React.CSSProperties}
            >
              <div
                className="ig-render"
                style={{ transform: `rotate(${it.rot})`, filter: 'drop-shadow(0 28px 50px rgba(40,60,44,0.20))', marginBottom: '28px', width: '100%', maxWidth: '340px' }}
              >
                <Image src={it.src} alt={`Carisma Slimming Guide — ${it.label}`} width={it.w} height={it.h} sizes="(max-width: 768px) 80vw, 340px" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
              <h3
                className="uppercase mb-2"
                style={{ color: '#3c5a40', fontFamily: "'Novecento Wide Book', 'Novecento Wide', sans-serif", fontSize: '14px', fontWeight: 700, letterSpacing: '1.2px' }}
              >
                {it.label}
              </h3>
              <p style={{ color: '#5f5649', fontFamily: 'Roboto, sans-serif', fontSize: '14px', lineHeight: 1.6, maxWidth: '300px' }}>
                {it.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
