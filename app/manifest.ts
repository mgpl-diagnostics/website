import type { MetadataRoute } from 'next';
import { cfg } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: cfg.brand.fullName,
    short_name: cfg.brand.name,
    description: cfg.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF6EF',
    theme_color: '#FAF6EF',
    lang: 'en-IN',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  };
}
