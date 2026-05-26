import { UploadsPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function UploadsPage({ params }: PageProps<"/dashboard/events/[eventId]/uploads">) {
  const { eventId } = await params;

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/uploads"
      eyebrow="Uploads"
      title="Photo ingestion"
      detail="Upload high-resolution originals and follow the AI indexing pipeline in real time."
    >
      <UploadsPanel />
    </WorkspacePage>
  );
}
