import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-0 bg-charcoal relative overflow-hidden">
      {/* Top gold line */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />
      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
        {/* Left: model image */}
        <div className="relative h-[400px] lg:h-auto lg:min-h-[600px] order-1">
          <Image
            src="/story-model.jpg"
            alt="KhasCouture — Exquisite Pakistani Couture"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Blend edge into dark story panel on desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40" />
          {/* Subtle dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Right: text content */}
        <div className="order-2 py-24 px-8 lg:px-12 space-y-6 flex flex-col justify-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body">Our Story</p>
          <h2
            className="font-display text-4xl md:text-5xl text-ivory font-light leading-tight"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Where Tradition
            <span className="gold-shimmer font-semibold italic block">
              Meets Artistry
            </span>
          </h2>

          <div className="ornamental-line">
            <span className="text-gold">✦</span>
          </div>

          <div className="space-y-4 text-ivory/60 font-body text-sm leading-relaxed">
            <p>
              KhasCouture was born from a deep reverence for the embroidery traditions of
              the subcontinent — the intricate zardozi of the subcontinent, the mirror-work of Sindh,
              and the chikankari of Lucknow — reimagined for the modern Pakistani woman.
            </p>
            <p>
              Every ensemble that leaves our atelier in Rawalpindi carries with it hours
              of meticulous handwork by master karigars whose families have passed these
              skills across generations.
            </p>
            <p>
              <span className="text-gold/80 font-medium">خاص</span> — meaning
              &ldquo;special&rdquo; — is our promise to you: that your garment will be as
              singular as the moment it is made for.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { num: "10+", label: "Years of Craft" },
              { num: "100%", label: "Handmade" },
              { num: "3", label: "Collections" },
            ].map((s) => (
              <div key={s.label} className="border-l border-gold/30 pl-4">
                <p className="text-gold text-2xl font-display font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
                  {s.num}
                </p>
                <p className="text-ivory/40 text-[10px] tracking-wider uppercase font-body mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/about"
            className="inline-flex items-center gap-3 border border-gold/40 hover:border-gold text-ivory/70 hover:text-gold px-8 py-3 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300 mt-2"
          >
            Read Our Full Story
          </Link>
        </div>
      </div>
    </section>
  );
}
