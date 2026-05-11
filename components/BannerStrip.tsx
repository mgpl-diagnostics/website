import Image from 'next/image';
import { siteConfig } from '@/lib/config';

/**
 * Full-width brand banner strip displaying banner.png.
 * Placed immediately after the Hero section.
 * This is a Server Component — no 'use client' needed.
 */
export default function BannerStrip() {
  return (
    <div className="w-full overflow-hidden" aria-hidden="true">
      <Image
        src={siteConfig.banner.src}
        alt={siteConfig.banner.alt}
        width={siteConfig.banner.width}
        height={siteConfig.banner.height}
        className="w-full h-auto"
        priority
      />
    </div>
  );
}
