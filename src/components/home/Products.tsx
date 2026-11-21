import { products } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function Products() {
  return (
    <section aria-labelledby="products-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading id="products-title" eyebrow={<T k="products.eyebrow">Our products</T>} title={<T k="products.title">Ready-made software you can start using this week</T>} />
        <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-2">
          {products.map((p) => (
            <article key={p.name} className="flex flex-col gap-4 rounded-card bg-white p-6 md:p-7">
              <ImageSlot file={`products/${p.href.split("#")[1]}`} label={`${p.name} screenshot`} alt={`${p.name} screenshot`} sizes="(min-width: 768px) 560px, 100vw" className="h-[220px] md:h-[240px]" />
              <h3 className="font-display text-[34px] font-bold leading-none text-ink">{p.name}</h3>
              <p className="text-[16px] leading-relaxed text-gray-600">{p.text}</p>
              <div className="mt-auto flex flex-wrap gap-3 pt-2">
                <Button href="/contact" variant="ink">
                  <T k="products.demo">Book a demo</T>
                </Button>
                <Button href={p.href} variant="outline">
                  <T k="products.more">Learn more</T>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
