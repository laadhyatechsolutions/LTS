import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { ServiceImage } from "@/components/ui/ServiceImage";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function ServicesOverview() {
  return (
    <section aria-labelledby="services-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="services-title"
          eyebrow={<T k="services.eyebrow">What we do</T>}
          title={<T k="services.title">Everything your business needs to go digital</T>}
          lead={<T k="services.lead">Pick a category to see every service inside it.</T>}
        />
        <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {serviceCategories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/services/${c.slug}`}
                className="group flex h-full flex-col gap-4 rounded-card bg-white p-6 transition-all hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft"
              >
                <ServiceImage slug={c.slug} morph className="w-full" />
                <h3 className="font-display text-[30px] font-bold leading-[1.05] text-ink">{c.name}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{c.line}</p>
                <ul className="flex flex-col gap-1.5 text-[14px] text-gray-700">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-lime-800" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-lime-800 group-hover:gap-2.5">
                  <T k="services.explore">Explore</T> <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button href="/services" variant="outline">
            <T k="services.all">View all services</T>
          </Button>
        </div>
      </Container>
    </section>
  );
}
