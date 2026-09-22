const path = require("path");

/** Nest ichki manzil — bir domen rejimida rewrites shu yerga yo‘naltiradi */
const internalApi =
  process.env.INTERNAL_API_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8001";

/**
 * Ko'rinadigan domen (src/lib/brand.ts o'qiydi).
 *
 * Bu yerda aniq qiymat berilishi shart: aks holda `process.env` server
 * komponentda runtime da, klient bundlida esa build vaqtida hal bo'lib,
 * hidratsiya nomuvofiqligi chiqadi. `env` orqali ikkala tomonga bir xil
 * qiymat inline qilinadi.
 */
const siteDomain = (process.env.NEXT_PUBLIC_SITE_DOMAIN || "paylinker.uz")
  .trim()
  .replace(/^https?:\/\//, "")
  .replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_SITE_DOMAIN: siteDomain,
  },
  // Avoid wrong workspace root when a lockfile exists outside this project (e.g. user home).
  turbopack: {
    root: path.join(__dirname),
  },
  async rewrites() {
    return [
      { source: "/auth/:path*", destination: `${internalApi}/auth/:path*` },
      { source: "/vizitka/:path*", destination: `${internalApi}/vizitka/:path*` },
      { source: "/landings/:path*", destination: `${internalApi}/landings/:path*` },
      { source: "/telegram/:path*", destination: `${internalApi}/telegram/:path*` },
      { source: "/payments/:path*", destination: `${internalApi}/payments/:path*` },
      { source: "/health", destination: `${internalApi}/health` },
      {
        source: "/api/payments/click/:path*",
        destination: `${internalApi}/api/payments/click/:path*`,
      },
      {
        source: "/uploads/:path*",
        destination: `${internalApi}/uploads/:path*`,
      },
      {
        source: "/api/admin/:path*",
        destination: `${internalApi}/api/admin/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/admin", destination: "/gradeadmin", permanent: false },
      { source: "/admin/:path*", destination: "/gradeadmin/:path*", permanent: false },
    ];
  },
};

module.exports = nextConfig;