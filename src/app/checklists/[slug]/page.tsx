import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { checklists } from "@/data/checklists";
import { getIndustry, industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";
import { ChecklistGate } from "@/components/checklists/ChecklistGate";
import { IndustryIcon } from "@/components/industries/IndustryIcon";
import { IndustryMemory } from "@/components/industries/IndustryMemory";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(checklists).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/checklists/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = checklists[slug];
  if (!c) return {};
  return { title: c.title, description: c.intro, alternates: { canonical: `/checklists/${slug}` } };
}

export default async function ChecklistPage({ params }: PageProps<"/checklists/[slug]">) {
  const { slug } = await params;
  const c = checklists[slug];
  const ind = getIndustry(slug);
  if (!c || !ind) notFound();
  const others = industries.filter((i) => i.slug !== slug && checklists[i.slug]);

  return (
    <>
      <IndustryMemory slug={slug} />
      <section className="border-b border-line bg-mist-50 py-14 md:py-20 print:py-6">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free checklists", href: "/checklists" }, { label: ind.name }]} />
          <p className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">
            <IndustryIcon name={ind.icon} className="size-4" /> Free checklist · {ind.name}
          </p>
          <h1 className="max-w-4xl text-balance font-display text-[44px] font-bold leading-none text-ink md:text-[68px]">{c.title}</h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-gray-600 md:text-[19px]">{c.intro}</p>
        </Container>
      </section>

      <section className="py-14 md:py-20 print:py-4">
        <Container className="max-w-[820px]">
          <ChecklistGate slug={slug} items={c.items} />
        </Container>
      </section>

      <section className="pb-16 md:pb-20 print:hidden">
        <Container className="max-w-[820px]">
          <div className="flex flex-col gap-5 rounded-card bg-ink p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex flex-col gap-1">
              <h2 className="font-display text-[32px] font-bold leading-none text-white md:text-[40px]">Want us to set these up for you?</h2>
              <p className="text-[16px] text-gray-300">See how LTS helps {ind.name.toLowerCase()} businesses, or get a free quote.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/get-quote" variant="lime">Get a free quote</Button>
              <Button href={`/industries/${slug}`} variant="outline-light">{ind.name} solutions</Button>
            </div>
          </div>
          <h2 className="mt-12 font-display text-[30px] font-bold leading-none text-ink">More free checklists</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/checklists/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white">
                  <IndustryIcon name={o.icon} className="size-4" />
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <div className="print:hidden"><FinalCta /></div>
    </>
  );
}
