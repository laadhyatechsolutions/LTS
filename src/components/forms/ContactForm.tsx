"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { hubCategories } from "@/data/services-hub";
import { Field, Honeypot, SuccessCard, inputClass } from "./fields";
import { Turnstile } from "./Turnstile";

const initial: EnquiryState = { ok: false };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  if (state.ok) {
    return <SuccessCard lead="contact" title="Thank you!" text="We've received your message and will reply within one working day." />;
  }
  const e = state.errors ?? {};
  const v = state.values ?? {};
  return (
    // key: remount with the visitor's values after an error (React clears forms after each submit)
    <form key={JSON.stringify(v)} action={action} noValidate className="relative flex flex-col gap-4 rounded-card bg-white p-6 md:p-8">
      <input type="hidden" name="kind" value="contact" />
      <Honeypot />
      <Field label="Your name" htmlFor="c-name" error={e.name}>
        <input id="c-name" name="name" defaultValue={v.name} autoComplete="name" required aria-invalid={!!e.name} aria-describedby={e.name ? "c-name-error" : undefined} className={inputClass} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" htmlFor="c-phone" error={e.phone}>
          <input id="c-phone" name="phone" defaultValue={v.phone} type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={!!e.phone} aria-describedby={e.phone ? "c-phone-error" : undefined} className={inputClass} />
        </Field>
        <Field label="Email (optional)" htmlFor="c-email" error={e.email}>
          <input id="c-email" name="email" defaultValue={v.email} type="email" autoComplete="email" aria-invalid={!!e.email} aria-describedby={e.email ? "c-email-error" : undefined} className={inputClass} />
        </Field>
      </div>
      <Field label="Service you need" htmlFor="c-service" error={e.service}>
        <select id="c-service" name="service" required defaultValue={v.service ?? ""} aria-invalid={!!e.service} aria-describedby={e.service ? "c-service-error" : undefined} className={inputClass}>
          <option value="" disabled>Select a service</option>
          {hubCategories.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}</option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </Field>
      <Field label="Message (optional)" htmlFor="c-message">
        <textarea id="c-message" name="message" defaultValue={v.message} rows={4} className={`${inputClass} py-3`} />
      </Field>
      <Turnstile />
      {state.message && !state.ok && <p role="alert" className="text-[14px] font-semibold text-red-700">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-lime-500/60 bg-lime-400 px-7 text-base font-semibold text-ink transition-colors hover:bg-lime-300 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
