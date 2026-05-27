import { UploadsPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage } from "@/components/dashboard/workspace-page";
import { fetchEvent, fetchEventPhotos } from "@/lib/dashboard-data";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function UploadsPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const [event, photos] = await Promise.all([
    fetchEvent(eventId),
    fetchEventPhotos(eventId),
  ]);

  if (!event) notFound();

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/uploads"
      eyebrow="Uploads"
      title="Photo ingestion"
      detail="Upload high-resolution originals and watch them appear in the gallery."
    >
      <UploadsPanel event={event} photos={photos} />
    </WorkspacePage>
  );
}
