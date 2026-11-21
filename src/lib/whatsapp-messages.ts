import { hubCategories, serviceSlug } from "@/data/services-hub";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/portfolio";
import { posts } from "@/data/blog";

export const DEFAULT_WHATSAPP_MESSAGE = "Hi LTS, I'd like to know more about your services.";

/**
 * Pre-filled WhatsApp message for each page, so your team knows what the visitor
 * was looking at before they reply. Built on the server from the same data as the pages.
 */
export function whatsappMessagesByPath(): Record<string, string> {
  const m: Record<string, string> = {
    "/services": "Hi LTS, I'm looking at your services and would like some advice on what I need.",
    "/packages": "Hi LTS, I'd like to know more about your packages and pricing.",
    "/products": "Hi LTS, I'd like a demo of your products.",
    "/portfolio": "Hi LTS, I saw your work and would like to discuss a project.",
    "/industries": "Hi LTS, I'd like to know how you can help businesses like mine.",
    "/get-quote": "Hi LTS, I'd like a quote for my project.",
    "/about": "Hi LTS, I'd like to know more about your company.",
    "/careers": "Hi LTS, I'd like to apply for a job.",
    "/free-ai-audit": "Hi LTS, I'd like to book the free 15-minute AI audit.",
    "/cost-estimator": "Hi LTS, I'd like help estimating the cost of my project.",
    "/blog": "Hi LTS, I read your blog and have a question.",
  };
  for (const c of hubCategories) {
    m[c.href] = `Hi LTS, I'm interested in ${c.name}. Can you tell me more?`;
    for (const s of c.services) {
      m[`${c.href}/${serviceSlug(s.name)}`] = `Hi LTS, I'm interested in ${s.name} (${c.name}). Can you share details and pricing?`;
    }
  }
  for (const i of industries) {
    m[`/industries/${i.slug}`] = `Hi LTS, I run a business in ${i.name} and saw your page. Can we talk about what you can build for us?`;
  }
  for (const c of caseStudies) {
    m[`/portfolio/${c.slug}`] = `Hi LTS, I saw your project "${c.title}" and would like something similar.`;
  }
  for (const p of posts) {
    m[`/blog/${p.slug}`] = `Hi LTS, I read "${p.title}" and have a question.`;
  }
  return m;
}
