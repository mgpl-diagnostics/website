import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

// One page today. Add each new public route here (with its own lastModified).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: absoluteUrl('/'), lastModified: new Date('2026-11-10'), changeFrequency: 'monthly', priority: 1 }];
}
