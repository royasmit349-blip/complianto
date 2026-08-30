import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { CATEGORY_META, CATEGORY_ORDER, SERVICES } from "../data/services";
import { SITE } from "../data/site";
import { track } from "../lib/analytics";
import { Logo } from "./Header";

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export function WhatsAppFab() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("whatsapp_clicked")}
      className="group fixed bottom-20 right-5 z-[95] flex items-center gap-0 overflow-hidden rounded-panel bg-success text-paper shadow-[0_16px_40px_-12px_rgba(18,128,92,0.55)] transition-all duration-300 hover:gap-2.5 hover:pr-5 md:bottom-8 md:right-8"
      aria-label="Chat with Complianto on WhatsApp"
    >
      <span className="p-3.5 md:p-4">{WA_ICON}</span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8125rem] font-semibold transition-all duration-300 group-hover:max-w-[10rem]">
        Chat on WhatsApp
      </span>
    </a>
  );
}

export function StickyMobileCta() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) { setShow(false); return; }
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, [location]);

  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] border-t border-line bg-paper/97 p-3 shadow-[0_-12px_40px_-18px_rgba(10,10,10,0.35)] backdrop-blur-sm md:hidden">
      <div className="flex gap-2">
        <a href={SITE.phoneHref} onClick={() => track("phone_clicked")} className="btn btn-ghost flex-1" aria-label="Call Complianto">
          <Phone className="h-4 w-4" aria-hidden /> Call
        </a>
        <button
          className="btn btn-primary flex-[2]"
          onClick={() => {
            if (location.pathname === "/") document.getElementById("consult")?.scrollIntoView({ behavior: "smooth" });
            else navigate("/contact");
          }}
        >
          Get free consultation
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-line bg-elevated pb-28 pt-16 md:pb-8 md:pt-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.9375rem] text-muted">
              Business compliance for Indian founders and SMEs — from incorporation to GST, ROC filings and beyond.
            </p>
            <ul className="mt-6 space-y-3 text-[0.875rem]">
              <li className="flex items-center gap-3 text-muted"><Phone className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden /><a href={SITE.phoneHref} className="font-semibold text-ink hover:text-accent-strong" onClick={() => track("phone_clicked")}>{SITE.phoneDisplay}</a></li>
              <li className="flex items-center gap-3 text-muted"><Mail className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden /><a href={`mailto:${SITE.email}`} className="font-semibold text-ink hover:text-accent-strong">{SITE.email}</a></li>
              <li className="flex items-start gap-3 text-muted"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden /><span>{SITE.address.join(" ")}</span></li>
              <li className="flex items-center gap-3 text-muted"><Clock className="h-4 w-4 shrink-0 text-accent-strong" aria-hidden /><span>{SITE.hours}</span></li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
            {CATEGORY_ORDER.map((c) => (
              <div key={c}>
                <p className="eyebrow">{CATEGORY_META[c].menuTitle}</p>
                <ul className="mt-4 space-y-2">
                  {SERVICES.filter((s) => s.category === c).slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link to={`/services/${s.slug}`} className="text-[0.8125rem] font-medium text-muted transition-colors hover:text-accent-strong">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to={`/services?cat=${c}`} className="text-[0.8125rem] font-semibold text-accent-strong u-draw">
                      All →
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
            <div>
              <p className="eyebrow">Company</p>
              <ul className="mt-4 space-y-2">
                {[["About us", "/about"], ["Blog", "/blog"], ["Contact", "/contact"], ["Name checker", "/tools/name-check"], ["Compliance calendar", "/tools/compliance-calendar"]].map(([l, to]) => (
                  <li key={to}><Link to={to} className="text-[0.8125rem] font-medium text-muted transition-colors hover:text-accent-strong">{l}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[0.75rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 Complianto Consulting · {SITE.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            {[["Privacy", "/privacy"], ["Terms", "/terms"], ["Refund policy", "/refund-policy"]].map(([l, to]) => (
              <Link key={to} to={to} className="font-semibold transition-colors hover:text-accent-strong">{l}</Link>
            ))}
          </div>
          <div className="flex gap-4">
            {Object.entries(SITE.socials).map(([name, href]) => (
              <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={`Complianto on ${name}`}
                 className="font-semibold uppercase tracking-wider transition-colors hover:text-accent-strong">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
