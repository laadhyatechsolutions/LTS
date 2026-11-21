"use client";

import { useActionState, useEffect } from "react";
import { Check } from "lucide-react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";
import { track } from "@/lib/track";
import { useT } from "@/i18n/useLang";

const initial: SubscribeState = { ok: false };

/** Footer email signup. Dark-background styling; works without JavaScript too. */
export function NewsletterForm({
  checklist,
  button = "Subscribe",
  successText = "You’re in! Check your inbox for a welcome note.",
  onDone,
  light = false,
}: {
  checklist?: string;
  button?: string;
  successText?: string;
  onDone?: () => void;
  /** light = for white backgrounds */
  light?: boolean;
}) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const inputId = `newsletter-email-${checklist ?? "footer"}`;
  const t = useT();
  // The footer form is translated; the checklist form passes its own texts
  const tr = (k: string, text: string) => (checklist ? text : t(k, text));

  useEffect(() => {
    if (!state.ok) return;
    track("generate_lead", { form: checklist ? `checklist-${checklist}` : "newsletter" });
    onDone?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once when the signup succeeds
  }, [state.ok]);

  if (state.ok) {
    return (
      <p role="status" className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-[15px] font-semibold ${light ? "border-lime-500/40 bg-lime-50 text-ink" : "border-[#BFD8A0]/40 bg-white/[0.05] text-white"}`}>
        <Check className={`size-5 shrink-0 ${light ? "text-lime-700" : "text-[#BFFF00]"}`} aria-hidden="true" />
        {tr("news.success", successText)}
      </p>
    );
  }
  return (
    <form action={action} className="flex flex-col gap-2" noValidate>
      {checklist && <input type="hidden" name="checklist" value={checklist} />}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={inputId} className="sr-only">Email address</label>
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          defaultValue={state.email ?? ""}
          placeholder="you@company.com"
          aria-invalid={!!state.message}
          aria-describedby={state.message ? `${inputId}-error` : undefined}
          className={`min-h-12 flex-1 rounded-full border px-5 text-[16px] ${light ? "border-ink/20 bg-white text-ink placeholder:text-gray-500 focus:border-ink" : "border-white/25 bg-white/[0.06] text-white placeholder:text-gray-400 focus:border-[#BFFF00]"}`}
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#BFFF00] px-6 font-semibold text-ink transition-colors hover:bg-lime-300 disabled:opacity-60"
        >
          {pending ? tr("news.sending", "Sending…") : tr("news.button", button)}
        </button>
      </div>
      {state.message && (
        <p id={`${inputId}-error`} role="alert" className={`text-[13px] font-semibold ${light ? "text-red-700" : "text-red-300"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
