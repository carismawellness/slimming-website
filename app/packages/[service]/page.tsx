import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { services, getOrderedServices, BOOKING_URL } from '@/lib/services';
import { notFound } from 'next/navigation';
import PackagePage from '@/components/PackagePage';
import CountUp from '@/components/CountUp';
import { packageContent } from '@/lib/packages';
import { JsonLd } from '@/lib/seo/JsonLd';
import BookConsultationButton from '@/components/BookConsultationButton';
import {
  SITE_URL as SITE,
  breadcrumbList,
  faqPage,
  medicalProcedure,
} from '@/lib/seo/schema';

interface Props {
  params: Promise<{ service: string }>;
}

const HEADING_FONT = '"Trajan Pro", serif';
const BODY_FONT = '"Novecento Wide", Roboto, sans-serif';
// Accessible brand palette (locked single source of truth):
// GREEN was #8EB093 (2.39:1 — fails as text/icons/borders/white-on-fill).
// Replaced with the deep-sage --brand-green-text/-fill #4f7256 (5.42:1 on white).
const GREEN = '#4f7256';
// HEADING_INK = near-black (#1a1a1a, 17.4:1 AAA on white) for h1-h3 headings.
const HEADING_INK = '#1a1a1a';
// TAUPE was #9B8D83 (3.22:1 — fails as body text). Now #333333 (12.63:1 AAA).
const TAUPE = '#333333';
// TAUPE_LIGHT was #AFA39D (2.46:1 — fails). Now #595959 (7.0:1 AAA on white).
const TAUPE_LIGHT = '#595959';
const CREAM = '#F5F2EF';
const CREAM_DEEP = '#EFEAE5';
const SAGE_LIGHT = '#DCE6DC';
const SAGE_TINT = '#EAF0EA';
const BORDER = '#E5DED7';

export async function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }));
}

