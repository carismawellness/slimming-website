import type { Metadata } from 'next';
import Link from 'next/link';
import { getOrderedServices, BOOKING_URL } from '@/lib/services';
import JsonLd from '@/components/JsonLd';

const SITE = 'https://www.carismaslimming.com';

export const metadata: Metadata = {
  title: "Body Contouring Packages Malta | Carisma Slimming",
  description: "Explore Malta's most effective weight loss packages — fat freezing, fat dissolving, muscle stimulation, skin tightening and more. Medically supervised at Carisma Slimming.",
  alternates: { canonical: 'https://www.carismaslimming.com/packages' },
};

const HEADING_FONT = '"Trajan Pro", serif';
const BODY_FONT = '"Novecento Wide", Roboto, sans-serif';
const GREEN = '#8EB093';
const TAUPE = '#9B8D83';
const TAUPE_LIGHT = '#AFA39D';

export default function PackagesPage() {
  const servicesList = getOrderedServices();

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Packages', item: `${SITE}/packages` },
      ],
    },
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
      <section className="py-20 text-center" style={{ backgroundColor: '#F5F2EF' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="uppercase tracking-widest mb-4 text-sm"
            style={{ color: GREEN, fontFamily: BODY_FONT }}
          >
            Carisma Slimming
          </p>
          <h1
            className="text-4xl md:text-5xl mb-6"
            style={{ fontFamily: HEADING_FONT, color: TAUPE }}
          >
            Weight Loss &amp; Body Contouring Packages in Malta
          </h1>
          <p className="text-lg" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
            Doctor-led, non-surgical treatments to freeze, dissolve, tone, tighten and detox -
            each available as a focused protocol with spa &amp; fitness access included.
          </p>
        </div>
      </section>

      {/* Packages grid */}
      <section className="py-16">
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
                <div
                  className="bg-white border rounded-lg overflow-hidden h-full flex flex-col transition shadow-sm hover:shadow-lg"
                  style={{ borderColor: '#E5DED7' }}
                >
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
                      className="font-semibold text-sm uppercase tracking-wide"
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
      <section className="py-16" style={{ backgroundColor: '#F5F2EF' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-6" style={{ fontFamily: HEADING_FONT, color: TAUPE }}>
            Not Sure Which Body Contouring Package Is Right for You?
          </h2>
          <p className="mb-8 text-lg" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
            Many clients combine multiple treatments as part of their comprehensive transformation
            plan. Our medical team will recommend the ideal combination based on your goals and a
            full body assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow text-white px-8 py-3 font-bold uppercase tracking-wide inline-block"
              style={{ backgroundColor: GREEN, fontFamily: BODY_FONT }}
            >
              Free Consultation
            </a>
            <a
              href="tel:+35627802062"
              className="px-8 py-3 rounded font-bold uppercase tracking-wide inline-block border-2"
              style={{ borderColor: GREEN, color: GREEN, fontFamily: BODY_FONT }}
            >
              Call: +356 27802062
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
