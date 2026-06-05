import type { Metadata } from "next";
import Link from "next/link";
import { KhasLogo } from "@/components/KhasLogo";

export const metadata: Metadata = {
  title: "Page Not Found | KhasCoutures",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="mb-6">
        <KhasLogo size={72} />
      </div>
      <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3">404</p>
      <h1
        className="font-display text-4xl md:text-6xl text-charcoal font-light mb-4"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Page Not Found
      </h1>
      <div className="ornamental-line max-w-xs mx-auto mb-6">
        <span className="text-gold">✦</span>
      </div>
      <p className="text-charcoal/60 font-body text-sm max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let us help you find what you need.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-gold hover:bg-gold-dark text-ivory px-8 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
        >
          Return Home
        </Link>
        <Link
          href="/collections"
          className="inline-flex items-center justify-center border border-gold text-gold hover:bg-gold hover:text-ivory px-8 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300"
        >
          View Collections
        </Link>
      </div>
    </div>
  );
}
