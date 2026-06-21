'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Ambient luxurious "silk" — an undulating, slowly-drifting gradient plane in the
 * brand cool palette, used as a faint backdrop behind the Results Guarantee panel.
 * Decorative only (aria-hidden). Code-split + lazy-mounted by the parent; freezes
 * under prefers-reduced-motion; bails quietly if WebGL is unavailable.
 */
export default function SilkBackdrop({ reducedMotion }: { reducedMotion?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.set(0, 0, 5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || 360;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const W = 15;
    const H = 10;
    const geo = new THREE.PlaneGeometry(W, H, 56, 56);

    // Horizontal sage → light-sage → slate-blue gradient via vertex colors.
    const cA = new THREE.Color('#8EB093');
    const cB = new THREE.Color('#C9D8C1');
    const cC = new THREE.Color('#6391AB');
    const pos = geo.attributes.position;
    const colors: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const t = pos.getX(i) / W + 0.5; // 0..1 across width
      const c = t < 0.5 ? cA.clone().lerp(cB, t * 2) : cB.clone().lerp(cC, (t - 0.5) * 2);
      colors.push(c.r, c.g, c.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const mat = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.42, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.rotation.x = -0.52;
    mesh.rotation.z = 0.16;
    scene.add(mesh);

    // Base (flat) positions to displace from each frame.
    const base = Float32Array.from(pos.array);

    let raf = 0;
    const wave = (time: number) => {
      for (let i = 0; i < pos.count; i++) {
        const x = base[i * 3];
        const y = base[i * 3 + 1];
        const z =
          Math.sin(x * 0.5 + time) * 0.34 +
          Math.cos(y * 0.6 + time * 1.15) * 0.3 +
          Math.sin((x + y) * 0.3 + time * 0.8) * 0.2;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
      renderer.render(scene, camera);
    };

    const loop = (t: number) => {
      wave(t * 0.0006);
      raf = requestAnimationFrame(loop);
    };

    if (reducedMotion) {
      wave(0); // single static drape
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return <div ref={mountRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }} />;
}
