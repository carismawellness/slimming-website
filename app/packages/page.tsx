import type { Metadata } from 'next';
import Link from 'next/link';
import { getOrderedServices, BOOKING_URL } from '@/lib/services';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL as SITE, breadcrumbList } from '@/lib/seo/schema';
import PageHero from '@/components/PageHero';
import BookConsultationButton from '@/components/BookConsultationButton';

export const metadata: Metadata = {
  title: "Weight Loss Protocol | Malta's #1 Weight-Loss Clinic",
  description: "Discover Malta's only multidisciplinary approach to weight-loss. Drop dress sizes and boost energy without giving up pasta or wine nights! To book a free consultation with Carisma Slimming, call us on +356 27802062.",
  alternates: { canonical: 'https://www.carismaslimming.com/packages' },
};

const HEADING_FONT = '"Trajan Pro", serif';
const BODY_FONT = '"Novecento Wide", Roboto, sans-serif';
// Accessible brand-family colors (WCAG AA on white / #F5F2EF / #EFEAE5).
// GREEN: deep sage #4f7256 — clears AA as text, link, border, and CTA fill.
// TAUPE: darkened taupe #6f6456 — clears AA.
const GREEN = '#4f7256';
const TAUPE = '#6f6456';

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
          eyebrow="Carisma Slimming"
          compactHeadline
          headline={[
            { text: 'Body Contouring Packages' },
            { text: 'in Malta', em: true },
          ]}
          sub="Doctor-led, non-surgical treatments to freeze, dissolve, tone, tighten and detox — each a focused protocol with spa & fitness access included."
          bullets={[
            { text: 'Non-surgical fat freezing, dissolving & cavitation' },
            { text: 'Muscle toning, skin tightening & anti-cellulite' },
            { text: 'Spa & fitness access included with every protocol' },
          ]}
          primaryCta={{ text: 'Free Body Analysis', href: BOOKING_URL, external: true }}
          secondaryCta={{ text: 'Call 27802062', href: 'tel:+35627802062' }}
          media={{ type: 'video', src: '/IVana.mp4', poster: '/Thumbnail.png', alt: 'Carisma Slimming body contouring treatment demonstration in Malta' }}
          proof={{ rating: '4.9', reviews: '800+', awardSrc: '/Malta.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
        />

        {/* Packages grid */}
        <section aria-labelledby="packages-heading" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="packages-heading"
              className="text-3xl mb-10 text-center leading-tight"
              style={{ fontFamily: HEADING_FONT, color: TAUPE }}
            >
              Our Slimming &amp; Body Contouring Treatment Packages
            </h2>
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
                      className="flex items-center justify-center text-center px-4 border-b"
                      style={{
                        backgroundColor: '#EFEAE5',
                        borderColor: '#E5DED7',
                        color: TAUPE,
                        aspectRatio: '4 / 3',
                      }}
                      role="presentation"
                    >
                      <span className="text-sm" style={{ fontFamily: BODY_FONT }}>
                        [ {service.imagePlaceholder} ]
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      {/* P6 — H3 within card grid (H2 is section heading) */}
                      <h3
                        className="text-xl mb-1 leading-snug"
                        style={{ fontFamily: HEADING_FONT, color: TAUPE }}
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

        {/* Combined CTA */}
        <section aria-labelledby="cta-heading" className="py-24" style={{ backgroundColor: '#F5F2EF' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-heading"
              className="text-3xl mb-6 leading-tight"
              style={{ fontFamily: HEADING_FONT, color: TAUPE }}
            >
              Not Sure Which Body Contouring Package Is Right for You?
            </h2>
            <p
              className="mb-8 text-lg leading-relaxed max-w-prose mx-auto"
              style={{ color: TAUPE, fontFamily: BODY_FONT }}
            >
              Many clients combine multiple treatments as part of their comprehensive transformation
              plan. Our medical team will recommend the ideal combination based on your goals and a
              full body assessment.
            </p>
            {/* P2 — min 44×44px touch targets on all CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free body composition analysis (opens in new tab)"
                className="cta-glow text-white px-8 font-bold uppercase tracking-wide inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out active:scale-95"
                style={{ backgroundColor: GREEN, fontFamily: BODY_FONT }}
              >
                Book Free Body Analysis
              </a>
              <BookConsultationButton variant="outline" style={{ fontSize: '13px', minHeight: '44px' }} />
              <a
                href="tel:+35627802062"
                aria-label="Call us at +356 27802062"
                className="btn btn-secondary px-8 font-bold uppercase tracking-wide inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out active:scale-95"
                style={{ fontFamily: BODY_FONT }}
              >
                Call: +356 27802062
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
