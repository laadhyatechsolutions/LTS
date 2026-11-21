import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/** /robots.txt — allow everything public, point crawlers at the sitemap */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin"] },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
    host: site.url,
  };
}
