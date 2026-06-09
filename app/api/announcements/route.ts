import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import type { Announcement } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  try {
    const db = getServerClient();
    const today = new Date().toISOString().slice(0, 10);
    let query = db
      .from("announcements")
      .select("id,title,body,category,pinned,ends_at")
      .eq("active", true)
      .or(`starts_at.is.null,starts_at.lte.${today}`)
      .or(`ends_at.is.null,ends_at.gte.${today}`)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false });

    if (category && category !== "all") {
      query = query.in("category", ["all", category]);
    }

    const { data } = await query;
    return NextResponse.json({ data: (data as Announcement[]) ?? [] });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
