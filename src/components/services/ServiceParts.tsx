import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Plus } from "lucide-react";
import { site } from "@/config/site";
import { processSteps } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  // Structured data so Google can show the trail in search results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: new URL(it.href, site.url).toString() } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-gray-500">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.href ? (
              <Link href={it.href} className="transition-colors hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">{it.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="size-3.5 text-gray-400" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function WhoFor({ items }: { items: string[] }) {
  return (
    <section id="who-for" aria-labelledby="who-title" className="scroll-mt-36 py-20 md:py-28">
      <Container>
        <SectionHeading id="who-title" eyebrow="Who it's for" title="Is this right for you?" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3 rounded-card bg-white p-5 text-[16px] text-ink">
              <Check className="mt-0.5 size-5 shrink-0 text-lime-800" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function ProcessSteps() {
  return (
    <section id="process" aria-labelledby="process-title" className="scroll-mt-36 bg-mist-50 py-20 md:py-28">
      <Container>
        <SectionHeading id="process-title" eyebrow="How we work" title="From first call to launch" />
        <ol className="mt-10 grid gap-4 md:grid-cols-5">
          {processSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 rounded-card bg-white p-5">
              <span className="grid size-9 place-items-center rounded-full border border-ink/10 bg-[#BFFF00]/30 font-display text-[20px] font-bold text-ink">
                {i + 1}
              </span>
              <h3 className="font-display text-[26px] font-bold leading-none text-ink">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function TechList({ items }: { items: string[] }) {
  return (
    <section id="tech" aria-labelledby="tech-title" className="scroll-mt-36 py-20 md:py-28">
      <Container>
        <SectionHeading id="tech-title" eyebrow="Tech stack" title="Tools we build with" />
        <ul className="mt-10 flex flex-wrap gap-3">
          {items.map((t) => (
            <li key={t} className="rounded-full border border-ink/15 bg-white px-5 py-2.5 text-[15px] font-semibold text-ink">
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function PricingNote({ from, href = "/packages" }: { from: string; href?: string }) {
  return (
    <section id="pricing" aria-labelledby="price-title" className="scroll-mt-36 pb-16 md:pb-[88px]">
      <Container>
        <div className="flex flex-col gap-5 rounded-card bg-mist-100 p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex flex-col gap-1">
            <h2 id="price-title" className="font-display text-[32px] font-bold leading-none text-ink md:text-[40px]">
              Starting from {from}
            </h2>
            <p className="text-[16px] text-gray-700">Final price depends on your scope. We send a clear, fixed quote.</p>
          </div>
          <Link href={href} className="inline-flex items-center gap-1.5 font-semibold text-lime-800 hover:gap-2.5">
            See ready packages <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** schema=false where the same questions already appear on another page (avoids duplicate FAQ markup) */
export function FaqList({ faqs, schema = true }: { faqs: { q: string; a: string }[]; schema?: boolean }) {
  return (
    <section id="faq" aria-labelledby="sfaq-title" className="scroll-mt-36 bg-mist-50 py-20 md:py-28">
      <Container className="max-w-[880px]">
        {schema && <JsonLd data={faqSchema(faqs)} />}
        <SectionHeading id="sfaq-title" align="center" eyebrow="FAQ" title="Common questions" />
        <div className="mt-10 flex flex-col gap-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-card bg-white open:shadow-soft">
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
