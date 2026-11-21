import type { Metadata } from "next";
import Link from "next/link";
import { Download, LogOut, Mail, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LoginForm } from "@/components/admin/LoginForm";
import { logout } from "./actions";
import { LeadForm } from "@/components/admin/LeadForm";
import { STATUSES, adminConfigured, fetchLeads, fetchSubscribers, isAdmin, type LeadRow, type SubscriberRow } from "@/lib/admin";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const fmt = (iso: string) => new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
const waLink = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return `https://wa.me/${d.length === 10 ? "91" + d : d}`;
};
const kindLabel = { contact: "Contact", quote: "Quote", audit: "AI audit" } as const;
const statusTone: Record<string, string> = {
  new: "bg-[#BFFF00]/50 text-ink",
  contacted: "bg-violet-100 text-ink",
  quoted: "bg-mist-200 text-ink",
  won: "bg-ink text-white",
  lost: "bg-white text-gray-500 ring-1 ring-inset ring-ink/15",
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-[60vh] bg-mist-50 py-12 md:py-16">
      <Container>{children}</Container>
    </section>
  );
}

function LeadCard({ l }: { l: LeadRow }) {
  const details = [
    ["Service", l.service], ["Business", l.business_type], ["Budget", l.budget], ["Timeline", l.timeline], ["From page", l.page],
  ].filter(([, v]) => v) as [string, string][];
  return (
    <details className="group rounded-card border border-line bg-white open:shadow-soft">
      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1 p-4 [&::-webkit-details-marker]:hidden">
        <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${statusTone[l.status]}`}>{l.status}</span>
        <span className="font-semibold text-ink">{l.name}</span>
        <span className="rounded-full bg-mist-100 px-2.5 py-0.5 text-[12px] font-semibold text-gray-700">{kindLabel[l.kind]}</span>
        {l.service && <span className="text-[14px] text-gray-600">{l.service}</span>}
        <span className="ml-auto text-[13px] text-gray-500">{fmt(l.created_at)}</span>
      </summary>
      <div className="grid gap-5 border-t border-line p-4 md:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            <a href={`tel:${l.phone}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-[14px] font-semibold text-ink hover:border-ink"><Phone className="size-4" aria-hidden="true" />{l.phone}</a>
            <a href={waLink(l.phone)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full bg-whatsapp px-4 text-[14px] font-semibold text-white"><MessageCircle className="size-4" aria-hidden="true" />WhatsApp</a>
            {l.email && <a href={`mailto:${l.email}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 px-4 text-[14px] font-semibold text-ink hover:border-ink"><Mail className="size-4" aria-hidden="true" />{l.email}</a>}
          </div>
          {l.message && <p className="whitespace-pre-wrap rounded-xl bg-mist-50 p-3 text-[15px] text-ink">{l.message}</p>}
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[14px]">
            {details.map(([k, v]) => (
              <div key={k} className="contents"><dt className="text-gray-500">{k}</dt><dd className="text-ink">{v}</dd></div>
            ))}
          </dl>
        </div>
        <LeadForm id={l.id} status={l.status} notes={l.notes ?? ""} />
      </div>
    </details>
  );
}

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const sp = await searchParams;
  const tab = sp.tab === "subscribers" ? "subscribers" : "leads";
  const filter = typeof sp.status === "string" && (STATUSES as readonly string[]).includes(sp.status) ? sp.status : "all";

  if (!adminConfigured()) {
    return (
      <Shell>
        <h1 className="font-display text-[40px] font-bold text-ink">Admin isn’t set up yet</h1>
        <p className="mt-3 max-w-xl text-[16px] text-gray-700">
          To turn on the lead dashboard, add <code>ADMIN_PASSWORD</code> (at least 8 characters) next to your Supabase keys in <code>.env.local</code> (or in your hosting settings), then restart. See docs/05-forms-setup.md.
        </p>
      </Shell>
    );
  }
  if (!(await isAdmin())) {
    return (
      <Shell>
        <h1 className="mb-6 font-display text-[40px] font-bold text-ink">Admin sign in</h1>
        <LoginForm />
      </Shell>
    );
  }

  let leads: LeadRow[] = [];
  let subs: SubscriberRow[] = [];
  let error = "";
  try {
    [leads, subs] = await Promise.all([fetchLeads(), fetchSubscribers().catch(() => [] as SubscriberRow[])]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load data";
  }
  const counts = Object.fromEntries(STATUSES.map((s) => [s, leads.filter((l) => l.status === s).length]));
  const shown = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const chip = (active: boolean) => `inline-flex min-h-10 items-center rounded-full border px-4 text-[14px] font-semibold ${active ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink/40"}`;

  return (
    <Shell>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-[40px] font-bold leading-none text-ink">Leads dashboard</h1>
        <div className="flex gap-2">
          <a href={`/admin/export?table=${tab}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 bg-white px-4 text-[14px] font-semibold text-ink hover:border-ink"><Download className="size-4" aria-hidden="true" />Export CSV</a>
          <form action={logout}><button type="submit" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 bg-white px-4 text-[14px] font-semibold text-ink hover:border-ink"><LogOut className="size-4" aria-hidden="true" />Sign out</button></form>
        </div>
      </div>

      {error && <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-[14px] text-red-800">Couldn’t load data: {error}. Check your Supabase keys and that supabase/leads.sql has been run.</p>}

      <dl className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
        {[["New", counts.new], ["Contacted", counts.contacted], ["Quoted", counts.quoted], ["Won", counts.won], ["Subscribers", subs.length]].map(([k, v]) => (
          <div key={String(k)} className="rounded-card border border-line bg-white p-4">
            <dt className="text-[13px] font-semibold text-gray-600">{k}</dt>
            <dd className="font-display text-[34px] font-bold leading-none text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Link href="/admin" className={chip(tab === "leads")}>Leads</Link>
        <Link href="/admin?tab=subscribers" className={chip(tab === "subscribers")}>Subscribers</Link>
        {tab === "leads" && (
          <>
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />
            {["all", ...STATUSES].map((s) => (
              <Link key={s} href={s === "all" ? "/admin" : `/admin?status=${s}`} className={chip(filter === s)}>{s === "all" ? "All" : s}</Link>
            ))}
          </>
        )}
      </div>

      {tab === "leads" ? (
        <div className="mt-5 flex flex-col gap-3">
          <p className="text-[13px] text-gray-600">Showing {shown.length} of the latest {leads.length} enquiries.</p>
          {shown.length === 0 && <p className="rounded-card border border-dashed border-ink/20 bg-white p-8 text-center text-gray-600">No enquiries here yet.</p>}
          {shown.map((l) => <LeadCard key={l.id} l={l} />)}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto rounded-card border border-line bg-white">
          <table className="w-full min-w-[560px] text-left text-[14px]">
            <thead className="border-b border-line bg-mist-50 text-[12px] uppercase tracking-[0.08em] text-gray-600">
              <tr><th className="p-3">Email</th><th className="p-3">Source</th><th className="p-3">Joined</th></tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0">
                  <td className="p-3 font-semibold text-ink">{s.email}{s.unsubscribed && <span className="ml-2 text-[12px] font-normal text-gray-500">(unsubscribed)</span>}</td>
                  <td className="p-3 text-gray-700">{s.source ?? "newsletter"}</td>
                  <td className="p-3 text-gray-600">{fmt(s.created_at)}</td>
                </tr>
              ))}
              {subs.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-gray-600">No subscribers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </Shell>
  );
}
