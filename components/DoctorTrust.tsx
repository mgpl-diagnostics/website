import { cfg } from '@/lib/config';
import Icon from '@/components/ui/Icon';
import SectionHeading from '@/components/ui/SectionHeading';

const d = cfg.doctors;

/** Credentials as a ledger, not portrait cards (no photos supplied yet). */
export default function DoctorTrust() {
  return (
    <section id="doctors" data-station aria-label="Our pathologists" className="section-pad relative">
      <div className="station-grid mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-side="right">
          <SectionHeading heading={d.heading} accent={d.headingAccent} subtext={d.subtext} />

          <ul className="border-t border-navy/10">
            {d.items.map((doc) => (
              <li key={doc.name} data-reveal className="grid gap-x-6 gap-y-1 border-b border-navy/10 py-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-navy">
                    {doc.name}
                    <Icon name="BadgeCheck" size={18} weight="fill" className="text-forest" aria-label="Verified" />
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {doc.qualification} · {doc.specialization}
                  </p>
                </div>
                <p className="text-sm font-semibold text-charcoal sm:text-right">
                  {doc.experience}
                  <span className="block text-xs font-normal text-muted">experience</span>
                </p>
              </li>
            ))}
          </ul>

          <dl data-reveal className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {d.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted">{stat.label}</dt>
                <dd className="font-display text-2xl font-semibold text-navy">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
