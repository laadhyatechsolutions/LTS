import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/data/portfolio";
import { hubCategories } from "@/data/services-hub";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";

/** Every URL is pre-generated from data files; anything else is a real 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  return c ? { title: c.title, description: c.summary, alternates: { canonical: `/portfolio/${slug}` } } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const cat = hubCategories.find((x) => x.slug === c.category);

  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Portfolio", href: "/portfolio" }, { label: c.client }]} />
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">
            {c.industry} · {cat?.name}
          </p>
          <h1 className="max-w-4xl font-display text-[44px] font-bold leading-none text-ink md:text-[64px]">{c.title}</h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">{c.summary}</p>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="flex flex-col gap-12">
          <ImageSlot file={`portfolio/${c.slug}`} label="Project screenshots" alt={`${c.client} project screenshot`} sizes="(min-width: 1280px) 1200px, 100vw" priority className="h-[280px] w-full md:h-[420px]" />
          <div className="grid gap-8 md:grid-cols-2">
            {[{ h: "The challenge", t: c.challenge }, { h: "Our solution", t: c.solution }].map((b) => (
              <div key={b.h} className="flex flex-col gap-3">
                <h2 className="font-display text-[34px] font-bold leading-none text-ink">{b.h}</h2>
                <p className="text-[17px] leading-relaxed text-gray-700">{b.t}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[34px] font-bold leading-none text-ink">Results</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.results.map((r) => (
                <li key={r} className="rounded-card border border-line border-l-4 border-l-lime-400 bg-white p-6 font-display text-[32px] font-bold leading-none text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[34px] font-bold leading-none text-ink">Built with</h2>
            <ul className="flex flex-wrap gap-3">
              {c.tech.map((t) => (
                <li key={t} className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-[15px] font-semibold text-ink">{t}</li>
              ))}
            </ul>
          </div>

          <figure className="flex flex-col gap-3 rounded-card bg-mist-100 p-8">
            <blockquote className="font-display text-[30px] font-bold leading-[1.1] text-ink">{c.quote.text}</blockquote>
            <figcaption className="text-[15px] text-gray-700">{c.quote.by}</figcaption>
          </figure>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            {cat && <Button href={`/services/${cat.slug}`} variant="outline">More {cat.name.toLowerCase()}</Button>}
            <Link href="/portfolio" className="font-semibold text-lime-800 underline-offset-4 hover:underline">← All case studies</Link>
          </div>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
