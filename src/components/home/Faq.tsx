import { Plus } from "lucide-react";
import { homeFaqs } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="bg-mist-50 py-20 md:py-28">
      <Container className="max-w-[880px]">
        <JsonLd data={faqSchema(homeFaqs)} />
        <SectionHeading id="faq-title" align="center" eyebrow={<T k="faq.eyebrow">FAQ</T>} title={<T k="faq.title">Frequently asked questions</T>} />
        <div className="mt-10 flex flex-col gap-3 md:mt-12">
          {homeFaqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-card bg-white open:shadow-soft"
            >
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus className="size-5 shrink-0 transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-[16px] leading-relaxed text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
