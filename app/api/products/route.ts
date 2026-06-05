import { NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

export const revalidate = 60;

export async function GET() {
  try {
    const db = getServerClient();
    const { data, error } = await db
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ data: data as Product[] });
  } catch {
    return NextResponse.json({ data: [] });
  }
}
