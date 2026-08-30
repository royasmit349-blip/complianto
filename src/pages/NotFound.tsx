import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { usePageMeta } from "../lib/seo";
import { Reveal } from "../lib/motion";

export default function NotFound() {
  usePageMeta("Page not found | Complianto");
  return (
    <div className="shell flex min-h-[60vh] flex-col items-start justify-center py-24">
      <Reveal>
        <p className="eyebrow eyebrow-accent">404 — off the line</p>
        <h1 className="t-display mt-4 max-w-2xl text-ink">
          This page isn't on the compliance line.
        </h1>
        <p className="mt-5 max-w-xl text-[1.0625rem] text-muted">
          The address may have moved during our site upgrade. Everything you need is still one
          click away — services, tools, or a human on the phone.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary"><ArrowLeft className="h-4 w-4" aria-hidden /> Back to home</Link>
          <Link to="/services" className="btn btn-ghost">Browse services <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <Link to="/contact" className="btn btn-ghost">Contact us</Link>
        </div>
        <svg className="mt-14 h-8 w-64 text-line" viewBox="0 0 256 32" fill="none" aria-hidden>
          <path d="M2 16 C 60 16, 70 4, 128 4 S 200 28, 254 16" stroke="currentColor" strokeWidth="2" strokeDasharray="5 7" />
          <circle cx="254" cy="16" r="5" fill="var(--color-accent)" />
        </svg>
      </Reveal>
    </div>
  );
}
