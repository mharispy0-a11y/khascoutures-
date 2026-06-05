"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { KhasLogo } from "@/components/KhasLogo";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 200);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #2C2220 0%, #3D2B1F 30%, #4A3526 60%, #2C2220 100%)",
        }}
      />

      {/* Ornamental overlay pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 20%, rgba(201,168,76,0.4) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.3) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.2) 0%, transparent 30%),
            radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.2) 0%, transparent 30%)
          `,
        }}
      />

      {/* Gold corner ornaments */}
      <div className="absolute top-24 left-8 w-24 h-24 border-l-2 border-t-2 border-gold/30 hidden md:block" />
      <div className="absolute top-24 right-8 w-24 h-24 border-r-2 border-t-2 border-gold/30 hidden md:block" />
      <div className="absolute bottom-20 left-8 w-24 h-24 border-l-2 border-b-2 border-gold/30 hidden md:block" />
      <div className="absolute bottom-20 right-8 w-24 h-24 border-r-2 border-b-2 border-gold/30 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Urdu tagline */}
        <p
          className="text-gold/70 text-base md:text-lg mb-4 tracking-[0.15em] animate-fadeIn"
          style={{ animationDelay: "0.1s", opacity: 0 }}
        >
          ✦ &nbsp; Rawalpindi's Premier Couture House &nbsp; ✦
        </p>

        {/* Logo mark */}
        <div
          className="mx-auto mb-8 animate-fadeIn"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          <KhasLogo size={80} />
        </div>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-ivory leading-none tracking-wide mb-6"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Khas
          <span className="gold-shimmer font-semibold italic">Coutures</span>
        </h1>

        {/* Ornamental line */}
        <div className="ornamental-line max-w-xs mx-auto my-6">
          <span className="text-gold text-lg">✦</span>
        </div>

        {/* Tagline */}
        <p
          className="text-ivory/70 text-lg md:text-xl font-display italic tracking-widest mb-10 animate-fadeIn"
          style={{
            fontFamily: "var(--font-cormorant)",
            animationDelay: "0.8s",
            opacity: 0,
          }}
        >
          Exquisite Couture Infused In Tradition
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn"
          style={{ animationDelay: "1.2s", opacity: 0 }}
        >
          <Link
            href="/collections"
            className="bg-gold hover:bg-gold-dark text-ivory px-10 py-4 text-xs tracking-[0.3em] uppercase font-body font-medium transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
          >
            Explore Collections
          </Link>
          <Link
            href="/contact"
            className="border border-ivory/50 hover:border-gold text-ivory/80 hover:text-gold px-10 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
          >
            Book Appointment
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#collections"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/50 hover:text-gold transition-colors animate-floatUp"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
