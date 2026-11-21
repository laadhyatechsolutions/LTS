import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { getPost, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "LTS blog article";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return ogImage({ eyebrow: `Blog · ${post?.category ?? ""}`, title: post?.title ?? "LTS Blog", subtitle: `${post?.readMinutes ?? 5} min read` });
}
