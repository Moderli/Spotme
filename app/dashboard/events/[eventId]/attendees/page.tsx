import { AttendeesPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage } from "@/components/dashboard/workspace-page";
import { fetchGuests } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function AttendeesPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const guests = await fetchGuests(eventId);

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/attendees"
      eyebrow="Attendees"
      title="Guest directory"
      detail="View all registered guests and their WhatsApp numbers."
    >
      <AttendeesPanel guests={guests} />
    </WorkspacePage>
  );
}
