import type { Metadata } from "next";
import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";
import { IndustryIcon } from "@/components/industries/IndustryIcon";

export const metadata: Metadata = {
  title: "Industries we serve",
  description: "Software, AI, automation and marketing for healthcare, education, real estate, retail, manufacturing, hospitality, professional services, startups, NGOs and public figures.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <h1 className="text-balance font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Built for your industry</h1>
          <p className="max-w-2xl text-[17px] leading-[1.65] text-gray-600 md:text-[19px]">
            Every sector runs differently. Pick yours to see the problems we fix, the journey we digitise and what we can build for you.
          </p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Jump to an industry">
            {industries.map((i) => (
              <li key={i.slug}>
                <a href={`#${i.slug}`} className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:border-ink">
                  <IndustryIcon name={i.icon} className="size-3.5" />
                  {i.name}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((i, idx) => (
              <li key={i.slug} id={i.slug} className="scroll-mt-28">
                <Link
                  href={`/industries/${i.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-all hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="relative">
                    <ViewTransition name={`industry-${i.slug}`} share="morph" default="none">
                      <Image
                        src={`/industries/${i.slug}.jpg`}
                        alt=""
                        width={1200}
                        height={800}
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                        priority={idx < 3}
                        className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </ViewTransition>
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-semibold text-ink shadow-soft">
                      <IndustryIcon name={i.icon} className="size-4" />
                      {i.name}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-6">
                    <h2 className="text-balance font-display text-[28px] font-bold leading-[1.05] text-ink">{i.headline}</h2>
                    <p className="text-[15px] leading-relaxed text-gray-600">{i.who}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 font-semibold text-lime-800 group-hover:gap-2.5">
                      See solutions <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
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
