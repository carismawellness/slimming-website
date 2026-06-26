import type { Metadata } from 'next';
import Link from 'next/link';
import { getOrderedServices, BOOKING_URL } from '@/lib/services';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL as SITE, breadcrumbList } from '@/lib/seo/schema';
import PageHero from '@/components/PageHero';
import BookConsultationButton from '@/components/BookConsultationButton';

export const metadata: Metadata = {
  title: "Body Contouring Packages Malta | Carisma Slimming",
  description: "Doctor-led, non-surgical body contouring packages in Malta — fat freezing, dissolving, muscle toning & skin tightening. Free body analysis included. Book now.",
  alternates: { canonical: 'https://www.carismaslimming.com/packages' },
  openGraph: {
    title: "Body Contouring Packages Malta | Carisma Slimming",
    description: "Doctor-led, non-surgical body contouring packages in Malta — fat freezing, dissolving, muscle toning & skin tightening. Free body analysis included. Book now.",
    url: 'https://www.carismaslimming.com/packages',
    images: [{ url: '/background.avif', width: 1200, height: 630, alt: 'Body Contouring Packages Malta — Carisma Slimming' }],
  },
};

const HEADING_FONT = '"Trajan Pro", serif';
const BODY_FONT = '"Novecento Wide", Roboto, sans-serif';
// Locked brand tokens (DESIGN_LANGUAGE §1 — all WCAG AA on white / soft sage washes).
// GREEN: sage #4f7256 — buttons, links, eyebrows, icons.
// HEADING: dark sage #3c5a40 — section H2/H3.
// TAUPE: card-body taupe #6f6456 — body copy on light surfaces.
// BODY_COLOR: secondary #595959 — sub copy.
const GREEN = '#4f7256';
const HEADING_COLOR = '#3c5a40';
const TAUPE = '#6f6456';
const BODY_COLOR = '#595959';

