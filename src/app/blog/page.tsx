import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { BlogList } from "@/components/blog/BlogList";
import { posts } from "@/data/blog";
import { findImages } from "@/lib/images";
import { Breadcrumb } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical guides on websites, software, AI, automation and digital marketing for Indian businesses.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
          <h1 className="font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Blog</h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">Plain-language guides to help your business grow online.</p>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <BlogList covers={findImages(Object.fromEntries(posts.map((p) => [p.slug, `blog/${p.slug}`])))} />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
