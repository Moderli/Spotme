"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState, useEffect, useCallback } from "react";
import type { EventRecord } from "@/lib/dashboard-data";

type MainSection = "Dashboard" | "Events" | "Storage" | "Settings";

const mainNavigation: Array<{ label: MainSection; href: string; icon: string }> = [
  { label: "Dashboard", href: "/dashboard", icon: "space_dashboard" },
  { label: "Events", href: "/dashboard/events", icon: "photo_library" },
  { label: "Storage", href: "/dashboard/storage", icon: "cloud" },
  { label: "Settings", href: "/dashboard/account", icon: "tune" },
];

const workspaceNavigation = [
  { label: "Overview", href: "", icon: "space_dashboard" },
  { label: "Uploads", href: "/uploads", icon: "cloud_upload" },
  { label: "Attendees", href: "/attendees", icon: "groups" },
  { label: "QR Access", href: "/qr", icon: "qr_code_2" },
  { label: "AI Matching", href: "/ai-matching", icon: "auto_awesome" },
  { label: "Gallery", href: "/gallery", icon: "gallery_thumbnail" },
  { label: "Settings", href: "/settings", icon: "tune" },
];

/* ── Brand ──────────────────────────────────────── */
function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3 group">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D67D5C] to-[#C46A4A] text-white shadow-[0_4px_12px_rgba(214,125,92,0.35)] transition-transform duration-300 group-hover:scale-105">
        <span className="material-symbols-outlined text-[21px]">camera</span>
      </span>
      <span className="text-xl font-semibold tracking-[-0.04em] text-white">Revela</span>
    </Link>
  );
}

/* ── Profile Block ──────────────────────────────── */
function ProfileBlock() {
  return (
    <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 backdrop-blur-sm transition-colors hover:bg-white/[0.07]">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F4A261]/25 to-[#D67D5C]/15 text-sm font-semibold text-[#F4A261]">
        AV
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">Ari Vance</p>
        <p className="text-xs text-white/45">Photographer</p>
      </div>
      <span className="ml-auto rounded-full bg-gradient-to-r from-[#D67D5C]/20 to-[#F4A261]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#F2B29A]">
        Pro
      </span>
    </div>
  );
}

/* ── Storage Footer ─────────────────────────────── */
function StorageFooter() {
  return (
    <div className="mt-auto rounded-3xl bg-gradient-to-b from-white/[0.055] to-white/[0.025] p-5 border border-white/5">
      <div className="mb-3 flex items-center justify-between text-xs text-white/60">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px]">cloud</span>
          Storage
        </span>
        <span className="font-medium text-white/80">82%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#D67D5C] to-[#F4A261] transition-all duration-700" />
      </div>
      <p className="mt-3 text-xs text-white/44">410 GB of 500 GB used</p>
      <Link
        href="/dashboard/storage"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-[#2D2D2D] transition-all duration-200 hover:bg-[#FDF8F1] hover:shadow-md active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-[16px]">trending_up</span>
        Upgrade Plan
      </Link>
    </div>
  );
}

/* ── Sidebar Overlay (Mobile) ───────────────────── */
function SidebarOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}

