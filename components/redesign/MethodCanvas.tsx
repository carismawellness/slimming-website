'use client';

import { useEffect, useRef } from 'react';
import type * as THREE_NS from 'three';
import { prefersReducedMotion } from './motion';

/**
 * Calm ambient Three.js backdrop for the Method section: a field of softly
 * drifting sage particles with a gentle parallax sway. Understated, sits behind
 * the pillar grid.
 *
 * A11y / perf:
 *  - aria-hidden + pointer-events:none, positioned behind content.
 *  - Skipped entirely under prefers-reduced-motion or on coarse/narrow screens
 *    (a static CSS gradient fallback is rendered by the parent instead).
 *  - dynamic import('three'); pixelRatio capped at 1.5; rAF paused when the
 *    section is offscreen (IntersectionObserver) or the tab is hidden.
 *  - full dispose() on unmount.
 */
export default function MethodCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (prefersReducedMotion()) return;
    // Protect mobile / coarse-pointer perf — parent shows the gradient fallback.
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(max-width: 720px)').matches
    )
      return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const THREE = await import('three');
      if (disposed || !hostRef.current) return;

      const width = () => host.clientWidth || 1;
      const height = () => host.clientHeight || 1;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width() / height(), 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width(), height());
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      // ── soft drifting particles ────────────────────────────────────────────
      const COUNT = 140;
      const positions = new Float32Array(COUNT * 3);
      const speeds = new Float32Array(COUNT);
      const spread = 26;
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        speeds[i] = 0.04 + Math.random() * 0.08;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      // round soft sprite so particles read as gentle motes, not hard squares
      const sprite = (() => {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const ctx = c.getContext('2d')!;
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(142,176,147,0.9)');
        g.addColorStop(0.4, 'rgba(142,176,147,0.35)');
        g.addColorStop(1, 'rgba(142,176,147,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
      })();

      const material = new THREE.PointsMaterial({
        size: 0.85,
        map: sprite,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.NormalBlending,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // ── pointer parallax (very subtle) ─────────────────────────────────────
      const target = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target.x = ((e.clientX - r.left) / r.width - 0.5) * 0.6;
        target.y = ((e.clientY - r.top) / r.height - 0.5) * 0.4;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const onResize = () => {
        camera.aspect = width() / height();
        camera.updateProjectionMatrix();
        renderer.setSize(width(), height());
      };
      window.addEventListener('resize', onResize);

      // ── visibility gating ──────────────────────────────────────────────────
      let visible = true;
      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false;
          if (visible) loop();
        },
        { threshold: 0.01 }
      );
      io.observe(host);

      const onVis = () => {
        if (!document.hidden && visible) loop();
      };
      document.addEventListener('visibilitychange', onVis);

      // ── render loop ────────────────────────────────────────────────────────
      let raf = 0;
      let running = false;
      const pos = geometry.attributes.position as THREE_NS.BufferAttribute;
      const tick = () => {
        if (disposed || !visible || document.hidden) {
          running = false;
          return;
        }
        for (let i = 0; i < COUNT; i++) {
          let y = pos.array[i * 3 + 1] + speeds[i] * 0.06;
          if (y > spread * 0.42) y = -spread * 0.42; // wrap upward drift
          pos.array[i * 3 + 1] = y;
          // gentle horizontal shimmer
          pos.array[i * 3] += Math.sin(performance.now() * 0.0002 + i) * 0.0025;
        }
        pos.needsUpdate = true;

        points.rotation.y += (target.x - points.rotation.y) * 0.02;
        points.rotation.x += (-target.y - points.rotation.x) * 0.02;

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };
      const loop = () => {
        if (running || disposed) return;
        running = true;
        raf = requestAnimationFrame(tick);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        geometry.dispose();
        material.dispose();
        sprite.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        // static fallback gradient (used when canvas is skipped on mobile / RM)
        background:
          'radial-gradient(60% 50% at 50% 30%, rgba(201,216,193,0.18), transparent 70%)',
      }}
    />
  );
}
