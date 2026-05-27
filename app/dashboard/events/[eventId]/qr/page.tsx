import { QrPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage } from "@/components/dashboard/workspace-page";
import { fetchEvent, fetchGuests } from "@/lib/dashboard-data";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function QrAccessPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const [event, guests] = await Promise.all([
    fetchEvent(eventId),
    fetchGuests(eventId),
  ]);

  if (!event) notFound();

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/qr"
      eyebrow="QR Access"
      title="Share event access"
      detail="Place this QR code at the venue so guests move directly from scan to selfie-based discovery."
    >
      <QrPanel event={event} guestCount={guests.length} />
    </WorkspacePage>
  );
}
