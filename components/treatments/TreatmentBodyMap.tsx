'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BODY_PARTS,
  BODY_VIEWBOX,
  zonesFor,
  type BodyZone,
} from './body-zones';

/**
 * TreatmentBodyMap — a premium, two-panel visualisation of WHERE a
 * body-contouring treatment works best.
 *
 * ── Why this layout (no crossing leader lines) ─────────────────────────────
 *  The previous version scattered labels around the figure with elbow
 *  connectors that crossed over the label text. This version eliminates that
 *  problem at the root: there are NO floating labels and NO connectors on the
 *  body. Instead it is a TWO-PANEL composition:
 *    • LEFT  — eyebrow, heading, intro, and a tidy VERTICAL LIST of the
 *      treatment's target zones. Each row is a real <button> carrying a small
 *      NUMBER badge and the zone name.
 *    • RIGHT — a refined line-art figure. Each zone is a soft, numbered PIN
 *      sitting on the body; the pin's number matches its row number in the
 *      list. That numeric pairing is what links list ↔ body, so nothing ever
 *      crosses text. Hover/focus a row to emphasise its pin (and vice-versa).
 *
 * ── Visual approach ────────────────────────────────────────────────────────
 *  • The figure is an elegant, single-weight LINE drawing (not a lumpy filled
 *    blob): hairline sage strokes, the torso carrying only a barely-there
 *    vertical ground wash. It reads as an intentional editorial / medical
 *    illustration. This SVG layer is the real, crawlable, screen-reader content
 *    and the static fallback.
 *  • Pins are refined concentric markers (soft radial halo + crisp ring +
 *    centred index number). The animation/depth comes from a decorative,
 *    aria-hidden Three.js (raw `three`, no R3F) overlay: each zone is an
 *    additive radial sprite that gently breathes on its own phase plus a faint
 *    ring of drifting depth particles — a calm "energy on skin" glow.
 *
 * ── Robustness / performance ───────────────────────────────────────────────
 *  • WebGL is lazily initialised ONLY when the section scrolls into view, and
 *    the RAF loop pauses when offscreen or when the document is hidden.
 *  • devicePixelRatio capped at 2 (1.5 on coarse pointers). All geometries,
 *    materials, textures, the renderer and every listener are disposed on
 *    unmount.
 *  • prefers-reduced-motion OR no-WebGL → the Three.js layer is never created;
 *    the SVG figure with statically-marked numbered pins + the zone list is
 *    shown. Never an empty/broken canvas.
 *
 * ── Accessibility / SEO ────────────────────────────────────────────────────
 *  • The Three.js canvas is `aria-hidden` / decorative.
 *  • The heading, intro and a real, labelled list of every target zone NAME
 *    live in the SSR DOM, so the zones are crawlable + announced.
 *  • Zone rows are real <button>s — keyboard focusable, with visible focus and
 *    `aria-pressed`, AA-contrast labels.
 */

export interface TreatmentBodyMapProps {
  /** One of the serviceIds in lib/services.ts. */
  serviceId: string;
  /** Treatment display name, woven into the default heading. */
  treatmentName?: string;
  /** Override the small eyebrow line. */
  eyebrow?: string;
  /** Override the Trajan heading (defaults to "Where {treatment} Works Best"). */
  heading?: string;
  /** Override the short intro paragraph. */
  intro?: string;
  className?: string;
}

