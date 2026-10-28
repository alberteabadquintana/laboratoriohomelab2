import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/env';

const SITE_URL = getSiteUrl();

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/nosotros`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/servicios`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/contactanos`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${SITE_URL}/resultados`, changeFrequency: 'yearly', priority: 0.6 },
  ];
}
