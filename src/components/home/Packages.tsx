import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { featuredPackages } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { T } from "@/components/ui/T";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Packages() {
  return (
    <section aria-labelledby="packages-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="packages-title"
          align="center"
          eyebrow={<T k="packages.eyebrow">Packages</T>}
          title={<T k="packages.title">Popular packages</T>}
          lead={<T k="packages.lead">Fixed scope, clear pricing. Customise any package.</T>}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredPackages.map((p) => (
            <li key={p.name}>
              <article
                className={`relative flex h-full flex-col gap-4 rounded-card bg-white p-7 ${
                  p.popular ? "border border-ink shadow-lift" : "border border-line"
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-4 left-6 rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-lime-300">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-[30px] font-bold leading-none text-ink">{p.name}</h3>
                <p className="text-[15px] text-gray-600">
                  From <span className="text-[28px] font-bold text-ink">{p.price}</span>
                </p>
                <ul className="flex flex-col gap-2 text-[15px] text-gray-700">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-lime-800" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href="/get-quote" variant={p.popular ? "ink" : "outline"} className="mt-auto">
                  Get this package
                </Button>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <Link href="/packages" className="inline-flex items-center gap-1.5 font-semibold text-lime-800 hover:gap-2.5">
            See all packages &amp; pricing <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
