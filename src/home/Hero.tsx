import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { CLIENT_MARKS, STATS } from "../data/site";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { SplitWords, Stagger } from "../lib/motion";

const LEDGER = [
  { label: "GST · GSTR-1", state: "Filed 11 Feb", ok: true },
  { label: "ROC · AOC-4", state: "Due 30 Oct", ok: false },
  { label: "ITR · FY 2025–26", state: "On track", ok: true },
  { label: "TDS · Q4 return", state: "Due 31 May", ok: false },
  { label: "PF & ESI · ECR", state: "Filed 15 Feb", ok: true },
];

export default function Hero() {
  const card = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = card.current;
      if (!el) return;
      const tween = gsap.to(el, {
        y: -34, ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      return () => { tween.scrollTrigger?.kill(); };
    });
  }, { scope: card });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="shell grid items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.12fr_0.88fr] lg:pb-24">
        <div>
          <p className="eyebrow eyebrow-accent flex items-center gap-2.5">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
            Your compliance partner
          </p>
          <SplitWords as="h1" className="t-display mt-5 text-ink">
            Keeping you compliant, so you can focus on your business.
          </SplitWords>
          <p className="mt-6 max-w-xl text-[1.0625rem] text-muted">
            From incorporation to GST, ROC filings and beyond — Complianto handles the paperwork
            while you build. Over 20,000 businesses have trusted us to keep them compliant.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn btn-primary" onClick={() => scrollTo("consult")}>
              Get free consultation <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo("services")}>
              Explore services
            </button>
          </div>
        </div>

        {/* live compliance ledger — the distinctive opener */}
        <div ref={card} className="relative">
          <div className="float-soft absolute -left-4 -top-5 z-[1] hidden rounded-btn border border-line bg-paper px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted shadow-sm md:block">
            Act 01 · Start — you are here
          </div>
          <div className="card overflow-hidden rounded-panel">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="t-h4">Compliance status · this quarter</p>
              <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-widest text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden /> Live
              </span>
            </div>
            <Stagger className="divide-y divide-line">
              {LEDGER.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-4 px-6 py-3.5">
                  <span className="text-[0.9375rem] font-semibold text-ink">{r.label}</span>
                  <span className={`flex items-center gap-1.5 text-[0.8125rem] font-semibold ${r.ok ? "text-success" : "text-muted"}`}>
                    {r.ok ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Clock3 className="h-4 w-4 text-accent-strong" aria-hidden />}
                    {r.state}
                  </span>
                </div>
              ))}
            </Stagger>
            <div className="flex items-center justify-between border-t border-line bg-accent-wash/60 px-6 py-4">
              <p className="text-[0.8125rem] font-medium text-muted">Every date tracked. Every filing on time.</p>
              <a href="#/tools/compliance-calendar" className="u-draw text-[0.8125rem] font-bold text-accent-strong">
                See your calendar →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* trust strip */}
      <div className="border-y border-line bg-elevated/60 py-8">
        <div className="shell">
          <p className="eyebrow text-center">
            Trusted by {STATS.clientsServed.toLocaleString("en-IN")}+ businesses across India
          </p>
          <div className="marquee mt-6" aria-label="Client wordmarks">
            <div className="marquee-track">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center gap-16" aria-hidden={dup === 1}>
                  {CLIENT_MARKS.map((m) => (
                    <span key={`${dup}-${m}`} className="whitespace-nowrap font-display text-[1.0625rem] font-black uppercase tracking-[0.08em] text-muted/55">
                      {m}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
