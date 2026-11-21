"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { allIndustries } from "@/data/home";
import { Field, Honeypot, SuccessCard, inputClass } from "./fields";
import { Turnstile } from "./Turnstile";

const initial: EnquiryState = { ok: false };

/** Free AI audit request — saved and emailed like other enquiries, with kind "audit" */
export function AuditForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  if (state.ok) {
    return (
      <SuccessCard
        lead="audit"
        title="You're booked in!"
        text="We'll call or WhatsApp you within one working day to pick a 15-minute slot."
      />
    );
  }
  const e = state.errors ?? {};
  const v = state.values ?? {};
  return (
    <form key={JSON.stringify(v)} action={action} noValidate className="relative flex flex-col gap-4 rounded-card bg-white p-6 shadow-soft md:p-8">
      <input type="hidden" name="kind" value="audit" />
      <input type="hidden" name="service" value="Free AI audit" />
      <Honeypot />
      <Field label="Your name" htmlFor="a-name" error={e.name}>
        <input id="a-name" name="name" defaultValue={v.name} autoComplete="name" required aria-invalid={!!e.name} aria-describedby={e.name ? "a-name-error" : undefined} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" htmlFor="a-phone" error={e.phone}>
          <input id="a-phone" name="phone" defaultValue={v.phone} type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!e.phone} aria-describedby={e.phone ? "a-phone-error" : undefined} className={inputClass} />
        </Field>
        <Field label="Email (optional)" htmlFor="a-email" error={e.email}>
          <input id="a-email" name="email" defaultValue={v.email} type="email" autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "a-email-error" : undefined} className={inputClass} />
        </Field>
      </div>
      <Field label="Your industry" htmlFor="a-business">
        <select id="a-business" name="businessType" defaultValue="" className={inputClass}>
          <option value="">Choose one (optional)</option>
          {allIndustries.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </Field>
      <Field label="What eats up most of your team's time?" htmlFor="a-message">
        <textarea
          id="a-message"
          name="message"
          defaultValue={v.message}
          rows={3}
          placeholder="e.g. answering the same WhatsApp questions, typing invoices, following up leads…"
          className={`${inputClass} py-3`}
        />
      </Field>
      <Turnstile />
      {state.message && !state.ok && <p role="alert" className="text-[14px] font-semibold text-red-700">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-lime-500/60 bg-lime-400 px-7 text-base font-semibold text-ink transition-colors hover:bg-lime-300 disabled:opacity-60"
      >
        {pending ? "Booking…" : "Book my free AI audit"}
      </button>
      <p className="text-center text-[13px] text-gray-500">Free, no obligation. We’ll never share your details.</p>
    </form>
  );
}
