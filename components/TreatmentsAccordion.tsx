'use client';

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type TouchEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * TreatmentsAccordion — a row of STACKED EXPANDING IMAGE CARDS for the 6 Carisma
 * Slimming treatments.
 *
 * Desktop (>=768px): a centered horizontal row of tall portrait cards. ONE card
 * is EXPANDED (large) showing its photo full-bleed with a dark gradient scrim and
 * OVERLAID content bottom-left: number/eyebrow, treatment NAME (Trajan), the
 * description, and an "Explore {name} →" CTA pill linking to its page. The OTHER
 * cards are COLLAPSED but still WIDE ENOUGH (~165px) that the photo is clearly
 * visible — each showing a NUMBER badge (01–06) at top and a VERTICAL rotated
 * treatment name at the bottom. Clicking a collapsed card expands it (and collapses
 * the previously-active one) with a smooth width transition. Secondary prev/next
 * arrows + arrow keys also move the active card.
 *
 * Mobile (<768px): a single full-width active card carrying the SAME overlaid
 * content (number, name, description, CTA), with prev/next arrows + dots + swipe.
 *
 * A11y: tabs pattern. Cards are role="tab" in a role="tablist"; each card's
 * overlaid content is its role="tabpanel". Roving tabindex + arrow keys + Home/End.
 * All 6 names, descriptions and hrefs are server-rendered in the DOM (inactive
 * panels kept mounted with `hidden`, plus a visually-hidden crawlable link list),
 * so every treatment href is crawlable. Scrims are strong enough for AA white text.
 *
 * Edit-scope: this file only.
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

