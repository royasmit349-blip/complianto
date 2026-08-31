import { useLocation, Link } from "react-router-dom";
import { ArrowRight, CalendarCheck2, PhoneCall, ReceiptText } from "lucide-react";
import { BLOG_POSTS, SITE } from "../data/site";
import { Reveal, SplitWords, Stagger } from "../lib/motion";
import { SectionHead } from "../components/ui";
import ConsultationForm from "../components/ConsultationForm";

export function BlogTeaser() {
  return (
    <section id="blog" className="relative py-24 md:py-40">
      <div className="shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHead eyebrow="Learn" title="From the Complianto blog" sub="Plain-language guides on the filings that trip founders up." />
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/blog" className="group inline-flex items-center gap-2 text-[0.9375rem] font-bold text-accent-strong">
              <span className="u-draw">All articles</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
          {BLOG_POSTS.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="group card flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
              <p className="eyebrow eyebrow-accent">{p.category}</p>
              <h3 className="t-h4 mt-4 text-ink">
                <span className="u-draw">{p.title}</span>
              </h3>
              <p className="mt-3 flex-1 text-[0.875rem] text-muted">{p.excerpt}</p>
              <span className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[0.75rem] font-semibold text-muted">
                <span>{p.date} · {p.readMins} min read</span>
                <ArrowRight className="h-3.5 w-3.5 text-accent-strong transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const NEXT_STEPS = [
  { icon: PhoneCall, text: "We call you back within one business day." },
  { icon: ReceiptText, text: "You get a clear scope and quote — govt fees at actuals." },
  { icon: CalendarCheck2, text: "Your compliance calendar gets its first entries, free." },
];

export function FinalCta() {
  const location = useLocation();
  const prefill = new URLSearchParams(location.search).get("service") ?? "";

  return (
    <section id="consult" className="relative border-t border-line bg-elevated/50 py-24 md:py-40">
      <div className="shell grid items-start gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <SectionHead
              eyebrow="The line ends here"
              title="Ready to get compliant? Let's talk."
              sub="Book a free consultation — no obligation. Tell us where your business is, and we'll tell you exactly what comes next."
            />
          </Reveal>
          <Stagger className="mt-10 space-y-5">
            {NEXT_STEPS.map((s) => (
              <div key={s.text} className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-line bg-paper text-accent-strong">
                  <s.icon className="h-[18px] w-[18px]" aria-hidden />
                </span>
                <p className="text-[0.9375rem] font-medium text-ink">{s.text}</p>
              </div>
            ))}
          </Stagger>
          <Reveal delay={0.15}>
            <p className="mt-10 text-[0.9375rem] text-muted">
              Prefer to talk now? Call{" "}
              <a href={SITE.phoneHref} className="font-bold text-accent-strong u-draw">{SITE.phoneDisplay}</a>{" "}
              or{" "}
              <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" className="font-bold text-accent-strong u-draw">
                WhatsApp us
              </a>
              . {SITE.hours}.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative">
            {/* the line's final node — Scale, reached */}
            <div className="absolute -top-10 left-1 hidden items-center gap-3 lg:flex" aria-hidden>
              <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-ink" />
              </span>
              <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-accent-strong">
                Scale — end of the line. You're covered.
              </span>
            </div>
            <div className="card rounded-panel bg-paper p-7 shadow-[0_40px_90px_-50px_rgba(10,10,10,0.4)] md:p-9">
              <h3 className="t-h3 text-ink">Book your free consultation</h3>
              <p className="mb-7 mt-2 text-[0.875rem] text-muted">Usually answered the same day.</p>
              <ConsultationForm prefillService={prefill} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Closing() {
  return (
    <>
      <BlogTeaser />
      <FinalCta />
    </>
  );
}
