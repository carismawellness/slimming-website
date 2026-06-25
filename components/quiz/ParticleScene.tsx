'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* Full-bleed Three.js particle canvas for slimming quiz results hero.
   Forest green palette; additive blending over dark background. */
export default function ParticleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.offsetWidth || window.innerWidth;
    const h = canvas.offsetHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    const COUNT = 700;
    const positions = new Float32Array(COUNT * 3);
    const colors    = new Float32Array(COUNT * 3);
    const sizes     = new Float32Array(COUNT);
    const speeds    = new Float32Array(COUNT);
    const offsets   = new Float32Array(COUNT);

    // Forest green / sage palette
    const palette: THREE.Color[] = [
      new THREE.Color('#C9D8C1'), // light sage
      new THREE.Color('#8EB093'), // brand sage
      new THREE.Color('#4f7256'), // deep sage
      new THREE.Color('#ffffff'), // white
      new THREE.Color('#A8C5A0'), // mid sage
      new THREE.Color('#D6E8D0'), // pale sage
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      const roll = Math.random();
      if (roll < 0.6)      sizes[i] = Math.random() * 2 + 1;
      else if (roll < 0.9) sizes[i] = Math.random() * 4 + 3;
      else                 sizes[i] = Math.random() * 6 + 7;

      speeds[i]  = Math.random() * 0.4 + 0.1;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('speed',    new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('offset',   new THREE.BufferAttribute(offsets, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader: `
        attribute float size;
        attribute float speed;
        attribute float offset;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vColor = color;
          vSize  = size;

          vec3 pos = position;
          pos.y += sin(offset + uTime * speed * 0.6) * 0.18;
          pos.x += cos(offset * 1.3 + uTime * speed * 0.4) * 0.10;

          float depth = (pos.z + 4.0) / 8.0;
          pos.x += uMouse.x * 0.5 * depth;
          pos.y += uMouse.y * 0.35 * depth;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (350.0 / -mvPosition.z);
          gl_Position  = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSize;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float r  = length(uv);
          if (r > 0.5) discard;

          float core = smoothstep(0.5, 0.0, r);
          float glow = smoothstep(0.5, 0.0, r * 1.6) * 0.5;
          float alpha = (core + glow) * (vSize > 5.0 ? 0.45 : 0.80);

          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent:  true,
      depthWrite:   false,
      blending:     THREE.AdditiveBlending,
      vertexColors: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    const onMouse = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      const nw = canvas.offsetWidth  || window.innerWidth;
      const nh = canvas.offsetHeight || window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    let raf = 0;
    const animate = (t: number) => {
      raf = requestAnimationFrame(animate);
      const secs = t * 0.001;

      currentX += (targetX - currentX) * 0.04;
      currentY += (targetY - currentY) * 0.04;

      mat.uniforms.uTime.value  = secs;
      mat.uniforms.uMouse.value.set(currentX, currentY);

      points.rotation.y = secs * 0.018;
      points.rotation.x = secs * 0.009;

      renderer.render(scene, camera);
    };
    requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
