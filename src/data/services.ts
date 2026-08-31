/**
 * Complianto — single source of truth for services.
 * Drives: mega-menu, journey nodes, services grid, service pages,
 * the consultation form select and related-services blocks.
 *
 * ACCURACY RULE: regulated domain. Where a document list, price or
 * timeline is not confirmed, values are marked «to be confirmed» —
 * never invent regulatory specifics.
 */
import type { LucideIcon } from "lucide-react";
import {
  Award, BadgeCheck, Banknote, BookOpen, Briefcase, Building2, CalendarClock,
  ClipboardCheck, Factory, FileSignature, FileText, Fingerprint, Globe2,
  Handshake, HardHat, HeartHandshake, Landmark, Megaphone, PackageCheck,
  PieChart, Receipt, Rocket, Scale, ShieldCheck, Stamp, User, Users, Wallet,
} from "lucide-react";

export type ServiceCategory =
  | "start" | "licenses" | "trademark" | "tax" | "compliance" | "labour" | "marketing";

export type Act = "start" | "manage" | "scale";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  act: Act;
  oneLiner: string;
  description: string;
  includes: string[];
  documents: string[];
  process: { step: string; detail: string }[];
  timeline?: string;
  faqs: { q: string; a: string }[];
  /** INR, excl. govt fees — omitted when unknown (never invented) */
  priceFrom?: number;
  icon: LucideIcon;
  featured?: boolean;
  seo: { title: string; description: string };
};

export const CATEGORY_META: Record<ServiceCategory, { label: string; menuTitle: string }> = {
  start:     { label: "Company Registration",   menuTitle: "Start a Business" },
  licenses:  { label: "Licenses & Registrations", menuTitle: "Licenses & Registrations" },
  trademark: { label: "Trademark & IP",          menuTitle: "Trademark & IP" },
  tax:       { label: "Income Tax",              menuTitle: "Income Tax" },
  compliance:{ label: "Compliances",             menuTitle: "Compliances" },
  labour:    { label: "Labour Compliances",      menuTitle: "Labour Compliances" },
  marketing: { label: "Digital Marketing",       menuTitle: "Digital Marketing" },
};

export const CATEGORY_ORDER: ServiceCategory[] = [
  "start", "licenses", "trademark", "tax", "compliance", "labour", "marketing",
];

export const ACT_META: Record<Act, { label: string; title: string }> = {
  start:  { label: "Act 01", title: "Start your business" },
  manage: { label: "Act 02", title: "Manage your business" },
  scale:  { label: "Act 03", title: "Scale your business" },
};

const STD_PROCESS = [
  { step: "Free consultation", detail: "We understand your business and confirm the right route, structure and documents." },
  { step: "Preparation & filing", detail: "Our team prepares the paperwork and files with the concerned authority." },
  { step: "Tracking & liaison", detail: "We track the application and respond to any queries on your behalf." },
  { step: "Approval & handover", detail: "You receive your certificate or confirmation, plus a calendar of what comes next." },
];

const STD_DOCS = [
  "PAN & Aadhaar of the applicant(s)",
  "Address proof of the registered office / premises",
  "«Additional documents confirmed during consultation»",
];

const STD_INCLUDES = [
  "End-to-end filing handled by our team",
  "Document preparation and review",
  "Liaison with the concerned authority",
  "Status updates on call and WhatsApp",
];

const STD_FAQS = (what: string) => [
  {
    q: `How long does ${what} take?`,
    a: "Timelines on this page are indicative and depend on government processing. We give you a realistic estimate on the consultation call and keep you updated at every stage.",
  },
  {
    q: "What about government fees?",
    a: "Government fees, stamp duty and statutory charges are billed at actuals — you see exactly what goes to the authority and what is our service fee. No hidden charges.",
  },
];

type Seed = Partial<Service> &
  Pick<Service, "slug" | "title" | "category" | "act" | "oneLiner" | "icon">;

const S = (s: Seed): Service => ({
  description: s.oneLiner,
  includes: STD_INCLUDES,
  documents: STD_DOCS,
  process: STD_PROCESS,
  faqs: STD_FAQS(s.title.toLowerCase()),
  ...s,
  seo: {
    title: `${s.title} in Noida & Across India | Complianto`,
    description: s.oneLiner,
  },
});

