import { useEffect, useRef, useState } from "react";
import { Download, Mail, Search, SearchX, TriangleAlert } from "lucide-react";
import { ENTITY_TYPES, type DueCategory, type EntityType } from "../data/site";
import { buildICS, downloadICS, formatDate, fyOptions, fySchedule } from "../lib/deadlines";
import { checkName, NAME_CHECK_SOURCE, type NameMatch } from "../lib/name-check";
import { track } from "../lib/analytics";
import { usePageMeta } from "../lib/seo";
import { Reveal, Stagger } from "../lib/motion";
import { Modal, SectionHead } from "../components/ui";
import ConsultationForm from "../components/ConsultationForm";

/* ================= Company name availability checker ================= */

type CheckStatus = "idle" | "loading" | "ok" | "empty" | "error";

export function NameCheck() {
  usePageMeta(
    "Company Name Availability Checker — Free Tool | Complianto",
    "Search existing company and LLP names before you file. Free indicative check by Complianto Consulting — final approval rests with the MCA/ROC.",
  );
  const [raw, setRaw] = useState("");
  const [status, setStatus] = useState<CheckStatus>("idle");
  const [matches, setMatches] = useState<NameMatch[]>([]);
  const [dialog, setDialog] = useState(false);
  const query = raw.trim();

  useEffect(() => {
    if (query.length < 3) { setStatus("idle"); setMatches([]); return; }
    setStatus("loading");
    const t = window.setTimeout(async () => {
      try {
        const res = await checkName(query);
        setMatches(res.matches);
        setStatus(res.matches.length ? "ok" : "empty");
        track("name_check_used", { q: query });
      } catch {
        setStatus("error");
      }
    }, 300);
    return () => window.clearTimeout(t);
  }, [query]);

  const ctaQuery = query.length >= 3
    ? `I'd like to check and reserve the company name: "${query}".`
    : "";

  return (
    <div className="shell py-16 md:py-24">
      <Reveal>
        <SectionHead
          eyebrow="Free tool"
          title="Company name availability checker"
          sub="Type the name you want. We'll search existing companies and LLPs so you know where you stand before paying any government fee."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 max-w-2xl">
          <label htmlFor="nc-input" className="field-label">Proposed company name</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              id="nc-input"
              className="field pl-11 text-[1rem]"
              placeholder="e.g. Sunrise Technologies"
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="mt-6 min-h-[16rem]" aria-live="polite">
            {status === "idle" && (
              <p className="flex items-center gap-3 text-muted"><Search className="h-4 w-4 text-accent-strong" aria-hidden /> Type at least 3 characters to search.</p>
            )}

            {status === "loading" && (
              <ul className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <li key={i} className="card animate-pulse p-5">
                    <span className="block h-3.5 w-2/3 rounded bg-line" />
                    <span className="mt-2.5 block h-3 w-1/3 rounded bg-line" />
                  </li>
                ))}
              </ul>
            )}

            {status === "ok" && (
              <div>
                <p className="mb-3 text-[0.875rem] font-semibold text-muted">
                  {matches.length} existing name{matches.length > 1 ? "s" : ""} similar to “{query}”:
                </p>
                <ul className="space-y-3">
                  {matches.map((m) => (
                    <li key={m.name} className="card flex items-center justify-between gap-4 p-5">
                      <div>
                        <p className="text-[0.9375rem] font-bold text-ink">{m.name}</p>
                        <p className="mt-0.5 text-[0.75rem] text-muted">Registered in {m.place}</p>
                      </div>
                      <span className={`shrink-0 rounded-btn px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider ${m.status === "Active" ? "bg-accent-wash text-accent-strong" : "bg-elevated text-muted"}`}>
                        {m.status}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.875rem] text-muted">
                  Similar names can still be approvable if they're distinguishable. Send us the name — we'll give you a straight yes-or-no view.
                </p>
              </div>
            )}

            {status === "empty" && (
              <div className="card rounded-panel border-success/30 bg-success/5 p-7">
                <p className="t-h4 flex items-center gap-2 text-success"><SearchX className="h-5 w-5" aria-hidden /> No existing company matches “{query}”.</p>
                <p className="mt-2 text-[0.9375rem] text-muted">
                  That's a good sign — let's confirm it formally with the registry and lock the name while we incorporate.
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="card rounded-panel p-7">
                <p className="t-h4 flex items-center gap-2 text-ink"><TriangleAlert className="h-5 w-5 text-accent-strong" aria-hidden /> Search is unavailable right now.</p>
                <p className="mt-2 text-[0.9375rem] text-muted">Send us the name and we'll check it manually — same-day reply.</p>
              </div>
            )}

            {status !== "idle" && status !== "loading" && (
              <button className="btn btn-primary mt-6" onClick={() => setDialog(true)}>
                Check this name with an expert
              </button>
            )}
          </div>

          <p className="mt-6 max-w-xl text-[0.75rem] text-muted/80">
            An indicative check only, run against a sample dataset{NAME_CHECK_SOURCE === "seed" ? " (live registry sync in progress)" : ""}. Final approval rests with the MCA/ROC.
          </p>
        </div>
      </Reveal>

      <Stagger className="mt-20 grid gap-5 md:grid-cols-3">
        {[
          { t: "Why names get rejected", d: "Identical or near-identical names, protected words, and trademark conflicts are the usual causes." },
          { t: "What makes a name strong", d: "A coined word plus an activity descriptor — distinctive, searchable, and easy to trademark later." },
          { t: "What happens next", d: "We run the formal check, file for name approval, and hold it while your incorporation is prepared." },
        ].map((c, i) => (
          <div key={c.t} className="card p-7">
            <p className="font-display text-[1.5rem] font-black text-accent/25">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="t-h4 mt-3 text-ink">{c.t}</h3>
            <p className="mt-2 text-[0.875rem] text-muted">{c.d}</p>
          </div>
        ))}
      </Stagger>

      <Modal open={dialog} onOpenChange={setDialog} title="Check & reserve your company name">
        <ConsultationForm
          compact
          prefillService="Private Limited Company"
          prefillQuery={ctaQuery}
        />
      </Modal>
    </div>
  );
}

