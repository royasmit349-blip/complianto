import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { CATEGORY_META, CATEGORY_ORDER, SERVICES } from "../data/services";
import { SITE } from "../data/site";
import { track } from "../lib/analytics";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Complianto — home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <rect width="32" height="32" rx="7" fill="var(--color-accent)" />
        <path d="M9.5 17.5l4.5 5L23 10.5" fill="none" stroke="var(--color-accent-ink)" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.125rem] font-black tracking-tight text-ink">Complianto</span>
        {!compact && (
          <span className="mt-0.5 block text-[0.5625rem] font-semibold uppercase tracking-[0.32em] text-muted">
            Consulting
          </span>
        )}
      </span>
    </Link>
  );
}

const TOOLS = [
  { to: "/tools/name-check", label: "Company name availability checker", desc: "Search existing company names before you file." },
  { to: "/tools/compliance-calendar", label: "Compliance calendar", desc: "Every statutory due date for your entity type, downloadable." },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<"services" | "tools" | null>(null);
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(null); setDrawer(false); }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const consult = () => {
    setOpen(null);
    if (location.pathname === "/") {
      document.getElementById("consult")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact");
    }
  };

  return (
    <header
      onMouseLeave={() => setOpen(null)}
      className={`sticky top-0 z-[100] border-b transition-all duration-300 ${
        scrolled ? "border-line bg-paper/95 shadow-[0_8px_30px_-18px_rgba(10,10,10,0.25)] backdrop-blur-sm" : "border-transparent bg-paper"
      }`}
    >
      <div className={`shell flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "py-2.5" : "py-4"}`}>
        <Logo />

        {/* desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <div className="relative" onMouseEnter={() => setOpen("services")}>
            <button
              className={`flex items-center gap-1 rounded-btn px-3.5 py-2 text-[0.875rem] font-semibold transition-colors ${open === "services" ? "text-accent-strong" : "text-ink hover:text-accent-strong"}`}
              aria-expanded={open === "services"}
              aria-haspopup="true"
              onFocus={() => setOpen("services")}
            >
              Services <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === "services" ? "rotate-180" : ""}`} aria-hidden />
            </button>
          </div>
          <div className="relative" onMouseEnter={() => setOpen("tools")}>
            <button
              className={`flex items-center gap-1 rounded-btn px-3.5 py-2 text-[0.875rem] font-semibold transition-colors ${open === "tools" ? "text-accent-strong" : "text-ink hover:text-accent-strong"}`}
              aria-expanded={open === "tools"}
              aria-haspopup="true"
              onFocus={() => setOpen("tools")}
            >
              Free tools <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open === "tools" ? "rotate-180" : ""}`} aria-hidden />
            </button>
          </div>
          {[["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, to]) => (
            <Link key={to} to={to}
              className={`rounded-btn px-3.5 py-2 text-[0.875rem] font-semibold transition-colors ${location.pathname === to ? "text-accent-strong" : "text-ink hover:text-accent-strong"}`}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href={SITE.phoneHref} onClick={() => track("phone_clicked")}
             className="flex items-center gap-2 text-[0.875rem] font-semibold text-ink transition-colors hover:text-accent-strong">
            <Phone className="h-4 w-4 text-accent-strong" aria-hidden /> {SITE.phoneDisplay}
          </a>
          <button className="btn btn-primary btn-sm" onClick={consult}>Get Free Consultation</button>
        </div>

        <button className="rounded-btn border border-line p-2.5 text-ink lg:hidden" onClick={() => setDrawer(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* mega menu */}
      {open && (
        <div
          className="absolute left-0 right-0 top-full hidden border-b border-line bg-paper shadow-[0_24px_60px_-30px_rgba(10,10,10,0.35)] lg:block"
          onMouseEnter={() => setOpen(open)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null); }}
        >
          {open === "services" ? (
            <div className="shell grid grid-cols-4 gap-x-8 gap-y-10 py-10">
              {CATEGORY_ORDER.map((c) => (
                <div key={c}>
                  <Link to={`/services?cat=${c}`} className="eyebrow u-draw hover:!text-accent-strong">{CATEGORY_META[c].menuTitle}</Link>
                  <ul className="mt-4 space-y-1">
                    {SERVICES.filter((s) => s.category === c).map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`}
                          className="block rounded-btn px-2 py-1.5 -mx-2 text-[0.875rem] font-medium text-muted transition-colors hover:bg-accent-wash hover:text-accent-strong">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="rounded-panel border border-line bg-elevated p-6">
                <p className="eyebrow">Free tools</p>
                {TOOLS.map((t) => (
                  <Link key={t.to} to={t.to} className="group mt-4 block">
                    <span className="flex items-center gap-1.5 text-[0.9375rem] font-semibold text-ink group-hover:text-accent-strong">
                      {t.label} <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </span>
                    <span className="mt-1 block text-[0.8125rem] text-muted">{t.desc}</span>
                  </Link>
                ))}
                <button className="btn btn-primary btn-sm mt-6 w-full" onClick={consult}>Get Free Consultation</button>
              </div>
            </div>
          ) : (
            <div className="shell grid max-w-3xl grid-cols-2 gap-8 py-10">
              {TOOLS.map((t) => (
                <Link key={t.to} to={t.to} className="card group p-6 transition-all hover:-translate-y-1 hover:border-accent">
                  <span className="flex items-center gap-1.5 t-h4 text-ink group-hover:text-accent-strong">
                    {t.label} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                  </span>
                  <span className="mt-2 block text-[0.875rem] text-muted">{t.desc}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* mobile drawer */}
      <Dialog.Root open={drawer} onOpenChange={setDrawer}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[110] bg-ink/50" />
          <Dialog.Content className="fixed inset-y-0 right-0 z-[120] w-[min(88vw,380px)] overflow-y-auto border-l border-line bg-paper p-6" aria-describedby={undefined}>
            <div className="flex items-center justify-between">
              <Logo compact />
              <Dialog.Close className="rounded-btn border border-line p-2 text-muted hover:text-ink" aria-label="Close menu">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <nav className="mt-8 space-y-6" aria-label="Mobile">
              {CATEGORY_ORDER.map((c) => (
                <div key={c}>
                  <Link to={`/services?cat=${c}`} className="eyebrow">{CATEGORY_META[c].menuTitle}</Link>
                  <ul className="mt-2 space-y-0.5">
                    {SERVICES.filter((s) => s.category === c).slice(0, 4).map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="block py-1.5 text-[0.9375rem] font-medium text-muted">{s.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="border-t border-line pt-6">
                <p className="eyebrow">Free tools</p>
                {TOOLS.map((t) => (
                  <Link key={t.to} to={t.to} className="mt-2 block py-1 text-[0.9375rem] font-medium text-muted">{t.label}</Link>
                ))}
              </div>
              <div className="flex flex-col gap-3 border-t border-line pt-6">
                {[["About", "/about"], ["Blog", "/blog"], ["Contact", "/contact"]].map(([label, to]) => (
                  <Link key={to} to={to} className="py-1 text-[0.9375rem] font-semibold text-ink">{label}</Link>
                ))}
                <a href={SITE.phoneHref} onClick={() => track("phone_clicked")} className="flex items-center gap-2 py-1 text-[0.9375rem] font-semibold text-accent-strong">
                  <Phone className="h-4 w-4" aria-hidden /> {SITE.phoneDisplay}
                </a>
                <button className="btn btn-primary w-full" onClick={() => { setDrawer(false); consult(); }}>
                  Get Free Consultation
                </button>
              </div>
            </nav>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
