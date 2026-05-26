import { EventOverviewPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";
import { getEvent } from "@/lib/dashboard-data";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function EventOverviewPage({ params }: PageProps<"/dashboard/events/[eventId]">) {
  const { eventId } = await params;
  const event = getEvent(eventId);

  return (
    <WorkspacePage
      eventId={eventId}
      activePath=""
      eyebrow="Event Overview"
      title={event?.name ?? "Event"}
      detail="Monitor guest photo discovery and delivery while preserving a calm, focused workflow."
      action={
        <button className="rounded-xl bg-[#D67D5C] px-5 py-3 text-sm font-semibold text-white">
          Upload photos
        </button>
      }
    >
      {event && <EventOverviewPanel event={event} />}
    </WorkspacePage>
  );
}
