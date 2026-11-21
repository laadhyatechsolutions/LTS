import type { Metadata } from "next";
import { packageFaqs } from "@/data/packages";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { PackageExplorer } from "@/components/packages/PackageExplorer";
import { Breadcrumb, FaqList } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Packages & pricing",
  description: "Ready packages for startups, clinics, institutes, e-commerce, AI automation, election campaigns and monthly care — Basic, Growth and Premium tiers with clear starting prices.",
  alternates: { canonical: "/packages" },
};

export default function PackagesPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Packages" }]} />
          <h1 className="font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Packages &amp; pricing</h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">
            Fixed scope, clear pricing. Pick the package that fits your business, then customise it.
          </p>
        </Container>
      </section>
      <section aria-label="Choose a package" className="py-14 md:py-20">
        <Container>
          <PackageExplorer />
        </Container>
      </section>
      <FaqList faqs={packageFaqs} />
      <FinalCta />
    </>
  );
}
