import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import { getServerClient } from "@/lib/supabase";
import type { GalleryImage } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lookbook | KhasCouture",
  description: "Browse the KhasCouture lookbook — editorial couture photography from Rawalpindi.",
};

async function getImages(): Promise<GalleryImage[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("gallery_images")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    return (data as GalleryImage[]) ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getImages();
  return (
    <div className="pt-24">
      {/* Header */}
      <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, rgba(201,168,76,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(201,168,76,0.2) 0%, transparent 50%)",
          }}
        />
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3 relative z-10">
          Visual Stories
        </p>
        <h1
          className="font-display text-5xl md:text-7xl text-ivory font-light relative z-10"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          The Lookbook
        </h1>
        <div className="ornamental-line max-w-xs mx-auto mt-6 relative z-10">
          <span className="text-gold">✦</span>
        </div>
        <p className="mt-5 text-ivory/50 font-body text-sm max-w-md mx-auto relative z-10">
          A curated gallery of our finest creations — each piece a chapter in the ongoing story of South Asian couture.
        </p>
      </div>

      <GalleryGrid serverImages={images} />

      {/* Instagram CTA */}
      <section className="py-16 px-6 bg-charcoal text-center">
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">
          Follow Our Journey
        </p>
        <h2
          className="font-display text-3xl text-ivory font-light mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          More on Instagram
        </h2>
        <a
          href="https://instagram.com/khascoutures"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-10 py-4 text-xs tracking-[0.25em] uppercase font-body hover:opacity-90 transition-opacity"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          @khascoutures
        </a>
      </section>
    </div>
  );
}
