import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, BadgeIndianRupee, CalendarClock, Check, ChevronRight, FileStack } from "lucide-react";
import { ACT_META, CATEGORY_META, getService, relatedServices } from "../data/services";
import { usePageMeta } from "../lib/seo";
import { track } from "../lib/analytics";
import { Reveal, Stagger } from "../lib/motion";
import { Accordion, JsonLd, SectionHead } from "../components/ui";
import ConsultationForm from "../components/ConsultationForm";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug ?? "");

  useEffect(() => {
    if (service) track("service_viewed", { slug: service.slug });
  }, [service]);

  usePageMeta(
    service ? service.seo.title : "Service not found | Complianto",
    service?.seo.description,
  );

  if (!service) return <NotFound />;

  const Icon = service.icon;
  const scrollToForm = () => document.getElementById("svc-form")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative">
      {/* breadcrumb */}
      <nav className="shell pt-8" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[0.75rem] font-semibold text-muted">
          <li><Link to="/" className="hover:text-accent-strong">Home</Link></li>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <li><Link to="/services" className="hover:text-accent-strong">Services</Link></li>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <li aria-current="page" className="text-ink">{service.title}</li>
        </ol>
      </nav>

      {/* hero */}
      <header className="shell grid gap-12 pb-16 pt-10 md:pt-14 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div>
            <p className="eyebrow eyebrow-accent">{CATEGORY_META[service.category].menuTitle}</p>
            <h1 className="t-h2 mt-4 text-ink">{service.title}</h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] text-muted">{service.description}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="btn btn-primary" onClick={scrollToForm}>
                Get started <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="text-[0.875rem] font-semibold text-muted">
                {service.priceFrom
                  ? `From ₹${service.priceFrom.toLocaleString("en-IN")} + govt. fees at actuals`
                  : "Pricing shared on consultation · govt. fees at actuals"}
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <aside className="card relative overflow-hidden rounded-panel p-7">
            <Icon className="absolute -bottom-6 -right-6 h-32 w-32 text-accent/10" aria-hidden />
            <dl className="relative space-y-5 text-[0.9375rem]">
              <div>
                <dt className="eyebrow">Journey phase</dt>
                <dd className="mt-1 font-bold text-ink">{ACT_META[service.act].label} — {ACT_META[service.act].title}</dd>
              </div>
              <div>
                <dt className="eyebrow">Typical timeline</dt>
                <dd className="mt-1 flex items-center gap-2 font-bold text-ink">
                  <CalendarClock className="h-4 w-4 text-accent-strong" aria-hidden />
                  {service.timeline ?? "«Confirmed on consultation»"}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Delivery</dt>
                <dd className="mt-1 font-bold text-ink">End to end, by our team — updates on call & WhatsApp</dd>
              </div>
            </dl>
          </aside>
        </Reveal>
      </header>

      {/* what's included + documents */}
      <section className="shell grid gap-10 pb-20 lg:grid-cols-2">
        <Reveal>
          <div className="card h-full rounded-panel p-8">
            <h2 className="t-h3 flex items-center gap-3 text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-card bg-accent-wash text-accent-strong"><Check className="h-4 w-4" aria-hidden /></span>
              What's included
            </h2>
            <ul className="mt-6 space-y-3.5">
              {service.includes.map((inc) => (
                <li key={inc} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {inc}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="card h-full rounded-panel p-8">
            <h2 className="t-h3 flex items-center gap-3 text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-card bg-accent-wash text-accent-strong"><FileStack className="h-4 w-4" aria-hidden /></span>
              Documents required
            </h2>
            <ul className="mt-6 space-y-3.5">
              {service.documents.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-4 text-[0.8125rem] text-muted">
              Not sure you have everything? Send what you have — we'll list exactly what's missing on the first call.
            </p>
          </div>
        </Reveal>
      </section>

      {/* how it works */}
      <section className="border-y border-line bg-elevated/50 py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <SectionHead eyebrow="Process" title="How it works" sub="Four steps, one owner. You'll always know which step your file is on." />
          </Reveal>
          <ol className="mt-14 border-l-2 border-accent">
            {service.process.map((p, i) => (
              <li key={p.step} className="relative pb-10 pl-8 last:pb-0 md:pl-12">
                <Reveal delay={i * 0.05}>
                  <span className="absolute -left-[13px] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-paper font-display text-[0.75rem] font-black text-accent-strong">
                    {i + 1}
                  </span>
                  <h3 className="t-h4 text-ink">{p.step}</h3>
                  <p className="mt-1.5 max-w-2xl text-[0.9375rem] text-muted">{p.detail}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* pricing honesty + timeline strip */}
      <section className="shell py-20 md:py-24">
        <Reveal>
          <div className="card grid gap-8 rounded-panel p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:p-10">
            <span className="flex h-14 w-14 items-center justify-center rounded-panel bg-accent text-accent-ink">
              <BadgeIndianRupee className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 className="t-h3 text-ink">Transparent by design</h2>
              <p className="mt-2 max-w-2xl text-[0.9375rem] text-muted">
                You get a fixed service quote before we begin. Government fees, stamp duty and
                statutory charges are billed at actuals — itemised, never bundled. No hidden charges, ever.
              </p>
            </div>
            <button className="btn btn-primary" onClick={scrollToForm}>Get my quote</button>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="shell grid gap-12 pb-24 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHead
            eyebrow="FAQ"
            title={`Common questions about ${service.title.toLowerCase()}`}
            sub="If your question isn't here, it takes one call to get a straight answer."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <Accordion items={service.faqs} />
        </Reveal>
      </section>

      {/* related */}
      <section className="border-t border-line bg-elevated/50 py-20">
        <div className="shell">
          <Reveal>
            <SectionHead eyebrow="Keep moving" title="Related services" />
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
            {relatedServices(service).map((r) => (
              <Link key={r.slug} to={`/services/${r.slug}`} className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
                <span className="flex h-10 w-10 items-center justify-center rounded-card bg-accent-wash text-accent-strong">
                  <r.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <h3 className="t-h4 mt-4 text-ink"><span className="u-draw">{r.title}</span></h3>
                <p className="mt-2 text-[0.875rem] text-muted">{r.oneLiner}</p>
              </Link>
            ))}
          </Stagger>
        </div>
      </section>

      {/* form */}
      <section id="svc-form" className="py-24">
        <div className="shell grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHead
              eyebrow="Start here"
              title={`Let's get ${service.title.toLowerCase()} moving.`}
              sub="Book a free consultation — we'll confirm scope, documents and a realistic timeline on the call."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card rounded-panel p-7 md:p-9">
              <ConsultationForm prefillService={service.title} />
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://complianto.in/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://complianto.in/services" },
            { "@type": "ListItem", position: 3, name: service.title, item: `https://complianto.in/services/${service.slug}` },
          ],
        }}
      />
      <JsonLd
        json={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}
