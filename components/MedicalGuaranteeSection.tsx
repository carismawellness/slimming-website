import Image from 'next/image';
import CountUp from '@/components/CountUp';

/**
 * MedicalGuaranteeSection — the canonical "Up to 1kg per week · Medically
 * Guaranteed" promise/Extended-Care-Commitment block, used identically across
 * the site (home, GLP-1, weight-loss, slimming-guide, …) so the design never
 * drifts. Server component, no props — same content everywhere by construction.
 */

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
const bodyFont = 'Roboto, sans-serif';
const green = '#4f7256';
const taupe = '#6f6456';
const freshaUrl =
  'https://www.fresha.com/book-now/carisma-aesthetics-q8gqd4z1/services?lid=2843963&eid=5009163&oiid=sv%3A25969858&share=true&pId=2708191';

const conditions = [
  { label: 'Show up', text: 'Attend all scheduled in-clinic sessions and weekly check-ins' },
  { label: 'Follow your plan', text: 'Stick to your personalised food plan — tell us if you struggle' },
  { label: 'Stay active', text: 'Complete your agreed movement plan or discuss any obstacles' },
  { label: 'Medical only', text: 'Use only the treatments and medications our team recommends' },
  { label: 'Keep us informed', text: 'Tell us about any health changes, medication or new diagnosis' },
  { label: 'No shortcuts', text: 'Avoid crash diets or outside weight loss treatments' },
];

export default function MedicalGuaranteeSection() {
  return (
    <>
      {/* ── Guarantee band — light on-brand panel ── */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef3ea 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 44px)', paddingBottom: 0, overflow: 'hidden', position: 'relative' }}>
        {/* Decorative large watermark number */}
        <span aria-hidden style={{
          position: 'absolute', right: '-2%', top: '4%',
          fontFamily: headingFont, fontSize: 'clamp(180px,26vw,340px)', fontWeight: 400,
          color: 'rgba(79,114,86,0.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>1KG</span>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ textAlign: 'center', position: 'relative' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', border: `1px solid rgba(79,114,86,0.35)`, borderRadius: '999px', padding: '8px 20px', marginBottom: '36px', background: 'rgba(255,255,255,0.6)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="1.8" aria-hidden>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', color: green, textTransform: 'uppercase' }}>
              Medically Supported
            </span>
          </div>

          {/* Headline */}
          <h3 style={{ fontFamily: headingFont, fontSize: 'clamp(48px,8vw,88px)', fontWeight: 400, color: '#024C27', lineHeight: 0.95, textTransform: 'uppercase', marginBottom: '32px', letterSpacing: '-0.5px' }}>
            Up to <CountUp value="1KG" /><br />
            <em style={{ fontStyle: 'normal', color: green }}>Per Week.</em>
          </h3>

          <p style={{ fontFamily: bodyFont, fontSize: '17px', lineHeight: 1.7, color: taupe, maxWidth: '520px', margin: '0 auto 16px' }}>
            If you qualify and follow your personalised programme, we support you through your journey. Extended care applies when you&rsquo;re meeting your commitments.
          </p>
          <p style={{ fontFamily: headingFont, fontSize: '16px', color: green, fontStyle: 'italic', marginBottom: '64px' }}>
            This is our Extended Care Commitment.
          </p>
        </div>

        {/* 3 proof pillars */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '2px', borderTop: '1px solid rgba(79,114,86,0.18)' }}>
          {[
            { num: '1', stat: 'Doctor-Led', sub: 'Every programme is supervised by a qualified medical doctor from day one' },
            { num: '2', stat: 'Clinically Tracked', sub: 'Tanita body composition scans at every visit — real numbers, not guesses' },
            { num: '3', stat: 'Extended Until Done', sub: 'We keep going at no extra cost until you hit your agreed target weight' },
          ].map((item) => (
            <div key={item.num} style={{ padding: '32px 24px', borderRight: '1px solid rgba(79,114,86,0.14)', textAlign: 'center' }}>
              <span style={{ display: 'block', fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: green, textTransform: 'uppercase', marginBottom: '10px' }}>0{item.num}</span>
              <p style={{ fontFamily: headingFont, fontSize: '20px', color: '#024C27', marginBottom: '10px', textTransform: 'uppercase' }}>{item.stat}</p>
              <p style={{ fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.65, color: taupe }}>{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Conditions section ────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f6f9f3 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 72px)', paddingBottom: '12px' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '56px', alignItems: 'stretch' }}>

            {/* Photo + caption — image stretches to the full height of the list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', flex: 1, minHeight: '460px', borderTopLeftRadius: '16px', borderTopRightRadius: '72px', borderBottomLeftRadius: '72px', borderBottomRightRadius: '16px', overflow: 'hidden', boxShadow: '12px -12px 0 #C9D8C1' }}>
                <Image
                  src="/wix/87fc13_aea394ce5ab4485e8613221fa3617b8f~mv2.webp"
                  alt="Tanita body composition analysis at Carisma Slimming — your measurable baseline"
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
              <p style={{ fontFamily: bodyFont, fontSize: '12px', color: '#9B8D83', textAlign: 'center', marginTop: '16px', fontStyle: 'italic', letterSpacing: '0.5px' }}>
                Tanita body composition scan — your measurable baseline at every visit
              </p>
            </div>

            {/* Right: promise + conditions */}
            <div>
              <p style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', marginBottom: '10px' }}>
                How it works
              </p>
              <div style={{ width: '32px', height: '1px', background: '#C9B8AE', marginBottom: '20px' }} />
              <h3 style={{ fontFamily: headingFont, fontSize: '22px', fontWeight: 400, color: '#024C27', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.3, marginBottom: '18px' }}>
                To Maximize Your Success, We Require Your Full Commitment To:
              </h3>
              <p style={{ fontFamily: bodyFont, fontSize: '14.5px', lineHeight: 1.8, color: taupe, marginBottom: '32px', borderLeft: '2px solid #C9D8C1', paddingLeft: '16px' }}>
                When you qualify and follow your personalised programme, we support you with extended care. Results depend on your commitment to the program, your individual response, and adherence to your plan.
              </p>

              <p style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#9B8D83', marginBottom: '16px' }}>
                To receive this guarantee, you agree to:
              </p>

              {/* Conditions — full-width stacked list */}
              <div>
                {conditions.map((c, i) => (
                  <div
                    key={c.label}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'flex-start',
                      padding: '14px 0',
                      borderBottom: i < conditions.length - 1 ? '1px solid rgba(79,114,86,0.1)' : 'none',
                    }}
                  >
                    <span style={{ fontFamily: headingFont, fontSize: '14px', color: 'rgba(79,114,86,0.25)', flexShrink: 0, minWidth: '24px', paddingTop: '1px' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span style={{ fontFamily: wideFont, fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: green, display: 'block', marginBottom: '3px' }}>{c.label}</span>
                      <p style={{ fontFamily: bodyFont, fontSize: '13px', lineHeight: 1.6, color: taupe, margin: 0 }}>{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px' }}>
                <a
                  href={freshaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-glow"
                  style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', fontFamily: wideFont, fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', textDecoration: 'none', color: '#fff', padding: '16px 24px', borderRadius: '999px', minHeight: '52px' }}
                >
                  Get Your Free Body Composition Analysis
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
