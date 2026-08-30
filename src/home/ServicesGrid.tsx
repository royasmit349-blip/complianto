import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { CATEGORY_META, CATEGORY_ORDER, featuredServices, type ServiceCategory } from "../data/services";
import { gsap } from "../lib/gsap";
import { Reveal } from "../lib/motion";
import { SectionHead } from "../components/ui";

export default function ServicesGrid() {
  const [filter, setFilter] = useState<ServiceCategory | "all">("all");
  const grid = useRef<HTMLDivElement>(null);

  const services = featuredServices().filter((s) => filter === "all" || s.category === filter);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const root = grid.current;
      if (!root) return;
      const cards = gsap.utils.toArray(root.querySelectorAll(".svc-card"));
      const tween = gsap.fromTo(
        cards,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.045 },
      );
      return () => { tween.kill(); };
    });
  }, { scope: grid, dependencies: [filter] });

  return (
    <section id="services" className="relative py-24 md:py-40">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title="Everything you need to stay compliant."
              sub="Thirty services across seven practice areas — pick one, or let us map the whole calendar for you."
            />
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Link to="/services" className="group inline-flex items-center gap-2 text-[0.9375rem] font-bold text-accent-strong">
              <span className="u-draw">All 30 services</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter services by category">
            <button
              className={`rounded-btn border px-4 py-2 text-[0.8125rem] font-semibold transition-all ${filter === "all" ? "border-accent bg-accent text-accent-ink" : "border-line bg-paper text-muted hover:border-ink hover:text-ink"}`}
              aria-pressed={filter === "all"}
              onClick={() => setFilter("all")}
            >
              All featured
            </button>
            {CATEGORY_ORDER.map((c) => (
              <button
                key={c}
                className={`rounded-btn border px-4 py-2 text-[0.8125rem] font-semibold transition-all ${filter === c ? "border-accent bg-accent text-accent-ink" : "border-line bg-paper text-muted hover:border-ink hover:text-ink"}`}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
              >
                {CATEGORY_META[c].label}
              </button>
            ))}
          </div>
        </Reveal>

        <div ref={grid} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="svc-card group card flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_20px_50px_-28px_rgba(81,71,219,0.45)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-card bg-accent-wash text-accent-strong transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                <s.icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="t-h4 mt-5 text-ink">{s.title}</span>
              <span className="mt-2 flex-1 text-[0.875rem] text-muted">{s.oneLiner}</span>
              <span className="mt-5 flex items-center gap-1.5 text-[0.8125rem] font-bold text-accent-strong">
                <span className="u-draw">Learn more</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>

        <Reveal delay={0.05}>
          <p className="mt-10 text-center text-[0.9375rem] text-muted">
            Not sure where to start?{" "}
            <button
              className="font-bold text-accent-strong u-draw"
              onClick={() => document.getElementById("consult")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get a free consultation →
            </button>{" "}
            and we'll map it for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
