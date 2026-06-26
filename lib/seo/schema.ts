/**
 * Shared JSON-LD structured-data builders for Carisma Slimming.
 *
 * Pure data helpers (no JSX) so they can be imported from both server and
 * client modules. Render the returned objects with <JsonLd data={...} /> from
 * `lib/seo/JsonLd`. Per the Next.js JSON-LD guide, JsonLd sanitises `<` to
 * `<` to avoid XSS via JSON.stringify.
 *
 * IMPORTANT (Google policy): FAQPage / Service / Breadcrumb content must match
 * what is visibly rendered on the page. Always build these from the SAME data
 * the page renders (e.g. the page's faqs array), never a hand-written copy.
 */

export const SITE_URL = 'https://www.carismaslimming.com';

/** Date the YMYL content was last medically reviewed (keep in sync with sitemap). */
export const LAST_REVIEWED = '2026-06-22';

/** Reusable provider node referencing the clinic (mirrors the site-wide org in layout.tsx). */
export const PROVIDER = {
  '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
  '@id': `${SITE_URL}/#medicalbusiness`,
  name: 'Carisma Slimming',
  url: SITE_URL,
  telephone: '+35627802062',
  email: 'info@carismaslimming.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Grand Hotel Excelsior, Great Siege Road',
    addressLocality: 'Floriana',
    addressRegion: 'MT',
    postalCode: 'FRN 1810',
    addressCountry: 'MT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 35.8968634,
    longitude: 14.5050961,
  },
  areaServed: { '@type': 'Country', name: 'Malta' },
} as const;

/** Named medical reviewer for YMYL pages (cited on the GLP-1 page). */
export const MEDICAL_REVIEWER = {
  '@type': 'Physician',
  '@id': `${SITE_URL}/#dr-zaid-teebi`,
  name: 'Dr Zaid Teebi',
  affiliation: PROVIDER,
} as const;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Carisma Slimming',
    alternateName: '#1 Voted Slimming Clinic in Malta',
    url: SITE_URL,
    logo: `${SITE_URL}/logos/carisma-wordmark.svg`,
    telephone: PROVIDER.telephone,
    email: PROVIDER.email,
    sameAs: [
      'https://www.instagram.com/carismaslimming',
      'https://www.facebook.com/carismaslimming',
    ],
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Carisma Slimming',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-MT',
  };
}

export function medicalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    ...PROVIDER,
    description:
      'A doctor-led slimming and medical weight loss clinic in Malta offering body composition analysis, GLP-1 support where clinically appropriate, and non-surgical body contouring.',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    medicalSpecialty: 'Weight Loss',
    availableService: [
      { '@type': 'MedicalTherapy', name: 'Medical Weight Loss' },
      { '@type': 'MedicalTherapy', name: 'GLP-1 Weight Loss Support' },
      { '@type': 'MedicalTherapy', name: 'Fat Freezing' },
      { '@type': 'MedicalTherapy', name: 'Fat Dissolving Injections' },
      { '@type': 'MedicalTherapy', name: 'EMSculpt NEO Muscle Stimulation' },
      { '@type': 'MedicalTherapy', name: 'Skin Tightening' },
      { '@type': 'MedicalTherapy', name: 'Lymphatic Drainage' },
    ],
  };
}

export interface Crumb {
  name: string;
  url: string;
}

export function breadcrumbList(items: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType ?? opts.name,
    provider: PROVIDER,
    areaServed: { '@type': 'Country', name: 'Malta' },
  };
}

export function medicalProcedure(opts: {
  name: string;
  description?: string;
  url: string;
  procedureType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    procedureType: opts.procedureType ?? 'https://schema.org/NoninvasiveProcedure',
    provider: PROVIDER,
    areaServed: { '@type': 'Country', name: 'Malta' },
  };
}

export function medicalWebPage(opts: {
  name: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    inLanguage: 'en-MT',
    datePublished: opts.datePublished ?? LAST_REVIEWED,
    dateModified: opts.dateModified ?? LAST_REVIEWED,
    lastReviewed: opts.dateModified ?? LAST_REVIEWED,
    reviewedBy: MEDICAL_REVIEWER,
    author: PROVIDER,
    publisher: PROVIDER,
    about: { '@type': 'MedicalCondition', name: 'Overweight and obesity' },
  };
}
