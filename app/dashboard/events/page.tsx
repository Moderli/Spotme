import { EventsGrid } from "@/components/dashboard/dashboard-cards";
import { DashboardShell, PageHeading } from "@/components/dashboard/shell";
import { createClient } from "@/lib/supabase/server";
import { fetchEvents } from "@/lib/dashboard-data";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profileQuery = (supabase as any).from("profiles").select("full_name").eq("id", user.id).single();
  const [events, profileResult] = await Promise.all([
    fetchEvents(),
    profileQuery,
  ]);

  const userName = (profileResult.data as { full_name: string | null } | null)?.full_name ?? user.email ?? undefined;

  return (
    <DashboardShell active="Events" userName={userName}>
      <main className="p-4 sm:p-6 lg:p-9">
        <PageHeading
          eyebrow="Events"
          title="Event workspaces"
          detail="Open an event to manage photo uploads, guest discovery, QR access and gallery delivery in one focused workspace."
        />
        <EventsGrid events={events} compact />
      </main>
    </DashboardShell>
  );
}
