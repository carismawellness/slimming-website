'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BODY_PARTS,
  BODY_VIEWBOX,
  zonesFor,
  type BodyZone,
} from './body-zones';

/**
 * TreatmentBodyMap — an award-winning, premium visualisation of WHERE a
 * body-contouring treatment works best, shown on a front-facing human body and
 * animated with Three.js.
 *
 * ── Visual approach ────────────────────────────────────────────────────────
 *  • A refined, well-proportioned front-facing female figure is drawn from a
 *    handful of clean, smooth, closed SVG sub-paths (head, neck, torso, two
 *    arms, two legs — see BODY_PARTS). Each part is filled with a soft vertical
 *    gradient ground and stroked with a hairline sage outline, so the figure
 *    reads as an intentional editorial illustration, not a lumpy blob. This SVG
 *    layer is the REAL, crawlable, screen-reader content and the static
 *    fallback.
 *  • The treatment's clinical target zones are drawn on the body as soft,
 *    refined concentric markers (a calm radial halo + a crisp dot ring), not
 *    fuzzy blobs. The animation/depth comes from a decorative, aria-hidden
 *    Three.js (raw `three`, no R3F) overlay: each zone is an additive radial
 *    sprite that gently breathes (pulse) on its own phase, plus a faint ring of
 *    drifting depth particles per zone — giving the calm, luxurious "energy on
 *    skin" feel without a heavy anatomical mesh.
 *  • Editorial labels with thin elbow connectors lean to the outer margins and
 *    are de-collided vertically per side so they never overlap. Hovering or
 *    focusing a zone emphasises it in both layers.
 *
 * ── Robustness / performance ───────────────────────────────────────────────
 *  • WebGL is lazily initialised ONLY when the section scrolls into view
 *    (IntersectionObserver), and the RAF loop pauses when offscreen or when the
 *    document is hidden.
 *  • devicePixelRatio capped at 2 (1.5 on coarse pointers). All geometries,
 *    materials, textures, the renderer and every listener are disposed on
 *    unmount.
 *  • prefers-reduced-motion OR no-WebGL → the Three.js layer is never created;
 *    the SVG body with statically-marked glowing zones + labels is shown. Never
 *    an empty/broken canvas.
 *
 * ── Accessibility / SEO ────────────────────────────────────────────────────
 *  • The Three.js canvas is `aria-hidden` / decorative.
 *  • The heading, intro, the SVG body and a real, labelled list of every target
 *    zone live in the SSR DOM (the list is visible on mobile and available to
 *    screen readers everywhere), so the zones are crawlable + announced.
 *  • Zone controls are real <button>s — keyboard focusable, with visible focus,
 *    AA-contrast labels.
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

  // Whether the decorative WebGL layer is running (false → SVG markers carry).
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
          return; // SVG markers remain visible
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
          // Keep body-space square-ish: aspect handled by host CSS (it matches
          // the SVG aspect), so the ortho box [0,1]² maps cleanly.
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
        const tmp = new THREE.Vector3();
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

          tmp.set(0, 0, 0); // (kept for potential future parallax)
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

  /* ── Geometry helpers for the SVG label layout ──────────────────────────── */
  const VB = 1000; // viewBox units
  const labeled = useMemo(() => layoutLabels(zones), [zones]);

  return (
    <section
      ref={sectionRef}
      className={`tbm ${className}`}
      aria-labelledby="tbm-heading"
    >
      <style>{CSS}</style>
      <div className="tbm__inner">
        {/* Copy column */}
        <div className="tbm__copy">
          <p className="tbm__eyebrow">{eyebrow}</p>
          <h2 id="tbm-heading" className="tbm__heading">
            {resolvedHeading}
          </h2>
          <span className="tbm__rule" aria-hidden />
          <p className="tbm__intro">{resolvedIntro}</p>

          {/* Real, crawlable, screen-reader list of every target zone. Doubles
              as keyboard-focusable controls that emphasise a zone on the body. */}
          <ul className="tbm__zonelist" aria-label="Target areas for this treatment">
            {zones.map((z) => (
              <li key={z.key}>
                <button
                  type="button"
                  className={`tbm__chip${active === z.key ? ' is-active' : ''}`}
                  aria-pressed={active === z.key}
                  onMouseEnter={() => setActive(z.key)}
                  onMouseLeave={() => setActive((a) => (a === z.key ? null : a))}
                  onFocus={() => setActive(z.key)}
                  onBlur={() => setActive((a) => (a === z.key ? null : a))}
                >
                  <span className="tbm__chipDot" aria-hidden />
                  {z.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Visualisation column: SVG body + label connectors (SSR/fallback) with
            the decorative Three.js glow canvas layered on top. */}
        <div className="tbm__stage">
          <div className="tbm__bodyWrap">
            <svg
              className="tbm__svg"
              viewBox={BODY_VIEWBOX}
              role="img"
              aria-label={`Human body outline showing the areas this treatment targets: ${zones
                .map((z) => z.label)
                .join(', ')}.`}
            >
              <defs>
                {/* Soft vertical ground for the figure body — warm taupe at the
                    top easing into a faint sage at the base. */}
                <linearGradient id="tbm-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#efe7d7" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#d9e2d6" stopOpacity="0.5" />
                </linearGradient>
                {/* Refined zone halo — sage glow that falls off cleanly. */}
                <radialGradient id="tbm-marker" cx="50%" cy="50%" r="50%">
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
                    floodOpacity="0.12"
                  />
                </filter>
              </defs>

              {/* Refined figure — each anatomical part is its own clean closed
                  path so it strokes precisely (no self-intersecting seams). */}
              <g className="tbm__body" filter="url(#tbm-soft)">
                {BODY_PARTS.map((part) => (
                  <path
                    key={part.id}
                    d={part.d}
                    fill="url(#tbm-body)"
                    stroke={DEEP_SAGE}
                    strokeOpacity={0.5}
                    strokeWidth={2}
                    strokeLinejoin="round"
                  />
                ))}
              </g>
              {/* faint centre line for editorial structure */}
              <line
                x1={500}
                y1={234}
                x2={500}
                y2={690}
                stroke={DEEP_SAGE}
                strokeOpacity={0.08}
                strokeWidth={1}
              />

              {/* Static zone markers — these are the visible mark in the
                  reduced-motion / no-WebGL fallback, and a calm under-layer when
                  the glow runs. A soft halo + a crisp hairline ring + a small
                  centre dot reads as a precise clinical "target", not a blob. */}
              {zones.map((z) => {
                const cx = z.x * VB;
                const cy = z.y * VB;
                const rr = z.r * VB;
                const isOn = active === z.key;
                return (
                  <g key={z.key} className={isOn ? 'tbm__mk is-on' : 'tbm__mk'}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rr * (glowReady ? 0.95 : 1.25)}
                      fill="url(#tbm-marker)"
                      style={{ opacity: glowReady ? 0.6 : 1 }}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rr * 0.62}
                      fill="none"
                      stroke={SAGE}
                      strokeOpacity={isOn ? 0.9 : 0.55}
                      strokeWidth={isOn ? 2.5 : 1.75}
                    />
                    <circle
                      cx={cx}
                      cy={cy}
                      r={rr * 0.2}
                      fill={isOn ? FOREST : SAGE}
                      fillOpacity={isOn ? 1 : 0.85}
                    />
                  </g>
                );
              })}

              {/* Connectors + labels — a tidy leader line:
                  marker → elbow (at the row height) → rail dot → uppercase text. */}
              {labeled.map((l) => {
                const isOn = active === l.zone.key;
                return (
                  <g
                    key={l.zone.key}
                    className={isOn ? 'tbm__lab is-on' : 'tbm__lab'}
                  >
                    <polyline
                      points={`${l.anchorX},${l.anchorY} ${l.elbowX},${l.labelY} ${l.labelX},${l.labelY}`}
                      fill="none"
                      stroke={SAGE}
                      strokeOpacity={isOn ? 0.85 : 0.38}
                      strokeWidth={isOn ? 2 : 1.25}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx={l.labelX}
                      cy={l.labelY}
                      r={isOn ? 4 : 3}
                      fill={isOn ? FOREST : SAGE}
                    />
                    <text
                      x={l.textX}
                      y={l.labelY}
                      textAnchor={l.anchor}
                      dominantBaseline="middle"
                      className="tbm__labtext"
                      fill={isOn ? FOREST : SAGE_TEXT}
                    >
                      {l.zone.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Decorative WebGL glow overlay — perfectly aligned to the SVG box. */}
            <div ref={canvasHostRef} className="tbm__canvas" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── SVG label layout ──────────────────────────────────────────────────────
   Push every label to the outer margins, then de-collide them vertically
   within each side so no two rows overlap — an editorial "leader line" layout.
   Returns absolute viewBox coordinates. */
type LabeledZone = {
  zone: BodyZone;
  anchorX: number; // marker x (where the connector starts)
  anchorY: number; // marker y
  elbowX: number; // where the connector bends to vertical/horizontal margin
  labelX: number; // dot on the margin rail
  labelY: number; // de-collided row y
  textX: number; // text start/end
  anchor: 'start' | 'end';
};

const VB_UNITS = 1000;
const LABEL_LEFT_X = 64;
const LABEL_RIGHT_X = 936;
const MIN_ROW_GAP = 64; // min vertical distance between two labels on a side
const ROW_MIN_Y = 150;
const ROW_MAX_Y = 950;

/** Spread an ascending list of desired y-positions so neighbours keep MIN_ROW_GAP. */
function declutter(values: number[]): number[] {
  const out = values.slice();
  // forward pass: push each down if too close to the previous
  for (let i = 1; i < out.length; i++) {
    if (out[i] - out[i - 1] < MIN_ROW_GAP) out[i] = out[i - 1] + MIN_ROW_GAP;
  }
  // clamp to the bottom, then back-pass upward so we stay inside the rail
  if (out.length) {
    out[out.length - 1] = Math.min(out[out.length - 1], ROW_MAX_Y);
    for (let i = out.length - 2; i >= 0; i--) {
      if (out[i + 1] - out[i] < MIN_ROW_GAP) out[i] = out[i + 1] - MIN_ROW_GAP;
    }
    out[0] = Math.max(out[0], ROW_MIN_Y);
  }
  return out;
}

function layoutLabels(zones: BodyZone[]): LabeledZone[] {
  // Resolve each zone to a hard side (L/R). Centre zones split by x, but if x
  // is dead-centre, alternate so they don't all stack on one rail.
  let centreToggle = 0;
  const enriched = zones.map((z) => {
    let side: 'L' | 'R';
    if (z.side === 'L') side = 'L';
    else if (z.side === 'R') side = 'R';
    else if (Math.abs(z.x - 0.5) < 0.001) side = centreToggle++ % 2 === 0 ? 'L' : 'R';
    else side = z.x <= 0.5 ? 'L' : 'R';
    return {
      zone: z,
      side,
      anchorX: z.x * VB_UNITS,
      anchorY: z.y * VB_UNITS,
    };
  });

  const result: LabeledZone[] = [];

  (['L', 'R'] as const).forEach((side) => {
    const rows = enriched
      .filter((e) => e.side === side)
      .sort((a, b) => a.anchorY - b.anchorY);
    const spread = declutter(rows.map((r) => r.anchorY));
    const leftish = side === 'L';
    const labelX = leftish ? LABEL_LEFT_X : LABEL_RIGHT_X;
    const textX = leftish ? LABEL_LEFT_X + 14 : LABEL_RIGHT_X - 14;
    rows.forEach((r, i) => {
      const labelY = spread[i];
      // Elbow: step horizontally away from the body, then the connector runs
      // to the rail dot. Keeps a tidy two-segment leader line.
      const elbowX = leftish ? labelX + 70 : labelX - 70;
      result.push({
        zone: r.zone,
        anchorX: r.anchorX,
        anchorY: r.anchorY,
        elbowX,
        labelX,
        labelY,
        textX,
        anchor: leftish ? 'start' : 'end',
      });
    });
  });

  return result;
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
  display:grid;grid-template-columns:1fr;gap:clamp(28px,5vw,56px);
  align-items:center;
}
@media (min-width:880px){
  .tbm__inner{grid-template-columns:0.92fr 1.08fr;}
}
.tbm__copy{max-width:520px;}
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
  font-size:clamp(15px,1.6vw,17px);line-height:1.7;margin:0 0 26px;max-width:46ch;
}
.tbm__zonelist{
  list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:10px;
}
.tbm__chip{
  display:inline-flex;align-items:center;gap:9px;
  font-family:${WIDE_FONT};text-transform:uppercase;letter-spacing:1px;
  font-size:12px;color:${SAGE_TEXT};
  background:rgba(143,176,147,0.12);
  border:1px solid rgba(79,114,86,0.35);
  border-radius:999px;padding:9px 15px;cursor:pointer;
  transition:background .25s ease,border-color .25s ease,color .25s ease,transform .25s ease;
}
.tbm__chip:hover,.tbm__chip.is-active{
  background:${SAGE};color:#fff;border-color:${SAGE};transform:translateY(-1px);
}
.tbm__chip:focus-visible{
  outline:2px solid ${FOREST};outline-offset:2px;
}
.tbm__chipDot{
  width:8px;height:8px;border-radius:50%;background:${BRIGHT_SAGE};
  box-shadow:0 0 0 3px rgba(143,176,147,0.25);flex:none;
}
.tbm__chip.is-active .tbm__chipDot,.tbm__chip:hover .tbm__chipDot{background:#fff;box-shadow:0 0 0 3px rgba(255,255,255,0.3);}

.tbm__stage{display:flex;justify-content:center;}
.tbm__bodyWrap{
  position:relative;width:100%;max-width:540px;aspect-ratio:1/1;
}
.tbm__svg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;}
.tbm__canvas{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;}
.tbm__body path{transition:stroke-opacity .4s ease;}
.tbm__labtext{
  font-family:${WIDE_FONT};text-transform:uppercase;letter-spacing:1.5px;
  font-size:19px;transition:fill .25s ease;
}
.tbm__lab .tbm__labtext{font-weight:500;}
.tbm__lab.is-on .tbm__labtext{font-weight:700;}
.tbm__mk circle{transition:opacity .3s ease,fill-opacity .3s ease,stroke-opacity .3s ease;}

@media (prefers-reduced-motion: reduce){
  .tbm__chip{transition:none;}
}
`;
