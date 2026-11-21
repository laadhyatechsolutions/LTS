import { techStack } from "@/data/home";
import { Container } from "@/components/ui/Container";

export function TechStack() {
  return (
    <section aria-labelledby="tech-title" className="border-y-2 border-mist-100 py-14">
      <Container className="flex flex-col items-center gap-6">
        <h2 id="tech-title" className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-600 md:text-[13px]">
          Technologies we use
        </h2>
        <ul className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {techStack.map((t) => (
            <li key={t} className="rounded-full border border-ink/15 px-4 py-2 text-[14px] font-semibold text-ink">
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
