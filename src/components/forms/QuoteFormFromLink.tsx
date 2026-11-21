"use client";

import { useSearchParams } from "next/navigation";
import { hubCategories } from "@/data/services-hub";
import { QuoteForm } from "./QuoteForm";

/** Reads ?service=<category-slug> (e.g. /get-quote?service=ai-solutions) and pre-selects it */
export function QuoteFormFromLink() {
  const slug = useSearchParams().get("service");
  const name = hubCategories.find((c) => c.slug === slug)?.name ?? "";
  return <QuoteForm initialService={name} />;
}
