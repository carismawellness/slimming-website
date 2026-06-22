'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroMotif — "Drifting Motes".
 *
 * A soft field of sage bokeh dots at varying depths that slowly float upward on
 * a gentle current and drift away from the cursor (a quiet parallax repulsion).
 * Concentrated in the lower hero and fading up so they stay clear of the copy.
 * Soft-edged (a pre-rendered radial sprite) for a luminous, luxurious feel —
 * evokes lightness and air, never busy.
 *
 * Built on a 2D canvas with a cached sprite (cheap, soft, crisp); direct
 * screen-space mouse interaction (no shader / WebGL).
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

    const hash = (n: number) => {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };

    // ── soft dot sprite (radial sage → transparent) ──────────────────────
    const SPRITE = 64;
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = SPRITE;
    const sctx = sprite.getContext('2d')!;
    const grad = sctx.createRadialGradient(SPRITE / 2, SPRITE / 2, 0, SPRITE / 2, SPRITE / 2, SPRITE / 2);
    grad.addColorStop(0.0, 'rgba(142, 176, 147, 1)');
    grad.addColorStop(0.45, 'rgba(142, 176, 147, 0.55)');
    grad.addColorStop(1.0, 'rgba(142, 176, 147, 0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SPRITE, SPRITE);

    // ── tuning ───────────────────────────────────────────────────────────
    const N = coarse ? 60 : 120;
    const REPEL_R = 150;     // px radius the cursor pushes dots
    const REPEL_STR = 46;    // px max push

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      W = host.clientWidth; H = host.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type Dot = { bx: number; by: number; r: number; a: number; vy: number; sway: number; ph: number; ox: number; oy: number };
    const dots: Dot[] = [];
    const build = () => {
      dots.length = 0;
      for (let i = 0; i < N; i++) {
        const d = hash(i + 3);                 // depth 0..1
        dots.push({
          bx: hash(i + 1) * W,
          by: hash(i + 2) * H,
          r: 2 + d * 5.5,                       // closer = bigger
          a: 0.10 + d * 0.20,                   // closer = brighter
          vy: -(3 + d * 8),                     // rise (px/sec); closer = faster
          sway: 6 + hash(i + 5) * 14,           // horizontal sway amplitude
          ph: hash(i + 7) * 6.283,
          ox: 0, oy: 0,
        });
      }
    };
    build();
    const onResize = () => { resize(); build(); };
    window.addEventListener('resize', onResize, { passive: true });

    const m = { tx: -9999, ty: -9999, x: -9999, y: -9999 };
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      m.tx = e.clientX - r.left; m.ty = e.clientY - r.top;
      if (m.x < -900) { m.x = m.tx; m.y = m.ty; }
    };
    const onLeave = () => { m.tx = -9999; m.ty = -9999; };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(host);

    let last = 0;
    const draw = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      ctx.clearRect(0, 0, W, H);

      if (m.tx < -900) { m.x += (-9999 - m.x) * 0.05; m.y += (-9999 - m.y) * 0.05; }
      else { m.x += (m.tx - m.x) * 0.12; m.y += (m.ty - m.y) * 0.12; }

      const t = now * 0.001;
      for (const dot of dots) {
        // slow upward drift + gentle horizontal sway; wrap around
        dot.by += dot.vy * dt;
        if (dot.by < -10) { dot.by = H + 10; dot.bx = hash(dot.ph * 1000 + now * 0.0001) * W; }
        const swayX = Math.sin(t * 0.25 + dot.ph) * dot.sway;

        let x = dot.bx + swayX;
        const y = dot.by;

        // cursor repulsion (eased so it returns smoothly)
        let txo = 0, tyo = 0;
        if (m.x > -900) {
          const dx = x - m.x, dy = y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_R && dist > 0.001) {
            const force = (1 - dist / REPEL_R) * REPEL_STR;
            txo = (dx / dist) * force; tyo = (dy / dist) * force;
          }
        }
        dot.ox += (txo - dot.ox) * 0.12;
        dot.oy += (tyo - dot.oy) * 0.12;
        x += dot.ox;
        const yy = y + dot.oy;

        // fade up so dots stay clear of the headline/copy
        const vFade = Math.max(0, Math.min(1, (y / H - 0.22) / 0.5));
        const alpha = dot.a * vFade;
        if (alpha <= 0.002) continue;

        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, x - dot.r, yy - dot.r, dot.r * 2, dot.r * 2);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      else last = 0;
      raf = requestAnimationFrame(loop);
    };

    if (reduced) draw(16);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
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
