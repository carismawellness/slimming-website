'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroMotif — "Aurora Breath".
 *
 * A bottom-up, first-principles motif for Carisma Slimming: not lines, but a
 * soft wash of sage light that slowly drifts and gently *breathes*, like dawn
 * light through mist. It evokes the brand's promise — calm, lightness, gentle
 * renewal — and makes the hero feel alive without ever competing with the copy.
 *
 * Technique: a single full-screen fragment shader. Domain-warped fbm noise
 * forms organic, ever-shifting volumes of light; a slow global pulse makes the
 * whole field breathe; the light pools in the lower hero (the white space below
 * the CTA) and dissolves before it reaches the headline. Tonal palette runs
 * from deep sage in the shadows to the brand sage to a pale pearl at the cores.
 *
 * Guards: reduced-motion → one static frame; DPR-capped; lighter octave count
 * on phones; paused offscreen / tab-hidden; three.js imported dynamically so it
 * never blocks SSR / first paint; full dispose on unmount. Time is referenced
 * only in the fragment shader, so there is no cross-stage uniform mismatch.
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
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1 : 1.5));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);
      Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' });

      const scene = new THREE.Scene();
      const camera = new THREE.Camera(); // vertex shader writes clip space directly

      const uniforms = {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(host.clientWidth, host.clientHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_intro: { value: 0 },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        depthTest: false,
        defines: { OCTAVES: coarse ? 3 : 5, WARP2: coarse ? 0 : 1 },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform float u_time;
          uniform vec2  u_res;
          uniform vec2  u_mouse;
          uniform float u_intro;
          varying vec2  vUv;

          float hash(vec2 p){
            p = fract(p * vec2(123.34, 345.45));
            p += dot(p, p + 34.345);
            return fract(p.x * p.y);
          }
          float noise(vec2 p){
            vec2 i = floor(p), f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
          }
          float fbm(vec2 p){
            float v = 0.0, a = 0.5;
            for (int i = 0; i < OCTAVES; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
            return v;
          }

          void main(){
            vec2 uv = vUv;
            vec2 p = uv;
            p.x *= u_res.x / u_res.y;        // aspect-correct
            p += (u_mouse - 0.5) * 0.05;     // whisper of parallax

            float t = u_time * 0.055;        // slow drift

            // domain-warped fbm → organic, ever-shifting light
            vec2 q = vec2(fbm(p * 1.5 + vec2(0.0, t)),
                          fbm(p * 1.5 + vec2(5.2, -t)));
            vec2 w = p * 1.5 + q * 1.1;
            #if WARP2
              vec2 r = vec2(fbm(w + vec2(1.7, 0.30 * t)),
                            fbm(w + vec2(8.3, -0.20 * t)));
              w += r * 1.3;
            #endif
            float n = fbm(w);

            // breathing — the whole field gently swells and settles
            n *= 0.92 + 0.08 * sin(u_time * 0.17);

            // shape into soft light
            float light = smoothstep(0.18, 0.74, n);

            // brand tonal palette: deep sage → sage → pale pearl at the cores
            vec3 deep  = vec3(0.27, 0.45, 0.33);
            vec3 sage  = vec3(0.557, 0.690, 0.576);
            vec3 pearl = vec3(0.93, 0.95, 0.91);
            vec3 col = mix(deep, sage, smoothstep(0.0, 0.6, light));
            col = mix(col, pearl, smoothstep(0.70, 1.0, light) * 0.65);

            // pool the light low and dissolve it before the headline
            float lowBias  = smoothstep(0.60, 0.0, uv.y);   // strong at bottom
            float sideFade = smoothstep(1.05, 0.20, abs(uv.x - 0.5));
            float mask = lowBias * mix(0.82, 1.0, sideFade);

            float alpha = light * mask * 0.95 * u_intro;

            // fine grain to keep the gradients clean (no banding)
            col += (hash(uv * u_res + t) - 0.5) * 0.018;

            gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
          }
        `,
      });

      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(quad);

      // ── interaction + sizing ────────────────────────────────────────────
      const target = new THREE.Vector2(0.5, 0.5);
      const onPointer = (e: PointerEvent) => {
        target.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const onResize = () => {
        if (!host) return;
        const w = host.clientWidth, h = host.clientHeight;
        renderer.setSize(w, h);
        uniforms.u_res.value.set(w, h);
      };
      window.addEventListener('resize', onResize, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting; },
        { threshold: 0 }
      );
      io.observe(host);

      const start = performance.now();
      let raf = 0;
      const render = (now: number) => {
        const tt = (now - start) / 1000;
        uniforms.u_time.value = tt;
        uniforms.u_intro.value = Math.min(1, tt / 0.7); // appears almost at once
        uniforms.u_mouse.value.lerp(target, 0.03);
        if (visible && !document.hidden) renderer.render(scene, camera);
        raf = requestAnimationFrame(render);
      };

      if (reduced) {
        uniforms.u_time.value = 8.0;
        uniforms.u_intro.value = 1;
        renderer.render(scene, camera);
      } else {
        raf = requestAnimationFrame(render);
      }

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('pointermove', onPointer);
        window.removeEventListener('resize', onResize);
        io.disconnect();
        quad.geometry.dispose();
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
