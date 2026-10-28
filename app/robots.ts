import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/env';

const SITE_URL = getSiteUrl();

export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Regla general: bots de búsqueda pueden indexar el sitio público
        userAgent: '*',
        allow: '/',
        disallow: [
          // Páginas con datos personales o flujos de reserva — no indexar
          '/resultados',
          '/QuieroMiExamen',
          // Rutas admin/internas (por si se agregan en el futuro)
          '/admin',
          '/api/',
        ],
      },
      {
        // Bloquear completamente scrapers y bots agresivos conocidos
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Google-Extended',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
