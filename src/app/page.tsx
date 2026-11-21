import { Hero } from "@/components/home/Hero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { WhyLTS } from "@/components/home/WhyLTS";
import { Compare } from "@/components/home/Compare";
import { Products } from "@/components/home/Products";
import { Process } from "@/components/home/Process";
import { Industries } from "@/components/home/Industries";
import { Portfolio } from "@/components/home/Portfolio";
import { Packages } from "@/components/home/Packages";
import { Testimonials } from "@/components/home/Testimonials";
import { TechStack } from "@/components/home/TechStack";
import { Faq } from "@/components/home/Faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Reveal } from "@/components/ui/Reveal";

/** Homepage — layout and copy from docs/04-homepage-spec.md */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Reveal>
        <ServicesOverview />
      </Reveal>
      <Reveal>
        <WhyLTS />
      </Reveal>
      <Reveal>
        <Compare />
      </Reveal>
      <Reveal>
        <Products />
      </Reveal>
      <Reveal>
        <Process />
      </Reveal>
      <Reveal>
        <Industries />
      </Reveal>
      <Reveal>
        <Portfolio />
      </Reveal>
      <Reveal>
        <Packages />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <TechStack />
      </Reveal>
      <Reveal>
        <Faq />
      </Reveal>
      <FinalCta />
    </>
  );
}
