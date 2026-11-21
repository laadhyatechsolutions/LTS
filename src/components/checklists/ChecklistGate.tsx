"use client";

import { useSyncExternalStore } from "react";
import { Check, Lock, Printer } from "lucide-react";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import type { ChecklistItem } from "@/data/checklists";

const KEY = "lts-unlocked-checklists";
const EVENT = "lts-checklist-unlocked";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
};
const snapshot = () => localStorage.getItem(KEY) ?? "[]";

function remember(slug: string) {
  try {
    localStorage.setItem(KEY, JSON.stringify([...new Set([...read(), slug])]));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

function Row({ n, item }: { n: number; item: ChecklistItem }) {
  return (
    <li className="flex gap-4 rounded-card border border-line bg-white p-5 print:break-inside-avoid">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/10 bg-[#BFFF00]/30 font-display text-[20px] font-bold text-ink">{n}</span>
      <div className="flex flex-col gap-1">
        <h3 className="flex items-start gap-2 text-[17px] font-semibold leading-snug text-ink">
          <Check className="mt-1 size-4 shrink-0 text-lime-800 print:hidden" aria-hidden="true" />
          {item[0]}
        </h3>
        <p className="text-[15px] leading-relaxed text-gray-600">{item[1]}</p>
      </div>
    </li>
  );
}

/**
 * The first 3 items are free. The rest unlock with an email (saved as a subscriber, checklist link emailed).
 * It is a soft gate on purpose: the link in the email (?open=1) and returning visitors skip the form.
 */
export function ChecklistGate({ slug, items, freeCount = 3 }: { slug: string; items: ChecklistItem[]; freeCount?: number }) {
  const stored = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const fromLink = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("open") === "1",
    () => false,
  );
  const unlocked = fromLink || (JSON.parse(stored) as string[]).includes(slug);

  return (
    <div className="flex flex-col gap-4">
      <ol className="flex flex-col gap-3">
        {items.slice(0, freeCount).map((it, i) => (
          <Row key={it[0]} n={i + 1} item={it} />
        ))}
        {unlocked && items.slice(freeCount).map((it, i) => <Row key={it[0]} n={freeCount + i + 1} item={it} />)}
      </ol>

      {!unlocked ? (
        <div className="relative overflow-hidden rounded-card border border-line bg-mist-50 p-6 md:p-8 print:hidden">
          <div aria-hidden="true" className="mb-5 flex flex-col gap-2 opacity-60 blur-[2px]">
            {items.slice(freeCount, freeCount + 2).map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-white" />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 font-display text-[28px] font-bold leading-none text-ink">
              <Lock className="size-5" aria-hidden="true" /> Unlock the other {items.length - freeCount} items
            </p>
            <p className="text-[15px] text-gray-600">Enter your email to see the full checklist. We’ll also send you the link so you can come back to it. No spam.</p>
            <NewsletterForm
              checklist={slug}
              light
              button="Unlock the checklist"
              successText="Unlocked! We’ve also emailed you the link."
              onDone={() => remember(slug)}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 bg-white px-5 font-semibold text-ink hover:border-ink"
          >
            <Printer className="size-4" aria-hidden="true" /> Print or save as PDF
          </button>
          <span className="text-[14px] text-gray-600">Tip: choose “Save as PDF” in the print window.</span>
        </div>
      )}
    </div>
  );
}
