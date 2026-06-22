'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroMotif — "Woven Threads".
 *
 * A denser, more sophisticated interactive line motif in the lower hero. Many
 * fine sage threads weave and cross (each with its own amplitude, opacity and
 * width, so the field reads as layered depth rather than flat parallel stripes),
 * drifting on a slow current with a vertical travelling wave that rises through
 * the stack. They gently lift toward the cursor — like a hand under silk — with
 * a soft glow that follows the pointer. Edge + top fades keep it tasteful.
 *
 * Built on a 2D canvas: crisp anti-aliased strokes, precise placement in the
 * lower band, direct screen-space mouse interaction (no shader / WebGL).
 *
 * Guards: reduced-motion → one static frame; DPR-aware; paused offscreen / tab
 * hidden; full teardown on unmount.
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

    // deterministic per-line variation → layered, non-flat depth
    const hash = (n: number) => {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };

    // ── tuning ───────────────────────────────────────────────────────────
    const SAGE = '142, 176, 147';      // #8EB093
    const LINES = coarse ? 20 : 34;    // higher density
    const BAND_TOP = 0.66;             // lower band, with room for vertical travel
    const BAND_BOT = 1.0;
    const BASE_ALPHA = 0.15;           // subtle; density supplies the presence
    const STEP = coarse ? 14 : 8;      // px between sample points
    const LIFT = 24;                   // px the threads rise toward the cursor
    const SIGMA = 168;                 // px radius of the cursor's influence

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
      if (m.tx < -900) { m.x += (-9999 - m.x) * 0.05; m.y += (-9999 - m.y) * 0.05; }
      else { m.x += (m.tx - m.x) * 0.09; m.y += (m.ty - m.y) * 0.09; }

      const bandTop = H * BAND_TOP;
      const bandBot = H * BAND_BOT;

      for (let i = 0; i < LINES; i++) {
        const f = i / (LINES - 1);
        const seed = i * 0.6;
        const h1 = hash(i + 1), h2 = hash(i + 11.3), h3 = hash(i + 27.7);

        const ampScale = 0.55 + h1 * 1.05;        // varied amplitude → weaving
        const depthVar = 0.5 + h2 * 0.7;          // varied opacity → layered depth
        const lw = 0.7 + h3 * 0.7;                // varied width → near/far feel

        const baseY = bandTop + (bandBot - bandTop) * f;
        const vtravel = 9 * Math.sin(t * 0.00018 + seed * 1.7); // slow vertical drift
        const by = baseY + vtravel;

        // opacity: fade in from the top of the band, fuller toward the bottom
        const rowFade = 0.32 + 0.68 * f;
        // soft glow where the cursor's height is near this thread
        const dyl = by - m.y;
        const glow = m.x > -900 ? Math.exp(-(dyl * dyl) / (2 * 130 * 130)) : 0;
        const alpha = Math.min(0.4, BASE_ALPHA * rowFade * depthVar * (1 + glow * 1.2));

        const g = ctx.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0.0, `rgba(${SAGE}, 0)`);
        g.addColorStop(0.13, `rgba(${SAGE}, 1)`);
        g.addColorStop(0.87, `rgba(${SAGE}, 1)`);
        g.addColorStop(1.0, `rgba(${SAGE}, 0)`);

        ctx.beginPath();
        for (let x = 0; x <= W; x += STEP) {
          const a1 = 5.0 * ampScale * Math.sin(x * 0.0040 + t * 0.00045 + seed);
          const a2 = 3.0 * ampScale * Math.sin(x * 0.0085 - t * 0.00030 + seed * 1.7);
          const a3 = 1.6 * Math.sin(x * 0.016 + t * 0.00060 + seed * 0.5);
          // vertical travelling wave — couples line index with time so the
          // pattern rises through the stack (the threads intertwine)
          const av = 4.2 * Math.sin(x * 0.0060 + i * 0.55 - t * 0.00050);
          let y = by + a1 + a2 + a3 + av;

          if (m.x > -900) {
            const dx = x - m.x, dy = by - m.y;
            const d2 = dx * dx + dy * dy;
            y -= LIFT * Math.exp(-d2 / (2 * SIGMA * SIGMA));
          }

          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = g;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = lw;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) draw(0);
    else raf = requestAnimationFrame(loop);

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
