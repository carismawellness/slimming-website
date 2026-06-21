'use client';

/**
 * TreatmentsCarousel3D — luxurious 3D coverflow of the 6 slimming treatments.
 *
 * PROGRESSIVE ENHANCEMENT — two layers:
 *  1. DOM layer (always rendered, SEO + a11y): the active-card text panel with a
 *     real <Link>, plus a visually-hidden-but-focusable list of ALL 6 treatment
 *     links so every href + title + description is in the server-rendered HTML and
 *     reachable by keyboard / screen readers / no-JS users.
 *  2. WebGL layer (decorative, aria-hidden): a Three.js coverflow rendered only
 *     when (a) WebGL is available, (b) reduced-motion is NOT requested, and
 *     (c) the section has scrolled into view. If any of those fail we render the
 *     existing 2D <ModalitiesCarousel/> as the fallback — never an empty canvas.
 *
 * The section <h2> lives in app/page.tsx and is intentionally NOT duplicated here.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import ModalitiesCarousel from '@/components/ModalitiesCarousel';

// Treatment data — kept verbatim in sync with components/ModalitiesCarousel.tsx
const CARDS = [
  {
    title: 'Weight Loss',
    desc: "A doctor-led, all-in-one weight loss program that combines nutrition, movement, body contouring treatments and accountability to change your body and habits for good. Malta's most comprehensive slimming system.",
    href: '/weight-loss',
    alt: 'Weight Loss modality',
    src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    focal: '51% 22%',
  },
  {
    title: 'GLP-1 (Mounjaro & Ozempic)',
    desc: 'Prescription-only medical weight loss medication, used when medically appropriate, to calm appetite and support steady fat reduction alongside your personalised slimming plan.',
    href: '/glp1',
    alt: 'GLP-1 medical weight loss modality',
    src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
  },
  {
    title: 'Fat Reduction',
    desc: 'Targeted non surgical fat removal using CoolSculpting fat freezing (cryolipolysis) Medical guidance and a tailored caloric deficit for those last stubborn areas. FDA-cleared and performed at our Malta clinic.',
    href: '/packages/fat-freezing',
    alt: 'Fat Reduction modality',
    src: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
  },
  {
    title: 'Muscle Stimulation',
    desc: 'High-intensity electromagnetic body sculpting sessions with EMSculpt NEO that contract your muscles thousands of times to build strength, reduce fat and help shape your silhouette, without surgery or downtime.',
    href: '/packages/muscle-stimulation',
    alt: 'Muscle Stimulation modality',
    src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
  },
  {
    title: 'Skin Tightening',
    desc: 'Non-invasive skin tightening with VelaShape III that combines radiofrequency, infrared and vacuum therapy to firm loose skin, smooth cellulite and reduce circumference, no surgery, no downtime.',
    href: '/packages/skin-tightening',
    alt: 'Skin Tightening modality',
    src: '/wix/87fc13_adb56c71648b421998e77dbea4ec5fb8~mv2.jpg',
  },
  {
    title: 'Anti-Cellulite',
    desc: 'Targeted cellulite reduction and lymphatic drainage to smooth dimpled skin, reduce fluid retention and improve skin texture. Ideal after weight loss or as part of your slimming program.',
    href: '/packages/anti-cellulite',
    alt: 'Anti-Cellulite modality',
    src: '/wix/87fc13_5dde946fd77046908ec6b65db211836a~mv2.jpg',
  },
] as const;

/* ---- coverflow tuning --------------------------------------------------- */
const SPACING = 2.45; // x gap between centres
const DEPTH = 1.85; // z push-back per step away from centre (coverflow depth)
const ANGLE = 0.55; // y-rotation (rad) per step for side cards
const SIDE_SCALE = 0.74; // side cards smaller than centre
const CARD_W = 2.0;
const CARD_H = 2.55;
const CARD_RADIUS = 0.16; // rounded corners (world units)

