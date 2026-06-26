'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const SIZE = 150;
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
    camera.position.z = 3.6;

    const col = new THREE.Color(HEX);
    const gc: THREE.BufferGeometry[] = [];
    const mc: THREE.Material[] = [];

    const body = new THREE.Group();
    scene.add(body);

    const mesh = (geo: THREE.BufferGeometry, mat: THREE.Material, parent: THREE.Object3D = body) => {
      gc.push(geo); mc.push(mat);
      const m = new THREE.Mesh(geo, mat);
      parent.add(m); return m;
    };

    /* ── Pulsing core ─────────────────────────────────────────────────── */
    const coreMat = new THREE.MeshStandardMaterial({
      color: col, emissive: col, emissiveIntensity: 3,
      metalness: 0, roughness: 0,
    });
    const core = mesh(new THREE.SphereGeometry(0.17, 24, 24), coreMat);

    /* ── Halo bloom sphere ────────────────────────────────────────────── */
    mesh(
      new THREE.SphereGeometry(0.30, 24, 24),
      new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.12,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }),
    );

    /* ── Gyroscope rings ──────────────────────────────────────────────── */
    const mkRing = (opacity: number, rx = 0, ry = 0): THREE.Mesh => {
      const geo = new THREE.TorusGeometry(0.72, 0.017, 8, 100);
      const mat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      gc.push(geo); mc.push(mat);
      const m = new THREE.Mesh(geo, mat);
      m.rotation.x = rx; m.rotation.y = ry;
      body.add(m); return m;
    };

    const ring1 = mkRing(0.88);
    const ring2 = mkRing(0.72, Math.PI / 2.5);
    const ring3 = mkRing(0.55, -Math.PI / 2.5, Math.PI / 6);

    /* ── Wireframe icosahedron ────────────────────────────────────────── */
    const icoGeo = new THREE.IcosahedronGeometry(0.90, 1);
    const edgesGeo = new THREE.EdgesGeometry(icoGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: col, transparent: true, opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    gc.push(icoGeo, edgesGeo); mc.push(edgeMat);
    const wireframe = new THREE.LineSegments(edgesGeo, edgeMat);
    body.add(wireframe);

    /* ── Orbiting data node ───────────────────────────────────────────── */
    const dotGeo = new THREE.SphereGeometry(0.045, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({
      color: col, blending: THREE.AdditiveBlending,
    });
    gc.push(dotGeo); mc.push(dotMat);
    const dotPivot = new THREE.Group();
    dotPivot.rotation.x = Math.PI / 3.5;
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.set(0.72, 0, 0);
    dotPivot.add(dot);
    body.add(dotPivot);

    /* ── Lights ───────────────────────────────────────────────────────── */
    scene.add(new THREE.PointLight(col, 2.2, 4));
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    /* ── Animate ──────────────────────────────────────────────────────── */
    let raf = 0;
    const animate = (ms: number) => {
      raf = requestAnimationFrame(animate);
      const t = ms * 0.001;

      body.rotation.y = t * 0.14;
      body.rotation.x = Math.sin(t * 0.28) * 0.18;

      ring1.rotation.z = t * 0.58;
      ring2.rotation.z = -t * 0.44;
      ring3.rotation.z = t * 0.32;

      wireframe.rotation.y = -t * 0.22;

      const p = 0.88 + Math.sin(t * 3.2) * 0.12;
      core.scale.setScalar(p);
      coreMat.emissiveIntensity = 2.6 + Math.sin(t * 3.2) * 1.2;

      dotPivot.rotation.z = t * 2.0;

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
