import type { LegalDoc } from "@/data/legal";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/services/ServiceParts";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex max-w-[880px] flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: doc.title }]} />
          <h1 className="font-display text-[44px] font-bold leading-none text-ink md:text-[64px]">{doc.title}</h1>
          <p className="text-[15px] text-gray-600">Last updated: {doc.updated}</p>
        </Container>
      </section>
      <article className="py-14 md:py-20">
        <Container className="max-w-[880px]">
          {/* Draft notice — remove once a lawyer has reviewed this page and the [brackets] are filled */}
          <p role="note" className="mb-10 rounded-card border-2 border-dashed border-ink bg-mist-100 p-4 text-[14px] text-gray-700">
            Draft — to be reviewed by a lawyer and completed before launch. Items in [brackets] still need real details.
          </p>
          {doc.sections.map((s) => (
            <section key={s.heading} className="mb-10">
              <h2 className="mb-3 font-display text-[32px] font-bold leading-none text-ink">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mb-3 text-[17px] leading-relaxed text-gray-700">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mb-3 list-disc space-y-2 pl-6 text-[17px] leading-relaxed text-gray-700">
                  {s.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}
        </Container>
      </article>
    </>
  );
}
