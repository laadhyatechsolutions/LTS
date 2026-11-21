import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryService, formatDate, getPost, posts } from "@/data/blog";
import { getCategory, serviceSlug } from "@/data/services-hub";
import { checklists } from "@/data/checklists";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageWhatsAppButton } from "@/components/ui/PageWhatsApp";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";
import { JsonLd, absoluteUrl, provider } from "@/components/seo/JsonLd";
import { findImage } from "@/lib/images";
import { ArticleToc, ReadingProgress, ShareButtons } from "@/components/blog/ArticleTools";

/** Every URL is pre-generated from data files; anything else is a real 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  return p
    ? { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: "article", publishedTime: p.date } }
    : {};
}

function InlineCta({ title }: { title: string }) {
  return (
    <aside className="my-10 flex flex-col gap-4 rounded-card bg-ink p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <p className="font-display text-[28px] font-bold leading-[1.05] text-white">{title}</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/get-quote" variant="lime">Get a free quote</Button>
        <PageWhatsAppButton variant="outline-light">WhatsApp us</PageWhatsAppButton>
      </div>
    </aside>
  );
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  // Same category first, then the newest of the rest
  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category) || b.date.localeCompare(a.date))
    .slice(0, 3);
  const svc = categoryService[post.category];
  const svcCategory = svc ? getCategory(svc.slug) : undefined;
  const checklist = post.industry ? checklists[post.industry] : undefined;

  const cover = findImage(`blog/${post.slug}`);
  return (
    <>
      <JsonLd
        data={{
          "@type": "BlogPosting",
          headline: post.title,
          ...(post.excerpt.startsWith("[") ? {} : { description: post.excerpt }),
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Organization", name: post.author },
          publisher: provider,
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          image: absoluteUrl(cover ?? `/blog/${post.slug}/opengraph-image`),
          articleSection: post.category,
        }}
      />
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex max-w-[880px] flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]} />
          <h1 className="font-display text-[44px] font-bold leading-none text-ink md:text-[64px]">{post.title}</h1>
          <p className="text-[15px] text-gray-600">
            By {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
          </p>
          <ShareButtons title={post.title} />
        </Container>
      </section>

      <article id="article-body" className="py-14 md:py-20">
        <ReadingProgress targetId="article-body" />
        <Container className="grid max-w-[1040px] gap-10 lg:grid-cols-[220px_1fr]">
          <ArticleToc sections={post.sections.map(({ id, heading }) => ({ id, heading }))} />
          <div>
            <ImageSlot file={`blog/${post.slug}`} label="Cover image" sizes="(min-width: 1024px) 780px, 100vw" priority className="mb-8 h-[220px] w-full md:h-[320px]" />
            {post.sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="mb-3 mt-8 font-display text-[34px] font-bold leading-none text-ink">{s.heading}</h2>
                {s.paragraphs.map((t) => (
                  <p key={t} className="mb-4 text-[17px] leading-relaxed text-gray-700">{t}</p>
                ))}
                {i === 1 && <InlineCta title="Want help with this? Tell us what you need." />}
              </section>
            ))}
            <InlineCta title="Ready to get started?" />
            <div className="mb-8 border-t border-line pt-6"><ShareButtons title={post.title} /></div>
            <Link href="/blog" className="font-semibold text-lime-800 underline-offset-4 hover:underline">← All articles</Link>
          </div>
        </Container>
      </article>

      {svcCategory && (
        <section aria-labelledby="help-title" className="pb-14 md:pb-20">
          <Container className="max-w-[1040px]">
            <div className="rounded-card border border-line bg-mist-50 p-6 md:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-600">Need help with this?</p>
              <h2 id="help-title" className="mt-1 font-display text-[32px] font-bold leading-none text-ink md:text-[40px]">{svcCategory.name}</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {svcCategory.services.slice(0, 3).map((s) => (
                  <li key={s.name}>
                    <Link href={`${svcCategory.href}/${serviceSlug(s.name)}`} className="flex h-full flex-col gap-1 rounded-xl border border-line bg-white p-4 transition-colors hover:border-ink">
                      <span className="font-semibold text-ink">{s.name}</span>
                      <span className="text-[14px] text-gray-600">{s.line}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href={svcCategory.href} className="inline-flex items-center gap-1.5 font-semibold text-lime-800 hover:gap-2.5">
                  All {svc.cta.toLowerCase()} services <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                {checklist && post.industry && (
                  <Link href={`/checklists/${post.industry}`} className="inline-flex items-center gap-1.5 font-semibold text-lime-800 hover:gap-2.5">
                    Free checklist: {checklist.title} <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-mist-50 py-14 md:py-20">
          <Container>
            <h2 id="related-title" className="font-display text-[40px] font-bold leading-none text-ink">Related articles</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="flex h-full flex-col gap-2 rounded-card bg-white p-5 hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-gray-600">{r.category}</p>
                    <h3 className="font-display text-[26px] font-bold leading-[1.1] text-ink">{r.title}</h3>
                    <p className="mt-auto pt-2 text-[13px] text-gray-600">{formatDate(r.date)} · {r.readMinutes} min read</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <FinalCta />
    </>
  );
}
