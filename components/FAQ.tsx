'use client';

import { useState } from 'react';
import { cfg } from '@/lib/config';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

const fq = cfg.faq;

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-station aria-label="Frequently asked questions" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="left">
          <SectionHeading heading={fq.heading} accent={fq.headingAccent} subtext={fq.subtext} stack={false} />

        <ul className="space-y-3">
          {fq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                data-reveal
                className={`rounded-2xl bg-white transition-shadow duration-300 ${isOpen ? 'shadow-[0_24px_50px_-28px_rgba(194,65,12,0.5)]' : 'shadow-[0_10px_30px_-24px_rgba(20,38,74,0.45)]'}`}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`text-[15px] font-semibold leading-snug transition-colors duration-200 ${isOpen ? 'text-saffron' : 'text-charcoal'}`}>{item.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[background-color,color,transform] duration-300 ease-out-strong ${
                        isOpen ? 'rotate-45 bg-saffron text-white' : 'bg-cream text-navy'
                      }`}
                    >
                      <Icon name="Plus" size={15} weight="bold" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="collapse-grid" data-open={isOpen}>
                  <div>
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

          <p data-reveal className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-muted">
            <span>
              <span className="font-semibold text-charcoal">{fq.stillHaveQuestionsTitle}</span> {fq.stillHaveQuestionsSubtext}
            </span>
            <a
              href={cfg.contact.phone.primaryTel}
              className="press inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-mid"
            >
              <Icon name="Phone" size={16} />
              {fq.callCtaLabel}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
