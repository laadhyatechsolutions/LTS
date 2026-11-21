import type { Metadata } from "next";
import { CalendarCheck, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/forms/ContactForm";
import { Breadcrumb } from "@/components/services/ServiceParts";
import { OpenStatus } from "@/components/ui/OpenStatus";

export const metadata: Metadata = {
  title: "Contact us",
  description: `Talk to ${site.name} in Hyderabad — call, WhatsApp, email or send a message. We reply within one working day.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const c = site.contact;
  const rows = [
    { icon: Phone, label: "Call us", value: c.phone, href: c.phoneHref },
    { icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: "Visit us", value: c.address },
    { icon: Clock, label: "Office hours", value: c.hours, live: true },
  ];
  // The map appears automatically once a real address is set in src/config/site.ts
  const hasAddress = !c.address.includes("[");
  // Optional online calendar (Calendly, Cal.com, Google Calendar booking page…). Without one, the free AI audit page books a call.
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  const bookingIsExternal = !!bookingUrl && /^https:\/\//.test(bookingUrl);
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Let&apos;s talk</h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">
            Tell us what you need. We reply within one working day — or chat on WhatsApp for a faster answer.
          </p>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <div className="flex flex-col gap-5">
            <Button href={whatsappLink()} variant="lime" size="lg" external className="w-full">
              <MessageCircle className="size-5" aria-hidden="true" /> Chat on WhatsApp
            </Button>
            <div className="flex flex-col gap-3 rounded-card bg-ink p-5 text-white">
              <span className="grid size-11 place-items-center rounded-xl bg-white/10">
                <CalendarCheck className="size-5 text-[#BFD8A0]" aria-hidden="true" />
              </span>
              <h2 className="font-display text-[28px] font-bold leading-none">Prefer a call?</h2>
              <p className="text-[15px] text-gray-300">Pick a time that suits you — a free 15-minute call, no obligation.</p>
              <Button
                href={bookingIsExternal ? bookingUrl! : "/free-ai-audit"}
                variant="lime"
                external={bookingIsExternal}
                className="self-start"
              >
                Book a free call
              </Button>
            </div>
            <ul className="flex flex-col gap-4">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4 rounded-card bg-white p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-ink/10 bg-mist-100">
                    <r.icon className="size-5 text-ink" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">{r.label}</span>
                    {r.href ? (
                      <a href={r.href} className="text-[17px] font-semibold text-ink underline-offset-4 hover:underline">{r.value}</a>
                    ) : (
                      <span className="text-[17px] text-ink">{r.value}</span>
                    )}
                    {"live" in r && <OpenStatus tone="light" className="mt-1 text-[14px] font-semibold text-ink" />}
                  </div>
                </li>
              ))}
            </ul>
            {hasAddress ? (
              <div className="overflow-hidden rounded-card border border-line">
                <iframe
                  title={`Map: ${site.name} office`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(`${site.name}, ${c.address}`)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[260px] w-full border-0"
                />
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${c.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 border-t border-line bg-white py-3 text-[14px] font-semibold text-ink hover:bg-mist-50"
                >
                  <MapPin className="size-4" aria-hidden="true" /> Get directions
                </a>
              </div>
            ) : (
              <div className="grid min-h-[200px] place-items-center rounded-card border border-dashed border-ink/20 bg-mist-50 p-6 text-center text-[14px] text-gray-600">
                The map appears here automatically once the office address is added in src/config/site.ts
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
