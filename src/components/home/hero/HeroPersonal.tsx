"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { heroByIndustry } from "@/data/home";
import { forgetIndustry, useRememberedIndustry } from "@/lib/industry-memory";
import { useLang } from "@/i18n/useLang";

/** Hero sub-line: the industry-specific one for returning visitors, otherwise the default */
export function HeroSubline({ fallback }: { fallback: ReactNode }) {
  const slug = useRememberedIndustry();
  const lang = useLang();
  const match = slug && lang === "en" ? heroByIndustry[slug] : undefined;
  return <>{match ? match.line : fallback}</>;
}

/** "Showing ideas for healthcare · See all" — lets the visitor switch back */
export function HeroIndustryPill({ prefix }: { prefix: string }) {
  const slug = useRememberedIndustry();
  const lang = useLang();
  const match = slug && lang === "en" ? heroByIndustry[slug] : undefined;
  if (!slug || !match) return null;
  return (
    <p className="inline-flex max-w-full flex-wrap items-center gap-x-2 self-start rounded-full border border-white/15 bg-white/[0.06] py-1.5 pl-4 pr-1.5 text-[13px] text-gray-300">
      <span>
        {prefix} {match.name}.{" "}
        <Link href={`/industries/${slug}`} className="font-semibold text-[#BFD8A0] underline-offset-4 hover:underline">
          See solutions
        </Link>
      </span>
      <button
        type="button"
        onClick={forgetIndustry}
        aria-label="Show the general homepage message again"
        className="grid size-7 place-items-center rounded-full text-gray-400 hover:bg-white/10 hover:text-white"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </p>
  );
}
