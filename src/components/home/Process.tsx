import { processSteps } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="bg-mist-50 py-20 md:py-28">
      <Container>
        <SectionHeading id="process-title" eyebrow={<T k="process.eyebrow">How we work</T>} title={<T k="process.title">A simple 5-step process</T>} />
        <ol className="relative mt-10 grid gap-6 md:mt-12 md:grid-cols-5 md:gap-5">
          <span aria-hidden="true" className="absolute left-6 right-6 top-6 hidden h-px bg-ink/15 md:block" />
          {processSteps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 md:flex-col md:gap-3">
              <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border border-ink/10 bg-[#E9F9C4] font-display text-2xl font-bold text-ink">
                {i + 1}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-[27px] font-bold leading-[1.1] text-ink">{s.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
