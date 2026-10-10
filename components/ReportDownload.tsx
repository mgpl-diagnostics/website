'use client';

import { useState } from 'react';
import { cfg } from '@/lib/config';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/motion/Tilt3D';

const rc = cfg.hero.reportCard;

export default function ReportDownload() {
  const [reportId, setReportId] = useState('');
  const [mobile, setMobile] = useState('');
  const [touched, setTouched] = useState(false);
  const [sent, setSent] = useState(false);

  const idOk = reportId.trim().length >= 4;
  const mobileOk = /^[6-9]\d{9}$/.test(mobile);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    if (idOk && mobileOk) setSent(true);
  };

  return (
    <section id="reports" data-station aria-label="Download your report" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="right">
          <SectionHeading
            heading="Your reports."
            accent="Always ready."
            subtext="Open your reports securely, any time. Each one is signed by our pathologist and ready to share with your doctor."
          />

          <div className="grid items-start gap-6 md:grid-cols-[1.05fr_1fr]">
            {/* Report preview — 3D */}
            <div data-reveal="left">
              <Tilt3D max={9} radius="1rem">
                <article aria-label="Sample report" className="overflow-hidden rounded-2xl bg-white shadow-[0_40px_70px_-36px_rgba(20,38,74,0.55)]">
                  <header data-depth="1" className="flex items-center justify-between bg-navy px-5 py-4">
                    <div>
                      <p className="text-[11px] text-white/55">{rc.title}</p>
                      <p className="font-display text-lg font-semibold text-white">{rc.testName}</p>
                      <p className="font-mono text-[11px] text-white/50">ID {rc.reportId}</p>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/30 text-[#5FD39B]">
                      <Icon name="BadgeCheck" size={22} weight="fill" />
                    </span>
                  </header>
                  <table className="w-full text-left">
                    <caption className="sr-only">Sample lipid profile values</caption>
                    <tbody>
                      {rc.metrics.map((m) => (
                        <tr key={m.name} className="border-b border-navy/5 last:border-0">
                          <th scope="row" className="px-5 py-2.5 text-xs font-medium text-charcoal">
                            {m.name}
                            <span className="block font-mono text-[10px] font-normal text-muted">ref {m.ref}</span>
                          </th>
                          <td className="px-5 py-2.5 text-right">
                            <span className="block font-mono text-sm font-semibold text-navy">{m.value}</span>
                            <span className="text-[10px] font-semibold text-forest">Normal</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <footer className="flex items-center justify-between bg-cream px-5 py-3 text-[11px]">
                    <span className="flex items-center gap-1.5 font-semibold text-forest">
                      <Icon name="Shield" size={14} /> {rc.footerVerified}
                    </span>
                    <span className="text-muted">{rc.footerTurnaround}</span>
                  </footer>
                </article>
              </Tilt3D>
            </div>

            {/* Access form */}
            <div data-reveal="right" className="rounded-2xl bg-navy p-6 shadow-[0_30px_60px_-30px_rgba(20,38,74,0.7)] sm:p-7">
              {sent ? (
                <div role="status" className="py-6 text-center">
                  <Icon name="CheckCircle2" size={40} weight="fill" className="mx-auto text-[#5FD39B]" />
                  <p className="mt-3 font-display text-xl font-semibold text-white">OTP sent</p>
                  <p className="mt-1 text-sm text-white/65">
                    Check the SMS on +91 {mobile} to open report {reportId}.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="mt-5 text-sm font-semibold text-amber underline">
                    Use a different number
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-4">
                  <Field
                    id="report-id"
                    label="Patient or report ID"
                    hint="Printed on your receipt"
                    value={reportId}
                    onChange={setReportId}
                    placeholder="MG-2024-08821"
                    error={touched && !idOk ? 'Enter the ID printed on your receipt.' : undefined}
                  />
                  <Field
                    id="mobile"
                    label="Registered mobile"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={mobile}
                    onChange={(v) => setMobile(v.replace(/\D/g, '').slice(0, 10))}
                    placeholder="98765 43210"
                    error={touched && !mobileOk ? 'Enter a 10-digit Indian mobile number.' : undefined}
                  />
                  <button
                    type="submit"
                    className="press flex w-full items-center justify-center gap-2 rounded-full bg-saffron py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-saffron-deep"
                  >
                    <Icon name="Download" size={18} />
                    Get my report
                  </button>
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-white/55">
                    <Icon name="Lock" size={14} className="mt-0.5 shrink-0" />
                    We send a one-time password to your registered mobile. Only you can open the report.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  hint,
  value,
  onChange,
  error,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'>) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-err`].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between text-xs font-semibold text-white/80">
        {label}
        {hint && (
          <span id={`${id}-hint`} className="font-normal text-white/45">
            {hint}
          </span>
        )}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/7 px-4 py-3 text-sm text-white outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-white/35 focus:border-amber focus:shadow-[0_0_0_4px_rgba(233,162,59,0.18)] aria-[invalid=true]:border-[#F59E8B]"
        {...rest}
      />
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-[#F8B4A6]">
          {error}
        </p>
      )}
    </div>
  );
}