/* ── Top Navbar ─────────────────────────────────── */
function TopNavbar({
  event,
  onMenuToggle,
}: {
  event?: EventRecord;
  onMenuToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-[#2D2D2D]/6 bg-white/70 px-4 backdrop-blur-xl sm:gap-5 sm:px-6 lg:h-[76px] lg:px-9">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuToggle}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2D2D2D]/8 bg-white text-[#625D58] transition hover:bg-[#FDF8F1] lg:hidden"
        aria-label="Toggle navigation"
      >
        <span className="material-symbols-outlined text-[22px]">menu</span>
      </button>

      {/* Breadcrumb */}
      <div className="hidden items-center gap-2 text-sm text-[#766D66] lg:flex">
        <Link href="/dashboard" className="transition hover:text-[#2D2D2D]">
          Dashboard
        </Link>
        {event && (
          <>
            <span className="material-symbols-outlined text-[15px]">chevron_right</span>
            <span className="font-medium text-[#2D2D2D]">{event.name}</span>
          </>
        )}
      </div>

      {/* Search */}
      <label className="ml-auto flex h-10 w-full max-w-[280px] items-center gap-2.5 rounded-xl border border-[#2D2D2D]/8 bg-white/80 px-3.5 text-[#8E877F] transition focus-within:border-[#D67D5C]/45 focus-within:shadow-[0_0_0_3px_rgba(214,125,92,0.08)] sm:h-11 sm:max-w-[318px] sm:px-4">
        <span className="material-symbols-outlined text-[19px]">search</span>
        <input
          aria-label="Search events"
          className="w-full bg-transparent text-sm text-[#2D2D2D] outline-none placeholder:text-[#8E877F]"
          placeholder="Search events or guests"
        />
      </label>

      {/* Notifications */}
      <button
        aria-label="Notifications"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2D2D2D]/8 bg-white text-[#625D58] transition hover:bg-[#FDF8F1] sm:h-11 sm:w-11"
      >
        <span className="material-symbols-outlined text-[20px]">notifications</span>
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#D67D5C] ring-2 ring-white" />
      </button>

      {/* Avatar */}
      <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2D2D2D] to-[#404040] text-xs font-semibold text-white sm:flex sm:h-11 sm:w-11">
        AV
      </div>

      {/* Create Event CTA */}
      <Link
        href="/dashboard/events"
        className="hidden h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-[#D67D5C] to-[#C46A4A] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(214,125,92,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(214,125,92,0.28)] active:scale-[0.98] sm:flex sm:h-11"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        <span className="hidden md:block">Create Event</span>
      </Link>
    </header>
  );
}

/* ── Main Navigation Item ───────────────────────── */
function NavItem({
  item,
  active,
  onClick,
}: {
  item: (typeof mainNavigation)[number];
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-white text-[#2D2D2D] shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
          : "text-white/62 hover:bg-white/6 hover:text-white"
      }`}
    >
      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
      {item.label}
    </Link>
  );
}

/* ═══════════════════════════════════════════════════
   DashboardShell — Main Dashboard Layout
   ═══════════════════════════════════════════════════ */
export function DashboardShell({
  active,
  children,
}: {
  active: MainSection;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  // Close sidebar on route change
  const pathname = usePathname();
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F1] via-[#FEFCFB] to-[#FFF8F3] font-sans text-[#2D2D2D] lg:flex">
      {/* Mobile overlay */}
      <SidebarOverlay open={sidebarOpen} onClose={closeSidebar} />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] shrink-0 flex-col bg-gradient-to-b from-[#2D2D2D] to-[#252525] p-6 transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={closeSidebar}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <Brand />
        <ProfileBlock />
        <nav className="mt-8 space-y-1.5">
          {mainNavigation.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={active === item.label}
              onClick={closeSidebar}
            />
          ))}
        </nav>
        <StorageFooter />
      </aside>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <TopNavbar onMenuToggle={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   EventWorkspaceShell — Event-specific Layout
   ═══════════════════════════════════════════════════ */
export function EventWorkspaceShell({
  event,
  activePath,
  children,
}: {
  event: EventRecord;
  activePath: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const rootHref = `/dashboard/events/${event.id}`;

  const pathname = usePathname();
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF8F1] via-[#FEFCFB] to-[#FFF8F3] font-sans text-[#2D2D2D] lg:flex">
      <SidebarOverlay open={sidebarOpen} onClose={closeSidebar} />

      {/* Workspace sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[284px] shrink-0 flex-col bg-gradient-to-b from-[#2D2D2D] to-[#252525] p-6 transition-transform duration-300 ease-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={closeSidebar}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <Brand />
        <Link
          href="/dashboard/events"
          onClick={closeSidebar}
          className="mt-7 flex items-center gap-2 text-xs font-medium text-white/48 transition hover:text-white"
        >
          <span className="material-symbols-outlined text-[17px]">arrow_back</span>
          All events
        </Link>

        {/* Event preview card */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.04]">
          <div
            className="h-24 bg-cover bg-center"
            style={{ backgroundImage: `url("${event.cover}")` }}
          />
          <div className="p-4">
            <p className="truncate text-sm font-medium text-white">{event.name}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-white/48">
              <span className="material-symbols-outlined text-[13px]">calendar_today</span>
              {event.date}
            </p>
          </div>
        </div>

        {/* Workspace navigation */}
        <nav className="mt-6 space-y-1">
          {workspaceNavigation.map((item) => {
            const href = `${rootHref}${item.href}`;
            const selected = activePath === item.href;

            return (
              <Link
                key={item.label}
                href={href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  selected
                    ? "bg-gradient-to-r from-[#D67D5C] to-[#C46A4A] text-white shadow-[0_4px_12px_rgba(214,125,92,0.3)]"
                    : "text-white/62 hover:bg-white/6 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <StorageFooter />
      </aside>

      <div className="min-w-0 flex-1">
        <TopNavbar event={event} onMenuToggle={() => setSidebarOpen(true)} />
        {children}
      </div>
    </div>
  );
}

/* ── Page Heading ───────────────────────────────── */
export function PageHeading({
  eyebrow,
  title,
  detail,
  action,
}: {
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#B36144]">{eyebrow}</p>
        <h1 className="text-2xl font-semibold tracking-[-0.055em] text-[#2D2D2D] sm:text-3xl lg:text-[38px]">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#766D66]">{detail}</p>
      </div>
      {action}
    </div>
  );
}
