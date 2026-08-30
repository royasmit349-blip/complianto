import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORY_META, CATEGORY_ORDER, SERVICES, type ServiceCategory } from "../data/services";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger } from "../lib/motion";
import { SectionHead } from "../components/ui";

export default function Services() {
  const location = useLocation();
  const initial = (new URLSearchParams(location.search).get("cat") as ServiceCategory) || "all";
  const [filter, setFilter] = useState<ServiceCategory | "all">(
    CATEGORY_ORDER.includes(initial) ? initial : "all",
  );

  useEffect(() => {
    const c = new URLSearchParams(location.search).get("cat") as ServiceCategory | null;
    setFilter(c && CATEGORY_ORDER.includes(c) ? c : "all");
  }, [location.search]);

  usePageMeta(
    "All Services — Company Registration, GST, ROC, Trademark, Tax & More | Complianto",
    "Explore all 30 compliance services from Complianto Consulting — grouped by company registration, licenses, trademark, income tax, ongoing compliances and labour law.",
  );

  const groups = (filter === "all" ? CATEGORY_ORDER : [filter]).map((c) => ({
    cat: c,
    items: SERVICES.filter((s) => s.category === c),
  }));

  return (
    <div className="relative">
      <div className="shell pb-16 pt-16 md:pt-24">
        <Reveal>
          <SectionHead
            eyebrow="Services"
            title="Every service. One accountable team."
            sub="Seven practice areas covering the full life of an Indian business — each delivered end to end, with government fees always billed at actuals."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter services">
            <button
              onClick={() => setFilter("all")}
              aria-pressed={filter === "all"}
              className={`rounded-btn border px-4 py-2 text-[0.8125rem] font-semibold transition-all ${filter === "all" ? "border-accent bg-accent text-accent-ink" : "border-line bg-paper text-muted hover:border-ink hover:text-ink"}`}
            >
              All ({SERVICES.length})
            </button>
            {CATEGORY_ORDER.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                aria-pressed={filter === c}
                className={`rounded-btn border px-4 py-2 text-[0.8125rem] font-semibold transition-all ${filter === c ? "border-accent bg-accent text-accent-ink" : "border-line bg-paper text-muted hover:border-ink hover:text-ink"}`}
              >
                {CATEGORY_META[c].menuTitle} ({SERVICES.filter((s) => s.category === c).length})
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="shell space-y-20 pb-24 md:pb-32">
        {groups.map(({ cat, items }) => (
          <section key={cat} aria-label={CATEGORY_META[cat].menuTitle}>
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
                <h2 className="t-h3 text-ink">{CATEGORY_META[cat].menuTitle}</h2>
                <span className="eyebrow">{items.length} service{items.length > 1 ? "s" : ""}</span>
              </div>
            </Reveal>
            <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_-28px_rgba(81,71,219,0.45)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-card bg-accent-wash text-accent-strong transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="eyebrow">{s.act} phase</span>
                  </div>
                  <h3 className="t-h4 mt-5 text-ink">{s.title}</h3>
                  <p className="mt-2 flex-1 text-[0.875rem] text-muted">{s.oneLiner}</p>
                  <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] font-bold text-accent-strong">
                    <span className="u-draw">View details</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
    </div>
  );
}
