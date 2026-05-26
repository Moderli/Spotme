import { GalleryPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function GalleryPage({ params }: PageProps<"/dashboard/events/[eventId]/gallery">) {
  const { eventId } = await params;

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/gallery"
      eyebrow="Gallery"
      title="Event photographs"
      detail="Curate, search and review the images guests are discovering from this event."
    >
      <GalleryPanel />
    </WorkspacePage>
  );
}
