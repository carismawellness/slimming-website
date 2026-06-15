import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/quiz-results',
        '/thank-you',
        '/weight-loss/thank-you',
        '/medical-weight-loss-lp',
      ],
    },
    sitemap: 'https://www.carismaslimming.com/sitemap.xml',
  }
}
