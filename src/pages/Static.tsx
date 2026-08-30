import { usePageMeta } from "../lib/seo";
import { Reveal } from "../lib/motion";
import { SITE } from "../data/site";

type LegalDoc = {
  title: string;
  updated: string;
  sections: { h: string; ps: string[] }[];
};

const DOCS: Record<"privacy" | "terms" | "refund-policy", LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    updated: "January 2026",
    sections: [
      { h: "What we collect", ps: ["When you use this website or request a consultation, we collect the details you share — your name, city, contact number, email and the information needed to scope your engagement (for example, entity type and documents you send us). We do not collect more than the enquiry requires."] },
      { h: "How we use it", ps: ["Your information is used to respond to your enquiry, prepare quotations, deliver the services you engage us for, and — only with your consent — to send reminders about statutory deadlines relevant to your business. We do not sell or rent your data to third parties."] },
      { h: "Confidentiality", ps: ["Company information, financial records and trademark material shared with us are handled under confidentiality agreements. Access inside the firm is limited to the professionals working on your matter."] },
      { h: "Retention & your rights", ps: ["We retain engagement records for the period required by law and professional practice. You may ask us to correct your details, or to stop contacting you, at any time by writing to " + SITE.email + "."] },
      { h: "Contact", ps: [`Questions about this policy can be sent to ${SITE.email} or ${SITE.phoneDisplay}.` ] },
    ],
  },
  terms: {
    title: "Terms of Service",
    updated: "January 2026",
    sections: [
      { h: "Who we are", ps: [`Complianto Consulting is operated by ${SITE.legalName}, registered in Noida, Uttar Pradesh. These terms govern your use of this website; the specific scope, fees and deliverables of any engagement are set out in the engagement letter or quotation you accept.`] },
      { h: "Information, not advice", ps: ["Content on this website — including tools, calendars and blog articles — is provided for general guidance and is indicative in nature. Statutory deadlines, fees and eligibility criteria change; we confirm the position that applies to your specific facts during an engagement."] },
      { h: "Government fees", ps: ["Where we file on your behalf, government fees, stamp duty and statutory charges are billed at actuals and are payable to the respective authorities. These are separate from our professional fees."] },
      { h: "Your responsibilities", ps: ["Filings depend on the information and documents you provide. Delays caused by incomplete or inaccurate information are outside our control; we will always tell you what is needed and by when."] },
      { h: "Fair use", ps: ["You agree not to misuse this website, attempt unauthorised access, or use our content in a way that suggests endorsement without written permission."] },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    updated: "January 2026",
    sections: [
      { h: "Professional fees", ps: ["If we have not yet begun work on your matter, professional fees are refundable in full. Once work has started — documents prepared, forms drafted or filed — fees are refundable only to the extent of work not performed, assessed fairly and shared with you in writing."] },
      { h: "Government fees", ps: ["Fees paid to government authorities (MCA, GST, Income Tax, DGFT and others) are governed by those authorities and are generally non-refundable once deposited. We never add a margin to these charges."] },
      { h: "How to request", ps: [`Write to ${SITE.email} with your payment reference. We acknowledge within one business day and settle approved refunds within 7 working days to the original payment method.`] },
      { h: "Subscriptions & AMCs", ps: ["Annual compliance AMCs may be cancelled with 30 days' notice; fees for the unexpired period are refunded after deducting filings already completed."] },
    ],
  },
};

export function LegalPage({ doc }: { doc: "privacy" | "terms" | "refund-policy" }) {
  const d = DOCS[doc];
  usePageMeta(`${d.title} | Complianto`);
  return (
    <div className="shell max-w-3xl py-16 md:py-24">
      <Reveal>
        <p className="eyebrow eyebrow-accent">Legal · Updated {d.updated}</p>
        <h1 className="t-h2 mt-4 text-ink">{d.title}</h1>
      </Reveal>
      <div className="mt-10 space-y-10">
        {d.sections.map((s, i) => (
          <Reveal key={s.h} delay={i * 0.03}>
            <section>
              <h2 className="t-h3 text-ink">{s.h}</h2>
              {s.ps.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-[0.9375rem] leading-[1.8] text-muted">{p}</p>
              ))}
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
