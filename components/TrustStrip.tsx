'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { Users, Clock, Award, Zap } from 'lucide-react';

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  isInView: boolean;
}

function CountUp({ end, suffix = '', prefix = '', isInView }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, end]);

  return (
    <span>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

const metrics = [
  {
    icon: Users,
    end: 50000,
    suffix: '+',
    label: 'Tests Conducted',
    sub: 'Across all panels',
  },
  {
    icon: Award,
    end: 100,
    suffix: '%',
    label: 'NABL Standards',
    sub: 'Certified processes',
  },
  {
    icon: Clock,
    end: 6,
    suffix: 'hr',
    label: 'Report Turnaround',
    sub: 'Same-day availability',
  },
  {
    icon: Zap,
    end: 200,
    suffix: '+',
    label: 'Test Panels',
    sub: 'Tests & packages',
  },
];

export default function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      aria-label="Trust metrics"
      style={{ background: 'var(--navy)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex flex-col items-center text-center px-4 lg:px-8 relative"
              >
                {/* Divider — not on first item */}
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 hidden lg:block"
                    style={{ background: 'rgba(255,255,255,0.12)' }}
                  />
                )}

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(230,81,0,0.2)', border: '1px solid rgba(230,81,0,0.3)' }}
                >
                  <Icon className="w-5 h-5" color="var(--saffron)" />
                </div>

                {/* Number */}
                <p
                  className="font-display font-bold text-4xl lg:text-5xl text-white leading-none mb-1"
                >
                  <CountUp end={metric.end} suffix={metric.suffix} isInView={isInView} />
                </p>

                {/* Label */}
                <p
                  className="text-sm font-semibold mb-0.5"
                  style={{ color: 'var(--saffron)', fontFamily: 'var(--font-body)' }}
                >
                  {metric.label}
                </p>

                {/* Sub */}
                <p
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
                >
                  {metric.sub}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
