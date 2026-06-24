// HeroSection — brand-compliant hero for Carisma Slimming
// Persona: Katya | Tone: compassionate, shame-free, evidence-led, future-focused
// Palette: deep-forest #024C27, accessible sage #4f7256 (text), taupe #6f6456 (body)
// WCAG AA: all text tokens meet ≥4.5:1 contrast. No blue gradient.
// NOTE: The homepage uses <PageHero> instead. This component is available for
// other routes that need a self-contained hero block.

import Link from 'next/link';

const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
// Deep forest: white text = 10.7:1 — AAA
const ctaBg = '#024C27';
// Accessible sage: used for outline border + text (5.42:1 on white)
const sageBorder = '#4f7256';
const sageText = '#4f7256';
// Taupe body text: 5.78:1 on white — AA
const taupe = '#6f6456';

export default function HeroSection() {
  return (
    <section
      className="py-20"
      aria-labelledby="hero-heading"
      style={{ background: 'linear-gradient(135deg, #F8F6F2 0%, #EAF0E9 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p
              className="mb-4"
              aria-hidden="true"
              style={{ color: sageText, fontFamily: wideFont, fontSize: '13px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}
            >
              #1 voted slimming clinic in Malta
            </p>
            <h1
              id="hero-heading"
              className="mb-6"
              style={{ color: '#024C27', fontFamily: 'Trajan Pro, serif', fontWeight: 400, fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.25, textTransform: 'uppercase' }}
            >
              Doctor-Led Slimming &amp; Weight Loss in Malta
            </h1>
            <p className="mb-4" style={{ color: taupe, fontFamily: bodyFont, fontSize: '17px', lineHeight: 1.7, maxWidth: '52ch' }}>
              Build measured weekly progress with our comprehensive medical programme — personalised to your body, your hormones, and your life.
            </p>
            <p className="mb-8" style={{ color: taupe, fontFamily: bodyFont, fontSize: '15px', lineHeight: 1.7, maxWidth: '52ch' }}>
              Medical assessment, personalised nutrition, exercise guidance, and non-invasive body contouring treatments — all in one doctor-led plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center font-bold text-white transition-all duration-200 ease-in-out hover:opacity-90 active:scale-95"
                style={{ backgroundColor: ctaBg, borderRadius: '999px', minHeight: '52px', padding: '0 32px', fontFamily: wideFont, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}
              >
                Get Free Body Analysis
              </Link>
              <a
                href="tel:+35627802062"
                className="inline-flex items-center justify-center font-semibold transition-all duration-200 ease-in-out hover:bg-opacity-10 active:scale-95"
                style={{ color: sageText, border: `2px solid ${sageBorder}`, borderRadius: '999px', minHeight: '52px', padding: '0 32px', fontFamily: wideFont, fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', background: 'transparent' }}
                aria-label="Call us at plus 356 2780 2062"
              >
                Call: +356 2780 2062
              </a>
            </div>
          </div>
          {/* Placeholder — replace with <HeroVideo> or <Image> when asset is available */}
          <div
            className="rounded-[24px] flex items-center justify-center"
            style={{ minHeight: '400px', background: 'linear-gradient(180deg, #C9D8C1 0%, #8EB093 100%)' }}
            aria-hidden="true"
            role="presentation"
          >
            <span style={{ color: '#4f7256', fontFamily: wideFont, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Hero media
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
