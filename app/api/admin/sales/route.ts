import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getServerClient } from "@/lib/supabase";
import { z } from "zod";

const saleSchema = z.object({
  sale_date: z.string().min(1),
  category: z.enum(["bridal", "party", "pret", "other"]),
  item_name: z.string().min(1).max(200),
  quantity: z.number().int().min(1),
  price_pkr: z.number().min(0),
  total_revenue: z.number().min(0),
  notes: z.string().max(500).nullable().optional(),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    const db = getServerClient();
    let query = db.from("sale_entries").select("*").order("sale_date", { ascending: false }).order("created_at", { ascending: false });
    if (from) query = query.gte("sale_date", from);
    if (to) query = query.lte("sale_date", to);
    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const parsed = saleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });

  try {
    const db = getServerClient();
    const { data, error } = await db.from("sale_entries").insert(parsed.data).select().single();
    if (error) throw error;
    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
