import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getCategory, hubCategories } from "@/data/services-hub";
import { categoryContent } from "@/data/service-content";

export function generateStaticParams() {
  return hubCategories.map((c) => ({ category: c.slug }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LTS services";

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const c = getCategory((await params).category);
  return ogImage({ eyebrow: "Services", title: c?.name ?? "Our services", subtitle: c ? categoryContent[c.slug]?.promise : undefined });
}
