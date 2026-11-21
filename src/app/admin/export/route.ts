import { fetchLeads, fetchSubscribers, isAdmin, toCsv } from "@/lib/admin";

export const dynamic = "force-dynamic";

/** /admin/export?table=leads|subscribers — CSV download, only for a logged-in admin */
export async function GET(req: Request) {
  if (!(await isAdmin())) return new Response("Not found", { status: 404 });
  const table = new URL(req.url).searchParams.get("table") === "subscribers" ? "subscribers" : "leads";
  try {
    const csv =
      table === "leads"
        ? toCsv(["id", "created_at", "kind", "status", "name", "phone", "email", "service", "business_type", "budget", "timeline", "message", "page", "notes"], await fetchLeads(5000))
        : toCsv(["id", "created_at", "email", "source", "page", "unsubscribed"], await fetchSubscribers(20000));
    return new Response("﻿" + csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="lts-${table}-${new Date().toISOString().slice(0, 10)}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[admin] export failed:", err);
    return new Response("Export failed. Check the server log.", { status: 500 });
  }
}
