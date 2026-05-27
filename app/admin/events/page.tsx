import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-data";
import { AdminEvents } from "@/components/admin/admin-panels";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const isAdmin = await requireAdmin(user.id);
  if (!isAdmin) redirect("/dashboard");

  return <AdminEvents />;
}
