import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { ArrowRight, BellRing, CheckCircle2 } from "lucide-react";
import { ENTITY_TYPES, type EntityType } from "../data/site";
import { formatDate, upcomingFor } from "../lib/deadlines";
import { gsap } from "../lib/gsap";
import { Reveal } from "../lib/motion";
import { Modal, SectionHead } from "../components/ui";
import ConsultationForm from "../components/ConsultationForm";

export default function DeadlineTracker() {
  const [entity, setEntity] = useState<EntityType>("Private Limited");
  const [dialog, setDialog] = useState(false);
  const list = useRef<HTMLUListElement>(null);
  const rows = upcomingFor(entity, 6);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const el = list.current;
      if (!el) return;
      const items = gsap.utils.toArray(el.querySelectorAll(".due-row"));
      const tween = gsap.fromTo(
        items,
        { x: -26, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out", stagger: 0.06 },
      );
      return () => tween.kill();
    });
  }, { scope: list, dependencies: [entity] });

  return (
    <section id="deadlines" className="relative overflow-hidden bg-ink py-24 text-paper md:py-40">
      {/* oversized watermark */}
      <span aria-hidden className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none font-display text-[22rem] font-black leading-none text-paper/[0.035]">
        DUE
      </span>
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Reveal>
              <SectionHead
                dark
                eyebrow="Deadline radar"
                title="Never miss a compliance deadline."
                sub="We track every ROC, GST and income tax due date for you — and remind you before it matters. Pick your entity type to see what's coming."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap gap-2" role="radiogroup" aria-label="Entity type">
                {ENTITY_TYPES.map((e) => (
                  <button
                    key={e}
                    role="radio"
                    aria-checked={entity === e}
                    onClick={() => setEntity(e)}
                    className={`rounded-btn border px-4 py-2 text-[0.8125rem] font-semibold transition-all duration-300 ${
                      entity === e
                        ? "border-accent-soft bg-accent-soft text-ink"
                        : "border-paper/20 text-paper/70 hover:border-paper/50 hover:text-paper"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <button className="btn btn-dark" onClick={() => setDialog(true)}>
                  <BellRing className="h-4 w-4" aria-hidden /> Get deadline reminders
                </button>
                <Link to="/tools/compliance-calendar" className="btn btn-ghost !border-paper/25 !text-paper hover:!border-paper/60">
                  Open the full calendar <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <p className="mt-6 max-w-md text-[0.75rem] text-paper/45">
                Indicative dates for general guidance. Confirm your specific obligations with our team.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-panel border border-paper/15 bg-paper/[0.04] p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="t-h4 text-paper">Next up for {entity}</p>
                <span className="rounded-btn border border-success-soft/40 bg-success/15 px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest text-success-soft">
                  On track
                </span>
              </div>
              <ul ref={list} className="divide-y divide-paper/10">
                {rows.map(({ item, date }) => (
                  <li key={item.name} className="due-row flex items-center gap-5 py-4">
                    <span className="w-[3.75rem] shrink-0 text-center">
                      <span className="block font-display text-[1.5rem] font-black leading-none text-paper">{date.getDate()}</span>
                      <span className="block text-[0.6875rem] font-semibold uppercase tracking-widest text-accent-soft">
                        {date.toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[0.9375rem] font-semibold text-paper">{item.name}</span>
                      <span className="mt-0.5 block text-[0.75rem] text-paper/50">
                        {item.category} · {formatDate(date)}
                      </span>
                    </span>
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success-soft" aria-label="On track" />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <Modal open={dialog} onOpenChange={setDialog} title={`Deadline reminders — ${entity}`}>
        <p className="mb-6 text-[0.9375rem] text-muted">
          Leave your details and we'll add your {entity.toLowerCase()} to our reminder calendar —
          every ROC, GST and tax date, flagged before it's due.
        </p>
        <ConsultationForm
          compact
          prefillService="Not sure yet — guide me"
          prefillQuery={`Please add me to compliance deadline reminders for my ${entity}.`}
        />
      </Modal>
    </section>
  );
}
