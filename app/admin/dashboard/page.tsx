export const dynamic = "force-dynamic";

import { getServerClient } from "@/lib/supabase";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getStats() {
  try {
    const db = getServerClient();
    const now = new Date();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10);

    const [
      totalAppts, pendingAppts, weekAppts, activeProducts,
      activeAnnouncements, unreadEnquiries,
      monthlySales, recentSales,
    ] = await Promise.all([
      db.from("appointments").select("id", { count: "exact", head: true }),
      db.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
      db.from("appointments").select("id", { count: "exact", head: true }).gte("created_at", weekAgo),
      db.from("products").select("id", { count: "exact", head: true }).eq("is_active", true),
      db.from("announcements").select("id", { count: "exact", head: true }).eq("active", true),
      db.from("enquiries").select("id", { count: "exact", head: true }).eq("read", false),
      db.from("sale_entries").select("total_revenue,category").gte("sale_date", monthStart).lte("sale_date", monthEnd),
      db.from("sale_entries").select("item_name,category,total_revenue,sale_date").order("sale_date", { ascending: false }).limit(5),
    ]);

    const monthRevenue = (monthlySales.data ?? []).reduce((s: number, r: { total_revenue: number }) => s + r.total_revenue, 0);
    const categoryBreakdown = (monthlySales.data ?? []).reduce<Record<string, number>>((acc, r: { category: string; total_revenue: number }) => {
      acc[r.category] = (acc[r.category] ?? 0) + r.total_revenue;
      return acc;
    }, {});
    const topCategory = Object.entries(categoryBreakdown).sort((a, b) => b[1] - a[1])[0];

    return {
      totalAppts: totalAppts.count ?? 0,
      pendingAppts: pendingAppts.count ?? 0,
      weekAppts: weekAppts.count ?? 0,
      activeProducts: activeProducts.count ?? 0,
      activeAnnouncements: activeAnnouncements.count ?? 0,
      unreadEnquiries: unreadEnquiries.count ?? 0,
      monthRevenue,
      topCategory: topCategory ? { name: topCategory[0], revenue: topCategory[1] } : null,
      recentSales: (recentSales.data ?? []) as { item_name: string; category: string; total_revenue: number; sale_date: string }[],
    };
  } catch {
    return {
      totalAppts: 0, pendingAppts: 0, weekAppts: 0, activeProducts: 0,
      activeAnnouncements: 0, unreadEnquiries: 0, monthRevenue: 0,
      topCategory: null, recentSales: [],
    };
  }
}

const CAT_LABELS: Record<string, string> = { bridal: "Bridal", party: "Party Wear", pret: "Pret", other: "Other" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const s = await getStats();
  const monthName = new Date().toLocaleString("en-PK", { month: "long", year: "numeric" });

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-0.5">Dashboard</h1>
      <p className="text-sm text-gray-400 mb-5">{monthName}</p>

      {/* Revenue highlight */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs text-amber-600 uppercase tracking-wider font-medium mb-1">Revenue this month</p>
          <p className="text-3xl sm:text-4xl font-bold text-amber-800">
            PKR {s.monthRevenue.toLocaleString("en-PK")}
          </p>
          {s.topCategory && (
            <p className="text-sm text-amber-600 mt-1">
              Top: <span className="font-semibold">{CAT_LABELS[s.topCategory.name] ?? s.topCategory.name}</span>
              {" — "}PKR {s.topCategory.revenue.toLocaleString("en-PK")}
            </p>
          )}
        </div>
        <Link
          href="/admin/sales"
          className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Log Sales →
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Appointments", value: s.totalAppts, href: "/admin/appointments", color: "bg-blue-50 border-blue-200 text-blue-700" },
          { label: "Pending Follow-up", value: s.pendingAppts, href: "/admin/appointments", color: "bg-amber-50 border-amber-200 text-amber-700" },
          { label: "New This Week", value: s.weekAppts, href: "/admin/appointments", color: "bg-green-50 border-green-200 text-green-700" },
          { label: "Active Products", value: s.activeProducts, href: "/admin/products", color: "bg-purple-50 border-purple-200 text-purple-700" },
          { label: "Live Announcements", value: s.activeAnnouncements, href: "/admin/announcements", color: "bg-indigo-50 border-indigo-200 text-indigo-700" },
          { label: "Unread Enquiries", value: s.unreadEnquiries, href: "/admin/enquiries", color: "bg-rose-50 border-rose-200 text-rose-700" },
        ].map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`border rounded-xl p-4 sm:p-5 hover:shadow-sm active:scale-[0.98] transition-all ${c.color}`}
          >
            <p className="text-2xl sm:text-3xl font-bold">{c.value}</p>
            <p className="text-xs mt-1 opacity-80 leading-tight">{c.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent sales + quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent sales */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-medium text-gray-800">Recent Sales</h2>
            <Link href="/admin/sales" className="text-xs text-amber-600 hover:text-amber-800">View all →</Link>
          </div>
          {s.recentSales.length === 0 ? (
            <p className="text-sm text-gray-400">No sales logged yet.</p>
          ) : (
            <div className="space-y-3">
              {s.recentSales.map((sale, i) => (
                <div key={i} className="flex items-center justify-between gap-2 text-sm">
                  <div className="min-w-0">
                    <p className="text-gray-800 font-medium truncate">{sale.item_name}</p>
                    <p className="text-xs text-gray-400">{CAT_LABELS[sale.category] ?? sale.category} · {sale.sale_date}</p>
                  </div>
                  <p className="text-amber-700 font-semibold text-xs flex-shrink-0">
                    PKR {sale.total_revenue.toLocaleString("en-PK")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 gap-3">
          {[
            { href: "/admin/announcements", title: "Announcements", desc: "Post a sale, closure, or new arrival notice." },
            { href: "/admin/products", title: "Products", desc: "Add, edit, reorder, or remove collection items." },
            { href: "/admin/gallery", title: "Gallery", desc: "Manage lookbook images visible on the site." },
            { href: "/admin/customers", title: "Customers", desc: "View customer opt-ins and contact details." },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:border-amber-300 active:bg-amber-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
