# Adding your photos

Every image spot on the site is a **slot**. To fill one, save your photo in `public/` under the file name below. You don't need to change any code. The dashed placeholder box is replaced automatically.

- **Formats:** `.webp`, `.jpg`, `.jpeg`, `.png`, `.avif` or `.svg`. Use the name below with any of these extensions.
- **Showing it:** in `npm run dev` the photo appears after a page refresh. On the live site it appears after the next build or deploy.
- **Finding slots:** in dev mode each empty slot shows its own file name under the label (for example `public/team/founder.jpg`).
- **Photo size:** the photo is cropped to fill its box, so keep the subject in the centre. Export at about **2× the size listed** and under **400 KB**. [Squoosh](https://squoosh.app) is free and works well.

## Company and team

| Where | File | Shape / size |
|---|---|---|
| About → founder | `public/team/founder.jpg` | Portrait 4:5, 900×1125 |
| About → team (1–4) | `public/team/member-1.jpg` … `member-4.jpg` | Square, 600×600 |
| Home → "Why LTS" (desktop only) | `public/team/office.jpg` | Landscape, 1200×600 |

## Proof

| Where | File | Shape / size |
|---|---|---|
| Home → client logo strip (1–6) | `public/clients/client-1.svg` … `client-6.svg` | Logo; SVG or transparent PNG. Shown in grey until you hover. Put the real names in `src/data/home.ts` → `clientLogos` |
| Home → Google rating badge | `public/badges/google-rating.png` | 448×128, transparent |
| Home → testimonial faces (1–3) | `public/testimonials/person-1.jpg` … `person-3.jpg` | Square, 200×200 |

## Work

| Where | File | Shape / size |
|---|---|---|
| Home → "Recent projects" (1–3) | `public/portfolio/project-1.jpg` … `project-3.jpg` | Landscape, 1200×630 |
| Portfolio grid and project page | `public/portfolio/<project-slug>.jpg` (e.g. `project-1.jpg`) | Landscape, 1600×900 |

Project slugs are in `src/data/portfolio.ts`. If you rename a slug, rename the photo to match.

## Products

| Where | File | Shape / size |
|---|---|---|
| Home and Products page → BizOS | `public/products/bizos.png` | Screenshot 4:3, 1600×1200 |
| Home and Products page → WhatsApp CRM | `public/products/whatsapp-crm.png` | Screenshot 4:3, 1600×1200 |

## Blog covers

| Article | File |
|---|---|
| Why every clinic needs WhatsApp booking | `public/blog/why-clinics-need-whatsapp-booking.jpg` |
| How much does a business website cost | `public/blog/how-much-does-a-business-website-cost.jpg` |
| CRM vs Excel | `public/blog/crm-vs-excel-when-to-switch.jpg` |
| Local SEO checklist for Hyderabad | `public/blog/local-seo-checklist-for-hyderabad-businesses.jpg` |

Use landscape images at 1600×700. New posts follow the same pattern: `public/blog/<post-slug>.jpg`.

## Photos already in place (replace any time)

These already show stock photos. To use your own, overwrite each file with the **same name, as a .jpg**. Then update or delete the matching `CREDITS.md` line.

| Where | Files |
|---|---|
| Service categories (home, services, category pages) | `public/services/<category>.jpg`, 3:2, 1800×1200 |
| Industries (home, industries, industry pages) | `public/industries/<industry>.jpg`, 3:2, 1800×1200 |
| Logo | `public/logo.png` |
| Social share preview | `src/app/opengraph-image.png`, 1200×630 |
