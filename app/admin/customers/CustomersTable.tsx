"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { Customer } from "@/lib/supabase";

const SOURCES = ["all", "instagram", "facebook", "threads", "whatsapp", "direct"];
const INTERESTS = ["all", "bridal", "party", "pret", "general"];

const inputClass = "border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500";

const sourceBadge: Record<string, string> = {
  instagram: "bg-purple-100 text-purple-700",
  facebook: "bg-blue-100 text-blue-700",
  threads: "bg-gray-100 text-gray-700",
  whatsapp: "bg-green-100 text-green-700",
  direct: "bg-amber-100 text-amber-700",
};

export default function CustomersTable({ initialData }: { initialData: Customer[] }) {
  const [data] = useState<Customer[]>(initialData);
  const [source, setSource] = useState("all");
  const [interest, setInterest] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = data.filter((c) => {
    if (source !== "all" && c.source !== source) return false;
    if (interest !== "all" && c.interest !== interest) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.phone?.includes(q)
      );
    }
    return true;
  });

  function exportCSV() {
    const headers = ["Name", "Email", "Phone", "Source", "Interest", "Campaign", "Notes", "Date"];
    const rows = filtered.map((c) => [
      c.name ?? "",
      c.email ?? "",
      c.phone ?? "",
      c.source ?? "",
      c.interest ?? "",
      c.utm_campaign ?? "",
      c.notes ?? "",
      format(new Date(c.created_at), "yyyy-MM-dd"),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `khascouture-leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${inputClass} flex-1 min-w-0`}
        />
        <select value={source} onChange={(e) => setSource(e.target.value)} className={inputClass}>
          {SOURCES.map((s) => <option key={s} value={s}>{s === "all" ? "All sources" : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select value={interest} onChange={(e) => setInterest(e.target.value)} className={inputClass}>
          {INTERESTS.map((i) => <option key={i} value={i}>{i === "all" ? "All interests" : i.charAt(0).toUpperCase() + i.slice(1)}</option>)}
        </select>
        <button
          onClick={exportCSV}
          className="px-4 py-3 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
        >
          Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="px-4 py-10 text-center text-gray-400 text-sm">No customers match the filters.</div>
      ) : (
        <>
          {/* Mobile: card list */}
          <div className="block md:hidden divide-y divide-gray-100">
            {filtered.map((c) => (
              <div key={c.id} className="p-4 active:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-medium text-gray-900 text-sm">{c.name || <span className="text-gray-300">—</span>}</p>
                  {c.source && (
                    <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${sourceBadge[c.source] ?? "bg-gray-100 text-gray-600"}`}>
                      {c.source}
                    </span>
                  )}
                </div>
                {c.email && <p className="text-xs text-gray-500 mb-1">{c.email}</p>}
                {c.phone && <p className="text-xs text-gray-700 font-medium mb-2">{c.phone}</p>}
                <div className="flex items-center gap-2 text-xs text-gray-400 flex-wrap">
                  {c.interest && <span className="capitalize bg-gray-50 px-2 py-0.5 rounded">{c.interest}</span>}
                  <span>{format(new Date(c.created_at), "d MMM yyyy")}</span>
                  {c.notes && <span className="truncate text-gray-400 max-w-[160px]">{c.notes}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {["Name", "Email", "Phone", "Source", "Interest", "Date", "Notes"].map((h) => (
                    <th key={h} className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{c.name || <span className="text-gray-300">—</span>}</td>
                    <td className="px-4 py-3 text-gray-600">{c.email || <span className="text-gray-300">—</span>}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.phone || <span className="text-gray-300">—</span>}</td>
                    <td className="px-4 py-3">
                      {c.source ? (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sourceBadge[c.source] ?? "bg-gray-100 text-gray-600"}`}>
                          {c.source}
                        </span>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 capitalize">{c.interest || <span className="text-gray-300">—</span>}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">{format(new Date(c.created_at), "d MMM yyyy")}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{c.notes || <span className="text-gray-300">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="px-4 py-2.5 border-t border-gray-100 text-xs text-gray-400">{filtered.length} of {data.length} records</div>
    </div>
  );
}
