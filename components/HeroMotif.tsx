'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroMotif — "Silk Threads".
 *
 * A new, interactive take on the line motif. A set of fine sage contour lines
 * lives only in the bottom quarter of the hero. They drift on a slow ambient
 * current, and they gently rise toward the cursor — like running a hand under a
 * silk sheet — with a soft glow that follows the pointer. Edges and the top of
 * the band fade to nothing, so it reads as a quiet, tasteful grounding to the
 * hero rather than a graphic.
 *
 * Built on a 2D canvas (not WebGL): crisp anti-aliased strokes, pixel-precise
 * placement in the bottom quarter, and direct screen-space mouse interaction.
 *
 * Guards: reduced-motion → one static frame (no pointer reaction); DPR-aware;
 * paused offscreen / tab hidden; full teardown on unmount.
 */
export default function HeroMotif() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block' });
    host.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coarse =
      window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 760;

    // ── tuning ───────────────────────────────────────────────────────────
    const SAGE = '142, 176, 147';      // #8EB093
    const LINES = coarse ? 9 : 14;     // contour lines stacked in the band
    const BAND_TOP = 0.72;             // band occupies the bottom ~quarter
    const BAND_BOT = 0.99;
    const BASE_ALPHA = 0.17;           // very subtle
    const STEP = coarse ? 16 : 9;      // px between sample points
    const LIFT = 26;                   // px the lines rise toward the cursor
    const SIGMA = 165;                 // px radius of the cursor's influence

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      W = host.clientWidth; H = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // pointer (smoothed), starts off-screen so lines simply drift until moved
    const m = { tx: -9999, ty: -9999, x: -9999, y: -9999, active: false };
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      m.tx = e.clientX - r.left;
      m.ty = e.clientY - r.top;
      if (!m.active) { m.x = m.tx; m.y = m.ty; m.active = true; }
    };
    const onLeave = () => { m.tx = -9999; m.ty = -9999; };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      // ease the pointer toward its target for buttery motion
      if (m.tx < -900) { m.x += (-9999 - m.x) * 0.05; m.y += (-9999 - m.y) * 0.05; }
      else { m.x += (m.tx - m.x) * 0.09; m.y += (m.ty - m.y) * 0.09; }

      const bandTop = H * BAND_TOP;
      const bandBot = H * BAND_BOT;

      for (let i = 0; i < LINES; i++) {
        const f = LINES === 1 ? 1 : i / (LINES - 1);
        const baseY = bandTop + (bandBot - bandTop) * f;
        const seed = i * 0.6;

        // line opacity: fade in from the top of the band, fuller toward bottom
        const rowFade = 0.45 + 0.55 * f;
        // a soft glow where the cursor's height is near this line
        const dyl = baseY - m.y;
        const glow = m.x > -900 ? Math.exp(-(dyl * dyl) / (2 * 120 * 120)) : 0;
        const alpha = Math.min(0.4, BASE_ALPHA * rowFade * (1 + glow * 1.1));

        // horizontal edge-fade gradient (transparent → sage → transparent)
        const g = ctx.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0.0, `rgba(${SAGE}, 0)`);
        g.addColorStop(0.14, `rgba(${SAGE}, 1)`);
        g.addColorStop(0.86, `rgba(${SAGE}, 1)`);
        g.addColorStop(1.0, `rgba(${SAGE}, 0)`);

        ctx.beginPath();
        for (let x = 0; x <= W; x += STEP) {
          // slow ambient drift — the thread breathes on a gentle current
          const a1 = 3.2 * Math.sin(x * 0.0042 + t * 0.00040 + seed);
          const a2 = 1.7 * Math.sin(x * 0.0090 - t * 0.00026 + seed * 1.7);
          const a3 = 0.9 * Math.sin(x * 0.017 + t * 0.00055 + seed * 0.5);
          let y = baseY + a1 + a2 + a3;

          // rise toward the cursor (gaussian falloff) — the silk-sheet lift
          if (m.x > -900) {
            const dx = x - m.x, dy = baseY - m.y;
            const d2 = dx * dx + dy * dy;
            y -= LIFT * Math.exp(-d2 / (2 * SIGMA * SIGMA));
          }

          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = g;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.1;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerout', onLeave);
      io.disconnect();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
