"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { Enquiry } from "@/lib/supabase";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567";

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
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
            className="rounded"
          />
          Show unread only
        </label>
        <span className="text-xs text-gray-400 ml-auto">{shown.length} enquiries</span>
      </div>

      {shown.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-lg border border-gray-200">
          No enquiries yet.
        </div>
      ) : (
        shown.map((e) => (
          <div
            key={e.id}
            className={`bg-white border rounded-lg p-5 transition-colors ${
              !e.read ? "border-amber-300 ring-1 ring-amber-100" : "border-gray-200"
            }`}
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-gray-800">{e.name}</span>
                  {!e.read && <span className="text-[10px] bg-amber-500 text-white px-1.5 py-0.5 rounded-full font-medium">NEW</span>}
                  {e.source && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${sourceBadge[e.source] ?? "bg-gray-100 text-gray-600"}`}>
                      {e.source}
                    </span>
                  )}
                </div>
                <div className="flex gap-4 text-xs text-gray-500 mb-2">
                  {e.email && <span>✉ {e.email}</span>}
                  {e.phone && <span>📞 {e.phone}</span>}
                  <span className="ml-auto">{format(new Date(e.created_at), "d MMM yyyy, h:mm a")}</span>
                </div>
                {e.message && <p className="text-sm text-gray-600 leading-relaxed">{e.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5 flex-shrink-0">
                {e.phone && (
                  <a
                    href={`https://wa.me/${e.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(e.name)}%2C%20thank%20you%20for%20your%20enquiry%20to%20KhasCouture.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-center"
                  >
                    WhatsApp
                  </a>
                )}
                {e.email && (
                  <a
                    href={`mailto:${e.email}?subject=Your%20KhasCouture%20Enquiry`}
                    className="text-xs px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-center"
                  >
                    Email
                  </a>
                )}
                <button
                  onClick={() => markRead(e.id, !e.read)}
                  className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                >
                  {e.read ? "Mark unread" : "Mark read"}
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
