'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * TreatmentsAccordion — a premium IMAGE ACCORDION of the 6 Carisma Slimming
 * treatments, replacing the editorial "scatter" composition.
 *
 * Desktop (>=768px): a horizontal row of 6 image panels. The ACTIVE panel is
 * expanded (wide, rounded, photo shown prominently); the others collapse into
 * narrow vertical slivers carrying the treatment name rotated vertically. Left/
 * right arrow buttons (and keyboard arrows) move the active panel, wrapping.
 *
 * Mobile (<768px): a single full-width active image card with arrows overlaid,
 * driven by the same active-index state, plus swipe support.
 *
 * Below the accordion, a synced detail panel reflects the active treatment:
 * name (heading), description, and an "Explore {name} →" internal Link.
 *
 * A11y: tabs pattern. Panels are role="tab" in a role="tablist"; the detail
 * area is the role="tabpanel". Roving tabindex + arrow keys + Home/End. All 6
 * names, descriptions and hrefs are rendered in the DOM (inactive detail blocks
 * are visually hidden, not removed) so every treatment href is crawlable.
 *
 * Edit-scope: this file + the treatments-section lines in app/page.tsx only.
 */

type Treatment = {
  title: string;
  desc: string;
  href: string;
  alt: string;
  src: string;
  focal: string;
};

// All 6, in order. Mirrors components/ModalitiesCarousel.tsx CARDS (descriptions)
// and components/TreatmentsEditorial.tsx (per-card focal points + alt text).
const TREATMENTS: Treatment[] = [
  {
    title: 'Weight Loss',
    desc:
      "A doctor-led, all-in-one weight loss program that combines nutrition, movement, body contouring treatments and accountability to change your body and habits for good. Malta's most comprehensive slimming system.",
    href: '/weight-loss',
    alt: 'Doctor-led weight loss program at Carisma Slimming Malta',
    src: '/wix/87fc13_08e868147da2475ba4b9638849be145e~mv2.jpg',
    focal: '51% 22%',
  },
  {
    title: 'GLP-1 (Mounjaro & Ozempic)',
    desc:
      'Prescription-only medical weight loss medication, used when medically appropriate, to calm appetite and support steady fat reduction alongside your personalised slimming plan.',
    href: '/glp1',
    alt: 'GLP-1 medical weight loss with Mounjaro and Ozempic in Malta',
    src: '/wix/87fc13_6495820e70764a1fa3caddfb20d80fe0~mv2.webp',
    focal: '50% 35%',
  },
  {
    title: 'Fat Reduction',
    desc:
      'Targeted non surgical fat removal using CoolSculpting fat freezing (cryolipolysis), medical guidance and a tailored caloric deficit for those last stubborn areas. FDA-cleared and performed at our Malta clinic.',
    href: '/packages/fat-freezing',
    alt: 'CoolSculpting fat freezing fat reduction treatment in Malta',
    src: '/wix/87fc13_6d89e9c129304617a960aa46bb07eed4~mv2.jpg',
    focal: '50% 35%',
  },
  {
    title: 'Muscle Stimulation',
    desc:
      'High-intensity electromagnetic body sculpting sessions with EMSculpt NEO that contract your muscles thousands of times to build strength, reduce fat and help shape your silhouette, without surgery or downtime.',
    href: '/packages/muscle-stimulation',
    alt: 'EMSculpt NEO muscle stimulation body sculpting in Malta',
    src: '/wix/87fc13_d79664fae1184e8e8c947c3d350af498~mv2.jpg',
    focal: '50% 35%',
  },
  {
    title: 'Skin Tightening',
    desc:
      'Non-invasive skin tightening with VelaShape III that combines radiofrequency, infrared and vacuum therapy to firm loose skin, smooth cellulite and reduce circumference, no surgery, no downtime.',
    href: '/packages/skin-tightening',
    alt: 'VelaShape III skin tightening treatment in Malta',
    src: '/wix/87fc13_adb56c71648b421998e77dbea4ec5fb8~mv2.jpg',
    focal: '50% 35%',
  },
  {
    title: 'Anti-Cellulite',
    desc:
      'Targeted cellulite reduction and lymphatic drainage to smooth dimpled skin, reduce fluid retention and improve skin texture. Ideal after weight loss or as part of your slimming program.',
    href: '/packages/anti-cellulite',
    alt: 'Anti-cellulite and lymphatic drainage treatment in Malta',
    src: '/wix/87fc13_5dde946fd77046908ec6b65db211836a~mv2.jpg',
    focal: '50% 35%',
  },
];

