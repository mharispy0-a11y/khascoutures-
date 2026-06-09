export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase";
import type { SaleEntry } from "@/lib/supabase";
import SalesManager from "./SalesManager";

async function getSales(): Promise<SaleEntry[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("sale_entries")
      .select("*")
      .order("sale_date", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(500);
    return (data as SaleEntry[]) ?? [];
  } catch {
    return [];
  }
}

export default async function SalesPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const entries = await getSales();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Sales Log</h1>
        <p className="text-sm text-gray-500 mt-0.5">Record daily sales — what was sold, quantity, and price. Used for revenue tracking and trend analysis.</p>
      </div>
      <SalesManager initialData={entries} />
    </div>
  );
}
