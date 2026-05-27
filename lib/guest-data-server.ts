// ============================================================
// guest-data-server.ts — Server-only Supabase data access
// Only import this in Server Components or API Routes
// ============================================================
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { Event, EventPhoto } from "@/types/database";

export type { Event, EventPhoto };

/**
 * Fetch a single active event by ID for guest display.
 * Server-safe: use this in Server Components.
 */
export async function getGuestEvent(eventId: string): Promise<Event | null> {
  const supabase = await createServerClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("events")
    .select("*")
    .eq("id", eventId)
    .eq("status", "active")
    .eq("qr_active", true)
    .single();

  if (error) {
    console.error("getGuestEvent error:", error.message);
    return null;
  }

  return data as Event;
}

/**
 * Fetch all photos for a public event gallery.
 * Server-safe: use this in Server Components.
 */
export async function fetchGuestGallery(eventId: string): Promise<EventPhoto[]> {
  const supabase = await createServerClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("event_photos")
    .select("*")
    .eq("event_id", eventId)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("fetchGuestGallery error:", error.message);
    return [];
  }

  return (data ?? []) as EventPhoto[];
}
