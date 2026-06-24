'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroMotif — "Constellation".
 *
 * A soft network of sage dots that slowly float upward and connect to their
 * near neighbours with fading lines — a living lattice (a DNA-like web) that
 * drifts away from the cursor, the links stretching and snapping as the dots
 * move. Concentrated in the lower hero and fading up so it clears the copy.
 *
 * Built on a 2D canvas with a cached radial sprite for the soft dots; direct
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

    // Mobile/touch (and reduced-motion) get ONE static frame — never the rAF
    // loop. A continuously repainting hero canvas keeps Lighthouse's Speed Index
    // from ever settling and burns the mobile main thread (the O(N²) link math
    // runs every frame); cursor-repel is meaningless without a pointer anyway.
    // Desktop keeps the living, interactive lattice.
    const staticOnly = reduced || coarse;

    const hash = (n: number) => {
      const s = Math.sin(n * 12.9898) * 43758.5453;
      return s - Math.floor(s);
    };

    // soft dot sprite (radial sage → transparent)
    const SP = 64;
    const sprite = document.createElement('canvas');
    sprite.width = sprite.height = SP;
    const sctx = sprite.getContext('2d')!;
    const grad = sctx.createRadialGradient(SP / 2, SP / 2, 0, SP / 2, SP / 2, SP / 2);
    grad.addColorStop(0.0, 'rgba(142, 176, 147, 1)');
    grad.addColorStop(0.45, 'rgba(142, 176, 147, 0.5)');
    grad.addColorStop(1.0, 'rgba(142, 176, 147, 0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, SP, SP);

    // ── tuning ───────────────────────────────────────────────────────────
    const N = coarse ? 80 : 150;
    const LINK_R = 122;        // px — connect dots closer than this
    const LINK_ALPHA = 0.34;   // peak line opacity (2x)
    const REPEL_R = 150;
    const REPEL_STR = 46;
    const SAGE = '142, 176, 147';

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
        const d = hash(i + 3);
        dots.push({
          bx: hash(i + 1) * W,
          by: hash(i + 2) * H,
          r: 2.2 + d * 5.5,
          a: 0.36 + d * 0.52,          // 2x more visible
          vy: -(3 + d * 8),
          sway: 6 + hash(i + 5) * 14,
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
    if (!staticOnly) {
      window.addEventListener('pointermove', onPointer, { passive: true });
      window.addEventListener('pointerout', onLeave, { passive: true });
    }

    let visible = true;
    let io: IntersectionObserver | null = null;
    if (!staticOnly) {
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
      io.observe(host);
    }

    // per-frame computed positions
    const X = new Float32Array(N), Y = new Float32Array(N), VF = new Float32Array(N);

    let last = 0;
    const draw = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
      last = now;
      ctx.clearRect(0, 0, W, H);

      if (m.tx < -900) { m.x += (-9999 - m.x) * 0.05; m.y += (-9999 - m.y) * 0.05; }
      else { m.x += (m.tx - m.x) * 0.12; m.y += (m.ty - m.y) * 0.12; }

      const t = now * 0.001;

      // 1) update + resolve positions
      for (let i = 0; i < N; i++) {
        const dot = dots[i];
        dot.by += dot.vy * dt;
        if (dot.by < -10) { dot.by = H + 10; dot.bx = hash(dot.ph * 1000 + now * 0.0001) * W; }
        let x = dot.bx + Math.sin(t * 0.25 + dot.ph) * dot.sway;
        const y = dot.by;

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

        X[i] = x + dot.ox;
        Y[i] = y + dot.oy;
        VF[i] = Math.max(0, Math.min(1, (y / H - 0.22) / 0.5)); // fade up to clear copy
      }

      // 2) links between near neighbours (drawn under the dots)
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = `rgb(${SAGE})`;
      for (let i = 0; i < N; i++) {
        if (VF[i] <= 0.01) continue;
        const xi = X[i], yi = Y[i];
        for (let j = i + 1; j < N; j++) {
          if (VF[j] <= 0.01) continue;
          const dx = xi - X[j], dy = yi - Y[j];
          if (dx > LINK_R || dx < -LINK_R || dy > LINK_R || dy < -LINK_R) continue;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= LINK_R) continue;
          const a = (1 - dist / LINK_R) * LINK_ALPHA * Math.min(VF[i], VF[j]);
          if (a <= 0.004) continue;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.moveTo(xi, yi);
          ctx.lineTo(X[j], Y[j]);
          ctx.stroke();
        }
      }

      // 3) dots on top
      for (let i = 0; i < N; i++) {
        const alpha = dots[i].a * VF[i];
        if (alpha <= 0.003) continue;
        const r = dots[i].r;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, X[i] - r, Y[i] - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0;
    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      else last = 0;
      raf = requestAnimationFrame(loop);
    };

    if (staticOnly) draw(16);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerout', onLeave);
      io?.disconnect();
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