const num = (i: number) => String(i + 1).padStart(2, '0');

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

  // Shared overlaid content (number eyebrow, name, desc, CTA) for an active card.
  const Overlay = ({ t, i }: { t: Treatment; i: number }) => (
    <div className="ta-ov">
      <p aria-hidden="true" className="ta-ov__num">
        {num(i)} <span className="ta-ov__num-rule" /> Treatment
      </p>
      <h3 className="ta-ov__name">{t.title}</h3>
      <p className="ta-ov__desc">{t.desc}</p>
      <Link href={t.href} className="ta-ov__cta">
        Explore {t.title} <span aria-hidden="true">→</span>
      </Link>
    </div>
  );

  return (
    <div className="ta mx-auto px-6" style={{ maxWidth: '1280px' }}>
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

      {/* ===== DESKTOP EXPANDING STACK ===== */}
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
              <div key={t.title} className={`ta-card${isActive ? ' is-active' : ''}`}>
                <button
                  type="button"
                  role="tab"
                  id={tabId(i)}
                  aria-selected={isActive}
                  aria-controls={panelId(i)}
                  aria-label={`${t.title} — treatment ${num(i)}`}
                  tabIndex={isActive ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  onClick={() => go(i)}
                  onKeyDown={onKeyDown}
                  className="ta-card__btn"
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 767px) 0px, 560px"
                    style={{ objectFit: 'cover', objectPosition: t.focal }}
                    className="ta-card__img"
                  />
                  <span aria-hidden="true" className="ta-card__scrim" />

                  {/* Collapsed: number badge (top) + vertical name (bottom) */}
                  <span aria-hidden="true" className="ta-card__badge">
                    {num(i)}
                  </span>
                  <span aria-hidden="true" className="ta-card__vlabel">
                    {t.title}
                  </span>
                </button>

                {/* Expanded: overlaid in-card content. Kept mounted (hidden when
                    inactive) so all names/descriptions/hrefs are crawlable. */}
                <div
                  role="tabpanel"
                  id={panelId(i)}
                  aria-labelledby={tabId(i)}
                  hidden={!isActive}
                  className="ta-card__panel"
                >
                  <Overlay t={t} i={i} />
                </div>
              </div>
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

      {/* ===== MOBILE CAROUSEL (single full-width active card, same overlay) ===== */}
      <div className="ta-mobile" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          role="tablist"
          aria-label="Carisma Slimming treatments"
          aria-orientation="horizontal"
          className="ta-mobile__stage"
        >
          {TREATMENTS.map((t, i) => {
            const isActive = i === active;
            return (
              <div
                key={t.title}
                className={`ta-mobile__card${isActive ? ' is-active' : ''}`}
                style={{ pointerEvents: isActive ? 'auto' : 'none' } as CSSProperties}
              >
                <button
                  type="button"
                  role="tab"
                  id={`${tabId(i)}-m`}
                  aria-selected={isActive}
                  aria-controls={`${panelId(i)}-m`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => go(active + 1)}
                  onKeyDown={onKeyDown}
                  className="ta-mobile__btn"
                >
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    sizes="(max-width: 767px) 92vw, 0px"
                    style={{ objectFit: 'cover', objectPosition: t.focal }}
                  />
                  <span aria-hidden="true" className="ta-card__scrim" />
                </button>
                <div
                  role="tabpanel"
                  id={`${panelId(i)}-m`}
                  aria-labelledby={`${tabId(i)}-m`}
                  hidden={!isActive}
                  className="ta-mobile__panel"
                >
                  <Overlay t={t} i={i} />
                </div>
              </div>
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

      {/* Belt-and-braces crawlable index of all 6 hrefs (visually hidden). */}
      <ul className="ta-sr-links">
        {TREATMENTS.map((t) => (
          <li key={t.title}>
            <Link href={t.href}>{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Scoped CSS. Brand tokens inlined; transitions disabled under reduced motion. */
const accordionCss = `
.ta { --ta-forest: ${FOREST}; --ta-sage: ${SAGE}; --ta-taupe: ${TAUPE}; --ta-taupe-dark: ${TAUPE_DARK}; }

/* ---- Header ---- */
.ta-head { text-align: center; max-width: 760px; margin: 0 auto 44px; }
.ta-eyebrow { color: var(--ta-sage); font-family: ${NOVECENTO}; font-size: 12px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 14px; }
.ta-eyebrow-rule { width: 64px; height: 1px; background: var(--ta-sage); margin: 0 auto 18px; }
.ta-h2 { color: var(--ta-forest); font-family: 'Trajan Pro', serif; font-weight: 400; font-size: clamp(26px, 4.4vw, 40px); line-height: 1.25; letter-spacing: 2px; text-transform: uppercase; }
.ta-sub { margin: 18px auto 0; max-width: 600px; color: var(--ta-taupe); font-family: ${ROBOTO}; font-size: 15px; line-height: 1.7; }

/* ---- Shared overlaid in-card content ---- */
.ta-ov { position: absolute; left: 30px; right: 30px; bottom: 30px; text-align: left; z-index: 2; }
.ta-ov__num { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.92); font-family: ${NOVECENTO}; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 14px; }
.ta-ov__num-rule { width: 26px; height: 1px; background: rgba(255,255,255,0.7); display: inline-block; }
.ta-ov__name { color: #ffffff; font-family: 'Trajan Pro', serif; font-weight: 400; font-size: clamp(22px, 2.2vw, 30px); line-height: 1.2; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px; text-shadow: 0 1px 10px rgba(0,0,0,0.45); }
.ta-ov__desc { color: rgba(255,255,255,0.94); font-family: ${ROBOTO}; font-size: 14.5px; line-height: 1.65; margin-bottom: 22px; max-width: 440px; text-shadow: 0 1px 8px rgba(0,0,0,0.5); }
.ta-ov__cta {
  display: inline-flex; align-items: center; gap: 8px; min-height: 46px; padding: 0 26px;
  border-radius: 999px; background: rgba(255,255,255,0.96); color: var(--ta-forest);
  font-family: ${NOVECENTO}; font-size: 11.5px; font-weight: 700; letter-spacing: 1px;
  text-transform: uppercase; text-decoration: none;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;
}
.ta-ov__cta:hover { background: var(--ta-forest); color: #ffffff; transform: translateY(-1px); }
.ta-ov__cta:focus-visible { outline: 3px solid #ffffff; outline-offset: 2px; }

/* ---- Desktop expanding stack ---- */
.ta-desktop { display: none; }
@media (min-width: 768px) {
  .ta-desktop { display: flex; align-items: center; gap: 14px; }
  .ta-mobile { display: none; }
}
.ta-track { display: flex; gap: 12px; flex: 1; height: 560px; min-width: 0; }
.ta-card {
  position: relative; flex: 0 0 165px; height: 100%; min-width: 0;
  border-radius: 22px; overflow: hidden; background: #e9ede6;
  box-shadow: 0 10px 30px rgba(2,76,39,0.10);
  transition: flex-grow 560ms cubic-bezier(.22,.61,.36,1), flex-basis 560ms cubic-bezier(.22,.61,.36,1), box-shadow 400ms ease;
}
.ta-card.is-active { flex: 1 1 0; box-shadow: 0 20px 50px rgba(2,76,39,0.22); }
.ta-card__btn { position: absolute; inset: 0; border: 0; padding: 0; margin: 0; cursor: pointer; background: transparent; display: block; }
.ta-card__btn:focus-visible { outline: 3px solid var(--ta-forest); outline-offset: -3px; border-radius: 22px; }
.ta-card__img { transition: transform 700ms cubic-bezier(.22,.61,.36,1); }
.ta-card.is-active .ta-card__img { transform: scale(1.03); }
.ta-card__scrim {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.30) 58%, rgba(0,0,0,0.70) 100%);
  transition: opacity 320ms ease;
}
.ta-card.is-active .ta-card__scrim {
  background:
    linear-gradient(180deg, rgba(0,0,0,0) 34%, rgba(0,0,0,0.45) 66%, rgba(0,0,0,0.78) 100%),
    linear-gradient(90deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.06) 48%, rgba(0,0,0,0) 70%);
}
/* Collapsed: number badge top */
.ta-card__badge {
  position: absolute; top: 18px; left: 0; right: 0; text-align: center;
  color: #ffffff; font-family: ${NOVECENTO}; font-size: 15px; font-weight: 700;
  letter-spacing: 1px; text-shadow: 0 1px 8px rgba(0,0,0,0.6);
  transition: opacity 240ms ease; z-index: 2;
}
.ta-card.is-active .ta-card__badge { opacity: 0; }
/* Collapsed: vertical name bottom */
.ta-card__vlabel {
  position: absolute; left: 0; right: 0; bottom: 26px; margin: 0 auto;
  display: flex; align-items: center; justify-content: center;
  writing-mode: vertical-rl; transform: rotate(180deg);
  max-height: 320px;
  color: #ffffff; font-family: ${NOVECENTO}; font-size: 13px; font-weight: 700;
  letter-spacing: 2px; text-transform: uppercase; white-space: nowrap;
  text-shadow: 0 1px 6px rgba(0,0,0,0.6);
  transition: opacity 200ms ease; z-index: 2;
}
.ta-card.is-active .ta-card__vlabel { opacity: 0; }
/* Expanded: overlaid content panel (covers full card, content positioned absolutely) */
.ta-card__panel { position: absolute; inset: 0; pointer-events: none; }
.ta-card__panel .ta-ov { animation: ta-fade 420ms ease both; }
.ta-card__panel .ta-ov__cta { pointer-events: auto; }
.ta-card__panel[hidden] { display: none; }

/* ---- Arrows ---- */
.ta-arrow {
  flex: 0 0 auto; display: flex; align-items: center; justify-content: center;
  width: 52px; height: 52px; border-radius: 999px; border: 0; cursor: pointer;
  background: #ffffff; color: var(--ta-taupe-dark); font-size: 26px; line-height: 1;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  transition: transform 300ms ease, background 200ms ease, color 200ms ease;
}
.ta-arrow:hover { transform: scale(1.06); background: var(--ta-forest); color: #ffffff; }
.ta-arrow:focus-visible { outline: 3px solid var(--ta-forest); outline-offset: 2px; }

/* ---- Mobile carousel ---- */
.ta-mobile__stage { position: relative; width: 100%; height: 540px; border-radius: 22px; overflow: hidden; box-shadow: 0 14px 38px rgba(2,76,39,0.16); }
.ta-mobile__card { position: absolute; inset: 0; opacity: 0; transition: opacity 420ms ease; }
.ta-mobile__card.is-active { opacity: 1; }
.ta-mobile__btn { position: absolute; inset: 0; border: 0; padding: 0; margin: 0; cursor: pointer; overflow: hidden; background: #e9ede6; display: block; }
.ta-mobile__btn:focus-visible { outline: 3px solid #ffffff; outline-offset: -4px; border-radius: 22px; }
.ta-mobile__panel { position: absolute; inset: 0; pointer-events: none; }
.ta-mobile__panel .ta-ov__cta { pointer-events: auto; }
.ta-mobile__panel[hidden] { display: none; }
.ta-arrow--m { position: absolute; top: calc(50% - 24px); width: 46px; height: 46px; font-size: 24px; z-index: 4; }
.ta-arrow--m.ta-arrow--prev { left: 12px; }
.ta-arrow--m.ta-arrow--next { right: 12px; }
.ta-dots { display: flex; justify-content: center; gap: 8px; margin-top: 18px; }
.ta-dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(79,114,86,0.28); transition: background 200ms ease, transform 200ms ease; }
.ta-dot.is-active { background: var(--ta-forest); transform: scale(1.25); }

/* Visually-hidden crawlable link list */
.ta-sr-links { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }

@keyframes ta-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

/* ---- Reduced motion: kill width/transform/opacity transitions ---- */
@media (prefers-reduced-motion: reduce) {
  .ta-card, .ta-card__img, .ta-card__scrim, .ta-card__badge, .ta-card__vlabel,
  .ta-arrow, .ta-mobile__card, .ta-dot, .ta-ov__cta { transition: none !important; }
  .ta-card.is-active .ta-card__img { transform: none; }
  .ta-card__panel .ta-ov, .ta-mobile__panel .ta-ov { animation: none; }
}
`;
