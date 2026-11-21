/**
 * Server-only helpers for the /admin lead dashboard.
 * Access is one shared password (ADMIN_PASSWORD) → a signed, expiring, httpOnly cookie.
 * Data comes from Supabase with the service-role key, so it never reaches the browser except as rendered HTML.
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { config, hasDatabase } from "@/lib/leads";

export const COOKIE = "lts_admin";
const SESSION_DAYS = 7;

const password = () => process.env.ADMIN_PASSWORD?.trim() ?? "";
const secret = () => process.env.ADMIN_SESSION_SECRET?.trim() || password();

export const adminConfigured = () => password().length >= 8 && hasDatabase();

const sign = (payload: string) => createHmac("sha256", secret()).update(`lts-admin-v1:${payload}`).digest("hex");

export function checkPassword(input: string) {
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(password()).digest();
  return password().length > 0 && timingSafeEqual(a, b);
}

export function makeSession() {
  const exp = Date.now() + SESSION_DAYS * 86_400_000;
  return { value: `${exp}.${sign(String(exp))}`, maxAge: SESSION_DAYS * 86_400 };
}

export function validSession(value: string | undefined) {
  if (!value || !secret()) return false;
  const [exp, mac] = value.split(".");
  if (!exp || !mac || !/^\d+$/.test(exp) || Number(exp) < Date.now()) return false;
  const expected = sign(exp);
  if (mac.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(mac), Buffer.from(expected));
}

export async function isAdmin() {
  return adminConfigured() && validSession((await cookies()).get(COOKIE)?.value);
}

/* ---------- data ---------- */

export type LeadRow = {
  id: number;
  created_at: string;
  kind: "contact" | "quote" | "audit";
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  business_type: string | null;
  budget: string | null;
  timeline: string | null;
  message: string | null;
  page: string | null;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  notes: string | null;
};
export type SubscriberRow = { id: number; created_at: string; email: string; page: string | null; source: string | null; unsubscribed: boolean };

export const STATUSES = ["new", "contacted", "quoted", "won", "lost"] as const;

const headers = () => ({ apikey: config.supabaseKey, Authorization: `Bearer ${config.supabaseKey}` });

async function rest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${config.supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: { ...headers(), "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export const fetchLeads = (limit = 300) => rest<LeadRow[]>(`leads?select=*&order=created_at.desc&limit=${limit}`);
export const fetchSubscribers = (limit = 1000) => rest<SubscriberRow[]>(`subscribers?select=*&order=created_at.desc&limit=${limit}`);

export async function patchLead(id: number, fields: { status?: string; notes?: string }) {
  await rest(`leads?id=eq.${id}`, { method: "PATCH", body: JSON.stringify(fields), headers: { Prefer: "return=minimal" } });
}

/* ---------- CSV ---------- */

/** Quotes a cell; also neutralises spreadsheet formulas (=, +, -, @) so a hostile "name" can't run in Excel. */
export function csvCell(v: unknown) {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}
export const toCsv = (cols: string[], rows: Record<string, unknown>[]) =>
  [cols.map(csvCell).join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\r\n");
