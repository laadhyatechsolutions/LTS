import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { hubCategories, serviceSlug } from "@/data/services-hub";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/portfolio";
import { posts } from "@/data/blog";
import { checklists } from "@/data/checklists";

/**
 * /sitemap.xml — every public page, built from the same data files as the pages,
 * so new services, industries, case studies or posts appear automatically.
 * Set `site.url` in src/config/site.ts to your real domain before launch.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: url(path),
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    page("/get-quote", 0.9),
    page("/contact", 0.8),
    page("/packages", 0.8),
    page("/industries", 0.8),
    page("/products", 0.8),
    page("/portfolio", 0.7),
    page("/about", 0.7),
    page("/blog", 0.7, "weekly"),
    page("/careers", 0.5),
    page("/free-ai-audit", 0.8),
    page("/cost-estimator", 0.8),
    ...hubCategories.flatMap((c) => [
      page(c.href, 0.8),
      ...c.services.map((s) => page(`${c.href}/${serviceSlug(s.name)}`, 0.7)),
    ]),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.7)),
    page("/checklists", 0.6),
    ...Object.keys(checklists).map((slug) => page(`/checklists/${slug}`, 0.5)),
    ...caseStudies.map((c) => page(`/portfolio/${c.slug}`, 0.6)),
    ...posts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.6), lastModified: new Date(p.date) })),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
    page("/refund-policy", 0.2, "yearly"),
  ];
}
