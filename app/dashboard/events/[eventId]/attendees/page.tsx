import { AttendeesPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function AttendeesPage({ params }: PageProps<"/dashboard/events/[eventId]/attendees">) {
  const { eventId } = await params;

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/attendees"
      eyebrow="Attendees"
      title="Guest matching status"
      detail="Track verified guests, WhatsApp delivery and the photos each attendee has discovered."
    >
      <AttendeesPanel />
    </WorkspacePage>
  );
}
