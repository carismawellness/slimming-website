import Link from 'next/link';
import HeroVideoPlayer from './HeroVideoPlayer';
import HeroMotif from './HeroMotif';

/* ──────────────────────────────────────────────────────────────────────────
   PageHero — shared above-the-fold hero for marketing pages.

   Goals (per spec):
   • Two-column: copy left, ARCH media container right.
   • Floating glass social-proof cards over the arch that drift up/down
     continuously (pure-CSS `cx-float`, reduced-motion safe → server component).
   • Fits within the viewport at 100% zoom (target MacBook ~1512×982) with no
     scroll: the section fills 100svh and centres its content under the nav.
   • Reuses each page's existing media + the live light-sage `.cta-glow` CTA.
   Brand tokens come from globals.css (locked accessible palette).
   ────────────────────────────────────────────────────────────────────────── */

const HEADING = 'Trajan Pro, serif';
const WIDE = '"Novecento Wide", "Novecento Wide Book", sans-serif';
const BODY = 'Roboto, sans-serif';
const SAGE_TEXT = '#4f7256'; // accessible deep sage — headings/icons
const TAUPE = '#6f6456'; // accessible body/eyebrow text

export type HeroBullet = { label?: string; text: string };
export type HeroMedia = {
  type: 'video' | 'image';
  src: string;
  poster?: string;
  alt?: string;
  /** object-fit inside the arch — 'cover' (default, photos/video) or 'contain' (product mockups). */
  fit?: 'cover' | 'contain';
  /** arch background behind the media (default dark). Use a tint for 'contain' media. */
  bg?: string;
  /** arch aspect-ratio override (e.g. '406 / 720'). Defaults to the video's own
   *  portrait ratio for videos (so the full frame — and any on-video text —
   *  is never cropped) and 4/5 for images. */
  aspect?: string;
};
export type HeroProof = {
  rating?: string; // e.g. "4.9"
  reviews?: string; // e.g. "200+"
  awardSrc?: string;
  awardText?: string; // e.g. "#1 voted clinic\nMalta 2025–26"
  statValue?: string; // e.g. "30+"
  statLabel?: string; // e.g. "years in wellness"
};

export type PageHeroProps = {
  eyebrow?: string;
  /** Headline lines. Strings render as plain serif; {em:true} colours the line sage. */
  headline: { text: string; em?: boolean }[];
  sub?: string;
  bullets?: HeroBullet[];
  /** Optional in-hero price/offer block, rendered above the primary CTA.
   *  Purely additive — omit (or pass an empty object) to render nothing. */
  offer?: { totalValue?: string; todayPrice?: string; note?: string };
  primaryCta: { text: string; href: string; external?: boolean };
  secondaryCta?: { text: string; href: string; external?: boolean };
  media: HeroMedia;
  proof?: HeroProof;
  /** Optional background override for the section (defaults to soft sage wash). */
  background?: string;
  /** Slightly smaller headline clamp for long H1s. */
  compactHeadline?: boolean;
  /** Render the animated 3D sage wave-field motif (Three.js) behind the hero. */
  motif?: boolean;
};

function Stars({ size = 14 }: { size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1, color: '#caa44a' }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function CtaLink({
  cta,
  className,
  children,
}: {
  cta: { href: string; external?: boolean };
  className?: string;
  children: React.ReactNode;
}) {
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {children}
    </Link>
  );
}

