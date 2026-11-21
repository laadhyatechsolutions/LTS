import type { Metadata } from "next";
import { ArrowRight, Briefcase, Mail, MapPin } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { hiringSteps, perks, roles } from "@/data/careers";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Careers — join our team in Hyderabad",
  description: `Work on real client products in web, mobile, AI and marketing at ${site.name}, Hyderabad. See open roles and internships.`,
  alternates: { canonical: "/careers" },
};

const applyHref = (role?: string) =>
  `mailto:${site.contact.email}?subject=${encodeURIComponent(`Application: ${role ?? "General application"}`)}`;

export default function CareersPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-5">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
          <h1 className="max-w-4xl text-balance font-display text-[48px] font-bold leading-[0.98] text-ink md:text-[72px]">
            Build things businesses actually use
          </h1>
          <p className="max-w-2xl text-[17px] leading-[1.65] text-gray-600 md:text-[19px]">
            We’re a growing team in Hyderabad shipping websites, apps, software, AI and marketing for real clients. If you like learning fast and owning your work, you’ll fit right in.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="#open-roles" size="lg">See open roles</Button>
            <Button href={applyHref()} variant="white" size="lg">Send your CV</Button>
          </div>
        </Container>
      </section>

      <Reveal as="section" aria-labelledby="why-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading id="why-title" eyebrow="Why LTS" title="What working here is like" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(([title, text], i) => (
              <li key={title} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6">
                <span className="grid size-10 place-items-center rounded-full bg-[#BFFF00]/30 font-display text-[20px] font-bold text-ink">{i + 1}</span>
                <h3 className="font-display text-[26px] font-bold leading-[1.05] text-ink">{title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      <section id="open-roles" aria-labelledby="roles-title" className="scroll-mt-28 bg-mist-50 py-20 md:py-28">
        <Container>
          <SectionHeading id="roles-title" eyebrow="Open roles" title="Current openings" lead="Don't see your role? Send a general application — we read every one." />
          {roles.length ? (
            <ul className="mt-10 flex flex-col gap-4">
              {roles.map((r) => (
                <li key={r.title}>
                  <article className="flex flex-col gap-4 rounded-card bg-white p-6 md:flex-row md:items-center md:justify-between md:p-7">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-[28px] font-bold leading-[1.05] text-ink">{r.title}</h3>
                      <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-gray-600">
                        <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4" aria-hidden="true" />{r.team}</span>
                        <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden="true" />{r.location}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${r.type === "Internship" ? "bg-violet-100 text-violet-900" : "bg-lime-100 text-lime-900"}`}>{r.type}</span>
                      </p>
                      <p className="max-w-2xl text-[15px] leading-relaxed text-gray-600">{r.summary}</p>
                    </div>
                    <Button href={applyHref(r.title)} variant="ink" className="self-start md:self-auto">
                      Apply <ArrowRight className="size-4" aria-hidden="true" />
                    </Button>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 rounded-card border border-dashed border-ink/20 bg-white p-8 text-center text-[16px] text-gray-600">
              No openings right now — but we’re always happy to hear from good people. Send your CV below.
            </p>
          )}
        </Container>
      </section>

      <Reveal as="section" aria-labelledby="process-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading id="process-title" eyebrow="How we hire" title="Simple, quick and respectful" />
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {hiringSteps.map(([step, text], i) => (
              <li key={step} className="flex flex-col gap-2 border-t-2 border-ink pt-5">
                <span className="text-[13px] font-semibold text-gray-500">Step {i + 1}</span>
                <h3 className="font-display text-[26px] font-bold leading-none text-ink">{step}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Reveal>

      <section aria-labelledby="apply-title" className="pb-20 md:pb-28">
        <Container>
          <div className="flex flex-col gap-6 rounded-card bg-ink p-6 md:flex-row md:items-center md:justify-between md:p-10">
            <div className="flex flex-col gap-2">
              <h2 id="apply-title" className="font-display text-[36px] font-bold leading-none text-white md:text-[44px]">Ready to apply?</h2>
              <p className="inline-flex items-center gap-2 text-[16px] text-gray-300">
                <Mail className="size-4 text-[#BFD8A0]" aria-hidden="true" />
                Email your CV and portfolio to {site.contact.email}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={applyHref()} variant="lime">Email your CV</Button>
              <Button href={whatsappLink("Hi LTS, I'd like to apply for a job.")} variant="outline-light" external>Ask on WhatsApp</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
