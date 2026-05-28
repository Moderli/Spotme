"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { AdminStats, PhotographerRow, AdminEventRow, AdminChartData } from "@/lib/admin-data";
import { DonutChart, AreaLineChart, HorizontalBarChart } from "@/components/admin/charts";

/* ── Sidebar nav items ── */
const nav = [
  { label: "Overview", href: "/admin", icon: "space_dashboard" },
  { label: "Photographers", href: "/admin/photographers", icon: "photo_camera" },
  { label: "Events", href: "/admin/events", icon: "photo_library" },
];

/* ── Reusable stat card ── */
function StatCard({
  label, value, sub, icon, accent,
}: {
  label: string; value: string | number; sub?: string; icon: string; accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</p>
          <p className={`mt-1.5 text-3xl font-bold tracking-tight ${accent ?? "text-white"}`}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
          {sub && <p className="mt-1 text-xs text-white/40">{sub}</p>}
        </div>
        <span className={`material-symbols-outlined text-[28px] ${accent ?? "text-white/30"}`}>{icon}</span>
      </div>
    </div>
  );
}

/* ── Sidebar ── */
function AdminSidebar({ active }: { active: string }) {
  const router = useRouter();
  const handleSignOut = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/login");
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 border-r border-white/8 bg-[#0F0F11] flex flex-col z-30">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#D67D5C] to-[#C46A4A] text-white shadow-sm">
            <span className="material-symbols-outlined text-[16px]">shield</span>
          </span>
          <div>
            <span className="text-sm font-bold text-white tracking-tight">Revela Admin</span>
            <p className="text-[10px] text-white/30 leading-none mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const isActive = active === item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#D67D5C]/20 text-[#F4A261]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/8 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:text-white hover:bg-white/5 transition"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Dashboard
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}

/* ══════════════════════════════════════════════
   OVERVIEW PAGE
═══════════════════════════════════════════════ */
export function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [events, setEvents] = useState<AdminEventRow[]>([]);
  const [chartData, setChartData] = useState<AdminChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(({ stats, events, chartData }) => {
        setStats(stats);
        setEvents(events);
        setChartData(chartData);
      })
      .finally(() => setLoading(false));
  }, []);

  // Color palettes
  const eventTypeColors: Record<string, string> = {
    marriage: "#F4A261", hackathon: "#5B8DEF", meetup: "#60D9A0",
    corporate: "#A78BFA", other: "#E06C8E",
  };
  const planColors: Record<string, string> = {
    free: "#6B7280", pro: "#F4A261", unlimited: "#60D9A0",
  };
  const statusColors: Record<string, string> = {
    draft: "#6B7280", active: "#60D9A0", archived: "#A78BFA",
  };

  const activityIcons: Record<string, string> = {
    event: "photo_library", photographer: "photo_camera", guest: "person",
  };
  const activityAccent: Record<string, string> = {
    event: "text-[#5B8DEF]", photographer: "text-[#F4A261]", guest: "text-[#60D9A0]",
  };

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar active="Overview" />
      <main className="flex-1 pl-60">
        <div className="p-8 max-w-[1280px]">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D67D5C]">Admin</p>
            <h1 className="mt-1 text-2xl font-bold text-white tracking-tight">Platform Overview</h1>
            <p className="mt-1 text-sm text-white/40">Company-wide stats, growth metrics, and platform analytics.</p>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-white/40 py-20 justify-center">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-[#D67D5C]" />
              <span className="text-sm">Loading analytics...</span>
            </div>
          ) : stats ? (
            <>
              {/* ─── STAT CARDS ROW ─── */}
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">All Time</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard label="Photographers" value={stats.totalPhotographers} icon="photo_camera" accent="text-[#F4A261]"
                    sub={stats.thisMonthGuests > 0 ? `+${stats.thisMonthGuests} this month` : undefined} />
                  <StatCard label="Total Events" value={stats.totalEvents} icon="photo_library"
                    sub={stats.thisMonthEvents > 0 ? `+${stats.thisMonthEvents} this month` : undefined} />
                  <StatCard label="Photos Uploaded" value={stats.totalPhotos} icon="image" accent="text-[#5B8DEF]"
                    sub={stats.thisMonthPhotos > 0 ? `+${stats.thisMonthPhotos} this month` : undefined} />
                  <StatCard label="Guests Served" value={stats.totalGuests} icon="people" accent="text-[#60D9A0]"
                    sub={`${stats.activeEvents} active events now`} />
                </div>
              </section>

              {/* ─── THIS MONTH QUICK STATS ─── */}
              <section className="mt-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">This Month</h2>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard label="Active Events" value={stats.activeEvents} icon="event_available" accent="text-[#60D9A0]" />
                  <StatCard label="New Events" value={stats.thisMonthEvents} icon="add_circle" />
                  <StatCard label="Photos This Month" value={stats.thisMonthPhotos} icon="photo" accent="text-[#5B8DEF]" />
                  <StatCard label="New Guests" value={stats.thisMonthGuests} icon="person_add" accent="text-[#F4A261]" />
                </div>
              </section>

              {chartData && (
                <>
                  {/* ─── MONTHLY GROWTH CHART ─── */}
                  <section className="mt-8">
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div>
                          <h2 className="text-sm font-bold text-white">Platform Growth</h2>
                          <p className="text-xs text-white/30 mt-0.5">Events, photos, and guests over the last 6 months</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs text-white/50">
                            <span className="h-2 w-2 rounded-full bg-[#D67D5C]" /> Events
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-white/50">
                            <span className="h-2 w-2 rounded-full bg-[#5B8DEF]" /> Photos
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-white/50">
                            <span className="h-2 w-2 rounded-full bg-[#60D9A0]" /> Guests
                          </span>
                        </div>
                      </div>
                      <AreaLineChart data={chartData.monthlyGrowth} height={260} />
                    </div>
                  </section>

                  {/* ─── DONUT CHARTS ROW ─── */}
                  <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Event Types */}
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
                      <h2 className="text-sm font-bold text-white mb-4">Event Types</h2>
                      <DonutChart
                        title="Events"
                        data={chartData.eventTypeBreakdown.map((d) => ({
                          label: d.type.charAt(0).toUpperCase() + d.type.slice(1),
                          value: d.count,
                          color: eventTypeColors[d.type] ?? "#6B7280",
                        }))}
                        size={160}
                      />
                    </div>

                    {/* Plan Distribution */}
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
                      <h2 className="text-sm font-bold text-white mb-4">Subscription Plans</h2>
                      <DonutChart
                        title="Users"
                        data={chartData.planDistribution.map((d) => ({
                          label: d.plan === "free" ? "Starter" : d.plan === "pro" ? "Pro" : "Unlimited",
                          value: d.count,
                          color: planColors[d.plan] ?? "#6B7280",
                        }))}
                        size={160}
                      />
                    </div>

                    {/* Event Status */}
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
                      <h2 className="text-sm font-bold text-white mb-4">Event Status</h2>
                      <DonutChart
                        title="Events"
                        data={chartData.eventStatusBreakdown.map((d) => ({
                          label: d.status.charAt(0).toUpperCase() + d.status.slice(1),
                          value: d.count,
                          color: statusColors[d.status] ?? "#6B7280",
                        }))}
                        size={160}
                      />
                    </div>
                  </section>

                  {/* ─── TOP PHOTOGRAPHERS + ACTIVITY FEED ─── */}
                  <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Top Photographers */}
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
                      <h2 className="text-sm font-bold text-white mb-4">Top Photographers</h2>
                      {chartData.topPhotographers.length > 0 ? (
                        <HorizontalBarChart
                          data={chartData.topPhotographers.map((p) => ({
                            name: p.name,
                            value: p.photos,
                            secondary: `${p.events} event${p.events !== 1 ? "s" : ""}`,
                          }))}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-white/20">
                          <span className="material-symbols-outlined text-[32px] mb-2">photo_camera</span>
                          <p className="text-sm">No photographers yet</p>
                        </div>
                      )}
                    </div>

                    {/* Activity Feed */}
                    <div className="rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm">
                      <h2 className="text-sm font-bold text-white mb-4">Recent Activity</h2>
                      {chartData.recentActivity.length > 0 ? (
                        <div className="space-y-1">
                          {chartData.recentActivity.map((a, i) => (
                            <div key={i} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-white/[0.03] transition">
                              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 flex-shrink-0 ${activityAccent[a.type] ?? "text-white/40"}`}>
                                <span className="material-symbols-outlined text-[16px]">{activityIcons[a.type] ?? "info"}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-white/70 truncate">{a.description}</p>
                                <p className="text-xs text-white/25 mt-0.5">{timeAgo(a.time)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-white/20">
                          <span className="material-symbols-outlined text-[32px] mb-2">history</span>
                          <p className="text-sm">No recent activity</p>
                        </div>
                      )}
                    </div>
                  </section>
                </>
              )}

              {/* ─── RECENT EVENTS TABLE ─── */}
              <section className="mt-8">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Recent Events</h2>
                <div className="rounded-2xl border border-white/8 bg-white/5 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/8">
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Event</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Photographer</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Type</th>
                        <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Photos</th>
                        <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Guests</th>
                        <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {events.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-5 py-8 text-center text-white/30 text-sm">No events yet.</td>
                        </tr>
                      )}
                      {events.map((ev) => (
                        <tr key={ev.id} className="hover:bg-white/[0.03] transition">
                          <td className="px-5 py-3.5">
                            <p className="font-medium text-white">{ev.name}</p>
                            <p className="text-xs text-white/30">{ev.venue ?? "—"}</p>
                          </td>
                          <td className="px-5 py-3.5 text-white/60">{ev.ownerName ?? "—"}</td>
                          <td className="px-5 py-3.5">
                            <span className="capitalize text-white/50">{ev.event_type}</span>
                          </td>
                          <td className="px-5 py-3.5 text-right text-white/70">{ev.photoCount}</td>
                          <td className="px-5 py-3.5 text-right text-white/70">{ev.guestCount}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              ev.status === "active"
                                ? "bg-[#60D9A0]/15 text-[#60D9A0]"
                                : ev.status === "draft"
                                ? "bg-white/10 text-white/50"
                                : "bg-white/5 text-white/30"
                            }`}>
                              {ev.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PHOTOGRAPHERS PAGE
═══════════════════════════════════════════════ */
function PhotographerModal({
  onClose,
  onSave,
  initial,
}: {
  onClose: () => void;
  onSave: () => void;
  initial?: PhotographerRow | null;
}) {
  const [form, setForm] = useState({
    full_name: initial?.full_name ?? "",
    email: initial?.email ?? "",
    password: "",
    phone: initial?.phone ?? "",
    bio: initial?.bio ?? "",
    plan: initial?.plan ?? "free",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (initial) {
      // Update
      const res = await fetch("/api/admin/photographers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initial.id,
          full_name: form.full_name,
          phone: form.phone,
          bio: form.bio,
          plan: form.plan
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to update"); setSaving(false); return; }
    } else {
      // Create
      const res = await fetch("/api/admin/photographers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Failed to create"); setSaving(false); return; }
    }

    onSave();
    onClose();
  };

  const isEdit = !!initial;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#18181B] p-6 shadow-2xl">
        <h2 className="text-lg font-bold text-white">{isEdit ? "Edit Photographer" : "Add Photographer"}</h2>
        <p className="mt-1 text-sm text-white/40">{isEdit ? "Update their profile details." : "Create a new photographer account."}</p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Full Name</label>
            <input
              required
              value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D67D5C]/60"
              placeholder="Jane Doe"
            />
          </div>

          {!isEdit && (
            <>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D67D5C]/60"
                  placeholder="photographer@email.com"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Password</label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D67D5C]/60"
                  placeholder="Minimum 8 characters"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Phone <span className="text-white/20">(optional)</span></label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D67D5C]/60"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Subscription Plan</label>
            <select
              value={form.plan}
              onChange={(e) => setForm((f) => ({ ...f, plan: e.target.value as "free" | "pro" | "unlimited" }))}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D67D5C]/60"
            >
              <option value="free" className="bg-[#18181B]">Starter (Free - 1 Event, 10GB)</option>
              <option value="pro" className="bg-[#18181B]">Pro (₹1,699/mo - 5 Events, 100GB)</option>
              <option value="unlimited" className="bg-[#18181B]">Unlimited (₹4,199/mo - Unlimited, 1TB)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Bio <span className="text-white/20">(optional)</span></label>
            <textarea
              rows={2}
              value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#D67D5C]/60 resize-none"
              placeholder="Short bio or specialization..."
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/60 hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-gradient-to-r from-[#D67D5C] to-[#C46A4A] px-4 py-2.5 text-sm font-semibold text-white shadow hover:opacity-90 transition disabled:opacity-50"
            >
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminPhotographers() {
  const [photographers, setPhotographers] = useState<PhotographerRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PhotographerRow | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    fetch("/api/admin/photographers")
      .then((r) => r.json())
      .then(setPhotographers)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photographer? All their events will also be removed.")) return;
    setDeleting(id);
    await fetch(`/api/admin/photographers?id=${id}`, { method: "DELETE" });
    setDeleting(null);
    load();
  };

  const handleEdit = (p: PhotographerRow) => { setEditTarget(p); setModalOpen(true); };
  const handleAdd = () => { setEditTarget(null); setModalOpen(true); };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar active="Photographers" />
      <main className="flex-1 pl-60">
        <div className="p-8 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#D67D5C]">Admin</p>
              <h1 className="mt-1 text-2xl font-bold text-white tracking-tight">Photographers</h1>
              <p className="mt-1 text-sm text-white/40">Manage photographer accounts on the platform.</p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D67D5C] to-[#C46A4A] px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Photographer
            </button>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-white/40">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#D67D5C]" />
              Loading...
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/5 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Photographer</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Contact</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Events</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Photos</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Plan</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Last Active</th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {photographers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-5 py-12 text-center">
                        <span className="material-symbols-outlined text-[40px] text-white/20 block mb-2">photo_camera</span>
                        <p className="text-white/40 text-sm">No photographers yet. Add one to get started.</p>
                      </td>
                    </tr>
                  )}
                  {photographers.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.03] transition">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#D67D5C]/30 to-[#F4A261]/20 text-[#F4A261] text-sm font-bold flex-shrink-0">
                            {(p.full_name ?? "?")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{p.full_name ?? "—"}</p>
                            {p.bio && <p className="text-xs text-white/30 truncate max-w-[180px]">{p.bio}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-white/70 text-sm">{p.email}</p>
                        {p.phone && <p className="text-xs text-white/30">{p.phone}</p>}
                      </td>
                      <td className="px-5 py-4 text-right text-white/70 font-medium">{p.eventCount}</td>
                      <td className="px-5 py-4 text-right text-white/70 font-medium">{p.photoCount}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          p.plan === "unlimited"
                            ? "bg-green-500/15 text-green-400 border border-green-500/10"
                            : p.plan === "pro"
                            ? "bg-[#D67D5C]/15 text-[#F4A261] border border-[#D67D5C]/10"
                            : "bg-white/10 text-white/50 border border-white/5"
                        }`}>
                          {p.plan === "free" ? "Starter" : p.plan === "pro" ? "Pro" : "Unlimited"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white/40 text-xs">
                        {p.lastActive
                          ? new Date(p.lastActive).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : "Never"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition"
                            title="Edit"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deleting === p.id}
                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:text-red-400 hover:bg-red-500/10 transition disabled:opacity-40"
                            title="Delete"
                          >
                            {deleting === p.id
                              ? <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/30 border-t-white" />
                              : <span className="material-symbols-outlined text-[16px]">delete</span>
                            }
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {modalOpen && (
        <PhotographerModal
          initial={editTarget}
          onClose={() => setModalOpen(false)}
          onSave={load}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   EVENTS PAGE
═══════════════════════════════════════════════ */
export function AdminEvents() {
  const [events, setEvents] = useState<AdminEventRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(({ events }) => setEvents(events))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar active="Events" />
      <main className="flex-1 pl-60">
        <div className="p-8 max-w-6xl">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D67D5C]">Admin</p>
            <h1 className="mt-1 text-2xl font-bold text-white tracking-tight">All Events</h1>
            <p className="mt-1 text-sm text-white/40">Every event across the platform, newest first.</p>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-white/40">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#D67D5C]" />
              Loading...
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-white/5 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Event</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Photographer</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Date</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Photos</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Guests</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-white/30 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {events.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-12 text-center text-white/30 text-sm">No events found.</td>
                    </tr>
                  )}
                  {events.map((ev) => (
                    <tr key={ev.id} className="hover:bg-white/[0.03] transition">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-white">{ev.name}</p>
                        <p className="text-xs text-white/30 capitalize">{ev.event_type} {ev.venue ? `· ${ev.venue}` : ""}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-white/70">{ev.ownerName ?? "—"}</p>
                        <p className="text-xs text-white/30">{ev.ownerEmail ?? ""}</p>
                      </td>
                      <td className="px-5 py-4 text-white/50 text-xs">
                        {ev.event_date
                          ? new Date(ev.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                          : "—"}
                      </td>
                      <td className="px-5 py-4 text-right text-white/70 font-medium">{ev.photoCount}</td>
                      <td className="px-5 py-4 text-right text-white/70 font-medium">{ev.guestCount}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ev.status === "active"
                            ? "bg-[#60D9A0]/15 text-[#60D9A0]"
                            : ev.status === "draft"
                            ? "bg-white/10 text-white/50"
                            : "bg-white/5 text-white/30"
                        }`}>
                          {ev.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
