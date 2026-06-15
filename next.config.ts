import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/glp-1', destination: '/glp1', permanent: true },
      { source: '/contact', destination: '/consultation', permanent: true },
      { source: '/terms', destination: '/terms-conditions', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/team', destination: '/', permanent: true },
      { source: '/our-team', destination: '/', permanent: true },
      { source: '/weight-loss-programs', destination: '/packages', permanent: true },
      { source: '/book', destination: '/consultation', permanent: true },
      { source: '/book-now', destination: '/consultation', permanent: true },
    ];
  },
};

export default nextConfig;
