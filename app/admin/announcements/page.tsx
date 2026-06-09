export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase";
import type { Announcement } from "@/lib/supabase";
import AnnouncementsManager from "./AnnouncementsManager";

async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Announcement[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AnnouncementsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const announcements = await getAnnouncements();
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Announcements</h1>
          <p className="text-sm text-gray-500 mt-0.5">Post notices that appear on the website — sales, new arrivals, closures.</p>
        </div>
        <span className="text-sm text-gray-500">{announcements.filter((a) => a.active).length} active</span>
      </div>
      <AnnouncementsManager initialData={announcements} />
    </div>
  );
}
