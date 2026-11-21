import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/services/ServiceParts";
import { CostEstimator } from "@/components/estimator/CostEstimator";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Project cost estimator — websites, apps, software & AI",
  description: "Get an instant indicative price range for your website, app, software, AI chatbot or automation project. Then get an exact quote from Laadhya Tech Solutions.",
  alternates: { canonical: "/cost-estimator" },
};

export default function CostEstimatorPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cost estimator" }]} />
          <h1 className="text-balance font-display text-[48px] font-bold leading-[0.98] text-ink md:text-[72px]">What will my project cost?</h1>
          <p className="max-w-2xl text-[17px] leading-[1.65] text-gray-600 md:text-[19px]">
            Answer three quick questions to see a typical price range and timeline. No sign-up needed.
          </p>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <CostEstimator />
        </Container>
      </section>
      <FinalCta />
    </>
  );
}
