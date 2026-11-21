"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { COOKIE, STATUSES, adminConfigured, checkPassword, isAdmin, makeSession, patchLead } from "@/lib/admin";

const tries = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (tries.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  tries.set(ip, recent);
  if (tries.size > 2000) tries.clear();
  return recent.length > 5;
}

export type LoginState = { error?: string };

export async function login(_prev: LoginState, fd: FormData): Promise<LoginState> {
  if (!adminConfigured()) return { error: "Admin is not set up yet." };
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  if (tooMany(ip)) return { error: "Too many attempts. Wait a few minutes and try again." };
  if (!checkPassword(String(fd.get("password") ?? ""))) return { error: "Wrong password." };
  const s = makeSession();
  (await cookies()).set(COOKIE, s.value, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/admin", maxAge: s.maxAge });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
  redirect("/admin");
}

export type SaveState = { saved?: boolean; error?: string };

export async function updateLead(_prev: SaveState, fd: FormData): Promise<SaveState> {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(fd.get("id"));
  const status = String(fd.get("status") ?? "");
  if (!Number.isInteger(id) || id < 1 || !(STATUSES as readonly string[]).includes(status)) return { error: "Invalid request." };
  try {
    await patchLead(id, { status, notes: String(fd.get("notes") ?? "").slice(0, 2000) });
  } catch (err) {
    console.error("[admin] update failed:", err);
    return { error: "Couldn't save. Try again." };
  }
  revalidatePath("/admin");
  return { saved: true };
}
