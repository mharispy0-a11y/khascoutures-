"use client";

import { useState } from "react";
import type { Announcement } from "@/lib/supabase";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All Pages",
  bridal: "Bridal Section",
  party: "Party Wear Section",
  pret: "Pret Section",
};

const defaultForm = {
  title: "",
  body: "",
  category: "all" as Announcement["category"],
  active: true,
  pinned: false,
  starts_at: "",
  ends_at: "",
};

type FormState = typeof defaultForm;

const inputClass = "w-full border border-gray-300 rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500";

export default function AnnouncementsManager({ initialData }: { initialData: Announcement[] }) {
  const [items, setItems] = useState<Announcement[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function startNew() {
    setForm(defaultForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  function startEdit(a: Announcement) {
    setForm({
      title: a.title,
      body: a.body,
      category: a.category,
      active: a.active,
      pinned: a.pinned,
      starts_at: a.starts_at ? a.starts_at.slice(0, 10) : "",
      ends_at: a.ends_at ? a.ends_at.slice(0, 10) : "",
    });
    setEditingId(a.id);
    setShowForm(true);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    if (!form.title.trim() || !form.body.trim()) { setError("Title and message are required."); return; }
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      starts_at: form.starts_at || null,
      ends_at: form.ends_at || null,
    };
    try {
      const url = editingId ? `/api/admin/announcements/${editingId}` : "/api/admin/announcements";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json()) as { data?: Announcement; error?: string };
      if (!res.ok) { setError(json.error ?? "Failed to save"); return; }
      if (editingId) {
        setItems((prev) => prev.map((x) => (x.id === editingId ? json.data! : x)));
      } else {
        setItems((prev) => [json.data!, ...prev]);
      }
      setShowForm(false);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(a: Announcement) {
    const res = await fetch(`/api/admin/announcements/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !a.active }),
    });
    if (res.ok) setItems((prev) => prev.map((x) => (x.id === a.id ? { ...x, active: !a.active } : x)));
  }

  async function deleteItem(a: Announcement) {
    if (!confirm(`Delete "${a.title}"?`)) return;
    const res = await fetch(`/api/admin/announcements/${a.id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((x) => x.id !== a.id));
  }

  return (
    <>
      <div className="mb-4">
        <button
          onClick={startNew}
          className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors"
        >
          + New Announcement
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {editingId ? "Edit Announcement" : "New Announcement"}
          </h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Title *</label>
              <input
                className={inputClass}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Eid Sale — 20% off all Pret"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">
                Message * <span className="text-gray-400 font-normal">(shown to customers)</span>
              </label>
              <textarea
                rows={3}
                className={inputClass}
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                placeholder="Full announcement text..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Show On</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as Announcement["category"] })}
              >
                <option value="all">All Pages (Home + Collections)</option>
                <option value="bridal">Bridal Section only</option>
                <option value="party">Party Wear Section only</option>
                <option value="pret">Pret Section only</option>
              </select>
            </div>
            <div className="flex flex-wrap items-center gap-6 py-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 select-none">Active (visible on site)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm text-gray-700 select-none">Pinned (shown first)</span>
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  Start Date <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.starts_at}
                  onChange={(e) => setForm({ ...form, starts_at: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  End Date <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  className={inputClass}
                  value={form.ends_at}
                  onChange={(e) => setForm({ ...form, ends_at: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
            <button
              onClick={save}
              disabled={saving}
              className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
            >
              {saving ? "Saving…" : "Save"}
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

      {items.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500 text-sm">No announcements yet.</p>
          <p className="text-gray-400 text-xs mt-1">Create one to post a sale, closure notice, or new arrival.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div
              key={a.id}
              className={`bg-white border rounded-xl p-4 sm:p-5 transition-opacity ${a.active ? "border-gray-200" : "border-gray-100 opacity-60"}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${a.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                      {a.active ? "Live" : "Hidden"}
                    </span>
                    <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                      {CATEGORY_LABELS[a.category]}
                    </span>
                    {a.pinned && (
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md">Pinned</span>
                    )}
                    {a.ends_at && (
                      <span className="text-xs text-gray-400">
                        Ends {new Date(a.ends_at).toLocaleDateString("en-PK")}
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-gray-900 text-sm">{a.title}</p>
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{a.body}</p>
                </div>
              </div>
              {/* Actions below on mobile, inline on larger screens */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => toggleActive(a)}
                  className="text-xs text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-400 px-3 py-2 rounded-lg transition-colors"
                >
                  {a.active ? "Hide" : "Publish"}
                </button>
                <button
                  onClick={() => startEdit(a)}
                  className="text-xs text-amber-600 hover:text-amber-800 font-medium px-3 py-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(a)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-2 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
