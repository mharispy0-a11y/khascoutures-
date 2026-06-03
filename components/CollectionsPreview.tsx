import Link from "next/link";

const collections = [
  {
    id: "bridal",
    title: "Bridal",
    subtitle: "Nikah & Walima",
    description:
      "Heirloom-quality bridal ensembles woven with zari, gota, and hand-embroidered motifs that honour the grandeur of your most cherished day.",
    gradient: "from-[#3D2B1F] via-[#5C3D2E] to-[#3D2B1F]",
    accent: "#C9A84C",
    count: "12 Pieces",
  },
  {
    id: "party",
    title: "Party Wear",
    subtitle: "Formal & Semi-formal",
    description:
      "Opulent formal wear that commands attention — intricate embellishments and rich fabrics crafted for evening celebrations and milad gatherings.",
    gradient: "from-[#1E2A1E] via-[#2D3D2D] to-[#1E2A1E]",
    accent: "#C9A84C",
    count: "18 Pieces",
  },
  {
    id: "pret",
    title: "Pret & Casual",
    subtitle: "Everyday Luxury",
    description:
      "Refined ready-to-wear silhouettes fusing contemporary cuts with traditional fabric stories — effortless elegance for every occasion.",
    gradient: "from-[#1A1A2E] via-[#2A2A45] to-[#1A1A2E]",
    accent: "#C9A84C",
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
              {/* Visual placeholder */}
              <div
                className={`h-72 bg-gradient-to-br ${col.gradient} relative`}
              >
                {/* Gold corner accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-l border-t border-gold/40" />
                <div className="absolute top-3 right-3 w-8 h-8 border-r border-t border-gold/40" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-l border-b border-gold/40" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-r border-b border-gold/40" />

                {/* Centered ornament */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-gold/30 font-display text-8xl font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {col.title[0]}
                  </span>
                  <div className="ornamental-line w-24 mt-2">
                    <span className="text-gold/40 text-sm">✦</span>
                  </div>
                </div>

                {/* Piece count badge */}
                <div className="absolute top-4 right-4 bg-gold/10 border border-gold/30 px-2.5 py-1">
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
