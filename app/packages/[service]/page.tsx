import Link from 'next/link';
import type { Metadata } from 'next';
import { services, getOrderedServices, BOOKING_URL } from '@/lib/services';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ service: string }>;
}

const HEADING_FONT = '"Trajan Pro", serif';
const BODY_FONT = '"Novecento Wide", Roboto, sans-serif';
const GREEN = '#8EB093';
const TAUPE = '#9B8D83';
const TAUPE_LIGHT = '#AFA39D';
const CREAM = '#F5F2EF';
const CREAM_DEEP = '#EFEAE5';
const SAGE_LIGHT = '#DCE6DC';
const SAGE_TINT = '#EAF0EA';
const BORDER = '#E5DED7';

export async function generateStaticParams() {
  return Object.keys(services).map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service: serviceId } = await params;
  const service = services[serviceId];
  if (!service) {
    return { title: 'Carisma Slimming' };
  }
  return {
    title: service.seoTitle,
    description: service.hero.description,
  };
}

/**
 * Renders a verbatim narrative body. We preserve paragraph breaks (blank
 * lines) and render "- " / numbered FAQ lines as their own paragraphs so the
 * extracted copy stays readable without altering the words.
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
            <ul key={bi} className="mb-5 space-y-2 list-none">
              {lines.map((line, li) => (
                <li key={li} className="flex items-start">
                  <span className="mr-3 font-bold" style={{ color: GREEN }}>
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
                className="leading-relaxed"
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

  const related = getOrderedServices().filter((s) => s.id !== service.id);

  // The live hero surfaces the lead package's inclusion checklist and its
  // headline price ("TOTAL VALUE … TODAY … ONLY") directly inside the left
  // copy panel, so pull the first package through for the hero offer block.
  const leadPackage = service.packages[0];
  const heroIncludes = leadPackage?.includes ?? [];

  return (
    <main className="w-full">
      {/* Hero — clean two-column split matching the live treatment hero: the
          copy lives in a left text panel on a soft sage gradient (no dark scrim,
          bright and airy) and the treatment photo fills the right column. */}
      <section
        className="relative mx-auto"
        style={{ backgroundImage: 'url(/background.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', borderRadius: '48px', overflow: 'hidden', maxWidth: '1280px', marginTop: '20px', marginBottom: '20px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12 py-12 md:py-16">
            {/* Left: copy + offer panel (matches the live hero, which carries the
                inclusion checklist, the headline offer price and the legal
                fine-print all inside the left column). */}
            <div className="flex flex-col justify-center">
              <p
                className="uppercase tracking-widest mb-4 text-[11px] font-semibold leading-relaxed"
                style={{ color: GREEN, fontFamily: BODY_FONT }}
              >
                {service.hero.eyebrow}
              </p>
              <h1
                className="text-4xl md:text-5xl mb-5 leading-tight"
                style={{ fontFamily: HEADING_FONT, color: TAUPE }}
              >
                {service.hero.heading}
              </h1>
              <p
                className="text-sm md:text-base mb-5 leading-relaxed"
                style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}
              >
                {service.hero.description}
              </p>

              {/* Inclusion checklist drawn from the lead package */}
              {heroIncludes.length > 0 && (
                <ul className="mb-5 space-y-2.5">
                  {heroIncludes.map((item, i) => (
                    <li key={i} className="flex items-start text-sm" style={{ color: TAUPE }}>
                      <span className="mr-3 mt-0.5 font-bold" style={{ color: GREEN }}>
                        &#10003;
                      </span>
                      <span style={{ fontFamily: BODY_FONT }}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Headline offer price */}
              {leadPackage && (
                <p
                  className="text-base md:text-lg font-bold mb-5"
                  style={{ color: TAUPE, fontFamily: BODY_FONT }}
                >
                  <span style={{ color: TAUPE_LIGHT }}>Total Value: </span>
                  <span style={{ color: GREEN }}>{leadPackage.price}</span>
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white px-8 py-3.5 rounded font-bold uppercase tracking-wide text-center text-sm"
                  style={{ backgroundColor: GREEN, fontFamily: BODY_FONT }}
                >
                  Claim Your Spot Now
                </a>
                <a
                  href="tel:+35627802062"
                  className="px-8 py-3.5 rounded font-bold uppercase tracking-wide text-center border-2 text-sm"
                  style={{ borderColor: GREEN, color: GREEN, fontFamily: BODY_FONT }}
                >
                  +356 27802062
                </a>
              </div>
              <div className="flex items-center gap-2 mb-5" style={{ color: GREEN }}>
                <span className="text-lg tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span className="text-xs" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
                  Over 200+ Reviews
                </span>
              </div>

              {/* Fine-print disclaimer, mirroring the small grey legal note that
                  sits at the foot of the live hero copy panel. */}
              {leadPackage?.notes && (
                <p
                  className="text-[11px] leading-relaxed max-w-md"
                  style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}
                >
                  {leadPackage.notes}
                </p>
              )}
            </div>

            {/* Right: rounded treatment photo set on a soft sage panel, matching
                the inset (non full-bleed) hero image on the live page. */}
            {service.heroImage && (
              <div className="relative">
                <div
                  className="rounded-2xl overflow-hidden shadow-sm mx-auto"
                  style={{ backgroundColor: SAGE_LIGHT, width: '100%', maxWidth: '383px' }}
                >
                  <img
                    src={service.heroImage}
                    alt={service.imagePlaceholder}
                    className="w-full"
                    style={{ aspectRatio: '383 / 479', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Named benefits — four distinct titled blocks rendered as a single
          horizontal band (one row of four on desktop), each centered with its
          heading above the body, matching the live four-up benefit strip. */}
      <section className="py-16" style={{ backgroundColor: SAGE_TINT }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.namedBenefits.map((benefit, index) => (
              <div key={index} className="text-center px-2">
                <h3
                  className="text-lg uppercase tracking-wide mb-3 font-semibold"
                  style={{ color: GREEN, fontFamily: BODY_FONT }}
                >
                  {benefit.heading}
                </h3>
                <p className="leading-relaxed" style={{ color: TAUPE, fontFamily: BODY_FONT }}>
                  {benefit.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatable areas — on the live page the "treat visible fat bulges in
          N areas" pill row sits between the benefit band and the packages. */}
      {service.treatableAreas && service.treatableAreas.length > 0 && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl mb-10" style={{ fontFamily: HEADING_FONT, color: TAUPE }}>
              Treatable Areas
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {service.treatableAreas.map((area, i) => (
                <span
                  key={i}
                  className="px-5 py-2 rounded-full text-sm border bg-white"
                  style={{ borderColor: GREEN, color: TAUPE }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Packages (verbatim names + per-line values) */}
      <section className="py-16" style={{ backgroundColor: SAGE_TINT }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl mb-10 text-center"
            style={{ fontFamily: HEADING_FONT, color: TAUPE }}
          >
            Packages
          </h2>
          <div className="space-y-8">
            {service.packages.map((pkg, pi) => (
              <div
                key={pi}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
                style={{ borderColor: BORDER }}
              >
                <div className="p-6 border-b" style={{ borderColor: BORDER }}>
                  <h3
                    className="text-xl mb-2"
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
                  <ul className="divide-y" style={{ borderColor: BORDER }}>
                    {pkg.includes.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start justify-between gap-4 p-4"
                        style={{ borderColor: BORDER }}
                      >
                        <span className="flex items-start" style={{ color: TAUPE }}>
                          <span className="mr-3 font-bold" style={{ color: GREEN }}>
                            &#10003;
                          </span>
                          {item.label}
                        </span>
                        {item.value && (
                          <span
                            className="whitespace-nowrap text-sm"
                            style={{ color: TAUPE_LIGHT }}
                          >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative sections (verbatim, in order) — the long-form explanatory
          copy (cryolipolysis, localised contouring, why-we-combine, etc.) sits
          below the package band on the live page. */}
      <section className="py-16">
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
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl mb-6" style={{ fontFamily: HEADING_FONT, color: TAUPE }}>
            Duration & What to Expect
          </h2>
          <p className="leading-relaxed" style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}>
            {service.duration}
          </p>
        </div>
      </section>

      {/* Image placeholders (labeled boxes for all images referenced on the live page) */}
      <section className="py-16" style={{ backgroundColor: CREAM }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl mb-3 text-center"
            style={{ fontFamily: HEADING_FONT, color: TAUPE }}
          >
            Media & Imagery
          </h2>
          <p
            className="text-sm mb-10 text-center"
            style={{ color: TAUPE_LIGHT, fontFamily: BODY_FONT }}
          >
            Placeholders for assets referenced on the live treatment page.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {service.imagesNeeded.map((img, i) =>
              img.src ? (
                <div key={i} className="h-28 rounded border overflow-hidden" style={{ borderColor: BORDER }}>
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div
                  key={i}
                  className="h-28 rounded border flex items-center justify-center text-center px-3"
                  style={{ backgroundColor: CREAM_DEEP, borderColor: BORDER, color: TAUPE_LIGHT }}
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

      {/* CTA */}
      <section className="py-16 text-white" style={{ backgroundColor: GREEN }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-6" style={{ fontFamily: HEADING_FONT }}>
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8" style={{ fontFamily: BODY_FONT }}>
            Schedule your free consultation to discuss this treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-8 py-3 rounded font-bold uppercase tracking-wide text-center"
              style={{ color: GREEN, fontFamily: BODY_FONT }}
            >
              Free Consultation
            </a>
            <a
              href="tel:+35627802062"
              className="border-2 border-white px-8 py-3 rounded font-bold uppercase tracking-wide text-center"
              style={{ fontFamily: BODY_FONT }}
            >
              Call: +356 27802062
            </a>
          </div>
        </div>
      </section>

      {/* Other packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl mb-8 text-center"
            style={{ fontFamily: HEADING_FONT, color: TAUPE }}
          >
            Explore Other Packages
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {related.map((s) => (
              <Link
                key={s.id}
                href={`/packages/${s.id}`}
                className="px-5 py-2 rounded-full text-sm border bg-white hover:shadow-sm transition"
                style={{ borderColor: BORDER, color: TAUPE }}
              >
                {s.treatment}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
