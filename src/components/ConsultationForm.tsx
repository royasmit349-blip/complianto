import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { CATEGORY_META, CATEGORY_ORDER, SERVICES } from "../data/services";
import { track } from "../lib/analytics";

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name so we know who to ask for."),
  city: z.string().trim().min(2, "Which city is your business in?"),
  mobile: z.string().regex(/^[6-9][0-9]{9}$/, "Enter a valid 10-digit mobile number."),
  email: z.string().trim().email("We need an email to send your confirmation."),
  service: z.string().min(1, "Pick the service you need — or choose “Not sure yet”."),
  query: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.boolean().refine((v) => v === true, "Please tick this so we may contact you about your enquiry."),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot — humans never fill it
});

type FormValues = z.infer<typeof schema>;

export default function ConsultationForm({
  prefillService = "",
  prefillQuery = "",
  compact = false,
}: {
  prefillService?: string;
  prefillQuery?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const {
    register, handleSubmit, reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "", city: "", mobile: "", email: "",
      service: prefillService || "", query: prefillQuery, consent: false, website: "",
    },
  });

  useEffect(() => {
    if (prefillService || prefillQuery) {
      reset((prev) => ({ ...prev, service: prefillService || prev.service, query: prefillQuery || prev.query }));
    }
  }, [prefillService, prefillQuery, reset]);

  const onSubmit = async (values: FormValues) => {
    if (values.website) { setStatus("done"); return; } // bot caught — pretend success
    setStatus("sending");
    /* In production this POSTs to the Resend route handler (see README).
       The static demo simulates the round-trip. */
    await new Promise((r) => setTimeout(r, 900));
    track("consultation_submitted", { service: values.service });
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="card flex flex-col items-start gap-4 p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-card bg-accent-wash text-accent-strong">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div>
          <p className="t-h3">Thanks — we'll call you within one business day.</p>
          <p className="mt-2 text-muted">
            A confirmation is on its way to your inbox. If it's urgent, call{" "}
            <a className="font-semibold text-accent-strong u-draw" href="tel:+919216029676">+91-9216029676</a>{" "}
            — Mon–Sat, 10:00 am – 7:00 pm.
          </p>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setStatus("idle"); reset(); }}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const err = (k: keyof FormValues) =>
    errors[k] ? <p className="mt-1.5 text-[0.8125rem] font-semibold text-[#b3400e]">{String(errors[k]?.message)}</p> : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={compact ? "grid gap-4" : "grid gap-5"}>
      <div className={`grid gap-5 ${compact ? "grid-cols-2" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor="cf-name" className="field-label">Full name</label>
          <input id="cf-name" className={`field ${errors.name ? "field-error" : ""}`} placeholder="Priya Sharma" {...register("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="cf-city" className="field-label">City</label>
          <input id="cf-city" className={`field ${errors.city ? "field-error" : ""}`} placeholder="Noida" {...register("city")} />
          {err("city")}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-mobile" className="field-label">Mobile</label>
          <div className="flex gap-2">
            <span className="field pointer-events-none flex w-[5.5rem] shrink-0 items-center gap-1.5 text-muted" aria-hidden>
              <span aria-hidden>🇮🇳</span> +91
            </span>
            <input
              id="cf-mobile" inputMode="numeric" maxLength={10}
              className={`field ${errors.mobile ? "field-error" : ""}`}
              placeholder="98XXXXXXXX" {...register("mobile")}
            />
          </div>
          {err("mobile")}
        </div>
        <div>
          <label htmlFor="cf-email" className="field-label">Email</label>
          <input id="cf-email" type="email" className={`field ${errors.email ? "field-error" : ""}`} placeholder="you@business.in" {...register("email")} />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor="cf-service" className="field-label">Service of interest</label>
        <select id="cf-service" className={`field ${errors.service ? "field-error" : ""}`} {...register("service")}>
          <option value="">Select a service…</option>
          <option value="Not sure yet — guide me">Not sure yet — guide me</option>
          {CATEGORY_ORDER.map((c) => (
            <optgroup key={c} label={CATEGORY_META[c].menuTitle}>
              {SERVICES.filter((s) => s.category === c).map((s) => (
                <option key={s.slug} value={s.title}>{s.title}</option>
              ))}
            </optgroup>
          ))}
        </select>
        {err("service")}
      </div>
      <div>
        <label htmlFor="cf-query" className="field-label">Your query <span className="font-normal text-muted">(optional)</span></label>
        <textarea
          id="cf-query" rows={compact ? 3 : 4}
          className="field resize-y" placeholder="Tell us a little about your business and what you need…"
          {...register("query")}
        />
      </div>
      {/* honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />
      <div className="flex flex-col gap-4">
        <label className="flex cursor-pointer items-start gap-3 text-[0.8125rem] text-muted">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-(--color-accent)" {...register("consent")} />
          <span>
            I agree to be contacted by Complianto about my enquiry.{" "}
            <a href="#/privacy" className="font-semibold text-accent-strong u-draw">Privacy policy</a>.
            {err("consent")}
          </span>
        </label>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Get free consultation"}
        </button>
        <p className="flex items-center gap-2 text-[0.75rem] text-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-success" aria-hidden />
          No obligation. Your details stay with us — see our confidentiality commitment.
        </p>
      </div>
    </form>
  );
}
