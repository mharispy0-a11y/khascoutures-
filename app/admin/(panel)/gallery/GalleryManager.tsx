"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import type { GalleryImage } from "@/lib/supabase";

const CATEGORIES = ["lookbook", "bridal", "party", "pret"];

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadCategory, setUploadCategory] = useState("lookbook");
  const [uploadCaption, setUploadCaption] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [editingCaption, setEditingCaption] = useState<string | null>(null);
  const [captionDraft, setCaptionDraft] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const onDrop = useCallback(async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    setUploadProgress(10);

    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("caption", uploadCaption);
      fd.append("category", uploadCategory);

      setUploadProgress(40);
      const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
      setUploadProgress(80);

      if (res.ok) {
        const { image } = await res.json();
        setImages((prev) => [image, ...prev]);
      }
    }
    setUploadProgress(100);
    setUploadCaption("");
    setTimeout(() => { setUploading(false); setUploadProgress(0); }, 600);
  }, [uploadCaption, uploadCategory]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    multiple: true,
  });

  async function toggleVisible(img: GalleryImage) {
    const res = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: img.id, visible: !img.visible }),
    });
    if (res.ok) {
      setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, visible: !i.visible } : i));
    }
  }

  async function saveCaption(id: string) {
    const res = await fetch("/api/admin/gallery", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, caption: captionDraft }),
    });
    if (res.ok) {
      setImages((prev) => prev.map((i) => i.id === id ? { ...i, caption: captionDraft } : i));
      setEditingCaption(null);
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("Delete this image permanently?")) return;
    setDeleting(id);
    const res = await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) setImages((prev) => prev.filter((i) => i.id !== id));
    setDeleting(null);
  }

  const filtered = filterCat === "all" ? images : images.filter((i) => i.category === filterCat);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Upload zone */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <h2 className="text-sm font-medium text-gray-700 mb-4">Upload Images</h2>
        <div className="flex flex-col sm:flex-row gap-3 mb-3">
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
          <input
            type="text"
            placeholder="Caption (optional)"
            value={uploadCaption}
            onChange={(e) => setUploadCaption(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-amber-400 bg-amber-50" : "border-gray-300 hover:border-amber-300"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-500">
            {isDragActive ? "Drop images here…" : "Drag & drop images here, or click to select"}
          </p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP accepted</p>
        </div>

        {uploading && (
          <div className="mt-3">
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Uploading…</p>
          </div>
        )}
      </div>

      {/* Filter + grid */}
      <div className="bg-white border border-gray-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {["all", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setFilterCat(c)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filterCat === c ? "bg-amber-100 text-amber-700 font-medium" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400">{filtered.length} images</span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-10">No images yet. Upload some above.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((img) => (
              <div key={img.id} className="group relative border border-gray-200 rounded overflow-hidden bg-gray-50">
                <div className="aspect-square relative">
                  <Image src={img.url} alt={img.caption ?? ""} fill className="object-cover" sizes="200px" />
                  {!img.visible && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <span className="text-xs text-gray-500 font-medium">Hidden</span>
                    </div>
                  )}
                </div>

                <div className="p-2 space-y-1.5">
                  {editingCaption === img.id ? (
                    <div className="flex gap-1">
                      <input
                        value={captionDraft}
                        onChange={(e) => setCaptionDraft(e.target.value)}
                        className="flex-1 border border-gray-300 rounded px-1.5 py-0.5 text-xs"
                        autoFocus
                        onKeyDown={(e) => { if (e.key === "Enter") saveCaption(img.id); if (e.key === "Escape") setEditingCaption(null); }}
                      />
                      <button onClick={() => saveCaption(img.id)} className="text-xs text-green-600 font-medium">✓</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setEditingCaption(img.id); setCaptionDraft(img.caption ?? ""); }}
                      className="text-xs text-gray-500 hover:text-gray-800 truncate w-full text-left"
                    >
                      {img.caption || <span className="text-gray-300 italic">Add caption…</span>}
                    </button>
                  )}

                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleVisible(img)}
                      className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${
                        img.visible
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {img.visible ? "Visible" : "Hidden"}
                    </button>
                    <button
                      onClick={() => deleteImage(img.id)}
                      disabled={deleting === img.id}
                      className="flex-1 text-xs py-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      {deleting === img.id ? "…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
