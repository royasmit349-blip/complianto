/**
 * Complianto site configuration — contact, stats, team, testimonials,
 * deadline data and blog content. Unconfirmed figures are null and
 * omitted from the UI rather than guessed («client to confirm»).
 */

export const SITE = {
  brand: "Complianto",
  legalName: "MentorCorp Private Limited",
  phoneDisplay: "+91-9216029676",
  phoneHref: "tel:+919216029676",
  /* Client to confirm before launch which number is primary:
     +91-9216029676 (footer) or +91-7827355027 (current hero). */
  whatsappNumber: "919216029676",
  whatsappUrl:
    "https://wa.me/919216029676?text=Hi%20Complianto%2C%20I%27d%20like%20a%20free%20consultation",
  email: "services@complianto.in",
  hours: "Mon–Sat, 10:00 am – 7:00 pm",
  address: [
    "The Office Pass, 1st floor, D-9, Block D,",
    "Noida Sector 3, near Noida Sector 16 Metro,",
    "Noida, Uttar Pradesh 201301",
  ],
  /* Social profile URLs — client to supply; platform roots used meanwhile. */
  socials: {
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
    facebook: "https://www.facebook.com",
    x: "https://x.com",
  },
};

/* ---------------- stats ----------------
   Only 20,000+ clients served is confirmed. Everything else stays null
   until the client confirms — the UI omits missing stats. */
export const STATS: {
  clientsServed: number;
  yearsExperience: number | null; // «client to confirm»
  teamMembers: number | null;     // «client to confirm»
  registrationsCompleted: number | null; // «client to confirm»
} = {
  clientsServed: 20000,
  yearsExperience: null,
  teamMembers: null,
  registrationsCompleted: null,
};

export const SUPPORTING_FACTS = [
  { value: "7", label: "practice areas under one roof" },
  { value: "Pan-India", label: "registrations across every state" },
  { value: "Mon–Sat", label: "support by call and WhatsApp" },
];

/* ---------------- team ----------------
   Names and photos: «client to supply». Role cards render with
   initial monograms as the graceful fallback. */
export const TEAM = [
  { initials: "CL", role: "Corporate Law Lead", line: "Incorporations, ROC filings and board-level advisory." },
  { initials: "GT", role: "GST & Indirect Tax Lead", line: "Registrations, returns and notice replies across states." },
  { initials: "IT", role: "Income Tax Lead", line: "ITR, TDS and 12A/80G for companies and NGOs." },
  { initials: "LC", role: "Labour Compliance Lead", line: "PF, ESI and payroll-linked filings, month after month." },
];

/* ---------------- testimonials ----------------
   PLACEHOLDER — replace attribution with real, consented client
   names and photos before launch. Quotes follow the client's voice. */
export const TESTIMONIALS = [
  {
    quote: "Making a new LLP was superfast and they guided me at every step.",
    meta: "LLP formation", city: "Delhi NCR",
  },
  {
    quote: "A dedicated person was assigned to us, with updates on call and WhatsApp — top-notch service for our compliance.",
    meta: "Compliance AMC", city: "Noida",
  },
  {
    quote: "Clear pricing, no surprises. The GST registration was done well before they promised.",
    meta: "GST registration", city: "Gurugram",
  },
  {
    quote: "They flagged an ROC deadline I'd completely missed. That alone paid for the service.",
    meta: "ROC annual filings", city: "Bengaluru",
  },
  {
    quote: "From trademark search to the objection reply, everything was handled without us chasing anyone.",
    meta: "Trademark registration", city: "Mumbai",
  },
];

/* «client logos — replace with real, consented client wordmarks» */
export const CLIENT_MARKS = [
  "Arcline Studio", "Kavya Foods", "Truvalve Engg.", "Northwind Retail",
  "Meraki Labs", "Sattva Wellness", "Brightpath Edu", "Zephyr Logistics",
];

/* ---------------- deadline data ----------------
   Standard, widely-published indicative due dates. Always shown with
   the disclaimer: indicative for general guidance, confirm specifics. */
export const ENTITY_TYPES = ["Private Limited", "LLP", "OPC", "Proprietorship"] as const;
export type EntityType = (typeof ENTITY_TYPES)[number];

export type DueCategory = "GST" | "ROC" | "ITR" | "TDS" | "PF & ESI";

export type DueItem = {
  name: string;
  category: DueCategory;
  /** day of month for recurring filings */
  day?: number;
  frequency: "Monthly" | "Quarterly" | "Annual";
  /** calendar month (1–12) for annual/quarterly filings */
  months?: number[];
  applies: EntityType[];
  note?: string;
};

