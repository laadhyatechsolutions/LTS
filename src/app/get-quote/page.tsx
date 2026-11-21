import type { Metadata } from "next";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { QuoteFormFromLink } from "@/components/forms/QuoteFormFromLink";
import { Breadcrumb } from "@/components/services/ServiceParts";

export const metadata: Metadata = {
  title: "Get a free quote",
  description: "Answer four quick questions and get a clear, fixed quote for your website, app, software, AI or marketing project.",
  alternates: { canonical: "/get-quote" },
};

export default function GetQuotePage() {
  return (
    <>
      <section className="border-b border-line bg-mist-50 py-14 md:py-20">
        <Container className="flex flex-col gap-4">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Get a free quote" }]} />
          <h1 className="font-display text-[48px] font-bold leading-none text-ink md:text-[72px]">Get a free quote</h1>
          <p className="max-w-2xl text-[17px] text-gray-600 md:text-[19px]">Four quick steps. Takes about a minute.</p>
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <Suspense fallback={<QuoteForm />}>
            <QuoteFormFromLink />
          </Suspense>
          <ul className="flex flex-col gap-3 self-start rounded-card bg-mist-100 p-6 text-[16px] text-ink">
            {["Free, no-obligation quote", "Reply within one working day", "Clear fixed price — no hidden costs [confirm]", "Talk to the team that will build it"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <Check className="mt-0.5 size-5 shrink-0 text-lime-800" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
