import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { EventWorkspaceShell, PageHeading } from "@/components/dashboard/shell";
import { getEvent } from "@/lib/dashboard-data";

export function workspaceParams() {
  return [
    { eventId: "lake-como-wedding" },
    { eventId: "atelier-launch" },
    { eventId: "founders-retreat" },
  ];
}

export function WorkspacePage({
  eventId,
  activePath,
  eyebrow,
  title,
  detail,
  action,
  children,
}: {
  eventId: string;
  activePath: string;
  eyebrow: string;
  title: string;
  detail: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const event = getEvent(eventId);

  if (!event) {
    notFound();
  }

  return (
    <EventWorkspaceShell event={event} activePath={activePath}>
      <main className="p-4 sm:p-6 lg:p-9">
        <PageHeading eyebrow={eyebrow} title={title} detail={detail} action={action} />
        {children}
      </main>
    </EventWorkspaceShell>
  );
}
