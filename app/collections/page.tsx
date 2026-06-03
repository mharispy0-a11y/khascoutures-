import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collections | KhasCoutures",
  description: "Explore our Bridal, Party Wear and Pret collections at KhasCoutures, Rawalpindi.",
};

const collections = [
  {
    id: "bridal",
    category: "Bridal Couture",
    title: "The Bridal Edit",
    description:
      "Our bridal collection is an ode to the grandeur of Pakistani weddings — from the intimate Nikah to the lavish Walima. Each lehenga, shararah, and anarkali is a hand-embroidered masterpiece.",
    gradient: "from-[#3D2B1F] via-[#5C3D2E] to-[#3D2B1F]",
    pieces: [
      { name: "Crimson Zari Lehenga", fabric: "Raw Silk", work: "Zardozi & Dabka", price: "On Request" },
      { name: "Ivory Walima Ensemble", fabric: "Chiffon", work: "Thread & Sequins", price: "On Request" },
      { name: "Garnet Anarkali", fabric: "Net over Silk", work: "Mirror & Gota", price: "On Request" },
      { name: "Blush Sharara Set", fabric: "Organza", work: "Cut-Dana & Resham", price: "On Request" },
    ],
  },
  {
    id: "party",
    category: "Party Wear",
    title: "The Formal Edit",
    description:
      "Commanding attention at every gathering — our party wear line is crafted for women who appreciate the weight of a well-embellished dupatta and the luxury of fine fabric.",
    gradient: "from-[#1E2A1E] via-[#2D3D2D] to-[#1E2A1E]",
    pieces: [
      { name: "Forest Satin Co-ord", fabric: "Premium Satin", work: "Aari Embroidery", price: "On Request" },
      { name: "Midnight Farshi Pyjama", fabric: "Velvet", work: "Gota & Tilla", price: "On Request" },
      { name: "Bronze Palazzo Set", fabric: "Tissue", work: "Sequin & Beads", price: "On Request" },
      { name: "Plum Jacket Kurta", fabric: "Jamawar", work: "Block Print", price: "On Request" },
    ],
  },
  {
    id: "pret",
    category: "Pret & Casual",
    title: "The Everyday Edit",
    description:
      "Thoughtfully designed ready-to-wear pieces that carry the soul of couture without the occasion — refined silhouettes for lunches, casual events, and everyday grace.",
    gradient: "from-[#1A1A2E] via-[#2A2A45] to-[#1A1A2E]",
    pieces: [
      { name: "Sage Lawn 3-Piece", fabric: "Premium Lawn", work: "Digital Print + Embroidery", price: "PKR 12,000" },
      { name: "Terracotta Kurta Set", fabric: "Cambric", work: "Hand Block", price: "PKR 9,500" },
      { name: "Navy Chiffon Dupatta Suit", fabric: "Chiffon", work: "Printed", price: "PKR 14,000" },
      { name: "Dusty Rose Co-ord", fabric: "Cotton", work: "Schiffli Lace", price: "PKR 11,000" },
    ],
  },
];

export default function CollectionsPage() {
  return (
    <div className="pt-24">
      {/* Page header */}
      <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(201,168,76,0.1) 0px, rgba(201,168,76,0.1) 1px, transparent 1px, transparent 30px)",
          }}
        />
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3 relative z-10">
          Explore
        </p>
        <h1
          className="font-display text-5xl md:text-7xl text-ivory font-light relative z-10"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Our Collections
        </h1>
        <div className="ornamental-line max-w-xs mx-auto mt-6 relative z-10">
          <span className="text-gold">✦</span>
        </div>
        <p className="mt-5 text-ivory/50 font-body text-sm max-w-md mx-auto relative z-10">
          Three distinct worlds of couture — each telling a different story of South Asian elegance.
        </p>
      </div>

      {/* Collections */}
      <div className="bg-ivory">
        {collections.map((col, idx) => (
          <div
            key={col.id}
            id={col.id}
            className={`py-20 px-6 ${idx % 2 !== 0 ? "bg-cream" : "bg-ivory"}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${idx % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                {/* Collection visual */}
                <div className={idx % 2 !== 0 ? "order-1 lg:order-2" : ""}>
                  <div
                    className={`aspect-[4/3] bg-gradient-to-br ${col.gradient} relative border border-gold/20`}
                  >
                    <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-gold/30" />
                    <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-gold/30" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-gold/30" />
                    <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-gold/30" />
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                      <span
                        className="text-gold/20 font-display text-9xl"
                        style={{ fontFamily: "var(--font-cormorant)" }}
                      >
                        {col.title[4]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Collection info */}
                <div className={`space-y-6 ${idx % 2 !== 0 ? "order-2 lg:order-1" : ""}`}>
                  <div>
                    <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-2">
                      {col.category}
                    </p>
                    <h2
                      className="font-display text-4xl md:text-5xl text-charcoal font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {col.title}
                    </h2>
                  </div>

                  <div className="ornamental-line">
                    <span className="text-gold">✦</span>
                  </div>

                  <p className="text-charcoal/65 font-body text-sm leading-relaxed">
                    {col.description}
                  </p>

                  {/* Pieces grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {col.pieces.map((piece) => (
                      <div
                        key={piece.name}
                        className="border border-gold/15 bg-warm-white p-4 card-hover"
                      >
                        <p
                          className="font-display text-base text-charcoal font-medium mb-1"
                          style={{ fontFamily: "var(--font-cormorant)" }}
                        >
                          {piece.name}
                        </p>
                        <p className="text-charcoal/50 text-xs font-body">{piece.fabric}</p>
                        <p className="text-gold/70 text-[11px] tracking-wide font-body mt-1">
                          {piece.work}
                        </p>
                        <p className="text-charcoal font-body text-xs font-medium mt-2">
                          {piece.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567")}?text=${encodeURIComponent(`I'm interested in the ${col.title} collection`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-ivory px-8 py-3 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300 mt-2"
                  >
                    Enquire via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Banner */}
      <div className="bg-charcoal py-16 px-6 text-center">
        <p className="text-ivory/60 font-body text-sm mb-4">
          Don&apos;t see what you&apos;re looking for? We do bespoke commissions.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-ivory px-10 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
        >
          Request a Custom Order
        </Link>
      </div>
    </div>
  );
}
