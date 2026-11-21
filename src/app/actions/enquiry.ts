"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { site } from "@/config/site";
import { emailTeam, emailVisitor, hasDatabase, hasEmail, config, saveLead, verifyTurnstile, type Lead } from "@/lib/leads";

export type EnquiryState = {
  ok: boolean;
  message?: string;
  errors?: Record<string, string>;
  /** What the visitor typed, so the form can refill itself after an error */
  values?: Record<string, string>;
};

const text = (fd: FormData, key: string, max = 2000) => String(fd.get(key) ?? "").trim().slice(0, max);

/* Best-effort rate limit: 5 enquiries per visitor per 10 minutes.
   It lives in server memory, so on serverless hosting it only slows bursts down;
   add Cloudflare Turnstile for real bot protection (see docs/05-forms-setup.md). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const fallback = `Please call ${site.contact.phone} or message us on WhatsApp instead.`;

/**
 * Handles both the contact form and the multi-step quote form:
 * validates → saves to Supabase → emails the team (Resend) → thank-you email to the visitor.
 * The visitor sees success if the lead was saved OR the team was emailed, so a lead is never silently lost.
 */
export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real users never fill this hidden field. Pretend it worked.
  if (text(formData, "website")) return { ok: true };

  const h = await headers();
  const referer = h.get("referer") ?? "";
  let page = "";
  try {
    page = referer ? new URL(referer).pathname : "";
  } catch {}

  const lead: Lead = {
    kind: (["quote", "audit"] as const).find((k) => k === text(formData, "kind", 20)) ?? "contact",
    name: text(formData, "name", 100),
    phone: text(formData, "phone", 20),
    email: text(formData, "email", 200),
    service: text(formData, "service", 100),
    businessType: text(formData, "businessType", 100),
    budget: text(formData, "budget", 100),
    timeline: text(formData, "timeline", 100),
    message: text(formData, "message"),
    page,
  };
  const values = { name: lead.name, phone: lead.phone, email: lead.email, service: lead.service, message: lead.message };

  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (lead.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a valid phone number (10 digits).";
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = "Enter a valid email address.";
  if (!lead.service) errors.service = "Please choose a service.";
  if (Object.keys(errors).length) return { ok: false, errors, values, message: "Please fix the highlighted fields." };

  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { ok: false, values, message: `You've sent several messages in a short time. ${fallback}` };
  }
  if (!(await verifyTurnstile(text(formData, "cf-turnstile-response", 4096), ip))) {
    return { ok: false, values, message: "Please complete the quick security check above, then send again." };
  }

  const db = hasDatabase();
  const mail = hasEmail();

  // Nothing configured yet (local development): log it so the form can still be tested.
  if (!db && !mail) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[enquiry] Supabase and Resend are not configured — enquiry NOT stored or emailed:", {
        ...lead,
        phone: "***" + lead.phone.slice(-3),
        email: lead.email ? "(provided)" : "",
      });
      return { ok: true };
    }
    console.error("[enquiry] No storage or email configured in production — set the env vars in .env.example");
    return { ok: false, values, message: `Sorry, our form isn't working right now. ${fallback}` };
  }

  const [saved, alerted] = await Promise.allSettled([
    db ? saveLead(lead, { userAgent: h.get("user-agent") ?? "" }) : Promise.reject(new Error("database not configured")),
    mail ? emailTeam(lead) : Promise.reject(new Error("email not configured")),
  ]);
  if (saved.status === "rejected" && db) console.error("[enquiry] save failed:", saved.reason);
  if (alerted.status === "rejected" && mail) console.error("[enquiry] team email failed:", alerted.reason);

  if (saved.status === "rejected" && alerted.status === "rejected") {
    return { ok: false, values, message: `Sorry, we couldn't send your message. ${fallback}` };
  }

  // The thank-you email doesn't need to hold up the visitor's success screen.
  if (mail && config.autoReply && lead.email) {
    after(() => emailVisitor(lead).catch((err) => console.error("[enquiry] auto-reply failed:", err)));
  }

  return { ok: true };
}
