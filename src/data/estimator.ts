/**
 * Cost estimator data. ALL PRICES AND TIMELINES ARE PLACEHOLDERS (null).
 * Fill in real numbers in rupees, e.g. base: [25000, 45000], weeks: [2, 4], add: [8000, 15000].
 * While a value is null, the page shows a [bracketed] placeholder instead of a number.
 */
export type Range = [min: number, max: number] | null;

export type ProjectType = {
  slug: string;
  name: string;
  line: string;
  base: Range;
  weeks: Range;
  features: { name: string; add: Range }[];
};

export const projectTypes: ProjectType[] = [
  {
    slug: "website",
    name: "Business website",
    line: "5–10 pages, mobile-first, SEO-ready",
    base: null,
    weeks: null,
    features: [
      { name: "Online booking / appointments", add: null },
      { name: "Blog", add: null },
      { name: "WhatsApp chat + lead forms", add: null },
      { name: "Multi-language (Telugu / Hindi)", add: null },
      { name: "Copywriting by our team", add: null },
    ],
  },
  {
    slug: "ecommerce",
    name: "E-commerce store",
    line: "Catalogue, cart, UPI/card payments",
    base: null,
    weeks: null,
    features: [
      { name: "Courier & tracking integration", add: null },
      { name: "Coupons & loyalty", add: null },
      { name: "Abandoned-cart WhatsApp reminders", add: null },
      { name: "Inventory sync with billing/POS", add: null },
      { name: "Product photography", add: null },
    ],
  },
  {
    slug: "mobile-app",
    name: "Mobile app",
    line: "Android + iOS from one codebase",
    base: null,
    weeks: null,
    features: [
      { name: "User login & profiles", add: null },
      { name: "Payments", add: null },
      { name: "Push notifications", add: null },
      { name: "Admin dashboard", add: null },
      { name: "Maps & location", add: null },
    ],
  },
  {
    slug: "software",
    name: "Custom software / CRM",
    line: "Dashboards, workflows, roles",
    base: null,
    weeks: null,
    features: [
      { name: "Billing & GST invoices", add: null },
      { name: "Inventory", add: null },
      { name: "Reports & analytics", add: null },
      { name: "Mobile app for staff", add: null },
      { name: "Tally / Zoho sync", add: null },
    ],
  },
  {
    slug: "ai-bot",
    name: "AI / WhatsApp chatbot",
    line: "Answers questions, books, captures leads",
    base: null,
    weeks: null,
    features: [
      { name: "Trained on your documents & FAQs", add: null },
      { name: "Appointment / order booking", add: null },
      { name: "CRM hand-off to your team", add: null },
      { name: "Voice / call answering", add: null },
    ],
  },
  {
    slug: "automation",
    name: "Automation",
    line: "Connect tools, cut manual work",
    base: null,
    weeks: null,
    features: [
      { name: "Lead capture → CRM", add: null },
      { name: "Payment & follow-up reminders", add: null },
      { name: "Daily reports to WhatsApp/email", add: null },
      { name: "Document data extraction (AI)", add: null },
    ],
  },
];

/** Fast-track delivery adds this share to the price and shortens the timeline — [confirm these %] */
export const fastTrack = { pricePct: 25, timePct: -30 };
