'use client';

import { useMemo, useRef, useState } from 'react';
import { cfg } from '@/lib/config';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { scrollState } from '@/lib/scroll-store';
import { useBookTest } from '@/context/BookTestContext';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

const tc = cfg.testCatalogue;

export default function TestCategories() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const { openDialog } = useBookTest();
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q) {
      return tc.allTests.flatMap((g) => g.tests.filter((t) => t.name.toLowerCase().includes(q)).map((t) => ({ ...t, category: g.category })));
    }
    if (active) {
      const g = tc.allTests.find((x) => x.category === active);
      return (g?.tests ?? []).map((t) => ({ ...t, category: active }));
    }
    return null;
  }, [q, active]);

  const catColor = (label: string) => tc.categories.find((c) => c.label === label)?.color ?? 'var(--navy)';

  // Re-run a short stagger whenever the visible list changes, then re-measure triggers below
  useGSAP(
    () => {
      const rows = list.current?.querySelectorAll('[data-row]');
      if (rows?.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(rows, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.03, overwrite: true });
      }
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [active, q], revertOnUpdate: false },
  );

  const choose = (label: string) => {
    setQuery('');
    setExpanded(null);
    setActive((cur) => {
      const next = cur === label ? null : label;
      scrollState.bodyRegion = next; // body scan focuses the organ for this category
      return next;
    });
  };

  return (
    <section ref={root} id="test-categories" data-station aria-label="Test categories" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="left">
        <SectionHeading heading={tc.heading} accent={tc.headingAccent} stack={false} />

        <div data-reveal className="mb-10 flex flex-col gap-5">
          {/* Category chips */}
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {tc.categories.map((cat) => {
              const on = active === cat.label && !q;
              return (
                <button
                  key={cat.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(cat.label)}
                  className="press flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-sm font-medium transition-colors duration-200"
                  style={{
                    background: on ? cat.color : 'rgba(255,255,255,0.75)',
                    borderColor: on ? cat.color : 'var(--border)',
                    color: on ? '#fff' : 'var(--charcoal)',
                  }}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full"
                    style={{ background: on ? 'rgba(255,255,255,0.22)' : cat.bg, color: on ? '#fff' : cat.color }}
                  >
                    <Icon name={cat.icon} size={15} />
                  </span>
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">Search tests</span>
            <Icon name="Microscope" size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setExpanded(null);
                scrollState.bodyRegion = null;
              }}
              placeholder="Search a test, e.g. HbA1c"
              className="w-full rounded-full border border-line bg-white/85 py-3 pl-11 pr-4 text-sm text-charcoal outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70 focus:border-saffron focus:shadow-[0_0_0_4px_rgba(194,65,12,0.12)]"
            />
          </label>
        </div>

        <div ref={list} aria-live="polite">
          {results === null ? (
            <>
              <h3 className="mb-5 font-display text-2xl font-semibold text-navy">{tc.popularTestsHeading}</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {tc.popularTests.map((t) => (
                  <li key={t.name} data-row className="lift flex items-center justify-between gap-3 rounded-2xl bg-white p-5 shadow-[0_14px_34px_-22px_rgba(20,38,74,0.45)]">
                    <div className="min-w-0">
                      <span className="mb-1.5 inline-block rounded-full bg-saffron-muted px-2 py-0.5 text-[10px] font-semibold text-saffron">{t.tag}</span>
                      <p className="truncate text-sm font-semibold text-charcoal">{t.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                        <Icon name="Clock" size={12} /> {t.turnaround}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-mono text-base font-semibold text-navy">{t.price}</p>
                      <button type="button" onClick={openDialog} className="press mt-1 rounded-full bg-navy-pale px-3 py-1 text-[11px] font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-white">
                        {tc.bookLabel}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold text-navy">
                  {q ? `Results for “${query.trim()}”` : `${tc.allTestsHeading}: ${active}`}
                  <span className="ml-2 font-mono text-sm font-normal text-muted">{results.length}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setActive(null);
                    setQuery('');
                    scrollState.bodyRegion = null;
                  }}
                  className="press inline-flex items-center gap-1.5 rounded-full bg-navy-pale px-4 py-2 text-sm font-medium text-navy"
                >
                  <Icon name="ArrowLeft" size={15} /> {tc.backLabel}
                </button>
              </div>

              {results.length === 0 ? (
                <p className="rounded-2xl bg-white p-8 text-center text-sm text-muted shadow-[0_14px_34px_-22px_rgba(20,38,74,0.45)]">
                  No test matches that name. Call us and we&apos;ll help you find it.
                </p>
              ) : (
                <ul className="space-y-2">
                  {results.map((t) => {
                    const id = `${t.category}-${t.name}`;
                    const open = expanded === id;
                    const color = catColor(t.category);
                    return (
                      <li
                        key={id}
                        data-row
                        className="overflow-hidden rounded-2xl bg-white/95 ring-1 transition-shadow duration-200"
                        style={{ ['--tw-ring-color' as string]: open ? color : 'rgba(20,38,74,0.06)' }}
                      >
                        <div className="flex items-center gap-3 p-4">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted">
                              <span className="inline-flex items-center gap-1">
                                <Icon name="Clock" size={12} /> {t.turnaround}
                              </span>
                              {t.preparation && <span className="rounded-full bg-cream px-2 py-0.5">{t.preparation}</span>}
                              {q && (
                                <span className="rounded-full px-2 py-0.5 font-medium" style={{ color, background: 'var(--cream)' }}>
                                  {t.category}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="shrink-0 font-mono text-base font-semibold text-navy">{t.price}</p>
                          <button type="button" onClick={openDialog} className="press shrink-0 rounded-full bg-navy-pale px-3 py-1 text-[11px] font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-white">
                            {tc.bookLabel}
                          </button>
                          {t.parameters && (
                            <button
                              type="button"
                              onClick={() => setExpanded(open ? null : id)}
                              aria-expanded={open}
                              aria-label={open ? 'Hide parameters' : 'Show parameters'}
                              className="press flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200"
                              style={{ background: open ? color : 'var(--cream)', color: open ? '#fff' : 'var(--muted)' }}
                            >
                              <Icon name="CaretDown" size={14} weight="bold" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                        </div>
                        {t.parameters && (
                          <div className="collapse-grid" data-open={open}>
                            <div>
                              <div className="border-t border-dashed px-4 pb-4 pt-3" style={{ borderColor: `${color}55` }}>
                                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
                                  {tc.parametersLabel}
                                </p>
                                <p className="text-xs leading-relaxed text-muted">{t.parameters}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </>
          )}
        </div>
        </div>
      </div>
    </section>
  );
}
