'use client';

import { useBookTest } from '@/context/BookTestContext';
import Icon from '@/components/ui/Icon';

type Variant = 'primary' | 'navy' | 'link' | 'chip';

const STYLES: Record<Variant, string> = {
  primary:
    'group press inline-flex items-center gap-3 rounded-full bg-saffron py-2 pl-6 pr-2 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(194,65,12,0.6)] transition-colors duration-200 hover:bg-saffron-deep',
  navy:
    'group press inline-flex items-center gap-3 rounded-full bg-navy py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-navy-mid',
  link: 'group inline-flex items-center gap-1.5 text-xs font-semibold',
  chip:
    'press rounded-full bg-navy-pale px-3 py-1 text-[11px] font-semibold text-navy transition-colors duration-200 hover:bg-navy hover:text-white',
};

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  style?: React.CSSProperties;
  /** Show trailing arrow (button-in-button for primary/navy) */
  arrow?: boolean;
}

/** Opens the Book-a-Test dialog. Lets sections stay Server Components. */
export default function BookButton({ children, variant = 'primary', className = '', style, arrow = true }: Props) {
  const { openDialog } = useBookTest();
  const nested = variant === 'primary' || variant === 'navy';

  return (
    <button type="button" onClick={openDialog} className={`${STYLES[variant]} ${className}`} style={style}>
      {children}
      {arrow && nested && (
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 ease-out-strong group-hover:-translate-y-px group-hover:translate-x-0.5">
          <Icon name="ArrowUpRight" size={16} weight="bold" />
        </span>
      )}
      {arrow && variant === 'link' && (
        <Icon name="ArrowRight" size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}
