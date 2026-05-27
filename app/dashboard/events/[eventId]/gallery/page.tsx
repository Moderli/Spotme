import { GalleryPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage } from "@/components/dashboard/workspace-page";
import { fetchEventPhotos } from "@/lib/dashboard-data";

export const dynamic = "force-dynamic";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const photos = await fetchEventPhotos(eventId);

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/gallery"
      eyebrow="Gallery"
      title="Event photographs"
      detail="Curate, search and review the images guests are discovering from this event."
    >
      <GalleryPanel photos={photos} />
    </WorkspacePage>
  );
}