export default function PageHero({
  eyebrow,
  headline,
  sub,
  bullets,
  offer,
  primaryCta,
  secondaryCta,
  media,
  proof,
  background,
  compactHeadline,
  motif,
}: PageHeroProps) {
  const headlineSize = compactHeadline
    ? 'clamp(23px, 2.7vw, 31px)'
    : 'clamp(26px, 3vw, 35px)';

  return (
    <section
      className="page-hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(104px, 13vh, 132px)',
        paddingBottom: 'clamp(20px, 4vh, 44px)',
        paddingLeft: 'clamp(16px, 4vw, 40px)',
        paddingRight: 'clamp(16px, 4vw, 40px)',
        overflow: 'hidden',
        background:
          background ||
          'radial-gradient(120% 90% at 85% 10%, #eef3ea 0%, #f6f4ef 45%, #ffffff 100%)',
      }}
    >
      {/* soft brand glow bed (decorative) */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: '-12%',
          right: '-8%',
          width: 460,
          height: 460,
          borderRadius: '50%',
          background: 'rgba(142,176,147,0.28)',
          filter: 'blur(90px)',
          zIndex: 0,
        }}
      />

      {/* animated 3D wave-field motif (Three.js) */}
      {motif && <HeroMotif />}

      <div
        className="page-hero-grid"
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gap: 'clamp(10px, 1.6vw, 24px)',
          alignItems: 'center',
        }}
      >
        {/* LEFT — message */}
        <div>
          {/* single badge pill, left (review proof lives under the CTA; award on the video) */}
          <div style={{ display: 'flex', marginBottom: 18 }}>
            <span className="hero-pill">
              <span style={{ fontFamily: WIDE, fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: SAGE_TEXT }}>
                #1 voted slimming clinic
              </span>
            </span>
          </div>

          {eyebrow && (
            <p
              style={{
                fontFamily: WIDE,
                fontSize: 12,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: TAUPE,
                margin: '0 0 14px',
              }}
            >
              {eyebrow}
            </p>
          )}

          <h1
            style={{
              fontFamily: HEADING,
              fontWeight: 400,
              fontSize: headlineSize,
              lineHeight: 1.1,
              textTransform: 'uppercase',
              color: SAGE_TEXT,
              margin: '0 0 18px',
              maxWidth: 650,
            }}
          >
            {headline.map((l, i) => (
              <span key={i} className="ph-hl-line" style={{ display: 'block', color: l.em ? '#7ba587' : undefined }}>
                {l.text}
              </span>
            ))}
          </h1>

          {sub && (
            <p
              style={{
                fontFamily: BODY,
                fontSize: 'clamp(14px, 1.1vw, 15.5px)',
                lineHeight: 1.6,
                color: TAUPE,
                maxWidth: 520,
                margin: '0 0 20px',
              }}
            >
              {sub}
            </p>
          )}

          {bullets && bullets.length > 0 && (
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 26px',
                display: 'grid',
                gap: 9,
                maxWidth: 540,
              }}
            >
              {bullets.map((b, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'rgba(142,176,147,0.20)',
                      display: 'grid',
                      placeItems: 'center',
                      marginTop: 1,
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke={SAGE_TEXT} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span style={{ fontFamily: BODY, fontSize: 13.5, color: TAUPE, lineHeight: 1.5 }}>
                    {b.label && <strong style={{ color: '#5a5043', fontWeight: 600 }}>{b.label} </strong>}
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* optional in-hero offer / price block — rendered ABOVE the primary CTA.
              Purely additive: nothing renders unless `offer` carries a value. */}
          {offer && (offer.totalValue || offer.todayPrice || offer.note) && (
            <div
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 2,
                margin: '0 0 16px',
                padding: '12px 18px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.66)',
                border: '1px solid rgba(2,76,39,0.14)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                boxShadow: '0 6px 20px rgba(2,76,39,0.07)',
              }}
            >
              {offer.totalValue && (
                <span
                  style={{
                    fontFamily: WIDE,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#6f6456',
                    textDecoration: 'line-through',
                    textDecorationColor: 'rgba(111,100,86,0.55)',
                  }}
                >
                  {offer.totalValue}
                </span>
              )}
              {offer.todayPrice && (
                <span
                  style={{
                    fontFamily: HEADING,
                    fontWeight: 400,
                    fontSize: 'clamp(24px, 2.6vw, 31px)',
                    lineHeight: 1.05,
                    textTransform: 'uppercase',
                    color: '#024C27',
                  }}
                >
                  {offer.todayPrice}
                </span>
              )}
              {offer.note && (
                <span style={{ fontFamily: BODY, fontSize: 12, color: '#5a5043', lineHeight: 1.4 }}>
                  {offer.note}
                </span>
              )}
            </div>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 18 }}>
            <CtaLink
              cta={primaryCta}
              className="cta-glow"
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '14px 28px',
                  fontFamily: WIDE,
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                {primaryCta.text}
              </span>
            </CtaLink>
            {secondaryCta && (
              <CtaLink cta={secondaryCta} className="hero-outline">
                {secondaryCta.text}
              </CtaLink>
            )}
          </div>

          {/* review proof under the CTA — single source of truth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Stars size={14} />
            <span style={{ fontFamily: BODY, fontSize: 13, color: TAUPE }}>
              <strong style={{ color: SAGE_TEXT }}>{proof?.rating || '4.9'}</strong> · {proof?.reviews || '800+'} verified client reviews
            </span>
          </div>
        </div>

        {/* RIGHT — arch media + floating proof cards */}
        <div
          className="page-hero-media"
          style={{ position: 'relative', justifySelf: 'center', width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div
            className="hero-arch"
            style={{
              position: 'relative',
              height: 'min(60vh, 540px)',
              // Match the video's own aspect so cover never crops its on-screen
              // text; images keep the 4/5 portrait crop.
              aspectRatio: media.aspect ?? (media.type === 'video' ? '406 / 720' : '4 / 5'),
              maxWidth: '100%',
              ...(media.bg ? { background: media.bg } : { background: '#0c0c0c' }),
            }}
          >
            {media.type === 'video' ? (
              // Server-render the poster as the LCP element so the browser fetches
              // it in the initial HTML (before JS hydrates). HeroVideoPlayer overlays
              // the play button and, on click, replaces this with the video.
              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
                {/* LCP anchor — rendered by server, correct preload injected by next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.poster || '/Thumbnail.webp'}
                  alt={media.alt || 'Carisma Slimming Malta'}
                  fetchPriority="high"
                  decoding="async"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: media.fit || 'cover', display: 'block' }}
                />
                <HeroVideoPlayer src={media.src} poster={media.poster} alt={media.alt} fit={media.fit || 'cover'} />
              </div>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={media.src}
                  alt={media.alt || 'Carisma Slimming Malta'}
                  style={{ width: '100%', height: '100%', objectFit: media.fit || 'cover', display: 'block' }}
                />
                {/* subtle bottom scrim so floating cards read cleanly over the photo */}
                {media.fit !== 'contain' && (
                  <span
                    aria-hidden
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background:
                        'linear-gradient(to top, rgba(18,28,20,0.36) 0%, rgba(18,28,20,0.06) 30%, transparent 58%)',
                    }}
                  />
                )}
              </>
            )}
          </div>

          {/* floating: 35+ years in business */}
          <div
            className="hero-glass hero-float"
            style={{
              position: 'absolute',
              left: 'clamp(-8px, -1vw, 0px)',
              bottom: '14%',
              borderRadius: 16,
              padding: '11px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              zIndex: 3,
            }}
          >
            <span style={{ fontFamily: HEADING, fontSize: 28, color: SAGE_TEXT, lineHeight: 1 }}>
              {proof?.statValue || '35+'}
            </span>
            <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: TAUPE, lineHeight: 1.3, maxWidth: 84 }}>
              {proof?.statLabel || 'years in business'}
            </span>
          </div>

          {/* floating: doctor-led */}
          <div
            className="hero-glass hero-float"
            style={{
              position: 'absolute',
              left: 'clamp(-10px, -1vw, -2px)',
              top: '16%',
              borderRadius: 999,
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              zIndex: 3,
              animationDelay: '-2.8s',
            }}
          >
            <span aria-hidden style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(142,176,147,0.22)', display: 'grid', placeItems: 'center' }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke={SAGE_TEXT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: SAGE_TEXT }}>Doctor-led</span>
          </div>

          {/* floating: award / stat card */}
          <div
            className="hero-glass hero-float-2"
            style={{
              position: 'absolute',
              right: 'clamp(-6px, -0.5vw, 4px)',
              top: '8%',
              borderRadius: 16,
              padding: '10px 13px',
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              maxWidth: 190,
              zIndex: 3,
            }}
          >
            {proof?.awardSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={proof.awardSrc} alt="" aria-hidden style={{ height: 34, width: 'auto' }} />
            ) : (
              <span style={{ fontFamily: HEADING, fontSize: 22, color: SAGE_TEXT, lineHeight: 1 }}>{proof?.statValue || '30+'}</span>
            )}
            <span style={{ fontFamily: WIDE, fontSize: 9.5, letterSpacing: '0.06em', textTransform: 'uppercase', color: SAGE_TEXT, lineHeight: 1.35, whiteSpace: 'pre-line' }}>
              {proof?.awardText || `${proof?.statLabel || 'years in wellness'}`}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .page-hero-grid { grid-template-columns: 1fr; }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(95,126,102,0.18);
          border-radius: 999px; padding: 7px 14px;
          backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
        }
        .hero-outline {
          display: inline-flex; align-items: center;
          padding: 13px 26px; border-radius: 999px;
          border: 1.5px solid ${SAGE_TEXT}; color: ${SAGE_TEXT};
          font-family: ${WIDE}; font-size: 12px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          text-decoration: none; transition: background 0.2s ease, color 0.2s ease;
        }
        .hero-outline:hover { background: ${SAGE_TEXT}; color: #fff; }
        @media (min-width: 900px) {
          .page-hero-grid { grid-template-columns: 60fr 40fr; }
          .page-hero-media { justify-self: end; }
        }
      `}</style>
    </section>
  );
}
