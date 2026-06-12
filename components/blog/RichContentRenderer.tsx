import React from 'react';
import Image from 'next/image';
import type { WixRichNode, WixTextDecoration } from '@/lib/wix-blog';
import { wixImageUrl } from '@/lib/wix-blog';

function renderDecorations(text: string, decs: WixTextDecoration[]): React.ReactNode {
  if (!decs.length) return text;
  let node: React.ReactNode = text;
  for (const d of decs) {
    if (d.type === 'BOLD') node = <strong>{node}</strong>;
    else if (d.type === 'ITALIC') node = <em>{node}</em>;
    else if (d.type === 'UNDERLINE') node = <u>{node}</u>;
    else if (d.type === 'LINK' && d.linkData?.link?.url) {
      node = (
        <a
          href={d.linkData.link.url}
          target={d.linkData.link.target ?? '_blank'}
          rel="noopener noreferrer"
          className="underline hover:opacity-80"
          style={{ color: '#8EB093' }}
        >
          {node}
        </a>
      );
    }
  }
  return node;
}

function renderTextChildren(nodes: WixRichNode[]): React.ReactNode {
  return nodes.map((n, i) => {
    if (n.type === 'TEXT' && n.textData) {
      return (
        <React.Fragment key={i}>
          {renderDecorations(n.textData.text, n.textData.decorations ?? [])}
        </React.Fragment>
      );
    }
    return null;
  });
}

function RenderNode({ node, idx }: { node: WixRichNode; idx: number }) {
  switch (node.type) {
    case 'PARAGRAPH': {
      const children = node.nodes ?? [];
      const isEmpty = children.every(
        (n) => n.type === 'TEXT' && (n.textData?.text ?? '').trim() === ''
      );
      if (isEmpty) return <div className="h-3" key={idx} />;
      return (
        <p key={idx} className="mb-4 leading-relaxed text-[16px]" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {renderTextChildren(children)}
        </p>
      );
    }

    case 'HEADING': {
      const level = node.headingData?.level ?? 2;
      const text = renderTextChildren(node.nodes ?? []);
      const base = 'font-semibold mb-3 mt-8';
      if (level === 1) return <h1 key={idx} className={`${base} text-3xl`} style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: 400 }}>{text}</h1>;
      if (level === 2) return <h2 key={idx} className={`${base} text-2xl`} style={{ color: '#8EB093', fontFamily: 'Trajan Pro, serif', fontWeight: 400 }}>{text}</h2>;
      if (level === 3) return <h3 key={idx} className={`${base} text-xl`} style={{ color: '#8EB093', fontFamily: "'Novecento Wide Book', sans-serif", letterSpacing: '0.05em' }}>{text}</h3>;
      if (level === 4) return <h4 key={idx} className={`${base} text-lg`} style={{ color: '#8EB093', fontFamily: "'Novecento Wide Book', sans-serif" }}>{text}</h4>;
      return <h5 key={idx} className={`${base} text-base`} style={{ color: '#8EB093' }}>{text}</h5>;
    }

    case 'IMAGE': {
      const imgData = node.imageData?.image;
      const srcId = imgData?.src?.id;
      const srcUrl = imgData?.src?.url;
      const alt = imgData?.altText ?? node.imageData?.caption ?? '';
      const caption = node.imageData?.caption;
      const url = srcId ? wixImageUrl(srcId, 900, 560) : srcUrl ?? '';
      if (!url) return null;
      return (
        <figure key={idx} className="my-8">
          <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/10' }}>
            <Image src={url} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          {caption && <figcaption className="text-center text-sm mt-2" style={{ color: '#AFA39D' }}>{caption}</figcaption>}
        </figure>
      );
    }

    case 'BULLETED_LIST':
      return (
        <ul key={idx} className="list-disc list-outside ml-6 mb-4 space-y-1" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {(node.nodes ?? []).map((item, i) => (
            <li key={i}>{renderTextChildren(item.nodes?.[0]?.nodes ?? item.nodes ?? [])}</li>
          ))}
        </ul>
      );

    case 'ORDERED_LIST':
      return (
        <ol key={idx} className="list-decimal list-outside ml-6 mb-4 space-y-1" style={{ color: '#AFA39D', fontFamily: "'Novecento Wide Book', sans-serif" }}>
          {(node.nodes ?? []).map((item, i) => (
            <li key={i}>{renderTextChildren(item.nodes?.[0]?.nodes ?? item.nodes ?? [])}</li>
          ))}
        </ol>
      );

    case 'BLOCKQUOTE':
      return (
        <blockquote key={idx} className="border-l-4 pl-5 my-6 italic" style={{ borderColor: '#8EB093', color: '#AFA39D' }}>
          {(node.nodes ?? []).map((n, i) => <RenderNode key={i} node={n} idx={i} />)}
        </blockquote>
      );

    case 'DIVIDER':
      return <hr key={idx} className="my-8" style={{ borderColor: '#e0e0e0' }} />;

    default:
      if (node.nodes?.length) {
        return (
          <React.Fragment key={idx}>
            {node.nodes.map((n, i) => <RenderNode key={i} node={n} idx={i} />)}
          </React.Fragment>
        );
      }
      return null;
  }
}

export default function RichContentRenderer({ nodes }: { nodes: WixRichNode[] }) {
  return (
    <div className="rich-content">
      {nodes.map((node, i) => <RenderNode key={i} node={node} idx={i} />)}
    </div>
  );
}
