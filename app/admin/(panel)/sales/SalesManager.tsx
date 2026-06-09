"use client";

import { useState, useMemo } from "react";
import type { SaleEntry } from "@/lib/supabase";

const CATEGORIES = ["bridal", "party", "pret", "other"] as const;
const CAT_LABELS: Record<string, string> = { bridal: "Bridal", party: "Party Wear", pret: "Pret", other: "Other" };
const CAT_COLORS: Record<string, string> = {
  bridal: "bg-rose-50 text-rose-700",
  party: "bg-purple-50 text-purple-700",
  pret: "bg-emerald-50 text-emerald-700",
  other: "bg-gray-100 text-gray-600",
};

const today = new Date().toISOString().slice(0, 10);

const defaultForm = {
  sale_date: today,
  category: "bridal" as SaleEntry["category"],
  item_name: "",
  quantity: 1,
  price_pkr: 0,
  total_revenue: 0,
  notes: "",
};

const inputClass = "w-full border border-gray-300 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500";

export default function SalesManager({ initialData }: { initialData: SaleEntry[] }) {
  const [entries, setEntries] = useState<SaleEntry[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filterMonth, setFilterMonth] = useState(today.slice(0, 7));

  function updateForm(partial: Partial<typeof defaultForm>) {
    setForm((prev) => {
      const next = { ...prev, ...partial };
      if ("quantity" in partial || "price_pkr" in partial) {
        next.total_revenue = next.quantity * next.price_pkr;
      }
      return next;
    });
  }

  async function save() {
    if (!form.item_name.trim()) { setError("Item name is required."); return; }
    if (form.price_pkr <= 0) { setError("Price must be greater than 0."); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, notes: form.notes || null }),
      });
      const json = (await res.json()) as { data?: SaleEntry; error?: string };
      if (!res.ok) { setError(json.error ?? "Failed to save"); return; }
      setEntries((prev) => [json.data!, ...prev]);
      setForm({ ...defaultForm, sale_date: form.sale_date, category: form.category });
      setShowForm(false);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteEntry(e: SaleEntry) {
    if (!confirm(`Delete this entry — ${e.item_name}?`)) return;
    const res = await fetch(`/api/admin/sales/${e.id}`, { method: "DELETE" });
    if (res.ok) setEntries((prev) => prev.filter((x) => x.id !== e.id));
  }

  const filtered = useMemo(
    () => entries.filter((e) => e.sale_date.startsWith(filterMonth)),
    [entries, filterMonth]
  );

  const stats = useMemo(() => {
    const totalRevenue = filtered.reduce((s, e) => s + e.total_revenue, 0);
    const totalItems = filtered.reduce((s, e) => s + e.quantity, 0);
    const byCategory = CATEGORIES.map((cat) => {
      const catEntries = filtered.filter((e) => e.category === cat);
      return {
        cat,
        revenue: catEntries.reduce((s, e) => s + e.total_revenue, 0),
        count: catEntries.reduce((s, e) => s + e.quantity, 0),
      };
    }).sort((a, b) => b.revenue - a.revenue);
    return { totalRevenue, totalItems, byCategory };
  }, [filtered]);

  const grouped = useMemo(() => {
    const map = new Map<string, SaleEntry[]>();
    for (const e of filtered) {
      if (!map.has(e.sale_date)) map.set(e.sale_date, []);
      map.get(e.sale_date)!.push(e);
    }
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  return (
    <>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={() => { setShowForm(true); setError(""); setForm({ ...defaultForm }); }}
          className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          + Log Sale
        </button>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 whitespace-nowrap">Month:</label>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-900 tabular-nums">
            PKR {stats.totalRevenue.toLocaleString("en-PK")}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Revenue this month</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalItems}</p>
          <p className="text-xs text-gray-500 mt-0.5">Items sold</p>
        </div>
        {stats.byCategory.slice(0, 2).map(({ cat, revenue, count }) => (
          <div key={cat} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{count}</p>
            <p className="text-xs text-gray-500 mt-0.5">{CAT_LABELS[cat]}</p>
            <p className="text-xs text-amber-600 mt-0.5 tabular-nums">PKR {revenue.toLocaleString("en-PK")}</p>
          </div>
        ))}
      </div>

      {/* Best category badge */}
      {stats.byCategory[0]?.count > 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex flex-wrap items-center gap-2">
          <span className="text-amber-600 text-sm font-medium">Top category:</span>
          <span className="text-amber-800 font-semibold text-sm">{CAT_LABELS[stats.byCategory[0].cat]}</span>
          <span className="text-amber-600 text-xs">
            — {stats.byCategory[0].count} items · PKR {stats.byCategory[0].revenue.toLocaleString("en-PK")}
          </span>
        </div>
      )}

      {/* Log entry form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Log a Sale</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Date *</label>
              <input
                type="date"
                className={inputClass}
                value={form.sale_date}
                onChange={(e) => updateForm({ sale_date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Category *</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => updateForm({ category: e.target.value as SaleEntry["category"] })}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{CAT_LABELS[c]}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Item Name *</label>
              <input
                className={inputClass}
                value={form.item_name}
                onChange={(e) => updateForm({ item_name: e.target.value })}
                placeholder="e.g. Crimson Zari Lehenga"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Quantity *</label>
              <input
                type="number"
                min={1}
                className={inputClass}
                value={form.quantity}
                onChange={(e) => updateForm({ quantity: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Price per item (PKR) *</label>
              <input
                type="number"
                min={0}
                inputMode="numeric"
                className={inputClass}
                value={form.price_pkr || ""}
                onChange={(e) => updateForm({ price_pkr: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="sm:col-span-2">
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <p className="text-xs text-amber-600 font-medium">
                  Total Revenue:{" "}
                  <span className="text-amber-800 text-base font-bold tabular-nums">
                    PKR {form.total_revenue.toLocaleString("en-PK")}
                  </span>
                </p>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Notes <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                className={inputClass}
                value={form.notes}
                onChange={(e) => updateForm({ notes: e.target.value })}
                placeholder="e.g. paid deposit, custom order, etc."
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={save}
              disabled={saving}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? "Saving…" : "Save Entry"}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Entries by day */}
      {grouped.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500 text-sm">No sales logged for {filterMonth}.</p>
          <p className="text-gray-400 text-xs mt-1">Click "Log Sale" to record your first entry.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {grouped.map(([date, dayEntries]) => {
            const dayRevenue = dayEntries.reduce((s, e) => s + e.total_revenue, 0);
            return (
              <div key={date} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(date + "T12:00:00").toLocaleDateString("en-PK", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <span className="text-sm font-semibold text-amber-700 tabular-nums">
                    PKR {dayRevenue.toLocaleString("en-PK")}
                  </span>
                </div>
                <div className="divide-y divide-gray-100">
                  {dayEntries.map((e) => (
                    <div key={e.id} className="px-4 py-3.5 flex items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                        <span className={`text-xs px-2 py-1 rounded flex-shrink-0 ${CAT_COLORS[e.category]}`}>
                          {CAT_LABELS[e.category]}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{e.item_name}</p>
                          {e.notes && <p className="text-xs text-gray-400 truncate">{e.notes}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 tabular-nums">×{e.quantity} @ PKR {e.price_pkr.toLocaleString("en-PK")}</p>
                          <p className="text-sm font-semibold text-gray-900 tabular-nums">PKR {e.total_revenue.toLocaleString("en-PK")}</p>
                        </div>
                        <button
                          onClick={() => deleteEntry(e)}
                          className="text-xs text-red-400 hover:text-red-600 py-2 px-1"
                          aria-label="Delete entry"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
