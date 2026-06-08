"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/supabase";

const PLACEHOLDER_ITEMS = [
  { id: "p1", label: "The Crimson Bride", category: "bridal", gradient: "from-[#5C1A1A] via-[#3D0F0F] to-[#2C0505]", tall: true },
  { id: "p2", label: "Emerald Evening", category: "party", gradient: "from-[#1A3A2A] via-[#0F2A1A] to-[#0A1F10]", tall: false },
  { id: "p3", label: "Gold & Ivory", category: "bridal", gradient: "from-[#4A3526] via-[#3D2B1F] to-[#2C1F14]", tall: false },
  { id: "p4", label: "Midnight Velvet", category: "party", gradient: "from-[#1A1A3A] via-[#0F0F2A] to-[#08082A]", tall: true },
  { id: "p5", label: "Rose Petal", category: "pret", gradient: "from-[#4A2A2A] via-[#3D1F1F] to-[#2C1515]", tall: false },
  { id: "p6", label: "Sage Serenity", category: "pret", gradient: "from-[#2A3A2A] via-[#1F2D1F] to-[#152015]", tall: false },
];

const CATEGORIES = ["All", "Bridal", "Party", "Pret", "Lookbook"];

function categoryMatch(itemCat: string, filter: string) {
  if (filter === "All") return true;
  return itemCat.toLowerCase() === filter.toLowerCase();
}

type DisplayItem = GalleryImage & { isPlaceholder?: false } | { id: string; label: string; category: string; gradient: string; tall: boolean; isPlaceholder: true; url?: never; caption?: never; visible?: never; display_order?: never; created_at?: never };

export default function GalleryGrid({ serverImages }: { serverImages: GalleryImage[] }) {
  const [active, setActive] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const items: DisplayItem[] = serverImages.length > 0
    ? serverImages.map((img) => ({ ...img, isPlaceholder: false as const }))
    : PLACEHOLDER_ITEMS.map((p) => ({ ...p, isPlaceholder: true as const }));

  const filtered = items.filter((item) =>
    categoryMatch(item.isPlaceholder ? item.category : (item as GalleryImage).category, active)
  );

  const closeLightbox = () => setLightboxIdx(null);
  const goPrev = useCallback(() => setLightboxIdx((i) => (i !== null ? (i > 0 ? i - 1 : filtered.length - 1) : null)), [filtered.length]);
  const goNext = useCallback(() => setLightboxIdx((i) => (i !== null ? (i < filtered.length - 1 ? i + 1 : 0) : null)), [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightboxIdx, goPrev, goNext]);

  const activeItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      {/* Filter tabs */}
      <div className="bg-ivory border-b border-gold/15 px-6 py-4 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setLightboxIdx(null); }}
              className={`text-xs tracking-[0.3em] uppercase font-body whitespace-nowrap transition-colors border-b-2 pb-1 ${
                active === cat ? "text-gold border-gold" : "text-charcoal/60 hover:text-gold border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
          <a href="https://instagram.com/khascoutures" target="_blank" rel="noopener noreferrer" className="ml-auto text-xs tracking-[0.2em] uppercase font-body text-gold hover:text-gold-dark transition-colors flex-shrink-0">
            @khascoutures ↗
          </a>
        </div>
      </div>

      {/* Grid */}
      <section className="py-10 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {filtered.map((item, idx) => {
              const isReal = !item.isPlaceholder;
              const tall = isReal ? false : (item as typeof PLACEHOLDER_ITEMS[0]).tall;
              const label = isReal ? (item as GalleryImage).caption ?? "" : (item as typeof PLACEHOLDER_ITEMS[0]).label;
              const cat = isReal ? (item as GalleryImage).category : (item as typeof PLACEHOLDER_ITEMS[0]).category;

              return (
                <button
                  key={item.id}
                  onClick={() => setLightboxIdx(idx)}
                  className={`break-inside-avoid group relative overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-300 cursor-pointer w-full text-left ${tall ? "aspect-[3/4]" : "aspect-square"}`}
                  aria-label={`View ${label}`}
                >
                  {isReal ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={(item as GalleryImage).url}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                        {label && <p className="text-ivory font-display text-lg italic text-center px-4" style={{ fontFamily: "var(--font-cormorant)" }}>{label}</p>}
                        <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body capitalize">{cat}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${(item as typeof PLACEHOLDER_ITEMS[0]).gradient} relative`}>
                      <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                        <p className="text-ivory font-display text-xl italic text-center px-4" style={{ fontFamily: "var(--font-cormorant)" }}>{label}</p>
                        <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body capitalize">{cat}</p>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={closeLightbox} className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold hover:border-gold transition-colors z-10" aria-label="Close">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-ivory/40 text-xs font-body tracking-widest">{(lightboxIdx ?? 0) + 1} / {filtered.length}</p>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold hover:border-gold transition-colors" aria-label="Previous">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>

          <div className="w-[min(80vw,560px)] flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            {activeItem.isPlaceholder ? (
              <div className={`w-full bg-gradient-to-br ${(activeItem as typeof PLACEHOLDER_ITEMS[0]).gradient} border border-gold/20 ${(activeItem as typeof PLACEHOLDER_ITEMS[0]).tall ? "aspect-[3/4]" : "aspect-square"}`} />
            ) : (
              <div className="relative w-full aspect-[3/4]">
                <Image src={(activeItem as GalleryImage).url} alt={(activeItem as GalleryImage).caption ?? ""} fill className="object-contain" />
              </div>
            )}
            <div className="text-center space-y-1">
              {(activeItem.isPlaceholder ? (activeItem as typeof PLACEHOLDER_ITEMS[0]).label : (activeItem as GalleryImage).caption) && (
                <p className="text-ivory font-display text-2xl md:text-3xl font-light italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {activeItem.isPlaceholder ? (activeItem as typeof PLACEHOLDER_ITEMS[0]).label : (activeItem as GalleryImage).caption}
                </p>
              )}
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body capitalize">
                {activeItem.isPlaceholder ? (activeItem as typeof PLACEHOLDER_ITEMS[0]).category : (activeItem as GalleryImage).category}
              </p>
            </div>
          </div>

          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold hover:border-gold transition-colors" aria-label="Next">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ivory/20 text-xs font-body">← → to navigate · Esc to close</p>
        </div>
      )}
    </>
  );
}
