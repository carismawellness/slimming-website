'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SIZE = 220;
const HEX  = '#2AE085'; // electric emerald-sage

export default function QuizIcon3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(SIZE, SIZE);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3.4;

    const col = new THREE.Color(HEX);
    const gc: THREE.BufferGeometry[] = [];
    const mc: THREE.Material[] = [];

    const body = new THREE.Group();
    scene.add(body);

    const add = <G extends THREE.BufferGeometry, M extends THREE.Material>(
      geo: G, mat: M, parent: THREE.Object3D = body,
    ): THREE.Mesh<G, M> => {
      gc.push(geo); mc.push(mat);
      const m = new THREE.Mesh(geo, mat);
      parent.add(m); return m;
    };

    /* ── Core: bright solid sphere ────────────────────────────────────── */
    const coreMat = new THREE.MeshBasicMaterial({ color: col });
    const core = add(new THREE.SphereGeometry(0.16, 32, 32), coreMat);

    /* ── Bloom halo layers ────────────────────────────────────────────── */
    [0.30, 0.46, 0.64].forEach((r, i) => {
      add(
        new THREE.SphereGeometry(r, 24, 24),
        new THREE.MeshBasicMaterial({
          color: col,
          transparent: true,
          opacity: 0.10 - i * 0.025,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.BackSide,
        }),
      );
    });

    /* ── Gyroscope rings ──────────────────────────────────────────────── */
    const mkRing = (opacity: number, rx = 0, ry = 0): THREE.Mesh => {
      const geo = new THREE.TorusGeometry(0.74, 0.030, 10, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      gc.push(geo); mc.push(mat);
      const m = new THREE.Mesh(geo, mat);
      m.rotation.x = rx; m.rotation.y = ry;
      body.add(m); return m;
    };

    const ring1 = mkRing(0.95);
    const ring2 = mkRing(0.80, Math.PI / 2.5);
    const ring3 = mkRing(0.65, -Math.PI / 2.5, Math.PI / 6);

    /* ── Wireframe icosahedron ────────────────────────────────────────── */
    const icoGeo   = new THREE.IcosahedronGeometry(0.92, 1);
    const edgesGeo = new THREE.EdgesGeometry(icoGeo);
    const edgeMat  = new THREE.LineBasicMaterial({
      color: col, transparent: true, opacity: 0.30,
      blending: THREE.AdditiveBlending,
    });
    gc.push(icoGeo, edgesGeo); mc.push(edgeMat);
    const wireframe = new THREE.LineSegments(edgesGeo, edgeMat);
    body.add(wireframe);

    /* ── Orbiting data nodes ──────────────────────────────────────────── */
    const mkDot = (r: number, tiltX: number): THREE.Group => {
      const dotGeo = new THREE.SphereGeometry(0.050, 10, 10);
      const dotMat = new THREE.MeshBasicMaterial({ color: col, blending: THREE.AdditiveBlending });
      gc.push(dotGeo); mc.push(dotMat);
      const pivot = new THREE.Group();
      pivot.rotation.x = tiltX;
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(r, 0, 0);
      pivot.add(dot);
      body.add(pivot);
      return pivot;
    };

    const dot1 = mkDot(0.74, Math.PI / 3.5);
    const dot2 = mkDot(0.74, -Math.PI / 4);

    /* ── Animate ──────────────────────────────────────────────────────── */
    let raf = 0;
    const animate = (ms: number) => {
      raf = requestAnimationFrame(animate);
      const t = ms * 0.001;

      body.rotation.y = t * 0.13;
      body.rotation.x = Math.sin(t * 0.27) * 0.16;

      ring1.rotation.z =  t * 0.60;
      ring2.rotation.z = -t * 0.45;
      ring3.rotation.z =  t * 0.33;

      wireframe.rotation.y = -t * 0.20;

      const p = 0.86 + Math.sin(t * 3.4) * 0.14;
      core.scale.setScalar(p);

      dot1.rotation.z =  t * 1.9;
      dot2.rotation.z = -t * 1.4;

      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      gc.forEach(g => g.dispose());
      mc.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      style={{ display: 'block', width: `${SIZE}px`, height: `${SIZE}px`, pointerEvents: 'none' }}
      aria-hidden
    />
  );
}
