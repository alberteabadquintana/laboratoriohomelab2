/**
 * URL del backend interno de HomeLab (reservas, informes y PDF).
 * Debe configurarse en .env.local / variables de producción.
 * No usamos fallback a localhost para no apuntar silenciosamente a un
 * servidor inexistente en producción.
 */
export function getServerApiUrl(): string | null {
  const raw = (
    process.env.HOMELAB_API_URL ||
    process.env.NEXT_PUBLIC_HOMELAB_API_URL ||
    ""
  ).trim();

  return raw ? raw.replace(/\/$/, "") : null;
}

/**
 * URL pública del sitio, usada para metadata, sitemap y robots.
 */
export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}
