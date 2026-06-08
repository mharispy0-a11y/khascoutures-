import { getServerClient } from "@/lib/supabase";
import type { Review } from "@/lib/supabase";

const FALLBACK: Review[] = [
  { id: "1", name: "Ayesha R.", role: "Bride, December 2024", content: "My wedding dress from KhasCouture was beyond anything I imagined. The intricate embroidery and the fit were absolutely perfect. Every guest asked where it was from.", rating: 5, approved: true, pinned: false, created_at: "" },
  { id: "2", name: "Sana M.", role: "Regular Client", content: "I've been coming here for every formal event for the past three years. The quality of fabric and the craftsmanship is unmatched anywhere in Rawalpindi.", rating: 5, approved: true, pinned: false, created_at: "" },
  { id: "3", name: "Fatima K.", role: "Bride, March 2025", content: "The team understood exactly what I wanted — something traditional yet modern. They created a masterpiece that I will treasure forever.", rating: 5, approved: true, pinned: false, created_at: "" },
];

async function getReviews(): Promise<Review[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);
    return (data as Review[])?.length ? (data as Review[]) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export default async function TestimonialsSection() {
  const testimonials = await getReviews();

  return (
    <section className="py-24 px-6 bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">Client Stories</p>
          <h2
            className="font-display text-4xl md:text-5xl text-charcoal font-light"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Words of Trust
          </h2>
          <div className="ornamental-line max-w-xs mx-auto mt-5">
            <span className="text-gold">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-ivory border border-gold/15 p-8 relative card-hover">
              <span
                className="text-gold/20 text-8xl font-display leading-none absolute top-4 left-5 pointer-events-none"
                style={{ fontFamily: "var(--font-cormorant)" }}
                aria-hidden
              >
                &ldquo;
              </span>
              <p className="text-charcoal/70 font-body text-sm leading-relaxed relative z-10 mb-6 pt-6">
                {t.content}
              </p>
              <div className="border-t border-gold/20 pt-4">
                <p className="text-charcoal font-display font-medium text-base" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {t.name}
                </p>
                {t.role && (
                  <p className="text-gold text-[10px] tracking-[0.2em] uppercase font-body mt-0.5">{t.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
