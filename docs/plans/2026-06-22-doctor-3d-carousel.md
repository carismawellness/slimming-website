# Doctor 3D Carousel — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the long-scroll stacked doctor profiles in `BrandBlock` with a code-split, lazy-mounted Three.js **coverflow carousel** + an accessible HTML info panel, with a graceful non-WebGL fallback.

**Architecture:** Data lives in `lib/doctors.ts`. `DoctorShowcase` (client) owns active-index state, the HTML panel, controls, and lazy-loads the WebGL scene only when in view (IntersectionObserver + `next/dynamic ssr:false`). `DoctorCarousel3D` renders 3 textured planes in coverflow and reports active changes. If WebGL is unavailable or `prefers-reduced-motion`, a flat CSS fallback carousel renders instead. All doctor text stays in the DOM (crisp, SEO, a11y); the canvas is `aria-hidden`.

**Tech Stack:** Next.js 16 (App Router, React 19), TypeScript, `three@0.184` (already installed), Tailwind v4. No new deps.

**Verification model (visual work — no unit tests):** every task ends with `npm run build` (compile + typecheck green) and, where noted, a browser check at 390×844 and 1280×800. Commit after each green task (auto-deploys to the live site — keep builds green).

**Collision note:** A parallel session edits these pages. Before editing `BrandBlock.tsx`, run `git status -s components/BrandBlock.tsx`; if dirty, re-read it first. New files (lib/doctors.ts, components/doctors/*) are collision-free.

---

## Task 1: Doctor data module

**Files:** Create `lib/doctors.ts`

**Step 1:** Create the data (full bios copied verbatim from the current `BrandBlock` DOCTORS array — do not shorten `fullBio`; the `highlight` is the new distilled 2–3 line version):

```ts
export type Doctor = {
  name: string;
  role: string;
  years: string;
  highlight: string;   // 2-3 line distilled summary (shown by default)
  fullBio: string;     // full text (revealed via "Read more")
  image: string;       // portrait in /public
};

export const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Zaid Teebi',
    role: 'Medical Consultant',
    years: '30+ years',
    highlight:
      'Leads our medical weight-loss programme. 30+ years in general medicine and geriatrics, with sports-medicine training (ACSM) and pain-management study at Harvard.',
    fullBio:
      'Dr Zaid Teebi is the medical consultant leading our weight loss and slimming programs, with over 30+ years of clinical experience. He holds credentials in general medicine, geriatrics, and specialised allergy training, allowing him to combine broad clinical insight with focused care. He also holds a certificate in Sports Medicine from the American College of Sports Medicine and completed training in Pain Management at Harvard Medical School (USA) and Allergy and allergy therapy at the Imperial College London (UK). Dr Teebi personally conducts detailed medical weight loss consultations and prescribes personalised meal plans: a comprehensive medical and allergy history, symptom chronology, family history, environmental and occupational factors, followed by a full clinical examination before recommending targeted diagnostic tests and therapy.',
    image: '/wix/87fc13_523cfb315801437881171694d92d8d4f~mv2.png',
  },
  {
    name: 'Dr. Giovanni Scornavacca',
    role: 'Aesthetic Doctor',
    years: '20+ years',
    highlight:
      'Italian aesthetic doctor, 20+ years across Rome and Bologna. Specialises in regenerative medicine (PRP, skin boosters) — restoration, not change; subtle and natural.',
    fullBio:
      'Dr. Giovanni is an Italian aesthetic doctor at Carisma Aesthetics, trained and practised for 20+ years in Italy with continued advanced education across leading universities in Rome, Bologna and other centres. He specialises in aesthetic medicine with a particular interest in regenerative approaches such as PRP, stem cells, pairing medical rigour with a calm, human manner. His philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin, then shaping a conservative, precisely paced plan that prioritises safety, clarity and natural balance. From softening expression lines and refining contour to improving tone, texture and early laxity, his results are subtle and harmonious—refreshed, never overdone. At our St Julian\'s clinic, Dr. Giovanni offers evidence-based treatments including dermal fillers, collagen stimulators, skin boosters, microneedling with mesotherapy, PRP and medical-grade laser therapies, guiding you thoughtfully through each step so you can glow with confidence.',
    image: '/wix/87fc13_e903680b4d124adda85e7ade5dfd676b~mv2.png',
  },
  {
    name: 'Dr. Francesca Chircop',
    role: 'Medical Aesthetics',
    years: '8+ years',
    highlight:
      'London-trained aesthetic doctor with an orthopaedic-surgery foundation. Leads our Lip Flip and medical-grade laser care — precise, conservative, authentically you.',
    fullBio:
      'Dr. Francesca is a London-trained aesthetic doctor with 8+ years in medical aesthetics and a foundation in orthopaedic surgery, bringing precise anatomical insight to subtle, balanced results. Her philosophy is restoration, not change: every consultation begins with listening to your story and how you want to feel in your skin before shaping a conservative, personalised plan that prioritises safety, clarity, and natural harmony. She leads our Lip Flip enhancements and oversees the majority of our medical-grade laser hair removal care, pairing meticulous technique with advanced protocols for smooth, long-term results. Across anti-wrinkle injections, dermal fillers, skin boosters, PRP/regenerative techniques, microneedling with mesotherapy, and medical-grade lasers, she guides you thoughtfully through each step so the outcome feels authentically you—refreshed, never overdone.',
    image: '/wix/87fc13_26127e01d9fb4ec48fb0b2f7ccb73508~mv2.png',
  },
];
```

**Step 2:** `npm run build` → green. **Commit:** `feat(doctors): doctor data module (highlight + full bio)`

---

## Task 2: Three.js coverflow scene

**Files:** Create `components/doctors/DoctorCarousel3D.tsx`

Client component, default export, dynamically imported by the wrapper (so `three` is code-split). Renders 3 textured planes in coverflow; lerps toward `activeIndex`; pointer-drag changes active; disposes on unmount.

```tsx
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type Props = {
  images: string[];
  activeIndex: number;
  onActiveChange: (i: number) => void;
  reducedMotion?: boolean;
};

const SPACING = 2.15;   // x gap between cards
const DEPTH = 1.6;      // z push-back for side cards
const ANGLE = 0.5;      // y-rotation (rad) for side cards
const SIDE_SCALE = 0.78;

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

    // Build cards (portrait planes 1 : 1.25).
    const loader = new THREE.TextureLoader();
    const cards = images.map((src) => {
      const tex = loader.load(src);
      tex.colorSpace = THREE.SRGBColorSpace;
      const geo = new THREE.PlaneGeometry(2, 2.5);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      return { mesh, geo, mat, tex, cur: { x: 0, z: 0, ry: 0, s: 1, o: 1 } };
    });

    const setTargets = () => {
      const active = activeRef.current;
      cards.forEach((c, i) => {
        const off = i - active;
        const t = {
          x: off * SPACING,
          z: -Math.abs(off) * DEPTH,
          ry: -off * ANGLE,
          s: off === 0 ? 1 : SIDE_SCALE,
          o: off === 0 ? 1 : 0.55,
        };
        if (reducedMotion) Object.assign(c.cur, t); // snap
        (c as any).target = t;
      });
    };
    setTargets();

    let raf = 0;
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const tick = () => {
      cards.forEach((c) => {
        const t = (c as any).target;
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

    // Pointer drag → change active.
    let downX: number | null = null;
    const onDown = (e: PointerEvent) => { downX = e.clientX; };
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

    // React to activeIndex / reducedMotion changes.
    (mount as any).__setTargets = setTargets;

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cards.forEach((c) => { c.geo.dispose(); c.mat.dispose(); c.tex.dispose(); });
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }, [images, reducedMotion]);

  // Re-run target calc when activeIndex changes (without re-creating the scene).
  useEffect(() => {
    (mountRef.current as any)?.__setTargets?.();
  }, [activeIndex]);

  return <div ref={mountRef} aria-hidden="true" style={{ width: '100%', height: '100%', minHeight: 360, cursor: 'grab' }} />;
}
```

**Step 2:** `npm run build` → green. **Commit:** `feat(doctors): three.js coverflow scene`

---

## Task 3: Showcase wrapper (panel + controls + lazy-mount + fallback)

**Files:** Create `components/doctors/DoctorShowcase.tsx`

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { DOCTORS } from '@/lib/doctors';
import BookConsultationButton from '@/components/BookConsultationButton';

const Carousel3D = dynamic(() => import('./DoctorCarousel3D'), { ssr: false });

const GREEN = '#4f7256';
const TAUPE = '#6f6456';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
}

export default function DoctorShowcase() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [inView, setInView] = useState(false);
  const [use3D, setUse3D] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduced(rm);
    setUse3D(hasWebGL());
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => { setExpanded(false); }, [active]);

  const go = (i: number) => setActive(Math.min(DOCTORS.length - 1, Math.max(0, i)));
  const d = DOCTORS[active];

  return (
    <section ref={rootRef} aria-labelledby="doctors-heading" style={{ background: '#fff', padding: 'clamp(48px,8vw,88px) 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center" style={{ color: TAUPE, fontFamily: '"Novecento Wide Book", sans-serif', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>The team behind your results</p>
        <h2 id="doctors-heading" className="text-center" style={{ color: GREEN, fontFamily: '"Trajan Pro", serif', fontWeight: 400, fontSize: 'clamp(26px,4vw,40px)', textTransform: 'uppercase', margin: '6px 0 36px' }}>Meet Your Doctors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Visual */}
          <div style={{ position: 'relative', minHeight: 360 }}>
            {inView && use3D ? (
              <Carousel3D images={DOCTORS.map((x) => x.image)} activeIndex={active} onActiveChange={go} reducedMotion={reduced} />
            ) : (
              // Fallback: flat active portrait
              // eslint-disable-next-line @next/next/no-img-element
              <img src={d.image} alt={d.name} style={{ width: '100%', maxWidth: 420, margin: '0 auto', display: 'block', borderRadius: 'var(--r-card,16px)' }} />
            )}
          </div>

          {/* Panel */}
          <div aria-live="polite">
            <h3 style={{ color: GREEN, fontFamily: '"Trajan Pro", serif', fontWeight: 400, fontSize: 'clamp(22px,3vw,30px)', textTransform: 'uppercase' }}>{d.name}</h3>
            <p style={{ color: TAUPE, fontFamily: '"Novecento Wide Book", sans-serif', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', margin: '6px 0 14px' }}>{d.role} · {d.years}</p>
            <p style={{ color: TAUPE, fontFamily: 'Roboto, sans-serif', fontSize: 15, lineHeight: 1.6 }}>{expanded ? d.fullBio : d.highlight}</p>
            <button type="button" onClick={() => setExpanded((v) => !v)} style={{ background: 'none', border: 'none', color: GREEN, fontFamily: 'Roboto, sans-serif', fontSize: 13, textDecoration: 'underline', textUnderlineOffset: 2, cursor: 'pointer', marginTop: 8, padding: 0 }}>
              {expanded ? 'Read less' : 'Read more'}
            </button>
            <div style={{ marginTop: 22 }}>
              <BookConsultationButton variant="filled">Book Your Free Body Analysis</BookConsultationButton>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4" style={{ marginTop: 28 }}>
          <button type="button" aria-label="Previous doctor" onClick={() => go(active - 1)} disabled={active === 0} style={ctrlStyle(active === 0)}>‹</button>
          <div role="tablist" aria-label="Choose a doctor" className="flex items-center gap-2">
            {DOCTORS.map((doc, i) => (
              <button key={doc.name} role="tab" aria-selected={i === active} aria-label={doc.name} onClick={() => go(i)}
                style={{ width: i === active ? 26 : 10, height: 10, borderRadius: 999, border: 'none', cursor: 'pointer', background: i === active ? GREEN : 'rgba(79,114,86,0.3)', transition: 'all .3s ease' }} />
            ))}
          </div>
          <button type="button" aria-label="Next doctor" onClick={() => go(active + 1)} disabled={active === DOCTORS.length - 1} style={ctrlStyle(active === DOCTORS.length - 1)}>›</button>
        </div>
      </div>
    </section>
  );
}

