"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { Customer } from "@/lib/supabase";

const SOURCES = ["all", "instagram", "facebook", "threads", "whatsapp", "direct"];
const INTERESTS = ["all", "bridal", "party", "pret", "general"];

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

  const sourceBadge: Record<string, string> = {
    instagram: "bg-purple-100 text-purple-700",
    facebook: "bg-blue-100 text-blue-700",
    threads: "bg-gray-100 text-gray-700",
    whatsapp: "bg-green-100 text-green-700",
    direct: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm flex-1 min-w-[180px]"
        />
        <select value={source} onChange={(e) => setSource(e.target.value)} className="border border-gray-300 rounded px-3 py-1.5 text-sm">
          {SOURCES.map((s) => <option key={s} value={s}>{s === "all" ? "All sources" : s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select value={interest} onChange={(e) => setInterest(e.target.value)} className="border border-gray-300 rounded px-3 py-1.5 text-sm">
          {INTERESTS.map((i) => <option key={i} value={i}>{i === "all" ? "All interests" : i.charAt(0).toUpperCase() + i.slice(1)}</option>)}
        </select>
        <button onClick={exportCSV} className="ml-auto px-4 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors whitespace-nowrap">
          Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["Name", "Email", "Phone", "Source", "Interest", "Date", "Notes"].map((h) => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-medium text-gray-500 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">No customers match the filters.</td></tr>
            ) : (
              filtered.map((c) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2 border-t border-gray-100 text-xs text-gray-400">{filtered.length} of {data.length} records</div>
    </div>
  );
}
