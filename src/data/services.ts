import type { LucideIcon } from "lucide-react";
import { Bot, Globe, LayoutDashboard, Megaphone, Smartphone, Workflow } from "lucide-react";

/**
 * Service categories (source: docs/01-services-catalogue.md).
 * The full list of individual services is added when the service pages are built.
 */
export type ServiceCategory = {
  slug: string;
  name: string;
  shortName: string;
  line: string;
  icon: LucideIcon;
  highlights: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "website-development",
    name: "Website Development",
    shortName: "Websites",
    line: "Fast, mobile-first websites and online stores that bring in leads.",
    icon: Globe,
    highlights: ["Business websites", "E-commerce stores", "Landing pages", "Web apps & PWAs"],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
    shortName: "Mobile Apps",
    line: "Android and iOS apps your customers and teams actually use.",
    icon: Smartphone,
    highlights: ["Android & iOS apps", "Flutter / React Native", "Delivery & booking apps", "Field tracking apps"],
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    shortName: "Custom Software",
    line: "Software built around how your company works.",
    icon: LayoutDashboard,
    highlights: ["CRM", "LMS", "HRMS & payroll", "ERP & billing"],
  },
  {
    slug: "ai-solutions",
    name: "AI Bots & AI Solutions",
    shortName: "AI Solutions",
    line: "Put AI to work on sales, support and operations — 24/7.",
    icon: Bot,
    highlights: ["Website chatbots", "WhatsApp AI bots", "AI voice agents", "Custom AI assistants"],
  },
  {
    slug: "automation",
    name: "Automation & Integrations",
    shortName: "Automation",
    line: "Stop doing the same work twice. Automate it.",
    icon: Workflow,
    highlights: ["WhatsApp Business API", "Lead automation", "Payment & reminder flows", "API integrations"],
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    shortName: "Digital Marketing",
    line: "More visibility, leads and sales — with Capture Media.",
    icon: Megaphone,
    highlights: ["SEO & Google Business", "Meta & Google Ads", "Social media management", "WhatsApp marketing"],
  },
];

export const industries = [
  "Healthcare",
  "Education",
  "Real Estate & Coworking",
  "Retail & E-commerce",
  "Manufacturing & Trading",
] as const;