function ctrlStyle(disabled: boolean): React.CSSProperties {
  return { width: 44, height: 44, borderRadius: 999, border: `1px solid ${GREEN}`, background: '#fff', color: GREEN, fontSize: 22, lineHeight: 1, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.35 : 1 };
}
```

**Step 2:** `npm run build` → green. **Commit:** `feat(doctors): showcase wrapper with panel, controls, lazy-mount + fallback`

---

## Task 4: Swap into BrandBlock

**Files:** Modify `components/BrandBlock.tsx`

**Step 1:** `git status -s components/BrandBlock.tsx` — if dirty, re-read before editing.
**Step 2:** Add `import DoctorShowcase from '@/components/doctors/DoctorShowcase';`. Replace the stacked doctor `<section>` (the "Doctor Profiles — stacked 2-column rows" block) with `<DoctorShowcase />`. Remove the now-unused inline `DOCTORS` array if nothing else in the file uses it (leave other BrandBlock content — awards, brand cards — intact).
**Step 3:** `npm run build` → green.
**Step 4:** Browser check (dev or prod server) at 1280×800 and 390×844: section shows one doctor at a time; dots/arrows switch; "Read more" expands; CTA opens the modal; on mobile the canvas sits above the panel; no horizontal overflow. Simulate fallback by forcing `use3D=false` (or test where WebGL is off) → flat portrait + same controls work.
**Step 5:** **Commit:** `feat(doctors): replace stacked profiles with 3D carousel showcase`

---

## Task 5: QC pass

- `npm run build` final green.
- Confirm `three` is NOT in the initial/shared chunk (it's dynamically imported) — the section's WebGL only loads on view.
- Reduced-motion: snaps instead of animating; no auto-spin.
- A11y: canvas `aria-hidden`; tablist + prev/next are real buttons with labels; names update via `aria-live`. Contrast on AA tokens.
- Drag/swipe changes the active doctor on desktop + touch.
- Commit any fixes: `chore(doctors): QC carousel + fallback`.
