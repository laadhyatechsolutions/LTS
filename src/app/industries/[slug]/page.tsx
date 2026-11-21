import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Plug, X } from "lucide-react";
import { whatsappLink } from "@/config/site";
import { getIndustry, industries } from "@/data/industries";
import { packages } from "@/data/packages";
import { caseStudies } from "@/data/portfolio";
import { getService, serviceSlug } from "@/data/services-hub";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb, FaqList } from "@/components/services/ServiceParts";
import { IndustryIcon } from "@/components/industries/IndustryIcon";
import { checklists } from "@/data/checklists";
import { IndustryMemory } from "@/components/industries/IndustryMemory";

/** Every URL is pre-generated from data files; anything else is a real 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const i = getIndustry(slug);
  if (!i) return {};
  return {
    title: `${i.name}: software, AI & marketing`,
    description: `${i.headline} ${i.intro}`.slice(0, 158),
    alternates: { canonical: `/industries/${slug}` },
    openGraph: { images: [{ url: `/industries/${slug}.jpg`, width: 1200, height: 800, alt: i.imageAlt }] },
  };
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const pkg = packages.find((p) => p.slug === ind.packageSlug);
  const study = caseStudies.find((c) => c.industry === ind.name);
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      {/* Hero: the industry's own promise, with its photo */}
      <section className="border-b border-line bg-mist-50">
        <Container className="grid items-center gap-10 py-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
          <div className="flex flex-col gap-5">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: ind.name }]} />
            <p className="inline-flex items-center gap-2 self-start rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink">
              <span className="grid size-6 place-items-center rounded-full bg-[#BFFF00]/40">
                <IndustryIcon name={ind.icon} className="size-3.5" />
              </span>
              For {ind.name}
            </p>
            <h1 className="text-balance font-display text-[46px] font-bold leading-[0.98] tracking-[-0.01em] text-ink md:text-[68px]">
              {ind.headline}
            </h1>
            <p className="max-w-xl text-pretty text-[17px] leading-[1.65] text-gray-600 md:text-[18px]">{ind.intro}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/get-quote" size="lg">Get a free quote</Button>
              <Button href={whatsappLink(`Hi LTS, I'm in ${ind.name} and would like to talk.`)} variant="white" size="lg" external>
                Chat on WhatsApp
              </Button>
            </div>
            <p className="text-[14px] text-gray-500">Built for {ind.who.charAt(0).toLowerCase() + ind.who.slice(1)}.</p>
          </div>

          <div className="relative mb-6 lg:mb-0">
            <ViewTransition name={`industry-${ind.slug}`} share="morph" default="none">
              <Image
                src={`/industries/${ind.slug}.jpg`}
                alt={ind.imageAlt}
                width={1200}
                height={800}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[4/3] w-full rounded-[22px] object-cover shadow-lift"
              />
            </ViewTransition>
            <div className="absolute -bottom-6 left-4 right-4 rounded-[16px] border border-line bg-white/95 p-4 shadow-soft backdrop-blur sm:left-auto sm:right-6 sm:w-[300px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">Most requested</p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {ind.modules.slice(0, 3).map((m) => (
                  <li key={m} className="flex items-center gap-2 text-[14px] font-medium text-ink">
                    <Check className="size-4 shrink-0 text-lime-700" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Before → after */}
      <Reveal as="section" aria-labelledby="change-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading id="change-title" eyebrow="Sound familiar?" title="What changes when you work with us" />
          <div className="mt-10 overflow-hidden rounded-card border border-line">
            <div className="hidden grid-cols-[1fr_auto_1fr] gap-6 border-b border-line bg-mist-50 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500 md:grid">
              <span>Today</span>
              <span className="w-5" />
              <span>With LTS</span>
            </div>
            <ul>
              {ind.painFix.map(([pain, fix]) => (
                <li key={pain} className="grid gap-3 border-b border-line px-6 py-5 last:border-b-0 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6">
                  <p className="flex items-start gap-3 text-[16px] text-gray-600">
                    <X className="mt-0.5 size-5 shrink-0 text-red-600/80" aria-hidden="true" />
                    <span><span className="sr-only">Today: </span>{pain}</span>
                  </p>
                  <ArrowRight className="hidden size-5 text-gray-300 md:block" aria-hidden="true" />
                  <p className="flex items-start gap-3 text-[16px] font-semibold text-ink">
                    <Check className="mt-0.5 size-5 shrink-0 text-lime-700" aria-hidden="true" />
                    <span><span className="sr-only">With LTS: </span>{fix}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Reveal>

      {/* The customer journey for this industry */}
      <section aria-labelledby="journey-title" className="bg-ink py-20 md:py-28">
        <Container>
          <div className="flex max-w-3xl flex-col gap-4">
            <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#BFD8A0]">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-lime-400" />
              End to end
            </p>
            <h2 id="journey-title" className="text-balance font-display text-[40px] font-bold leading-[1] text-white md:text-[58px]">
              {ind.journeyTitle}
            </h2>
          </div>
          <ol className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
            <span aria-hidden="true" className="absolute left-5 right-5 top-5 hidden h-px bg-white/15 md:block" />
            {ind.journey.map(([stage, add], i) => (
              <li key={stage} className="relative flex gap-4 md:flex-col">
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-lime-400 font-display text-[20px] font-bold text-ink">
                  {i + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-[26px] font-bold leading-none text-white">{stage}</h3>
                  <p className="text-[15px] leading-relaxed text-gray-300">{add}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Services that solve it */}
      <Reveal as="section" aria-labelledby="solutions-title" className="bg-mist-50 py-20 md:py-28">
        <Container>
          <SectionHeading id="solutions-title" eyebrow="How we help" title={`Our solutions for ${ind.name.toLowerCase()}`} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ind.solutions.map(([cat, name, why]) => {
              const found = getService(cat, serviceSlug(name));
              const href = found ? `/services/${cat}/${serviceSlug(name)}` : `/services/${cat}`;
              return (
                <li key={`${cat}-${name}`}>
                  <Link href={href} className="group flex h-full flex-col gap-3 rounded-card bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-soft">
                    <ServiceImage slug={cat} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw" className="w-full" />
                    <div className="flex flex-1 flex-col gap-2 px-1 pb-1">
                      <h3 className="font-display text-[24px] font-bold leading-[1.1] text-ink">{name}</h3>
                      <p className="text-[14px] leading-relaxed text-gray-600">{why}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[14px] font-semibold text-lime-800 group-hover:gap-2.5">
                        Learn more <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </Reveal>

      {/* What we can build + what we connect */}
      <Reveal as="section" aria-labelledby="modules-title" className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading id="modules-title" eyebrow="Built around you" title="What we can build for you" lead="Pick what you need now and add the rest as you grow." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {ind.modules.map((m) => (
                <li key={m} className="flex items-center gap-3 rounded-[14px] border border-line bg-white px-4 py-3.5 text-[15px] font-medium text-ink">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#BFFF00]/30">
                    <Check className="size-4 text-ink" aria-hidden="true" />
                  </span>
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="self-start rounded-card bg-mist-50 p-6 md:p-8">
            <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">
              <Plug className="size-4" aria-hidden="true" />
              Works with your tools
            </p>
            <h3 className="mt-3 font-display text-[30px] font-bold leading-[1.05] text-ink">No starting over</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-gray-600">We connect what you already use, so your team keeps working the way it knows.</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {ind.worksWith.map((t) => (
                <li key={t} className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[14px] font-medium text-ink">{t}</li>
              ))}
            </ul>
          </div>
        </Container>
      </Reveal>

      {(pkg || study) && (
        <section aria-label="Package and case study" className="pb-20 md:pb-28">
          <Container className={`grid gap-6 ${pkg && study ? "lg:grid-cols-[1.4fr_1fr]" : ""}`}>
            {pkg && (
              <div className="flex flex-col justify-between gap-6 rounded-card bg-ink p-6 md:p-10">
                <div className="flex flex-col gap-2">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#BFD8A0]">Ready package</p>
                  <h2 className="font-display text-[36px] font-bold leading-none text-white md:text-[44px]">{pkg.name}</h2>
                  <p className="text-[16px] text-gray-300">{pkg.includes.join(" · ")}</p>
                </div>
                <div>
                  <Button href="/packages" variant="lime">See package &amp; pricing</Button>
                </div>
              </div>
            )}
            {study && (
              <Link href={`/portfolio/${study.slug}`} className="group flex flex-col gap-3 rounded-card border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-soft md:p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">Related case study</p>
                <h2 className="font-display text-[28px] font-bold leading-[1.1] text-ink">{study.title}</h2>
                <p className="text-[15px] text-gray-600">{study.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-lime-800 group-hover:gap-2.5">
                  Read the story <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            )}
          </Container>
        </section>
      )}

      <FaqList faqs={ind.faqs.map(([q, a]) => ({ q, a }))} />

      <IndustryMemory slug={ind.slug} />
      {checklists[ind.slug] && (
        <section aria-label="Free checklist" className="pb-4">
          <Container>
            <Link
              href={`/checklists/${ind.slug}`}
              className="group flex flex-col gap-3 rounded-card border border-line bg-mist-50 p-6 transition-colors hover:bg-mist-100 md:flex-row md:items-center md:justify-between md:p-8"
            >
              <span className="flex flex-col gap-1">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-600">Free checklist</span>
                <span className="font-display text-[28px] font-bold leading-[1.05] text-ink md:text-[34px]">{checklists[ind.slug].title}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-lime-800 group-hover:gap-2.5">
                Get the checklist <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </Link>
          </Container>
        </section>
      )}

      {/* Other industries */}
      <section aria-labelledby="others-title" className="py-16 md:py-20">
        <Container>
          <h2 id="others-title" className="font-display text-[30px] font-bold leading-none text-ink">Other industries we serve</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/industries/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white">
                  <IndustryIcon name={o.icon} className="size-4" />
                  {o.name}
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
