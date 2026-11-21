import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getService, hubCategories, serviceSlug } from "@/data/services-hub";

export function generateStaticParams() {
  return hubCategories.flatMap((c) => c.services.map((s) => ({ category: c.slug, service: serviceSlug(s.name) })));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LTS service";

export default async function Image({ params }: { params: Promise<{ category: string; service: string }> }) {
  const { category, service } = await params;
  const found = getService(category, service);
  return ogImage({ eyebrow: found?.category.name ?? "Services", title: found?.service.name ?? "Our services", subtitle: found?.service.line });
}
