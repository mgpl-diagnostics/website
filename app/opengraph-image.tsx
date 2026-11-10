import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { cfg } from '@/lib/config';

// Link preview for WhatsApp, Facebook, X and search: 1200×630, rendered at build time.
export const alt = `${cfg.brand.fullName}: ${cfg.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const icon = await readFile(join(process.cwd(), 'app/icon.svg'), 'utf8');
  const iconSrc = `data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#FAF6EF',
          color: '#14264A',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <img src={iconSrc} width={96} height={96} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -1 }}>{cfg.brand.name}</div>
            <div style={{ fontSize: 26, color: '#C2410C' }}>Maa Gayatri Path Lab</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            {cfg.brand.tagline}
          </div>
          <div style={{ fontSize: 30, color: '#4B5563' }}>
            {`Blood tests and home sample collection in ${cfg.seo.areaServed.slice(0, 2).join(' and ')}`}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#14264A' }}>
          {`${cfg.contact.phone.primary} · ${cfg.hours.short}`}
        </div>
      </div>
    ),
    size,
  );
}
