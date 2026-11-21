import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { industries } from "@/data/industries";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LTS solutions for your industry";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  return ogImage({ eyebrow: `Industries · ${ind?.name ?? ""}`, title: ind?.headline ?? "Built for your industry", subtitle: ind?.who });
}
