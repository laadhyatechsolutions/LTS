"use client";

import { useEffect } from "react";
import { rememberIndustry } from "@/lib/industry-memory";

/** Invisible: notes which industry page the visitor is on (used by the homepage hero) */
export function IndustryMemory({ slug }: { slug: string }) {
  useEffect(() => {
    rememberIndustry(slug);
  }, [slug]);
  return null;
}
