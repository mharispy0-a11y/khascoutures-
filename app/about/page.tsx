import type { Metadata } from "next";
import Link from "next/link";
import { KhasLogo } from "@/components/KhasLogo";

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About KhasCoutures",
  description: "The story behind KhasCoutures — a luxury Pakistani couture house in Rawalpindi, founded in 2013.",
  mainEntity: {
    "@type": "Organization",
    name: "KhasCoutures",
    foundingDate: "2013",
    foundingLocation: "Rawalpindi, Pakistan",
    description: "Luxury Pakistani couture specialising in bridal, party wear, and pret.",
  },
};

export const metadata: Metadata = {
  title: "Our Story | KhasCoutures",
  description: "The story behind KhasCoutures — a luxury Pakistani couture house in Rawalpindi.",
};

const values = [
  {
    title: "Artisanal Craft",
    description:
      "Every garment is handcrafted by master karigars with decades of experience in traditional Pakistani embroidery techniques.",
    icon: "✦",
  },
  {
    title: "Heritage Fabrics",
    description:
      "We source only the finest raw silks, chiffons, and nets from trusted weavers across the subcontinent.",
    icon: "◈",
  },
  {
    title: "Bespoke Service",
    description:
      "Your vision is the starting point. We listen, design, and craft garments that feel uniquely yours.",
    icon: "❋",
  },
  {
    title: "Timeless Design",
    description:
      "We balance tradition with contemporary sensibility — pieces meant to be worn today and treasured tomorrow.",
    icon: "✿",
  },
];

const timeline = [
  { year: "2013", event: "KhasCoutures opens its first boutique in Rawalpindi" },
  { year: "2016", event: "Launch of the signature Bridal Collection" },
  { year: "2019", event: "Introduction of the Party Wear and Pret lines" },
  { year: "2022", event: "Expanded to the current flagship store at R.B 2 Plaza" },
  { year: "2024", event: "500th bride dressed — a milestone in our journey" },
];

export default function AboutPage() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }} />
    <div className="pt-24">
      {/* Hero */}
      <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, rgba(201,168,76,0.1) 0px, rgba(201,168,76,0.1) 1px, transparent 1px, transparent 30px)",
          }}
        />
        <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3 relative z-10">
          The Atelier
        </p>
        <h1
          className="font-display text-5xl md:text-7xl text-ivory font-light relative z-10"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Our Story
        </h1>
        <div className="ornamental-line max-w-xs mx-auto mt-6 relative z-10">
          <span className="text-gold">✦</span>
        </div>
      </div>

      {/* Brand story */}
      <section className="py-20 px-6 bg-ivory">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="border border-gold/30 p-3">
              <div
                className="aspect-[4/5] bg-gradient-to-br from-[#3D2B1F] via-[#5C3D2E] to-[#3D2B1F] relative"
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, rgba(201,168,76,0.05) 0px, rgba(201,168,76,0.05) 1px, transparent 1px, transparent 20px)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <KhasLogo size={96} />
                  <p className="text-gold/40 text-xs tracking-[0.4em] uppercase font-body mt-2">
                    Since 2013
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-gold text-ivory px-6 py-4 shadow-lg">
              <p
                className="text-3xl font-display font-bold"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                10+
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase font-body mt-0.5">Years of Craft</p>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-body">
              Rawalpindi · Pakistan
            </p>
            <h2
              className="font-display text-4xl md:text-5xl text-charcoal font-light leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Exquisite Couture
              <span className="gold-shimmer italic font-semibold block">
                Infused In Tradition
              </span>
            </h2>
            <div className="ornamental-line">
              <span className="text-gold">✦</span>
            </div>
            <div className="space-y-4 text-charcoal/65 font-body text-sm leading-relaxed">
              <p>
                KhasCoutures was founded on a simple belief: that a woman&apos;s dress for
                the most important days of her life deserves to be extraordinary. That belief
                led us to study the embroidery traditions of the subcontinent — the zardozi of
                the subcontinent, the phulkari of Punjab, the gota-patti of Rajasthan — and weave them
                into a language uniquely our own.
              </p>
              <p>
                Our atelier in Rawalpindi is home to karigars whose families have practised the
                art of hand-embroidery for generations. We work closely with them, honouring
                their craft while creating garments that speak to the modern Pakistani woman.
              </p>
              <p>
                The name <span className="text-gold font-medium">خاص</span> — meaning
                &ldquo;special&rdquo; in Urdu — is a pledge: every bride, every client who
                walks through our door will leave feeling exactly that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-charcoal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">
              What We Stand For
            </p>
            <h2
              className="font-display text-4xl text-ivory font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Our Values
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="border border-gold/20 p-6 text-center space-y-3 card-hover">
                <span className="text-gold text-2xl">{v.icon}</span>
                <h3
                  className="text-ivory font-display text-xl font-medium"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  {v.title}
                </h3>
                <p className="text-ivory/50 font-body text-xs leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">
              Our Journey
            </p>
            <h2
              className="font-display text-4xl text-charcoal font-light"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Milestones
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gold/30" />
            <div className="space-y-8 pl-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative">
                  <div className="absolute -left-10 top-1 w-4 h-4 rounded-full border-2 border-gold bg-cream" />
                  <p className="text-gold text-xs tracking-widest font-body mb-1">{item.year}</p>
                  <p className="text-charcoal/70 font-body text-sm leading-relaxed">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-ivory text-center">
        <p
          className="font-display text-3xl text-charcoal font-light mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Ready to begin your story?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-ivory px-10 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
        >
          Book a Consultation
        </Link>
      </section>
    </div>
    </>
  );
}
