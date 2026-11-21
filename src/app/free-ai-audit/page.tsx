import type { Metadata } from "next";
import { Bot, CalendarCheck, Check, ClipboardList, PhoneCall, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumb, FaqList } from "@/components/services/ServiceParts";
import { AuditForm } from "@/components/forms/AuditForm";

export const metadata: Metadata = {
  title: "Free 15-minute AI audit for your business",
  description:
    "Find out where AI and automation can save your team time. A free, no-obligation 15-minute call with Laadhya Tech Solutions, Hyderabad.",
  alternates: { canonical: "/free-ai-audit" },
};

const takeaways = [
  "The 3 tasks in your business most worth automating first",
  "Which tools fit — WhatsApp bots, CRM, document AI or simple automations",
  "A rough idea of effort and cost, so you can plan",
  "Honest advice — including when AI isn't worth it yet",
];

const examples: [Icon: typeof Bot, title: string, text: string][] = [
  [Bot, "Answering repeat questions", "A WhatsApp assistant handles timings, prices and FAQs day and night."],
  [ClipboardList, "Typing data from documents", "AI reads invoices, forms and IDs straight into your system."],
  [CalendarCheck, "Chasing follow-ups", "Reminders for leads, payments and appointments go out on their own."],
];

const steps: [title: string, text: string][] = [
  ["Book", "Fill in the short form — it takes under a minute."],
  ["15-minute call", "We ask how your day-to-day work runs. No slides, no jargon."],
  ["Your action list", "You get a short written summary of what to automate first."],
];

const faqs = [
  { q: "Is it really free?", a: "Yes. The call and the summary are free and there's no obligation to buy anything." },
  { q: "Do I need to know anything about AI?", a: "Not at all. Just tell us how your business works today — we'll translate that into practical options." },
  { q: "Is it only for big companies?", a: "No. Most of our audits are for small and growing businesses, clinics, institutes and shops." },
];

export default function FreeAiAuditPage() {
  return (
    <>
      <section className="border-b border-line bg-ink">
        <Container className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-16">
          <div className="flex flex-col gap-5 lg:sticky lg:top-28">
            <div className="[&_a:hover]:text-white [&_nav]:text-gray-400 [&_span[aria-current]]:text-white">
              <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Free AI audit" }]} />
            </div>
            <p className="inline-flex items-center gap-2 self-start rounded-full bg-[#BFFF00] px-3.5 py-1.5 text-[13px] font-semibold text-ink">
              <Sparkles className="size-4" aria-hidden="true" />
              Free · 15 minutes · No obligation
            </p>
            <h1 className="text-balance font-display text-[48px] font-bold leading-[0.98] text-white md:text-[72px]">
              Where could AI save your team hours every week?
            </h1>
            <p className="max-w-xl text-[17px] leading-[1.65] text-gray-300 md:text-[18px]">
              Book a free 15-minute AI audit. We’ll look at how your business runs and show you exactly what’s worth automating — and what isn’t.
            </p>
            <ul className="flex flex-col gap-3">
              {takeaways.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] text-white">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-lime-400">
                    <Check className="size-4 text-ink" aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="inline-flex items-center gap-2 text-[14px] text-gray-400">
              <PhoneCall className="size-4" aria-hidden="true" />
              On a call or WhatsApp video — whichever suits you.
            </p>
          </div>
          <AuditForm />
        </Container>
      </section>

      <section aria-labelledby="examples-title" className="py-20 md:py-28">
        <Container>
          <SectionHeading id="examples-title" eyebrow="Typical finds" title="What we often uncover" />
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {examples.map(([Icon, title, text]) => (
              <li key={title} className="flex flex-col gap-3 rounded-card border border-line bg-white p-6">
                <span className="grid size-11 place-items-center rounded-[12px] border border-ink/10 bg-[#BFFF00]/20">
                  <Icon className="size-5 text-ink" aria-hidden="true" />
                </span>
                <h3 className="font-display text-[26px] font-bold leading-[1.05] text-ink">{title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="steps-title" className="bg-mist-50 py-20 md:py-28">
        <Container>
          <SectionHeading id="steps-title" eyebrow="How it works" title="Three simple steps" />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(([title, text], i) => (
              <li key={title} className="flex flex-col gap-2 border-t-2 border-ink pt-5">
                <span className="text-[13px] font-semibold text-gray-500">Step {i + 1}</span>
                <h3 className="font-display text-[28px] font-bold leading-none text-ink">{title}</h3>
                <p className="text-[15px] leading-relaxed text-gray-600">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <FaqList faqs={faqs} />
    </>
  );
}
