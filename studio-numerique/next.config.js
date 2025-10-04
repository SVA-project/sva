/** @type {import('next').NextConfig} */
// 🔒 PRIVÉ STATUS: Configuration Next.js Studio SVA™
// Système Vie Augmentée 2025
// STATUS: PRIVÉ - NON PUBLIC

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false // Utilisation du router pages
  },
  env: {
    KYBER_ENABLED: process.env.KYBER_ENABLED || 'true',
    KYBER_MAX_LATENCY: process.env.KYBER_MAX_LATENCY || '100',
    KYBER_TARGET_LATENCY: process.env.KYBER_TARGET_LATENCY || '30'
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-SVA-Studio',
            value: 'PRIVATE-NUMERIQUE'
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow'
          }
        ]
      }
    ];
  },
  // ⚡ ⓂÉCURITÉ PRIVéE
  poweredByHeader: false,
  generateEtags: false
};

module.exports = nextConfig;