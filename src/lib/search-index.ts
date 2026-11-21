import { hubCategories, serviceSlug } from "@/data/services-hub";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/portfolio";
import { posts } from "@/data/blog";
import { productList } from "@/data/products";
import { packages } from "@/data/packages";
import { checklists } from "@/data/checklists";

export type SearchGroup = "Pages" | "Services" | "Industries" | "Products" | "Packages" | "Work" | "Blog";
export type SearchItem = { title: string; href: string; group: SearchGroup; hint: string; keywords: string };

/**
 * Everything the site search can find, built on the server from the same data as the pages
 * (so new services, industries or posts are searchable automatically).
 */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [
    { title: "Get a free quote", href: "/get-quote", group: "Pages", hint: "Tell us about your project", keywords: "price cost quotation estimate enquiry" },
    { title: "Cost estimator", href: "/cost-estimator", group: "Pages", hint: "See a typical price range", keywords: "price cost budget calculator how much" },
    { title: "Free AI audit", href: "/free-ai-audit", group: "Pages", hint: "15-minute call, no obligation", keywords: "ai automation consultation free call" },
    { title: "Contact us", href: "/contact", group: "Pages", hint: "Call, WhatsApp or message", keywords: "phone email address office whatsapp" },
    { title: "About LTS", href: "/about", group: "Pages", hint: "Who we are", keywords: "company team founder story capture media" },
    { title: "Careers", href: "/careers", group: "Pages", hint: "Jobs and internships", keywords: "job hiring internship apply work" },
    { title: "All services", href: "/services", group: "Pages", hint: "Everything we do", keywords: "services" },
    { title: "All industries", href: "/industries", group: "Pages", hint: "Solutions by sector", keywords: "industries sectors" },
    { title: "Portfolio", href: "/portfolio", group: "Pages", hint: "Our work", keywords: "case studies projects clients work" },
    { title: "Blog", href: "/blog", group: "Pages", hint: "Guides and articles", keywords: "articles guides tips" },
    { title: "Privacy policy", href: "/privacy-policy", group: "Pages", hint: "Legal", keywords: "privacy data legal" },
    { title: "Terms", href: "/terms", group: "Pages", hint: "Legal", keywords: "terms conditions legal" },
    { title: "Refund policy", href: "/refund-policy", group: "Pages", hint: "Legal", keywords: "refund cancellation legal" },
  ];
  for (const c of hubCategories) {
    items.push({ title: c.name, href: c.href, group: "Services", hint: c.intro, keywords: c.tab });
    for (const s of c.services) {
      items.push({ title: s.name, href: `${c.href}/${serviceSlug(s.name)}`, group: "Services", hint: s.line, keywords: c.name });
    }
  }
  for (const i of industries) {
    items.push({ title: i.name, href: `/industries/${i.slug}`, group: "Industries", hint: i.headline, keywords: `${i.who} ${i.modules.join(" ")}` });
  }
  for (const [slug, c] of Object.entries(checklists)) {
    items.push({ title: c.title, href: `/checklists/${slug}`, group: "Pages", hint: "Free checklist", keywords: "checklist guide download free template tips" });
  }
  for (const p of productList) {
    items.push({ title: p.name, href: `/products#${p.slug}`, group: "Products", hint: p.tagline, keywords: "product demo software" });
  }
  for (const p of packages) {
    items.push({ title: p.name, href: "/packages", group: "Packages", hint: p.for, keywords: p.includes.join(" ") });
  }
  for (const c of caseStudies) {
    items.push({ title: c.title, href: `/portfolio/${c.slug}`, group: "Work", hint: c.industry, keywords: c.industry });
  }
  for (const p of posts) {
    items.push({ title: p.title, href: `/blog/${p.slug}`, group: "Blog", hint: p.category, keywords: p.category });
  }
  // Hide placeholder entries (titles still in [brackets]) until real content replaces them
  return items.filter((i) => !i.title.startsWith("["));
}
