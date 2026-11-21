"use client";

import { useActionState } from "react";
import { updateLead, type SaveState } from "@/app/admin/actions";

const STATUSES = ["new", "contacted", "quoted", "won", "lost"];

/** Status + notes for one lead, with a visible "Saved" confirmation */
export function LeadForm({ id, status, notes }: { id: number; status: string; notes: string }) {
  const [state, action, pending] = useActionState(updateLead, {} as SaveState);
  return (
    <form action={action} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <label className="text-[13px] font-semibold text-ink" htmlFor={`st-${id}`}>Status</label>
      <select id={`st-${id}`} name="status" defaultValue={status} className="min-h-11 rounded-xl border border-ink/20 bg-white px-3 text-[15px] text-ink">
        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <label className="text-[13px] font-semibold text-ink" htmlFor={`nt-${id}`}>Your notes</label>
      <textarea id={`nt-${id}`} name="notes" rows={3} defaultValue={notes} className="rounded-xl border border-ink/20 bg-white px-3 py-2 text-[15px] text-ink" />
      <div className="flex items-center gap-3">
        <button type="submit" disabled={pending} className="min-h-11 rounded-full bg-ink px-5 font-semibold text-white hover:bg-ink-deep disabled:opacity-60">
          {pending ? "Saving…" : "Save"}
        </button>
        {state.saved && !pending && <span role="status" className="text-[14px] font-semibold text-lime-800">Saved ✓</span>}
        {state.error && <span role="alert" className="text-[14px] font-semibold text-red-700">{state.error}</span>}
      </div>
    </form>
  );
}