export const DUE_DATES: DueItem[] = [
  { name: "GSTR-1 — outward supplies", category: "GST", day: 11, frequency: "Monthly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "Monthly filers; quarterly (QRMP) filers differ" },
  { name: "GSTR-3B — summary return & tax", category: "GST", day: 20, frequency: "Monthly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"] },
  { name: "TDS deposit (incl. salary, 26Q items)", category: "TDS", day: 7, frequency: "Monthly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "April deposit due 30 April" },
  { name: "PF contribution (ECR)", category: "PF & ESI", day: 15, frequency: "Monthly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "Where EPF applies" },
  { name: "ESI contribution", category: "PF & ESI", day: 15, frequency: "Monthly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "Where ESI applies" },
  { name: "Advance tax instalment", category: "ITR", months: [6, 9, 12, 3], day: 15, frequency: "Quarterly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "Where advance tax liability arises" },
  { name: "TDS return (24Q/26Q/27Q)", category: "TDS", months: [7, 10, 1, 5], day: 31, frequency: "Quarterly", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"] },
  { name: "ITR — non-audit cases", category: "ITR", months: [7], day: 31, frequency: "Annual", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "FY just ended" },
  { name: "ITR — companies & audit cases", category: "ITR", months: [10], day: 31, frequency: "Annual", applies: ["Private Limited", "LLP", "OPC"] },
  { name: "AGM — annual general meeting", category: "ROC", months: [9], day: 30, frequency: "Annual", applies: ["Private Limited", "OPC"] },
  { name: "AOC-4 — financial statements", category: "ROC", months: [10], day: 30, frequency: "Annual", applies: ["Private Limited", "OPC"], note: "Indicative — within 30 days of AGM" },
  { name: "MGT-7 — annual return", category: "ROC", months: [11], day: 30, frequency: "Annual", applies: ["Private Limited", "OPC"], note: "Indicative — within 60 days of AGM" },
  { name: "DPT-3 — return of deposits", category: "ROC", months: [6], day: 30, frequency: "Annual", applies: ["Private Limited", "OPC"] },
  { name: "DIR-3 KYC — directors", category: "ROC", months: [9], day: 30, frequency: "Annual", applies: ["Private Limited", "OPC"] },
  { name: "Form 11 — LLP annual return", category: "ROC", months: [5], day: 30, frequency: "Annual", applies: ["LLP"] },
  { name: "Form 8 — LLP statement of account & solvency", category: "ROC", months: [10], day: 30, frequency: "Annual", applies: ["LLP"], note: "Indicative — within 30 days of the half-year end" },
  { name: "GSTR-9 — annual return", category: "GST", months: [12], day: 31, frequency: "Annual", applies: ["Private Limited", "LLP", "OPC", "Proprietorship"], note: "For FY just ended" },
];

/* ---------------- why pillars ---------------- */
export const PILLARS = [
  { n: "01", title: "Accessibility", copy: "Reach us easily and get professional support when you need it." },
  { n: "02", title: "Transparent pricing", copy: "Clear, affordable pricing with no hidden charges. Government fees are billed at actuals." },
  { n: "03", title: "Confidentiality", copy: "Your company information and trademarks stay protected under confidentiality agreements." },
  { n: "04", title: "Expertise", copy: "Qualified, experienced professionals across finance, legal and compliance." },
  { n: "05", title: "Personalised service", copy: "Different business, different needs — solutions tailored to yours." },
  { n: "06", title: "Prompt response", copy: "Quick turnarounds, with proactive updates by call and WhatsApp." },
];

/* ---------------- blog ---------------- */
export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readMins: number;
  excerpt: string;
  body: { heading?: string; paragraphs: string[] }[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "inc-20a-business-commencement-declaration",
    title: "INC-20A filing: the business commencement declaration",
    category: "ROC Compliance",
    date: "12 Jan 2026",
    readMins: 4,
    excerpt:
      "Every company with share capital incorporated after 2 November 2018 must declare commencement of business within 180 days — or risk penalty and even strike-off.",
    body: [
      {
        paragraphs: [
          "When a company receives its Certificate of Incorporation, most founders assume the paperwork is done. One filing is still outstanding: Form INC-20A, the declaration of commencement of business under Section 10A of the Companies Act, 2013.",
          "The rule applies to every company having a share capital incorporated on or after 2 November 2018. Within 180 days of incorporation, a director must file a declaration that every subscriber to the MOA has paid the value of the shares agreed to be taken, and confirm the registered office.",
        ],
      },
      {
        heading: "What the filing needs",
        paragraphs: [
          "Practically, the filing rests on proof of share payment — bank statements showing the subscribers' deposits into the company's account — along with verification of the registered office where not already established.",
          "The consequences of missing the window are real: the Act provides for penalties on the company and on every defaulting officer, and a company that neither commences business nor files INC-20A within the prescribed period exposes itself to strike-off proceedings. «Current penalty amounts to be confirmed with the latest amendment schedule before relying on this article.»",
        ],
      },
      {
        heading: "How we handle it",
        paragraphs: [
          "For every incorporation we deliver, INC-20A is already on the compliance calendar with the bank-evidence checklist attached. Founders on our Pvt Ltd AMC never see this deadline — it is filed as a matter of routine.",
        ],
      },
    ],
  },
  {
    slug: "startup-tax-exemption-section-80iac",
    title: "Startup tax exemption under Section 80-IAC",
    category: "Startups",
    date: "28 Jan 2026",
    readMins: 5,
    excerpt:
      "DPIIT recognition is the entry ticket; the 80-IAC exemption is the prize. Here is how the two fit together, and what the application actually looks like.",
    body: [
      {
        paragraphs: [
          "Section 80-IAC lets an eligible startup deduct 100% of its profits from taxable income for consecutive assessment years out of its first years of operation. It is one of the most valuable benefits under Startup India — and one of the most misunderstood.",
          "The exemption is not automatic with DPIIT recognition. Recognition is the prerequisite; the exemption itself is a separate approval granted after an application that demonstrates innovation and scalability. «Current scheme terms — eligible years, turnover ceiling and entity types — should be confirmed against the latest notification before planning around them.»",
        ],
      },
      {
        heading: "Who can apply",
        paragraphs: [
          "In broad terms: a private limited company or LLP, recognised by DPIIT, incorporated on or after 1 April 2016, and within the turnover ceiling prescribed for the relevant year. The application is made on the Startup India portal with a write-up of the business's innovative and scalable character, plus financials.",
          "Applications are assessed by an inter-ministerial board, and outcomes are not guaranteed — which is why the write-up matters. We prepare it with the same care as a funding memo, because in substance it is one.",
        ],
      },
      {
        heading: "Practical tips",
        paragraphs: [
          "Apply early in your profit-making years, not after — the exemption applies to consecutive assessment years from the year of approval. Keep your books audit-clean from day one; inconsistent financials are the most common quiet killer of these applications.",
        ],
      },
    ],
  },
  {
    slug: "founders-guide-gst-registration-2026",
    title: "A founder's guide to GST registration in 2026",
    category: "GST",
    date: "9 Feb 2026",
    readMins: 6,
    excerpt:
      "When registration is actually mandatory, what the application needs, and what happens the day your GSTIN arrives — a plain-language walkthrough.",
    body: [
      {
        paragraphs: [
          "GST registration is the first real encounter most founders have with the tax machinery — and the one that sets the rhythm for everything after. Get the scope right at registration and every later filing is simpler; get it wrong and amendments (and sometimes penalties) follow.",
          "Registration becomes mandatory when aggregate turnover crosses the threshold applicable to your state and supply type, when you make inter-state taxable supplies, when you sell through e-commerce operators, or in specific categories such as casual taxable persons. «Thresholds vary by state and by whether you supply goods or services — confirm your position before relying on a general figure.»",
        ],
      },
      {
        heading: "The application, end to end",
        paragraphs: [
          "The application is filed on the GST portal and generates an ARN — the tracking number you should always ask for. The officer may verify premises or raise a query; response quality at this stage is usually the difference between a week and a month.",
          "Once the GSTIN arrives, the calendar starts: GSTR-1 for outward supplies, GSTR-3B with the tax payment, and the annual GSTR-9. Monthly or quarterly rhythm depends on turnover and the scheme chosen — QRMP eases frequency for smaller taxpayers but does not remove interest discipline on tax.",
        ],
      },
      {
        heading: "Mistakes we see most",
        paragraphs: [
          "Wrong principal place of business details (the top cause of verification queries), HSN codes chosen casually, and — the classic — registering and then forgetting to file nil returns in quiet months. A GSTIN with unfiled returns attracts late fees and can be flagged for cancellation. Our bookkeeping team sets the return calendar the day your GSTIN is issued, nil or not.",
        ],
      },
    ],
  },
];
