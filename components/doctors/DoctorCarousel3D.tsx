'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  images: string[];
  activeIndex: number;
  onActiveChange: (i: number) => void;
  reducedMotion?: boolean;
};

const SPACING = 2.15; // x gap between cards
const DEPTH = 1.6; // z push-back for side cards
const ANGLE = 0.5; // y-rotation (rad) for side cards
const SIDE_SCALE = 0.78;

type CardTarget = { x: number; z: number; ry: number; s: number; o: number };

export default function DoctorCarousel3D({ images, activeIndex, onActiveChange, reducedMotion }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;
  const onActiveRef = useRef(onActiveChange);
  onActiveRef.current = onActiveChange;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // wrapper handles the fallback; bail quietly
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || Math.round(w * 0.6);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const loader = new THREE.TextureLoader();
    const cards = images.map((src) => {
      const tex = loader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.PlaneGeometry(2, 2.5);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return {
        mesh,
        geo,
        mat,
        tex,
        cur: { x: 0, z: 0, ry: 0, s: 1, o: 1 } as CardTarget,
        target: { x: 0, z: 0, ry: 0, s: 1, o: 1 } as CardTarget,
      };
    });

    const setTargets = () => {
      const active = activeRef.current;
      cards.forEach((c, i) => {
        const off = i - active;
        const t: CardTarget = {
          x: off * SPACING,
          z: -Math.abs(off) * DEPTH,
          ry: -off * ANGLE,
          s: off === 0 ? 1 : SIDE_SCALE,
          o: off === 0 ? 1 : 0.55,
        };
        c.target = t;
        if (reducedMotion) Object.assign(c.cur, t); // snap
      });
    };
    setTargets();
    (mount as unknown as { __setTargets?: () => void }).__setTargets = setTargets;

    let raf = 0;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const tick = () => {
      cards.forEach((c) => {
        const t = c.target;
        const n = reducedMotion ? 1 : 0.12;
        c.cur.x = lerp(c.cur.x, t.x, n);
        c.cur.z = lerp(c.cur.z, t.z, n);
        c.cur.ry = lerp(c.cur.ry, t.ry, n);
        c.cur.s = lerp(c.cur.s, t.s, n);
        c.cur.o = lerp(c.cur.o, t.o, n);
        c.mesh.position.set(c.cur.x, 0, c.cur.z);
        c.mesh.rotation.y = c.cur.ry;
        c.mesh.scale.setScalar(c.cur.s);
        c.mat.opacity = c.cur.o;
        c.mesh.renderOrder = Math.round(c.cur.z * 10);
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    let downX: number | null = null;
    const onDown = (e: PointerEvent) => {
      downX = e.clientX;
    };
    const onUp = (e: PointerEvent) => {
      if (downX === null) return;
      const dx = e.clientX - downX;
      downX = null;
      if (Math.abs(dx) < 40) return;
      const next = Math.min(images.length - 1, Math.max(0, activeRef.current + (dx < 0 ? 1 : -1)));
      if (next !== activeRef.current) onActiveRef.current(next);
    };
    const el = renderer.domElement;
    el.style.touchAction = 'pan-y';
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
        c.tex.dispose();
      });
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [images, reducedMotion]);

  // Re-run target calc when activeIndex changes (without re-creating the scene).
  useEffect(() => {
    (mountRef.current as unknown as { __setTargets?: () => void } | null)?.__setTargets?.();
  }, [activeIndex]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: '100%', height: '100%', minHeight: 360, cursor: 'grab' }} />;
}
