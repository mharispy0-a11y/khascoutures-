"use client";

import { useState } from "react";
import { format } from "date-fns";
import type { Review } from "@/lib/supabase";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-amber-400 text-xs">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  );
}

function ReviewCard({
  review,
  onUpdate,
  onDelete,
}: {
  review: Review;
  onUpdate: (id: string, updates: Partial<Review>) => void;
  onDelete: (id: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  async function patch(updates: Partial<Review>) {
    setLoading(true);
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id, ...updates }),
    });
    if (res.ok) onUpdate(review.id, updates);
    setLoading(false);
  }

  async function del() {
    if (!confirm("Delete this review?")) return;
    setLoading(true);
    const res = await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id }),
    });
    if (res.ok) onDelete(review.id);
    setLoading(false);
  }

  return (
    <div className={`border rounded-lg p-4 bg-white ${review.pinned ? "border-amber-300 ring-1 ring-amber-200" : "border-gray-200"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-800 text-sm">{review.name}</span>
            {review.role && <span className="text-xs text-gray-400">{review.role}</span>}
            {review.pinned && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">Pinned</span>}
          </div>
          <StarRating rating={review.rating} />
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.content}</p>
          <p className="text-xs text-gray-400 mt-2">{format(new Date(review.created_at), "d MMM yyyy")}</p>
        </div>
        <div className="flex flex-col gap-1.5 flex-shrink-0">
          {!review.approved ? (
            <button
              onClick={() => patch({ approved: true })}
              disabled={loading}
              className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              Approve
            </button>
          ) : (
            <button
              onClick={() => patch({ approved: false })}
              disabled={loading}
              className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
            >
              Unapprove
            </button>
          )}
          <button
            onClick={() => patch({ pinned: !review.pinned })}
            disabled={loading}
            className={`text-xs px-3 py-1 rounded disabled:opacity-50 transition-colors ${
              review.pinned ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {review.pinned ? "Unpin" : "Pin"}
          </button>
          <button
            onClick={del}
            disabled={loading}
            className="text-xs px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 disabled:opacity-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsManager({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [tab, setTab] = useState<"pending" | "approved">("pending");

  function handleUpdate(id: string, updates: Partial<Review>) {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, ...updates } : r));
  }

  function handleDelete(id: string) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const pending = reviews.filter((r) => !r.approved);
  const approved = reviews.filter((r) => r.approved);
  const shown = tab === "pending" ? pending : approved;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setTab("pending")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${tab === "pending" ? "bg-amber-100 text-amber-800 font-medium" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
        >
          Pending {pending.length > 0 && <span className="ml-1 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full">{pending.length}</span>}
        </button>
        <button
          onClick={() => setTab("approved")}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${tab === "approved" ? "bg-green-100 text-green-800 font-medium" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
        >
          Approved ({approved.length})
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-lg border border-gray-200">
          No {tab} reviews.
        </div>
      ) : (
        shown.map((r) => (
          <ReviewCard key={r.id} review={r} onUpdate={handleUpdate} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
