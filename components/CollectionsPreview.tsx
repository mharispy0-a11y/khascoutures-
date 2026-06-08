import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    id: "bridal",
    src: "/collections/bridal.jpg",
    alt: "Bridal Collection",
    badge: "12 Pieces · Nikah & Walima",
    title: "Bridal",
    description:
      "Heirloom-quality bridal ensembles woven with zari, gota and hand-embroidered motifs that honour the grandeur of your most cherished day.",
  },
  {
    id: "party",
    src: "/collections/party.jpg",
    alt: "Party Wear Collection",
    badge: "18 Pieces · Formal & Semi-formal",
    title: "Party Wear",
    description:
      "Opulent formal wear that commands attention — intricate embellishments and rich fabrics crafted for evening celebrations and milad gatherings.",
  },
  {
    id: "pret",
    src: "/collections/pret.jpg",
    alt: "Pret & Casual Collection",
    badge: "24 Pieces · Everyday Luxury",
    title: "Pret & Casual",
    description:
      "Refined ready-to-wear silhouettes fusing contemporary cuts with traditional fabric stories — effortless elegance for every occasion.",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections#${col.id}`}
              className="group relative overflow-hidden rounded-sm block"
            >
              <div className="relative h-[420px] w-full overflow-hidden">
                <Image
                  src={col.src}
                  alt={col.alt}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-xs tracking-widest text-gold uppercase mb-1 font-body">
                    {col.badge}
                  </p>
                  <h3
                    className="text-2xl mb-2 font-light"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {col.title}
                  </h3>
                  <p className="text-sm text-white/80 mb-4 font-body leading-relaxed">
                    {col.description}
                  </p>
                  <span className="text-xs tracking-widest text-gold uppercase font-body border-b border-gold/40 pb-0.5 group-hover:border-gold transition-colors">
                    View Collection →
                  </span>
                </div>
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
