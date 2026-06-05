"use client";

import { useState, useEffect, useCallback } from "react";

const lookbookItems = [
  { id: 1, label: "The Crimson Bride",   category: "Bridal",    gradient: "from-[#5C1A1A] via-[#3D0F0F] to-[#2C0505]", size: "tall" },
  { id: 2, label: "Emerald Evening",     category: "Party Wear",gradient: "from-[#1A3A2A] via-[#0F2A1A] to-[#0A1F10]", size: "normal" },
  { id: 3, label: "Gold & Ivory",        category: "Bridal",    gradient: "from-[#4A3526] via-[#3D2B1F] to-[#2C1F14]", size: "normal" },
  { id: 4, label: "Midnight Velvet",     category: "Party Wear",gradient: "from-[#1A1A3A] via-[#0F0F2A] to-[#08082A]", size: "tall" },
  { id: 5, label: "Rose Petal",          category: "Pret",      gradient: "from-[#4A2A2A] via-[#3D1F1F] to-[#2C1515]", size: "normal" },
  { id: 6, label: "Sage Serenity",       category: "Pret",      gradient: "from-[#2A3A2A] via-[#1F2D1F] to-[#152015]", size: "normal" },
  { id: 7, label: "Bronze Dusk",         category: "Party Wear",gradient: "from-[#3A2A1A] via-[#2D1F0F] to-[#201508]", size: "tall" },
  { id: 8, label: "Pearl Walima",        category: "Bridal",    gradient: "from-[#3A3020] via-[#2D2415] to-[#20180A]", size: "normal" },
  { id: 9, label: "Lavender Dreams",     category: "Pret",      gradient: "from-[#2A1A3A] via-[#1F0F2D] to-[#150820]", size: "normal" },
];

const categories = ["All", "Bridal", "Party Wear", "Pret"];

export default function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const filtered =
    active === "All" ? lookbookItems : lookbookItems.filter((i) => i.category === active);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);

  const goPrev = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : filtered.length - 1));
  }, [filtered.length]);

  const goNext = useCallback(() => {
    setLightboxIdx((i) => (i !== null && i < filtered.length - 1 ? i + 1 : 0));
  }, [filtered.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, goPrev, goNext]);

  const activeItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <>
      {/* Filter tabs */}
      <div className="bg-ivory border-b border-gold/15 px-6 py-4 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto flex items-center gap-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setLightboxIdx(null); }}
              className={`text-xs tracking-[0.3em] uppercase font-body whitespace-nowrap transition-colors border-b-2 pb-1 ${
                active === cat
                  ? "text-gold border-gold"
                  : "text-charcoal/60 hover:text-gold border-transparent hover:border-gold"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex-shrink-0">
            <a
              href="https://instagram.com/khascoutures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] uppercase font-body text-gold hover:text-gold-dark transition-colors"
            >
              @khascoutures ↗
            </a>
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="py-10 px-6 bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`break-inside-avoid group relative overflow-hidden border border-gold/10 hover:border-gold/40 transition-all duration-300 cursor-pointer w-full text-left ${
                  item.size === "tall" ? "aspect-[3/4]" : "aspect-square"
                }`}
                aria-label={`View ${item.label}`}
              >
                <div className={`w-full h-full bg-gradient-to-br ${item.gradient} relative`}>
                  <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-gold/0 group-hover:border-gold/50 transition-all duration-300" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-gold/0 group-hover:border-gold/50 transition-all duration-300" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-gold/0 group-hover:border-gold/50 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-gold/0 group-hover:border-gold/50 transition-all duration-300" />
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 15px)" }}
                  />
                  <div className="absolute inset-0 bg-charcoal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                    <p className="text-ivory font-display text-xl italic text-center px-4" style={{ fontFamily: "var(--font-cormorant)" }}>
                      {item.label}
                    </p>
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body">{item.category}</p>
                    <div className="mt-2 w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            ))}
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
          aria-label={`Viewing ${activeItem.label}`}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold hover:border-gold transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <p className="absolute top-5 left-1/2 -translate-x-1/2 text-ivory/40 text-xs font-body tracking-widest">
            {(lightboxIdx ?? 0) + 1} / {filtered.length}
          </p>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold hover:border-gold transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image area */}
          <div
            className="w-[min(80vw,560px)] flex flex-col items-center gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full bg-gradient-to-br ${activeItem.gradient} relative border border-gold/20 ${
                activeItem.size === "tall" ? "aspect-[3/4]" : "aspect-square"
              }`}
            >
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-gold/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-gold/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-gold/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-gold/30" />
              <div
                className="absolute inset-0 opacity-15"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.04) 0px, rgba(201,168,76,0.04) 1px, transparent 1px, transparent 15px)" }}
              />
            </div>
            <div className="text-center space-y-1">
              <p
                className="text-ivory font-display text-2xl md:text-3xl font-light italic"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {activeItem.label}
              </p>
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase font-body">{activeItem.category}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center border border-ivory/20 text-ivory/70 hover:text-gold hover:border-gold transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Keyboard hint */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-ivory/20 text-xs font-body">
            ← → to navigate · Esc to close
          </p>
        </div>
      )}
    </>
  );
}
