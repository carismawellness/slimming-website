'use client';

import { useEffect, useRef, useState } from 'react';

// Replicates the live Wix HTML embed (filesusr 87fc13_7b666ff8…) shown under
// "The secret to a more defined, confident look": a slick carousel with 4
// before/after testimonial cards, 3 visible at a time, autoplaying every 3s,
// with ← / → arrows and a 2-line clamped quote + "Read more" toggle.

const SLIDES = [
  {
    img: '/wix/87fc13_859aab08ea744d8c997b5cfd312823a5~mv2.png',
    text: 'I struggled with my weight for a long time and it was affecting my confidence and energy and after this journey I feel lighter in my body and happier when I look at myself.',
    name: 'NICOLE FARRUGIA',
  },
  {
    img: '/wix/87fc13_671e0f2c983242c5ad4711a7d5a7ce91~mv2.png',
    text: 'I had tried dieting on and off for years but my weight always came back. This helped me reset my habits and feel more comfortable in my body again.',
    name: 'LAURA BENNETT',
  },
  {
    img: '/wix/87fc13_c617250be48e4af7ba36007603d8533b~mv2.png',
    text: 'My goal was not to be skinny but to feel healthier and more toned. The change has been gradual but very motivating and I finally feel like myself again.',
    name: 'MARY KOWALSKA',
  },
  {
    img: '/wix/87fc13_7fc62a3875154ae2a204387f87a61814~mv2.png',
    text: 'My issue wasn’t just weight, it was how heavy my body felt to carry. Walking, standing for long periods, even basic daily things felt tiring. I felt rounded and compressed, especially through my middle and back. Seeing this change feels like relief. I move easier, my posture is better, and I finally feel balanced in my body again.',
    name: 'ANNA LINDSTRÖM',
  },
];

const N = SLIDES.length;

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0); // 0..N-1, leftmost visible slide
  const [animate, setAnimate] = useState(true);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [visible, setVisible] = useState(3); // 3 on desktop, 1 on mobile (live slick breakpoint 768)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setVisible(mq.matches ? 1 : 3);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  // Seamless loop: render the slides twice; when we move past the first copy,
  // snap back (without animation) to the equivalent position.
  useEffect(() => {
    if (index >= N) {
      const t = setTimeout(() => {
        setAnimate(false);
        setIndex(index - N);
        requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
      }, 520);
      return () => clearTimeout(t);
    }
  }, [index]);

  const go = (dir: number) => {
    setIndex((i) => {
      let next = i + dir;
      if (next < 0) next = i + dir + N;
      return next;
    });
  };

  const slideW = 100 / visible;

  return (
    <div className="relative mx-auto" style={{ maxWidth: '1099px', padding: '0 35px', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ overflow: 'hidden' }}>
        <div
          className="flex"
          style={{
            transform: `translateX(-${index * slideW}%)`,
            transition: animate ? 'transform 0.5s ease' : 'none',
          }}
        >
          {[...SLIDES, ...SLIDES].map((s, i) => {
            const open = !!expanded[i % N];
            return (
              <div key={i} style={{ flex: `0 0 ${slideW}%`, maxWidth: `${slideW}%`, boxSizing: 'border-box' }}>
                <div style={{ background: '#fff', borderRadius: '16px', padding: '20px 10px', margin: '0 10px' }}>
                  <img src={s.img} alt="" style={{ width: '100%', borderRadius: '16px', display: 'block' }} />
                  <div
                    style={{
                      background: 'linear-gradient(178deg, #F8F6F2 42%, #C9D8C1 100%)',
                      borderRadius: '16px',
                      padding: '15px',
                      paddingTop: '70px',
                      marginTop: '-91px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#9B8C81',
                        marginBottom: '5px',
                        ...(open
                          ? {}
                          : { display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden', textOverflow: 'ellipsis' }),
                      }}
                    >
                      {s.text}
                    </p>
                    <button
                      type="button"
                      onClick={() => setExpanded((e) => ({ ...e, [i % N]: !e[i % N] }))}
                      style={{ fontSize: '14px', textDecoration: 'underline', color: '#9B8C81', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                      {open ? 'Read less' : 'Read more'}
                    </button>
                    <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#9B8C81', marginTop: '24px', marginBottom: '5px' }}>{s.name}</h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button
        type="button"
        aria-label="Previous"
        onClick={() => go(-1)}
        className="absolute"
        style={{ left: '-2px', top: '50%', transform: 'translateY(-50%)', width: '35px', height: '35px', background: 'transparent', border: 'none', color: '#8EB093', fontSize: '22px', cursor: 'pointer', zIndex: 1 }}
      >
        &#8592;
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => go(1)}
        className="absolute"
        style={{ right: '-2px', top: '50%', transform: 'translateY(-50%)', width: '35px', height: '35px', background: 'transparent', border: 'none', color: '#8EB093', fontSize: '22px', cursor: 'pointer', zIndex: 1 }}
      >
        &#8594;
      </button>
    </div>
  );
}
