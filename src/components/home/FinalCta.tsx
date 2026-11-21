import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageWhatsAppButton } from "@/components/ui/PageWhatsApp";
import { T } from "@/components/ui/T";

export function FinalCta() {
  return (
    <Reveal as="section" aria-labelledby="cta-title" className="border-t border-line bg-violet-50 py-16 md:py-20">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 id="cta-title" className="font-display text-[40px] font-bold leading-[1.02] text-ink md:text-[56px]">
            <T k="final.title">Got an idea? Let&apos;s make it real.</T>
          </h2>
          <p className="text-[17px] text-gray-700 md:text-[19px]"><T k="final.sub">Free consultation. Reply within one working day.</T></p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/get-quote" variant="ink" size="lg">
            <T k="cta.quote">Get a free quote</T>
          </Button>
          <PageWhatsAppButton variant="white" size="lg">
            <T k="cta.whatsapp">Chat on WhatsApp</T>
          </PageWhatsAppButton>
        </div>
      </Container>
    </Reveal>
  );
}
