"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { site } from "@/config/site";
import { checklists } from "@/data/checklists";
import { config, emailTeamSubscriber, emailWelcome, hasDatabase, hasEmail, saveSubscriber } from "@/lib/leads";

export type SubscribeState = { ok: boolean; message?: string; email?: string };

/* Same idea as the enquiry form: 5 signups per visitor per 10 minutes, kept in server memory. */
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

/** Footer newsletter signup: validate → save to Supabase (or email the team) → welcome email. */
export async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  if (String(formData.get("website") ?? "").trim()) return { ok: true }; // honeypot

  // Optional: signing up to unlock an industry checklist
  const slug = String(formData.get("checklist") ?? "").trim();
  const checklist = slug in checklists ? slug : "";
  const source = checklist ? `checklist:${checklist}` : "newsletter";

  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 200);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, email, message: "Please enter a valid email address." };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { ok: false, email, message: "Too many tries — please wait a few minutes." };

  let page = "";
  try {
    page = new URL(h.get("referer") ?? "").pathname;
  } catch {}

  const db = hasDatabase();
  const mail = hasEmail();
  if (!db && !mail) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[subscribe] Supabase and Resend are not configured — signup NOT stored:", { email: "(provided)" });
      return { ok: true };
    }
    console.error("[subscribe] No storage or email configured in production — set the env vars in .env.example");
    return { ok: false, email, message: "Sorry, signup isn't working right now. Please try again later." };
  }

  try {
    if (db) await saveSubscriber(email, { page, userAgent: h.get("user-agent") ?? "", source });
    else await emailTeamSubscriber(email, page, source);
  } catch (err) {
    console.error("[subscribe] failed:", err);
    return { ok: false, email, message: "Sorry, we couldn't sign you up. Please try again." };
  }

  if (mail && config.autoReply) {
    const link = checklist ? { title: checklists[checklist].title, url: new URL(`/checklists/${checklist}?open=1`, site.url).toString() } : undefined;
    after(() => emailWelcome(email, link).catch((err) => console.error("[subscribe] welcome email failed:", err)));
  }
  return { ok: true };
}
