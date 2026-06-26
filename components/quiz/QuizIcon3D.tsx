'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Small 120×120 spinning TorusKnot icon for the quiz results hero.
   Sage-green palette matching ParticleScene.tsx.
   Returns null on mobile (pointer: coarse) or prefers-reduced-motion.

   Rotation is time-based (no Date.now(), no Math.random() in rAF loop):
     Y: 0.48 rad/s  ≈ 0.008 rad/frame @ 60 fps
     X: 0.24 rad/s  ≈ 0.004 rad/frame @ 60 fps
*/
export default function QuizIcon3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Hard gate: no canvas animation on touch devices or reduced-motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const SIZE = 120;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(SIZE, SIZE);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 3.2;

    // Warm ambient light (light sage #C9D8C1)
    const ambient = new THREE.AmbientLight(0xc9d8c1, 1.2);
    scene.add(ambient);

    // Primary point light — brand sage highlight
    const point = new THREE.PointLight(0x8eb093, 3.5, 10);
    point.position.set(2, 2, 2);
    scene.add(point);

    // Secondary fill light — deep sage from below
    const fill = new THREE.PointLight(0x4f7256, 1.8, 8);
    fill.position.set(-2, -1.5, 1);
    scene.add(fill);

    // TorusKnot p:2 q:3 — elegant wellness/infinity symbol
    const geo = new THREE.TorusKnotGeometry(0.55, 0.18, 200, 24, 2, 3);
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8EB093'),
      metalness: 0.3,
      roughness: 0.4,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    let raf = 0;

    const animate = (time: number) => {
      raf = requestAnimationFrame(animate);
      // time-based rotation — frame-rate independent, no Date.now()
      const t = time * 0.001; // convert ms → seconds
      knot.rotation.y = t * 0.48; // 0.48 rad/s ≈ 0.008 rad/frame @ 60 fps
      knot.rotation.x = t * 0.24; // 0.24 rad/s ≈ 0.004 rad/frame @ 60 fps
      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  // The canvas is always mounted (SSR-safe: zero size until useEffect runs),
  // but nothing is rendered into it on mobile/reduced-motion — it stays
  // transparent (alpha: true + clearColor opacity 0) and invisible.
  return (
    <canvas
      ref={canvasRef}
      width={120}
      height={120}
      style={{
        display: 'block',
        width: '120px',
        height: '120px',
        pointerEvents: 'none',
      }}
    />
  );
}
