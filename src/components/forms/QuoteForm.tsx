"use client";

import { useActionState, useState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { hubCategories } from "@/data/services-hub";
import { allIndustries } from "@/data/home";
import { Field, Honeypot, SuccessCard, inputClass } from "./fields";
import { Turnstile } from "./Turnstile";

const initial: EnquiryState = { ok: false };
const budgets = ["Under ₹[A]", "₹[A] – ₹[B]", "₹[B] – ₹[C]", "Above ₹[C]", "Not sure yet"];
const timelines = ["As soon as possible", "Within 1 month", "1–3 months", "Just exploring"];
const steps = ["Service", "Business", "Budget", "Contact"];

function Choice({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: (v: string) => void }) {
  return (
    <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors text-[16px] font-semibold text-ink has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-violet-600 ${checked ? "border-ink bg-lime-100" : "border-ink/15 bg-white hover:border-ink/40"}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
      {value}
    </label>
  );
}

/** initialService: a category name picked before arriving (e.g. from the homepage chips) — skips step 1 */
export function QuoteForm({ initialService = "" }: { initialService?: string }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [v, setV] = useState({ service: initialService, businessType: "", budget: "", timeline: "" });
  // Contact details are kept in state too, so a server error does not wipe what was typed
  const [c, setC] = useState({ name: "", phone: "", email: "", message: "" });
  const setField = (k: keyof typeof c) => (ev: { target: { value: string } }) => setC((p) => ({ ...p, [k]: ev.target.value }));
  const set = (k: keyof typeof v) => (val: string) => setV((p) => ({ ...p, [k]: val }));

  if (state.ok) {
    return <SuccessCard lead="quote" title="Quote request received!" text="Thank you — we'll review your needs and send a clear quote within one working day." />;
  }
  const e = state.errors ?? {};
  const canNext = step === 0 ? !!v.service : step === 1 ? !!v.businessType : step === 2 ? !!v.budget && !!v.timeline : true;
  // If the server rejects a field from an earlier step, show that step again
  const shownStep = e.service && step === 3 ? 0 : step;

  const options: Record<number, { name: keyof typeof v; legend: string; items: string[] }[]> = {
    0: [{ name: "service", legend: "What do you need?", items: [...hubCategories.map((c) => c.name), "Not sure yet"] }],
    1: [{ name: "businessType", legend: "What kind of business is it?", items: [...allIndustries, "Other"] }],
    2: [
      { name: "budget", legend: "Your budget", items: budgets },
      { name: "timeline", legend: "When do you want to start?", items: timelines },
    ],
  };

  return (
    <form action={action} noValidate className="relative flex flex-col gap-6 rounded-card bg-white p-6 md:p-8">
      <input type="hidden" name="kind" value="quote" />
      <Honeypot />
      {/* Chosen answers travel with the form so the server gets every step */}
      {(Object.keys(v) as (keyof typeof v)[]).map((k) => (
        <input key={k} type="hidden" name={k} value={v[k]} />
      ))}

      <ol className="flex gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} aria-current={i === shownStep ? "step" : undefined} className="flex-1">
            <span className={`block h-1.5 rounded-full ${i <= shownStep ? "bg-ink" : "bg-ink/10"}`} />
            <span className="mt-1 block text-[12px] font-semibold text-gray-600">{i + 1}. {s}</span>
          </li>
        ))}
      </ol>

      {shownStep < 3 &&
        options[shownStep].map((g) => (
          <fieldset key={g.name} className="flex flex-col gap-3">
            <legend className="mb-3 font-display text-[30px] font-bold leading-none text-ink">{g.legend}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {g.items.map((it) => (
                <Choice key={it} name={`pick-${g.name}`} value={it} checked={v[g.name] === it} onChange={set(g.name)} />
              ))}
            </div>
          </fieldset>
        ))}

      {shownStep === 3 && (
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-[30px] font-bold leading-none text-ink">Where should we send the quote?</h2>
          <Field label="Your name" htmlFor="q-name" error={e.name}>
            <input id="q-name" name="name" value={c.name} onChange={setField("name")} autoComplete="name" required aria-invalid={!!e.name} aria-describedby={e.name ? "q-name-error" : undefined} className={inputClass} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Phone / WhatsApp" htmlFor="q-phone" error={e.phone}>
              <input id="q-phone" name="phone" value={c.phone} onChange={setField("phone")} type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!e.phone} aria-describedby={e.phone ? "q-phone-error" : undefined} className={inputClass} />
            </Field>
            <Field label="Email (optional)" htmlFor="q-email" error={e.email}>
              <input id="q-email" name="email" value={c.email} onChange={setField("email")} type="email" autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "q-email-error" : undefined} className={inputClass} />
            </Field>
          </div>
          <Field label="Anything else we should know? (optional)" htmlFor="q-message">
            <textarea id="q-message" name="message" value={c.message} onChange={setField("message")} rows={3} className={`${inputClass} py-3`} />
          </Field>
          <Turnstile />
          {state.message && <p role="alert" className="text-[14px] font-semibold text-red-700">{state.message}</p>}
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        {shownStep > 0 ? (
          <button type="button" onClick={() => setStep(shownStep - 1)} className="min-h-12 rounded-full border border-ink/15 px-6 font-semibold text-ink hover:bg-mist-100">
            Back
          </button>
        ) : (
          <span />
        )}
        {shownStep < 3 ? (
          // Separate keys: React must swap in a new element. Reusing one button and flipping it to
          // type="submit" mid-click made "Next" on the last step submit the empty contact step.
          <button key="next" type="button" disabled={!canNext} onClick={() => setStep(shownStep + 1)} className="min-h-12 rounded-full border border-lime-500/60 bg-lime-400 px-7 font-semibold text-ink hover:bg-lime-300 disabled:opacity-50">
            Next
          </button>
        ) : (
          <button key="submit" type="submit" disabled={pending} className="min-h-12 rounded-full border border-lime-500/60 bg-lime-400 px-7 font-semibold text-ink hover:bg-lime-300 disabled:opacity-60">
            {pending ? "Sending…" : "Get my free quote"}
          </button>
        )}
      </div>
    </form>
  );
}
