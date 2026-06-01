import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Helper to extract the internal storage path from a Supabase public URL.
 * e.g., https://[proj].supabase.co/storage/v1/object/public/event-covers/user-id/filename.jpg
 * returns "user-id/filename.jpg"
 */
export function getPathFromUrl(url: string, bucket: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = url.indexOf(marker);
    if (index !== -1) {
      return decodeURIComponent(url.slice(index + marker.length));
    }
    return null;
  } catch (err) {
    console.error("Failed to parse storage URL:", err);
    return null;
  }
}

/**
 * Recursively lists and deletes all files in a folder inside a bucket.
 */
export async function deleteFolder(supabase: SupabaseClient, bucket: string, folderPath: string) {
  let hasMore = true;
  const limit = 100;
  
  while (hasMore) {
    // List files under the specified folder
    const { data: files, error } = await supabase.storage
      .from(bucket)
      .list(folderPath, { limit, offset: 0 });
      
    if (error) {
      console.error(`Error listing folder "${folderPath}" in bucket "${bucket}":`, error.message);
      break;
    }
    
    if (!files || files.length === 0) {
      hasMore = false;
      break;
    }
    
    // Prepare absolute paths within the bucket for deletion
    const pathsToDelete = files.map((f) => `${folderPath}/${f.name}`);
    const { error: removeError } = await supabase.storage
      .from(bucket)
      .remove(pathsToDelete);
      
    if (removeError) {
      console.error(`Error removing files from folder "${folderPath}" in bucket "${bucket}":`, removeError.message);
      break;
    }
    
    // If the count of fetched files is less than our limit, we have deleted all files
    if (files.length < limit) {
      hasMore = false;
    }
  }
}

/**
 * Deletes all files associated with an event in Supabase storage buckets.
 */
export async function deleteEventStorage(supabase: SupabaseClient, eventId: string, coverUrl: string | null) {
  // 1. Delete cover image from "event-covers" bucket
  if (coverUrl) {
    const coverPath = getPathFromUrl(coverUrl, "event-covers");
    if (coverPath) {
      const { error } = await supabase.storage.from("event-covers").remove([coverPath]);
      if (error) {
        console.error(`Error deleting cover path "${coverPath}" from "event-covers":`, error.message);
      }
    }
  }
  
  // 2. Delete all files in the event's photos folder in "event-photos"
  await deleteFolder(supabase, "event-photos", eventId);
  
  // 3. Delete all files in the event's selfies folder in "guest-selfies"
  await deleteFolder(supabase, "guest-selfies", `selfies/${eventId}`);
}
