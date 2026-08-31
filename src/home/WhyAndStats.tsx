import { PILLARS, STATS, SUPPORTING_FACTS } from "../data/site";
import { CountUp, Reveal, Stagger } from "../lib/motion";
import { SectionHead } from "../components/ui";

export default function WhyAndStats() {
  return (
    <section id="why" className="relative border-y border-line bg-elevated/50 py-24 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHead
            eyebrow="Why Complianto"
            title="Why founders choose Complianto"
            sub="Six commitments we make on every engagement — from a first DSC to a full virtual-CFO retainer."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.n} className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-accent-wash/50">
              <span className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
              <p className="font-display text-[2rem] font-black leading-none text-accent/25 transition-colors duration-300 group-hover:text-accent">
                {p.n}
              </p>
              <h3 className="t-h4 mt-4 text-ink">{p.title}</h3>
              <p className="mt-2 text-[0.875rem] text-muted">{p.copy}</p>
            </div>
          ))}
        </Stagger>

        {/* impact */}
        <div className="mt-24 grid items-end gap-12 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <div>
              <p className="eyebrow eyebrow-accent">Impact</p>
              <p className="t-display mt-4 text-ink">
                <CountUp to={STATS.clientsServed} suffix="+" className="tabular-nums" />
              </p>
              <p className="mt-3 max-w-md text-[1.0625rem] font-medium text-muted">
                clients served across India — the number we stand behind.
              </p>
              <span className="mt-6 block h-[3px] w-24 bg-accent" aria-hidden />
              <p className="mt-4 max-w-md text-[0.8125rem] text-muted/80">
                Years in practice, team size and registrations completed are being confirmed for
                publication — ask us on a call and we'll gladly share.
              </p>
            </div>
          </Reveal>
          <Stagger className="grid gap-8 sm:grid-cols-3 lg:w-auto">
            {SUPPORTING_FACTS.map((f) => (
              <div key={f.label} className="border-l-2 border-accent pl-5">
                <p className="font-display text-[1.625rem] font-black leading-tight text-ink">{f.value}</p>
                <p className="mt-1 text-[0.8125rem] font-medium text-muted">{f.label}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
