import { TrendingUp } from "lucide-react";
import { caseStudies } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function Portfolio() {
  return (
    <section aria-labelledby="work-title" className="bg-mist-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="work-title" eyebrow={<T k="work.eyebrow">Our work</T>} title={<T k="work.title">Recent projects</T>} />
          <Button href="/portfolio" variant="outline" className="self-start md:self-auto">
            <T k="work.all">View all case studies</T>
          </Button>
        </div>
        <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <li key={i}>
              <article className="flex h-full flex-col overflow-hidden rounded-card bg-white">
                <ImageSlot file={`portfolio/project-${i + 1}`} label="Project screenshot" sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" className="h-[200px] rounded-none border-0 border-b border-line" />
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-gray-600">{c.tag}</p>
                  <h3 className="font-display text-[27px] font-bold leading-[1.1] text-ink">{c.title}</h3>
                  <p className="text-[15px] text-gray-600">{c.text}</p>
                  <p className="mt-2 inline-flex items-center gap-1.5 self-start rounded-full bg-lime-100 px-3 py-1 text-[14px] font-semibold text-ink">
                    <TrendingUp className="size-4 text-lime-700" aria-hidden="true" />
                    {c.result}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
