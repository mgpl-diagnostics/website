import { cfg } from '@/lib/config';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

const t = cfg.testimonials;

/**
 * Editorial quotes, no avatars. Content is sample copy until verified
 * Google reviews are supplied, and the section says so.
 */
export default function Testimonials() {
  const [lead, ...rest] = t.items;
  return (
    <section id="testimonials" data-station aria-label="Patient testimonials" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="left">
          <SectionHeading heading={t.heading} accent={t.headingAccent} subtext={t.subtext} />

          {lead && (
            <figure data-reveal className="border-t border-navy/10 pt-10">
              <Icon name="Quote" size={40} weight="fill" className="text-saffron/25" />
              <blockquote className="mt-4 max-w-[34ch] text-balance font-display text-3xl font-medium leading-snug text-navy sm:text-4xl">
                {lead.text}
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-semibold text-charcoal">{lead.name}</span>, {lead.location} · {lead.testType}
              </figcaption>
            </figure>
          )}

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {rest.slice(0, 4).map((item) => (
              <figure key={item.name} data-reveal className="border-t border-navy/10 pt-6">
                <div className="flex text-amber" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Icon key={s} name="Star" size={14} weight="fill" />
                  ))}
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-charcoal">{item.text}</blockquote>
                <figcaption className="mt-4 text-xs text-muted">
                  <span className="font-semibold text-charcoal">{item.name}</span>, {item.location}
                </figcaption>
              </figure>
            ))}
          </div>

          <p data-reveal className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="flex text-amber">
              {[0, 1, 2, 3, 4].map((s) => (
                <Icon key={s} name="Star" size={15} weight="fill" />
              ))}
            </span>
            <span className="font-semibold text-charcoal">
              {t.rating.score}/{t.rating.maxScore}
            </span>
            from {t.rating.reviewCount} Google reviews
            <span className="w-full text-xs text-muted/80">Sample reviews shown. Verified Google reviews will replace them.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