export default function PackagesPage() {
  const servicesList = getOrderedServices();

  const schema = [
    breadcrumbList([
      { name: 'Home', url: `${SITE}/` },
      { name: 'Packages', url: `${SITE}/packages` },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Weight Loss & Body Contouring Packages in Malta',
      itemListElement: servicesList.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.treatment,
        url: `${SITE}/packages/${s.id}`,
      })),
    },
  ];

  return (
    <>
      {/* P1 — Skip-to-main-content link: first focusable element */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-white focus:text-sm focus:font-bold focus:underline focus:shadow-lg"
        style={{ color: GREEN }}
      >
        Skip to main content
      </a>

      <main id="main-content" className="w-full">
        <JsonLd data={schema} />

        {/* P9 — Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <ol className="flex items-center gap-2 text-sm" style={{ color: TAUPE, fontFamily: BODY_FONT }}>
            <li>
              <Link
                href="/"
                className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 transition-colors duration-200"
                style={{ color: GREEN }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">/</li>
            <li aria-current="page" style={{ color: TAUPE }}>Packages</li>
          </ol>
        </nav>

        {/* Hero */}
        <PageHero
          motif
          eyebrow="Carisma Slimming"
          compactHeadline
          headline={[
            { text: 'Body Contouring Packages' },
            { text: 'in Malta', em: true },
          ]}
          sub={<>Doctor-led, non-surgical treatments to freeze, dissolve, tone, tighten and support fluid retention — each a focused protocol with <a href="https://www.carismaspa.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Carisma Spa</a> &amp; fitness access included.</>}
          bullets={[
            { text: 'Non-surgical fat freezing, dissolving & cavitation' },
            { text: 'Muscle toning, skin tightening & anti-cellulite' },
            { text: 'Spa & fitness access included with every protocol' },
          ]}
          primaryCta={{ text: 'Free Body Analysis', href: BOOKING_URL, external: true }}
          secondaryCta={{ text: 'Call 27802062', href: 'tel:+35627802062' }}
          media={{ type: 'video', src: '/IVana.mp4', poster: '/Thumbnail.webp', alt: 'Carisma Slimming body contouring treatment demonstration in Malta' }}
          proof={{ rating: '4.9', reviews: '800+', awardSrc: '/Malta.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
        />

        {/* Packages grid — white → soft sage wash so it flows into the CTA section below */}
        <section
          aria-labelledby="packages-heading"
          style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f5f8f2 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header pattern: eyebrow → 64px rule → Trajan H2 → sub */}
            <div className="text-center max-w-[620px] mx-auto mb-12">
              <p
                className="uppercase"
                style={{ fontFamily: BODY_FONT, fontSize: 12, letterSpacing: '3px', color: GREEN, margin: 0 }}
              >
                Our Protocols
              </p>
              <span
                aria-hidden="true"
                style={{ display: 'block', width: 64, height: 1, background: GREEN, margin: '18px auto' }}
              />
              <h2
                id="packages-heading"
                className="leading-tight uppercase"
                style={{ fontFamily: HEADING_FONT, color: HEADING_COLOR, fontSize: 'clamp(24px, 3.4vw, 34px)' }}
              >
                Our Slimming &amp; Body Contouring Treatment Packages
              </h2>
              <p
                className="mt-5"
                style={{ fontFamily: BODY_FONT, color: BODY_COLOR, fontSize: 16, lineHeight: 1.6 }}
              >
                Each package is a focused, doctor-led protocol — choose your goal, and we&rsquo;ll tailor
                the combination at your{' '}
                <Link
                  href="/consultation"
                  style={{ color: GREEN, textDecorationColor: GREEN }}
                  className="underline underline-offset-2 hover:opacity-75 transition-opacity"
                >
                  free body analysis
                </Link>
                .
              </p>
            </div>
            {/* P5 — mobile-first grid: 1 col → 2 col → 3 col */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesList.map((service) => (
                <Link
                  key={service.id}
                  href={`/packages/${service.id}`}
                  /* P2 — cursor-pointer, transition; P1 — accessible focus ring */
                  className="group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 rounded-xl"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                  aria-label={`View ${service.treatment} package details`}
                >
                  <article className="card overflow-hidden h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-lg group-active:scale-[0.99]">
                    {/* P3 — fixed aspect ratio prevents layout shift */}
                    <div
                      className="flex items-center justify-center text-center px-4 transition-transform duration-300 ease-in-out group-hover:scale-[1.05]"
                      style={{
                        background: 'linear-gradient(180deg, #F2F6EF 0%, #DEEBEB 100%)',
                        color: GREEN,
                        aspectRatio: '4 / 3',
                      }}
                      role="presentation"
                    >
                      <span className="text-sm uppercase tracking-wide" style={{ fontFamily: BODY_FONT }}>
                        {service.imagePlaceholder}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {/* P6 — H3 within card grid (H2 is section heading) */}
                      <h3
                        className="text-xl mb-1 leading-snug uppercase"
                        style={{ fontFamily: HEADING_FONT, color: HEADING_COLOR }}
                      >
                        {service.treatment}
                      </h3>
                      {service.packages[0] && (
                        <p
                          className="font-semibold mb-3 text-sm uppercase tracking-wide"
                          style={{ color: GREEN, fontFamily: BODY_FONT }}
                        >
                          {service.packages[0].name}
                        </p>
                      )}
                      <p
                        className="mb-4 text-sm flex-1 leading-relaxed"
                        style={{ color: TAUPE }}
                      >
                        {service.cardDescription}
                      </p>
                      {service.packages[0] && (
                        <p className="mb-4 text-sm font-bold" style={{ color: GREEN }}>
                          {service.packages[0].price}
                        </p>
                      )}
                      {/* P10 — specific CTA text; aria-hidden since link wraps the card */}
                      <span
                        className="font-semibold text-sm uppercase tracking-wide underline underline-offset-4 transition-colors duration-200 group-hover:opacity-80"
                        style={{ color: GREEN, fontFamily: BODY_FONT }}
                        aria-hidden="true"
                      >
                        View {service.treatment} Package &rarr;
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Combined CTA — starts at the grid's end color (#f6f4ef) and resolves to white (no seam) */}
        <section
          aria-labelledby="cta-heading"
          style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f6f4ef 50%, #ffffff 100%)', paddingTop: 'clamp(12px, 3vw, 96px)', paddingBottom: 'clamp(12px, 3vw, 96px)' }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Section header pattern */}
            <p
              className="uppercase"
              style={{ fontFamily: BODY_FONT, fontSize: 12, letterSpacing: '3px', color: GREEN, margin: 0 }}
            >
              Not Sure Where to Start?
            </p>
            <span
              aria-hidden="true"
              style={{ display: 'block', width: 64, height: 1, background: GREEN, margin: '18px auto' }}
            />
            <h2
              id="cta-heading"
              className="mb-6 leading-tight uppercase"
              style={{ fontFamily: HEADING_FONT, color: HEADING_COLOR, fontSize: 'clamp(24px, 3.4vw, 34px)' }}
            >
              Not Sure Which Body Contouring Package Is Right for You?
            </h2>
            <p
              className="mb-8 text-lg leading-relaxed max-w-prose mx-auto"
              style={{ color: BODY_COLOR, fontFamily: BODY_FONT }}
            >
              Many clients combine multiple treatments as part of their{' '}
              <Link
                href="/weight-loss"
                style={{ color: GREEN, textDecorationColor: GREEN }}
                className="underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                comprehensive weight loss programme
              </Link>
              . Our medical team will recommend the ideal combination based on your goals and a
              full body assessment.
            </p>
            {/* P2 — min 44×44px touch targets on all CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              {/* Primary — .cta-glow provides the sage gradient + glow halo; no bg override */}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free body composition analysis (opens in new tab)"
                className="cta-glow text-white px-8 font-bold uppercase tracking-wide inline-flex items-center justify-center min-h-[44px]"
                style={{ fontFamily: BODY_FONT }}
              >
                Book Free Body Analysis
              </a>
              {/* Secondary — sage outline */}
              <BookConsultationButton variant="outline" style={{ fontSize: '13px', minHeight: '44px' }} />
              <a
                href="tel:+35627802062"
                aria-label="Call us at +356 27802062"
                className="btn btn-secondary px-8 font-bold uppercase tracking-wide inline-flex items-center justify-center min-h-[44px]"
                style={{ fontFamily: BODY_FONT }}
              >
                Call: +356 27802062
              </a>
            </div>
            {/* Contextual links to related programmes */}
            <p
              className="mt-8 text-sm leading-relaxed"
              style={{ color: BODY_COLOR, fontFamily: BODY_FONT }}
            >
              Considering medical support?{' '}
              <Link
                href="/glp1"
                style={{ color: GREEN, textDecorationColor: GREEN }}
                className="underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                Explore our GLP-1 weight loss injections
              </Link>
              . Want to learn more first?{' '}
              <Link
                href="/slimming-guide"
                style={{ color: GREEN, textDecorationColor: GREEN }}
                className="underline underline-offset-2 hover:opacity-75 transition-opacity"
              >
                Download our free slimming guide
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
