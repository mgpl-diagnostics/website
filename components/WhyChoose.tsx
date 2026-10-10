import { cfg } from '@/lib/config';
import Icon from '@/components/ui/Icon';

const wc = cfg.whyChoose;

export default function WhyChoose() {
  return (
    <section id="why-choose" data-station aria-label="Why choose MGPL" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="left">
          <div data-reveal>
            <h2 className="text-balance font-display text-4xl font-semibold leading-[1.04] text-navy sm:text-5xl lg:text-[3.5rem]">
              {wc.headingLine1} <span className="font-light text-saffron">{wc.headingLine2}</span> {wc.headingLine3}
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted">{wc.subtext}</p>
          </div>

          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {wc.features.map((f) => (
              <div key={f.title} data-reveal className="flex gap-4 border-t border-navy/10 py-6">
                <dt className="sr-only">{f.title}</dt>
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: f.iconBg, color: f.iconColor }}>
                  <Icon name={f.icon} fallback="CheckCircle2" size={22} />
                </span>
                <dd>
                  <span className="block font-display text-lg font-semibold text-navy">{f.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{f.description}</span>
                </dd>
              </div>
            ))}
          </dl>

          <figure data-reveal className="mt-10 max-w-xl border-l-2 border-saffron pl-6">
            <blockquote className="font-display text-2xl font-medium leading-snug text-navy">{wc.quote}</blockquote>
            <figcaption className="mt-3 text-sm text-muted">{wc.quoteAttrib}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
