import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/servicios`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/contactanos`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/resultados`, changeFrequency: 'yearly', priority: 0.6 },
    // /resultados/admin-login y /resultados/admin-dashboard quedan
    // fuera a propósito: no son contenido público a indexar.
  ];
}