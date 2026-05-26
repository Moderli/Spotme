import { SettingsPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function EventSettingsPage({ params }: PageProps<"/dashboard/events/[eventId]/settings">) {
  const { eventId } = await params;

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/settings"
      eyebrow="Settings"
      title="Event controls"
      detail="Manage access, expiration, branding and archival controls for this event workspace."
    >
      <SettingsPanel />
    </WorkspacePage>
  );
}
