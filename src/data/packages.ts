/**
 * Ready packages (source: docs/01-services-catalogue.md §8).
 * The 8 package names and their core items come from the catalogue. The three tiers
 * (Basic / Growth / Premium) and ALL prices and tier differences are [bracketed] placeholders —
 * the catalogue doesn't define them. Confirm before launch.
 */
export type Package = { slug: string; tab: string; name: string; for: string; includes: string[] };

export const packages: Package[] = [
  { slug: "startup-launch-kit", tab: "Startup", name: "Startup Launch Kit", for: "New businesses getting online for the first time", includes: ["Logo", "Website", "Google Business Profile", "Social media setup"] },
  { slug: "business-growth-pack", tab: "Growth", name: "Business Growth Pack", for: "Businesses ready to bring in more leads", includes: ["Website", "CRM", "WhatsApp Business API", "Meta Ads management"] },
  { slug: "clinic-doctor-digital-pack", tab: "Clinic", name: "Clinic / Doctor Digital Pack", for: "Clinics, hospitals and doctors", includes: ["Website", "Appointment booking", "WhatsApp bot", "Google reviews"] },
  { slug: "institute-digital-pack", tab: "Institute", name: "Institute Digital Pack", for: "Schools, colleges and coaching centres", includes: ["Website", "LMS", "Admissions CRM", "Ads"] },
  { slug: "ecommerce-starter-pack", tab: "E-commerce", name: "E-commerce Starter Pack", for: "Brands starting to sell online", includes: ["Online store", "Payments", "Shipping", "Instagram shop"] },
  { slug: "ai-automation-pack", tab: "AI", name: "AI Automation Pack", for: "Teams that want to save time with AI", includes: ["WhatsApp AI bot", "Lead automation", "CRM"] },
  { slug: "election-campaign-pack", tab: "Election", name: "Election Campaign Pack", for: "Candidates and political teams", includes: ["Candidate website", "WhatsApp outreach", "Social media", "Ads"] },
  { slug: "monthly-care-plan", tab: "Care plan", name: "Monthly Care Plan", for: "Anyone who wants hands-off upkeep", includes: ["Hosting", "Maintenance", "SEO", "Reports"] },
];

export const tiers = [
  { key: "basic", name: "Basic", price: "₹[PRICE]", note: "The core package, as listed.", popular: false },
  { key: "growth", name: "Growth", price: "₹[PRICE]", note: "[More pages, features or channels — confirm]", popular: true },
  { key: "premium", name: "Premium", price: "₹[PRICE]", note: "[Full scope with priority support — confirm]", popular: false },
] as const;

/** Extra comparison rows — values are placeholders until tiers are defined */
export const compareExtras: { label: string; values: [string, string, string] }[] = [
  { label: "Delivery time", values: ["[0 weeks]", "[0 weeks]", "[0 weeks]"] },
  { label: "Revision rounds", values: ["[0]", "[0]", "[0]"] },
  { label: "Free support after launch", values: ["[0 months]", "[0 months]", "[0 months]"] },
  { label: "Team training", values: ["—", "[Yes]", "[Yes]"] },
];

export const packageFaqs = [
  { q: "Can I customise a package?", a: "Yes. Every package is a starting point. Tell us what to add or remove and we'll send a revised quote." },
  { q: "Is GST included in the prices?", a: "[Prices shown are before GST — confirm.]" },
  { q: "How do payments work?", a: "[Phased payments tied to milestones, e.g. 40% to start, 40% at design approval, 20% at launch — confirm.]" },
  { q: "What happens after the free support period?", a: "You can move to a Monthly Care Plan or an Annual Maintenance Contract for updates, fixes and backups." },
  { q: "Can I upgrade later?", a: "Yes. You can move from Basic to Growth or Premium and we'll credit what you've already paid for. [confirm]" },
];
