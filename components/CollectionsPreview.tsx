import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: "bridal",
    title: "Bridal",
    subtitle: "Nikah & Walima",
    description:
      "Heirloom-quality bridal ensembles woven with zari, gota, and hand-embroidered motifs that honour the grandeur of your most cherished day.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    count: "12 Pieces",
  },
  {
    id: "party",
    title: "Party Wear",
    subtitle: "Formal & Semi-formal",
    description:
      "Opulent formal wear that commands attention — intricate embellishments and rich fabrics crafted for evening celebrations and milad gatherings.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80",
    count: "18 Pieces",
  },
  {
    id: "pret",
    title: "Pret & Casual",
    subtitle: "Everyday Luxury",
    description:
      "Refined ready-to-wear silhouettes fusing contemporary cuts with traditional fabric stories — effortless elegance for every occasion.",
    image: "https://images.unsplash.com/photo-1585914924626-15adac1e6402?w=600&q=80",
    count: "24 Pieces",
  },
];

export default function CollectionsPreview() {
  return (
    <section id="collections" className="py-24 px-6 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">
            Our Offerings
          </p>
          <h2
            className="font-display text-4xl md:text-6xl text-charcoal font-light mb-5"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The Collections
          </h2>
          <div className="ornamental-line max-w-xs mx-auto">
            <span className="text-gold">✦</span>
          </div>
          <p className="mt-6 text-charcoal/60 font-body text-sm leading-relaxed max-w-md mx-auto">
            Each piece is a testament to the artisanal craft traditions of the
            subcontinent, reimagined for the modern woman.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections#${col.id}`}
              className="group relative overflow-hidden border border-gold/20 card-hover bg-white block"
            >
              {/* Collection image */}
              <div className="h-72 relative overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {/* Gold corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-gold/60 z-10" />
                <div className="absolute top-3 right-3 w-8 h-8 border-r border-t border-gold/60 z-10" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-l border-b border-gold/60 z-10" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-gold/60 z-10" />
                {/* Piece count badge */}
                <div className="absolute top-4 right-4 bg-charcoal/70 border border-gold/50 px-2.5 py-1 z-10">
                  <span className="text-gold text-[10px] tracking-widest font-body">
                    {col.count}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="p-6 bg-warm-white">
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-body mb-1">
                  {col.subtitle}
                </p>
                <h3
                  className="font-display text-2xl text-charcoal font-medium mb-3"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {col.title}
                </h3>
                <p className="text-charcoal/60 text-sm font-body leading-relaxed mb-4">
                  {col.description}
                </p>
                <span className="text-gold text-xs tracking-[0.25em] uppercase font-body border-b border-gold/40 pb-0.5 group-hover:border-gold transition-colors">
                  View Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center gap-3 border border-gold/50 hover:border-gold text-charcoal/70 hover:text-gold px-10 py-3.5 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
