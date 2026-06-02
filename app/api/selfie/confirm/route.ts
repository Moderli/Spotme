import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Server-side admin client — uses service role key
const adminSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

/**
 * POST /api/selfie/confirm
 *
 * Called after the browser has successfully uploaded the file directly to
 * Supabase Storage via a signed URL. Saves the guest_selfies DB record
 * and returns the public URL.
 *
 * Body: { storagePath: string, guestId: string, eventId: string }
 * Response: { publicUrl: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { storagePath, guestId, eventId } = await req.json();

    if (!storagePath || !eventId) {
      return NextResponse.json(
        { error: "Missing storagePath or eventId" },
        { status: 400 }
      );
    }

    // Build the public URL for this object
    const { data: urlData } = adminSupabase.storage
      .from("guest-selfies")
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;

    // Save the DB record if we have a guestId
    if (guestId) {
      // Delete old photo matches for this guest in this event since they are uploading a new selfie
      const { error: deleteMatchesError } = await adminSupabase
        .from("photo_matches")
        .delete()
        .eq("guest_id", guestId)
        .eq("event_id", eventId);

      if (deleteMatchesError) {
        console.error("[selfie/confirm] Failed to delete old photo matches:", deleteMatchesError.message);
      }

      const { error: dbError } = await adminSupabase
        .from("guest_selfies")
        .insert({
          guest_id: guestId,
          event_id: eventId,
          storage_path: storagePath,
          public_url: publicUrl,
          status: "uploaded",
        });

      if (dbError) {
        // Log but don't fail — file is in storage, AI can still pick it up
        console.error("[selfie/confirm] DB insert error:", dbError.message);
      }
    }

    return NextResponse.json({ publicUrl }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[selfie/confirm] Unexpected:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
