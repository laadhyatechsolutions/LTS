/**
 * Blog posts. NO real articles exist yet, so these four are placeholders: titles and
 * categories are drafts and every body paragraph is a [bracketed] note on what to write.
 * Replace with real articles (or move to MDX) before launch. Dates are sample dates.
 */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  author: string;
  readMinutes: number;
  sections: { id: string; heading: string; paragraphs: string[] }[];
  /** Optional industry slug (data/industries.ts) for a "free checklist" link under the article */
  industry?: string;
};

export const blogCategories = ["Websites", "AI & Automation", "Software", "Digital Marketing"] as const;

/** Which service category each blog category links to ("Services related to this article") */
export const categoryService: Record<string, { slug: string; cta: string }> = {
  Websites: { slug: "website-development", cta: "Website development" },
  "AI & Automation": { slug: "ai-solutions", cta: "AI bots & AI solutions" },
  Software: { slug: "custom-software", cta: "Custom software" },
  "Digital Marketing": { slug: "digital-marketing", cta: "Digital marketing" },
};

const body = (topic: string) => [
  { id: "overview", heading: "The problem", paragraphs: [`[2–3 short paragraphs: why ${topic} matters to a business owner, in plain words.]`] },
  { id: "what-to-do", heading: "What to do about it", paragraphs: ["[Practical steps the reader can follow, with a short example from a real project.]"] },
  { id: "mistakes", heading: "Common mistakes", paragraphs: ["[3–4 mistakes we see, each with a one-line fix.]"] },
  { id: "next-steps", heading: "Where to start", paragraphs: ["[A clear first step, and how LTS can help.]"] },
];

export const posts: Post[] = [
  { slug: "why-clinics-need-whatsapp-booking", title: "Why every clinic needs WhatsApp appointment booking", excerpt: "[One-line summary of the article.]", category: "AI & Automation", date: "2026-11-16", author: "LTS Team", readMinutes: 5, industry: "healthcare", sections: body("appointment booking on WhatsApp") },
  { slug: "how-much-does-a-business-website-cost", title: "How much does a business website cost in India?", excerpt: "[One-line summary of the article.]", category: "Websites", date: "2026-11-09", author: "LTS Team", readMinutes: 6, sections: body("website pricing") },
  { slug: "crm-vs-excel-when-to-switch", title: "CRM vs Excel: when is it time to switch?", excerpt: "[One-line summary of the article.]", category: "Software", date: "2026-11-02", author: "LTS Team", readMinutes: 5, sections: body("moving from Excel to a CRM") },
  { slug: "local-seo-checklist-for-hyderabad-businesses", title: "A local SEO checklist for Hyderabad businesses", excerpt: "[One-line summary of the article.]", category: "Digital Marketing", date: "2026-10-26", author: "LTS Team", readMinutes: 7, sections: body("local SEO") },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
