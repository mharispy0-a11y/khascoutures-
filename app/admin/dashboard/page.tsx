export const dynamic = "force-dynamic";

import { getServerClient } from "@/lib/supabase";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getStats() {
  try {
    const db = getServerClient();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const [total, pending, thisWeek, products] = await Promise.all([
      db.from("appointments").select("id", { count: "exact", head: true }),
      db.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
      db.from("appointments").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
      db.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
    ]);
    return {
      total: total.count ?? 0,
      pending: pending.count ?? 0,
      thisWeek: thisWeek.count ?? 0,
      products: products.count ?? 0,
    };
  } catch {
    return { total: 0, pending: 0, thisWeek: 0, products: 0 };
  }
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const stats = await getStats();

  const cards = [
    { label: "Total Appointments", value: stats.total, href: "/admin/appointments", color: "bg-blue-50 border-blue-200 text-blue-700" },
    { label: "Pending Follow-up", value: stats.pending, href: "/admin/appointments?status=pending", color: "bg-amber-50 border-amber-200 text-amber-700" },
    { label: "This Week", value: stats.thisWeek, href: "/admin/appointments", color: "bg-green-50 border-green-200 text-green-700" },
    { label: "Active Products", value: stats.products, href: "/admin/products", color: "bg-purple-50 border-purple-200 text-purple-700" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`border rounded-lg p-5 hover:shadow-sm transition-shadow ${c.color}`}
          >
            <p className="text-3xl font-bold">{c.value}</p>
            <p className="text-xs mt-1 opacity-80">{c.label}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/appointments"
          className="bg-white border border-gray-200 rounded-lg p-5 hover:border-amber-300 transition-colors"
        >
          <h2 className="font-medium text-gray-800 mb-1">Appointments</h2>
          <p className="text-sm text-gray-500">View and manage all appointment requests. Update status, message clients on WhatsApp, export CSV.</p>
        </Link>
        <Link
          href="/admin/products"
          className="bg-white border border-gray-200 rounded-lg p-5 hover:border-amber-300 transition-colors"
        >
          <h2 className="font-medium text-gray-800 mb-1">Products</h2>
          <p className="text-sm text-gray-500">Add, edit, and manage your collection items. Upload images, set prices, reorder.</p>
        </Link>
      </div>
    </div>
  );
}
