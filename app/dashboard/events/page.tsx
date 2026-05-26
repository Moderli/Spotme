import { EventsGrid } from "@/components/dashboard/dashboard-cards";
import { DashboardShell, PageHeading } from "@/components/dashboard/shell";
import Link from "next/link";

export default function EventsPage() {
  return (
    <DashboardShell active="Events">
      <main className="p-4 sm:p-6 lg:p-9">
        <PageHeading
          eyebrow="Events"
          title="Event workspaces"
          detail="Open an event to manage photo uploads, guest discovery, AI processing, QR access and gallery delivery in one focused workspace."
          action={
            <Link
              href="/dashboard/events"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D67D5C] to-[#C46A4A] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(214,125,92,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(214,125,92,0.25)] active:scale-[0.98] sm:px-6 sm:py-3.5"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create Event
            </Link>
          }
        />
        <EventsGrid compact />
      </main>
    </DashboardShell>
  );
}
