'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroMotif — the Carisma flowing-lines motif (Vector.svg) brought to life as a
 * living 3D wave field with Three.js.
 *
 * The SVG is a field of stacked sage contour lines; here those lines are laid
 * into 3D depth and driven by a layered flowing-wave vertex shader, viewed at a
 * low angle with perspective so they recede and converge — a subtle, luxurious,
 * award-worthy "silk current" behind the hero. Sage #96B2B2, very low opacity.
 *
 * Guards: skipped under prefers-reduced-motion (a single static frame is drawn
 * instead, so the motif still shows); DPR capped; paused when offscreen/hidden;
 * three.js dynamically imported so it never blocks SSR / first paint; full
 * dispose on unmount.
 */
export default function HeroMotif() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      if (disposed || !host) return;

      const coarse =
        window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 760;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !coarse,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(46, host.clientWidth / host.clientHeight, 0.1, 100);
      camera.position.set(0, 1.7, 6.6);
      camera.lookAt(0, -0.2, -3);

      // ── Build the line field ────────────────────────────────────────────
      const LINES = coarse ? 16 : 24;   // stacked contour lines (sparse)
      const SEG = coarse ? 60 : 96;     // points per line
      const HALF_W = 8.2;               // x extent
      const Z_NEAR = 2.6;               // bring the band close so it fills the
      const Z_FAR = -7.0;               // bottom white-space below the CTA

      const positions: number[] = [];
      const seeds: number[] = [];
      for (let i = 0; i < LINES; i++) {
        const z = Z_NEAR + (Z_FAR - Z_NEAR) * (i / (LINES - 1));
        const seed = i * 0.37;
        for (let s = 0; s < SEG - 1; s++) {
          const x0 = -HALF_W + (2 * HALF_W) * (s / (SEG - 1));
          const x1 = -HALF_W + (2 * HALF_W) * ((s + 1) / (SEG - 1));
          positions.push(x0, 0, z, x1, 0, z); // a segment (pair) → LineSegments
          seeds.push(seed, seed);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));

      const uniforms = {
        uTime: { value: 0 },
        uMouse: { value: 0 },
        uIntro: { value: 0 },
        uColor: { value: new THREE.Color('#96B2B2') },
        uZNear: { value: Z_NEAR },
        uZFar: { value: Z_FAR },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        vertexShader: /* glsl */ `
          uniform float uTime;
          uniform float uMouse;
          attribute float aSeed;
          varying float vDepth;
          varying float vWave;
          varying float vNdcY;
          varying float vX;
          void main() {
            vec3 p = position;
            float x = p.x;
            float z = p.z;
            // layered flowing wave — wind moving across a silk field
            float w = 0.0;
            w += 0.62 * sin(x * 0.46 + z * 0.52 + uTime * 0.20);
            w += 0.30 * sin(x * 0.88 - z * 0.40 + uTime * 0.13 + aSeed);
            w += 0.14 * sin(x * 1.80 + z * 1.00 - uTime * 0.23 + aSeed * 1.7);
            w += 0.055 * sin(x * 3.20 - z * 0.28 + uTime * 0.36);
            // slow luxurious breath — the whole field gently swells and settles
            float breath = 0.90 + 0.10 * sin(uTime * 0.11);
            p.y += w * breath;
            // barely-there parallax sway toward the pointer, stronger up close
            p.x += uMouse * 0.30 * (1.0 + (z - ${Z_FAR.toFixed(1)}) * 0.02);
            vDepth = z;
            vWave = w;
            vX = x;
            vec4 clip = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            vNdcY = clip.y / clip.w; // -1 bottom … +1 top of screen
            gl_Position = clip;
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform vec3 uColor;
          uniform float uIntro;
          uniform float uZNear;
          uniform float uZFar;
          uniform float uTime;
          varying float vDepth;
          varying float vWave;
          varying float vNdcY;
          varying float vX;
          void main() {
            // atmospheric depth fade: near = visible, far = dissolves
            float depth = clamp((vDepth - uZFar) / (uZNear - uZFar), 0.0, 1.0);
            float depthFade = smoothstep(0.08, 0.78, depth);
            // keep the motif low: fully faded through the copy/CTA region and
            // only filling the white space well below the button.
            float bottomBias = smoothstep(0.12, -0.55, vNdcY);
            // crest highlight — tops of the waves catch a little more light
            float crest = 0.6 + 0.4 * smoothstep(-0.4, 0.6, vWave);
            // traveling silk sheen — a soft band of light drifts slowly across,
            // catching the field like light moving over satin
            float sheen = 0.5 + 0.5 * sin(vX * 0.20 - uTime * 0.26);
            sheen = pow(clamp(sheen, 0.0, 1.0), 2.6);
            // luxe tonal depth: sage deepens in the troughs and lifts toward a
            // pale pearl at the crests / where the sheen passes
            vec3 deep  = vec3(0.40, 0.53, 0.51);
            vec3 pearl = vec3(0.91, 0.95, 0.92);
            vec3 col = mix(deep, uColor, crest);
            col = mix(col, pearl, sheen * 0.55 + crest * 0.16);
            float a = depthFade * bottomBias * (0.76 * crest + 0.24) * (0.78 + sheen * 0.6) * 0.34 * uIntro;
            gl_FragColor = vec4(col, a);
          }
        `,
      });

      const field = new THREE.LineSegments(geo, material);
      field.rotation.x = -0.06; // a touch of tilt for depth
      field.position.y = -1.7;  // drop the band into the lower hero white-space
      scene.add(field);

      // ── Interaction + sizing ────────────────────────────────────────────
      let targetMouse = 0;
      const onPointer = (e: PointerEvent) => {
        targetMouse = (e.clientX / window.innerWidth) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const onResize = () => {
        if (!host) return;
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize, { passive: true });

      // pause when offscreen / tab hidden
      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting; },
        { threshold: 0 }
      );
      io.observe(host);
      const onVis = () => { visible = !document.hidden; };
      document.addEventListener('visibilitychange', onVis);

      const start = performance.now();
      let raf = 0;
      const render = (now: number) => {
        const t = (now - start) / 1000;
        uniforms.uTime.value = t;
        uniforms.uIntro.value = Math.min(1, t / 0.3); // appear right away
        uniforms.uMouse.value += (targetMouse - uniforms.uMouse.value) * 0.022;
        if (visible && !document.hidden) renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };

      if (reduced) {
        // single representative static frame
        uniforms.uTime.value = 2.0;
        uniforms.uIntro.value = 1;
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(render);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
        document.removeEventListener('visibilitychange', onVis);
        io.disconnect();
        geo.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
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
