"use client";

import { useEffect, type ReactNode } from "react";
import { track } from "@/lib/track";

export const inputClass =
  "min-h-12 w-full rounded-xl border border-ink/20 bg-white px-4 transition-colors hover:border-ink/40 focus:border-ink text-[16px] text-ink placeholder:text-gray-500";

export function Field({ label, error, children, htmlFor }: { label: string; error?: string; children: ReactNode; htmlFor: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[14px] font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-[13px] font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot — bots fill it, people never see it */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

export function SuccessCard({ title, text, lead }: { title: string; text: string; lead?: string }) {
  // Count a successful enquiry as a conversion (only sent if the visitor accepted analytics)
  useEffect(() => {
    if (lead) track("generate_lead", { form: lead });
  }, [lead]);
  return (
    <div role="status" className="flex flex-col gap-3 rounded-card border border-lime-500/40 bg-lime-50 p-8">
      <h2 className="font-display text-[40px] font-bold leading-none text-ink">{title}</h2>
      <p className="text-[17px] text-ink">{text}</p>
    </div>
  );
}
