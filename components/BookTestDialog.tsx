'use client';

import { useEffect, useRef } from 'react';
import { cfg } from '@/lib/config';
import { gsap, prefersReducedMotion, setScrollLocked } from '@/lib/gsap';
import { useBookTest } from '@/context/BookTestContext';
import Icon from '@/components/ui/Icon';

const d = cfg.bookTestDialog;

export default function BookTestDialog() {
  const { isOpen, closeDialog } = useBookTest();
  const dialog = useRef<HTMLDialogElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = dialog.current;
    const p = panel.current;
    if (!el || !p) return;
    const reduce = prefersReducedMotion();

    if (isOpen && !el.open) {
      el.showModal();
      setScrollLocked(true);
      gsap.fromTo(el, { '--scrim': 0 }, { '--scrim': 1, duration: reduce ? 0 : 0.3, ease: 'ui-out' });
      gsap.fromTo(
        p,
        { autoAlpha: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.96, filter: reduce ? 'none' : 'blur(8px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: reduce ? 0.15 : 0.45, ease: 'ui-drawer', clearProps: 'filter' },
      );
    } else if (!isOpen && el.open) {
      // exit along the entry path
      gsap.to(el, { '--scrim': 0, duration: 0.2 });
      gsap.to(p, {
        autoAlpha: 0,
        y: reduce ? 0 : 24,
        scale: reduce ? 1 : 0.96,
        duration: reduce ? 0.1 : 0.22,
        ease: 'ui-out',
        onComplete: () => {
          el.close();
          setScrollLocked(false);
        },
      });
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="book-title"
      onCancel={(e) => {
        e.preventDefault(); // let the exit animation run
        closeDialog();
      }}
      onClick={(e) => e.target === dialog.current && closeDialog()}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-transparent open:flex open:items-end open:justify-center sm:open:items-center"
      style={{ background: 'rgba(20,38,74, calc(var(--scrim, 0) * 0.5))' } as React.CSSProperties}
    >
      <div ref={panel} className="glass invisible w-full max-w-md overflow-hidden rounded-2xl bg-white/90 opacity-0">
        <div className="relative bg-navy px-6 pb-6 pt-6">
          <span aria-hidden="true" className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-saffron/30 blur-2xl" />
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close"
            className="press absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-white transition-colors duration-200 hover:bg-white/22"
          >
            <Icon name="X" size={16} weight="bold" />
          </button>
          <h2 id="book-title" className="relative font-display text-2xl font-semibold text-white">
            {d.heading}
          </h2>
          <p className="relative mt-1 text-sm text-white/65">{d.subtext}</p>
        </div>

        <div className="space-y-3 p-5">
          <a
            href={cfg.contact.phone.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeDialog}
            className="press group flex items-center gap-4 rounded-2xl bg-forest-pale p-4 transition-colors duration-200 hover:bg-[#d8eedf]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
              <Icon name="WhatsApp" size={26} weight="fill" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-forest">{d.whatsapp.label}</span>
              <span className="block text-sm text-forest/80">{d.whatsapp.description}</span>
              <span className="mt-1 inline-block rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-forest">{d.whatsapp.subtext}</span>
            </span>
            <Icon name="ArrowRight" size={18} className="shrink-0 text-forest transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>

          <a
            href={cfg.contact.phone.primaryTel}
            onClick={closeDialog}
            className="press group flex items-center gap-4 rounded-2xl bg-navy-pale p-4 transition-colors duration-200 hover:bg-[#dfe4f0]"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <Icon name="Phone" size={24} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-navy">{d.call.label}</span>
              <span className="block text-sm text-muted">{cfg.contact.phone.primary}</span>
              <span className="mt-1 inline-block rounded-full bg-white/70 px-2 py-0.5 text-[11px] font-semibold text-navy">{d.call.subtext}</span>
            </span>
            <Icon name="ArrowRight" size={18} className="shrink-0 text-navy transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        <p className="px-6 pb-5 text-center text-xs text-muted">Our team is available {cfg.hours.short}</p>
      </div>
    </dialog>
  );
}
