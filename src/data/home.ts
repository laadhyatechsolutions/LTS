/**
 * Homepage content (source: docs/04-homepage-spec.md).
 * Anything in [brackets] is a placeholder — replace with real details before launch.
 */

export const heroStats = [
  { value: "[00]+", label: "Projects delivered", key: "stat.projects", tone: "lime" },
  { value: "[00]+", label: "Happy clients", key: "stat.clients", tone: "violet" },
  { value: "[00]+", label: "Years of experience", key: "stat.years", tone: "white" },
  { value: "[00]+", label: "Industries served", key: "stat.industries", tone: "mist" },
] as const;

export const clientLogos = ["Client 1", "Client 2", "Client 3", "Client 4", "Client 5", "Client 6"];

export const whyPoints = [
  { title: "Development + marketing", text: "Build and promotion handled in one place." },
  { title: "Hyderabad-based team", text: "Meet in person, talk in your language." },
  { title: "Fixed timelines", text: "Clear phases, milestones and delivery dates." },
  { title: "Support after launch", text: "AMC plans for updates, fixes and backups." },
  { title: "AI-first", text: "Automation and AI built into what we deliver." },
  { title: "Transparent pricing", text: "Clear quotes, phased payments, no surprises." },
];

export const products = [
  {
    name: "LTS BizOS",
    text: "One software to run your entire company — CRM, HR, accounts and operations.",
    href: "/products#bizos",
  },
  {
    name: "WhatsApp CRM",
    text: "Manage leads, follow-ups and customers directly from WhatsApp.",
    href: "/products#whatsapp-crm",
  },
];

export const processSteps = [
  { title: "Discover", text: "We understand your business, goals and budget." },
  { title: "Design", text: "Wireframes and designs you approve before we build." },
  { title: "Build", text: "Development in phases with regular demos." },
  { title: "Launch", text: "Testing, go-live and team training." },
  { title: "Support", text: "Maintenance, updates and growth marketing." },
];

export const allIndustries = [
  "Healthcare",
  "Education",
  "Real Estate & Coworking",
  "Retail & E-commerce",
  "Manufacturing & Trading",
  "Restaurants & Hospitality",
  "Professional Services",
  "Startups & SMEs",
  "NGOs & Associations",
  "Politics & Public Figures",
];

export const caseStudies = [
  { tag: "[Industry] · [Service]", title: "[Client name] — [project]", text: "Problem → solution in one line.", result: "[Result, e.g. +00% leads]" },
  { tag: "[Industry] · [Service]", title: "[Client name] — [project]", text: "Problem → solution in one line.", result: "[Result, e.g. 00 hrs saved/week]" },
  { tag: "[Industry] · [Service]", title: "[Client name] — [project]", text: "Problem → solution in one line.", result: "[Result]" },
];

export const featuredPackages = [
  {
    name: "Startup Launch Kit",
    includes: ["Logo", "Website", "Google Business Profile", "Social media setup"],
    price: "₹[PRICE]",
    popular: false,
  },
  {
    name: "Business Growth Pack",
    includes: ["Website", "CRM", "WhatsApp Business API", "Meta Ads management"],
    price: "₹[PRICE]",
    popular: true,
  },
  {
    name: "AI Automation Pack",
    includes: ["WhatsApp AI bot", "Lead automation", "CRM"],
    price: "₹[PRICE]",
    popular: false,
  },
];

export const testimonials = [
  { quote: "[Client quote — 2 to 3 lines about the result they got.]", name: "[Name]", role: "[Role, Company]" },
  { quote: "[Client quote — 2 to 3 lines about the result they got.]", name: "[Name]", role: "[Role, Company]" },
  { quote: "[Client quote — 2 to 3 lines about the result they got.]", name: "[Name]", role: "[Role, Company]" },
];

export const techStack = [
  "Next.js",
  "React",
  "Node.js",
  "Flutter",
  "Supabase",
  "PostgreSQL",
  "Tailwind CSS",
  "OpenAI",
  "WhatsApp Business API",
  "Meta Ads",
  "Google Ads",
  "Vercel",
];

/** FAQ answers marked [confirm] state a business policy — check them before launch */
export const homeFaqs = [
  {
    q: "How much does a website or app cost?",
    a: "It depends on the pages, features and integrations you need. Share your requirements and we'll send a clear, fixed quote. Our ready packages start from ₹[PRICE].",
  },
  {
    q: "How long does a project take?",
    a: "A business website usually takes [0–0] weeks, and custom software or apps take [0–0] weeks depending on scope. You get a timeline with milestones before we start. [confirm]",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We offer Annual Maintenance Contracts (AMC) covering updates, fixes, backups and small changes, so your website or software keeps running smoothly.",
  },
  {
    q: "Will I own the source code?",
    a: "Yes — once the project is paid for, the code, design files and accounts are yours. [confirm]",
  },
  {
    q: "Can you work with my existing software?",
    a: "Yes. We can connect, upgrade or add features to your existing website, CRM, accounting software or apps through APIs and integrations.",
  },
  {
    q: "Do you also handle marketing after launch?",
    a: "Yes. Through our marketing partner Capture Media we handle SEO, Meta and Google Ads, social media and WhatsApp marketing.",
  },
];

