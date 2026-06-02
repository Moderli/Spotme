import { EventOverviewPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage } from "@/components/dashboard/workspace-page";
import { fetchEvent, fetchEventPhotos, fetchGuests, fetchEventPhotoCount } from "@/lib/dashboard-data";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EventOverviewPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const [event, photos, guests, photoCount] = await Promise.all([
    fetchEvent(eventId),
    fetchEventPhotos(eventId),
    fetchGuests(eventId),
    fetchEventPhotoCount(eventId),
  ]);

  if (!event) notFound();

  return (
    <WorkspacePage
      eventId={eventId}
      activePath=""
      eyebrow="Event Overview"
      title={event.name}
      detail="Monitor guest photo discovery and delivery while preserving a calm, focused workflow."
      action={
        <Link
          href={`/dashboard/events/${eventId}/uploads`}
          className="rounded-xl bg-[#D67D5C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#C46A4A] transition"
        >
          Upload photos
        </Link>
      }
    >
      <EventOverviewPanel
        event={event}
        photos={photos}
        guests={guests}
        photoCount={photoCount}
      />
    </WorkspacePage>
  );
}
