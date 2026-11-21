import { Star } from "lucide-react";
import { testimonials } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { findImage } from "@/lib/images";
import { ImageSlot } from "@/components/ui/ImageSlot";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-mist-50 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="testimonials-title" eyebrow={<T k="testimonials.eyebrow">Testimonials</T>} title={<T k="testimonials.title">What our clients say</T>} />
          <ImageSlot file="badges/google-rating" label="Google rating badge" alt="Google rating" fit="contain" sizes="224px" className="h-16 w-56 self-start md:self-auto [&>svg]:hidden" />
        </div>
        <ul className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col gap-4 rounded-card bg-white p-6">
                <span className="flex text-ink" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-lime-400" aria-hidden="true" />
                  ))}
                </span>
                <blockquote className="text-[16px] leading-relaxed text-gray-700">“{t.quote}”</blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  {(() => {
                    const photo = findImage(`testimonials/person-${i + 1}`);
                    return photo ? (
                      <Image src={photo} alt="" width={88} height={88} className="size-11 rounded-full object-cover" />
                    ) : (
                      <span aria-hidden="true" className="size-11 rounded-full border border-ink/10 bg-mist-100" />
                    );
                  })()}
                  <span>
                    <span className="block font-semibold text-ink">{t.name}</span>
                    <span className="block text-[13px] text-gray-600">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
