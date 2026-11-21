"use client";

import Link from "next/link";
import { useState } from "react";
import { caseStudies } from "@/data/portfolio";
import { hubCategories } from "@/data/services-hub";
import { allIndustries } from "@/data/home";
import { SlotImage } from "@/components/ui/Placeholder";

const ALL = "All";

function Chips({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-gray-600">{label}</span>
      {[ALL, ...options].map((o) => (
        <button
          key={o}
          type="button"
          aria-pressed={value === o}
          onClick={() => onChange(o)}
          className={`min-h-10 rounded-full border px-4 text-[14px] font-semibold transition-colors ${value === o ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** covers: slug → image URL (or null), found on the server from public/portfolio/<slug>.jpg */
export function PortfolioGrid({ covers = {} }: { covers?: Record<string, string | null> }) {
  const [service, setService] = useState(ALL);
  const [industry, setIndustry] = useState(ALL);
  const nameOf = (slug: string) => hubCategories.find((c) => c.slug === slug)?.name ?? slug;
  const shown = caseStudies.filter(
    (c) => (service === ALL || nameOf(c.category) === service) && (industry === ALL || c.industry === industry),
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Chips label="Service" options={hubCategories.map((c) => c.name)} value={service} onChange={setService} />
        <Chips label="Industry" options={[...allIndustries]} value={industry} onChange={setIndustry} />
      </div>
      <p aria-live="polite" className="text-[14px] text-gray-600">
        Showing {shown.length} of {caseStudies.length} projects
      </p>
      {shown.length === 0 ? (
        <p className="rounded-card border-2 border-dashed border-ink p-8 text-center text-gray-700">
          No projects match these filters yet.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/portfolio/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-card bg-white transition-all hover:-translate-y-1 hover:bg-mist-100 hover:shadow-soft"
              >
                <SlotImage src={covers[c.slug]} file={`portfolio/${c.slug}`} label="Project screenshot" sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" className="h-[200px] rounded-none border-0 border-b border-line" />
                <div className="flex flex-col gap-2 p-5">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-gray-600">
                    {c.industry} · {nameOf(c.category)}
                  </p>
                  <h2 className="font-display text-[27px] font-bold leading-[1.1] text-ink">{c.title}</h2>
                  <p className="text-[15px] text-gray-600">{c.summary}</p>
                  <p className="font-bold text-ink">{c.results[0]}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
