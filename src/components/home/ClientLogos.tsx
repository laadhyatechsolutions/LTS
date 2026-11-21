import Image from "next/image";
import { Star } from "lucide-react";
import { findImage } from "@/lib/images";
import { clientLogos } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { T } from "@/components/ui/T";

/**
 * Proof strip under the hero: rating + client logo wall.
 * Client names render as muted wordmarks until logo files are added:
 * public/clients/client-1.svg (or .png/.webp) … client-6 — shown greyscale, colour on hover.
 */
export function ClientLogos() {
  return (
    <section aria-label="Our clients" className="border-b border-line bg-white py-10 md:py-12">
      <Container className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
        <div className="flex shrink-0 flex-col items-center gap-1.5 lg:items-start">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-gray-500">
            <T k="clients.label">Trusted by growing businesses</T>
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-600">
            <span className="flex text-lime-500" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </span>
            <span>[4.9] on Google · [00]+ reviews</span>
          </p>
        </div>
        <span aria-hidden="true" className="hidden h-10 w-px bg-line lg:block" />
        <ul className="grid w-full grid-cols-3 items-center gap-x-6 gap-y-5 md:grid-cols-6">
          {clientLogos.map((name, i) => {
            const logo = findImage(`clients/client-${i + 1}`);
            return (
              <li
                key={name}
                className="flex justify-center text-center font-display text-[22px] font-bold tracking-wide text-gray-500 transition-colors hover:text-ink"
              >
                {logo ? (
                  <Image src={logo} alt={name} width={140} height={48} className="h-10 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
                ) : (
                  <span aria-label={`${name} (logo placeholder)`}>{name}</span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
