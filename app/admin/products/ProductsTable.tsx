"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/supabase";

const CATEGORY_LABELS: Record<string, string> = { bridal: "Bridal", party: "Party", pret: "Pret" };

const defaultForm = {
  name: "",
  category: "bridal" as Product["category"],
  fabric: "",
  embroidery: "",
  price_pkr: "" as string | number,
  price_on_request: true,
  image_url: "",
  image_alt: "",
  whatsapp_enquiry_text: "",
  sort_order: 0,
  is_active: true,
};

type FormState = typeof defaultForm;

export default function ProductsTable({ initialData }: { initialData: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialData);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function startEdit(p: Product) {
    setForm({
      name: p.name,
      category: p.category,
      fabric: p.fabric ?? "",
      embroidery: p.embroidery ?? "",
      price_pkr: p.price_pkr ?? "",
      price_on_request: p.price_on_request,
      image_url: p.image_url ?? "",
      image_alt: p.image_alt ?? "",
      whatsapp_enquiry_text: p.whatsapp_enquiry_text ?? "",
      sort_order: p.sort_order,
      is_active: p.is_active,
    });
    setEditingId(p.id);
    setShowForm(true);
    setError("");
  }

  function startNew() {
    setForm(defaultForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  }

  async function save() {
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      price_pkr: form.price_pkr === "" ? null : Number(form.price_pkr),
      fabric: form.fabric || null,
      embroidery: form.embroidery || null,
      image_url: form.image_url || null,
      image_alt: form.image_alt || null,
      whatsapp_enquiry_text: form.whatsapp_enquiry_text || null,
    };
    try {
      const url = editingId ? `/api/admin/products/${editingId}` : "/api/admin/products";
      const method = editingId ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { data?: Product; error?: string };
      if (!res.ok) { setError(data.error ?? "Failed to save"); return; }
      if (editingId) {
        setProducts((prev) => prev.map((p) => (p.id === editingId ? (data.data ?? p) : p)));
      } else {
        setProducts((prev) => [...prev, data.data!]);
      }
      setShowForm(false);
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(p: Product) {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    if (res.ok) {
      setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, is_active: !p.is_active } : x)));
    }
  }

  async function changeOrder(id: string, direction: "up" | "down") {
    const idx = products.findIndex((p) => p.id === id);
    if (idx < 0) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= products.length) return;
    const a = products[idx], b = products[swapIdx];
    await Promise.all([
      fetch(`/api/admin/products/${a.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sort_order: b.sort_order }) }),
      fetch(`/api/admin/products/${b.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sort_order: a.sort_order }) }),
    ]);
    setProducts((prev) => {
      const next = [...prev];
      [next[idx], next[swapIdx]] = [{ ...next[idx], sort_order: b.sort_order }, { ...next[swapIdx], sort_order: a.sort_order }];
      return next.sort((x, y) => x.sort_order - y.sort_order);
    });
  }

  const inputClass = "w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500";

  return (
    <>
      <div className="mb-4">
        <button onClick={startNew} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{editingId ? "Edit Product" : "New Product"}</h2>
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Name *</label>
              <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category *</label>
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Product["category"] })}>
                <option value="bridal">Bridal</option>
                <option value="party">Party Wear</option>
                <option value="pret">Pret</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Sort Order</label>
              <input type="number" className={inputClass} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Fabric</label>
              <input className={inputClass} value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} placeholder="e.g. Raw Silk" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Embroidery</label>
              <input className={inputClass} value={form.embroidery} onChange={(e) => setForm({ ...form, embroidery: e.target.value })} placeholder="e.g. Zardozi & Dabka" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Price (PKR)</label>
              <input type="number" className={inputClass} value={form.price_pkr} onChange={(e) => setForm({ ...form, price_pkr: e.target.value })} placeholder="Leave blank for On Request" />
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input type="checkbox" id="por" checked={form.price_on_request} onChange={(e) => setForm({ ...form, price_on_request: e.target.checked })} className="rounded" />
              <label htmlFor="por" className="text-sm text-gray-700">Price on Request</label>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
              <input className={inputClass} value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">Image Alt Text</label>
              <input className={inputClass} value={form.image_alt} onChange={(e) => setForm({ ...form, image_alt: e.target.value })} placeholder="Descriptive alt text for accessibility" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">WhatsApp Enquiry Text</label>
              <input className={inputClass} value={form.whatsapp_enquiry_text} onChange={(e) => setForm({ ...form, whatsapp_enquiry_text: e.target.value })} placeholder="I'm interested in the ..." />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <button onClick={save} disabled={saving} className="bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white px-5 py-2 rounded text-sm font-medium">
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Order", "Product", "Category", "Price", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((p, idx) => (
                <tr key={p.id} className={`hover:bg-gray-50 transition-colors ${!p.is_active ? "opacity-50" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => changeOrder(p.id, "up")} disabled={idx === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-xs">▲</button>
                      <button onClick={() => changeOrder(p.id, "down")} disabled={idx === products.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-20 text-xs">▼</button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <div className="w-10 h-10 relative flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                          <Image src={p.image_url} alt={p.image_alt ?? p.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-400 text-xs">IMG</span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{p.name}</p>
                        {p.fabric && <p className="text-xs text-gray-400">{p.fabric}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{CATEGORY_LABELS[p.category]}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-xs">
                    {p.price_on_request ? "On Request" : p.price_pkr ? `PKR ${p.price_pkr.toLocaleString()}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(p)}
                      className={`text-xs px-2 py-0.5 rounded font-medium ${p.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => startEdit(p)} className="text-xs text-amber-600 hover:text-amber-800 font-medium">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
