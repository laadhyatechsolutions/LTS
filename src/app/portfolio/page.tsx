import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { caseStudies } from "@/data/portfolio";
import { findImages } from "@/lib/images";
import { Breadcrumb } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Portfolio & case studies",
  description: "See what Laadhya Tech Solutions has built — websites, apps, software, AI bots, automation and marketing results for Hyderabad businesses.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />
          <h1 className="font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Our work</h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">
            Real projects, real results. Filter by service or industry.
          </p>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <PortfolioGrid covers={findImages(Object.fromEntries(caseStudies.map((c) => [c.slug, `portfolio/${c.slug}`])))} />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
