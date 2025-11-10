// ✅ Versión final compatible con Next.js 16 (App Router + Turbopack)

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // 🖼️ Permite cargar iconos/meteo desde OpenWeather
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "openweathermap.org" },
    ],
  },

  // 🔒 Cabeceras de seguridad + caché útil para SEO
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
    ];
  },

  // 🔁 SEO: redirige la raíz hacia /es
  async redirects() {
    return [{ source: "/", destination: "/es", permanent: true }];
  },
};

export default nextConfig;
