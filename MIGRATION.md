# Migration — WordPress/Kallyas → Complianto rebuild

The current site ranks for compliance keywords. Losing that in a rebuild would be the most
expensive possible mistake. This document tracks what moved where and what remains.

## URL mapping (preserve or 301)

| Old WordPress URL (pattern)            | New route                        | Action   |
| -------------------------------------- | -------------------------------- | -------- |
| `/company-registration/…` (services)   | `/services/<slug>`               | 301 each |
| `/gst-registration/…`                  | `/services/gst-registration`     | 301      |
| `/trademark-registration/…`            | `/services/trademark-registration` | 301    |
| `/blog/<post-slug>`                    | `/blog/<post-slug>` (same slug)  | keep     |
| `/contact-us/`                         | `/contact`                       | 301      |
| `/about-us/`                           | `/about`                         | 301      |
| `/name-availability/` (rudimentary)    | `/tools/name-check`              | 301      |

> **«CLIENT TO SUPPLY: full URL export from WordPress (e.g. via a crawl or the Yoast/Redirection
> export). Every old URL must appear in `redirects.ts` before the DNS switch.»**

When the Next.js 15 shell is assembled, the map becomes `next.config.ts`:

```ts
// redirects.ts — «populate from the WordPress URL export»
export const redirects = [
  // { source: "/company-registration/private-limited", destination: "/services/private-limited-company", permanent: true },
];
```

## Carried over

- Service catalogue seeded from the existing site's structure (30 services, 7 practice areas)
  — single source of truth in `src/data/services.ts`
- Brand: Lato + Montserrat, phone +91-9216029676, services@complianto.in, Noida Sector 3 address,
  Mon–Sat 10:00–19:00, MentorCorp Private Limited legal entity
- Blog seed titles preserved; published dates must be migrated intact from WordPress

## Pre-launch SEO checklist

1. Crawl the old site → produce the full URL list
2. Diff against the new sitemap; add a 301 for every moved URL
3. Verify 301s with a redirect checker (no chains, no loops)
4. Keep or improve existing page titles/meta descriptions — do not truncate established H1s
5. Ship `sitemap.xml` (same path as today) and `robots.txt`
6. Resubmit the sitemap in Search Console; monitor 404s for 4 weeks
7. Carry over the existing GTM container so historical measurement continues
8. LocalBusiness JSON-LD present (Noida address, hours, phone) — verify with the Rich Results test

## Still to wire in the Next.js phase

- `app/api/consultation` (Resend + CRM/Sheets webhook + honeypot + rate limiting)
- `app/api/name-check` (swap the seed source in `src/lib/name-check.ts` for the client endpoint/MCA)
- GA4 via the client's GTM container
- Razorpay for packaged services (currently enquiry-only)
