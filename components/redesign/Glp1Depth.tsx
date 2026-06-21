'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Subtle, medical Three.js depth layer for the GLP-1 section: a calm field of
 * soft sage/blue points drifting on a gentle wave — never flashy.
 *
 * Perf + a11y:
 *  • dynamic `import('three')` inside useEffect
 *  • alpha:true, capped pixel ratio
 *  • rAF paused via IntersectionObserver + document.visibilitychange
 *  • full dispose() on unmount
 *  • skipped entirely under prefers-reduced-motion or coarse/small screens
 *    (a static CSS gradient is shown instead via the `data-static` fallback)
 *  • canvas is aria-hidden + pointer-events:none and sits behind content
 */
export default function Glp1Depth() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const coarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;
    const small = typeof window !== 'undefined' && window.innerWidth < 720;

    // Reduced-motion / small / coarse → keep the static gradient fallback.
    if (prefersReducedMotion() || coarse || small) {
      host.setAttribute('data-static', 'true');
      return;
    }

    let disposed = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const THREE = await import('three');
      if (disposed || !hostRef.current) return;

      const el = hostRef.current;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 14;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      const canvas = renderer.domElement;
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      el.appendChild(canvas);

      // ── soft drifting point field ────────────────────────────────────────
      const COUNT = 320;
      const positions = new Float32Array(COUNT * 3);
      const seeds = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 34;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
        seeds[i] = Math.random() * Math.PI * 2;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = new THREE.PointsMaterial({
        color: new THREE.Color('#8EB093'),
        size: 0.16,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points = new THREE.Points(geo, mat);
      scene.add(points);

      // a second, cooler/blue sparser layer for depth
      const COUNT2 = 120;
      const pos2 = new Float32Array(COUNT2 * 3);
      const seeds2 = new Float32Array(COUNT2);
      for (let i = 0; i < COUNT2; i++) {
        pos2[i * 3] = (Math.random() - 0.5) * 30;
        pos2[i * 3 + 1] = (Math.random() - 0.5) * 20;
        pos2[i * 3 + 2] = (Math.random() - 0.5) * 8 + 4;
        seeds2[i] = Math.random() * Math.PI * 2;
      }
      const geo2 = new THREE.BufferGeometry();
      geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
      const mat2 = new THREE.PointsMaterial({
        color: new THREE.Color('#6391AB'),
        size: 0.22,
        transparent: true,
        opacity: 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const points2 = new THREE.Points(geo2, mat2);
      scene.add(points2);

      const resize = () => {
        const w = el.clientWidth || 1;
        const h = el.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      window.addEventListener('resize', resize);

      let raf = 0;
      let running = false;
      const start = performance.now();

      const tick = () => {
        if (!running) return;
        const t = (performance.now() - start) / 1000;

        const arr = geo.attributes.position.array as Float32Array;
        for (let i = 0; i < COUNT; i++) {
          arr[i * 3 + 1] += Math.sin(t * 0.4 + seeds[i]) * 0.0026;
        }
        geo.attributes.position.needsUpdate = true;

        points.rotation.z = Math.sin(t * 0.05) * 0.08;
        points2.rotation.z = -Math.sin(t * 0.04) * 0.06;
        camera.position.x = Math.sin(t * 0.06) * 0.6;
        camera.position.y = Math.cos(t * 0.05) * 0.4;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
        raf = requestAnimationFrame(tick);
      };

      const play = () => {
        if (running || document.hidden) return;
        running = true;
        raf = requestAnimationFrame(tick);
      };
      const pause = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) play();
          else pause();
        },
        { threshold: 0.01 }
      );
      io.observe(el);

      const onVis = () => {
        if (document.hidden) pause();
        else play();
      };
      document.addEventListener('visibilitychange', onVis);

      cleanup = () => {
        pause();
        io.disconnect();
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        geo.dispose();
        geo2.dispose();
        mat.dispose();
        mat2.dispose();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    })();

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="cx-glp-depth"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
}
