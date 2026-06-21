import type { Metadata } from 'next';
import Link from 'next/link';
import { getOrderedServices, BOOKING_URL } from '@/lib/services';
import { JsonLd } from '@/lib/seo/JsonLd';
import { SITE_URL as SITE, breadcrumbList } from '@/lib/seo/schema';
import PageHero from '@/components/PageHero';
import BookConsultationButton from '@/components/BookConsultationButton';

export const metadata: Metadata = {
  title: "Body Contouring Packages Malta | Carisma Slimming",
  description: "Explore Malta's most effective weight loss packages — fat freezing, fat dissolving, muscle stimulation, skin tightening and more. Medically supervised at Carisma Slimming.",
  alternates: { canonical: 'https://www.carismaslimming.com/packages' },
};

const HEADING_FONT = '"Trajan Pro", serif';
const BODY_FONT = '"Novecento Wide", Roboto, sans-serif';
// Accessible brand-family colors (WCAG AA on white / #F5F2EF / #EFEAE5).
// GREEN: deep sage --brand-green-text/fill #4f7256 — same green family, darkened
// from #8EB093 (2.39:1 fail) to clear AA as text, link, border, and CTA fill.
// TAUPE: darkened taupe #6f6456 from #9B8D83/#AFA39D (2.2-3.2:1 fail) — clears AA.
const GREEN = '#4f7256';
const TAUPE = '#6f6456';
const TAUPE_LIGHT = '#6f6456';

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
    <main className="w-full">
      <JsonLd data={schema} />
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
        primaryCta={{ text: 'Free Consultation', href: BOOKING_URL, external: true }}
        secondaryCta={{ text: 'Call 27802062', href: 'tel:+35627802062' }}
        media={{ type: 'video', src: '/IVana.mp4', poster: '/Thumbnail.png', alt: 'Carisma Slimming body contouring in Malta' }}
        proof={{ rating: '4.9', reviews: '200+', awardSrc: '/Malta.png', awardText: '#1 voted clinic\nMalta 2025–26' }}
      />

      {/* Packages grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl mb-10 text-center"
            style={{ fontFamily: HEADING_FONT, color: TAUPE }}
          >
            Our Slimming &amp; Body Contouring Treatment Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service) => (
              <Link key={service.id} href={`/packages/${service.id}`} className="group">
                <div className="card overflow-hidden h-full flex flex-col">
                  {/* Image placeholder */}
                  <div
                    className="h-48 flex items-center justify-center text-center px-4 border-b"
                    style={{ backgroundColor: '#EFEAE5', borderColor: '#E5DED7', color: TAUPE_LIGHT }}
                  >
                    <span className="text-sm" style={{ fontFamily: BODY_FONT }}>
                      [ {service.imagePlaceholder} ]
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl mb-1" style={{ fontFamily: HEADING_FONT, color: TAUPE }}>
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
                    <p className="mb-4 text-sm flex-1" style={{ color: TAUPE_LIGHT }}>
                      {service.cardDescription}
                    </p>
                    {service.packages[0] && (
                      <p className="mb-4 text-sm font-bold" style={{ color: GREEN }}>
                        {service.packages[0].price}
                      </p>
                    )}
                    <span
                      className="font-semibold text-sm uppercase tracking-wide underline underline-offset-4"
                      style={{ color: GREEN, fontFamily: BODY_FONT }}
                    >
                      Learn More &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Combined / CTA */}
      <section className="py-24" style={{ backgroundColor: '#F5F2EF' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-6" style={{ fontFamily: HEADING_FONT, color: TAUPE }}>
            Not Sure Which Body Contouring Package Is Right for You?
          </h2>
          <p className="mb-8 text-lg" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
            Many clients combine multiple treatments as part of their comprehensive transformation
            plan. Our medical team will recommend the ideal combination based on your goals and a
            full body assessment.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow text-white px-8 py-3 font-bold uppercase tracking-wide inline-block"
              style={{ backgroundColor: GREEN, fontFamily: BODY_FONT }}
            >
              Free Consultation
            </a>
            <BookConsultationButton variant="outline" style={{ fontSize: '13px' }} />
            <a
              href="tel:+35627802062"
              className="btn btn-secondary px-8 py-3 font-bold uppercase tracking-wide inline-block"
              style={{ fontFamily: BODY_FONT }}
            >
              Call: +356 27802062
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
