import { GalleryPageClient } from "./gallery-client";
import { fetchGuestGallery } from "@/lib/guest-data-server";

export const dynamic = "force-dynamic";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const photos = await fetchGuestGallery(eventId);

  return <GalleryPageClient eventId={eventId} photos={photos} />;
}
