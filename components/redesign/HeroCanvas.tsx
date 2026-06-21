'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './motion';

/**
 * Living "body-contour" field behind the hero — a single full-screen plane
 * driven by a layered fragment shader:
 *   • flowing topographic body-contour lines (warped fbm) that drift over time
 *   • a soft aurora / gradient bloom in sage → cream → blue
 *   • gentle mouse-reactive parallax + depth
 *   • subtle floating depth particles (rendered in the same shader, cheap)
 *   • fine film grain + soft vignette that keeps the top-left text legible
 *
 * Performance & a11y guards:
 *  • Skipped entirely under prefers-reduced-motion (a CSS gradient fallback
 *    already paints behind it, so nothing breaks).
 *  • DPR capped at 1.5 (1.0 on coarse pointers); animation paused when the tab
 *    is hidden or the hero scrolls out of view (IntersectionObserver).
 *  • Coarse-pointer / very small screens run a lighter shader (fewer fbm
 *    octaves, no particles) to protect mobile performance.
 *  • Three.js imported dynamically so it never blocks first paint / SSR.
 */
export default function HeroCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      if (disposed || !host) return;

      // Lighter pipeline on coarse pointers / small screens.
      const coarse =
        window.matchMedia('(pointer: coarse)').matches ||
        window.innerWidth < 760;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'low-power',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.0 : 1.5));
      renderer.setSize(host.clientWidth, host.clientHeight);
      host.appendChild(renderer.domElement);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_time: { value: 0 },
        u_res: { value: new THREE.Vector2(host.clientWidth, host.clientHeight) },
        u_mouse: { value: new THREE.Vector2(0.5, 0.55) },
        u_intro: { value: 0 }, // 0→1 reveal on load
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        defines: { LITE: coarse ? 1 : 0 },
        vertexShader: /* glsl */ `
          varying vec2 v_uv;
          void main() { v_uv = uv; gl_Position = vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          varying vec2 v_uv;
          uniform float u_time;
          uniform vec2  u_res;
          uniform vec2  u_mouse;
          uniform float u_intro;

          // ── soft value-noise + fbm ───────────────────────────────────────
          vec2 hash(vec2 p){
            p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
            return fract(sin(p) * 43758.5453);
          }
          float noise(vec2 p){
            vec2 i = floor(p); vec2 f = fract(p);
            vec2 u = f*f*(3.0-2.0*f);
            float a = dot(hash(i)            - 0.5, f);
            float b = dot(hash(i+vec2(1,0))  - 0.5, f-vec2(1,0));
            float c = dot(hash(i+vec2(0,1))  - 0.5, f-vec2(0,1));
            float d = dot(hash(i+vec2(1,1))  - 0.5, f-vec2(1,1));
            return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
          }
          float fbm(vec2 p){
            float v = 0.0, a = 0.5;
            #if LITE
              const int OCT = 4;
            #else
              const int OCT = 6;
            #endif
            mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
            for(int i=0;i<OCT;i++){ v += a*noise(p); p = rot*p*2.02; a *= 0.5; }
            return v;
          }

          // cheap hash for grain
          float ghash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }

          void main(){
            vec2 uv = v_uv;
            float aspect = u_res.x / max(u_res.y, 1.0);
            vec2 p = vec2(uv.x*aspect, uv.y);
            vec2 m = (u_mouse - 0.5);

            float t = u_time * 0.05;

            // domain-warped contour field — gives the topographic "body map" feel
            vec2 warp = vec2(
              fbm(p*1.6 + vec2(0.0, t) + m*0.30),
              fbm(p*1.6 + vec2(5.2, -t*0.7) - m*0.30)
            );
            float field = fbm(p*2.3 + warp*1.4 + vec2(t*0.6, -t*0.4));
            field += 0.22 * fbm(p*4.6 - vec2(t*0.5, t*0.8) + m*0.15);

            // ── base gradient: warm cream → soft sage, gentle diagonal ──────
            vec3 cream = vec3(0.965, 0.949, 0.917);
            vec3 sageL = vec3(0.788, 0.847, 0.760);
            vec3 sage  = vec3(0.557, 0.690, 0.576);
            vec3 sageD = vec3(0.373, 0.494, 0.400);
            vec3 blue  = vec3(0.388, 0.569, 0.671);

            float g = clamp(uv.y*0.55 + uv.x*0.28 + field*0.40, 0.0, 1.0);
            vec3 col = mix(cream, sageL, smoothstep(0.12, 0.92, g));
            col = mix(col, sage, smoothstep(0.62, 1.05, g) * 0.55);

            // ── aurora / gradient bloom: slow drifting sage→blue lobes ──────
            vec2 ac = vec2(0.72 + 0.10*sin(t*1.3), 0.30 + 0.12*cos(t*1.1)) + m*0.10;
            float aur = smoothstep(0.65, 0.0, distance(vec2(uv.x*aspect, uv.y), vec2(ac.x*aspect, ac.y)));
            aur *= 0.5 + 0.5*fbm(p*1.2 + t);
            col = mix(col, mix(sage, blue, 0.5), aur * 0.22);

            vec2 ac2 = vec2(0.18 + 0.08*cos(t*0.9), 0.85 + 0.06*sin(t*1.4));
            float aur2 = smoothstep(0.55, 0.0, distance(vec2(uv.x*aspect, uv.y), vec2(ac2.x*aspect, ac2.y)));
            col = mix(col, blue, aur2 * 0.10);

            // ── layered topographic contour lines from the warped field ─────
            float lw = fwidth(field) * 1.4 + 0.004; // anti-aliased line width
            float c1 = abs(fract(field*7.0) - 0.5);
            float major = smoothstep(lw, 0.0, c1);
            col = mix(col, sageD, major * 0.20);

            float c2 = abs(fract(field*14.0) - 0.5);
            float minor = smoothstep(lw*0.7, 0.0, c2);
            col = mix(col, sage, minor * 0.08);

            // faint blue highlight riding the contour crests
            col = mix(col, blue, major * smoothstep(0.55, 0.85, g) * 0.06);

            #if !LITE
            // ── floating depth particles (additive sparkle, very subtle) ────
            float spark = 0.0;
            for(int i=0;i<3;i++){
              float fi = float(i);
              vec2 gp = p * (3.0 + fi*2.0);
              vec2 cell = floor(gp);
              vec2 fp = fract(gp) - 0.5;
              vec2 rnd = hash(cell + fi*17.0);
              // drift each particle slowly upward, looping
              float drift = fract(rnd.y + t*(0.10 + 0.05*fi));
              fp.y += (drift - 0.5);
              float d = length(fp);
              float tw = 0.5 + 0.5*sin(u_time*1.5 + rnd.x*6.28 + fi);
              spark += smoothstep(0.06, 0.0, d) * tw * (0.10 - fi*0.02);
            }
            col += spark * vec3(1.0, 0.99, 0.95);
            #endif

            // ── soft radial vignette toward edges (keeps top-left legible) ──
            float vig = smoothstep(1.25, 0.30, distance(uv, vec2(0.30, 0.62)));
            col = mix(col*0.96, col, vig);
            // gentle brightening of the upper-left text zone
            float lift = smoothstep(0.45, 0.0, distance(uv, vec2(0.22, 0.78)));
            col = mix(col, col + 0.03, lift);

            // ── fine film grain ─────────────────────────────────────────────
            float grain = ghash(uv * u_res.xy + u_time) - 0.5;
            col += grain * 0.018;

            // ── load reveal: wash in from soft cream ────────────────────────
            float intro = clamp(u_intro, 0.0, 1.0);
            col = mix(cream, col, smoothstep(0.0, 1.0, intro));
            float alpha = mix(0.0, 1.0, smoothstep(0.0, 0.5, intro));

            gl_FragColor = vec4(col, alpha);
          }
        `,
      });

      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(quad);

      const onResize = () => {
        if (!host) return;
        const w = host.clientWidth, h = host.clientHeight;
        renderer.setSize(w, h);
        uniforms.u_res.value.set(w, h);
      };
      window.addEventListener('resize', onResize);

      let targetMouse = { x: 0.5, y: 0.55 };
      const onMouse = (e: MouseEvent) => {
        const r = host.getBoundingClientRect();
        targetMouse = {
          x: (e.clientX - r.left) / r.width,
          y: 1 - (e.clientY - r.top) / r.height,
        };
      };
      // Skip mouse parallax on coarse pointers.
      if (!coarse) window.addEventListener('mousemove', onMouse, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(
        ([e]) => { visible = e.isIntersecting; },
        { threshold: 0.01 }
      );
      io.observe(host);

      let raf = 0;
      const t0 = performance.now();
      const render = () => {
        raf = requestAnimationFrame(render);
        if (!visible || document.hidden) return;
        const now = performance.now();
        uniforms.u_time.value = (now - t0) / 1000;
        // ease the reveal in over ~1.1s
        uniforms.u_intro.value = Math.min((now - t0) / 1100, 1);
        uniforms.u_mouse.value.x += (targetMouse.x - uniforms.u_mouse.value.x) * 0.035;
        uniforms.u_mouse.value.y += (targetMouse.y - uniforms.u_mouse.value.y) * 0.035;
        renderer.render(scene, camera);
      };
      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mousemove', onMouse);
        io.disconnect();
        quad.geometry.dispose();
        material.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode)
          renderer.domElement.parentNode.removeChild(renderer.domElement);
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
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
