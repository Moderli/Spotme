import { MatchingPanel } from "@/components/dashboard/workspace-panels";
import { WorkspacePage, workspaceParams } from "@/components/dashboard/workspace-page";

export function generateStaticParams() {
  return workspaceParams();
}

export default async function AiMatchingPage({ params }: PageProps<"/dashboard/events/[eventId]/ai-matching">) {
  const { eventId } = await params;

  return (
    <WorkspacePage
      eventId={eventId}
      activePath="/ai-matching"
      eyebrow="AI Matching"
      title="Photo discovery pipeline"
      detail="See matching progress, facial detections and recently completed guest deliveries."
    >
      <MatchingPanel />
    </WorkspacePage>
  );
}
