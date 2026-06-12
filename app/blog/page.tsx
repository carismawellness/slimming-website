import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, wixImageUrl, type WixPost } from '@/lib/wix-blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Slimming & Weight Loss Blog | Carisma Slimming Malta',
  description: 'Expert articles on medical weight loss, GLP-1, fat freezing, body contouring, and more from Malta\'s leading slimming clinic.',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function PostCard({ post }: { post: WixPost }) {
  const imgId = post.media?.wixMedia?.image?.id;
  const imgUrl = imgId ? wixImageUrl(imgId, 600, 400) : null;

  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col overflow-hidden rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-shadow" style={{ border: '1px solid #e0e0e0' }}>
      {imgUrl && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/2' }}>
          <Image
            src={imgUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow p-5">
        <p className="text-xs mb-2 uppercase tracking-wider" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {formatDate(post.firstPublishedDate)} · {post.minutesToRead} min read
        </p>
        <h2 className="text-base font-semibold mb-2 leading-snug transition-colors" style={{ color: '#1a1a1a', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {post.title}
        </h2>
        <p className="text-sm leading-relaxed line-clamp-3 flex-grow" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {post.excerpt}
        </p>
        <span className="mt-4 text-xs font-semibold uppercase tracking-wider" style={{ color: '#8EB093', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          Read more →
        </span>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  const sorted = [...posts].sort(
    (a, b) => new Date(b.firstPublishedDate).getTime() - new Date(a.firstPublishedDate).getTime()
  );

  return (
    <div className="min-h-screen" style={{ background: '#f9f7f5' }}>
      {/* Hero */}
      <section className="bg-white py-16 px-4" style={{ borderBottom: '1px solid #e0e0e0' }}>
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: '#8EB093', fontFamily: "'Novecento Wide Book', sans-serif" }}>
            Expert Insights
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#1a1a1a', fontFamily: 'Trajan Pro, serif', fontWeight: 400 }}>
            The Slimming Journal
          </h1>
          <p className="max-w-xl mx-auto text-sm leading-relaxed" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
            Honest, medically-grounded articles on weight loss, body treatments, GLP-1, and sustainable transformation — from the team at Carisma Slimming Malta.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
