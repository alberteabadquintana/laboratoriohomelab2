import type { NextConfig } from "next";

// ─── CABECERAS DE SEGURIDAD HTTP ─────────────────────────────────────────────
// Aplican a todas las rutas del sitio público.
//
// Content-Security-Policy (CSP):
//   - default-src 'self'           → Solo recursos del mismo origen por defecto
//   - script-src  'self' + unsafe-inline (necesario para Next.js/React hidratación)
//   - style-src   'self' + unsafe-inline (Tailwind genera estilos inline)
//   - img-src     'self' data: blob: → Imágenes locales + data URIs (avatares, favicons)
//   - font-src    'self' + Google Fonts
//   - connect-src 'self' + wa.me    → Llamadas fetch al mismo origen + WhatsApp link
//   - frame-src   Google Maps       → Solo se permite incrustar el mapa de la sede
//   - object-src  'none'            → Sin plugins Flash/Java
//   - base-uri    'self'            → Evita ataques de inyección de base tag

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",  // unsafe-eval necesario para Next.js dev/prod
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://wa.me https://api.whatsapp.com",
  "frame-src https://www.google.com https://maps.google.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // ── Tipo de contenido ──────────────────────────────────────────────────────
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // ── Clickjacking: Bloquea que el sitio sea embebido en iframes externos ───
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // ── HSTS: Fuerza HTTPS por 1 año (solo efectivo en producción con HTTPS) ──
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  // ── Política de referencia: solo enviar origen en requests cross-origin ───
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // ── CSP: Política completa de fuentes de contenido ───────────────────────
  {
    key: "Content-Security-Policy",
    value: CSP,
  },
  // ── Permissions-Policy: Deshabilita APIs de hardware no utilizadas ────────
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()",
  },
  // ── DNS Prefetch: Desactiva pre-resolución de DNS para privacidad ─────────
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
  // ── XSS Protection: Protección legacy para navegadores antiguos ──────────
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

const nextConfig: NextConfig = {
  // Evita que Next infiera un workspace distinto por lockfiles externos.
  turbopack: {
    root: process.cwd(),
  },

  async headers() {
    return [
      {
        // Aplica a todas las rutas
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // ── Opciones adicionales de seguridad ──────────────────────────────────────
  // Oculta el header "X-Powered-By: Next.js" para no revelar el framework
  poweredByHeader: false,
};

export default nextConfig;
