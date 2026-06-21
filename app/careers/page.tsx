import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Join the Team at Carisma Slimming | #1 Award Winning Chain",
  description: "Join the team at Carisma Slimming and take your career to the next level. We are Malta's number one award winning chain, offering top-quality slimming treatments.",
  alternates: { canonical: 'https://www.carismaslimming.com/careers' },
};

const headingFont = 'Trajan Pro, serif';
const wideFont = 'Novecento Wide Book, sans-serif';
// Darkened taupe (locked accessible palette) so text/icons/fills clear AA on
// white (5.78:1) and on the CREAM #F6EFE3 band (5.06:1). Was #B0A68F (2.41:1 FAIL).
const TAUPE = '#6f6456';
const CREAM = '#F6EFE3';
const RULE = '#D9E4E4';

// Live page: four requirement lines separated by two blank lines each,
// with a decorative pale rule overlaid left of the text every 96px.
const REQUIREMENTS = [
  'Want to work in the best 5 star hotels',
  'Are hard working and motivated',
  'Ambitions of high earnings',
  'Fluent in multiple languages (English, German, French, Italian, Russian, etc.)',
];

export default function CareersPage() {
  return (
    <main className="w-full overflow-x-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* HERO — Join the team */}
      <section className="relative" style={{ paddingTop: '85px' }}>
        {/* Heading (live DOM is uppercase; Trajan renders it exactly) */}
        <div className="px-4">
          <h1
            className="text-center mx-auto"
            style={{
              color: TAUPE,
              fontFamily: headingFont,
              fontWeight: 400,
              fontSize: '35px',
              lineHeight: '49px',
              maxWidth: '735px',
            }}
          >
CAREERS IN MALTA — JOIN CARISMA SLIMMING&apos;S #1 WEIGHT LOSS CLINIC TEAM
          </h1>
        </div>

        {/* Thin vertical divider (overlaps the cream band top, as on live) */}
        <div
          className="relative mx-auto"
          style={{ width: '1px', height: '83px', backgroundColor: TAUPE, marginTop: '44px', zIndex: 10 }}
        />

        {/* Photo with full-bleed cream band behind its upper part */}
        <div className="relative" style={{ marginTop: '74px' }}>
          <div
            className="absolute pointer-events-none"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100vw',
              top: '-116px',
              height: '357px',
              backgroundColor: CREAM,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/wix/eac6309c7e924921acd0cd838be3c271.jpg"
            alt="Beautician"
            className="relative mx-auto w-full object-cover px-4 sm:px-0"
            style={{ maxWidth: '735px', aspectRatio: '3 / 2', borderRadius: '16px' }}
          />
        </div>

        {/* Caption — live DOM is lowercase; Trajan Pro renders it as caps/small caps */}
        <div className="px-4">
          <p
            className="mx-auto"
            style={{
              color: TAUPE,
              fontFamily: headingFont,
              fontWeight: 400,
              fontSize: '25px',
              lineHeight: '35px',
              textAlign: 'justify',
              maxWidth: '735px',
              marginTop: '49px',
            }}
          >
            our company is growing fast, and we are always on the look out for ambitious and talented people.
          </p>
        </div>
      </section>

      {/* IF YOU... requirements + Apply */}
      <section style={{ paddingTop: '50px', paddingBottom: '64px' }}>
        <div className="mx-auto" style={{ maxWidth: '980px' }}>
          <div className="relative flex flex-col lg:flex-row lg:items-start">
            {/* Handshake photo — bleeds 150px left of the 980px grid on desktop */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wix/f940f0_b93ac2a5ad5a4d148afac21f35018a88~mv2.png"
              alt="Handshake"
              className="w-full object-cover lg:flex-none lg:w-[883px] lg:h-[585px] lg:-ml-[150px]"
              style={{ borderRadius: '16px' }}
            />

            {/* White panel overlapping the photo's right edge, behind the text (as on live) */}
            <div
              className="absolute hidden lg:block"
              style={{ left: '491px', top: '76px', width: '639px', height: '653px', backgroundColor: '#FFFFFF' }}
            />

            {/* Right column — sits on the white panel on desktop */}
            <div className="relative z-10 px-4 mt-10 lg:flex-none lg:px-0 lg:mt-[134px] lg:w-[516px] lg:-ml-[186px]">
              <h2
                className="lg:pl-[19px]"
                style={{
                  color: TAUPE,
                  fontFamily: wideFont,
                  fontWeight: 400,
                  fontSize: '25px',
                  lineHeight: '35px',
                  textTransform: 'uppercase',
                }}
              >
WELLNESS &amp; HEALTHCARE PROFESSIONALS WE&apos;RE HIRING FOR
              </h2>

              <div className="relative" style={{ marginTop: '71px', paddingLeft: '19px' }}>
                {/* Decorative pale rules, evenly spaced every 96px as on live */}
                {[0, 96, 192, 288].map((t) => (
                  <div
                    key={t}
                    className="absolute"
                    style={{ left: 0, top: `${t - 9}px`, width: '5px', height: '49px', backgroundColor: RULE }}
                  />
                ))}
                {REQUIREMENTS.map((line, i) => (
                  <p
                    key={i}
                    style={{
                      color: TAUPE,
                      fontFamily: wideFont,
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '1.8em',
                      letterSpacing: '3.6px',
                      textTransform: 'uppercase',
                      marginBottom: i < REQUIREMENTS.length - 1 ? '65px' : 0,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* APPLY NOW — live links to /contact, which is local /consultation */}
          <div className="flex justify-center" style={{ marginTop: '67px' }}>
            <Link
              href="/consultation"
              className="btn btn-primary"
              style={{
                width: '243px',
                height: '63px',
                fontFamily: wideFont,
                fontWeight: 400,
                fontSize: '16px',
                textTransform: 'uppercase',
              }}
            >
              APPLY NOW
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
