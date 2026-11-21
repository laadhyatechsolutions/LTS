# LTS Website

Company website for Laadhya Tech Solutions (LTS), Hyderabad — software, AI, automation and digital marketing (with Capture Media).

## Project docs
| File | What it is |
| --- | --- |
| `docs/01-services-catalogue.md` | Every service, product, industry and package — content source |
| `docs/02-website-build-plan.md` | Goals, audience, sitemap, page layouts, UX rules, tech stack, integrations, SEO, roadmap |
| `docs/03-design-system.md` | Final colours, fonts, components, Tailwind tokens (overrides older docs) |
| `docs/04-homepage-spec.md` | Approved homepage, section by section |
| `docs/05-forms-setup.md` | Connect the forms: Supabase table, Resend email, env keys, launch test checklist |

Design canvas (visual reference): https://claude.ai/artifact/8a16EuhpVDVa7AsBzooFku — artboard "Option A in colour — Lime".

## Tech stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide icons. Planned: Supabase (enquiries), Resend (email), Vercel (hosting).

## Run it on your Mac
```bash
cd ~/Desktop/LTS
npm install      # first time only
npm run dev      # open http://localhost:3000
```
Other commands: `npm run build` (production build), `npm run lint`.

## Where things are
| Path | What |
| --- | --- |
| `src/config/site.ts` | Company name, phone, WhatsApp number, email, address, social links — **edit once, updates everywhere** |
| `src/lib/leads.ts` + `src/app/actions/enquiry.ts` | Form handling: save lead to Supabase, email team + visitor via Resend |
| `supabase/leads.sql` | Run once in Supabase to create the `leads` table |
| `.env.example` | Keys the forms need — copy to `.env.local` / Vercel |
| `src/data/services.ts` | Service categories (from the catalogue) |
| `src/app/globals.css` | Colour tokens and fonts (Tailwind 4 uses this instead of tailwind.config.ts) |
| `src/app/layout.tsx` | Fonts, site title/SEO defaults, header, footer, WhatsApp button |
| `src/components/layout/` | TopBar, Header (mega-menu + mobile menu), Footer, Logo, WhatsAppButton |
| `src/components/ui/` | Button, Container |
| `src/app/page.tsx` | Homepage (assembles the sections) |
| `src/components/home/` | One file per homepage section |
| `src/data/home.ts` | Homepage text: stats, why points, packages, FAQs, testimonials — **placeholders in [brackets]** |
| `src/components/ui/` | Button, Container, SectionHeading, Placeholder (dashed box = image still needed), ServiceImage (service photos from `public/services/`, credits in `CREDITS.md`), Reveal (fade-up on scroll), CountUp (animated stats — needs real numbers), WhatsAppIcon |
| `src/components/layout/MobileActionBar.tsx` | Phones only: Call / WhatsApp / Get a Quote bar fixed to the bottom of the screen |

**UI rules (Nov 2026 refresh):** lime = the one accent (primary buttons, small highlights); violet = support (soft shadows, tints); surfaces are warm neutrals (`mist-*`). Use hairlines (`border-line`, `border-ink/10–20`) instead of heavy black borders, and `shadow-soft` / `shadow-lift` instead of hard offset shadows. Motion stays calm: no looping or flashing animations.

## Working method
Build one page at a time. Each page is completed and reviewed before the next starts.

## Page status
| # | Page | Status |
| --- | --- | --- |
| 0 | Project setup (Next.js, Tailwind tokens, fonts, Header, Footer, WhatsApp button) | ✅ Approved |
| 1 | Home | ✅ Built — awaiting review |
| 2 | Services hub | ✅ Built — awaiting review |
| 3 | Service page template + 7 category pages (56 service pages) | ✅ Built — awaiting review |
| 4 | Contact + Get a Quote | ✅ Built — Supabase storage + Resend emails wired in; add your keys to go live (see `docs/05-forms-setup.md`) |
| 5 | About | ✅ Built — awaiting review (story, team, dates, registrations are placeholders) |
| 6 | Portfolio (list with filters + case study pages) | ✅ Built — awaiting review (6 placeholder projects; add real ones in `src/data/portfolio.ts`) |
| 7 | Packages (8 package types × 3 tiers, comparison table) | ✅ Built — awaiting review (all prices and tier differences are placeholders) |
| 8 | Industries (hub + 10 industry pages) | ✅ Built — awaiting review (problem/solution copy is draft) |
| 9 | Products (LTS BizOS, WhatsApp CRM) | ✅ Built — awaiting review (module lists are draft; prices and screenshots needed) |
| 10 | Blog (list with search + categories, article template) | ✅ Built — awaiting review (4 placeholder articles; write real ones in `src/data/blog.ts` or move to MDX) |
| 11 | Legal pages (Privacy, Terms, Refund) | ✅ Built — DRAFT templates; a lawyer must review and fill all [brackets] before launch |
| 12 | Careers, custom 404, sitemap.xml, robots.txt, favicon/app icons, share image | ✅ Built — roles are placeholders in `src/data/careers.ts`; set `site.url` to your domain so the sitemap and share links use it |
| 13 | Cookie banner + GA4/Clarity (conversion events), Turnstile bot check, business structured data, Free AI audit page, Cost estimator | ✅ Built — all switched off until keys are added (see `docs/05-forms-setup.md`); estimator prices are placeholders in `src/data/estimator.ts` |
