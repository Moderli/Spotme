// ============================================================
// guest-data.ts — Async Supabase data access for guest pages
// These use the anon client (no auth required for public data)
// ============================================================
import { createClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { Event, EventPhoto, Guest } from "@/types/database";

export type { Event, EventPhoto, Guest };

// -------------------------------------------------------
// Event lookup (public — for guest pages)
// -------------------------------------------------------

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

// -------------------------------------------------------
// Event gallery (public photos)
// -------------------------------------------------------

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

// -------------------------------------------------------
// Guest registration
// -------------------------------------------------------

/**
 * Register (or re-find) a guest by phone number for an event.
 * Called client-side from the verify page.
 * Returns the guest record (existing or newly created).
 */
export async function registerGuest(
  eventId: string,
  phone: string,
  displayName: string
): Promise<Guest | null> {
  const supabase = createClient();

  // Check if guest already exists for this event + phone
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: existing } = await (supabase as any)
    .from("guests")
    .select("*")
    .eq("event_id", eventId)
    .eq("phone", phone)
    .single();

  if (existing) return existing as Guest;

  // Create new guest record
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

// -------------------------------------------------------
// Selfie upload
// -------------------------------------------------------

/**
 * Save a guest selfie record after uploading to storage (client-side).
 * The actual file upload is done in the page component.
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

// -------------------------------------------------------
// My Photos (matched results)
// -------------------------------------------------------

/**
 * Fetch photos matched to a specific guest.
 * Called client-side after selfie is uploaded.
 */
export async function fetchMyPhotos(
  guestId: string
): Promise<EventPhoto[]> {
  const supabase = createClient();

  // Get matched photo IDs
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: matches, error: matchError } = await (supabase as any)
    .from("photo_matches")
    .select("event_photo_id")
    .eq("guest_id", guestId);

  if (matchError || !matches?.length) return [];

  const photoIds = (matches as { event_photo_id: string }[]).map((m) => m.event_photo_id);

  // Fetch the actual photos
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
