import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, role, content, rating } = await req.json();

  if (!name?.trim() || !content?.trim()) {
    return NextResponse.json({ error: "Name and review are required" }, { status: 400 });
  }
  if (content.length > 1000) {
    return NextResponse.json({ error: "Review too long" }, { status: 400 });
  }

  const db = getServerClient();
  const { error } = await db.from("reviews").insert({
    name: name.trim(),
    role: role?.trim() || null,
    content: content.trim(),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    approved: false,
    pinned: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