const FOREST = '#024C27';
const SAGE = '#4f7256';
const TAUPE = '#6f6456';
const TAUPE_DARK = '#5a5043';

const NOVECENTO = 'Novecento Wide Book, sans-serif';
const ROBOTO = 'Roboto, sans-serif';

export default function TreatmentsAccordion() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);

  const count = TREATMENTS.length;
  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = (i: number) => `${baseId}-panel-${i}`;

  const go = (next: number, focus = false) => {
    const i = ((next % count) + count) % count;
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        go(active + 1, true);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        go(active - 1, true);
        break;
      case 'Home':
        e.preventDefault();
        go(0, true);
        break;
      case 'End':
        e.preventDefault();
        go(count - 1, true);
        break;
      default:
        break;
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    if (Math.abs(dx) > 44) go(active + (dx < 0 ? 1 : -1));
    touchX.current = null;
  };

  return (
    <div className="ta mx-auto px-6" style={{ maxWidth: '1180px' }}>
      <style>{accordionCss}</style>

      {/* Section header — exactly one <h2> carrying the keyword + "Malta". */}
      <div className="ta-head">
        <p aria-hidden="true" className="ta-eyebrow">
          Our Treatments
        </p>
        <div aria-hidden="true" className="ta-eyebrow-rule" />
        <h2 id="modalities-heading" className="ta-h2">
          Our Weight Loss &amp; Body Contouring Treatments in Malta
        </h2>
        <p className="ta-sub">
          Six evidence-led modalities, combined into one doctor-led plan — chosen
          for your body, never one-size-fits-all.
        </p>
      </div>

      {/* ===== DESKTOP IMAGE ACCORDION ===== */}
      <div className="ta-desktop">
        <button
          type="button"
          className="ta-arrow ta-arrow--prev"
          aria-label="Previous treatment"
          onClick={() => go(active - 1)}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          role="tablist"
          aria-label="Carisma Slimming treatments"
          aria-orientation="horizontal"
          className="ta-track"
        >
          {TREATMENTS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.title}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={isActive}
                aria-controls={panelId(i)}
                tabIndex={isActive ? 0 : -1}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => go(i)}
                onKeyDown={onKeyDown}
                className={`ta-panel${isActive ? ' is-active' : ''}`}
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 767px) 0px, 640px"
                  style={{ objectFit: 'cover', objectPosition: t.focal }}
                  className="ta-panel__img"
                />
                <span aria-hidden="true" className="ta-panel__scrim" />
                {/* Collapsed label — vertical name on the sliver. */}
                <span aria-hidden="true" className="ta-panel__vlabel">
                  {t.title}
                </span>
                {/* Expanded label — name across the bottom of the active image. */}
                <span aria-hidden="true" className="ta-panel__hlabel">
                  {t.title}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="ta-arrow ta-arrow--next"
          aria-label="Next treatment"
          onClick={() => go(active + 1)}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      {/* ===== MOBILE CAROUSEL ===== */}
      <div
        className="ta-mobile"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          role="tablist"
          aria-label="Carisma Slimming treatments"
          aria-orientation="horizontal"
          className="ta-mobile__stage"
        >
          {TREATMENTS.map((t, i) => {
            const isActive = i === active;
            return (
              <button
                key={t.title}
                type="button"
                role="tab"
                id={`${tabId(i)}-m`}
                aria-selected={isActive}
                aria-controls={panelId(i)}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => go(active + 1)}
                onKeyDown={onKeyDown}
                className={`ta-mobile__card${isActive ? ' is-active' : ''}`}
                style={{ pointerEvents: isActive ? 'auto' : 'none' } as CSSProperties}
              >
                <Image
                  src={t.src}
                  alt={t.alt}
                  fill
                  sizes="(max-width: 767px) 92vw, 0px"
                  style={{ objectFit: 'cover', objectPosition: t.focal }}
                />
                <span aria-hidden="true" className="ta-panel__scrim" />
                <span aria-hidden="true" className="ta-mobile__name">
                  {t.title}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            className="ta-arrow ta-arrow--prev ta-arrow--m"
            aria-label="Previous treatment"
            onClick={() => go(active - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            className="ta-arrow ta-arrow--next ta-arrow--m"
            aria-label="Next treatment"
            onClick={() => go(active + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>

        {/* Dots */}
        <div className="ta-dots" aria-hidden="true">
          {TREATMENTS.map((t, i) => (
            <span key={t.title} className={`ta-dot${i === active ? ' is-active' : ''}`} />
          ))}
        </div>
      </div>

      {/* ===== SYNCED DETAIL PANEL ===== */}
      {/* All 6 blocks stay in the DOM (inactive ones visually hidden) so every
          name, description and href is server-rendered + crawlable. */}
      <div className="ta-detail">
        {TREATMENTS.map((t, i) => {
          const isActive = i === active;
          return (
            <div
              key={t.title}
              role="tabpanel"
              id={panelId(i)}
              aria-labelledby={`${tabId(i)} ${tabId(i)}-m`}
              hidden={!isActive}
              className="ta-detail__block"
            >
              <h3 className="ta-detail__name">{t.title}</h3>
              <p className="ta-detail__desc">{t.desc}</p>
              <Link href={t.href} className="ta-detail__cta">
                Explore {t.title} <span aria-hidden="true">→</span>
              </Link>
            </div>
          );
        })}
        {/* Belt-and-braces crawlable index of all 6 hrefs (visually hidden). */}
        <ul className="ta-sr-links">
          {TREATMENTS.map((t) => (
            <li key={t.title}>
              <Link href={t.href}>{t.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Scoped CSS. Brand tokens inlined; transitions disabled under reduced motion. */
const accordionCss = `
.ta { --ta-forest: ${FOREST}; --ta-sage: ${SAGE}; --ta-taupe: ${TAUPE}; --ta-taupe-dark: ${TAUPE_DARK}; }

/* ---- Header ---- */
.ta-head { text-align: center; max-width: 760px; margin: 0 auto 40px; }
.ta-eyebrow { color: var(--ta-sage); font-family: ${NOVECENTO}; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 14px; }
.ta-eyebrow-rule { width: 64px; height: 1px; background: var(--ta-sage); margin: 0 auto 18px; }
.ta-h2 { color: var(--ta-forest); font-family: 'Trajan Pro', serif; font-weight: 400; font-size: clamp(26px, 4.4vw, 40px); line-height: 1.25; letter-spacing: 2px; text-transform: uppercase; }
.ta-sub { margin: 18px auto 0; max-width: 600px; color: var(--ta-taupe); font-family: ${ROBOTO}; font-size: 15px; line-height: 1.7; }

/* ---- Desktop accordion ---- */
.ta-desktop { display: none; }
@media (min-width: 768px) {
  .ta-desktop { display: flex; align-items: center; gap: 12px; }
  .ta-mobile { display: none; }
}
.ta-track { display: flex; gap: 10px; flex: 1; height: 460px; }
.ta-panel {
  position: relative; flex: 0 0 64px; height: 100%; min-width: 64px;
  border: 0; padding: 0; margin: 0; cursor: pointer; overflow: hidden;
  border-radius: 18px; background: #e9ede6;
  box-shadow: 0 10px 30px rgba(2,76,39,0.10);
  transition: flex-grow 560ms cubic-bezier(.22,.61,.36,1), flex-basis 560ms cubic-bezier(.22,.61,.36,1), box-shadow 400ms ease;
}
.ta-panel.is-active { flex: 1 1 auto; box-shadow: 0 18px 46px rgba(2,76,39,0.20); }
.ta-panel__img { transition: transform 700ms cubic-bezier(.22,.61,.36,1); }
.ta-panel.is-active .ta-panel__img { transform: scale(1.02); }
.ta-panel__scrim {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, rgba(20,17,14,0) 28%, rgba(20,17,14,0.30) 60%, rgba(20,17,14,0.82) 100%);
}
/* Collapsed sliver: vertical name */
.ta-panel__vlabel {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  writing-mode: vertical-rl; transform: rotate(180deg);
  color: #ffffff; font-family: ${NOVECENTO}; font-size: 13px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase; white-space: nowrap;
  text-shadow: 0 1px 6px rgba(0,0,0,0.55);
  transition: opacity 240ms ease;
}
.ta-panel.is-active .ta-panel__vlabel { opacity: 0; pointer-events: none; }
/* Expanded: horizontal name at bottom */
.ta-panel__hlabel {
  position: absolute; left: 26px; right: 26px; bottom: 24px;
  color: #ffffff; font-family: ${NOVECENTO}; font-size: 19px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase; line-height: 1.2; text-align: left;
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
  opacity: 0; transition: opacity 320ms ease 120ms;
}
.ta-panel.is-active .ta-panel__hlabel { opacity: 1; }

/* ---- Arrows ---- */
.ta-arrow {
  flex: 0 0 auto; display: flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: 999px; border: 0; cursor: pointer;
  background: #ffffff; color: var(--ta-taupe); font-size: 26px; line-height: 1;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  transition: transform 300ms ease, background 200ms ease, color 200ms ease;
}
.ta-arrow:hover { transform: scale(1.06); background: var(--ta-forest); color: #ffffff; }

/* ---- Mobile carousel ---- */
.ta-mobile__stage { position: relative; width: 100%; height: 440px; border-radius: 20px; overflow: hidden; box-shadow: 0 14px 38px rgba(2,76,39,0.16); }
.ta-mobile__card { position: absolute; inset: 0; border: 0; padding: 0; margin: 0; cursor: pointer; overflow: hidden; background: #e9ede6; opacity: 0; transition: opacity 420ms ease; }
.ta-mobile__card.is-active { opacity: 1; }
.ta-mobile__name {
  position: absolute; left: 22px; right: 22px; bottom: 22px;
  color: #ffffff; font-family: ${NOVECENTO}; font-size: 18px; font-weight: 700;
  letter-spacing: 1px; text-transform: uppercase; line-height: 1.2; text-align: left;
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
}
.ta-arrow--m { position: absolute; top: calc(50% - 24px); width: 46px; height: 46px; font-size: 24px; z-index: 3; }
.ta-arrow--m.ta-arrow--prev { left: 12px; }
.ta-arrow--m.ta-arrow--next { right: 12px; }
.ta-dots { display: flex; justify-content: center; gap: 8px; margin-top: 18px; }
.ta-dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(79,114,86,0.28); transition: background 200ms ease, transform 200ms ease; }
.ta-dot.is-active { background: var(--ta-forest); transform: scale(1.25); }

/* ---- Detail panel ---- */
.ta-detail { max-width: 720px; margin: 40px auto 0; text-align: center; }
.ta-detail__block { animation: ta-fade 360ms ease both; }
.ta-detail__name { color: var(--ta-forest); font-family: 'Trajan Pro', serif; font-weight: 400; font-size: clamp(20px, 3.2vw, 28px); line-height: 1.3; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 14px; }
.ta-detail__desc { color: var(--ta-taupe); font-family: ${ROBOTO}; font-size: 15px; line-height: 1.75; margin-bottom: 24px; }
.ta-detail__cta {
  display: inline-flex; align-items: center; gap: 8px; min-height: 48px; padding: 0 32px;
  border-radius: 999px; background: var(--ta-forest); color: #ffffff;
  font-family: ${NOVECENTO}; font-size: 12px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; text-decoration: none;
  transition: transform 200ms ease, background 200ms ease, opacity 200ms ease;
}
.ta-detail__cta:hover { background: var(--ta-sage); transform: translateY(-1px); }

/* Visually-hidden crawlable link list */
.ta-sr-links { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

@keyframes ta-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

/* ---- Reduced motion: kill width/transform/opacity transitions ---- */
@media (prefers-reduced-motion: reduce) {
  .ta-panel, .ta-panel__img, .ta-panel__vlabel, .ta-panel__hlabel,
  .ta-arrow, .ta-mobile__card, .ta-dot { transition: none !important; }
  .ta-panel.is-active .ta-panel__img { transform: none; }
  .ta-detail__block { animation: none; }
}
`;
