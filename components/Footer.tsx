import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { KhasLogo } from "@/components/KhasLogo";

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function ThreadsIcon({ size = 15 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 192 192" fill="currentColor" className="flex-shrink-0">
      <path d="M141.537 88.988c-1.022-.484-2.067-.948-3.132-1.393-1.828-27.306-16.75-42.94-41.804-43.1h-.153c-15.014 0-27.477 6.397-35.148 18.037l13.779 9.452c5.73-8.694 14.724-10.548 21.347-10.548.077 0 .153 0 .229.001 8.249.052 14.474 2.451 18.503 7.128 2.932 3.405 4.893 8.11 5.864 14.049-7.314-1.243-15.224-1.625-23.68-1.14-23.82 1.372-39.133 15.265-38.105 34.569.52 9.792 5.399 18.216 13.734 23.72 7.047 4.651 16.123 6.926 25.556 6.411 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.487 16.351-22.809-.169-40.059-7.484-51.275-21.742C29.824 139.966 24.396 120.682 24.194 96c.202-24.682 5.63-43.966 16.133-57.317C51.543 24.425 68.793 17.11 91.602 16.94c23.008.172 40.654 7.522 52.299 21.848 5.71 7.026 10.015 15.861 12.853 26.162L173 60.642c-3.44-12.68-8.853-23.607-16.219-32.668C143.852 9.607 122.018.195 93.884 0h-.115C65.76.194 44.17 9.642 29.667 28.079 16.76 44.486 10.103 67.316 9.879 95.933L9.878 96l.001.067c.224 28.617 6.881 51.447 19.787 67.854C44.17 182.358 65.76 191.806 93.884 192h.115c25.05-.173 42.644-6.708 57.138-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-19.045-24.723-24.648l-.019-.905zM97.32 129.507c-10.44.588-21.286-4.098-21.821-14.135-.464-7.442 5.228-15.746 22.394-16.735 1.966-.113 3.895-.168 5.79-.168 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.734 29.273z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <KhasLogo size={40} />
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
              <span className="text-gold"><InstagramIcon size={15} /></span>
              @khascoutures
            </a>
            <a
              href="https://www.threads.com/@khascoutures"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ivory/60 hover:text-gold text-sm font-body transition-colors"
            >
              <span className="text-gold"><ThreadsIcon size={15} /></span>
              @khascoutures on Threads
            </a>
            <a
              href="https://www.facebook.com/khascouture"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-ivory/60 hover:text-gold text-sm font-body transition-colors"
            >
              <span className="text-gold"><FacebookIcon size={15} /></span>
              KhasCoutures on Facebook
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
          <Link href="/privacy-policy" className="text-ivory/20 hover:text-ivory/50 text-xs font-body transition-colors">
            Privacy Policy
          </Link>
          <p className="text-gold/40 text-xs font-display italic">
            Exquisite Couture Infused In Tradition
          </p>
        </div>
      </div>
    </footer>
  );
}