const serviceMeta: Record<string, { title: string; description: string }> = {
  'fat-freezing': {
    title: 'CoolSculpting Malta | Fat Freezing Treatment | Carisma Slimming',
    description: 'Non-surgical fat freezing in Malta with CoolSculpting. Up to 27% fat reduction per session. FDA-cleared. Book your free body analysis at Carisma Slimming.',
  },
  'fat-dissolving': {
    title: 'Fat Dissolving Injections Malta | Lemon Bottle | Carisma Slimming',
    description: 'Fat dissolving injections in Malta targeting stubborn areas. Non-surgical, minimal downtime. Visible results in 2-4 weeks. Book your consultation.',
  },
  'muscle-stimulation': {
    title: 'EMSculpt NEO Malta | Build Muscle & Burn Fat | Carisma Slimming',
    description: 'EMSculpt NEO in Malta. Build 25% more muscle, reduce 30% fat in 30 minutes. FDA-cleared body sculpting. Book your free consultation at Carisma Slimming.',
  },
  'skin-tightening': {
    title: 'VelaShape III Malta | Skin Tightening | Carisma Slimming',
    description: 'VelaShape III skin tightening in Malta. Reduce cellulite, contour your body, tighten loose skin. Non-invasive with no downtime. Book your free assessment.',
  },
  lipocavitation: {
    title: 'Lipocavitation Malta | Fat Reduction | Carisma Slimming',
    description: 'Lipocavitation fat reduction in Malta. Non-invasive ultrasound treatment that breaks down stubborn fat cells. No downtime. Book your free assessment today.',
  },
  'anti-cellulite': {
    title: 'Cellulite Treatment Malta | VelaShape III | Carisma Slimming',
    description: 'Effective cellulite treatment in Malta using VelaShape III technology. Visible results from the first session. Non-invasive, no downtime. Book today.',
  },
  'lymphatic-drainage': {
    title: 'Lymphatic Drainage Malta | Detox Treatment | Carisma Slimming',
    description: 'Professional lymphatic drainage massage in Malta. Reduce bloating, eliminate toxins, support weight loss. Feel lighter from your first session. Book now.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const meta = serviceMeta[service];
  if (!meta) return { title: 'Treatment | Carisma Slimming' };
  const canonicalUrl = `https://www.carismaslimming.com/packages/${service}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      images: [{ url: '/background.avif', width: 1200, height: 630, alt: meta.title }],
    },
  };
}

/**
 * Renders a verbatim narrative body. We preserve paragraph breaks (blank
 * lines) and render "- " bullet lines as semantic list items.
 */
function NarrativeBody({ body }: { body: string }) {
  const blocks = body.split('\n\n');
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split('\n');
        const isBulletBlock = lines.every((l) => l.trim().startsWith('-'));

        if (isBulletBlock && lines.length > 1) {
          return (
            /* P6 — semantic list; P1 — decorative checkmarks aria-hidden */
            <ul key={bi} className="mb-5 space-y-2 list-none">
              {lines.map((line, li) => (
                <li key={li} className="flex items-start">
                  <span className="mr-3 font-bold" aria-hidden="true" style={{ color: GREEN }}>
                    &#10003;
                  </span>
                  <span style={{ color: TAUPE }}>{line.replace(/^\s*-\s*/, '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <div key={bi} className="mb-5">
            {lines.map((line, li) => (
              <p
                key={li}
                className="leading-relaxed mb-2"
                style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}
              >
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </>
  );
}

export default async function ServicePage({ params }: Props) {
  const { service: serviceId } = await params;
  const service = services[serviceId];

  if (!service) {
    notFound();
  }

  const content = packageContent[service.id];
  if (content) {
    const url = `${SITE}/packages/${service.id}`;
    const meta = serviceMeta[service.id];
    const schema: object[] = [
      medicalProcedure({
        name: service.treatment,
        description: meta?.description,
        url,
      }),
      breadcrumbList([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Packages', url: `${SITE}/packages` },
        { name: service.treatment, url },
      ]),
    ];
    if (content.faqs?.length) {
      schema.push(faqPage(content.faqs));
    }
    return (
      <>
        <JsonLd data={schema} />
        <PackagePage content={content} />
      </>
    );
  }

  const related = getOrderedServices().filter((s) => s.id !== service.id);
  const leadPackage = service.packages[0];
  const heroIncludes = leadPackage?.includes ?? [];

  return (
    <>
      {/* P1 — Skip-to-main-content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded focus:bg-white focus:text-sm focus:font-bold focus:underline focus:shadow-lg"
        style={{ color: GREEN }}
      >
        Skip to main content
      </a>

      <main id="main-content" className="w-full">
        {/* P9 — Breadcrumb */}
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <ol className="flex flex-wrap items-center gap-2 text-sm" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
            <li>
              <Link
                href="/"
                className="hover:underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: GREEN }}
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">/</li>
            <li>
              <Link
                href="/packages"
                className="hover:underline transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: GREEN }}
              >
                Packages
              </Link>
            </li>
            <li aria-hidden="true" className="select-none">/</li>
            <li aria-current="page" style={{ color: TAUPE_LIGHT }}>{service.treatment}</li>
          </ol>
        </nav>

        {/* Hero — two-column split */}
        <section
          aria-labelledby="service-heading"
          className="relative mx-auto"
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '48px',
            overflow: 'hidden',
            maxWidth: '1280px',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 py-12 md:py-16">
              {/* Left: copy + offer panel */}
              <div className="flex flex-col justify-center">
                <p
                  className="uppercase tracking-widest mb-4 text-[11px] font-semibold leading-relaxed"
                  style={{ color: GREEN, fontFamily: BODY_FONT }}
                >
                  {service.hero.eyebrow}
                </p>

                {/* P6 — single H1 per page = package name */}
                <h1
                  id="service-heading"
                  className="text-4xl md:text-5xl mb-5 leading-tight"
                  style={{ fontFamily: HEADING_FONT, color: HEADING_INK }}
                >
                  {service.hero.heading}
                </h1>

                <p
                  className="text-sm md:text-base mb-5 leading-relaxed max-w-prose"
                  style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}
                >
                  {service.hero.description}
                </p>

                {/* Inclusion checklist — P1: semantic list, decorative check aria-hidden */}
                {heroIncludes.length > 0 && (
                  <ul className="mb-5 space-y-2.5" aria-label="Package inclusions">
                    {heroIncludes.map((item, i) => (
                      <li key={i} className="flex items-start text-sm" style={{ color: TAUPE }}>
                        <span className="mr-3 mt-0.5 font-bold" aria-hidden="true" style={{ color: GREEN }}>
                          &#10003;
                        </span>
                        <span style={{ fontFamily: BODY_FONT }}>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {leadPackage && (
                  <p
                    className="text-base md:text-lg font-bold mb-5"
                    style={{ color: TAUPE, fontFamily: BODY_FONT }}
                  >
                    <span style={{ color: TAUPE_LIGHT }}>Total Value: </span>
                    <span style={{ color: GREEN }}>{leadPackage.price}</span>
                  </p>
                )}

                {/* P2 — min 44×44px touch targets; P4 — consistent transitions */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-4">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Claim your spot for ${service.treatment} (opens in new tab)`}
                    className="cta-glow text-white px-8 font-bold uppercase tracking-wide text-center text-sm inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out active:scale-95"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    Claim Your Spot Now
                  </a>
                  <BookConsultationButton
                    variant="outline"
                    style={{ fontSize: '13px', padding: '13px 28px', minHeight: '44px' }}
                  />
                  <a
                    href="tel:+35627802062"
                    aria-label="Call us at +356 27802062"
                    className="btn btn-secondary px-8 font-bold uppercase tracking-wide text-center text-sm inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out active:scale-95"
                    style={{ fontFamily: BODY_FONT }}
                  >
                    +356 27802062
                  </a>
                </div>

                <div className="flex items-center gap-2 mb-5">
                  {/* P1 — star rating with meaningful role */}
                  <span
                    className="text-lg tracking-wide"
                    role="img"
                    aria-label="5 out of 5 stars"
                    style={{ color: GREEN }}
                  >
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                  </span>
                  <span className="text-xs" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
                    Over <CountUp value="800+" /> Reviews
                  </span>
                </div>

                {leadPackage?.notes && (
                  <p
                    className="text-[11px] leading-relaxed max-w-md"
                    style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}
                  >
                    {leadPackage.notes}
                  </p>
                )}
              </div>

              {/* Right: treatment image — P3: next/image with explicit dimensions */}
              {service.heroImage && (
                <div className="relative flex justify-center">
                  <div
                    className="overflow-hidden shadow-sm"
                    style={{ backgroundColor: SAGE_LIGHT, width: '100%', maxWidth: '383px', borderRadius: '16px' }}
                  >
                    <Image
                      src={service.heroImage}
                      alt={`${service.treatment} treatment at Carisma Slimming Malta`}
                      width={383}
                      height={479}
                      priority
                      className="w-full"
                      style={{ objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Named benefits */}
        <section aria-labelledby="benefits-heading" className="py-16" style={{ backgroundColor: SAGE_TINT }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="benefits-heading" className="sr-only">Treatment Benefits</h2>
            {/* P5 — responsive grid: 1→2→4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.namedBenefits.map((benefit, index) => (
                <div key={index} className="text-center px-2">
                  <h3
                    className="text-lg uppercase tracking-wide mb-3 font-semibold leading-snug"
                    style={{ color: GREEN, fontFamily: BODY_FONT }}
                  >
                    {benefit.heading}
                  </h3>
                  <p className="leading-relaxed text-sm" style={{ color: TAUPE, fontFamily: BODY_FONT }}>
                    {benefit.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatable areas */}
        {service.treatableAreas && service.treatableAreas.length > 0 && (
          <section aria-labelledby="areas-heading" className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2
                id="areas-heading"
                className="text-3xl mb-10 leading-tight"
                style={{ fontFamily: HEADING_FONT, color: TAUPE }}
              >
                Treatable Areas
              </h2>
              {/* P6 — semantic list for treatable areas */}
              <ul className="flex flex-wrap justify-center gap-3 list-none p-0" aria-label="Treatable body areas">
                {service.treatableAreas.map((area, i) => (
                  <li
                    key={i}
                    className="px-5 py-2 rounded-full text-sm border bg-white"
                    style={{ borderColor: GREEN, color: TAUPE }}
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Packages — P10: per-package CTA */}
        <section aria-labelledby="packages-section-heading" className="py-16" style={{ backgroundColor: SAGE_TINT }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="packages-section-heading"
              className="text-3xl mb-10 text-center leading-tight"
              style={{ fontFamily: HEADING_FONT, color: TAUPE }}
            >
              {service.treatment} Packages
            </h2>
            <div className="space-y-8">
              {service.packages.map((pkg, pi) => (
                <article
                  key={pi}
                  className="card overflow-hidden"
                  aria-label={`${pkg.name} package`}
                >
                  <div className="p-6 border-b" style={{ borderColor: BORDER }}>
                    <h3
                      className="text-xl mb-2 leading-snug"
                      style={{ fontFamily: HEADING_FONT, color: TAUPE }}
                    >
                      {pkg.name}
                    </h3>
                    <p
                      className="text-lg font-bold"
                      style={{ color: GREEN, fontFamily: BODY_FONT }}
                    >
                      {pkg.price}
                    </p>
                  </div>

                  {pkg.includes.length > 0 && (
                    <ul className="divide-y list-none p-0 m-0" style={{ borderColor: BORDER }} aria-label="Package inclusions">
                      {pkg.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start justify-between gap-4 p-4"
                          style={{ borderColor: BORDER }}
                        >
                          <span className="flex items-start" style={{ color: TAUPE }}>
                            <span className="mr-3 font-bold" aria-hidden="true" style={{ color: GREEN }}>
                              &#10003;
                            </span>
                            {item.label}
                          </span>
                          {item.value && (
                            <span className="whitespace-nowrap text-sm" style={{ color: TAUPE_LIGHT }}>
                              {item.value}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {pkg.notes && (
                    <p
                      className="px-6 py-4 text-sm leading-relaxed"
                      style={{ color: TAUPE_LIGHT, backgroundColor: CREAM, fontFamily: BODY_FONT }}
                    >
                      {pkg.notes}
                    </p>
                  )}

                  {/* P10 — specific per-package CTA */}
                  <div className="px-6 py-5" style={{ borderTop: `1px solid ${BORDER}` }}>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Get started with ${pkg.name} (opens in new tab)`}
                      className="cta-glow text-white px-8 font-bold uppercase tracking-wide inline-flex items-center justify-center min-h-[44px] text-sm transition-all duration-200 ease-in-out active:scale-95"
                      style={{ backgroundColor: GREEN, fontFamily: BODY_FONT }}
                    >
                      Get Started with {pkg.name}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative sections */}
        <section aria-label="Treatment details" className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {service.narrativeSections.map((sec, i) => (
              <article key={i}>
                <h2
                  className="text-2xl md:text-3xl mb-5 leading-snug"
                  style={{ fontFamily: HEADING_FONT, color: TAUPE }}
                >
                  {sec.heading}
                </h2>
                <NarrativeBody body={sec.body} />
              </article>
            ))}
          </div>
        </section>

        {/* Duration */}
        <section aria-labelledby="duration-heading" className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="duration-heading"
              className="text-3xl mb-6 leading-tight"
              style={{ fontFamily: HEADING_FONT, color: TAUPE }}
            >
              Duration &amp; What to Expect
            </h2>
            <p className="leading-relaxed max-w-prose mx-auto" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
              {service.duration}
            </p>
          </div>
        </section>

        {/* Media placeholder grid — P3: next/image where src exists; P3: aspect-ratio prevents CLS */}
        <section aria-labelledby="media-heading" className="py-16" style={{ backgroundColor: CREAM }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="media-heading"
              className="text-2xl mb-3 text-center leading-tight"
              style={{ fontFamily: HEADING_FONT, color: TAUPE }}
            >
              Media &amp; Imagery
            </h2>
            <p className="text-sm mb-10 text-center" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
              Placeholders for assets referenced on the live treatment page.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {service.imagesNeeded.map((img, i) =>
                img.src ? (
                  <div key={i} className="card overflow-hidden relative" style={{ aspectRatio: '4 / 3' }}>
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    key={i}
                    className="card flex items-center justify-center text-center px-3"
                    style={{ backgroundColor: CREAM_DEEP, color: TAUPE_LIGHT, aspectRatio: '4 / 3' }}
                    role="presentation"
                  >
                    <span className="text-xs leading-snug" style={{ fontFamily: BODY_FONT }}>
                      [ {img.label} ]
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section aria-labelledby="cta-section-heading" className="py-16 text-white" style={{ backgroundColor: GREEN }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              id="cta-section-heading"
              className="text-3xl md:text-4xl mb-6 leading-tight"
              style={{ fontFamily: HEADING_FONT }}
            >
              Ready to Start Your {service.treatment} Treatment?
            </h2>
            <p className="text-xl mb-8 max-w-prose mx-auto leading-relaxed" style={{ fontFamily: BODY_FONT }}>
              Schedule your free body composition analysis to discuss this treatment with our medical team.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book a free ${service.treatment} consultation (opens in new tab)`}
                className="cta-glow text-white px-8 font-bold uppercase tracking-wide text-center inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out active:scale-95"
                style={{ fontFamily: BODY_FONT }}
              >
                Book Free Body Analysis
              </a>
              <BookConsultationButton variant="outline" style={{ fontSize: '13px', minHeight: '44px' }} />
              <a
                href="tel:+35627802062"
                aria-label="Call us at +356 27802062"
                className="btn btn-secondary px-8 font-bold uppercase tracking-wide text-center inline-flex items-center justify-center min-h-[44px] transition-all duration-200 ease-in-out active:scale-95"
                style={{ fontFamily: BODY_FONT }}
              >
                Call: +356 27802062
              </a>
            </div>
          </div>
        </section>

        {/* Sticky mobile CTA for long package pages — P2 */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 sm:hidden py-3 px-4 flex gap-3"
          style={{ backgroundColor: '#fff', borderTop: `1px solid ${BORDER}`, boxShadow: '0 -4px 12px rgba(0,0,0,0.08)' }}
          role="region"
          aria-label="Quick booking actions"
        >
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book free body composition analysis (opens in new tab)"
            className="flex-1 text-white text-sm font-bold uppercase tracking-wide text-center inline-flex items-center justify-center min-h-[44px] rounded-lg transition-all duration-200 ease-in-out active:scale-95"
            style={{ backgroundColor: GREEN, fontFamily: BODY_FONT }}
          >
            Free Body Analysis
          </a>
          <a
            href="tel:+35627802062"
            aria-label="Call us at +356 27802062"
            className="px-4 text-sm font-bold uppercase tracking-wide text-center inline-flex items-center justify-center min-h-[44px] rounded-lg border-2 transition-all duration-200 ease-in-out active:scale-95"
            style={{ borderColor: GREEN, color: GREEN, fontFamily: BODY_FONT }}
          >
            Call
          </a>
        </div>

        {/* Explore other packages */}
        <section aria-labelledby="related-heading" className="py-16 pb-24 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="related-heading"
              className="text-2xl mb-8 text-center leading-tight"
              style={{ fontFamily: HEADING_FONT, color: TAUPE }}
            >
              Explore Other Packages
            </h2>
            <nav aria-label="Other treatment packages">
              <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
                {related.map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/packages/${s.id}`}
                      className="btn btn-secondary px-5 inline-flex items-center justify-center min-h-[44px] text-sm transition-all duration-200 ease-in-out hover:opacity-80 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ fontFamily: BODY_FONT }}
                    >
                      {s.treatment}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </>
  );
}
