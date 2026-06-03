"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/collections", label: "Collections" },
  { href: "/gallery", label: "Lookbook" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-gold/20 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center bg-ivory/80 group-hover:border-gold-dark transition-colors">
            <span
              className="text-gold font-display text-lg font-semibold"
              style={{ fontFamily: "var(--font-cormorant)", direction: "rtl" }}
            >
              خاص
            </span>
          </div>
          <div className="hidden sm:block">
            <p
              className="text-charcoal font-display text-xl font-semibold tracking-wide leading-none"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              KhasCoutures
            </p>
            <p className="text-muted text-[10px] tracking-[0.2em] uppercase font-body mt-0.5">
              Bridal &amp; Party Wear
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-charcoal/80 hover:text-gold font-body text-sm tracking-widest uppercase transition-colors duration-300 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Book Appointment CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-ivory px-5 py-2 text-xs tracking-widest uppercase font-body transition-all duration-300"
        >
          Book Appointment
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-charcoal hover:text-gold transition-colors p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-ivory/98 backdrop-blur-md border-t border-gold/20 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-charcoal text-sm tracking-widest uppercase font-body hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 border border-gold text-gold text-center py-2.5 text-xs tracking-widest uppercase font-body hover:bg-gold hover:text-ivory transition-all"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
