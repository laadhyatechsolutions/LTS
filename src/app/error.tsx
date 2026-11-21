"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageWhatsAppButton } from "@/components/ui/PageWhatsApp";

/** Friendly fallback if something on a page crashes — header, footer and WhatsApp keep working */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-mist-50 py-20 md:py-28">
      <Container className="flex max-w-[720px] flex-col items-center gap-5 text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">Something went wrong</p>
        <h1 className="text-balance font-display text-[40px] font-bold leading-none text-ink md:text-[56px]">
          This part of the page didn’t load
        </h1>
        <p className="text-[17px] leading-relaxed text-gray-600">
          Please try again. If it keeps happening, message us — we’ll help you right away and fix it.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => retry()}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink bg-ink px-6 font-semibold text-white transition-colors hover:bg-ink-deep"
          >
            <RotateCcw className="size-4" aria-hidden="true" /> Try again
          </button>
          <PageWhatsAppButton variant="outline">Message us on WhatsApp</PageWhatsAppButton>
          <Button href="/" variant="outline">Go to homepage</Button>
        </div>
      </Container>
    </section>
  );
}
