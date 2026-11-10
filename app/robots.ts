import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

// Everything on the site is public. Search and AI-answer crawlers (Googlebot, Bingbot,
// OAI-SearchBot, Claude-SearchBot, PerplexityBot…) are all allowed, so the lab can be found
// and cited. To opt out of AI *training* only, add rules for GPTBot, ClaudeBot,
// Google-Extended, Applebot-Extended, CCBot or Bytespider here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