/* ── Brand palette (locked) ───────────────────────────────────────────────── */
const FOREST = '#024C27';
const DEEP_SAGE = '#3c5a40';
const SAGE = '#4f7256';
const SAGE_TEXT = '#4f7256';
const TAUPE_BODY = '#6f6456';
const BRIGHT_SAGE = '#8EB093'; // decorative only
const HEADING_FONT = 'Trajan Pro, serif';
const WIDE_FONT = '"Novecento Wide Book", "Novecento Wide", sans-serif';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const c = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export default function TreatmentBodyMap({
  serviceId,
  treatmentName,
  eyebrow = 'Targeted by design',
  heading,
  intro,
  className = '',
}: TreatmentBodyMapProps) {
  const zones = useMemo(() => zonesFor(serviceId), [serviceId]);

  const displayName = treatmentName?.trim() || 'this treatment';
  const resolvedHeading =
    heading?.trim() ||
    (treatmentName
      ? `Where ${displayName} Works Best`
      : 'Where This Treatment Works Best');
  const resolvedIntro =
    intro?.trim() ||
    'Every body holds stubbornness in its own places. These are the areas where this treatment is designed to do its quiet, focused work.';

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  // Live ref so the RAF loop reads the latest active zone without re-init.
  const activeRef = useRef<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  // Whether the decorative WebGL layer is running (false → SVG pins carry).
  const [glowReady, setGlowReady] = useState(false);

  /* ── Three.js decorative glow layer ──────────────────────────────────────
     Lazy-init on first intersection; full teardown on unmount. */
  useEffect(() => {
    const host = canvasHostRef.current;
    const section = sectionRef.current;
    if (!host || !section) return;
    if (prefersReducedMotion() || !hasWebGL()) return;

    let disposed = false;
    let started = false;
    let cleanup = () => {};

    const start = () => {
      if (started || disposed) return;
      started = true;

      (async () => {
        const THREE = await import('three');
        if (disposed || !host) return;

        const coarse =
          window.matchMedia('(pointer: coarse)').matches ||
          window.innerWidth < 760;

        let renderer: import('three').WebGLRenderer;
        try {
          renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: false,
            powerPreference: 'low-power',
          });
        } catch {
          return; // SVG pins remain visible
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.5 : 2));

        const sizeOf = () => {
          const r = host.getBoundingClientRect();
          return {
            w: Math.max(1, Math.round(r.width)),
            h: Math.max(1, Math.round(r.height)),
          };
        };
        let { w, h } = sizeOf();
        renderer.setSize(w, h, false);
        const el = renderer.domElement;
        el.style.width = '100%';
        el.style.height = '100%';
        el.style.display = 'block';
        host.appendChild(el);

        // Orthographic camera in normalised body space: x,y ∈ [0,1], y up.
        const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -10, 10);
        const scene = new THREE.Scene();

        // Soft radial-gradient sprite texture (reused by all glows).
        const tex = makeGlowTexture(THREE);

        type Glow = {
          group: import('three').Group;
          core: import('three').Sprite;
          coreMat: import('three').SpriteMaterial;
          halo: import('three').Sprite;
          haloMat: import('three').SpriteMaterial;
          particles: import('three').Points;
          pGeo: import('three').BufferGeometry;
          pMat: import('three').PointsMaterial;
          seeds: Float32Array; // angle, radius, speed, phase per particle
          zone: BodyZone;
          phase: number;
          emphasis: number; // eased 0..1
        };

        const PARTICLES = coarse ? 10 : 16;
        const sage = new THREE.Color('#8EB093'); // decorative glow only
        const deep = new THREE.Color('#4f7256');

        const glows: Glow[] = zones.map((zone, i) => {
          const group = new THREE.Group();
          // Body space → camera space: x same; y flipped (svg y-down → cam y-up).
          group.position.set(zone.x, 1 - zone.y, 0);

          const haloMat = new THREE.SpriteMaterial({
            map: tex,
            color: sage,
            transparent: true,
            opacity: 0.0,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const halo = new THREE.Sprite(haloMat);
          const haloScale = zone.r * 4.0;
          halo.scale.set(haloScale, haloScale, 1);

          const coreMat = new THREE.SpriteMaterial({
            map: tex,
            color: deep,
            transparent: true,
            opacity: 0.0,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const core = new THREE.Sprite(coreMat);
          const coreScale = zone.r * 2.1;
          core.scale.set(coreScale, coreScale, 1);

          // Drifting depth particles orbiting the zone.
          const positions = new Float32Array(PARTICLES * 3);
          const seeds = new Float32Array(PARTICLES * 4);
          for (let p = 0; p < PARTICLES; p++) {
            seeds[p * 4 + 0] = Math.random() * Math.PI * 2; // angle
            seeds[p * 4 + 1] = 0.35 + Math.random() * 0.9; // radius factor
            seeds[p * 4 + 2] = 0.25 + Math.random() * 0.6; // speed
            seeds[p * 4 + 3] = Math.random() * Math.PI * 2; // twinkle phase
          }
          const pGeo = new THREE.BufferGeometry();
          pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
          const pMat = new THREE.PointsMaterial({
            map: tex,
            color: sage,
            size: zone.r * 0.55,
            sizeAttenuation: true,
            transparent: true,
            opacity: 0.0,
            depthTest: false,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          });
          const particles = new THREE.Points(pGeo, pMat);

          group.add(halo, core, particles);
          scene.add(group);

          return {
            group,
            core,
            coreMat,
            halo,
            haloMat,
            particles,
            pGeo,
            pMat,
            seeds,
            zone,
            phase: (i / Math.max(1, zones.length)) * Math.PI * 2,
            emphasis: 0,
          };
        });

        const onResize = () => {
          const s = sizeOf();
          w = s.w;
          h = s.h;
          renderer.setSize(w, h, false);
        };
        const ro = new ResizeObserver(onResize);
        ro.observe(host);

        let visible = true;
        const visIo = new IntersectionObserver(
          ([e]) => {
            visible = e.isIntersecting;
          },
          { threshold: 0.01 }
        );
        visIo.observe(host);

        setGlowReady(true);

        let raf = 0;
        const t0 = performance.now();
        const render = () => {
          raf = requestAnimationFrame(render);
          if (!visible || document.hidden) return;
          const time = (performance.now() - t0) / 1000;
          const act = activeRef.current;

          for (const g of glows) {
            const isActive = act === g.zone.key;
            const targetEmph = isActive ? 1 : 0;
            g.emphasis += (targetEmph - g.emphasis) * 0.12;

            // Gentle breathing pulse, each zone on its own phase.
            const pulse = 0.5 + 0.5 * Math.sin(time * 1.1 + g.phase);
            const base = 0.16 + 0.12 * pulse;
            const lift = g.emphasis * 0.5;

            g.haloMat.opacity = base + lift;
            g.coreMat.opacity = 0.28 + 0.18 * pulse + g.emphasis * 0.45;

            const breathe = 1 + 0.07 * pulse + g.emphasis * 0.16;
            const hs = g.zone.r * 4.0 * breathe;
            g.halo.scale.set(hs, hs, 1);
            const cs = g.zone.r * 2.1 * (1 + g.emphasis * 0.12);
            g.core.scale.set(cs, cs, 1);

            // Orbiting particles.
            const pos = g.pGeo.getAttribute('position') as import('three').BufferAttribute;
            const arr = pos.array as Float32Array;
            const rad = g.zone.r * (1.25 + g.emphasis * 0.35);
            for (let p = 0; p < g.seeds.length / 4; p++) {
              const a0 = g.seeds[p * 4 + 0];
              const rf = g.seeds[p * 4 + 1];
              const sp = g.seeds[p * 4 + 2];
              const ang = a0 + time * sp * (0.5 + g.emphasis * 0.5);
              const rr = rad * rf;
              arr[p * 3 + 0] = Math.cos(ang) * rr;
              arr[p * 3 + 1] = Math.sin(ang) * rr * 1.15;
              arr[p * 3 + 2] = 0;
            }
            pos.needsUpdate = true;
            g.pMat.opacity = 0.12 + 0.1 * pulse + g.emphasis * 0.3;
            g.pMat.size = g.zone.r * (0.5 + 0.15 * pulse);
          }

          renderer.render(scene, camera);
        };
        render();

        cleanup = () => {
          cancelAnimationFrame(raf);
          ro.disconnect();
          visIo.disconnect();
          for (const g of glows) {
            scene.remove(g.group);
            g.coreMat.dispose();
            g.haloMat.dispose();
            g.pMat.dispose();
            g.pGeo.dispose();
          }
          tex.dispose();
          renderer.dispose();
          if (el.parentNode) el.parentNode.removeChild(el);
        };
      })();
    };

    const startIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          start();
          startIo.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    startIo.observe(section);

    return () => {
      disposed = true;
      startIo.disconnect();
      cleanup();
    };
    // Re-init if the treatment (and therefore its zones) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceId]);

  const VB = 1000; // viewBox units

  const setOn = (key: string) => setActive(key);
  const clearOn = (key: string) =>
    setActive((a) => (a === key ? null : a));

  return (
    <section
      ref={sectionRef}
      className={`tbm ${className}`}
      aria-labelledby="tbm-heading"
    >
      <style>{CSS}</style>
      <div className="tbm__inner">
        {/* ── Left panel: copy + interactive zone list ─────────────────── */}
        <div className="tbm__copy">
          <p className="tbm__eyebrow">{eyebrow}</p>
          <h2 id="tbm-heading" className="tbm__heading">
            {resolvedHeading}
          </h2>
          <span className="tbm__rule" aria-hidden />
          <p className="tbm__intro">{resolvedIntro}</p>

          {/* Real, crawlable, screen-reader list of every target zone. Each row
              is a keyboard-focusable control whose NUMBER matches the pin on the
              body — replacing the old leader-line labels entirely. */}
          <ol className="tbm__zonelist" aria-label="Target areas for this treatment">
            {zones.map((z, i) => {
              const isOn = active === z.key;
              return (
                <li key={z.key}>
                  <button
                    type="button"
                    className={`tbm__row${isOn ? ' is-active' : ''}`}
                    aria-pressed={isOn}
                    onMouseEnter={() => setOn(z.key)}
                    onMouseLeave={() => clearOn(z.key)}
                    onFocus={() => setOn(z.key)}
                    onBlur={() => clearOn(z.key)}
                  >
                    <span className="tbm__rowNum" aria-hidden>
                      {i + 1}
                    </span>
                    <span className="tbm__rowText">{z.label}</span>
                    <span className="tbm__rowTick" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ── Right panel: line-art figure + numbered pins ──────────────── */}
        <div className="tbm__stage">
          <div className="tbm__bodyWrap">
            <svg
              className="tbm__svg"
              viewBox={BODY_VIEWBOX}
              role="img"
              aria-label={`Figure showing the areas this treatment targets: ${zones
                .map((z) => z.label)
                .join(', ')}.`}
            >
              <defs>
                {/* Barely-there vertical ground for the torso core only. */}
                <linearGradient id="tbm-core" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#efe7d7" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#d9e2d6" stopOpacity="0.42" />
                </linearGradient>
                {/* Refined pin halo — sage glow that falls off cleanly. */}
                <radialGradient id="tbm-pin" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={BRIGHT_SAGE} stopOpacity="0.5" />
                  <stop offset="45%" stopColor={SAGE} stopOpacity="0.22" />
                  <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
                </radialGradient>
                {/* Soft drop for the whole figure — gives quiet depth. */}
                <filter id="tbm-soft" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="6"
                    stdDeviation="10"
                    floodColor={DEEP_SAGE}
                    floodOpacity="0.1"
                  />
                </filter>
              </defs>

              {/* Refined line-art figure. The torso core carries a faint ground
                  wash; every part is a clean single-weight outline stroke. */}
              <g className="tbm__body" filter="url(#tbm-soft)">
                {BODY_PARTS.map((part) => (
                  <path
                    key={part.id}
                    d={part.d}
                    fill={part.core ? 'url(#tbm-core)' : 'none'}
                    stroke={DEEP_SAGE}
                    strokeOpacity={0.5}
                    strokeWidth={2.25}
                    strokeLinejoin="round"
                  />
                ))}
              </g>
              {/* faint centre line for editorial structure */}
              <line
                x1={500}
                y1={236}
                x2={500}
                y2={694}
                stroke={DEEP_SAGE}
                strokeOpacity={0.08}
                strokeWidth={1}
              />

              {/* Numbered pins — the visible mark in the reduced-motion /
                  no-WebGL fallback, and a calm under-layer when the glow runs.
                  A soft halo + a crisp ring + a centred index number reads as a
                  precise clinical "target". The number ties back to the list. */}
              {zones.map((z, i) => {
                const cx = z.x * VB;
                const cy = z.y * VB;
                const rr = z.r * VB;
                const isOn = active === z.key;
                return (
                  <g
                    key={z.key}
                    className={isOn ? 'tbm__pin is-on' : 'tbm__pin'}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rr * (glowReady ? 1.0 : 1.3)}
                      fill="url(#tbm-pin)"
                      style={{ opacity: glowReady ? 0.6 : 1 }}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rr * 0.66}
                      fill="#ffffff"
                      fillOpacity={isOn ? 0.95 : 0.82}
                      stroke={isOn ? FOREST : SAGE}
                      strokeOpacity={isOn ? 0.95 : 0.6}
                      strokeWidth={isOn ? 3 : 2}
                    />
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="tbm__pinNum"
                      fill={isOn ? FOREST : SAGE_TEXT}
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Decorative WebGL glow overlay — aligned to the SVG box. */}
            <div ref={canvasHostRef} className="tbm__canvas" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Reusable soft radial glow texture (canvas → THREE.Texture) ───────────── */
function makeGlowTexture(THREE: typeof import('three')) {
  const size = 128;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const ctx = cv.getContext('2d')!;
  const grd = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.65)');
  grd.addColorStop(0.6, 'rgba(255,255,255,0.18)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

/* ── Scoped styles ─────────────────────────────────────────────────────────
   All class names are `tbm`-prefixed so nothing leaks. */
const CSS = `
.tbm{
  --tbm-forest:${FOREST};
  --tbm-sage:${SAGE};
  --tbm-taupe:${TAUPE_BODY};
  width:100%;
  padding:clamp(48px,8vw,96px) 20px;
}
.tbm__inner{
  max-width:1180px;margin:0 auto;
  display:grid;grid-template-columns:1fr;gap:clamp(28px,5vw,64px);
  align-items:center;
}
@media (min-width:880px){
  .tbm__inner{grid-template-columns:0.95fr 1.05fr;}
}
.tbm__copy{max-width:540px;}
.tbm__eyebrow{
  font-family:${WIDE_FONT};
  text-transform:uppercase;letter-spacing:3px;font-size:12px;
  color:${SAGE_TEXT};margin:0 0 14px;
}
.tbm__heading{
  font-family:${HEADING_FONT};font-weight:400;text-transform:uppercase;
  color:${FOREST};letter-spacing:1.5px;line-height:1.16;
  font-size:clamp(26px,4.6vw,42px);margin:0;text-wrap:balance;
}
.tbm__rule{display:block;width:84px;height:2px;background:${BRIGHT_SAGE};margin:20px 0;}
.tbm__intro{
  font-family:Roboto,system-ui,sans-serif;color:${TAUPE_BODY};
  font-size:clamp(15px,1.6vw,17px);line-height:1.7;margin:0 0 28px;max-width:46ch;
}

/* Vertical list of zone rows — replaces the old floating labels. */
.tbm__zonelist{
  list-style:none;margin:0;padding:0;
  display:flex;flex-direction:column;gap:8px;
}
.tbm__row{
  --rowbg:rgba(143,176,147,0.08);
  display:flex;align-items:center;gap:14px;width:100%;
  text-align:left;cursor:pointer;
  background:var(--rowbg);
  border:1px solid rgba(79,114,86,0.22);
  border-radius:14px;padding:11px 14px;
  transition:background .25s ease,border-color .25s ease,transform .25s ease,box-shadow .25s ease;
}
.tbm__row:hover,.tbm__row.is-active{
  --rowbg:rgba(2,76,39,0.06);
  border-color:${SAGE};transform:translateX(3px);
  box-shadow:0 6px 18px rgba(2,76,39,0.08);
}
.tbm__row:focus-visible{
  outline:2px solid ${FOREST};outline-offset:2px;
}
.tbm__rowNum{
  flex:none;display:inline-flex;align-items:center;justify-content:center;
  width:30px;height:30px;border-radius:50%;
  font-family:${WIDE_FONT};font-size:13px;font-weight:600;
  color:${SAGE_TEXT};
  background:#fff;border:1.5px solid rgba(79,114,86,0.45);
  transition:color .25s ease,background .25s ease,border-color .25s ease;
}
.tbm__row:hover .tbm__rowNum,.tbm__row.is-active .tbm__rowNum{
  color:#fff;background:${FOREST};border-color:${FOREST};
}
.tbm__rowText{
  flex:1 1 auto;
  font-family:${WIDE_FONT};text-transform:uppercase;letter-spacing:1.4px;
  font-size:13px;color:${SAGE_TEXT};
  transition:color .25s ease;
}
.tbm__row:hover .tbm__rowText,.tbm__row.is-active .tbm__rowText{color:${FOREST};}
.tbm__rowTick{
  flex:none;width:8px;height:8px;border-radius:50%;
  background:${BRIGHT_SAGE};opacity:0;transform:scale(0.6);
  transition:opacity .25s ease,transform .25s ease;
}
.tbm__row:hover .tbm__rowTick,.tbm__row.is-active .tbm__rowTick{
  opacity:1;transform:scale(1);background:${FOREST};
}

.tbm__stage{display:flex;justify-content:center;}
.tbm__bodyWrap{
  position:relative;width:100%;max-width:480px;aspect-ratio:1/1;
}
.tbm__svg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;}
.tbm__canvas{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;}
.tbm__body path{transition:stroke-opacity .4s ease;}
.tbm__pinNum{
  font-family:${WIDE_FONT};font-weight:600;font-size:34px;
  transition:fill .25s ease;
  pointer-events:none;
}
.tbm__pin circle{transition:opacity .3s ease,fill-opacity .3s ease,stroke-opacity .3s ease,stroke-width .3s ease;}

@media (prefers-reduced-motion: reduce){
  .tbm__row{transition:none;}
  .tbm__row:hover,.tbm__row.is-active{transform:none;}
}
`;