/* ================= Compliance calendar ================= */

const CATEGORIES: ("All" | DueCategory)[] = ["All", "GST", "ROC", "ITR", "TDS", "PF & ESI"];

export function ComplianceCalendar() {
  usePageMeta(
    "Compliance Calendar — ROC, GST, ITR & TDS Due Dates | Complianto",
    "Pick your entity type and financial year to see every statutory due date — ROC, GST, income tax, TDS, PF & ESI. Download as a calendar file.",
  );
  const fys = fyOptions();
  const [fy, setFy] = useState(fys[1]);
  const [entity, setEntity] = useState<EntityType>("Private Limited");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [dialog, setDialog] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  const rows = fySchedule(entity, fy.startYear).filter((r) => cat === "All" || r.item.category === cat);

  const download = () => {
    downloadICS(`complianto-${entity.toLowerCase().replace(/\s+/g, "-")}-${fy.id.replace(/\s+/g, "")}.ics`, buildICS(rows));
    track("calendar_downloaded", { entity, fy: fy.id });
  };

  return (
    <div className="shell py-16 md:py-24">
      <Reveal>
        <SectionHead
          eyebrow="Free tool"
          title="The compliance calendar"
          sub="Every statutory due date for your entity, across the financial year. Filter it, download it, or have us email you reminders."
        />
      </Reveal>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Entity type">
            {ENTITY_TYPES.map((e) => (
              <button key={e} role="radio" aria-checked={entity === e} onClick={() => setEntity(e)}
                className={`rounded-btn border px-4 py-2 text-[0.8125rem] font-semibold transition-all ${entity === e ? "border-accent bg-accent text-accent-ink" : "border-line bg-paper text-muted hover:border-ink hover:text-ink"}`}>
                {e}
              </button>
            ))}
          </div>
          <label className="sr-only" htmlFor="fy-select">Financial year</label>
          <select id="fy-select" className="field w-auto" value={fy.id} onChange={(e) => setFy(fys.find((f) => f.id === e.target.value) ?? fys[1])}>
            {fys.map((f) => <option key={f.id} value={f.id}>{f.id}</option>)}
          </select>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by filing type">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                className={`rounded-btn border px-3.5 py-1.5 text-[0.75rem] font-semibold transition-all ${cat === c ? "border-accent-strong bg-accent-wash text-accent-strong" : "border-line bg-paper text-muted hover:border-ink hover:text-ink"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-ghost btn-sm" onClick={download}><Download className="h-4 w-4" aria-hidden /> Download .ics</button>
            <button className="btn btn-primary btn-sm" onClick={() => setDialog(true)}><Mail className="h-4 w-4" aria-hidden /> Email me reminders</button>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div ref={tableRef} className="card mt-8 overflow-hidden rounded-panel">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[0.875rem]">
              <thead>
                <tr className="border-b border-line bg-elevated text-[0.6875rem] uppercase tracking-[0.12em] text-muted">
                  <th className="px-6 py-4 font-semibold">Due date</th>
                  <th className="px-6 py-4 font-semibold">Filing</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Frequency</th>
                  <th className="px-6 py-4 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map(({ item, date }) => (
                  <tr key={`${item.name}-${date.toDateString()}`} className="transition-colors hover:bg-accent-wash/40">
                    <td className="whitespace-nowrap px-6 py-4 font-bold text-ink">{formatDate(date)}</td>
                    <td className="px-6 py-4 font-semibold text-ink">{item.name}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-btn bg-elevated px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-wider text-muted">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-muted">{item.frequency}</td>
                    <td className="px-6 py-4 text-[0.8125rem] text-muted">{item.note ?? "—"}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-muted">No filings of this type for {entity} in {fy.id}.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      <p className="mt-6 max-w-2xl text-[0.75rem] text-muted/80">
        Indicative dates for general guidance — some filings shift with AGM dates, registration
        dates and amendments. Confirm your specific obligations with our team; on an AMC, this
        calendar is maintained for you.
      </p>

      <Modal open={dialog} onOpenChange={setDialog} title={`Email my ${fy.id} reminders`}>
        <p className="mb-6 text-[0.9375rem] text-muted">
          We'll send your {entity.toLowerCase()} calendar for {fy.id} to your inbox — with reminders before each date.
        </p>
        <ConsultationForm
          compact
          prefillService="Not sure yet — guide me"
          prefillQuery={`Please email me the ${fy.id} compliance calendar for my ${entity}, with deadline reminders.`}
        />
      </Modal>
    </div>
  );
}
