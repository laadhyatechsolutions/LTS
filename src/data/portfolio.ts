/**
 * Portfolio case studies. NO real projects have been supplied yet, so every entry is a
 * [bracketed] placeholder. Replace each with a real project (and add screenshots) before launch.
 * `category` must be a slug from src/data/services-hub.ts; `industry` should match allIndustries.
 */
export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  tech: string[];
  quote: { text: string; by: string };
};

const base = {
  summary: "[One line: the problem and what LTS built.]",
  challenge: "[What the client struggled with before — slow process, few leads, manual work.]",
  solution: "[What LTS designed and built, and how it fits the client's workflow.]",
  quote: { text: "[Client testimonial]", by: "[Name, role, company]" },
};

export const caseStudies: CaseStudy[] = [
  { ...base, slug: "project-1", client: "[Client 1]", title: "[Client 1] — [clinic website and booking]", category: "website-development", industry: "Healthcare", results: ["[+00% enquiries]", "[00 days to launch]"], tech: ["Next.js", "Supabase"] },
  { ...base, slug: "project-2", client: "[Client 2]", title: "[Client 2] — [admissions CRM]", category: "custom-software", industry: "Education", results: ["[00 hrs saved per week]", "[+00% admissions]"], tech: ["Node.js", "PostgreSQL"] },
  { ...base, slug: "project-3", client: "[Client 3]", title: "[Client 3] — [WhatsApp AI bot]", category: "ai-solutions", industry: "Real Estate & Coworking", results: ["[00% faster replies]", "[+00% site visits]"], tech: ["OpenAI", "WhatsApp Business API"] },
  { ...base, slug: "project-4", client: "[Client 4]", title: "[Client 4] — [delivery app]", category: "mobile-app-development", industry: "Retail & E-commerce", results: ["[00,000 downloads]", "[+00% repeat orders]"], tech: ["Flutter", "Firebase"] },
  { ...base, slug: "project-5", client: "[Client 5]", title: "[Client 5] — [lead automation]", category: "automation", industry: "Manufacturing & Trading", results: ["[00 hrs saved per week]", "[00% faster follow-up]"], tech: ["n8n", "WhatsApp Business API"] },
  { ...base, slug: "project-6", client: "[Client 6]", title: "[Client 6] — [Meta and Google Ads]", category: "digital-marketing", industry: "Professional Services", results: ["[+00% leads]", "[−00% cost per lead]"], tech: ["Meta Ads", "Google Ads", "GA4"] },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
