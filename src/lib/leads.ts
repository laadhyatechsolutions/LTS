/**
 * Server-only helpers for saving enquiries (Supabase) and emailing them (Resend).
 * Both use plain HTTPS calls, so no extra packages are needed.
 * Keys are read from environment variables — see .env.example and docs/05-forms-setup.md.
 * Never import this file from a client component: it uses secret keys.
 */
import { site } from "@/config/site";

export type Lead = {
  kind: "contact" | "quote" | "audit";
  name: string;
  phone: string;
  email: string;
  service: string;
  businessType: string;
  budget: string;
  timeline: string;
  message: string;
  page: string;
};

const env = (key: string) => process.env[key]?.trim() || "";

export const config = {
  supabaseUrl: env("SUPABASE_URL").replace(/\/+$/, ""),
  supabaseKey: env("SUPABASE_SERVICE_ROLE_KEY"),
  resendKey: env("RESEND_API_KEY"),
  /** Only for testing against a mock server; leave unset in real use */
  resendUrl: env("RESEND_API_URL") || "https://api.resend.com",
  emailFrom: env("LEADS_EMAIL_FROM"),
  emailTo: env("LEADS_EMAIL_TO")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  autoReply: env("LEADS_AUTO_REPLY") !== "false",
};

/** Cloudflare Turnstile check. Returns true when Turnstile isn't configured. */
export async function verifyTurnstile(token: string, ip: string) {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret, response: token, ...(ip && ip !== "unknown" ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    // If Cloudflare is unreachable, don't lose a real lead: allow it, but log it
    console.error("[enquiry] Turnstile verify failed:", err);
    return true;
  }
}

const kindLabel = (k: Lead["kind"]) => (k === "quote" ? "quote request" : k === "audit" ? "AI audit request" : "enquiry");

export const hasDatabase = () => Boolean(config.supabaseUrl && config.supabaseKey);
export const hasEmail = () => Boolean(config.resendKey && config.emailFrom && config.emailTo.length);

const TIMEOUT_MS = 8000;

