import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PILLARS, SITE, TEAM } from "../data/site";
import { usePageMeta } from "../lib/seo";
import { track } from "../lib/analytics";
import { Reveal, Stagger } from "../lib/motion";
import { SectionHead } from "../components/ui";
import ConsultationForm from "../components/ConsultationForm";

export function About() {
  usePageMeta(
    "About Complianto Consulting — Noida's Business Compliance Partners",
    "Complianto Consulting (MentorCorp Private Limited) keeps 20,000+ Indian businesses compliant — company law, GST, income tax, trademark and labour compliance under one roof in Noida.",
  );
  return (
    <div className="relative">
      <section className="shell pb-16 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <div>
              <p className="eyebrow eyebrow-accent">Our story</p>
              <h1 className="t-h2 mt-4 text-ink">Compliance, made legible.</h1>
              <div className="mt-6 max-w-xl space-y-5 text-[1.0rem] text-muted">
                <p>
                  Complianto Consulting began with a simple observation: Indian founders don't lack
                  ambition — they lack a reliable hand on the paperwork. Incorporation, GST, ROC
                  filings, payroll compliance… each one is manageable alone, and overwhelming together.
                </p>
                <p>
                  So we built a firm where every practice area lives under one roof and every client
                  gets a named person, a calendar, and proactive updates by call and WhatsApp. Today,
                  more than 20,000 businesses across India trust us to keep them compliant while they
                  focus on building.
                </p>
                <p>
                  We operate as {SITE.legalName}, from Noida Sector 3 — near the Sector 16 Metro —
                  and serve clients in every state.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <aside className="card rounded-panel p-8">
              <p className="eyebrow">At a glance</p>
              <dl className="mt-5 space-y-5">
                {[
                  ["Founded in", "Noida, Uttar Pradesh"],
                  ["Legal entity", SITE.legalName],
                  ["Clients served", "20,000+ across India"],
                  ["Practice areas", "7 — registration to virtual CFO"],
                  ["Hours", SITE.hours],
                ].map(([k, v]) => (
                  <div key={k} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <dt className="text-[0.75rem] font-semibold uppercase tracking-wider text-muted">{k}</dt>
                    <dd className="mt-1 text-[0.9375rem] font-bold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-elevated/50 py-20 md:py-28">
        <div className="shell">
          <Reveal><SectionHead eyebrow="What we stand for" title="Six commitments, every engagement" /></Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <div key={p.n} className="card p-7">
                <p className="font-display text-[1.75rem] font-black text-accent/25">{p.n}</p>
                <h3 className="t-h4 mt-3 text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.875rem] text-muted">{p.copy}</p>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="shell py-20 md:py-28">
        <Reveal>
          <SectionHead
            eyebrow="The team"
            title="The people behind your compliance"
            sub="At Complianto Consulting, our experts are committed to guiding and empowering you on your startup journey."
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t) => (
            <div key={t.role} className="group card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-wash font-display text-[1.125rem] font-black text-accent-strong transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-ink">
                {t.initials}
              </span>
              <h3 className="t-h4 mt-5 text-ink">{t.role}</h3>
              <p className="mt-2 text-[0.875rem] text-muted">{t.line}</p>
            </div>
          ))}
        </Stagger>
        <Reveal delay={0.1}>
          <p className="mt-8 text-[0.8125rem] text-muted/80">Individual bios and photographs are being published — meet the whole team on a free call.</p>
        </Reveal>
      </section>

      <section className="border-t border-line bg-ink py-20 text-paper">
        <div className="shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="t-h2 text-paper">Come build on solid ground.</h2>
            <p className="mt-3 max-w-xl text-paper/65">One free consultation, and you'll know exactly where your business stands.</p>
          </div>
          <a href="#/contact" className="btn btn-dark shrink-0">Get free consultation <ArrowUpRight className="h-4 w-4" aria-hidden /></a>
        </div>
      </section>
    </div>
  );
}

export function Contact() {
  usePageMeta(
    "Contact Complianto — Free Consultation | +91-9216029676",
    "Call, WhatsApp or write to Complianto Consulting in Noida. Free consultation, Mon–Sat 10 am – 7 pm. Phone +91-9216029676, services@complianto.in.",
  );
  return (
    <div className="shell grid gap-14 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <Reveal>
          <SectionHead
            eyebrow="Contact"
            title="Talk to a human, not a ticket."
            sub="Call, WhatsApp or send the form — whichever is easiest. We respond within one business day, usually faster."
          />
        </Reveal>
        <Stagger className="mt-10 space-y-4">
          <a href={SITE.phoneHref} onClick={() => track("phone_clicked")} className="card group flex items-center gap-4 p-5 transition-all hover:border-accent">
            <span className="flex h-11 w-11 items-center justify-center rounded-card bg-accent-wash text-accent-strong"><Phone className="h-5 w-5" aria-hidden /></span>
            <span>
              <span className="block text-[0.9375rem] font-bold text-ink group-hover:text-accent-strong">{SITE.phoneDisplay}</span>
              <span className="text-[0.8125rem] text-muted">{SITE.hours}</span>
            </span>
          </a>
          <a href={`mailto:${SITE.email}`} className="card group flex items-center gap-4 p-5 transition-all hover:border-accent">
            <span className="flex h-11 w-11 items-center justify-center rounded-card bg-accent-wash text-accent-strong"><Mail className="h-5 w-5" aria-hidden /></span>
            <span>
              <span className="block text-[0.9375rem] font-bold text-ink group-hover:text-accent-strong">{SITE.email}</span>
              <span className="text-[0.8125rem] text-muted">For engagements and documents</span>
            </span>
          </a>
          <div className="card flex items-start gap-4 p-5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-accent-wash text-accent-strong"><MapPin className="h-5 w-5" aria-hidden /></span>
            <span>
              <span className="block text-[0.9375rem] font-bold text-ink">Office</span>
              <span className="block text-[0.8125rem] text-muted">{SITE.address.join(" ")}</span>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address.join(" "))}`}
                target="_blank" rel="noreferrer"
                className="u-draw mt-1 inline-block text-[0.8125rem] font-bold text-accent-strong"
              >
                Open in Google Maps →
              </a>
            </span>
          </div>
          <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_clicked")} className="card group flex items-center gap-4 p-5 transition-all hover:border-success">
            <span className="flex h-11 w-11 items-center justify-center rounded-card bg-success/10 text-success"><MessageCircle className="h-5 w-5" aria-hidden /></span>
            <span>
              <span className="block text-[0.9375rem] font-bold text-ink group-hover:text-success">WhatsApp us</span>
              <span className="text-[0.8125rem] text-muted">Fastest for quick questions</span>
            </span>
          </a>
        </Stagger>
      </div>

      <Reveal delay={0.1}>
        <div className="card rounded-panel p-7 md:p-9">
          <h2 className="t-h3 text-ink">Book your free consultation</h2>
          <p className="mb-7 mt-2 text-[0.875rem] text-muted">Fields marked optional can wait for the call.</p>
          <ConsultationForm />
        </div>
      </Reveal>
    </div>
  );
}
