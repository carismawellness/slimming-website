import { MetadataRoute } from 'next'
import postsIndex from '@/lib/blog/posts-index.json'
import { getBlogSeoPolicy } from '@/lib/blog/seo-policy'

const BASE_URL = 'https://www.carismaslimming.com'
const LAST_MODIFIED = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/glp1`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/weight-loss`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/consultation`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/fat-freezing`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/fat-dissolving`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/muscle-stimulation`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/skin-tightening`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/lipocavitation`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/anti-cellulite`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/packages/lymphatic-drainage`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/slimming-guide`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-conditions`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const includedBlogPosts = (postsIndex as { slug: string; title?: string; excerpt?: string; published_date: string }[])
    .filter((p) => getBlogSeoPolicy(p).index)

  const blogLastModified = includedBlogPosts.reduce((latest, post) => {
    const published = new Date(post.published_date)
    return published > latest ? published : latest
  }, LAST_MODIFIED)

  const blogListing: MetadataRoute.Sitemap[number] = {
    url: `${BASE_URL}/blog`,
    lastModified: blogLastModified,
    changeFrequency: 'daily',
    priority: 0.8,
  }

  const blogPosts: MetadataRoute.Sitemap = includedBlogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.published_date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // Add paginated blog listing pages (page 1 is already covered by /blog above)
  const POSTS_PER_PAGE = 20
  const totalBlogPages = Math.max(1, Math.ceil(includedBlogPosts.length / POSTS_PER_PAGE))
  const blogPaginationPages: MetadataRoute.Sitemap = Array.from(
    { length: totalBlogPages - 1 },
    (_, i) => ({
      url: `${BASE_URL}/blog/page/${i + 2}`,
      lastModified: blogLastModified,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    })
  )

  return [...staticUrls, blogListing, ...blogPaginationPages, ...blogPosts]
}
