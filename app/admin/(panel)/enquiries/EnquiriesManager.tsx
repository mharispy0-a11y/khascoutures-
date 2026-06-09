"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { Enquiry } from "@/lib/supabase";

export default function EnquiriesManager({ initialData }: { initialData: Enquiry[] }) {
  const [items, setItems] = useState<Enquiry[]>(initialData);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  async function markRead(id: string, read: boolean) {
    const res = await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    if (res.ok) setItems((prev) => prev.map((e) => e.id === id ? { ...e, read } : e));
  }

  const shown = showUnreadOnly ? items.filter((e) => !e.read) : items;

  const sourceBadge: Record<string, string> = {
    instagram: "bg-purple-100 text-purple-700",
    facebook: "bg-blue-100 text-blue-700",
    direct: "bg-amber-100 text-amber-700",
    whatsapp: "bg-green-100 text-green-700",
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3 items-center">
        <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer py-1">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          Show unread only
        </label>
        <span className="text-xs text-gray-400 ml-auto">{shown.length} enquiries</span>
      </div>

      {shown.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-xl border border-gray-200">
          No enquiries yet.
        </div>
      ) : (
        shown.map((e) => (
          <div
            key={e.id}
            className={`bg-white border rounded-xl p-4 sm:p-5 transition-colors ${
              !e.read ? "border-amber-300 ring-1 ring-amber-100" : "border-gray-200"
            }`}
          >
            {/* Content */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-gray-800 text-sm">{e.name}</span>
                  {!e.read && (
                    <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-medium">NEW</span>
                  )}
                  {e.source && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sourceBadge[e.source] ?? "bg-gray-100 text-gray-600"}`}>
                      {e.source}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-gray-500 mb-2">
                  {e.email && <span className="truncate">{e.email}</span>}
                  {e.phone && <span className="font-medium text-gray-700">{e.phone}</span>}
                  <span className="sm:ml-auto text-gray-400 whitespace-nowrap">
                    {format(new Date(e.created_at), "d MMM yyyy, h:mm a")}
                  </span>
                </div>
                {e.message && (
                  <p className="text-sm text-gray-600 leading-relaxed">{e.message}</p>
                )}
              </div>
            </div>

            {/* Actions — row on mobile */}
            <div className="flex items-center gap-2 pt-3 border-t border-gray-100 flex-wrap">
              {e.phone && (
                <a
                  href={`https://wa.me/${e.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(e.name)}%2C%20thank%20you%20for%20your%20enquiry%20to%20KhasCouture.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#1eb858] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp
                </a>
              )}
              {e.email && (
                <a
                  href={`mailto:${e.email}?subject=Your%20KhasCouture%20Enquiry`}
                  className="text-xs px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Email
                </a>
              )}
              <button
                onClick={() => markRead(e.id, !e.read)}
                className="text-xs px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors ml-auto"
              >
                {e.read ? "Mark unread" : "Mark read"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
