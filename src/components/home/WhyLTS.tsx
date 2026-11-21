import { BadgeIndianRupee, CalendarCheck, Layers, LifeBuoy, MapPin, Sparkles } from "lucide-react";
import { whyPoints } from "@/data/home";
import { Container } from "@/components/ui/Container";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { T } from "@/components/ui/T";

const icons = [Layers, MapPin, CalendarCheck, LifeBuoy, Sparkles, BadgeIndianRupee];

export function WhyLTS() {
  return (
    <section aria-labelledby="why-title" className="bg-mist-50 py-20 md:py-28">
      <Container className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="why-title"
            eyebrow={<T k="why.eyebrow">Why LTS</T>}
            title={<T k="why.title">One team to build it, automate it and grow it</T>}
            lead={<T k="why.lead">Development by LTS, marketing by Capture Media — no juggling vendors.</T>}
          />
          <ImageSlot file="team/office" label="Team or office photo" alt="The LTS team" sizes="560px" className="hidden h-[280px] lg:flex" />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {whyPoints.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} className="flex flex-col gap-3 rounded-card bg-white p-5">
                <span className="grid size-11 place-items-center rounded-[12px] border border-ink/10 bg-[#BFFF00]/20">
                  <Icon className="size-5 text-ink" aria-hidden="true" />
                </span>
                <h3 className="font-display text-[25px] font-bold leading-[1.1] text-ink">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{p.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
