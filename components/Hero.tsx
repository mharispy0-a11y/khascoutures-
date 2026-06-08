"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null);

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
        {/* Large Urdu logo — transparent PNG */}
        <div
          ref={titleRef}
          className="mx-auto mb-6 flex items-center justify-center"
        >
          <Image
            src="/logo.png"
            alt="KhasCouture"
            width={280}
            height={280}
            priority
            className="w-48 md:w-64 lg:w-72 h-auto"
          />
        </div>

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

        {/* Scroll indicator — placed after CTA so it never overlaps */}
        <div className="mt-10 flex justify-center">
          <a
            href="#collections"
            className="text-gold hover:text-gold-light transition-colors animate-floatUp"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
