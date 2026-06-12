import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getRelatedPosts, wixImageUrl } from '@/lib/wix-blog';
import RichContentRenderer from '@/components/blog/RichContentRenderer';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const imgId = post.media?.wixMedia?.image?.id;
  return {
    title: `${post.title} | Carisma Slimming Malta`,
    description: post.excerpt,
    openGraph: imgId ? { images: [wixImageUrl(imgId, 1200, 630)] } : undefined,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post.relatedPostIds?.slice(0, 3) ?? []);

  const heroImgId = post.media?.wixMedia?.image?.id;
  const heroUrl = heroImgId ? wixImageUrl(heroImgId, 1200, 630) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero image */}
      {heroUrl && (
        <div className="relative w-full" style={{ aspectRatio: '21/9', maxHeight: '520px', overflow: 'hidden' }}>
          <Image src={heroUrl} alt={post.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45))' }} />
        </div>
      )}

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          <Link href="/" className="hover:opacity-70">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:opacity-70">Blog</Link>
          <span>/</span>
          <span className="truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Meta */}
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8EB093', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {formatDate(post.firstPublishedDate)} · {post.minutesToRead} min read
        </p>

        <h1 className="text-3xl md:text-4xl mb-8 leading-tight" style={{ color: '#1a1a1a', fontFamily: 'Trajan Pro, serif', fontWeight: 400 }}>
          {post.title}
        </h1>

        <div className="w-12 h-px mb-8" style={{ background: '#8EB093' }} />

        {/* Body */}
        {post.richContent?.nodes && (
          <RichContentRenderer nodes={post.richContent.nodes} />
        )}

        {/* Back link */}
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid #e0e0e0' }}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider hover:opacity-70"
            style={{ color: '#8EB093', fontFamily: "'Novecento Wide Book', sans-serif" }}
          >
            ← Back to Blog
          </Link>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12 px-4" style={{ background: '#f9f7f5' }}>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl mb-8 text-center" style={{ color: '#1a1a1a', fontFamily: 'Trajan Pro, serif', fontWeight: 400 }}>
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => {
                const rImgId = rp.media?.wixMedia?.image?.id;
                const rImgUrl = rImgId ? wixImageUrl(rImgId, 600, 400) : null;
                return (
                  <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex flex-col overflow-hidden rounded-2xl bg-white hover:shadow-md transition-shadow" style={{ border: '1px solid #e0e0e0' }}>
                    {rImgUrl && (
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/2' }}>
                        <Image src={rImgUrl} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-xs mb-1" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>{formatDate(rp.firstPublishedDate)}</p>
                      <h3 className="text-sm font-semibold leading-snug" style={{ color: '#1a1a1a', fontFamily: "'Novecento Wide Book', sans-serif" }}>{rp.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
