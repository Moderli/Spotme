import { DashboardShell, PageHeading } from "@/components/dashboard/shell";

/* ─── mock data ─── */
const fileTypes = [
  { label: "RAW", size: 280, color: "#D67D5C" },
  { label: "JPEG", size: 95, color: "#F4A261" },
  { label: "HEIC", size: 35, color: "#E8C9A0" },
];

const events = [
  { name: "Lake Como Wedding", size: 180, icon: "landscape" },
  { name: "Atelier Launch", size: 142, icon: "storefront" },
  { name: "Founders Retreat", size: 88, icon: "groups" },
];

const recentFiles = [
  { name: "DSC_4821.RAW", event: "Lake Como Wedding", size: "48.2 MB", date: "May 24, 2026" },
  { name: "IMG_0093.JPEG", event: "Atelier Launch", size: "8.7 MB", date: "May 23, 2026" },
  { name: "DSC_4799.RAW", event: "Lake Como Wedding", size: "51.1 MB", date: "May 23, 2026" },
  { name: "IMG_0071.HEIC", event: "Founders Retreat", size: "6.3 MB", date: "May 22, 2026" },
  { name: "DSC_4755.RAW", event: "Lake Como Wedding", size: "49.8 MB", date: "May 21, 2026" },
];

/* ─── page ─── */
export default function StoragePage() {
  const usedGB = 410;
  const totalGB = 500;
  const pct = Math.round((usedGB / totalGB) * 100);

  return (
    <DashboardShell active="Storage">
      <main className="p-5 sm:p-7 lg:p-9">
        <PageHeading
          eyebrow="Storage"
          title="Storage overview"
          detail="Monitor usage across events and manage your media archive."
        />

        {/* ─── Top row: Overview + By‑event ─── */}
        <div className="grid gap-7 xl:grid-cols-[1fr_1fr]">
          {/* ── Storage Overview Card ── */}
          <div className="rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-7 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#D67D5C]">cloud</span>
              <h2 className="text-lg font-semibold tracking-tight text-[#2D2D2D]">Storage Usage</h2>
            </div>

            <div className="flex flex-col items-center gap-8 sm:flex-row">
              {/* Circular progress ring */}
              <div className="relative flex h-[156px] w-[156px] shrink-0 items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#D67D5C 0% ${pct}%, #F0EBE4 ${pct}% 100%)`,
                    mask: "radial-gradient(farthest-side, transparent 68%, #000 69%)",
                    WebkitMask: "radial-gradient(farthest-side, transparent 68%, #000 69%)",
                  }}
                />
                <div className="text-center">
                  <p className="text-3xl font-bold tracking-tight text-[#2D2D2D]">{pct}%</p>
                  <p className="mt-0.5 text-xs text-[#827970]">used</p>
                </div>
              </div>

              {/* File‑type breakdown */}
              <div className="w-full space-y-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium text-[#2D2D2D]">{usedGB} GB <span className="text-[#827970]">of {totalGB} GB</span></p>
                  <p className="text-xs text-[#827970]">{totalGB - usedGB} GB free</p>
                </div>
                {fileTypes.map((ft) => (
                  <div key={ft.label}>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-[#2D2D2D]">{ft.label}</span>
                      <span className="text-[#827970]">{ft.size} GB</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#F0EBE4]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(ft.size / totalGB) * 100}%`,
                          background: `linear-gradient(90deg, ${ft.color}, ${ft.color}dd)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Storage by Event ── */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#D67D5C]">photo_library</span>
              <h2 className="text-lg font-semibold tracking-tight text-[#2D2D2D]">Storage by Event</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-1">
              {events.map((ev) => {
                const evPct = Math.round((ev.size / totalGB) * 100);
                return (
                  <div
                    key={ev.name}
                    className="rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-6 backdrop-blur-xl transition hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F4A261]/15">
                        <span className="material-symbols-outlined text-[20px] text-[#F4A261]">{ev.icon}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#2D2D2D]">{ev.name}</p>
                        <p className="text-xs text-[#827970]">{ev.size} GB · {evPct}%</p>
                      </div>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#F0EBE4]">
                      <div
                        className="h-full rounded-full bg-[#D67D5C] transition-all"
                        style={{ width: `${evPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── Recent Files ─── */}
        <div className="mt-8 rounded-[26px] border border-[#2D2D2D]/6 bg-white/65 p-7 backdrop-blur-xl">
          <div className="mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#D67D5C]">description</span>
            <h2 className="text-lg font-semibold tracking-tight text-[#2D2D2D]">Recent Files</h2>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2D2D2D]/6 text-left text-xs font-medium uppercase tracking-wider text-[#827970]">
                  <th className="pb-3 pr-4">File name</th>
                  <th className="pb-3 pr-4">Event</th>
                  <th className="pb-3 pr-4">Size</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((f, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#2D2D2D]/4 transition last:border-0 hover:bg-[#F4A261]/5"
                  >
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-[18px] text-[#827970]">image</span>
                        <span className="font-medium text-[#2D2D2D]">{f.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4 text-[#827970]">{f.event}</td>
                    <td className="py-3.5 pr-4 text-[#827970]">{f.size}</td>
                    <td className="py-3.5 text-[#827970]">{f.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {recentFiles.map((f, i) => (
              <div key={i} className="rounded-2xl border border-[#2D2D2D]/4 bg-white/50 p-4">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-[#827970]">image</span>
                  <span className="text-sm font-medium text-[#2D2D2D]">{f.name}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#827970]">
                  <span>{f.event}</span>
                  <span>{f.size}</span>
                  <span>{f.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Upgrade Banner ─── */}
        <div className="mt-8 overflow-hidden rounded-[26px] bg-[#2D2D2D] p-7 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{ background: "linear-gradient(135deg, #D67D5C, #F4A261)" }}
              >
                <span className="material-symbols-outlined text-[22px] text-white">workspace_premium</span>
              </div>
              <div>
                <p className="text-base font-semibold text-white">Pro Plan · 500 GB</p>
                <p className="mt-0.5 text-sm text-white/50">
                  You&apos;re using {pct}% of your storage. Upgrade for more space and premium features.
                </p>
              </div>
            </div>
            <button className="shrink-0 rounded-xl bg-[#D67D5C] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_22px_rgba(214,125,92,0.22)] transition hover:-translate-y-0.5 hover:bg-[#C76F50]">
              Upgrade
            </button>
          </div>
        </div>
      </main>
    </DashboardShell>
  );
}
