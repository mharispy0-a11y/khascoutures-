import Link from "next/link";
import { KhasLogo } from "@/components/KhasLogo";

export default function AboutSection() {
  return (
    <section className="py-24 px-6 bg-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #C9A84C, transparent)" }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <div className="relative order-2 lg:order-1">
          <div className="relative">
            {/* Outer frame */}
            <div className="border border-gold/30 p-3">
              {/* Image placeholder with elegant gradient */}
              <div
                className="aspect-[4/5] relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #3D2B1F 0%, #5C3D2E 40%, #4A3020 70%, #3D2B1F 100%)",
                }}
              >
                {/* Decorative fabric pattern overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 20px), repeating-linear-gradient(-45deg, rgba(201,168,76,0.03) 0px, rgba(201,168,76,0.03) 1px, transparent 1px, transparent 20px)",
                  }}
                />
                {/* Centered brand mark */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="mb-4">
                    <KhasLogo size={112} />
                  </div>
                  <p className="text-gold/50 text-xs tracking-[0.4em] uppercase font-body">
                    Est. Rawalpindi
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -right-6 bg-gold px-6 py-4 shadow-xl">
              <p className="text-ivory text-3xl font-display font-bold" style={{ fontFamily: "var(--font-cormorant)" }}>
                500+
              </p>
              <p className="text-ivory/80 text-[10px] tracking-[0.2em] uppercase font-body mt-0.5">
                Brides Dressed
              </p>
            </div>
            <div className="absolute -top-6 -left-6 bg-charcoal border border-gold/40 px-5 py-4 shadow-xl">
              <p className="text-gold text-2xl font-display font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
                Handcrafted
              </p>
              <p className="text-ivory/50 text-[10px] tracking-[0.2em] uppercase font-body">
                Every Stitch
              </p>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="order-1 lg:order-2 space-y-6">
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
              KhasCoutures was born from a deep reverence for the embroidery traditions of
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
