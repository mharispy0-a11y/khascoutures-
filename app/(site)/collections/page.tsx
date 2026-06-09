import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerClient } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export const metadata: Metadata = {
  title: "Collections | KhasCouture",
  description: "Explore our Bridal, Party Wear and Pret collections at KhasCouture, Rawalpindi.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567";
const BASE_URL = "https://splendorous-daffodil-c9b791.netlify.app";

// Static section chrome — title, description, gradient never change
const SECTION_META: Record<string, { category: string; title: string; description: string; image: string }> = {
  bridal: {
    category: "Bridal Couture",
    title: "The Bridal Edit",
    description:
      "Our bridal collection is an ode to the grandeur of Pakistani weddings — from the intimate Nikah to the lavish Walima. Each lehenga, shararah, and anarkali is a hand-embroidered masterpiece.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80",
  },
  party: {
    category: "Party Wear",
    title: "The Formal Edit",
    description:
      "Commanding attention at every gathering — our party wear line is crafted for women who appreciate the weight of a well-embellished dupatta and the luxury of fine fabric.",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&q=80",
  },
  pret: {
    category: "Pret & Casual",
    title: "The Everyday Edit",
    description:
      "Thoughtfully designed ready-to-wear pieces that carry the soul of couture without the occasion — refined silhouettes for lunches, casual events, and everyday grace.",
    image: "https://images.unsplash.com/photo-1585914924626-15adac1e6402?w=800&q=80",
  },
};

// Static fallback used when DB is unavailable
const STATIC_PRODUCTS: Product[] = [
  { id: "s1", name: "Crimson Zari Lehenga",   category: "bridal", fabric: "Raw Silk",      embroidery: "Zardozi & Dabka",            price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", image_alt: "Crimson bridal lehenga", whatsapp_enquiry_text: "I'm interested in the Crimson Zari Lehenga",   sort_order: 10,  is_active: true, created_at: "" },
  { id: "s2", name: "Ivory Walima Ensemble",  category: "bridal", fabric: "Chiffon",       embroidery: "Thread & Sequins",           price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80", image_alt: "Bridal ensemble",        whatsapp_enquiry_text: "I'm interested in the Ivory Walima Ensemble",  sort_order: 20,  is_active: true, created_at: "" },
  { id: "s3", name: "Garnet Anarkali",        category: "bridal", fabric: "Net over Silk", embroidery: "Mirror & Gota",              price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80", image_alt: "Garnet anarkali",        whatsapp_enquiry_text: "I'm interested in the Garnet Anarkali",        sort_order: 30,  is_active: true, created_at: "" },
  { id: "s4", name: "Blush Sharara Set",      category: "bridal", fabric: "Organza",       embroidery: "Cut-Dana & Resham",          price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80", image_alt: "Blush sharara set",      whatsapp_enquiry_text: "I'm interested in the Blush Sharara Set",      sort_order: 40,  is_active: true, created_at: "" },
  { id: "s5", name: "Forest Satin Co-ord",    category: "party",  fabric: "Premium Satin", embroidery: "Aari Embroidery",            price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80", image_alt: "Formal party outfit",    whatsapp_enquiry_text: "I'm interested in the Forest Satin Co-ord",    sort_order: 50,  is_active: true, created_at: "" },
  { id: "s6", name: "Midnight Farshi Pyjama", category: "party",  fabric: "Velvet",        embroidery: "Gota & Tilla",               price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=600&q=80", image_alt: "Party wear outfit",      whatsapp_enquiry_text: "I'm interested in the Midnight Farshi Pyjama", sort_order: 60,  is_active: true, created_at: "" },
  { id: "s7", name: "Bronze Palazzo Set",     category: "party",  fabric: "Tissue",        embroidery: "Sequin & Beads",             price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&q=80", image_alt: "Bronze palazzo outfit",  whatsapp_enquiry_text: "I'm interested in the Bronze Palazzo Set",     sort_order: 70,  is_active: true, created_at: "" },
  { id: "s8", name: "Plum Jacket Kurta",      category: "party",  fabric: "Jamawar",       embroidery: "Block Print",                price_on_request: true,  price_pkr: null,  image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4b984b?w=600&q=80", image_alt: "Jacket kurta",           whatsapp_enquiry_text: "I'm interested in the Plum Jacket Kurta",      sort_order: 80,  is_active: true, created_at: "" },
  { id: "s9", name: "Sage Lawn 3-Piece",      category: "pret",   fabric: "Premium Lawn",  embroidery: "Digital Print + Embroidery", price_on_request: false, price_pkr: 12000, image_url: "https://images.unsplash.com/photo-1585914924626-15adac1e6402?w=600&q=80", image_alt: "Lawn 3-piece suit",      whatsapp_enquiry_text: "I'm interested in the Sage Lawn 3-Piece",      sort_order: 90,  is_active: true, created_at: "" },
  { id: "s10",name: "Terracotta Kurta Set",   category: "pret",   fabric: "Cambric",       embroidery: "Hand Block",                 price_on_request: false, price_pkr: 9500,  image_url: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&q=80", image_alt: "Terracotta kurta set",   whatsapp_enquiry_text: "I'm interested in the Terracotta Kurta Set",   sort_order: 100, is_active: true, created_at: "" },
  { id: "s11",name: "Navy Chiffon Dupatta",   category: "pret",   fabric: "Chiffon",       embroidery: "Printed",                    price_on_request: false, price_pkr: 14000, image_url: "https://images.unsplash.com/photo-1585914924626-15adac1e6402?w=600&q=80", image_alt: "Chiffon outfit",         whatsapp_enquiry_text: "I'm interested in the Navy Chiffon Dupatta",   sort_order: 110, is_active: true, created_at: "" },
  { id: "s12",name: "Dusty Rose Co-ord",      category: "pret",   fabric: "Cotton",        embroidery: "Schiffli Lace",              price_on_request: false, price_pkr: 11000, image_url: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=600&q=80", image_alt: "Casual co-ord",          whatsapp_enquiry_text: "I'm interested in the Dusty Rose Co-ord",      sort_order: 120, is_active: true, created_at: "" },
];

async function getProducts(): Promise<Product[]> {
  try {
    const db = getServerClient();
    const { data, error } = await db
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return STATIC_PRODUCTS;
    return data as Product[];
  } catch {
    return STATIC_PRODUCTS;
  }
}

function formatPrice(p: Product) {
  if (p.price_on_request) return "On Request";
  if (p.price_pkr) return `PKR ${p.price_pkr.toLocaleString("en-PK")}`;
  return "On Request";
}

export default async function CollectionsPage() {
  const products = await getProducts();

  const byCategory = products.reduce<Record<string, Product[]>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  const sections = (["bridal", "party", "pret"] as const).map((cat) => ({
    id: cat,
    ...SECTION_META[cat],
    pieces: byCategory[cat] ?? [],
  }));

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "KhasCouture Collections",
    url: `${BASE_URL}/collections`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      description: [p.fabric, p.embroidery].filter(Boolean).join(" — "),
      url: `${BASE_URL}/collections#${p.category}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <AnnouncementBanner category="all" />
      <div className="pt-24">
        {/* Page header */}
        <div className="bg-charcoal py-20 px-6 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(201,168,76,0.1) 0px, rgba(201,168,76,0.1) 1px, transparent 1px, transparent 30px)" }}
          />
          <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-3 relative z-10">Explore</p>
          <h1 className="font-display text-5xl md:text-7xl text-ivory font-light relative z-10" style={{ fontFamily: "var(--font-cormorant)" }}>
            Our Collections
          </h1>
          <div className="ornamental-line max-w-xs mx-auto mt-6 relative z-10">
            <span className="text-gold">✦</span>
          </div>
          <p className="mt-5 text-ivory/50 font-body text-sm max-w-md mx-auto relative z-10">
            Three distinct worlds of couture — each telling a different story of South Asian elegance.
          </p>
        </div>

        {/* Collection sections */}
        <div className="bg-ivory">
          {sections.map((col, idx) => (
            <div key={col.id} id={col.id} className={`py-20 px-6 ${idx % 2 !== 0 ? "bg-cream" : "bg-ivory"}`}>
              <AnnouncementBanner category={col.id} />
              <div className="max-w-7xl mx-auto">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start`}>
                  {/* Visual */}
                  <div className={idx % 2 !== 0 ? "order-1 lg:order-2" : ""}>
                    <div className="aspect-[4/3] relative border border-gold/20 overflow-hidden">
                      <Image
                        src={col.image}
                        alt={col.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-gold/50" />
                      <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-gold/50" />
                      <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-gold/50" />
                      <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-gold/50" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className={`space-y-6 ${idx % 2 !== 0 ? "order-2 lg:order-1" : ""}`}>
                    <div>
                      <p className="text-gold text-xs tracking-[0.4em] uppercase font-body mb-2">{col.category}</p>
                      <h2 className="font-display text-4xl md:text-5xl text-charcoal font-light" style={{ fontFamily: "var(--font-cormorant)" }}>
                        {col.title}
                      </h2>
                      <p className="text-charcoal/40 font-body text-xs mt-2">{col.pieces.length} piece{col.pieces.length !== 1 ? "s" : ""}</p>
                    </div>

                    <div className="ornamental-line"><span className="text-gold">✦</span></div>

                    <p className="text-charcoal/65 font-body text-sm leading-relaxed">{col.description}</p>

                    {/* Pieces grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {col.pieces.map((piece) => (
                        <a
                          key={piece.id}
                          href={`https://wa.me/${encodeURIComponent(WA)}?text=${encodeURIComponent(piece.whatsapp_enquiry_text ?? `I'm interested in the ${piece.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gold/15 bg-warm-white card-hover block group overflow-hidden"
                        >
                          {piece.image_url && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={piece.image_url}
                                alt={piece.image_alt ?? piece.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, 25vw"
                              />
                            </div>
                          )}
                          <div className="p-4">
                            <p className="font-display text-base text-charcoal font-medium mb-1 group-hover:text-gold transition-colors" style={{ fontFamily: "var(--font-cormorant)" }}>
                              {piece.name}
                            </p>
                            {piece.fabric && <p className="text-charcoal/50 text-xs font-body">{piece.fabric}</p>}
                            {piece.embroidery && <p className="text-gold/70 text-[11px] tracking-wide font-body mt-1">{piece.embroidery}</p>}
                            <p className="text-charcoal font-body text-xs font-medium mt-2">{formatPrice(piece)}</p>
                          </div>
                        </a>
                      ))}
                    </div>

                    <a
                      href={`https://wa.me/${encodeURIComponent(WA)}?text=${encodeURIComponent(`I'm interested in the ${col.title} collection`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gold text-gold hover:bg-gold hover:text-ivory px-8 py-3 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300 mt-2"
                    >
                      Enquire via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-charcoal py-16 px-6 text-center">
          <p className="text-ivory/60 font-body text-sm mb-4">Don&apos;t see what you&apos;re looking for? We do bespoke commissions.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-ivory px-10 py-4 text-xs tracking-[0.3em] uppercase font-body transition-all duration-300">
            Request a Custom Order
          </Link>
        </div>
      </div>
    </>
  );
}
