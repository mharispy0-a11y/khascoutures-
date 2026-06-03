import type { Metadata } from "next";
import { MapPin, Clock, Phone } from "lucide-react";
import AppointmentForm from "@/components/AppointmentForm";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact & Visit | KhasCoutures",
  description: "Visit KhasCoutures in Rawalpindi — Shop No. G 58,59 R.B 2 Plaza Rehmanabad. Book an appointment for bridal, party wear or custom orders.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567";
const MAPS_URL = process.env.NEXT_PUBLIC_MAPS_EMBED_URL ??
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.6!2d73.0735!3d33.5651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed2e9b3e4b7b%3A0x0!2zUmVobWFuYWJhZCwgUmF3YWxwaW5kaQ!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk";

const hours = [
  { day: "Monday – Thursday", time: "10:00 AM – 8:00 PM (PKT)" },
  { day: "Friday", time: "2:00 PM – 9:00 PM (PKT)" },
  { day: "Saturday – Sunday", time: "10:00 AM – 9:00 PM (PKT)" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "KhasCoutures",
  description: "Luxury Pakistani couture — bridal, party wear, and pret. Located in Rawalpindi.",
  url: "https://splendorous-daffodil-c9b791.netlify.app",
  telephone: `+${WA}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. G 58,59 Uper Ground, R.B 2 Plaza Rehmanabad",
    addressLocality: "Rawalpindi",
    postalCode: "46000",
    addressCountry: "PK",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "14:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday", "Sunday"], opens: "10:00", closes: "21:00" },
  ],
  sameAs: [
    "https://www.instagram.com/khascoutures",
    "https://www.threads.com/@khascoutures",
    "https://www.facebook.com/khascouture",
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-24">
        {/* Header */}
        <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 50% 50%, rgba(201,168,76,0.4) 0%, transparent 60%)" }}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3 relative z-10">
            Come See Us
          </p>
          <h1
            className="font-display text-5xl md:text-7xl text-ivory font-light relative z-10"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Visit Our Atelier
          </h1>
          <div className="ornamental-line max-w-xs mx-auto mt-6 relative z-10">
            <span className="text-gold">✦</span>
          </div>
        </div>

        <div className="bg-ivory py-16 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info + Form panel */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl text-charcoal font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                  Find Us
                </h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 p-5 border border-gold/15 bg-warm-white">
                    <div className="w-10 h-10 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                      <MapPin size={16} className="text-gold" />
                    </div>
                    <div>
                      <p className="text-charcoal font-body font-medium text-sm mb-1">Store Address</p>
                      <p className="text-charcoal/60 font-body text-sm leading-relaxed">
                        Shop No. G 58,59 Uper Ground<br />
                        R.B 2 Plaza Rehmanabad<br />
                        Rawalpindi, Pakistan 46000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 border border-gold/15 bg-warm-white">
                    <div className="w-10 h-10 flex-shrink-0 border border-gold/30 flex items-center justify-center">
                      <Clock size={16} className="text-gold" />
                    </div>
                    <div className="w-full">
                      <p className="text-charcoal font-body font-medium text-sm mb-3">Store Hours</p>
                      <div className="space-y-1.5">
                        {hours.map((h) => (
                          <div key={h.day} className="flex justify-between items-center gap-4">
                            <p className="text-charcoal/60 font-body text-xs">{h.day}</p>
                            <p className="text-gold text-xs font-body font-medium whitespace-nowrap">{h.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick contact buttons */}
              <div className="space-y-3">
                <p className="text-charcoal/50 font-body text-xs tracking-wider uppercase mb-4">Reach Out</p>
                <a
                  href={`https://wa.me/${encodeURIComponent(WA)}?text=${encodeURIComponent("Hello, I'd like to enquire about an appointment")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1eb858] text-white px-6 py-4 text-sm font-body transition-all duration-300"
                >
                  <Phone size={16} />
                  <div>
                    <p className="font-medium text-sm">WhatsApp Enquiry</p>
                    <p className="text-white/70 text-xs">Fastest way to reach us</p>
                  </div>
                </a>
                <a
                  href="https://instagram.com/khascoutures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white px-6 py-4 text-sm font-body transition-all hover:opacity-90"
                >
                  <InstagramIcon size={16} />
                  <div>
                    <p className="font-medium text-sm">Instagram DM</p>
                    <p className="text-white/70 text-xs">@khascoutures</p>
                  </div>
                </a>
              </div>

              {/* Appointment form (client component) */}
              <AppointmentForm />
            </div>

            {/* Map */}
            <div className="space-y-4">
              <h2 className="font-display text-3xl text-charcoal font-light mb-6" style={{ fontFamily: "var(--font-cormorant)" }}>
                Location
              </h2>
              <div className="border border-gold/20 overflow-hidden h-[500px]">
                <iframe
                  src={MAPS_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KhasCoutures Location — R.B 2 Plaza Rehmanabad, Rawalpindi"
                />
              </div>
              <p className="text-charcoal/50 font-body text-xs text-center">
                Shop No. G 58,59 Uper Ground, R.B 2 Plaza Rehmanabad, Rawalpindi 46000
              </p>
              <a
                href="https://www.google.com/maps/search/R.B+2+Plaza+Rehmanabad+Rawalpindi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-gold/40 hover:border-gold text-charcoal/70 hover:text-gold py-3 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300 w-full"
              >
                <MapPin size={14} />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
