import Link from "next/link";
import { MapPin, Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center">
              <span className="text-gold font-display text-lg" style={{ direction: "rtl" }}>خاص</span>
            </div>
            <div>
              <p className="text-ivory font-display text-xl font-semibold" style={{ fontFamily: "var(--font-cormorant)" }}>
                KhasCoutures
              </p>
              <p className="text-gold/70 text-[10px] tracking-[0.2em] uppercase">Bridal &amp; Party Wear</p>
            </div>
          </div>
          <p className="text-ivory/60 text-sm font-body leading-relaxed max-w-xs">
            Exquisite Couture Infused In Tradition. Crafting heirloom pieces that honour the richness of South Asian heritage.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-gold text-xs tracking-[0.3em] uppercase font-body font-medium">Explore</h3>
          <ul className="space-y-2.5">
            {[
              { href: "/collections", label: "Collections" },
              { href: "/gallery", label: "Lookbook" },
              { href: "/about", label: "Our Story" },
              { href: "/contact", label: "Visit Us" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ivory/60 hover:text-gold text-sm font-body transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-gold text-xs tracking-[0.3em] uppercase font-body font-medium">Visit Us</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin size={15} className="text-gold mt-0.5 flex-shrink-0" />
              <p className="text-ivory/60 text-sm font-body leading-relaxed">
                Shop No. G 58,59 Uper Ground<br />
                R.B 2 Plaza Rehmanabad<br />
                Rawalpindi, Pakistan 46000
              </p>
            </div>
            <a
              href="https://wa.me/923001234567"
              className="flex items-center gap-2.5 text-ivory/60 hover:text-gold text-sm font-body transition-colors"
            >
              <Phone size={15} className="text-gold flex-shrink-0" />
              WhatsApp Enquiry
            </a>
            <a
              href="https://instagram.com/khascoutures"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ivory/60 hover:text-gold text-sm font-body transition-colors"
            >
              <Instagram size={15} className="text-gold flex-shrink-0" />
              @khascoutures
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ivory/10 px-6 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-ivory/30 text-xs font-body tracking-wide">
            © {new Date().getFullYear()} KhasCoutures. All rights reserved.
          </p>
          <p className="text-gold/40 text-xs font-display italic">
            Exquisite Couture Infused In Tradition
          </p>
        </div>
      </div>
    </footer>
  );
}
