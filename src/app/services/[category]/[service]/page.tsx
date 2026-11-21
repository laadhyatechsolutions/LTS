import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { whatsappLink } from "@/config/site";
import { getService, hubCategories, serviceSlug } from "@/data/services-hub";
import { categoryContent } from "@/data/service-content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd, absoluteUrl, provider } from "@/components/seo/JsonLd";
import { SectionBar } from "@/components/services/SectionBar";
import { Breadcrumb, FaqList, PricingNote, ProcessSteps, TechList, WhoFor } from "@/components/services/ServiceParts";

const SERVICE_SECTIONS = [
  { id: "who-for", label: "Who it's for" },
  { id: "process", label: "How we work" },
  { id: "tech", label: "Tech stack" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

/** Every URL is pre-generated from data files; anything else is a real 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return hubCategories.flatMap((c) => c.services.map((s) => ({ category: c.slug, service: serviceSlug(s.name) })));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]/[service]">): Promise<Metadata> {
  const { category, service } = await params;
  const found = getService(category, service);
  if (!found) return {};
  return {
    title: `${found.service.name} — ${found.category.name}`,
    description: found.service.line,
    alternates: { canonical: `/services/${category}/${service}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[category]/[service]">) {
  const { category, service } = await params;
  const found = getService(category, service);
  if (!found) notFound();
  const { category: c, service: s } = found;
  const content = categoryContent[c.slug];
  const related = c.services.filter((x) => x.name !== s.name).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@type": "Service",
          name: s.name,
          description: s.line,
          serviceType: c.name,
          url: absoluteUrl(`/services/${c.slug}/${service}`),
          areaServed: ["Hyderabad", "India"],
          provider,
        }}
      />
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-5">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: c.name, href: `/services/${c.slug}` },
              { label: s.name },
            ]}
          />
          <h1 className="max-w-4xl font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">{s.name}</h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-gray-600 md:text-[19px]">{s.line}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/get-quote" size="lg">Get a free quote</Button>
            <Button href={whatsappLink(`Hi LTS, I'd like to know about ${s.name}.`)} variant="white" size="lg" external>
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <SectionBar sections={[...SERVICE_SECTIONS, { id: "related", label: "Related services" }]} />
      <WhoFor items={content.whoFor} />
      <ProcessSteps />
      <TechList items={content.tech} />
      <PricingNote from={content.priceFrom} />
      <FaqList faqs={content.faqs} schema={false} />

      <section id="related" aria-labelledby="related-title" className="scroll-mt-36 py-20 md:py-28">
        <Container>
          <h2 id="related-title" className="font-display text-[40px] font-bold leading-[1.02] text-ink md:text-[56px]">
            Related services
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.name}>
                <Link
                  href={`/services/${c.slug}/${serviceSlug(r.name)}`}
                  className="flex h-full flex-col gap-2 rounded-card bg-white p-5 transition-all hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft"
                >
                  <h3 className="font-display text-[24px] font-bold leading-[1.1] text-ink">{r.name}</h3>
                  <p className="text-[14px] text-gray-600">{r.line}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
