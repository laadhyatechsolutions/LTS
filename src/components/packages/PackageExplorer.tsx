"use client";

import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { compareExtras, packages, tiers } from "@/data/packages";
import { Button } from "@/components/ui/Button";

export function PackageExplorer() {
  const [slug, setSlug] = useState(packages[0].slug);
  const pkg = packages.find((p) => p.slug === slug) ?? packages[0];

  return (
    <div className="flex flex-col gap-10">
      <div role="tablist" aria-label="Package type" className="flex gap-2 overflow-x-auto pb-1">
        {packages.map((p) => (
          <button
            key={p.slug}
            role="tab"
            id={`tab-${p.slug}`}
            aria-selected={p.slug === slug}
            aria-controls="package-panel"
            tabIndex={p.slug === slug ? 0 : -1}
            onClick={() => setSlug(p.slug)}
            onKeyDown={(e) => {
              const i = packages.findIndex((x) => x.slug === slug);
              const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
              if (next === null) return;
              e.preventDefault();
              const n = packages[(next + packages.length) % packages.length];
              setSlug(n.slug);
              document.getElementById(`tab-${n.slug}`)?.focus();
            }}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-[15px] font-semibold transition-colors ${p.slug === slug ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <div id="package-panel" role="tabpanel" aria-labelledby={`tab-${pkg.slug}`} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-[40px] font-bold leading-none text-ink md:text-[52px]">{pkg.name}</h2>
          <p className="text-[17px] text-gray-600">For: {pkg.for}</p>
        </div>

        <ul className="grid gap-6 pt-4 md:grid-cols-3">
          {tiers.map((t) => (
            <li key={t.key}>
              <article className={`relative flex h-full flex-col gap-4 rounded-card bg-white p-7 ${t.popular ? "border border-ink shadow-lift" : "border border-line"}`}>
                {t.popular && (
                  <span className="absolute -top-4 left-6 rounded-full bg-ink px-3 py-1 text-[12px] font-semibold text-lime-300">Most popular</span>
                )}
                <h3 className="font-display text-[30px] font-bold leading-none text-ink">{t.name}</h3>
                <p className="text-[15px] text-gray-600">
                  Starting from <span className="text-[28px] font-bold text-ink">{t.price}</span>
                </p>
                <p className="text-[14px] text-gray-600">{t.note}</p>
                <ul className="flex flex-col gap-2 text-[15px] text-gray-700">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check className="size-4 shrink-0 text-lime-800" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button href="/get-quote" variant={t.popular ? "ink" : "outline"} className="mt-auto">
                  Get this package
                </Button>
              </article>
            </li>
          ))}
        </ul>

        <div className="overflow-x-auto rounded-card bg-white">
          <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
            <caption className="sr-only">Compare {pkg.name} tiers</caption>
            <thead>
              <tr className="bg-mist-100">
                <th scope="col" className="p-4 font-semibold text-ink">What&apos;s included</th>
                {tiers.map((t) => (
                  <th key={t.key} scope="col" className="p-4 font-display text-[22px] font-bold text-ink">{t.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pkg.includes.map((item) => (
                <tr key={item} className="border-t-2 border-mist-200">
                  <th scope="row" className="p-4 font-semibold text-ink">{item}</th>
                  {tiers.map((t) => (
                    <td key={t.key} className="p-4"><Check className="size-5 text-lime-800" aria-label="Included" /></td>
                  ))}
                </tr>
              ))}
              {compareExtras.map((r) => (
                <tr key={r.label} className="border-t-2 border-mist-200">
                  <th scope="row" className="p-4 font-semibold text-ink">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i} className="p-4 text-gray-700">
                      {v === "—" ? <Minus className="size-5 text-gray-500" aria-label="Not included" /> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
