"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {} as LoginState);
  return (
    <form action={action} className="flex w-full max-w-sm flex-col gap-3">
      <label htmlFor="admin-password" className="text-[14px] font-semibold text-ink">Admin password</label>
      <input
        id="admin-password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="min-h-12 w-full rounded-xl border border-ink/20 bg-white px-4 text-[16px] text-ink focus:border-ink"
      />
      {state.error && <p role="alert" className="text-[14px] font-semibold text-red-700">{state.error}</p>}
      <button type="submit" disabled={pending} className="min-h-12 rounded-full bg-ink px-6 font-semibold text-white hover:bg-ink-deep disabled:opacity-60">
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
