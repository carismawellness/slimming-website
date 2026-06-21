import type { Metadata } from 'next';

const wideFont     = "'Novecento Wide', sans-serif";
const wideBookFont = "'Novecento Wide Book', sans-serif";
const bodyFont     = 'Roboto, sans-serif';
// Darkened taupe (from #9B8D83) so it clears WCAG AA on the #F5EDE8 cream panel
// and over the hero image (guaranteed by the cream scrim behind the text column).
// #6f6456 = 5.00:1 on cream; >= 4.58:1 worst-case over the 0.96-opacity scrim.
const taupe        = '#6f6456';
// Muted subline kept in the same taupe family; hierarchy preserved via size/letter-spacing/uppercase.
const taupeLight   = '#6f6456';

const HERO_IMG = '/wix/3dbfd5_5efd9c160e224eb4974f9d7f6e145e70~mv2.png';

export const metadata: Metadata = {
  title: "Thank You | Carisma Slimming",
  robots: { index: false, follow: true },
};

const paragraphs = [
  'Thank you for taking the first step towards a healthier, slimmer and more confident you.',
  "We're looking forward to learning more about your goals and recommending a personalised plan that works for your lifestyle.",
  'A member of our team will be in touch shortly to answer your questions and guide you through the next steps.',
];

export default function ThankYouPage() {
  return (
    <main className="w-full" style={{ backgroundColor: '#F5EDE8' }}>

      {/* ── Desktop ── */}
      <section
        className="hidden md:block"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '520px',
          overflow: 'hidden',
          backgroundColor: '#F5EDE8',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMG}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-4%',
            left: 0,
            width: '100%',
            height: '115%',
            objectFit: 'cover',
            objectPosition: 'top center',
            pointerEvents: 'none',
          }}
        />

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
          {/* Cream scrim behind the text column guarantees AA contrast over the hero image:
              rgba(245,237,232,0.96) yields worst-case 4.58:1 (black image) / 5.03:1 (white) for #6f6456 text. */}
          <div
            style={{
              maxWidth: '430px',
              backgroundColor: 'rgba(245, 237, 232, 0.96)',
              padding: '28px 30px',
              borderRadius: '4px',
            }}
          >
            <h1
              style={{
                fontFamily: wideFont,
                fontWeight: 400,
                fontSize: '52px',
                lineHeight: '1.2em',
                color: taupe,
                marginBottom: '22px',
              }}
            >
              THANK YOU — WE&rsquo;LL BE IN TOUCH SHORTLY
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

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {paragraphs.map((text) => (
                <p
                  key={text}
                  style={{
                    fontFamily: bodyFont,
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '1.55em',
                    color: taupe,
                    margin: 0,
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile ── */}
      <section className="md:hidden">
        <div style={{ position: 'relative', width: '100%', aspectRatio: '9 / 11', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-4%',
              left: '-33%',
              width: '170%',
              height: 'auto',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div style={{ padding: '32px 24px 40px', backgroundColor: '#F5EDE8' }}>
          {/* Mobile heading rendered as styled <p> (not <h1>) so the page keeps exactly one <h1> in the DOM */}
          <p
            style={{
              fontFamily: wideFont,
              fontWeight: 400,
              fontSize: '32px',
              lineHeight: '1.2em',
              color: taupe,
              marginBottom: '14px',
            }}
          >
            THANK YOU — WE&rsquo;LL BE IN TOUCH SHORTLY
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {paragraphs.map((text) => (
              <p
                key={text}
                style={{
                  fontFamily: bodyFont,
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.55em',
                  color: taupe,
                  margin: 0,
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
