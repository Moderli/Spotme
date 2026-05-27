import { SettingsPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage } from "@/components/dashboard/workspace-page";
import { fetchEvent } from "@/lib/dashboard-data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EventSettingsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = await fetchEvent(eventId);

  if (!event) notFound();

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/settings"
      eyebrow="Settings"
      title="Event controls"
      detail="Manage access, expiration, branding and archival controls for this event workspace."
    >
      <SettingsPanel event={event} />
    </WorkspacePage>
  );
}
