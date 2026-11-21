import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { founderStory, mission, registrations, team, timeline, values } from "@/data/about";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCta } from "@/components/home/FinalCta";
import { Breadcrumb } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a Hyderabad team building software, AI and automation — with marketing delivered by our partner ${site.marketingPartner}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <h1 className="max-w-4xl font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">
            One team to build it, automate it and grow it
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-gray-600 md:text-[19px]">
            {site.name} is a Hyderabad technology company. We build websites, apps, software and AI — and grow them with {site.marketingPartner}.
          </p>
        </Container>
      </section>

      <section aria-labelledby="story-title" className="py-20 md:py-28">
        <Container className="grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <ImageSlot file="team/founder" label="Founder photo" alt={founderStory.name} sizes="(min-width: 768px) 420px, 100vw" priority className="aspect-[4/5] w-full" />
          <div className="flex flex-col gap-4">
            <SectionHeading id="story-title" eyebrow="Our story" title={`Hi, I'm ${founderStory.name}`} />
            <p className="font-semibold text-ink">{founderStory.role}</p>
            {founderStory.paragraphs.map((p) => (
              <p key={p} className="text-[17px] leading-relaxed text-gray-700">{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="mission-title" className="bg-mist-50 py-20 md:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          <h2 id="mission-title" className="sr-only">Mission and vision</h2>
          {[{ k: "Mission", v: mission.mission }, { k: "Vision", v: mission.vision }].map((m) => (
            <div key={m.k} className="flex flex-col gap-3 rounded-card bg-white p-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">{m.k}</p>
              <p className="font-display text-[32px] font-bold leading-[1.1] text-ink">{m.v}</p>
            </div>
          ))}
        </Container>
      </section>

      <section aria-labelledby="values-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading id="values-title" eyebrow="What we stand for" title="Our values" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="flex flex-col gap-2 rounded-card bg-white p-6">
                <span className="grid size-9 place-items-center rounded-full border border-ink/10 bg-[#BFFF00]/30 font-display text-[20px] font-bold text-ink">{i + 1}</span>
                <h3 className="font-display text-[26px] font-bold leading-none text-ink">{v.title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="team-title" className="bg-mist-50 py-20 md:py-28">
        <Container>
          <SectionHeading id="team-title" eyebrow="The team" title="The people behind LTS" />
          <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {team.map((m, i) => (
              <li key={i} className="flex flex-col gap-3">
                <ImageSlot file={`team/member-${i + 1}`} label="Team photo" alt={m.name.startsWith("[") ? "" : m.name} sizes="(min-width: 1024px) 280px, 50vw" className="aspect-square w-full" />
                <div>
                  <p className="font-semibold text-ink">{m.name}</p>
                  <p className="text-[14px] text-gray-600">{m.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="timeline-title" className="py-20 md:py-28">
        <Container className="max-w-[880px]">
          <SectionHeading id="timeline-title" eyebrow="Our journey" title="How we got here" />
          <ol className="mt-10 flex flex-col gap-4 border-l-2 border-ink pl-6">
            {timeline.map((t, i) => (
              <li key={i} className="relative flex flex-col gap-1 rounded-card bg-white p-5">
                <span aria-hidden="true" className="absolute -left-[34px] top-6 size-4 rounded-full border border-ink/20 bg-lime-400" />
                <span className="font-display text-[26px] font-bold leading-none text-ink">{t.year}</span>
                <span className="text-[16px] text-gray-700">{t.text}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="capture-title" className="bg-ink py-16 md:py-24">
        <Container className="flex flex-col gap-4 md:max-w-3xl">
          <h2 id="capture-title" className="font-display text-[40px] font-bold leading-[1.02] text-white md:text-[56px]">
            LTS + {site.marketingPartner}
          </h2>
          <p className="text-[17px] leading-relaxed text-gray-300 md:text-[19px]">
            We build the product; our sister agency {site.marketingPartner} brings the customers — SEO, ads, social media and content. One plan, no juggling vendors.
          </p>
          <div>
            <Button href="/services/digital-marketing" variant="lime">See marketing services</Button>
          </div>
        </Container>
      </section>

      <section aria-labelledby="office-title" className="py-20 md:py-28">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <SectionHeading id="office-title" eyebrow="Visit us" title="Our Hyderabad office" />
            <p className="flex items-start gap-2 text-[17px] text-gray-700">
              <MapPin className="mt-1 size-5 shrink-0 text-lime-800" aria-hidden="true" />
              {site.contact.address}
            </p>
            <p className="text-[16px] text-gray-600">{site.contact.hours}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/contact">Contact us</Button>
              <Button href={whatsappLink()} variant="white" external>Chat on WhatsApp</Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-card bg-white p-6">
            <h3 className="font-display text-[28px] font-bold leading-none text-ink">Company details</h3>
            <dl className="flex flex-col gap-3">
              {registrations.map((r) => (
                <div key={r.label} className="flex flex-col border-t-2 border-mist-200 pt-3">
                  <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">{r.label}</dt>
                  <dd className="text-[16px] text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}
