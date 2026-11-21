# LTS Website Build Plan

Source: "LTS Website Build Plan – UI/UX, Design & Setup" doc (Nov 12, 2026).
**Note:** the colour and font sections of the original doc (navy/teal, Plus Jakarta Sans) are superseded. The final choices are in `03-design-system.md`.

## 1. Goal & audience

**Main goal:** turn visitors into enquiries (WhatsApp chat, call, or quote form). Every page pushes toward one action: **Get a Free Quote**.

**Secondary goals:** look as trustworthy as a big IT company, rank on Google for "software company in Hyderabad" searches, and show that LTS + Capture Media cover development *and* marketing.

**Who visits:**
- **SME owners** (clinics, institutes, retailers, traders) – not technical; want simple words, prices, proof, WhatsApp
- **Startup founders** – want an MVP/tech partner; care about speed, stack, portfolio
- **Corporate / B2B buyers** – want process, security, AMC, case studies
- **Investors & partners** – want to see products (LTS BizOS, WhatsApp CRM) and the team

**In 5 seconds on the homepage a visitor must understand:** what you do, who it's for, why trust you, how to contact you.

## 2. Sitemap

| Page | URL | Purpose |
| --- | --- | --- |
| Home | / | Overview + main conversion page |
| Services hub | /services | All services as cards in 6 categories |
| Website Development | /services/website-development | Category page |
| Mobile App Development | /services/mobile-app-development | Category page |
| Custom Software | /services/custom-software | CRM, LMS, HRMS, ERP etc. |
| AI Bots & Solutions | /services/ai-solutions | Chatbots, voice AI, AI agents |
| Automation & Integrations | /services/automation | WhatsApp API, workflows |
| Digital Marketing | /services/digital-marketing | SEO, ads, social (with Capture Media) |
| Single service pages | /services/[category]/[service] | e.g. /services/custom-software/crm-development |
| Products | /products | LTS BizOS, WhatsApp CRM |
| Industries | /industries/[industry] | Healthcare, Education, Real Estate etc. |
| Packages & Pricing | /packages | Ready packages in 3 tiers |
| Portfolio / Case Studies | /portfolio | Projects with results |
| About | /about | Story, team, values, Capture Media link |
| Blog | /blog | SEO articles |
| Careers | /careers | Jobs + internships |
| Contact | /contact | Form, WhatsApp, map, phone |
| Free Quote | /get-quote | Multi-step quote form |
| Legal | /privacy-policy, /terms, /refund-policy | Needed for payment gateways, Meta/WhatsApp approval |

**Top menu:** Services (mega-menu) · Products · Industries · Portfolio · Packages · About · Blog · **[Get a Free Quote]**

**Footer:** service links, industries, company links, Hyderabad address, phone, WhatsApp, email, social icons, Google Map, legal links, "A Laadhya Tech Solutions company · Marketing partner: Capture Media".

## 3. Page layouts

### Home page (final layout = "Option A in colour — Lime" on the design canvas; see `04-homepage-spec.md`)

### Services hub (/services)
- Short hero: "Everything your business needs to go digital"
- Sticky tab bar / filter: Website · Apps · Software · AI · Automation · Marketing · More
- Each category: heading + intro line + grid of service cards (icon, name, 1-line description, link)
- CTA block after every 2 categories

### Single service page template (reused for every service)
1. Breadcrumb (Home > Services > Custom Software > CRM)
2. Hero: service name, promise line, 2 buttons, image/mockup
3. Problem → Solution
4. What's included (feature list with icons)
5. Who it's for
6. Process / timeline
7. Tech stack
8. Related case study
9. Pricing guide ("Starting from") or package link
10. FAQs (+ FAQ schema)
11. Related services
12. Quote form / CTA

### Industry page template
Hero → common problems → LTS solutions (links to services) → ready package → case study → CTA.

### Packages page
Tabs per package type; Basic / Growth / Premium cards with features, "Starting from ₹…", "Get this package"; comparison table; FAQ.

### Portfolio page
Filter by service and industry; case study pages: client, challenge, solution, screenshots, results, tech, testimonial.

### About page
Founder story (Santhosh), mission & vision, values, team, Hyderabad office, timeline, LTS + Capture Media, registrations (Pvt Ltd, Udyam, GST).

### Contact & Quote
- **Contact:** form (name, phone, email, service, message), WhatsApp, call, email, Google Map, office hours
- **Get a Quote (multi-step):** service → business type → budget & timeline → contact details

### Blog
List with categories + search; article with table of contents, author, mid and end CTA boxes, related posts.

