interface Props {
  heading: string;
  accent?: string;
  subtext?: string;
  tone?: 'light' | 'dark';
  /** Accent on its own line (default) or inline after the heading */
  stack?: boolean;
  className?: string;
}

/** Section title. No kicker/eyebrow: the heading carries its own weight. */
export default function SectionHeading({ heading, accent, subtext, tone = 'light', stack = true, className = '' }: Props) {
  const dark = tone === 'dark';
  return (
    <div data-reveal className={`mb-12 lg:mb-14 ${className}`}>
      <h2 className={`text-balance font-display text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-[3.5rem] ${dark ? 'text-white' : 'text-navy'}`}>
        {heading}
        {accent && (
          <>
            {stack ? <br /> : ' '}
            <span className={`font-light ${dark ? 'text-amber' : 'text-saffron'}`}>{accent}</span>
          </>
        )}
      </h2>
      {subtext && <p className={`mt-5 max-w-[52ch] text-base leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>{subtext}</p>}
    </div>
  );
}