export const SERVICES: Service[] = [
  /* ---------------- Start a Business ---------------- */
  S({
    slug: "private-limited-company", title: "Private Limited Company", category: "start", act: "start",
    icon: Building2, featured: true,
    oneLiner: "Register your business with the ROC under the Companies Act, 2013 — in the right structure for your stage.",
    description:
      "A private limited company is the most credible structure for funded, founder-led businesses in India. We incorporate yours end to end — name approval, DSCs, MOA & AOA and the SPICe+ filing — and hand you a first-year compliance calendar so nothing is missed from day one.",
    includes: [
      "Name approval via RUN / SPICe+",
      "Digital signatures (DSC) for two directors",
      "DIN allotment for up to two directors",
      "Drafting of MOA & AOA",
      "Certificate of Incorporation with PAN & TAN",
      "First-year statutory compliance calendar",
    ],
    documents: [
      "PAN & Aadhaar of all directors",
      "Passport-size photographs",
      "Registered office proof — electricity bill or rent agreement with NOC",
      "«Additional documents if a director is an NRI or foreign national»",
    ],
    process: [
      { step: "Structure check", detail: "Free call to confirm a private limited company suits your plans for funding, ESOPs and growth." },
      { step: "DSC & name approval", detail: "We issue digital signatures and reserve your name through the MCA." },
      { step: "SPICe+ filing", detail: "MOA, AOA and incorporation forms are filed together, with PAN & TAN." },
      { step: "Incorporation & calendar", detail: "Certificate of Incorporation delivered, plus your first compliance dates mapped." },
    ],
    timeline: "7–10 working days (indicative, subject to ROC processing)",
    faqs: [
      { q: "How many directors are required?", a: "A minimum of two directors and two shareholders (who can be the same people). At least one director must be resident in India." },
      { q: "Is there a minimum capital requirement?", a: "There is no statutory minimum paid-up capital. You can start with a capital level that suits your business — we help you decide a sensible figure." },
      { q: "What compliances follow incorporation?", a: "INC-20A commencement declaration, first auditor appointment, annual ROC filings (AOC-4, MGT-7), ITR and statutory audit. Our AMC covers all of it." },
    ],
  }),
  S({
    slug: "llp-registration", title: "LLP Registration", category: "start", act: "start",
    icon: Users, featured: true,
    oneLiner: "Limited liability with partnership flexibility — ideal for professional firms and small teams.",
    description:
      "An LLP gives partners limited liability without the compliance load of a company. We handle the FiLLiP incorporation, the LLP agreement and the post-incorporation filings, so your firm starts on a clean legal footing.",
    includes: [
      "Name reservation and DSCs for two partners",
      "FiLLiP incorporation filing",
      "Drafting of the LLP agreement",
      "LLP agreement filing (Form 3) within the due window",
      "PAN & TAN with the incorporation certificate",
    ],
    documents: [
      "PAN & Aadhaar of all partners",
      "Registered office proof with NOC",
      "«Partner contribution details, confirmed at onboarding»",
    ],
    timeline: "7–10 working days (indicative)",
    faqs: [
      { q: "How many partners do we need?", a: "At least two partners, with no upper limit. A body corporate can also be a partner." },
      { q: "Does an LLP need an audit every year?", a: "Audit applies only above specified turnover or contribution thresholds. We confirm whether your LLP qualifies for the exemption and track it each year." },
      { q: "LLP or private limited?", a: "LLPs carry lighter annual compliance; private limited suits businesses planning institutional investment or ESOPs. We compare both on a free call." },
    ],
  }),
  S({
    slug: "opc-registration", title: "One Person Company (OPC)", category: "start", act: "start",
    icon: User, featured: true,
    oneLiner: "Run a company on your own, with no partner required.",
    description:
      "The OPC lets a single founder enjoy a company structure — limited liability, a separate legal identity — without finding a partner. We incorporate it with your nominee on record and set up your annual compliance rhythm.",
    includes: [
      "Name approval and DSC for the single director",
      "Nominee documentation (Form INC-3)",
      "MOA & AOA drafted for a single-member company",
      "Incorporation certificate with PAN & TAN",
    ],
    timeline: "7–10 working days (indicative)",
  }),
  S({
    slug: "section-8-company", title: "Section 8 Company", category: "start", act: "start",
    icon: HeartHandshake,
    oneLiner: "Register a not-for-profit company for social objectives, with limited liability and a credible structure.",
    description:
      "For social enterprises and non-profits that want a company structure, a Section 8 licence from the ROC is the route. We prepare the objects, draft the MOA/AOA and manage the licence and incorporation together.",
    includes: ["Section 8 licence application", "MOA/AOA with not-for-profit objects", "Incorporation after licence grant", "Guidance on 12A/80G next steps"],
    timeline: "4–8 weeks (indicative, licence processing varies)",
  }),
  S({
    slug: "startup-india-registration", title: "Startup India Registration", category: "start", act: "start",
    icon: Rocket, featured: true,
    oneLiner: "DPIIT recognition that unlocks startup schemes and tax benefits.",
    description:
      "DPIIT recognition opens doors — easier public procurement, fast-track trademarking and the pathway to the Section 80-IAC tax exemption. We assess eligibility, prepare the application and file it on the Startup India portal.",
    includes: [
      "Eligibility assessment against current DPIIT criteria",
      "Application on the Startup India portal",
      "Entity and innovation write-up prepared for you",
      "DPIIT recognition certificate",
      "Briefing on schemes you can now claim",
    ],
    timeline: "2–4 weeks (indicative)",
    faqs: [
      { q: "Who is eligible?", a: "Private limited companies and LLPs within the age and turnover limits set by DPIIT, working towards innovation or scalable growth. We check your entity against the current criteria first." },
      { q: "Does recognition guarantee the tax exemption?", a: "No — the Section 80-IAC exemption is a separate approval. Recognition is the prerequisite, and we can take that application forward too." },
    ],
  }),
  S({
    slug: "trust-ngo-society", title: "Trust / NGO / Society Registration", category: "start", act: "start",
    icon: Landmark,
    oneLiner: "Set up a trust, society or NGO — deed, by-laws and the path to 12A/80G.",
    description:
      "Whether a public trust, a society or a Section 8 company, the right vehicle depends on your governance and funding plans. We register the entity, draft its governing documents and map the 12A/80G pathway.",
    includes: ["Structure comparison: trust vs society vs Section 8", "Trust deed / by-laws drafting", "Registration with the concerned authority", "12A/80G roadmap"],
    timeline: "2–6 weeks (indicative, varies by state and structure)",
  }),
  S({
    slug: "digital-signature-dsc", title: "Digital Signature (DSC)", category: "start", act: "start",
    icon: Fingerprint,
    oneLiner: "Class 3 Digital Signature Certificates for MCA, GST, income tax and e-tendering.",
    description:
      "A Class 3 DSC is the key to every government portal — company filings, GST, tax returns, e-tenders. We issue individual and organisation DSCs with video verification, usually within a day.",
    includes: ["Class 3 individual or organisation DSC", "Video-based verification handled", "USB token guidance", "Installation support"],
    timeline: "1–2 working days (indicative)",
  }),

  /* ---------------- Licenses & Registrations ---------------- */
  S({
    slug: "gst-registration", title: "GST Registration", category: "licenses", act: "start",
    icon: Receipt, featured: true,
    oneLiner: "Get GST-registered and keep every filing cycle on time.",
    description:
      "From the first application to your ARN, GSTIN and return calendar — we handle GST registration for every state, respond to any departmental queries, and then keep your GSTR-1, GSTR-3B and annual filings on schedule.",
    includes: [
      "Eligibility check — threshold, inter-state supply, special categories",
      "Application on the GST portal for your state",
      "Response to any queries or clarifications raised",
      "GSTIN certificate and ARN tracking",
      "Your return due-date calendar set up",
    ],
    documents: [
      "PAN & Aadhaar of the proprietor / partners / directors",
      "Business address proof — rent agreement, electricity bill or NOC",
      "Bank account details («bank proof may be requested post-approval in some states»)",
      "Photograph and basic business details",
    ],
    process: [
      { step: "Scope & HSN review", detail: "We map your supplies, HSN/SAC codes and whether you need regular or composition registration." },
      { step: "Portal application", detail: "Filed on the GST portal with all documents; you get the ARN to track status." },
      { step: "Query handling", detail: "If the officer raises a query, we respond — usually the cause of delays when handled alone." },
      { step: "GSTIN & calendar", detail: "Certificate in hand, and your first return dates already on your calendar." },
    ],
    timeline: "3–7 working days (indicative — varies by state and verification)",
    faqs: [
      { q: "Is GST registration mandatory for my business?", a: "It depends on turnover thresholds (which vary by state and type of supply), inter-state sales and marketplace selling. We confirm your position on the consultation call — the check is free." },
      { q: "What returns will I file afterwards?", a: "Typically GSTR-1 (outward supplies) and GSTR-3B (summary return with tax) monthly or quarterly, plus the GSTR-9 annual return. Our bookkeeping team can run all of it for you." },
      { q: "Can you register us in multiple states?", a: "Yes — multi-state registrations, amendments and revocations are all handled by the same team." },
    ],
  }),
  S({
    slug: "msme-udyam-registration", title: "MSME / Udyam Registration", category: "licenses", act: "start",
    icon: BadgeCheck, featured: true,
    oneLiner: "Udyam registration that unlocks MSME schemes, cheaper credit and tender benefits.",
    description:
      "Udyam is free, instant and surprisingly powerful — priority-sector lending, tender fee exemptions and subsidy schemes all hang off it. We register you correctly under the right activity codes so the benefits actually apply.",
    includes: ["Udyam registration with correct NIC codes", "Udyam certificate", "Briefing on schemes you now qualify for"],
    timeline: "Same day (indicative)",
  }),
  S({
    slug: "fssai-license", title: "FSSAI License", category: "licenses", act: "start",
    icon: Factory,
    oneLiner: "Food licence or registration — basic, state or central — matched to your turnover and operations.",
    description:
      "Every food business in India needs an FSSAI registration or licence. We assess whether you fall under basic, state or central, prepare the application and chase it to the certificate.",
    includes: ["Category assessment (basic / state / central)", "Application with supporting documents", "Query handling with FSSAI", "Licence certificate and renewal calendar"],
    timeline: "2–6 weeks (indicative, varies by category)",
  }),
  S({
    slug: "gem-portal-registration", title: "GeM Portal Registration", category: "licenses", act: "start",
    icon: PackageCheck,
    oneLiner: "Get listed on the Government e-Marketplace to sell to government buyers.",
    description:
      "GeM opens public procurement to your business. We complete seller registration, bank verification and catalogue setup so you can bid and sell to government departments.",
    includes: ["Seller registration and OTP/bank verification", "Primary user and additional user setup", "Catalogue upload guidance", "Bid-readiness checklist"],
    timeline: "3–7 working days (indicative)",
  }),
  S({
    slug: "csr-1-registration", title: "CSR-1 for NGOs", category: "licenses", act: "scale",
    icon: HeartHandshake,
    oneLiner: "CSR-1 filing so your NGO can legally receive CSR funds from companies.",
    description:
      "Companies can channel CSR only to entities with a valid CSR-1 registration. We file Form CSR-1 with the MCA for your trust, society or Section 8 company and keep the registration current.",
    includes: ["Eligibility and track-record check", "Form CSR-1 preparation and MCA filing", "CSR-1 number and certificate", "Renewal tracking"],
    timeline: "2–4 weeks (indicative)",
  }),
  S({
    slug: "shop-establishment", title: "Shop & Establishment Registration", category: "licenses", act: "start",
    icon: ClipboardCheck,
    oneLiner: "The foundational labour registration for shops and commercial establishments.",
    description:
      "Required in most states before you hire, the Shop & Establishment registration formalises your premises and working conditions. We file under your state's rules and keep the renewal tracked.",
    includes: ["State-specific application", "Premises and employee details filing", "Registration certificate", "Renewal reminder"],
    timeline: "1–3 weeks (indicative, varies by state)",
  }),
  S({
    slug: "iso-certification", title: "ISO Certification", category: "licenses", act: "scale",
    icon: Award,
    oneLiner: "ISO 9001 and other certifications that make you tender-ready and audit-ready.",
    description:
      "ISO 9001, 27001, 14001 — most tenders and enterprise contracts expect at least one. We guide documentation, implementation and the certification audit through an accredited body.",
    includes: ["Gap assessment against the standard", "Documentation and process templates", "Internal audit preparation", "Support through the certification audit"],
    timeline: "4–8 weeks (indicative, depends on readiness)",
  }),
  S({
    slug: "import-export-code", title: "Import Export Code (IEC)", category: "licenses", act: "start",
    icon: Globe2,
    oneLiner: "DGFT Import Export Code — mandatory before your first import or export.",
    description:
      "No IEC, no cross-border trade. The application is online and linked to your PAN; we file it correctly the first time and set up the DGFT profile you will build on.",
    includes: ["IEC application on the DGFT portal", "Bank and AD code linkage guidance", "IEC certificate", "Briefing on next steps for exporters"],
    timeline: "2–5 working days (indicative)",
  }),

  /* ---------------- Trademark & IP ---------------- */
  S({
    slug: "trademark-registration", title: "Trademark Registration", category: "trademark", act: "start",
    icon: Stamp, featured: true,
    oneLiner: "Protect your brand name, logo or symbol with exclusive legal rights.",
    description:
      "Your brand is an asset — a registered trademark is what makes it enforceable. We run the class search, draft the specification, file the TM-A and monitor the application through examination, publication and registration.",
    includes: [
      "Comprehensive class and conflict search",
      "Specification of goods / services drafted",
      "TM-A filing with the Trade Marks Registry",
      "Application monitoring till registration",
      "Objection watch and alert service",
    ],
    documents: [
      "Applicant details (individual / company / LLP)",
      "The mark — word, logo or device",
      "User date, if the mark is already in use",
      "MSME / Startup certificate, if claiming fee concession",
    ],
    process: [
      { step: "Search & strategy", detail: "We search the registry and advise on classes and the strength of your mark before spending a rupee." },
      { step: "Filing", detail: "TM-A filed — you can use the ™ symbol the same day." },
      { step: "Examination", detail: "We watch for the examination report and reply to any objection within the window." },
      { step: "Registration", detail: "After publication and any opposition window, the ® certificate is issued — valid 10 years, renewable." },
    ],
    timeline: "Filing within 2–3 working days; registration typically takes months of government processing (indicative)",
    faqs: [
      { q: "How long does a trademark last?", a: "Registration is valid for 10 years and can be renewed indefinitely, 10 years at a time. We track the renewal for you." },
      { q: "What is the difference between ™ and ®?", a: "™ can be used from the day of filing. ® may only be used after the registration certificate is granted — using it earlier is an offence." },
      { q: "In how many classes should we file?", a: "One class per core activity is typical for early-stage brands. We map your current and near-future activities to the right classes so you are not over- or under-covered." },
    ],
  }),
  S({
    slug: "trademark-objection-reply", title: "Trademark Objection Reply", category: "trademark", act: "manage",
    icon: FileSignature,
    oneLiner: "A reasoned reply to a trademark examination report, drafted and filed by our team.",
    description:
      "An examination objection is not a refusal — most are overcome with a well-argued reply filed in time. We analyse the citation or ground raised, draft the response with case references where useful, and file within the statutory window.",
    includes: ["Analysis of the examination report", "Reply drafted with arguments and evidence", "Filing within the due window", "Hearing representation, if required («fees confirmed per matter»)"],
    timeline: "Filed within the statutory window; outcome depends on the Registrar",
  }),

  /* ---------------- Income Tax ---------------- */
  S({
    slug: "income-tax-return", title: "Income Tax Return (ITR)", category: "tax", act: "manage",
    icon: FileText, featured: true,
    oneLiner: "Income tax return filing for individuals, firms and companies — accurate and on time.",
    description:
      "From salaried founders to audited companies, we prepare and file ITRs with careful reconciliation of AIS/TIS, bank entries and advance tax — so refunds land and notices stay away.",
    includes: ["AIS/TIS reconciliation before filing", "Correct ITR form selection", "Computation and filing with verification", "Refund tracking", "Notice support («separate engagement if a notice arrives»)"],
    timeline: "Filed within 1–3 working days of receiving complete data",
    faqs: [
      { q: "Which ITR form applies to us?", a: "It depends on income sources and entity type — ITR-1 to ITR-7. We select the right form as part of the engagement, not a guess." },
      { q: "What is the due date?", a: "For most non-audit cases the due date is 31 July following the financial year; companies and audit cases differ. We track the exact date for your situation every year." },
    ],
  }),
  S({
    slug: "tds-compliance", title: "TDS Compliance", category: "tax", act: "manage",
    icon: Banknote,
    oneLiner: "TDS deduction, deposit and quarterly returns — with certificates issued correctly.",
    description:
      "Late TDS deposits attract interest at 1.5% a month and the returns invite penalties for every day of delay. We run the monthly deposit cycle, quarterly returns and Form 16/16A issuance so the ledger stays clean.",
    includes: ["Monthly TDS deposit cycle", "Quarterly TDS returns (24Q/26Q/27Q as applicable)", "Form 16/16A generation and issue", "Lower-deduction certificate support"],
    timeline: "Monthly cycle — deposits by the 7th, returns quarterly",
  }),
  S({
    slug: "12a-registration", title: "12A Registration", category: "tax", act: "scale",
    icon: ShieldCheck, featured: true,
    oneLiner: "The income-tax registration that exempts your NGO's income.",
    description:
      "Section 12A (now 12AB) registration is what lets a trust, society or Section 8 company apply its income to its objects without tax. We prepare the application, represent before the Commissioner where needed and track provisional-to-regular conversion.",
    includes: [
      "Assessment of objects and activities against 12AB criteria",
      "Application with deed, registration and accounts",
      "Representation before the Commissioner, if called",
      "12AB registration certificate",
      "Renewal / conversion tracking",
    ],
    timeline: "1–3 months (indicative, depends on the department)",
    faqs: [
      { q: "Who needs 12A?", a: "Charitable trusts, societies and Section 8 companies that want their surplus treated as applied to charitable objects rather than taxed as income." },
      { q: "Is 12A the same as 80G?", a: "No — 12A exempts the NGO's own income; 80G gives donors a deduction. Most NGOs want both, and we file them together." },
    ],
  }),
  S({
    slug: "80g-registration", title: "80G Registration", category: "tax", act: "scale",
    icon: ShieldCheck, featured: true,
    oneLiner: "Let donors claim deductions — the fundraising accelerator for NGOs.",
    description:
      "Donors give more, and more often, when their donation is tax-deductible. We obtain 80G(5) registration for your NGO and keep the approval current so every receipt you issue carries the deduction.",
    includes: ["80G(5) application with supporting records", "Certificate and approval number", "Donation receipt framework guidance", "Renewal tracking"],
    timeline: "1–3 months (indicative)",
  }),

  /* ---------------- Compliances ---------------- */
  S({
    slug: "bookkeeping-accounting", title: "Bookkeeping & Accounting", category: "compliance", act: "manage",
    icon: BookOpen, featured: true,
    oneLiner: "Accurate, systematic financial records and statements, maintained for you.",
    description:
      "Clean books are the quiet foundation of every filing that follows — GST, TDS, ITR, audit. We maintain ledgers monthly, reconcile banks and payables, and close your books so every downstream filing is fast and defensible.",
    includes: [
      "Monthly ledger maintenance and bank reconciliation",
      "Sales, purchase and expense classification",
      "Monthly management snapshot",
      "Year-end financial statements",
      "Coordination with your statutory auditor",
      "«Accounting software confirmed at onboarding — Tally, Zoho or your existing tool»",
    ],
    timeline: "Monthly cycle; books closed within 10 working days of month end",
    faqs: [
      { q: "Who owns the data?", a: "You do. Working files, ledgers and credentials are handed over in full if you ever move on." },
      { q: "Does bookkeeping include GST and TDS filing?", a: "Books are maintained so filings are accurate; GST/TDS return filing is available as part of the same engagement or separately — we quote both on the call." },
    ],
  }),
  S({
    slug: "roc-annual-compliance", title: "ROC Annual Compliances", category: "compliance", act: "manage",
    icon: CalendarClock, featured: true,
    oneLiner: "Maintain statutory registers and file annual forms so your company stays in good legal standing.",
    description:
      "AOC-4, MGT-7, DIR-3 KYC, AGM — the annual ROC calendar is unforgiving, and penalties compound daily. We maintain your statutory registers, prepare the board and AGM paperwork and file every form within its window.",
    includes: [
      "Annual compliance calendar with exact due dates",
      "AGM notice, agenda and minutes preparation",
      "AOC-4 and MGT-7 filing",
      "DIR-3 KYC for all directors",
      "Statutory register updates",
      "«Additional event-based forms as they arise»",
    ],
    timeline: "Calendar managed year-round; filings within each statutory window",
    faqs: [
      { q: "When are AOC-4 and MGT-7 due?", a: "Indicatively, AOC-4 falls within 30 days of the AGM and MGT-7 within 60 days. We compute the exact dates from your AGM each year and remind you before they matter." },
      { q: "What if previous years were never filed?", a: "We can regularise past defaults — the longer you wait, the higher the compounding fee. A catch-up engagement is usually cheaper than founders expect." },
    ],
  }),
  S({
    slug: "pvt-ltd-compliance-amc", title: "Pvt Ltd Compliance AMC", category: "compliance", act: "scale",
    icon: Building2,
    oneLiner: "Annual compliance cover for your private limited company — every form, every deadline.",
    description:
      "One annual retainer, and the entire statutory calendar of your private limited company is owned by us — ROC filings, AGM paperwork, register maintenance and proactive reminders. You build; we keep the record clean.",
    includes: ["Complete ROC annual filings", "AGM & board meeting documentation", "Statutory registers and minutes book", "Deadline alerts by call and WhatsApp", "Priority support on new matters"],
    timeline: "Annual engagement, billed per year",
  }),
  S({
    slug: "llp-compliance-amc", title: "LLP Compliance AMC", category: "compliance", act: "scale",
    icon: Users,
    oneLiner: "Annual compliance AMC for LLPs — Form 8, Form 11 and everything in between.",
    description:
      "LLPs file less, but the forms still carry daily late fees. Our AMC covers Form 8 and Form 11, register maintenance and the year-round calendar, so your LLP stays in good standing on autopilot.",
    includes: ["Form 8 (Statement of Account & Solvency)", "Form 11 (Annual Return)", "Change filings as they arise", "Deadline alerts"],
    timeline: "Annual engagement, billed per year",
  }),
  S({
    slug: "opc-compliance-amc", title: "OPC Compliance AMC", category: "compliance", act: "scale",
    icon: User,
    oneLiner: "Compliance cover for OPCs, so a one-person company stays in good standing.",
    description:
      "A one-person company still files like a company. Our AMC runs the OPC's annual filings and registers so solo founders never trade compliance time against build time.",
    includes: ["Annual ROC filings for OPC", "Statutory register maintenance", "AGM-exempt documentation handled correctly", "Deadline alerts"],
    timeline: "Annual engagement, billed per year",
  }),
  S({
    slug: "virtual-cfo", title: "Virtual CFO", category: "compliance", act: "scale",
    icon: PieChart,
    oneLiner: "CFO-level finance leadership — budgeting, MIS, cash-flow and fundraising support — on retainer.",
    description:
      "Between a bookkeeper and a full-time CFO sits the gap most SMEs feel. Our virtual CFO service delivers budgets, monthly MIS, cash-flow management and investor-ready numbers — without the full-time cost.",
    includes: ["Monthly MIS and variance reviews", "Budgeting & cash-flow management", "Bank and investor documentation", "Compliance oversight across GST, TDS and ROC", "Fundraising financial support"],
    timeline: "Monthly retainer",
  }),

  /* ---------------- Labour Compliances ---------------- */
  S({
    slug: "pf-registration-compliance", title: "PF Registration & Compliance", category: "labour", act: "manage",
    icon: HardHat, featured: true,
    oneLiner: "EPF establishment registration and monthly payroll-linked filings, handled.",
    description:
      "Once you cross the EPF threshold, registration is mandatory and the monthly ECR cycle never pauses. We register the establishment, onboard employees and run the monthly contribution filings end to end.",
    includes: [
      "EPF establishment registration",
      "Employee onboarding — UAN generation and KYC",
      "Monthly ECR filing and challan generation",
      "International worker reporting, if applicable",
      "Notice and inspection support («separate engagement») ",
    ],
    timeline: "Registration in 3–7 working days (indicative); monthly cycle thereafter",
    faqs: [
      { q: "When does PF become mandatory?", a: "Applicability depends on employee count and wages under the EPF Act. We check your current strength against the threshold before recommending registration." },
      { q: "What is the monthly cycle?", a: "Contributions are deposited monthly through the ECR — we handle the file, the challan and the reconciliation with your payroll." },
    ],
  }),
  S({
    slug: "esi-registration-compliance", title: "ESI Registration & Compliance", category: "labour", act: "manage",
    icon: HardHat, featured: true,
    oneLiner: "ESI registration and monthly contribution filings for eligible establishments.",
    description:
      "ESI extends health coverage to your team — and mandatory compliance to you. We register the unit, generate employee insurance numbers and run the half-yearly contribution cycle with monthly return discipline.",
    includes: ["ESI unit registration", "Employee insurance number generation", "Monthly wage and contribution processing", "Return filing and challan management"],
    timeline: "Registration in 3–7 working days (indicative); monthly cycle thereafter",
  }),

  /* ---------------- Digital Marketing ---------------- */
  S({
    slug: "digital-marketing", title: "Digital Marketing", category: "marketing", act: "scale",
    icon: Megaphone,
    oneLiner: "Performance marketing, SEO and lead generation for professional-services and SME brands.",
    description:
      "Compliance firms, clinics, manufacturers — we run the search and social engine that brings qualified enquiries, with reporting a founder can actually read. Scope and budget confirmed on a call.",
    includes: ["SEO & content strategy", "Google & Meta campaign management", "Landing page and funnel builds", "Monthly performance reporting"],
    timeline: "Engagements scoped per quarter",
  }),
];

