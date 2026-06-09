"use client";

import { useState } from "react";
import type { Appointment } from "@/lib/supabase";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const OCCASION_LABELS: Record<string, string> = {
  bridal: "Bridal",
  party: "Party",
  pret: "Pret",
  custom: "Custom",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
}

function exportCsv(rows: Appointment[]) {
  const headers = ["Name", "Phone", "Email", "Occasion", "Status", "Message", "Date"];
  const lines = rows.map((r) =>
    [
      `"${r.name}"`,
      `"${r.phone}"`,
      `"${r.email ?? ""}"`,
      `"${OCCASION_LABELS[r.occasion] ?? r.occasion}"`,
      `"${r.status}"`,
      `"${(r.message ?? "").replace(/"/g, '""')}"`,
      `"${formatDate(r.created_at)}"`,
    ].join(",")
  );
  const csv = [headers.join(","), ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AppointmentsTable({ initialData }: { initialData: Appointment[] }) {
  const [data, setData] = useState<Appointment[]>(initialData);
  const [filter, setFilter] = useState<string>("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const filtered = filter === "all" ? data : data.filter((a) => a.status === filter);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setData((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: status as Appointment["status"] } : a))
        );
      }
    } finally {
      setUpdating(null);
    }
  }

  return (
    <>
      {/* Filter + export */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="flex flex-wrap gap-2">
          {["all", "pending", "contacted", "confirmed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-amber-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-amber-400"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
        <button
          onClick={() => exportCsv(filtered)}
          className="ml-auto px-4 py-2 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:border-gray-400 flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-400 text-sm">
          No appointments found.
        </div>
      ) : (
        <>
          {/* Mobile: card list */}
          <div className="block md:hidden space-y-3">
            {filtered.map((appt) => (
              <div key={appt.id} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{appt.name}</p>
                    {appt.email && <p className="text-xs text-gray-400 mt-0.5">{appt.email}</p>}
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded flex-shrink-0">
                    {OCCASION_LABELS[appt.occasion] ?? appt.occasion}
                  </span>
                </div>
                {appt.message && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{appt.message}</p>
                )}
                <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-gray-100">
                  <select
                    value={appt.status}
                    disabled={updating === appt.id}
                    onChange={(e) => updateStatus(appt.id, e.target.value)}
                    className={`text-xs font-medium px-3 py-2 rounded-lg border-0 cursor-pointer flex-1 min-w-0 ${STATUS_COLORS[appt.status] ?? ""}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <a
                    href={`https://wa.me/${encodeURIComponent(appt.phone.replace(/[\s\-]/g, "").replace(/^\+/, ""))}?text=${encodeURIComponent(`Hello ${appt.name}, this is KhasCouture regarding your ${OCCASION_LABELS[appt.occasion] ?? appt.occasion} appointment request.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs bg-[#25D366] text-white px-3 py-2 rounded-lg hover:bg-[#1eb858] transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    WhatsApp
                  </a>
                  <span className="text-xs text-gray-400 ml-auto">{formatDate(appt.created_at)}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2 font-medium">{appt.phone}</p>
              </div>
            ))}
          </div>

          {/* Desktop: table */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {["Name", "Phone", "Occasion", "Date", "Status", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((appt) => (
                    <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{appt.name}</p>
                        {appt.email && <p className="text-xs text-gray-400">{appt.email}</p>}
                        {appt.message && (
                          <p className="text-xs text-gray-400 max-w-xs truncate mt-0.5">{appt.message}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{appt.phone}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                          {OCCASION_LABELS[appt.occasion] ?? appt.occasion}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {formatDate(appt.created_at)}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={appt.status}
                          disabled={updating === appt.id}
                          onChange={(e) => updateStatus(appt.id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded border-0 cursor-pointer ${STATUS_COLORS[appt.status] ?? ""}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <a
                          href={`https://wa.me/${encodeURIComponent(appt.phone.replace(/[\s\-]/g, "").replace(/^\+/, ""))}?text=${encodeURIComponent(`Hello ${appt.name}, this is KhasCouture regarding your ${OCCASION_LABELS[appt.occasion] ?? appt.occasion} appointment request.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs bg-[#25D366] text-white px-2.5 py-1.5 rounded hover:bg-[#1eb858] transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          WhatsApp
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}
