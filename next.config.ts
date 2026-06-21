import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Original redirects ────────────────────────────────────────────────
      { source: '/glp-1',                destination: '/glp1',                         permanent: true },
      { source: '/contact',              destination: '/consultation',                  permanent: true },
      { source: '/contact-us',           destination: '/consultation',                  permanent: true },
      { source: '/terms',                destination: '/terms-conditions',              permanent: true },
      { source: '/home',                 destination: '/',                              permanent: true },
      { source: '/team',                 destination: '/',                              permanent: true },
      { source: '/our-team',             destination: '/',                              permanent: true },
      { source: '/weight-loss-programs', destination: '/packages',                      permanent: true },
      { source: '/book',                 destination: '/consultation',                  permanent: true },
      { source: '/book-now',             destination: '/consultation',                  permanent: true },

      // ── High-traffic Wix flat URLs (from Google Search Console data) ──────
      { source: '/medical-weight-loss',  destination: '/weight-loss',                  permanent: true },
      { source: '/muscle-stimulation',   destination: '/packages/muscle-stimulation',  permanent: true },
      { source: '/fatdissolving',        destination: '/packages/fat-dissolving',      permanent: true },
      { source: '/fat-dissolving',       destination: '/packages/fat-dissolving',      permanent: true },
      { source: '/fat-reduction',        destination: '/packages/fat-freezing',        permanent: true },
      { source: '/fat-freezing',         destination: '/packages/fat-freezing',        permanent: true },
      { source: '/skin-tightening',      destination: '/packages/skin-tightening',     permanent: true },
      { source: '/lymphatic-drainage',   destination: '/packages/lymphatic-drainage',  permanent: true },
      { source: '/anti-cellulite',       destination: '/packages/anti-cellulite',      permanent: true },
      { source: '/medical-glp-1-lp',    destination: '/glp1',                         permanent: true },
      { source: '/lipocavitation',       destination: '/packages/lipocavitation',      permanent: true },

      // ── Treatment brand-name variants ─────────────────────────────────────
      { source: '/coolsculpting',        destination: '/packages/fat-freezing',        permanent: true },
      { source: '/cool-sculpting',       destination: '/packages/fat-freezing',        permanent: true },
      { source: '/cryolipolysis',        destination: '/packages/fat-freezing',        permanent: true },
      { source: '/lemon-bottle',         destination: '/packages/fat-dissolving',      permanent: true },
      { source: '/aqualyx',              destination: '/packages/fat-dissolving',      permanent: true },
      { source: '/emsculpt',             destination: '/packages/muscle-stimulation',  permanent: true },
      { source: '/emsculpt-neo',         destination: '/packages/muscle-stimulation',  permanent: true },
      { source: '/velashape',            destination: '/packages/skin-tightening',     permanent: true },
      { source: '/velashape-iii',        destination: '/packages/skin-tightening',     permanent: true },
      { source: '/rf-body-treatment',    destination: '/packages/skin-tightening',     permanent: true },
      { source: '/cellulite-treatment',  destination: '/packages/anti-cellulite',      permanent: true },

      // ── Legacy Wix blog & product pages (wildcard) ────────────────────────
      { source: '/post/:slug*',          destination: '/',                             permanent: true },
      { source: '/blog/:path*',          destination: '/',                             permanent: true },
      { source: '/product-page/:slug*',  destination: '/packages',                    permanent: true },
      { source: '/store/:path*',         destination: '/packages',                    permanent: true },

      // ── Other common Wix page URL patterns ────────────────────────────────
      { source: '/about',                destination: '/',                             permanent: true },
      { source: '/about-us',             destination: '/',                             permanent: true },
      { source: '/services',             destination: '/packages',                     permanent: true },
      { source: '/treatments',           destination: '/packages',                     permanent: true },
      { source: '/treatment/:slug*',     destination: '/packages',                     permanent: true },
      { source: '/pricing',              destination: '/packages',                     permanent: true },
      { source: '/prices',               destination: '/packages',                     permanent: true },
      { source: '/faq',                  destination: '/weight-loss',                  permanent: true },
      { source: '/gallery',              destination: '/',                             permanent: true },
      { source: '/testimonials',         destination: '/',                             permanent: true },
      { source: '/results',              destination: '/',                             permanent: true },
    ];
  },
};

export default nextConfig;
