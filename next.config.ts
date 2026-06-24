import type { NextConfig } from "next";

// ---------------------------------------------------------------------------
// Rewrites: URL preserved in browser. Use for any URL with active ad traffic,
// email campaigns, or brand-name search landing pages — UTM params stay intact,
// ad quality score unaffected, and the page content is immediately visible.
// ---------------------------------------------------------------------------
const adRewrites: { source: string; destination: string }[] = [
  // ── Active ad landing pages ───────────────────────────────────────────────
  { source: '/medical-weight-loss',  destination: '/weight-loss' },
  { source: '/medical-glp-1-lp',    destination: '/glp1' },

  // ── High-traffic treatment URL aliases (from Google Search Console) ───────
  { source: '/fat-freezing',         destination: '/packages/fat-freezing' },
  { source: '/fat-reduction',        destination: '/packages/fat-freezing' },
  { source: '/fat-dissolving',       destination: '/packages/fat-dissolving' },
  { source: '/fatdissolving',        destination: '/packages/fat-dissolving' },
  { source: '/muscle-stimulation',   destination: '/packages/muscle-stimulation' },
  { source: '/skin-tightening',      destination: '/packages/skin-tightening' },
  { source: '/lymphatic-drainage',   destination: '/packages/lymphatic-drainage' },
  { source: '/anti-cellulite',       destination: '/packages/anti-cellulite' },
  { source: '/lipocavitation',       destination: '/packages/lipocavitation' },

  // ── Brand-name variants (Google Ads keywords — URL must stay for tracking) ─
  { source: '/coolsculpting',        destination: '/packages/fat-freezing' },
  { source: '/cool-sculpting',       destination: '/packages/fat-freezing' },
  { source: '/cryolipolysis',        destination: '/packages/fat-freezing' },
  { source: '/lemon-bottle',         destination: '/packages/fat-dissolving' },
  { source: '/aqualyx',              destination: '/packages/fat-dissolving' },
  { source: '/emsculpt',             destination: '/packages/muscle-stimulation' },
  { source: '/emsculpt-neo',         destination: '/packages/muscle-stimulation' },
  { source: '/velashape',            destination: '/packages/skin-tightening' },
  { source: '/velashape-iii',        destination: '/packages/skin-tightening' },
  { source: '/rf-body-treatment',    destination: '/packages/skin-tightening' },
  { source: '/cellulite-treatment',  destination: '/packages/anti-cellulite' },

  // ── Utility aliases (bookmarked links, old Wix nav) ───────────────────────
  { source: '/contact',              destination: '/consultation' },
  { source: '/contact-us',           destination: '/consultation' },
  { source: '/book',                 destination: '/consultation' },
  { source: '/book-now',             destination: '/consultation' },
  { source: '/faq',                  destination: '/weight-loss' },
];

// ---------------------------------------------------------------------------
// Redirects: browser URL changes (308 permanent). Only for permanently retired
// pages with no active ad spend or significant ongoing traffic.
// ---------------------------------------------------------------------------
const nextConfig: NextConfig = {
  async rewrites() {
    return adRewrites;
  },
  async redirects() {
    return [
      // ── URL typo / slug variant fixes ─────────────────────────────────────
      { source: '/glp-1',                destination: '/glp1',             permanent: true },
      { source: '/terms',                destination: '/terms-conditions',  permanent: true },

      // ── Dead Wix pages ────────────────────────────────────────────────────
      { source: '/home',                 destination: '/',                  permanent: true },
      { source: '/team',                 destination: '/',                  permanent: true },
      { source: '/our-team',             destination: '/',                  permanent: true },
      { source: '/about',                destination: '/',                  permanent: true },
      { source: '/about-us',             destination: '/',                  permanent: true },
      { source: '/gallery',              destination: '/',                  permanent: true },
      { source: '/testimonials',         destination: '/',                  permanent: true },
      { source: '/results',              destination: '/',                  permanent: true },

      // ── Dead Wix nav pages ────────────────────────────────────────────────
      { source: '/weight-loss-programs', destination: '/packages',          permanent: true },
      { source: '/services',             destination: '/packages',          permanent: true },
      { source: '/treatments',           destination: '/packages',          permanent: true },
      { source: '/treatment/:slug*',     destination: '/packages',          permanent: true },
      { source: '/pricing',              destination: '/packages',          permanent: true },
      { source: '/prices',               destination: '/packages',          permanent: true },

      // ── Legacy Wix blog & store (wildcard) ────────────────────────────────
      // NOTE: /blog/:path* redirect removed — real blog pages exist under app/blog/
      { source: '/post/:slug*',          destination: '/',                  permanent: true },
      { source: '/product-page/:slug*',  destination: '/packages',          permanent: true },
      { source: '/store/:path*',         destination: '/packages',          permanent: true },
    ];
  },
};

export default nextConfig;