/** Insert one row into the `leads` table. Throws on failure. */
export async function saveLead(lead: Lead, meta: { userAgent: string }) {
  const res = await fetch(`${config.supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: config.supabaseKey,
      Authorization: `Bearer ${config.supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      kind: lead.kind,
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      service: lead.service || null,
      business_type: lead.businessType || null,
      budget: lead.budget || null,
      timeline: lead.timeline || null,
      message: lead.message || null,
      page: lead.page || null,
      source: "website",
      user_agent: meta.userAgent.slice(0, 300) || null,
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase insert failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
}

async function sendEmail(payload: { to: string[]; subject: string; html: string; text: string; replyTo?: string }) {
  const res = await fetch(`${config.resendUrl}/emails`, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.emailFrom,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function rows(lead: Lead) {
  return [
    ["Type", lead.kind === "quote" ? "Quote request" : lead.kind === "audit" ? "Free AI audit" : "Contact form"],
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Service", lead.service],
    ["Business type", lead.businessType],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Message", lead.message],
    ["Sent from page", lead.page],
  ].filter(([, v]) => v) as [string, string][];
}

/** Alert the LTS team about a new lead. Throws on failure. */
export async function emailTeam(lead: Lead) {
  const r = rows(lead);
  const digits = lead.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${digits.length === 10 ? "91" + digits : digits}`;
  const html = `
<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:560px">
  <h2 style="margin:0 0 4px">New ${kindLabel(lead.kind)} from ${esc(lead.name)}</h2>
  <p style="margin:0 0 16px;color:#555">Reply within one working day — that's the promise on the site.</p>
  <table cellpadding="8" style="border-collapse:collapse;width:100%">
    ${r.map(([k, v]) => `<tr><td style="border-bottom:1px solid #eee;color:#555;width:140px;vertical-align:top">${esc(k)}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td></tr>`).join("")}
  </table>
  <p style="margin:20px 0 0">
    <a href="tel:${esc(lead.phone)}" style="background:#111;color:#fff;padding:10px 16px;border-radius:999px;text-decoration:none">Call ${esc(lead.name)}</a>
    &nbsp;
    <a href="${esc(wa)}" style="background:#25D366;color:#fff;padding:10px 16px;border-radius:999px;text-decoration:none">WhatsApp</a>
  </p>
</div>`;
  const text = r.map(([k, v]) => `${k}: ${v}`).join("\n");
  await sendEmail({
    to: config.emailTo,
    subject: `New ${kindLabel(lead.kind)}: ${lead.name}${lead.service ? ` — ${lead.service}` : ""}`,
    html,
    text,
    replyTo: lead.email || undefined,
  });
}

/** Thank-you email to the visitor (only when they gave an email). Throws on failure. */
export async function emailVisitor(lead: Lead) {
  if (!lead.email) return;
  const first = lead.name.split(/\s+/)[0];
  const html = `
<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:560px;line-height:1.6">
  <p>Hi ${esc(first)},</p>
  <p>Thanks for contacting ${esc(site.name)}. We've received your ${lead.kind === "contact" ? "message" : kindLabel(lead.kind)}${lead.service ? ` about <strong>${esc(lead.service)}</strong>` : ""} and will get back to you within one working day.</p>
  <p>Need a faster answer? Call us on <a href="${esc(site.contact.phoneHref)}">${esc(site.contact.phone)}</a> or message us on <a href="https://wa.me/${esc(site.contact.whatsappNumber)}">WhatsApp</a>.</p>
  <p>— Team ${esc(site.brand)}<br><span style="color:#666">${esc(site.tagline)}</span></p>
</div>`;
  const text = `Hi ${first},\n\nThanks for contacting ${site.name}. We've received your ${lead.kind === "contact" ? "message" : kindLabel(lead.kind)} and will get back to you within one working day.\n\nNeed a faster answer? Call ${site.contact.phone} or WhatsApp https://wa.me/${site.contact.whatsappNumber}\n\n— Team ${site.brand}`;
  await sendEmail({
    to: [lead.email],
    subject: `We've received your enquiry — ${site.name}`,
    html,
    text,
    replyTo: config.emailTo[0],
  });
}

/* ---------- Newsletter subscribers ---------- */

export const hasSubscribersTable = hasDatabase;

/** Add an email to the `subscribers` table. Already-subscribed emails are quietly ignored. */
export async function saveSubscriber(email: string, meta: { page: string; userAgent: string; source?: string }) {
  const res = await fetch(`${config.supabaseUrl}/rest/v1/subscribers?on_conflict=email`, {
    method: "POST",
    headers: {
      apikey: config.supabaseKey,
      Authorization: `Bearer ${config.supabaseKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=ignore-duplicates,return=minimal",
    },
    body: JSON.stringify({ email, page: meta.page || null, source: meta.source || "newsletter", user_agent: meta.userAgent.slice(0, 300) || null }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Supabase subscriber insert failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
}

/** Used only when there is no database: make sure the team still hears about the signup. */
export async function emailTeamSubscriber(email: string, page: string, source = "newsletter") {
  await sendEmail({
    to: config.emailTo,
    subject: `New ${source} signup: ${email}`,
    html: `<p style="font-family:Arial,sans-serif;font-size:15px">New ${esc(source)} signup: <b>${esc(email)}</b>${page ? ` (from ${esc(page)})` : ""}</p>`,
    text: `New ${source} signup: ${email}${page ? ` (from ${page})` : ""}`,
    replyTo: email,
  });
}

/** Welcome email to the new subscriber. With `checklist`, it also links to the checklist they asked for. */
export async function emailWelcome(email: string, checklist?: { title: string; url: string }) {
  const name = esc(site.name);
  const extraHtml = checklist
    ? `<p><a href="${esc(checklist.url)}" style="display:inline-block;background:#BFFF00;color:#111;font-weight:bold;padding:12px 22px;border-radius:999px;text-decoration:none">Open your checklist</a><br><span style="color:#666;font-size:13px">${esc(checklist.title)}</span></p>`
    : "";
  const extraText = checklist ? `Your checklist: ${checklist.title}\n${checklist.url}\n\n` : "";
  await sendEmail({
    to: [email],
    subject: `You're subscribed — ${site.name}`,
    html: `
<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;max-width:520px;line-height:1.6">
  <h2 style="margin:0 0 8px">Thanks for subscribing 👋</h2>
  ${extraHtml}
  <p>We'll send occasional, practical tips on websites, AI, automation and marketing for growing businesses — no spam.</p>
  <p>Have a project in mind? Just reply to this email or WhatsApp us on ${esc(site.contact.phone)}.</p>
  <p style="color:#666;font-size:13px">To unsubscribe at any time, reply with the word “unsubscribe”.<br>${name}, Hyderabad</p>
</div>`,
    text: `Thanks for subscribing!\n\n${extraText}We'll send occasional, practical tips on websites, AI, automation and marketing — no spam.\nHave a project in mind? Reply to this email or WhatsApp us on ${site.contact.phone}.\n\nTo unsubscribe, reply with "unsubscribe".\n${site.name}, Hyderabad`,
  });
}
