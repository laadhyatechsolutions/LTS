import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { checklists } from "@/data/checklists";
import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";
import { IndustryIcon } from "@/components/industries/IndustryIcon";

export const metadata: Metadata = {
  title: "Free checklists for your business",
  description: "Free, practical website and digital checklists for clinics, schools, real estate, retail, manufacturing, restaurants, professionals, startups, NGOs and public figures.",
  alternates: { canonical: "/checklists" },
};

export default function ChecklistsPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free checklists" }]} />
          <h1 className="text-balance font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Free checklists</h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-gray-600 md:text-[19px]">
            Practical, plain-language checklists for your industry. Read the first three items free, or unlock the full list with your email.
          </p>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.filter((i) => checklists[i.slug]).map((i) => (
              <li key={i.slug}>
                <Link href={`/checklists/${i.slug}`} className="group flex h-full flex-col gap-3 rounded-card border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-soft">
                  <span className="grid size-11 place-items-center rounded-[12px] border border-ink/10 bg-[#BFFF00]/20">
                    <IndustryIcon name={i.icon} className="size-5 text-ink" />
                  </span>
                  <h2 className="font-display text-[26px] font-bold leading-[1.08] text-ink">{checklists[i.slug].title}</h2>
                  <p className="text-[15px] leading-relaxed text-gray-600">{checklists[i.slug].intro}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-lime-800 group-hover:gap-2.5">
                    Get the checklist <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
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
