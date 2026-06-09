export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase";
import type { Customer } from "@/lib/supabase";
import CustomersTable from "./CustomersTable";

async function getCustomers(): Promise<Customer[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Customer[]) ?? [];
  } catch {
    return [];
  }
}

export default async function CustomersPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const customers = await getCustomers();

  const thisMonth = customers.filter((c) => {
    const d = new Date(c.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const fromInstagram = customers.filter((c) => c.source === "instagram").length;
  const fromFacebook = customers.filter((c) => c.source === "facebook").length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Customers / Leads</h1>
        <span className="text-sm text-gray-500">{customers.length} total</span>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Leads", value: customers.length, color: "bg-blue-50 text-blue-700" },
          { label: "This Month", value: thisMonth, color: "bg-green-50 text-green-700" },
          { label: "From Instagram", value: fromInstagram, color: "bg-purple-50 text-purple-700" },
          { label: "From Facebook", value: fromFacebook, color: "bg-sky-50 text-sky-700" },
        ].map((s) => (
          <div key={s.label} className={`rounded-lg p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs mt-0.5 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <CustomersTable initialData={customers} />
    </div>
  );
}
