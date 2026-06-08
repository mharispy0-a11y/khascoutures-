export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase";
import type { Enquiry } from "@/lib/supabase";
import EnquiriesManager from "./EnquiriesManager";

async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Enquiry[]) ?? [];
  } catch {
    return [];
  }
}

export default async function EnquiriesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const enquiries = await getEnquiries();
  const unread = enquiries.filter((e) => !e.read).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Enquiries</h1>
        {unread > 0 && (
          <span className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium">
            {unread} unread
          </span>
        )}
      </div>
      <EnquiriesManager initialData={enquiries} />
    </div>
  );
}
