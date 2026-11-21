"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Zap } from "lucide-react";
import { fastTrack, projectTypes, type Range } from "@/data/estimator";
import { whatsappLink } from "@/config/site";
import { buttonClass } from "@/components/ui/Button";

const inr = (n: number) => "₹" + Math.round(n / 1000).toLocaleString("en-IN") + "k";

function sum(ranges: Range[]): Range {
  if (ranges.some((r) => r === null)) return null;
  return (ranges as [number, number][]).reduce<[number, number]>((acc, r) => [acc[0] + r[0], acc[1] + r[1]], [0, 0]);
}

/** Pick a project, add features, choose speed → indicative range, then send it to the team */
export function CostEstimator() {
  const [typeSlug, setTypeSlug] = useState(projectTypes[0].slug);
  const [picked, setPicked] = useState<string[]>([]);
  const [fast, setFast] = useState(false);
  const type = projectTypes.find((t) => t.slug === typeSlug)!;

  const { price, weeks } = useMemo(() => {
    const chosen = type.features.filter((f) => picked.includes(f.name));
    let p = sum([type.base, ...chosen.map((f) => f.add)]);
    let w = type.weeks;
    if (fast && p) p = [p[0] * (1 + fastTrack.pricePct / 100), p[1] * (1 + fastTrack.pricePct / 100)];
    if (fast && w) w = [Math.max(1, Math.round(w[0] * (1 + fastTrack.timePct / 100))), Math.max(1, Math.round(w[1] * (1 + fastTrack.timePct / 100)))];
    return { price: p, weeks: w };
  }, [type, picked, fast]);

  const priceText = price ? `${inr(price[0])} – ${inr(price[1])}` : "₹[min] – ₹[max]";
  const weeksText = weeks ? `${weeks[0]}–${weeks[1]} weeks` : "[x–y] weeks";
  const summary = `Hi LTS, I used your cost estimator.\nProject: ${type.name}\nFeatures: ${picked.length ? picked.join(", ") : "basic"}\nSpeed: ${fast ? "fast-track" : "standard"}\nEstimate shown: ${priceText}, ${weeksText}.\nCan you give me an exact quote?`;

  const choose = (slug: string) => {
    setTypeSlug(slug);
    setPicked([]);
  };
  const toggle = (name: string) => setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
      <div className="flex flex-col gap-10">
        <fieldset>
          <legend className="font-display text-[30px] font-bold leading-none text-ink">1. What do you need?</legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projectTypes.map((t) => {
              const on = t.slug === typeSlug;
              return (
                <label key={t.slug} className={`flex cursor-pointer flex-col gap-1 rounded-[14px] border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-violet-600 ${on ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}>
                  <input type="radio" name="type" value={t.slug} checked={on} onChange={() => choose(t.slug)} className="sr-only" />
                  <span className="font-semibold">{t.name}</span>
                  <span className={`text-[13px] ${on ? "text-gray-300" : "text-gray-600"}`}>{t.line}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-[30px] font-bold leading-none text-ink">2. Add features</legend>
          <p className="mt-2 text-[14px] text-gray-600">Optional — pick anything you know you’ll want.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {type.features.map((f) => {
              const on = picked.includes(f.name);
              return (
                <label key={f.name} className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-[14px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-violet-600 ${on ? "border-ink bg-lime-100 text-ink" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}>
                  <input type="checkbox" checked={on} onChange={() => toggle(f.name)} className="sr-only" />
                  <span className={`grid size-5 place-items-center rounded-full ${on ? "bg-ink text-white" : "border border-ink/25"}`}>
                    {on && <Check className="size-3.5" aria-hidden="true" />}
                  </span>
                  {f.name}
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-[30px] font-bold leading-none text-ink">3. How fast?</legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { v: false, title: "Standard", text: "Best value, planned in clear milestones" },
              { v: true, title: "Fast-track", text: "Bigger team, earlier launch" },
            ].map((o) => {
              const on = fast === o.v;
              return (
                <label key={o.title} className={`flex cursor-pointer items-start gap-3 rounded-[14px] border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-violet-600 ${on ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`}>
                  <input type="radio" name="speed" checked={on} onChange={() => setFast(o.v)} className="sr-only" />
                  {o.v && <Zap className={`mt-0.5 size-5 ${on ? "text-lime-300" : "text-lime-700"}`} aria-hidden="true" />}
                  <span className="flex flex-col gap-0.5">
                    <span className="font-semibold">{o.title}</span>
                    <span className={`text-[13px] ${on ? "text-gray-300" : "text-gray-600"}`}>{o.text}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <aside aria-live="polite" className="flex flex-col gap-5 rounded-card bg-ink p-6 text-white lg:sticky lg:top-28 md:p-8">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#BFD8A0]">Your estimate</p>
        <div>
          <p className="font-display text-[48px] font-bold leading-none md:text-[56px]">{priceText}</p>
          <p className="mt-2 text-[15px] text-gray-300">Typical timeline: {weeksText}</p>
        </div>
        <ul className="flex flex-col gap-2 border-t border-white/10 pt-5 text-[14px]">
          <li className="flex items-center gap-2"><Check className="size-4 text-lime-400" aria-hidden="true" />{type.name}</li>
          {picked.map((p) => (
            <li key={p} className="flex items-center gap-2"><Check className="size-4 text-lime-400" aria-hidden="true" />{p}</li>
          ))}
          {fast && <li className="flex items-center gap-2"><Zap className="size-4 text-lime-400" aria-hidden="true" />Fast-track delivery</li>}
        </ul>
        <div className="flex flex-col gap-3">
          <Link href="/get-quote" className={buttonClass("lime", "md", "w-full")}>
            Get my exact quote <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className={buttonClass("outline-light", "md", "w-full")}>
            Send this on WhatsApp
          </a>
        </div>
        <p className="text-[12px] leading-relaxed text-gray-400">
          Indicative only — your final quote depends on details we’ll confirm together. GST extra where applicable.
        </p>
      </aside>
    </div>
  );
}
