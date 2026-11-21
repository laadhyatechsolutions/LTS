import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { getCategory, hubCategories, serviceSlug } from "@/data/services-hub";
import { categoryContent } from "@/data/service-content";
import { ServiceImage } from "@/components/ui/ServiceImage";
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
  return hubCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[category]">): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return { title: c.name, description: categoryContent[c.slug].promise, alternates: { canonical: `/services/${c.slug}` } };
}

export default async function CategoryPage({ params }: PageProps<"/services/[category]">) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const content = categoryContent[c.slug];

  return (
    <>
      <JsonLd
        data={{
          "@type": "Service",
          name: c.name,
          description: content.promise,
          serviceType: c.name,
          url: absoluteUrl(`/services/${c.slug}`),
          areaServed: ["Hyderabad", "India"],
          provider,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: c.name,
            itemListElement: c.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.line } })),
          },
        }}
      />
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-5">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: c.name }]} />
          <ServiceImage slug={c.slug} morph sizes="256px" className="w-44 md:w-64" />
          <h1 className="max-w-4xl font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">{c.name}</h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-gray-600 md:text-[19px]">{content.promise}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/get-quote" size="lg">Get a free quote</Button>
            <Button href={whatsappLink(`Hi LTS, I'd like to know about ${c.name}.`)} variant="white" size="lg" external>
              Chat on WhatsApp
            </Button>
          </div>
        </Container>
      </section>

      <SectionBar sections={[{ id: "included", label: "What's included" }, ...SERVICE_SECTIONS]} />

      <section id="included" aria-labelledby="included-title" className="scroll-mt-36 py-20 md:py-28">
        <Container>
          <h2 id="included-title" className="font-display text-[40px] font-bold leading-[1.02] text-ink md:text-[56px]">
            What&apos;s included
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.services.map((s) => (
              <li key={s.name}>
                <Link
                  href={`/services/${c.slug}/${serviceSlug(s.name)}`}
                  className="group flex h-full flex-col gap-2 rounded-card bg-white p-5 transition-all hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft"
                >
                  <h3 className="font-display text-[24px] font-bold leading-[1.1] text-ink">{s.name}</h3>
                  <p className="text-[14px] leading-relaxed text-gray-600">{s.line}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[14px] font-semibold text-lime-800 group-hover:gap-2.5">
                    Learn more <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {c.slug === "ai-solutions" && (
        <section aria-label="Free AI audit" className="pb-4">
          <Container>
            <div className="flex flex-col gap-5 rounded-card bg-ink p-6 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="flex flex-col gap-2">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#BFD8A0]">Not sure where to start?</p>
                <h2 className="font-display text-[34px] font-bold leading-none text-white md:text-[44px]">Book a free 15-minute AI audit</h2>
                <p className="text-[16px] text-gray-300">We’ll show you the 3 tasks most worth automating in your business.</p>
              </div>
              <Button href="/free-ai-audit" variant="lime">Book my free audit</Button>
            </div>
          </Container>
        </section>
      )}
      <WhoFor items={content.whoFor} />
      <ProcessSteps />
      <TechList items={content.tech} />
      <PricingNote from={content.priceFrom} />
      <FaqList faqs={content.faqs} />
      <FinalCta />
    </>
  );
}
