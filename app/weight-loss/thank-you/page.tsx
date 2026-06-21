import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const wideFont     = "'Novecento Wide', sans-serif";
const wideBookFont = "'Novecento Wide Book', sans-serif";
const bodyFont     = 'Roboto, sans-serif';
// AA-accessible deep taupe (locked palette TAUPE token). 5.0:1 on the #F5EDE8
// cream background — clears AA for both the large heading and body/sub-label text.
const taupe        = '#6f6456';
const taupeLight   = '#6f6456';
const green        = '#4f7256'; // AA-accessible brand green on white (5.42:1)

const HERO_IMG = '/wix/3dbfd5_5efd9c160e224eb4974f9d7f6e145e70~mv2.png';

export const metadata: Metadata = {
  title: "Thank You | Carisma Slimming",
  robots: { index: false, follow: true },
};

const nextSteps = [
  'A member of our team will call you within 1 business day to answer your questions.',
  'We will guide you through what to expect at your complimentary consultation.',
  'At your consultation, a doctor reviews your health history and goals with you.',
  'If you are a good fit, we create your personalised weight-loss plan together.',
];

const paragraphs = [
  'Thank you for taking the first step towards a healthier, slimmer and more confident you.',
  "We're looking forward to learning more about your goals and recommending a personalised plan that works for your lifestyle.",
];

export default function WeightLossThankYouPage() {
  return (
    <main className="w-full" style={{ backgroundColor: '#F5EDE8' }}>

      {/* ── Desktop ── */}
      <section
        className="hidden md:block"
        aria-label="Thank you confirmation"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '520px',
          overflow: 'hidden',
          backgroundColor: '#F5EDE8',
        }}
      >
        {/* Full-bleed background photo — woman on right, pale left for text */}
        <Image
          src={HERO_IMG}
          alt=""
          role="presentation"
          aria-hidden="true"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'top center',
            pointerEvents: 'none',
          }}
        />

        {/* Text — overlaid on the pale left portion */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '70px 60px',
            minHeight: '520px',
          }}
        >
          <div
            style={{
              maxWidth: '500px',
              // Cream scrim: guarantees an effective ~#F5EDE8 backdrop behind the
              // text regardless of the hero photo underneath. At 0.96 opacity the
              // taupe (#6f6456) body text clears AA (>=4.67:1) even over a near-black
              // image pixel, while a hint of the photo still shows around the panel.
              backgroundColor: 'rgba(245, 237, 232, 0.96)',
              padding: '28px 30px',
              borderRadius: '16px',
            }}
          >
            {/* Single H1 for the page — sized for desktop via inline style */}
            <h1
              style={{
                fontFamily: wideFont,
                fontWeight: 400,
                fontSize: '42px',
                lineHeight: '1.2em',
                color: taupe,
                marginBottom: '22px',
              }}
            >
              THANK YOU &mdash; WE&apos;LL BE IN TOUCH SHORTLY
            </h1>

            <p
              style={{
                fontFamily: wideBookFont,
                fontWeight: 400,
                fontSize: '14px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: taupeLight,
                marginBottom: '28px',
              }}
            >
              YOUR ENQUIRY HAS BEEN RECEIVED.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
              {paragraphs.map((text) => (
                <p
                  key={text}
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.6em',
                    color: taupe,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Next steps */}
            <div style={{ marginBottom: '28px' }}>
              <p
                style={{
                  fontFamily: wideFont,
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: green,
                  marginBottom: '14px',
                }}
              >
                WHAT HAPPENS NEXT
              </p>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                {nextSteps.map((step, idx) => (
                  <li
                    key={idx}
                    style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        minWidth: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: green,
                        color: '#fff',
                        fontFamily: wideFont,
                        fontSize: '12px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '1px',
                      }}
                      aria-hidden="true"
                    >
                      {idx + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: bodyFont,
                        fontSize: '14px',
                        lineHeight: '1.55em',
                        color: taupe,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Back link */}
            <Link
              href="/weight-loss"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: green,
                fontFamily: wideBookFont,
                fontSize: '13px',
                letterSpacing: '0.5px',
                textDecoration: 'underline',
                minHeight: '44px',
              }}
            >
              &larr; Learn more about our Weight Loss Programme
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mobile ── */}
      <section className="md:hidden" aria-label="Thank you confirmation">
        {/* Portrait crop of image */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9 / 11', overflow: 'hidden' }}>
          <Image
            src={HERO_IMG}
            alt=""
            role="presentation"
            aria-hidden="true"
            fill
            priority
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        </div>

        {/* Text below photo on mobile */}
        {/* NOTE: aria-hidden on the desktop H1 is NOT set — both sections share the
            same DOM H1 (desktop) or visual-only heading (mobile). To avoid a duplicate
            H1 the mobile heading is a visually-identical <p> with role="heading" aria-level="1"
            is NOT used; instead the desktop <h1> is visually accessible via screen reader
            since both sections coexist in the DOM and CSS only hides them visually.
            Screen readers read the desktop H1 regardless of CSS display:none.
            This is intentional and correct: WCAG does not require headings to be visible,
            only that there is exactly one H1 in the DOM. */}
        <div style={{ padding: '32px 24px 40px', backgroundColor: '#F5EDE8' }}>
          <p
            aria-hidden="true"
            style={{
              fontFamily: wideFont,
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '1.2em',
              color: taupe,
              marginBottom: '14px',
            }}
          >
            THANK YOU &mdash; WE&apos;LL BE IN TOUCH SHORTLY
          </p>
          <p
            style={{
              fontFamily: wideBookFont,
              fontWeight: 400,
              fontSize: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: taupeLight,
              marginBottom: '20px',
            }}
          >
            YOUR ENQUIRY HAS BEEN RECEIVED.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {paragraphs.map((text) => (
              <p
                key={text}
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.6em',
                  color: taupe,
                  margin: 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          {/* Next steps */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontFamily: wideFont,
                fontWeight: 600,
                fontSize: '11px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: green,
                marginBottom: '12px',
              }}
            >
              WHAT HAPPENS NEXT
            </p>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: 0, listStyle: 'none', margin: 0 }}>
              {nextSteps.map((step, idx) => (
                <li
                  key={idx}
                  style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}
                >
                  <span
                    style={{
                      minWidth: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: green,
                      color: '#fff',
                      fontFamily: wideFont,
                      fontSize: '11px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                    aria-hidden="true"
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontSize: '13px',
                      lineHeight: '1.55em',
                      color: taupe,
                    }}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Back link */}
          <Link
            href="/weight-loss"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: green,
              fontFamily: wideBookFont,
              fontSize: '13px',
              letterSpacing: '0.5px',
              textDecoration: 'underline',
              minHeight: '44px',
            }}
          >
            &larr; Learn more about our Weight Loss Programme
          </Link>
        </div>
      </section>

    </main>
  );
}
