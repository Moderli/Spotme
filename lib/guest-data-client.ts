// ============================================================
// guest-data-client.ts — Client-only Supabase data access
// Safe to import in Client Components ("use client")
// ============================================================
import { createClient } from "@/lib/supabase/client";
import type { Guest, EventPhoto } from "@/types/database";

export type { Guest, EventPhoto };

/**
 * Register (or re-find) a guest by phone number for an event.
 * Called client-side from the verify page.
 */
export async function registerGuest(
  eventId: string,
  phone: string,
  displayName: string
): Promise<Guest | null> {
  const supabase = createClient();

  // Check if guest already exists
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase as any)
    .from("guests")
    .select("*")
    .eq("event_id", eventId)
    .eq("phone", phone)
    .single();

  if (existing) return existing as Guest;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("guests")
    .insert({ event_id: eventId, phone, display_name: displayName })
    .select()
    .single();

  if (error) {
    console.error("registerGuest error:", error.message);
    return null;
  }

  return data as Guest;
}

/**
 * Save a guest selfie record after uploading to storage.
 */
export async function uploadGuestSelfie(payload: {
  guest_id: string;
  event_id: string;
  storage_path: string;
  public_url: string;
}): Promise<{ id: string } | null> {
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("guest_selfies")
    .insert({
      guest_id: payload.guest_id,
      event_id: payload.event_id,
      storage_path: payload.storage_path,
      public_url: payload.public_url,
      status: "uploaded",
    })
    .select("id")
    .single();

  if (error) {
    console.error("uploadGuestSelfie db error:", error.message);
    return null;
  }

  return data as { id: string };
}

/**
 * Fetch all event photos (for my-photos page — uses client-side).
 */
export async function fetchGuestGalleryClient(eventId: string): Promise<EventPhoto[]> {
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from("event_photos")
    .select("*")
    .eq("event_id", eventId)
    .order("uploaded_at", { ascending: false });

  if (error) {
    console.error("fetchGuestGalleryClient error:", error.message);
    return [];
  }

  return (data ?? []) as EventPhoto[];
}

/**
 * Fetch photos matched to a specific guest.
 */
export async function fetchMyPhotos(guestId: string): Promise<EventPhoto[]> {
  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: matches, error: matchError } = await (supabase as any)
    .from("photo_matches")
    .select("event_photo_id")
    .eq("guest_id", guestId);

  if (matchError || !matches?.length) return [];

  const photoIds = (matches as { event_photo_id: string }[]).map((m) => m.event_photo_id);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: photos, error: photoError } = await (supabase as any)
    .from("event_photos")
    .select("*")
    .in("id", photoIds);

  if (photoError) {
    console.error("fetchMyPhotos error:", photoError.message);
    return [];
  }

  return (photos ?? []) as EventPhoto[];
}