/**
 * "Why choose LTS" comparison table on the homepage.
 * yes = included, part = sometimes / depends, no = usually not. Keep claims fair and general.
 */
export type CompareMark = "yes" | "part" | "no";
export const comparison = {
  columns: ["LTS", "Freelancer", "Typical agency"] as const,
  rows: [
    { label: "Websites, apps and custom software", cells: [["yes", "One team"], ["part", "Usually one skill"], ["yes", "Yes"]] },
    { label: "AI bots and automation", cells: [["yes", "Built in"], ["no", "Rarely"], ["part", "Sometimes"]] },
    { label: "Marketing after launch", cells: [["yes", "With Capture Media"], ["no", "Not usually"], ["part", "Separate team"]] },
    { label: "Fixed timeline and phased payments", cells: [["yes", "Every project"], ["part", "Varies"], ["yes", "Yes"]] },
    { label: "Support after launch", cells: [["yes", "AMC plans"], ["no", "Often unavailable"], ["part", "Extra cost"]] },
    { label: "Meet in person in Hyderabad", cells: [["yes", "Any time"], ["part", "Depends"], ["part", "Depends"]] },
    { label: "Price", cells: [["yes", "Clear, fixed quote"], ["part", "Low, but risky"], ["no", "Often high"]] },
  ] as { label: string; cells: [CompareMark, string][] }[],
};

/** Hero headline: "…grow your ___". Each word links to its industry page. */
export const heroWords = [
  { word: "business", href: "/industries" },
  { word: "clinic", href: "/industries/healthcare" },
  { word: "school", href: "/industries/education" },
  { word: "store", href: "/industries/retail-ecommerce" },
  { word: "restaurant", href: "/industries/restaurants-hospitality" },
  { word: "factory", href: "/industries/manufacturing-trading" },
  { word: "coworking", href: "/industries/real-estate-coworking" },
  { word: "practice", href: "/industries/professional-services" },
  { word: "startup", href: "/industries/startups-smes" },
  { word: "NGO", href: "/industries/ngos-associations" },
];

/** Hero "Get a quote for" chips — open the quote form with that service picked */
export const heroNeeds = [
  { label: "Website", key: "need.website", slug: "website-development" },
  { label: "Mobile app", key: "need.app", slug: "mobile-app-development" },
  { label: "Software", key: "need.software", slug: "custom-software" },
  { label: "AI bot", key: "need.ai", slug: "ai-solutions" },
  { label: "Automation", key: "need.automation", slug: "automation" },
  { label: "Marketing", key: "need.marketing", slug: "digital-marketing" },
];

export const heroTrust = [
  { label: "Hyderabad-based team", key: "trust.hyd" },
  { label: "Fixed, clear quotes", key: "trust.quotes" },
  { label: "Support after launch", key: "trust.support" },
];

/**
 * Personalised hero: when a visitor has looked at an industry page (or checklist), the homepage hero
 * switches to that industry. Keyed by industry slug.
 */
export const heroByIndustry: Record<string, { name: string; line: string; nudge: string }> = {
  healthcare: { name: "healthcare", line: "Booking, reminders and patient follow-ups on autopilot — so your clinic runs smoothly and patients stay.", nudge: "Running a clinic? Ask how clinics get more bookings on WhatsApp." },
  education: { name: "education", line: "Admission enquiries, parent updates and fee follow-ups handled automatically — so your staff can focus on students.", nudge: "Running a school or institute? Ask how others fill seats online." },
  "real-estate-coworking": { name: "real estate & coworking", line: "Every enquiry answered in minutes and tracked to a site visit — so no lead you paid for goes cold.", nudge: "In real estate or coworking? Ask how to reply to every lead in minutes." },
  "retail-ecommerce": { name: "retail & e-commerce", line: "A fast online store, WhatsApp ordering and inventory in sync — so you sell more with less effort.", nudge: "Selling online? Ask how to cut cart drop-offs." },
  "manufacturing-trading": { name: "manufacturing & trading", line: "Quotes, orders and follow-ups in one system — so enquiries turn into orders and payments arrive on time.", nudge: "In manufacturing or trading? Ask how to automate quotes and follow-ups." },
  "restaurants-hospitality": { name: "restaurants & hospitality", line: "Direct table and room bookings, WhatsApp ordering and review requests — so you depend less on aggregators.", nudge: "Run a restaurant or hotel? Ask how to get more direct bookings." },
  "professional-services": { name: "professional services", line: "A professional website, easy consultation booking and client reminders — so clients trust you from the first click.", nudge: "A consultant, CA or lawyer? Ask how to win more enquiries online." },
  "startups-smes": { name: "startups & SMEs", line: "The right website, CRM and automation for where you are today — without paying for what you don't need yet.", nudge: "Starting or growing a business? Ask what to set up first." },
  "ngos-associations": { name: "NGOs & associations", line: "Online donations, volunteer sign-ups and member records — so more of your time goes into your mission.", nudge: "Run an NGO or association? Ask how to simplify donations and members." },
  "politics-public-figures": { name: "public figures", line: "A clear online presence, supporter sign-ups and consent-based WhatsApp outreach — so people can reach you and hear from you.", nudge: "A public figure or campaign? Ask how to stay connected with supporters." },
};
