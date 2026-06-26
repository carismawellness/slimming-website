import Image from 'next/image';
// Server component — no 'use client' needed
import React from 'react';

const FOREST = '#024C27';
const SAGE   = '#4f7256';
const DECO   = '#8EB093';
const CREAM  = '#f8f5f0';
const INK    = '#1a1a1a';
const MUTED  = '#595959';
const SERIF  = 'Trajan Pro, "Trajan Pro Regular", Georgia, serif';
const BODY   = 'Roboto, sans-serif';
const WIDE   = '"Novecento Wide Book","Novecento Wide",sans-serif';

export interface BlogCardPost {
  slug: string;
  title: string;
  published_date: string;
  excerpt: string;
  cover_image_url: string;
  minutes_to_read: number;
}

export interface BlogCardProps {
  post: BlogCardPost;
  size?: 'hero' | 'large' | 'medium' | 'small';
  index?: number;
}

function formatMeta(iso: string, minRead: number): string {
  const d = new Date(iso);
  const month = d.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  return `${month} · ${minRead} min`;
}

export default function BlogCard({ post, size = 'medium', index = 0 }: BlogCardProps) {
  /* ── LARGE card — portrait-ish, taller image ─────────────────── */
  if (size === 'large') {
    return (
      <article className="blog-card" style={{ position: 'relative', overflow: 'hidden', borderRadius: 4, background: '#fff', boxShadow: '0 2px 24px rgba(0,0,0,0.07)', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <a href={`/blog/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', height: '100%' }}>
          <div style={{ overflow: 'hidden', aspectRatio: '4/3', flexShrink: 0 }}>
            <Image
              src={post.cover_image_url}
              alt={post.title}
              className="blog-card-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
             width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />
          </div>
          <div style={{ padding: '28px 32px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: SAGE, marginBottom: 14, margin: '0 0 14px' }}>
              {formatMeta(post.published_date, post.minutes_to_read)}
            </p>
            <h2 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 22, color: INK, lineHeight: 1.3, margin: '0 0 14px', letterSpacing: '0.02em' }}>
              {post.title}
            </h2>
            <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.65, margin: '0 0 auto', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt}
            </p>
            <p style={{ fontFamily: WIDE, fontSize: 11, color: SAGE, letterSpacing: '1px', marginTop: 20, textTransform: 'uppercase' }}>Read →</p>
          </div>
        </a>
      </article>
    );
  }

  /* ── SMALL card — compact, stacked ───────────────────────────── */
  if (size === 'small') {
    return (
      <article className="blog-card" style={{ overflow: 'hidden', borderRadius: 4, background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <a href={`/blog/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', height: '100%' }}>
          <div style={{ overflow: 'hidden', aspectRatio: '16/9', flexShrink: 0 }}>
            <Image
              src={post.cover_image_url}
              alt={post.title}
              className="blog-card-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading="lazy"
             width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />
          </div>
          <div style={{ padding: '16px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: WIDE, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: SAGE, margin: '0 0 10px' }}>
              {formatMeta(post.published_date, post.minutes_to_read)}
            </p>
            <h3 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 15, color: INK, lineHeight: 1.35, margin: '0 0 auto', letterSpacing: '0.01em', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.title}
            </h3>
            <p style={{ fontFamily: WIDE, fontSize: 10, color: SAGE, letterSpacing: '1px', marginTop: 14, textTransform: 'uppercase' }}>Read →</p>
          </div>
        </a>
      </article>
    );
  }

  /* ── MEDIUM card (default) — landscape 16/9 image, text below ── */
  return (
    <article className="blog-card" style={{ overflow: 'hidden', borderRadius: 4, background: '#fff', boxShadow: '0 2px 20px rgba(0,0,0,0.06)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <a href={`/blog/${post.slug}`} style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', height: '100%' }}>
        <div style={{ overflow: 'hidden', aspectRatio: '16/9', flexShrink: 0 }}>
          <Image
            src={post.cover_image_url}
            alt={post.title}
            className="blog-card-img"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
           width={1200} height={900} sizes="(max-width: 768px) 100vw, 640px" />
        </div>
        <div style={{ padding: '24px 28px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <p style={{ fontFamily: WIDE, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: SAGE, margin: '0 0 12px' }}>
            {formatMeta(post.published_date, post.minutes_to_read)}
          </p>
          <h2 style={{ fontFamily: SERIF, textTransform: 'uppercase', fontSize: 17, color: INK, lineHeight: 1.3, margin: '0 0 12px', letterSpacing: '0.02em' }}>
            {post.title}
          </h2>
          <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, lineHeight: 1.6, margin: '0 0 auto', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.excerpt}
          </p>
          <p style={{ fontFamily: WIDE, fontSize: 11, color: SAGE, letterSpacing: '1px', marginTop: 16, textTransform: 'uppercase' }}>Read →</p>
        </div>
      </a>
    </article>
  );
}
