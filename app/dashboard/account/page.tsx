import { DashboardShell, PageHeading } from "@/components/dashboard/shell";

/* ─── helpers ─── */
function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className={`relative inline-flex h-[26px] w-[46px] shrink-0 items-center rounded-full transition ${
        on ? "bg-[#D67D5C]" : "bg-[#E0DBD5]"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className="material-symbols-outlined text-[20px] text-[#D67D5C]">{icon}</span>
      <h2 className="text-lg font-semibold tracking-tight text-[#2D2D2D]">{title}</h2>
    </div>
  );
}

/* ─── mock data ─── */
const notifications = [
  { label: "Email notifications", detail: "Receive updates about new uploads and gallery activity", on: true },
  { label: "WhatsApp alerts", detail: "Get instant alerts when guests access their photos", on: true },
  { label: "Weekly digest", detail: "Summary of all activity across your events", on: false },
  { label: "New guest notifications", detail: "Alert when new guests register via QR code", on: true },
];

const securityRows = [
  { label: "Change password", detail: "Last changed 3 months ago", icon: "lock", action: "Update" },
  { label: "Two-factor authentication", detail: "Currently enabled via authenticator app", icon: "verified_user", action: "Manage" },
  { label: "Active sessions", detail: "3 devices currently signed in", icon: "devices", action: "View" },
];

/* ─── page ─── */
export default function AccountPage() {
  return (
    <DashboardShell active="Settings">
      <main className="p-5 sm:p-7 lg:p-9">
        <PageHeading
          eyebrow="Account"
          title="Account settings"
          detail="Manage your profile, notification preferences and billing."
        />

        <div className="grid gap-7 xl:grid-cols-2">
          {/* ── Profile Card ── */}
          <div className="rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-7 backdrop-blur-xl">
            <SectionTitle icon="person" title="Profile" />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F4A261]/20 text-2xl font-bold text-[#F4A261]">
                AV
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xl font-semibold tracking-tight text-[#2D2D2D]">Ari Vance</p>
                <p className="mt-1 text-sm text-[#827970]">ari@revela.photos</p>
                <span className="mt-2 inline-block rounded-full bg-[#D67D5C]/12 px-3 py-1 text-xs font-semibold text-[#B36144]">
                  Photographer
                </span>
              </div>
              <button className="shrink-0 self-start rounded-xl border border-[#2D2D2D]/8 bg-white px-5 py-2.5 text-sm font-semibold text-[#2D2D2D] transition hover:border-[#D67D5C]/40 hover:bg-[#FDF8F1]">
                Edit Profile
              </button>
            </div>
          </div>

          {/* ── Notification Preferences ── */}
          <div className="rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-7 backdrop-blur-xl">
            <SectionTitle icon="notifications" title="Notification Preferences" />

            <div className="space-y-1">
              {notifications.map((n) => (
                <div
                  key={n.label}
                  className="flex items-center justify-between gap-4 rounded-2xl px-1 py-3.5 transition hover:bg-[#F4A261]/5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#2D2D2D]">{n.label}</p>
                    <p className="mt-0.5 text-xs text-[#827970]">{n.detail}</p>
                  </div>
                  <Toggle on={n.on} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Billing & Plan ── */}
          <div className="rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-7 backdrop-blur-xl">
            <SectionTitle icon="credit_card" title="Billing & Plan" />

            <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold tracking-tight text-[#2D2D2D]">Pro Plan</p>
                  <span className="rounded-full bg-[#D67D5C]/12 px-2.5 py-0.5 text-xs font-semibold text-[#B36144]">
                    Active
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#827970]">$49 / month</p>
              </div>
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg, #D67D5C, #F4A261)" }}
              >
                <span className="material-symbols-outlined text-[22px] text-white">workspace_premium</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-[#FDF8F1] px-4 py-3">
                <span className="text-[#827970]">Next billing date</span>
                <span className="font-medium text-[#2D2D2D]">June 1, 2026</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-[#FDF8F1] px-4 py-3">
                <span className="text-[#827970]">Payment method</span>
                <span className="font-medium text-[#2D2D2D]">•••• 4242</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-xl bg-[#D67D5C] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,125,92,0.18)] transition hover:-translate-y-0.5 hover:bg-[#C76F50]">
                Change Plan
              </button>
              <button className="rounded-xl border border-[#2D2D2D]/8 bg-white px-5 py-2.5 text-sm font-semibold text-[#2D2D2D] transition hover:border-[#D67D5C]/40 hover:bg-[#FDF8F1]">
                Update Payment
              </button>
            </div>
          </div>

          {/* ── Security ── */}
          <div className="rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-7 backdrop-blur-xl">
            <SectionTitle icon="shield" title="Security" />

            <div className="space-y-1">
              {securityRows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 rounded-2xl px-1 py-3.5 transition hover:bg-[#F4A261]/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F0EBE4]">
                      <span className="material-symbols-outlined text-[18px] text-[#827970]">{row.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#2D2D2D]">{row.label}</p>
                      <p className="mt-0.5 text-xs text-[#827970]">{row.detail}</p>
                    </div>
                  </div>
                  <button className="shrink-0 rounded-lg border border-[#2D2D2D]/8 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#2D2D2D] transition hover:border-[#D67D5C]/40 hover:bg-[#FDF8F1]">
                    {row.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Danger Zone ─── */}
        <div className="mt-8 rounded-[26px] border border-red-200/60 bg-red-50/40 p-7 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-red-500/70">warning</span>
            <h2 className="text-lg font-semibold tracking-tight text-[#2D2D2D]">Danger Zone</h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#2D2D2D]">Delete Account</p>
              <p className="mt-0.5 text-xs text-[#827970]">
                Permanently remove your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <button className="shrink-0 rounded-xl border border-red-300/60 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
