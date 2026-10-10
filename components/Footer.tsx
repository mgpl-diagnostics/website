import Image from 'next/image';
import { cfg } from '@/lib/config';
import Icon from '@/components/ui/Icon';
import { MODEL_CREDITS } from '@/lib/model-credits';

const f = cfg.footer;
const logo = cfg.assets.logo;

const CONTACT = [
  { icon: 'Phone', text: cfg.contact.phone.primary, href: cfg.contact.phone.primaryTel },
  { icon: 'Mail', text: cfg.contact.email.info, href: `mailto:${cfg.contact.email.info}` },
  { icon: 'MapPin', text: `${cfg.address.city}, ${cfg.address.state}`, href: cfg.maps.shareLink },
  { icon: 'Clock', text: cfg.hours.display },
] as const;

const SOCIAL = [
  { label: 'WhatsApp', icon: 'WhatsApp', href: cfg.contact.phone.whatsapp },
  { label: 'Email', icon: 'Mail', href: `mailto:${cfg.contact.email.info}` },
  { label: 'Website', icon: 'Globe', href: cfg.social.website },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" aria-label="Site footer" className="relative bg-navy text-white">
      {/* Urgent strip */}
      <div className="bg-saffron">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="font-display text-lg font-medium">{f.emergencyText}</p>
          <a
            href={cfg.contact.phone.primaryTel}
            className="press inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-saffron transition-colors duration-200 hover:bg-cream"
          >
            <Icon name="Phone" size={16} weight="bold" />
            {f.emergencyCtaLabel} {cfg.contact.phone.primary}
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <a href="#top" aria-label={`${cfg.brand.name} home`} className="inline-block">
            {/* Reversed artwork: icon + wordmark already drawn for navy, no CSS filters */}
            <Image src={logo.darkSrc} alt={cfg.brand.fullName} width={logo.width} height={logo.height} unoptimized className="h-16 w-auto" />
          </a>
          <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-white/65">
            {f.brandTagline} {cfg.brand.foundedYear}.
          </p>
          <ul className="mt-8 space-y-3">
            {CONTACT.map((c) => {
              const body = (
                <>
                  <Icon name={c.icon} size={17} className="shrink-0 text-amber" />
                  <span>{c.text}</span>
                </>
              );
              return (
                <li key={c.text}>
                  {'href' in c ? (
                    <a href={c.href} className="flex items-center gap-3 text-sm text-white/75 transition-colors duration-200 hover:text-white">
                      {body}
                    </a>
                  ) : (
                    <p className="flex items-center gap-3 text-sm text-white/75">{body}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {[f.columns.services, f.columns.information].map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h3 className="font-display text-base font-semibold">{col.heading}</h3>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/65 transition-colors duration-200 hover:text-amber">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-xs text-white/50">
            <p>
              © {year} {f.copyrightSuffix}
            </p>
            {/* CC-BY attribution for the 3D models (title, author, source, licence) */}
            <details className="mt-2 group">
              <summary className="cursor-pointer list-none text-white/45 transition-colors duration-200 hover:text-white/75">
                <span className="inline-flex items-center gap-1">3D model credits <Icon name="CaretDown" size={12} className="transition-transform duration-200 group-open:rotate-180" /></span>
              </summary>
              <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                {MODEL_CREDITS.map((m) => (
                  <li key={m.file}>
                    <a href={m.source} target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 hover:text-white">
                      {m.title}
                    </a>{' '}
                    by {m.author}, {m.license}
                  </li>
                ))}
              </ul>
            </details>
          </div>
          <ul className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="press flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white transition-colors duration-200 hover:bg-saffron"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
