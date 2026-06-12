export interface WixTextDecoration {
  type: 'BOLD' | 'ITALIC' | 'UNDERLINE' | 'COLOR' | 'LINK' | 'ANCHOR';
  colorData?: { foreground?: string; background?: string };
  linkData?: { link?: { url?: string; target?: string } };
  anchorData?: { anchor?: string };
}

export interface WixTextNode {
  type: 'TEXT';
  textData: { text: string; decorations?: WixTextDecoration[] };
}

export interface WixRichNode {
  type: string;
  id?: string;
  nodes?: WixRichNode[];
  textData?: { text: string; decorations?: WixTextDecoration[] };
  headingData?: { level: number; indentation?: number };
  imageData?: {
    containerData?: { alignment?: string };
    image?: { src?: { id?: string; url?: string }; width?: number; height?: number; altText?: string };
    caption?: string;
  };
  bulletedListData?: { indentation?: number };
  orderedListData?: { indentation?: number };
  blockquoteData?: { indentation?: number };
  dividerData?: object;
  codeBlockData?: object;
}

export interface WixPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  firstPublishedDate: string;
  lastPublishedDate: string;
  minutesToRead: number;
  media?: {
    wixMedia?: {
      image?: { id?: string; url?: string; width?: number; height?: number };
    };
  };
  richContent?: { nodes: WixRichNode[]; documentStyle?: object };
  relatedPostIds?: string[];
}

const API_KEY = process.env.WIX_API_KEY!;
const SITE_ID = process.env.WIX_SITE_ID!;
const BASE = 'https://www.wixapis.com';

function headers() {
  return {
    Authorization: API_KEY,
    'wix-site-id': SITE_ID,
    'Content-Type': 'application/json',
  };
}

export async function getAllPosts(): Promise<WixPost[]> {
  const all: WixPost[] = [];
  let cursor: string | undefined;

  do {
    const body: Record<string, unknown> = { query: { paging: { limit: 100 } } };
    if (cursor) body.query = { ...body.query as object, cursorPaging: { cursor } };

    const res = await fetch(`${BASE}/blog/v3/posts/query`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    all.push(...(data.posts ?? []));
    cursor = data.pagingMetadata?.cursors?.next;
  } while (cursor);

  return all;
}

export async function getPostBySlug(slug: string): Promise<WixPost | null> {
  const res = await fetch(
    `${BASE}/blog/v3/posts/slugs/${slug}?fieldsets=RICH_CONTENT`,
    {
      headers: headers(),
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.post ?? null;
}

export async function getRelatedPosts(ids: string[]): Promise<WixPost[]> {
  if (!ids.length) return [];
  const res = await fetch(`${BASE}/blog/v3/posts/query`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ query: { filter: { id: { $in: ids } } } }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.posts ?? [];
}

export function wixImageUrl(id: string, w = 800, h = 500): string {
  return `https://static.wixstatic.com/media/${id}/v1/fill/w_${w},h_${h},al_c,q_85,usm_0.66_1.00_0.01,enc_auto/${id}`;
}
