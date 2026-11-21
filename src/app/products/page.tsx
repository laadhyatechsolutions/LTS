import type { Metadata } from "next";
import { Check } from "lucide-react";
import { productFaqs, productList } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb, FaqList } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Products — LTS BizOS & WhatsApp CRM",
  description: "Ready-made software from Laadhya Tech Solutions: LTS BizOS to run your whole company, and WhatsApp CRM to manage leads from WhatsApp.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
          <h1 className="max-w-4xl font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">
            Ready-made software you can start using this week
          </h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">
            Two products built by LTS, proven in real businesses and customisable to yours.
          </p>
          <nav aria-label="Products" className="flex flex-wrap gap-2">
            {productList.map((p) => (
              <a key={p.slug} href={`#${p.slug}`} className="inline-flex min-h-10 items-center rounded-full border border-ink/15 px-4 text-[14px] font-semibold text-ink hover:border-ink hover:bg-ink hover:text-white">
                {p.name}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {productList.map((p, i) => (
        <section key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-title`} className={`scroll-mt-24 py-20 md:py-28 ${i % 2 ? "bg-mist-50" : ""}`}>
          <Container className="grid items-start gap-10 lg:grid-cols-2">
            <div className={`flex flex-col gap-5 ${i % 2 ? "lg:order-2" : ""}`}>
              <h2 id={`${p.slug}-title`} className="font-display text-[44px] font-bold leading-none text-ink md:text-[60px]">{p.name}</h2>
              <p className="font-display text-[26px] font-bold leading-tight text-lime-800">{p.tagline}</p>
              <p className="text-[17px] leading-relaxed text-gray-700">{p.intro}</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.modules.map((m) => (
                  <li key={m.title} className="flex flex-col gap-1 rounded-card bg-white p-4">
                    <h3 className="font-display text-[22px] font-bold leading-none text-ink">{m.title}</h3>
                    <p className="text-[14px] text-gray-600">{m.text}</p>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-2 text-[16px] text-ink">
                {p.whoFor.map((w) => (
                  <li key={w} className="flex items-start gap-2">
                    <Check className="mt-1 size-4 shrink-0 text-lime-800" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] text-gray-600">
                Starting from <span className="text-[26px] font-bold text-ink">{p.price}</span>
              </p>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact" variant="ink">Book a demo</Button>
                <Button href="/get-quote" variant="outline">Get a quote</Button>
              </div>
            </div>
            <ImageSlot file={`products/${p.slug}`} label={`${p.name} screenshot`} alt={`${p.name} screenshot`} sizes="(min-width: 768px) 560px, 100vw" className="aspect-[4/3] w-full" />
          </Container>
        </section>
      ))}

      <FaqList faqs={productFaqs} />
      <FinalCta />
    </>
  );
}
