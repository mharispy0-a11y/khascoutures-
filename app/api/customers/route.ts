import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, email, phone, interest, source, utm_campaign } = await req.json();

  if (!email && !phone) {
    return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
  }

  const db = getServerClient();
  const { error } = await db.from("customers").insert({
    name: name?.trim() || null,
    email: email?.trim() || null,
    phone: phone?.trim() || null,
    interest: interest || null,
    source: source || "direct",
    utm_campaign: utm_campaign || null,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
