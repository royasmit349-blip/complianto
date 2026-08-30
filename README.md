# Complianto Consulting — marketing site

Production-grade marketing website for Complianto Consulting (MentorCorp Private Limited),
Noida — company registration, GST, income tax, ROC, trademark and labour compliance.

Built as a React + Vite + TypeScript SPA of the Next.js 15 brief (hash routing keeps every
route refresh-safe on static hosting). The full Next.js migration path, redirects and SEO
checklist live in `MIGRATION.md`.

## Stack

- **React 18 + Vite 6 + TypeScript (strict)**
- **Tailwind CSS v4** — all design tokens live in `src/index.css` (`@theme`); nothing off-palette
- **GSAP 3.13+** (ScrollTrigger, MotionPath, SplitText — all free since April 2025) via `@gsap/react`
- **Radix UI** (accordion, dialog), **Embla** (testimonials), **react-hook-form + zod** (forms)
- **lucide-react** icons · **Lato** (display) + **Montserrat** (body)

## Scripts

```bash
npm install
npm run dev        # local dev
npm run build      # production build → dist/
npm run typecheck  # tsc --noEmit
```

## Architecture

One data source drives the mega-menu, journey nodes, services grid, service pages,
the consultation form select and the footer: `src/data/services.ts`.
Site config (contact, stats, team, testimonials, deadline dataset, blog) lives in `src/data/site.ts`.

The signature element — the continuous **compliance line** — is `src/motion/ComplianceLine.tsx`
(sticky right rail, one path, one scrubbed ScrollTrigger). The pinned three-act journey is
`src/home/Journey.tsx`; both degrade to static, fully-visible states under
`prefers-reduced-motion` and below 1024px.

## Environment variables (production, Next.js phase)

```
RESEND_API_KEY=                 # consultation emails
LEAD_NOTIFY_EMAIL=services@complianto.in
CRM_WEBHOOK_URL=                # optional CRM / Google Sheet webhook
NEXT_PUBLIC_GTM_ID=             # «client's existing GTM container»
NEXT_PUBLIC_SITE_URL=https://complianto.in
NEXT_PUBLIC_WHATSAPP_NUMBER=919216029676
TURNSTILE_SECRET_KEY=           # optional bot protection
RAZORPAY_KEY_ID=                # optional payments
SANITY_PROJECT_ID=              # if Sanity is adopted for services/blog
```

In this static demo the consultation form simulates the API round-trip; wire
`POST /api/consultation` (Resend + webhook + honeypot, as specified in the brief)
when moving to the Next.js shell.

## Client must supply before launch

- Years of experience, team size, registrations completed (`STATS` in `src/data/site.ts` —
  currently `null` and omitted from the UI, never guessed)
- Real consented client testimonials and logos, team names/photos/bios
- Service pricing, confirmed document lists, the primary phone number
  (+91-9216029676 vs +91-7827355027)
- Social profile URLs, GTM ID, Resend/CRM keys
- The WordPress URL export → `redirects.ts` map (see MIGRATION.md)
