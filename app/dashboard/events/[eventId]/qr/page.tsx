import { QrPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";
import { getEvent } from "@/lib/dashboard-data";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function QrAccessPage({ params }: PageProps<"/dashboard/events/[eventId]/qr">) {
  const { eventId } = await params;
  const event = getEvent(eventId);

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/qr"
      eyebrow="QR Access"
      title="Share event access"
      detail="Place this QR code at the venue so guests move directly from scan to selfie-based discovery."
    >
      {event && <QrPanel event={event} />}
    </WorkspacePage>
  );
}
