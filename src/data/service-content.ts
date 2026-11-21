/**
 * Per-category copy for category and service pages (source: docs/01-services-catalogue.md).
 * Values in [brackets] are placeholders to confirm before launch.
 */
export type CategoryContent = {
  promise: string;
  whoFor: string[];
  tech: string[];
  priceFrom: string;
  faqs: { q: string; a: string }[];
};

export const categoryContent: Record<string, CategoryContent> = {
  "website-development": {
    promise: "Fast, mobile-first websites that look premium and bring in leads.",
    whoFor: ["Businesses and startups going online", "Shops selling products online", "Doctors, consultants and creators building a brand", "Companies with an old, slow website"],
    tech: ["Next.js", "React", "Node.js", "Tailwind CSS", "Supabase", "PostgreSQL", "WordPress", "Shopify", "Vercel"],
    priceFrom: "₹[PRICE]",
    faqs: [
      { q: "How long does a website take?", a: "A business website usually takes [0–0] weeks. You get a timeline with milestones before we start. [confirm]" },
      { q: "Will my website work on mobile?", a: "Yes. Every site is built mobile-first and tested on real phones." },
      { q: "Can you redesign my existing website?", a: "Yes. We modernise old sites and move them without losing data or Google rankings." },
    ],
  },
  "mobile-app-development": {
    promise: "Android and iOS apps your customers and teams actually use.",
    whoFor: ["Businesses launching a customer app", "Teams that need field or internal apps", "Startups building an MVP", "Companies with an outdated app"],
    tech: ["Flutter", "React Native", "Node.js", "Supabase", "Firebase", "PostgreSQL"],
    priceFrom: "₹[PRICE]",
    faqs: [
      { q: "Android, iOS or both?", a: "Most clients choose a cross-platform app: one codebase for both, at lower cost. We'll advise on what suits you." },
      { q: "Do you publish the app for us?", a: "Yes. We handle listing, screenshots and approval on Play Store and App Store." },
      { q: "Can the app work offline?", a: "Yes, offline mode, push notifications, payments and maps are available as add-ons." },
    ],
  },
  "custom-software": {
    promise: "Software built around how your company works — not the other way round.",
    whoFor: ["Companies running on Excel and WhatsApp", "Clinics, schools and real estate firms", "Startups building a SaaS product", "Growing teams outgrowing off-the-shelf tools"],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "React", "WhatsApp Business API"],
    priceFrom: "₹[PRICE]",
    faqs: [
      { q: "Ready-made or fully custom?", a: "Both. We customise proven modules to cut cost and time, or build from scratch when your process is unique." },
      { q: "Can you move our Excel data in?", a: "Yes. We migrate your existing data into the new system." },
      { q: "Will I own the source code?", a: "Yes — once the project is paid for, the code is yours. [confirm]" },
    ],
  },
  "ai-solutions": {
    promise: "Put AI to work on sales, support and operations — 24/7.",
    whoFor: ["Businesses missing leads after hours", "Support teams answering the same questions", "Teams buried in documents and data entry", "Owners curious where AI saves money"],
    tech: ["OpenAI", "Claude", "Gemini", "LangChain", "Vector databases", "WhatsApp Business API"],
    priceFrom: "₹[PRICE]",
    faqs: [
      { q: "Will the bot know my business?", a: "Yes. We train it on your FAQs, documents and policies, so answers match how you work." },
      { q: "Does it speak Telugu and Hindi?", a: "Yes. Bots can reply in English, Telugu, Hindi, Tamil and more." },
      { q: "Can a human take over?", a: "Yes. Hard questions can be handed to your team at any point." },
    ],
  },
  automation: {
    promise: "Stop doing the same work twice. Automate it.",
    whoFor: ["Teams copying data between tools", "Sales teams chasing leads manually", "Businesses sending bulk WhatsApp messages", "Finance teams sending payment reminders"],
    tech: ["WhatsApp Business API", "Zapier", "Make", "n8n", "Google Workspace", "Razorpay"],
    priceFrom: "₹[PRICE]",
    faqs: [
      { q: "Do I need the official WhatsApp API?", a: "For bulk messages, bots and team inbox, yes. We handle the setup and green tick application." },
      { q: "Can you connect our existing tools?", a: "Almost always. If a tool has an API or export, we can connect it." },
      { q: "What if a flow breaks?", a: "We monitor flows and fix issues under a support plan. [confirm]" },
    ],
  },
  "digital-marketing": {
    promise: "More visibility, more leads, more sales — delivered with our sister agency Capture Media.",
    whoFor: ["New businesses needing their first customers", "Clinics and shops wanting local reach", "Brands running ads without clear results", "Founders and public figures building a profile"],
    tech: ["Meta Ads", "Google Ads", "GA4", "Google Tag Manager", "Looker Studio", "WhatsApp Business API"],
    priceFrom: "₹[PRICE] / month",
    faqs: [
      { q: "Do you share monthly reports?", a: "Yes. You get a clear monthly report on leads, spend and results." },
      { q: "Is the ad budget included?", a: "No. Ad spend is paid directly to Meta or Google; our fee covers management. [confirm]" },
      { q: "Who does the work?", a: "Our team works with Capture Media, our sister agency, on creative and campaigns." },
    ],
  },
  "more-services": {
    promise: "Branding, hosting, support and consulting to round out your digital setup.",
    whoFor: ["Businesses needing a brand before a website", "Teams without in-house IT", "Founders without a tech co-founder", "Companies wanting to train staff"],
    tech: ["Figma", "AWS", "Vercel", "Google Cloud", "Supabase", "GitHub Actions"],
    priceFrom: "₹[PRICE]",
    faqs: [
      { q: "Can I hire a developer for a month?", a: "Yes. Dedicated developers are available on monthly plans. [confirm]" },
      { q: "Do you offer maintenance after launch?", a: "Yes, Annual Maintenance Contracts cover updates, fixes and backups." },
      { q: "Can you audit what we already have?", a: "Yes. A technology or security audit shows risks, costs and what to fix first." },
    ],
  },
};
