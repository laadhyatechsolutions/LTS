import type { LucideIcon } from "lucide-react";
import { Palette } from "lucide-react";
import { serviceCategories } from "@/data/services";

/**
 * Services hub content (source: docs/01-services-catalogue.md).
 * Key services per category, each with a one-line description for its card.
 */
export type HubService = { name: string; line: string };

/** URL slug for a service name, e.g. "Hospital & Clinic Management" → "hospital-clinic-management" */
export function serviceSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getCategory(slug: string) {
  return hubCategories.find((c) => c.slug === slug);
}

export function getService(categorySlug: string, slug: string) {
  const category = getCategory(categorySlug);
  const service = category?.services.find((s) => serviceSlug(s.name) === slug);
  return category && service ? { category, service } : undefined;
}

export type HubCategory = {
  slug: string;
  /** Short label for the sticky tab bar */
  tab: string;
  name: string;
  intro: string;
  icon: LucideIcon;
  /** Where "Explore all" goes */
  href: string;
  services: HubService[];
};

const byCategory: Record<string, HubService[]> = {
  "website-development": [
    { name: "Business Websites", line: "Professional multi-page sites for businesses and startups." },
    { name: "Landing Pages", line: "High-converting single pages for ads, launches and lead capture." },
    { name: "E-commerce Stores", line: "Full online store with cart, payments and order management." },
    { name: "Shopify & WooCommerce", line: "Store setup and customisation on the platform you prefer." },
    { name: "Multi-vendor Marketplaces", line: "Amazon/Swiggy-style platforms with vendor panels." },
    { name: "Custom Web Applications", line: "Dashboards, portals and tools built to your workflow." },
    { name: "Booking & Appointment Systems", line: "For clinics, salons, consultants and service businesses." },
    { name: "Website Care & AMC", line: "Speed, security, backups and monthly maintenance." },
  ],
  "mobile-app-development": [
    { name: "Android & iOS Apps", line: "Native apps for Play Store and App Store." },
    { name: "Cross-platform Apps", line: "Flutter / React Native — one codebase, lower cost." },
    { name: "Delivery & On-demand Apps", line: "Grocery, food, pharmacy and home-service apps." },
    { name: "Field Employee Tracking Apps", line: "GPS attendance, visit logs and route tracking." },
    { name: "Healthcare & Doctor Apps", line: "Appointments, teleconsultation and patient records." },
    { name: "E-learning Apps", line: "Courses, live classes and tests." },
    { name: "App Store Publishing", line: "Listing, screenshots and approval support." },
    { name: "App Maintenance & Modernisation", line: "Updates, bug fixes and rebuilds of old or slow apps." },
  ],
  "custom-software": [
    { name: "CRM", line: "Leads, follow-ups, sales pipeline and WhatsApp/email integration." },
    { name: "LMS", line: "Courses, video lessons, quizzes, certificates and student portal." },
    { name: "HRMS & Payroll", line: "Attendance, leave, payroll, self-service and appraisals." },
    { name: "ERP Solutions", line: "Purchase, sales, inventory, accounts and production in one system." },
    { name: "Billing, Invoicing & GST", line: "Accounting-ready billing for Indian businesses." },
    { name: "Hospital & Clinic Management", line: "OPD, IPD, billing, pharmacy and lab." },
    { name: "SaaS & MVP Development", line: "From idea to MVP to a scalable multi-tenant product." },
    { name: "LTS BizOS", line: "One software to run an entire company — our own product." },
  ],
  "ai-solutions": [
    { name: "AI Website Chatbots", line: "Answer visitor questions and capture leads around the clock." },
    { name: "WhatsApp AI Chatbots", line: "Automated replies, enquiries, bookings and orders." },
    { name: "AI Voice Agents", line: "Inbound call answering and outbound follow-up calls." },
    { name: "AI Receptionist", line: "Answers calls, books appointments and routes to staff." },
    { name: "AI Knowledge Base (RAG)", line: "Chat with your documents, SOPs and manuals." },
    { name: "AI Document Processing", line: "Read invoices, bills and forms and extract the data." },
    { name: "AI Agents", line: "Multi-step agents that complete tasks across your tools." },
    { name: "AI Consulting & Audit", line: "Find where AI saves the most time and money." },
  ],
  automation: [
    { name: "WhatsApp Business API Setup", line: "Official verified account and green tick application." },
    { name: "WhatsApp Broadcast Campaigns", line: "Approved templates and bulk messaging." },
    { name: "Shared Team Inbox", line: "Your whole team on one WhatsApp number." },
    { name: "Lead Automation", line: "Ads, forms and portals into your CRM with an instant reply." },
    { name: "Follow-up & Reminder Flows", line: "Sales follow-ups, invoices, payments and appointments." },
    { name: "Automated Reports", line: "Daily or weekly MIS to email or WhatsApp." },
    { name: "Zapier / Make / n8n Setup", line: "Connect your tools without writing code." },
    { name: "API & Payment Integrations", line: "Razorpay, Tally, Zoho, couriers and any third-party API." },
  ],
  "digital-marketing": [
    { name: "SEO & Local SEO", line: "Rank on Google and on Maps “near me” searches." },
    { name: "AI Search Optimisation", line: "Get recommended in ChatGPT, Gemini and Google AI Overviews." },
    { name: "Meta Ads", line: "Lead generation, sales and awareness on Facebook and Instagram." },
    { name: "Google Ads", line: "Search, Display, Performance Max and YouTube." },
    { name: "Social Media Management", line: "Content calendar, posts, reels and community replies." },
    { name: "Email & WhatsApp Marketing", line: "Campaigns, offers and reminders that bring customers back." },
    { name: "Reputation Management", line: "More Google reviews and better replies to them." },
    { name: "Political Campaign Marketing", line: "Candidate websites, WhatsApp outreach, social media and ads." },
  ],
};

const more: HubCategory = {
  slug: "more-services",
  tab: "More",
  name: "Design, Cloud & More",
  intro: "Branding, hosting, support and consulting to round out your digital setup.",
  icon: Palette,
  href: "/services/more-services",
  services: [
    { name: "UI/UX Design", line: "Wireframes, prototypes and design systems in Figma." },
    { name: "Logo & Brand Identity", line: "Logo, colours, typography and brand guidelines." },
    { name: "Explainer Videos & Motion", line: "Short videos that explain what you do." },
    { name: "Cloud Hosting & DevOps", line: "AWS, Vercel, Google Cloud, Supabase and CI/CD." },
    { name: "Security Audit & Backup", line: "Find the gaps, then protect your data." },
    { name: "Dedicated Developers", line: "Hire LTS developers monthly." },
    { name: "IT Consulting & CTO-as-a-Service", line: "A tech partner for founders without a tech co-founder." },
    { name: "Corporate Training", line: "AI tools, digital marketing and CRM usage for your team." },
  ],
};

const tabLabels: Record<string, string> = {
  "mobile-app-development": "Apps",
  "custom-software": "Software",
  "digital-marketing": "Marketing",
};

export const hubCategories: HubCategory[] = [
  ...serviceCategories.map((c) => ({
    slug: c.slug,
    tab: tabLabels[c.slug] ?? c.shortName,
    name: c.name,
    intro: c.line,
    icon: c.icon,
    href: `/services/${c.slug}`,
    services: byCategory[c.slug] ?? [],
  })),
  more,
];
