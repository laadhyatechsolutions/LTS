# LTS Design System (final, Nov 16 2026)

Approved on the "LTS Homepage Wireframe" design canvas, artboard **"Option A in colour — Lime"**.
This file overrides any colour or font guidance in older docs.

## Colours

| Role | Hex | Tailwind |
| --- | --- | --- |
| Main pop colour (buttons, highlight word, icon tiles) | #A3E635 | `lime-400` |
| Ink (hero, footer, text, outlines) | #111111 / #0A0A0A | `ink` / `ink-deep` |
| Accent (badges, 2nd stats card) | #A78BFA | `violet-400` |
| Purple button (white text) | #7C3AED | `violet-600` |
| Text links on white | #3F6212 | `lime-800` |
| Section background | #F6FAEF | `mist-50` |
| Pale bands, call-to-action band, placeholders | #E9F3DA | `mist-100` |
| Pale stats card | #DCEBC2 | `mist-200` |
| Light borders | #8DB956 | `mist-400` |
| Body text | #374151 / #4B5563 | `gray-700` / `gray-600` |
| WhatsApp | #25D366 | `whatsapp` |

**Rules**
- Black (ink) text on lime and on violet-400. Never white text on them.
- Bright lime in small doses only (buttons, highlights, icons) – under ~10% of the screen.
- Large areas: white, ink, or the pale `mist` tints (lime in big blocks caused eye strain).
- Never lime as text on white; use `lime-800` for links.
- Purple is the second accent, used sparingly.

## Typography

| Use | Font | Weights |
| --- | --- | --- |
| Headings, big numbers | **Yanone Kaffeesatz** | 700 (500 for softer headings) |
| Body, buttons, menus, forms, prices (₹) | **Inter** | 400, 600, 700 |

| Style | Desktop | Mobile | Line height |
| --- | --- | --- | --- |
| Hero heading (H1) | 78px | 50px | 0.98 |
| Section title (H2) | 56px | 40px | 1.02 |
| Card title (H3) | 25–34px | 24px | 1.1 |
| Stats numbers | 50px | 40px | 1 |
| Prices (Inter 700) | 28px | 24px | 1.1 |
| Lead text (Inter) | 19px | 17px | 1.6 |
| Body (Inter) | 17px | 16px | 1.65 |
| Buttons / menu (Inter 600) | 15px | 15px | 1 |
| Labels (Inter 600, uppercase, +8% spacing) | 13px | 12px | 1.2 |

Prices stay in Inter so the ₹ symbol always renders correctly.

## Shapes & components
- **Buttons:** pill (`rounded-full`), min height 48px (52px in hero). Primary on light = ink bg + white text, or lime bg + ink text + 2px ink border. Secondary = 2px ink outline, hover lime.
- **Cards:** white, `border-2 border-ink`, radius 18px, padding 24px.
- **Icon tiles:** 48px, radius 14px, lime bg, 2px ink border.
- **Badges:** "Most popular" = violet-400 bg, ink text, 2px ink border, pill.
- **Section padding:** 88px desktop / 64px mobile. Container max 1240px, 32px side padding (20px mobile).
- **Grids:** 3–4 columns desktop, 2 tablet, 1 mobile; gap 24px.
- **Floating WhatsApp button:** 60px circle, bottom-right, every page.
- **Icons:** Lucide.
- **Motion:** subtle fade-up on scroll, hover lift on cards; nothing heavy.

## Tailwind tokens

The project uses Tailwind CSS 4, so the tokens live in `src/app/globals.css` (`@theme`). The equivalent v3-style config is shown below for reference.

```ts
// tailwind.config.ts – theme.extend
colors: {
  ink: { DEFAULT: '#111111', deep: '#0A0A0A' },
  mist: { 50: '#F6FAEF', 100: '#E9F3DA', 200: '#DCEBC2', 400: '#8DB956' },
  whatsapp: '#25D366',
  // lime and violet are built into Tailwind
},
fontFamily: {
  display: ['var(--font-display)', 'sans-serif'],
  sans: ['var(--font-sans)', 'sans-serif'],
},
borderRadius: { card: '18px' },
```

## Next.js fonts

```tsx
import { Yanone_Kaffeesatz, Inter } from 'next/font/google';
const display = Yanone_Kaffeesatz({ subsets: ['latin'], weight: ['500', '700'], display: 'swap', variable: '--font-display' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'], display: 'swap', variable: '--font-sans' });
```
