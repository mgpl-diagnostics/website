import { cfg } from '@/lib/config';
import BookButton from '@/components/ui/BookButton';
import Icon from '@/components/ui/Icon';

export default function FinalCTA() {
  return (
    <section data-station aria-label="Book a test" className="section-pad relative">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 data-reveal className="text-balance font-display text-5xl font-semibold leading-[1.02] text-navy sm:text-6xl lg:text-7xl">
          Your next report,
          <br />
          <span className="font-light text-saffron">ready by evening.</span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
          Book a test in under a minute. We collect at home, report the same day, and a pathologist signs every result.
        </p>
        <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <BookButton>{cfg.nav.ctaLabel}</BookButton>
          <a
            href={cfg.contact.phone.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="press inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-6 py-3.5 text-sm font-semibold text-navy transition-colors duration-200 hover:border-navy/35 hover:bg-white"
          >
            <Icon name="WhatsApp" size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
