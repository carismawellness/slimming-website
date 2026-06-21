'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Signature Three.js moment behind the Final CTA: a soft, slow-flowing
 * sage/blue aurora orb rendered with a fragment shader on a single fullscreen
 * quad (one draw call). Cheap, GPU-bound, and fully decorative.
 *
 * Perf + a11y:
 *  - dynamic import('three') inside useEffect
 *  - alpha:true, pixelRatio capped at 1.5
 *  - rAF paused when offscreen (IntersectionObserver) or document.hidden
 *  - full dispose on unmount
 *  - skipped entirely under prefers-reduced-motion or on coarse/small screens
 *    (a static CSS gradient fallback shows in those cases — see FinalCta.tsx)
 */
export default function FinalCtaAurora() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Respect reduced motion + avoid WebGL on small / coarse-pointer screens.
    if (prefersReducedMotion()) return;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = window.matchMedia('(max-width: 640px)').matches;
    if (coarse || small) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      if (disposed || !hostRef.current) return;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);

      const canvas = renderer.domElement;
      canvas.setAttribute('aria-hidden', 'true');
      canvas.style.position = 'absolute';
      canvas.style.inset = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(1, 1) },
        u_sage: { value: new THREE.Color(0x8eb093) },
        u_sageDeep: { value: new THREE.Color(0x5f7e66) },
        u_blue: { value: new THREE.Color(0x6391ab) },
      };

      const material = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms,
        vertexShader: `
          varying vec2 v_uv;
          void main() {
            v_uv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 v_uv;
          uniform float u_time;
          uniform vec2 u_res;
          uniform vec3 u_sage;
          uniform vec3 u_sageDeep;
          uniform vec3 u_blue;

          // value noise
          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
          float noise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
                       mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
          }
          float fbm(vec2 p){
            float s = 0.0; float a = 0.5;
            for(int i=0;i<5;i++){ s += a*noise(p); p *= 2.0; a *= 0.5; }
            return s;
          }

          void main(){
            // aspect-corrected, centered coords
            vec2 uv = v_uv;
            vec2 p = (uv - 0.5);
            p.x *= u_res.x / max(u_res.y, 1.0);

            float t = u_time * 0.06;

            // flowing domain-warped field
            vec2 q = vec2(fbm(p*1.6 + vec2(t, -t*0.7)), fbm(p*1.6 + vec2(5.2 - t*0.5, 1.3 + t)));
            float field = fbm(p*2.0 + q*1.4 + vec2(t*0.4, -t*0.3));

            // soft radial orb mask, drifting slowly
            vec2 c = vec2(sin(t*1.3)*0.08, cos(t*1.1)*0.05);
            float d = length(p - c);
            float orb = smoothstep(0.85, 0.05, d);

            float glow = pow(orb, 1.6) * (0.55 + 0.55*field);

            // colour ramp: deep sage core -> sage -> blue halo
            vec3 col = mix(u_sageDeep, u_sage, smoothstep(0.0, 0.6, field));
            col = mix(col, u_blue, smoothstep(0.45, 1.0, field) * 0.7);

            float alpha = clamp(glow, 0.0, 1.0) * 0.9;
            gl_FragColor = vec4(col, alpha);
          }
        `,
      });

      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(quad);

      const resize = () => {
        if (!hostRef.current) return;
        const w = hostRef.current.clientWidth || 1;
        const h = hostRef.current.clientHeight || 1;
        renderer.setSize(w, h, false);
        uniforms.u_res.value.set(w, h);
      };
      resize();
      window.addEventListener('resize', resize);

      // visibility gating
      let visible = true;
      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false;
          if (visible) tick();
        },
        { threshold: 0.01 }
      );
      io.observe(host);

      const onVis = () => {
        if (!document.hidden && visible) tick();
      };
      document.addEventListener('visibilitychange', onVis);

      let raf = 0;
      let running = false;
      const start = performance.now();
      const loop = () => {
        if (!visible || document.hidden) {
          running = false;
          return;
        }
        running = true;
        uniforms.u_time.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
        raf = requestAnimationFrame(loop);
      };
      const tick = () => {
        if (!running) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(loop);
        }
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVis);
        io.disconnect();
        quad.geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}
