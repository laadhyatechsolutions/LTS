import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { IndustryIcon } from "@/components/industries/IndustryIcon";

/** Homepage: photo tile per industry, each linking to its own page */
export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="industries-title" eyebrow={<T k="industries.eyebrow">Industries</T>} title={<T k="industries.title">Solutions for your industry</T>} />
          <Link href="/industries" className="inline-flex items-center gap-1.5 self-start font-semibold text-lime-800 hover:gap-2.5 md:self-auto">
            <T k="industries.all">All industries</T> <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-12 lg:grid-cols-5 lg:gap-4">
          {industries.map((ind) => (
            <li key={ind.slug}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-card bg-ink"
              >
                <ViewTransition name={`industry-${ind.slug}`} share="morph" default="none">
                  <Image
                    src={`/industries/${ind.slug}.jpg`}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 230px, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </ViewTransition>
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4">
                  <span className="grid size-8 place-items-center rounded-full bg-[#BFFF00] text-ink">
                    <IndustryIcon name={ind.icon} className="size-4" />
                  </span>
                  <span className="text-[15px] font-semibold leading-tight text-white">{ind.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
