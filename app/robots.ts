import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    // NOTE: Do NOT Disallow the noindex utility pages (/quiz-results, /thank-you,
    // /weight-loss/thank-you, /medical-weight-loss-lp). Googlebot must be able to
    // CRAWL them to SEE their `robots: { index: false }` meta. Disallowing them
    // hides the noindex directive, so they can still surface as bare URLs in search.
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.carismaslimming.com/sitemap.xml',
  }
}