type CardTarget = { x: number; z: number; ry: number; s: number; o: number };

/* Rounded-rectangle plane geometry so cards have soft corners. */
function roundedPlane(w: number, h: number, r: number, seg = 6): THREE.ShapeGeometry {
  const x = -w / 2;
  const y = -h / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ShapeGeometry(shape, seg);
  // Generate UVs spanning the bounding box so the texture maps 1:1.
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const sizeX = bb.max.x - bb.min.x;
  const sizeY = bb.max.y - bb.min.y;
  const pos = geo.attributes.position;
  const uv: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    uv.push((pos.getX(i) - bb.min.x) / sizeX, (pos.getY(i) - bb.min.y) / sizeY);
  }
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  return geo;
}

/* ------------------------------------------------------------------------- */
/* WebGL coverflow — decorative, aria-hidden. Renders inside the section.     */
/* ------------------------------------------------------------------------- */
function CoverflowGL({
  activeIndex,
  onActiveChange,
  onCardActivate,
}: {
  activeIndex: number;
  onActiveChange: (i: number) => void;
  onCardActivate: (i: number) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;
  const onActiveRef = useRef(onActiveChange);
  onActiveRef.current = onActiveChange;
  const onActivateRef = useRef(onCardActivate);
  onActivateRef.current = onCardActivate;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.1, 6.6);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // wrapper handles the fallback; bail quietly
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Premium sheen: soft sage ambient + a key light.
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));
    const key = new THREE.DirectionalLight(0xc9d8c1, 0.7); // light sage tint
    key.position.set(2.5, 3, 5);
    scene.add(key);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight || Math.round(w * 0.52);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';

    // A card = picture plane + a mirrored reflection plane beneath it.
    const cards = CARDS.map((card, i) => {
      const tex = loader.load(card.src);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const geo = roundedPlane(CARD_W, CARD_H, CARD_RADIUS);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        roughness: 0.55,
        metalness: 0.12,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData.index = i;

      // Soft contact reflection under each card.
      const reflMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.18 });
      const reflGeo = roundedPlane(CARD_W, CARD_H, CARD_RADIUS);
      const refl = new THREE.Mesh(reflGeo, reflMat);
      refl.scale.y = -1; // mirror vertically
      refl.position.y = -CARD_H - 0.06;

      const group = new THREE.Group();
      group.add(mesh);
      group.add(refl);
      scene.add(group);

      return {
        group,
        mesh,
        geo,
        mat,
        reflGeo,
        reflMat,
        tex,
        cur: { x: 0, z: 0, ry: 0, s: 1, o: 1 } as CardTarget,
        target: { x: 0, z: 0, ry: 0, s: 1, o: 1 } as CardTarget,
      };
    });

    const setTargets = () => {
      const active = activeRef.current;
      cards.forEach((c, i) => {
        const off = i - active;
        c.target = {
          x: off * SPACING,
          z: -Math.abs(off) * DEPTH,
          ry: -off * ANGLE,
          s: off === 0 ? 1 : SIDE_SCALE,
          o: off === 0 ? 1 : 0.45,
        };
      });
    };
    setTargets();
    (mount as unknown as { __setTargets?: () => void }).__setTargets = setTargets;

    /* ---- render loop with offscreen / hidden pausing -------------------- */
    let raf = 0;
    let running = true;
    let visible = true;
    const clock = new THREE.Clock();
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const tick = () => {
      if (!running) return;
      const t = clock.getElapsedTime();
      cards.forEach((c, i) => {
        const tgt = c.target;
        c.cur.x = lerp(c.cur.x, tgt.x, 0.12);
        c.cur.z = lerp(c.cur.z, tgt.z, 0.12);
        c.cur.ry = lerp(c.cur.ry, tgt.ry, 0.12);
        c.cur.s = lerp(c.cur.s, tgt.s, 0.12);
        c.cur.o = lerp(c.cur.o, tgt.o, 0.12);

        // Subtle idle auto-drift — a gentle bob/sway so it feels alive.
        const drift = Math.sin(t * 0.6 + i * 1.3) * 0.04;
        c.group.position.set(c.cur.x, 0.1 + drift, c.cur.z);
        c.group.rotation.y = c.cur.ry;
        c.group.scale.setScalar(c.cur.s);
        c.mat.opacity = c.cur.o;
        c.reflMat.opacity = c.cur.o * 0.18;
        c.group.renderOrder = Math.round(c.cur.z * 10);
      });
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      tick();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    tick();

    // Pause when the section scrolls offscreen.
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.05 }
    );
    io.observe(mount);

    // Pause when the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    /* ---- pointer: drag to rotate, click/tap centre to navigate ---------- */
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let downX: number | null = null;
    let downY = 0;
    let downTime = 0;

    const onDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
      downTime = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      if (downX === null) return;
      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      const dt = performance.now() - downTime;
      const startX = downX;
      downX = null;

      // Treat as a click: small movement + quick.
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && dt < 400) {
        const rect = renderer.domElement.getBoundingClientRect();
        ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(cards.map((c) => c.mesh), false);
        if (hits.length) {
          const idx = hits[0].object.userData.index as number;
          if (idx === activeRef.current) onActivateRef.current(idx); // centre → navigate
          else onActiveRef.current(idx); // side → bring to centre
        }
        return;
      }
      // Drag: advance one step.
      if (Math.abs(dx) > 40 && startX !== null) {
        const next = Math.min(
          CARDS.length - 1,
          Math.max(0, activeRef.current + (dx < 0 ? 1 : -1))
        );
        if (next !== activeRef.current) onActiveRef.current(next);
      }
    };

    const el = renderer.domElement;
    el.style.touchAction = 'pan-y';
    el.style.cursor = 'grab';
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cards.forEach((c) => {
        c.geo.dispose();
        c.mat.dispose();
        c.reflGeo.dispose();
        c.reflMat.dispose();
        c.tex.dispose();
      });
      renderer.dispose();
      if (el.parentNode) el.parentNode.removeChild(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-run target calc when activeIndex changes (without recreating the scene).
  useEffect(() => {
    (mountRef.current as unknown as { __setTargets?: () => void } | null)?.__setTargets?.();
  }, [activeIndex]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ width: '100%', height: 'clamp(360px, 46vw, 560px)', cursor: 'grab' }}
    />
  );
}