/* ---------- helpers ---------- */
export const getService = (slug: string): Service | undefined =>
  SERVICES.find((s) => s.slug === slug);

export const featuredServices = (): Service[] => SERVICES.filter((s) => s.featured);

export const servicesInCategory = (c: ServiceCategory): Service[] =>
  SERVICES.filter((s) => s.category === c);

export const relatedServices = (s: Service, n = 3): Service[] =>
  SERVICES.filter((x) => x.slug !== s.slug && (x.act === s.act || x.category === s.category)).slice(0, n);

/** Journey acts — node labels follow the brief exactly. */
export const JOURNEY: { act: Act; copy: string; nodes: string[] }[] = [
  {
    act: "start",
    copy: "Turn your idea into a legal entity. We handle incorporation, registrations and the licences you need to open for business — quickly, and correctly the first time.",
    nodes: ["Private Limited", "LLP", "OPC", "Startup India", "GST", "MSME", "Trademark"],
  },
  {
    act: "manage",
    copy: "Stay compliant without thinking about it. Bookkeeping, ROC filings, income tax returns, TDS and payroll compliance — handled on schedule, every time.",
    nodes: ["Bookkeeping & Accounting", "ROC Annual Compliances", "ITR & TDS", "PF & ESI", "Virtual CFO"],
  },
  {
    act: "scale",
    copy: "Grow with confidence. From ISO certification and 12A/80G to ongoing AMC compliance and advisory, we keep your foundation solid as you expand.",
    nodes: ["ISO Certification", "12A & 80G", "Pvt Ltd & LLP AMC", "FSSAI", "Advisory"],
  },
];
