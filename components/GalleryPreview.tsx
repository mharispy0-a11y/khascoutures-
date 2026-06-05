import Link from "next/link";

const galleryItems = [
  { id: 1, label: "Bridal Red", gradient: "from-[#5C1A1A] to-[#2C0A0A]", size: "large" },
  { id: 2, label: "Ivory Grace", gradient: "from-[#4A3526] to-[#2C1F14]", size: "small" },
  { id: 3, label: "Emerald Dream", gradient: "from-[#1A3A2A] to-[#0A1F15]", size: "small" },
  { id: 4, label: "Midnight Blue", gradient: "from-[#1A1A3A] to-[#0A0A20]", size: "medium" },
  { id: 5, label: "Rose Gold", gradient: "from-[#4A2A2A] to-[#2C1515]", size: "medium" },
];

export default function GalleryPreview() {
  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">
            Lookbook
          </p>
          <h2
            className="font-display text-4xl md:text-6xl text-charcoal font-light mb-5"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            The Gallery
          </h2>
          <div className="ornamental-line max-w-xs mx-auto">
            <span className="text-gold">✦</span>
          </div>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden group cursor-pointer ${
                item.size === "large"
                  ? "row-span-2 col-span-1 md:col-span-1"
                  : item.size === "medium"
                  ? "aspect-square"
                  : "aspect-[4/3]"
              }`}
            >
              <div
                className={`w-full h-full min-h-[200px] bg-gradient-to-br ${item.gradient} relative`}
              >
                {/* Gold corner ornaments */}
                <div className="absolute top-2 left-2 w-5 h-5 border-l border-t border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-2 right-2 w-5 h-5 border-r border-t border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 w-5 h-5 border-l border-b border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 right-2 w-5 h-5 border-r border-b border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Center label on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-ivory font-display text-lg italic" style={{ fontFamily: "var(--font-cormorant)" }}>
                    {item.label}
                  </span>
                </div>

                {/* Subtle texture */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(201,168,76,0.05) 0px, rgba(201,168,76,0.05) 1px, transparent 1px, transparent 15px)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-charcoal hover:bg-charcoal/90 text-ivory px-10 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
          >
            View Full Lookbook
          </Link>
        </div>
      </div>
    </section>
  );
}
