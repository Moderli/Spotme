import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EventWorkspaceShell, PageHeading } from "@/components/dashboard/shell";
import { fetchEvent } from "@/lib/dashboard-data";
import { createClient } from "@/lib/supabase/server";

// No more static params — fully dynamic routing
export function workspaceParams() {
  return [];
}

export async function WorkspacePage({
  eventId,
  activePath,
  eyebrow,
  title,
  detail,
  action,
  children,
}: {
  eventId: string;
  activePath: string;
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const event = await fetchEvent(eventId);

  if (!event) {
    notFound();
  }

  let userName: string | undefined;
  if (user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data } = await (supabase as any)
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    userName = (data as { full_name: string | null } | null)?.full_name ?? user.email ?? undefined;
  }

  return (
    <EventWorkspaceShell event={event} activePath={activePath} userName={userName}>
      <main className="p-4 sm:p-6 lg:p-9">
        <PageHeading eyebrow={eyebrow} title={title} detail={detail} action={action} />
        {children}
      </main>
    </EventWorkspaceShell>
  );
}