/* ------------------------------------------------------------------------- */
/* Main component — owns the DOM layer + decides whether to mount the WebGL.  */
/* ------------------------------------------------------------------------- */
export default function TreatmentsCarousel3D() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  // null = undecided (SSR / first paint); true = use 3D; false = use 2D fallback.
  const [use3D, setUse3D] = useState<boolean | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Decide capability on the client only (after mount) so SSR HTML stays fallback-safe.
  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let webgl = false;
    try {
      const c = document.createElement('canvas');
      webgl = !!(
        window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl'))
      );
    } catch {
      webgl = false;
    }
    setUse3D(!reduced && webgl);
  }, []);

  // Lazy-init: only mount the GL canvas once the section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const go = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => Math.min(CARDS.length - 1, Math.max(0, a + dir))),
    []
  );

  const navigate = useCallback(
    (i: number) => router.push(CARDS[i].href),
    [router]
  );

  // If we've decided NOT to use 3D, render the existing 2D carousel verbatim.
  if (use3D === false) {
    return <ModalitiesCarousel />;
  }

  const card = CARDS[active];

  return (
    <div ref={sectionRef} className="relative">
      {/* ---- WebGL coverflow (decorative) — lazy-mounted when in view ---- */}
      {use3D && inView && (
        <CoverflowGL
          activeIndex={active}
          onActiveChange={setActive}
          onCardActivate={navigate}
        />
      )}

      {/* ---- Active-card text panel (real, on-brand, synced to centre) ---- */}
      <div className="mx-auto px-6 text-center" style={{ maxWidth: '640px', marginTop: '8px' }}>
        <h3
          className="mb-3"
          style={{
            color: '#024C27',
            fontFamily: 'Novecento Wide Book, sans-serif',
            fontSize: '20px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            lineHeight: 1.25,
          }}
        >
          {card.title}
        </h3>
        <p
          className="mb-6 mx-auto"
          style={{
            color: '#5a5043',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '14px',
            lineHeight: 1.6,
            maxWidth: '520px',
          }}
        >
          {card.desc}
        </p>
        <Link
          href={card.href}
          className="cta-glow inline-flex items-center justify-center font-bold text-white transition-all duration-200 ease-in-out hover:opacity-90 active:scale-95"
          style={{
            minHeight: '48px',
            padding: '0 36px',
            fontFamily: 'Novecento Wide Book, sans-serif',
            fontSize: '11px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            borderRadius: '999px',
          }}
        >
          Explore {card.title} ›
        </Link>
      </div>

      {/* ---- Prev / Next controls (real buttons, keyboard-operable) ------- */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Previous treatment"
          className="flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.05] disabled:opacity-30 disabled:cursor-not-allowed motion-reduce:transition-none motion-reduce:hover:scale-100"
          style={{
            width: '52px',
            height: '52px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            color: '#4f7256',
            fontSize: '26px',
            lineHeight: 1,
            border: 'none',
            cursor: 'pointer',
            borderRadius: '999px',
          }}
        >
          ‹
        </button>

        {/* Dot indicators — decorative, mirror the active index. */}
        <div className="flex items-center gap-2" aria-hidden="true">
          {CARDS.map((c, i) => (
            <span
              key={c.title}
              style={{
                width: i === active ? '22px' : '8px',
                height: '8px',
                borderRadius: '999px',
                backgroundColor: i === active ? '#4f7256' : '#C9D8C1',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === CARDS.length - 1}
          aria-label="Next treatment"
          className="flex items-center justify-center transition-transform duration-300 ease-out hover:scale-[1.05] disabled:opacity-30 disabled:cursor-not-allowed motion-reduce:transition-none motion-reduce:hover:scale-100"
          style={{
            width: '52px',
            height: '52px',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            color: '#4f7256',
            fontSize: '26px',
            lineHeight: 1,
            border: 'none',
            cursor: 'pointer',
            borderRadius: '999px',
          }}
        >
          ›
        </button>
      </div>

      {/* ---- SEO + a11y: ALL 6 treatments as real, crawlable links. -------
          Visually hidden but keyboard-focusable (focus reveals via :focus-within
          style below), so every href + title + description is in the DOM. -------- */}
      <nav aria-label="All weight loss and body contouring treatments" className="treatments-seo-list">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {CARDS.map((c) => (
            <li key={c.title}>
              <Link href={c.href}>
                <strong>{c.title}</strong>
                <span> — {c.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        /* Visually-hidden list that stays in the accessibility tree and the
           crawlable DOM, and becomes visible when any link inside is focused. */
        .treatments-seo-list {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0 0 0 0);
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
        }
        .treatments-seo-list:focus-within {
          position: static;
          width: auto;
          height: auto;
          margin: 24px auto 0;
          max-width: 640px;
          overflow: visible;
          clip: auto;
          clip-path: none;
          white-space: normal;
        }
        .treatments-seo-list:focus-within li {
          margin-bottom: 12px;
        }
        .treatments-seo-list :global(a) {
          color: #4f7256;
          text-decoration: underline;
          font-family: 'Roboto', sans-serif;
          font-size: 14px;
          line-height: 1.5;
        }
        .treatments-seo-list :global(a:focus-visible) {
          outline: 2px solid #024c27;
          outline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
