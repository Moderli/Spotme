import { redirect } from "next/navigation";
import {
  EventsGrid,
  HeroSummary,
  PlanCard,
  StorageCard,
} from "@/components/dashboard/dashboard-cards";
import { DashboardShell } from "@/components/dashboard/shell";
import { createClient } from "@/lib/supabase/server";
import { fetchEvents, fetchDashboardStats } from "@/lib/dashboard-data";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch real data in parallel
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const profileQuery = (supabase as any).from("profiles").select("full_name").eq("id", user.id).single();
  const [events, stats, profileResult] = await Promise.all([
    fetchEvents(),
    fetchDashboardStats(),
    profileQuery,
  ]);

  const userName = (profileResult.data as { full_name: string | null } | null)?.full_name ?? user.email ?? undefined;

  return (
    <DashboardShell active="Dashboard" userName={userName}>
      <main className="p-4 sm:p-6 lg:p-9">
        <HeroSummary
          userName={userName}
          totalEvents={stats.totalEvents}
          totalPhotos={stats.totalPhotos}
        />
        <div className="grid gap-5 2xl:grid-cols-[1fr_352px] sm:gap-7">
          <EventsGrid events={events} />
          <aside className="space-y-4 sm:space-y-5">
            <StorageCard />
            <PlanCard />
          </aside>
        </div>
      </main>
    </DashboardShell>
  );
}
