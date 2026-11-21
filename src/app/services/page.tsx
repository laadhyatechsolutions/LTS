import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hubCategories, serviceSlug } from "@/data/services-hub";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageWhatsAppButton } from "@/components/ui/PageWhatsApp";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Services — Websites, Apps, Software, AI, Automation & Marketing",
  description:
    "Everything your business needs to go digital: websites, mobile apps, custom software, AI bots, automation and digital marketing — one team in Hyderabad.",
  alternates: { canonical: "/services" },
};

/** Mid-page call to action, shown after every two categories */
function MidCta({ index }: { index: number }) {
  const copy = [
    "Not sure which service you need?",
    "Want it built and marketed by one team?",
  ][index % 2];
  return (
    <Reveal className="my-14 flex flex-col gap-5 rounded-card bg-ink p-6 md:my-20 md:flex-row md:items-center md:justify-between md:p-10">
      <p className="font-display text-[30px] font-bold leading-[1.05] text-white md:text-[38px]">
        {copy} <span className="block md:inline">Tell us what you need.</span>
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button href="/get-quote" variant="lime">
          Get a free quote
        </Button>
        <PageWhatsAppButton variant="outline-light">
          Chat on WhatsApp
        </PageWhatsAppButton>
      </div>
    </Reveal>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-600 md:text-[13px]">
            Our services
          </p>
          <h1 className="max-w-4xl font-display text-[48px] font-bold leading-[1] text-ink md:text-[72px]">
            Everything your business needs to go digital
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-gray-600 md:text-[19px]">
            Development, AI and marketing under one roof — we build it, automate it and grow it.
          </p>
        </Container>
      </section>

      {/* Sticky category tabs: anchor links, no JavaScript needed */}
      <nav
        aria-label="Service categories"
        className="sticky top-[76px] [html[data-header-hidden=true]_&]:max-md:top-0 max-md:transition-[top] max-md:duration-300 z-30 border-b border-line bg-white"
      >
        <Container>
          <ul className="flex gap-2 overflow-x-auto py-3">
            {hubCategories.map((c) => (
              <li key={c.slug} className="shrink-0">
                <a
                  href={`#${c.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 text-[14px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  {c.tab}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="py-14 md:py-20">
        {hubCategories.map((c, i) => (
          <Fragment key={c.slug}>
            <section id={c.slug} aria-labelledby={`${c.slug}-title`} className="scroll-mt-40">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex items-start gap-4">
                  <ServiceImage slug={c.slug} morph sizes="160px" className="w-28 shrink-0 md:w-40" />
                  <div className="flex flex-col gap-2">
                    <h2
                      id={`${c.slug}-title`}
                      className="font-display text-[36px] font-bold leading-[1.02] text-ink md:text-[48px]"
                    >
                      {c.name}
                    </h2>
                    <p className="text-[16px] text-gray-600 md:text-[18px]">{c.intro}</p>
                  </div>
                </div>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-1.5 font-semibold text-lime-800 hover:gap-2.5"
                >
                  Explore all {c.tab.toLowerCase() === "more" ? "services" : c.name.toLowerCase()}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {c.services.map((s) => (
                  <li key={s.name}>
                    <Link
                      href={`${c.href}/${serviceSlug(s.name)}`}
                      className="group flex h-full flex-col gap-2 rounded-card bg-white p-5 transition-all hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft"
                    >
                      <ServiceImage slug={c.slug} sizes="144px" className="w-36" />
                      <h3 className="font-display text-[24px] font-bold leading-[1.1] text-ink">{s.name}</h3>
                      <p className="text-[14px] leading-relaxed text-gray-600">{s.line}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-[14px] font-semibold text-lime-800 group-hover:gap-2.5">
                        Learn more <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            {i % 2 === 1 && i < hubCategories.length - 1 && <MidCta index={Math.floor(i / 2)} />}
            {i % 2 === 0 && <div className="h-14 md:h-20" aria-hidden="true" />}
          </Fragment>
        ))}
      </Container>

      <FinalCta />
    </>
  );
}