## 4. UX rules
- **Mobile first** – most SME owners arrive on a phone from WhatsApp or Instagram
- **One main action per screen** – "Get a Free Quote" always visible; WhatsApp button floats on every page
- **Customer's language** – "Get more leads from WhatsApp" beats "WhatsApp Business API integration solutions"
- **Proof everywhere** – numbers, client logos, screenshots, testimonials, Google reviews
- **Easy to scan** – short headings, 2–3 line paragraphs, icons, bullets
- **Max 3 clicks** to any service page
- **Short forms** – name, phone, service first
- **Fast** – under 2 s on 4G
- **Accessible** – readable contrast, ≥16px text on mobile, ≥44px buttons, alt text
- **Consistent** – same cards, buttons and spacing everywhere

## 5. Tech stack

| Layer | Tool |
| --- | --- |
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS (+ shadcn/ui where useful) |
| Animation | Framer Motion (light use) |
| Icons | Lucide React |
| Content | Data files (services.ts etc.); MDX for blog/case studies |
| Database & storage | Supabase (enquiries, quote requests, applications) |
| Forms | React Hook Form + Zod |
| Email | Resend (or Zoho SMTP) |
| Hosting | Vercel, deployed from GitHub |

**Service pages:** keep all services in one data file and build one template; Next.js generates every page from the data.

**Folder structure:**
- `app/` – pages: home, services/[category]/[service], industries/[slug], portfolio/[slug], blog/[slug], packages, about, contact, get-quote
- `components/` – ui (buttons, cards), sections (Hero, Services, Process, FAQ, CTA), layout (Header, Footer, MegaMenu)
- `data/` – services.ts, industries.ts, packages.ts, faqs.ts
- `content/` – blog and case study MDX
- `lib/` – supabase client, email, analytics helpers
- `public/` – logo, images, icons

## 6. Connections & integrations

### Must have (before launch)
Domain → Vercel · Vercel hosting + SSL · GitHub (private) · Supabase `leads` table (name, phone, email, service, budget, source, page, created_at) · business email (SPF/DKIM/DMARC) · Resend/SMTP (alert to you + auto-reply) · WhatsApp click-to-chat with per-page pre-filled message · GA4 (form submits, WhatsApp clicks, calls as conversions) · Google Search Console · Google Business Profile · reCAPTCHA v3 / Cloudflare Turnstile · Microsoft Clarity · legal pages.

### Strongly recommended
Meta Pixel + Conversions API · Google Tag Manager · Google Ads conversion tag · push leads into your CRM · WhatsApp Business API auto-reply · Calendly / Cal.com · own AI chatbot · Google Reviews widget · Instagram feed.

### Later
Razorpay payment links · newsletter (Brevo/Mailchimp) · live chat · Telugu/Hindi (next-intl) · client portal (Supabase Auth).

## 7. SEO, performance & launch checklist

**SEO:** unique title (<60 chars) and description (<155) per page · one H1 per page · clean URLs · sitemap.xml + robots.txt · JSON-LD (Organization, LocalBusiness, Service, FAQPage, BreadcrumbList, Article) · Open Graph images · internal links · Hyderabad/Telangana keywords · 2–4 blog posts a month · canonical tags.

**Performance:** next/image and next/font · images <200KB (hero <150KB) · Lighthouse 90+ on mobile · no heavy sliders or autoplay video.

**Pre-launch:** test on Android Chrome, iPhone Safari, desktop · submit every form (Supabase + email + auto-reply) · check every WhatsApp button · no 404s, custom 404 page · favicon, logo, OG image · analytics events firing · HTTPS and www redirect · proofread phone numbers · submit sitemap · update Google profile and social bios.

## 8. Content to collect
- [ ] Logo files (SVG + PNG, light and dark) and favicon
- [ ] Company details: legal name, address, phone, WhatsApp, emails, GST/Udyam, office hours
- [ ] Final homepage headline + tagline
- [ ] Detailed content for top 10 service pages (CRM, Website, App, WhatsApp API, AI Chatbot, LMS, HRMS, E-commerce, Meta Ads, SEO)
- [ ] 5–8 portfolio projects with screenshots and results
- [ ] Client logos (with permission)
- [ ] 5+ testimonials
- [ ] Real stats: projects, clients, years, industries
- [ ] Founder, team and office photos
- [ ] Product screenshots (LTS BizOS, WhatsApp CRM)
- [ ] Package inclusions and "Starting from" prices
- [ ] FAQs
- [ ] Social links
- [ ] Privacy policy, terms, refund policy
- [ ] 3–5 launch blog posts

## 9. Roadmap
| Week | Focus |
| --- | --- |
| 1 | Plan & content; buy domain; GitHub/Vercel/Supabase/email |
| 2 | Wireframes & design system ✅ (done on the design canvas) |
| 3 | UI design ✅ homepage done; service template next |
| 4 | Build core: Next.js setup, tokens, Header/Footer, Home, Services hub, service template |
| 5 | Build remaining: Industries, Packages, Portfolio, About, Contact, Quote form, Blog, legal |
| 6 | Connect, test & launch |

**If time is short, launch with:** Home, Services hub, 6 category pages, top 10 service pages, Portfolio, About, Contact/Quote, legal pages.
