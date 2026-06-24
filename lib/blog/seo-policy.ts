type BlogPostLike = {
  slug: string;
  title?: string;
  excerpt?: string;
};

export type BlogSeoDecision = 'keep' | 'rewrite' | 'migrate' | 'noindex';

export type BlogSeoPolicy = {
  decision: BlogSeoDecision;
  index: boolean;
  reason: string;
};

const highValueSlimmingSlugs = new Set([
  'visceral-fat-malta',
  'hormone-imbalance-weight-gain-malta',
  'pcos-weight-loss-malta',
  'cortisol-belly-fat-malta',
  'emotional-eating-weight-loss-malta',
  'insulin-resistance-weight-gain-malta',
  'weight-loss-after-40-malta',
  'ozempic-glp1-malta-guide',
  'body-contouring-malta',
  'body-contouring-malta-1',
  'coolsculpting-malta-price',
  'fat-freezing-in-malta-what-it-is-how-it-works-and-what-to-realistically-expect',
  'ultrasound-cavitation-malta',
  'anti-cellulite-treatment-velashape-malta',
  'skin-tightening-treatment-malta',
]);

const offTopicAestheticsPattern =
  /\b(botox|filler|fillers|lip filler|russian lip|microneedling|hydrafacial|facial|peel|pigmentation|acne scar|laser hair|hair-free|under-eye|bridal beauty|skin booster|skin boosters|profhilo|polynucleotide)\b/i;

const slimmingSupportPattern =
  /\b(weight loss|slimming|glp|ozempic|mounjaro|semaglutide|tirzepatide|fat freezing|coolsculpting|cryolipolysis|fat dissolving|lipocavitation|cavitation|emsculpt|body contouring|cellulite|skin tightening|lymphatic|visceral fat|insulin|pcos|cortisol|hormone|menopause|emotional eating)\b/i;

export function getBlogSeoPolicy(post: BlogPostLike): BlogSeoPolicy {
  if (highValueSlimmingSlugs.has(post.slug)) {
    return { decision: 'keep', index: true, reason: 'high-value slimming cluster' };
  }

  const haystack = `${post.slug} ${post.title ?? ''} ${post.excerpt ?? ''}`;

  if (offTopicAestheticsPattern.test(haystack)) {
    return { decision: 'migrate', index: false, reason: 'aesthetics topic better suited to Carisma Aesthetics' };
  }

  if (slimmingSupportPattern.test(haystack)) {
    return { decision: 'rewrite', index: true, reason: 'adjacent slimming/body-contouring support topic' };
  }

  return { decision: 'noindex', index: false, reason: 'not clearly aligned to slimming topical authority' };
}

export function truncateMetaDescription(text: string, maxLength = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLength) return clean;
  const sliced = clean.slice(0, maxLength - 1);
  return `${sliced.slice(0, Math.max(0, sliced.lastIndexOf(' '))).replace(/[.,;:]+$/, '')}.`;
}
