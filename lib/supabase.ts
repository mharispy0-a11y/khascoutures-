import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Appointment = {
  id: string;
  name: string;
  phone: string;
  email?: string | null;
  occasion: "bridal" | "party" | "pret" | "custom";
  message?: string | null;
  status: "pending" | "contacted" | "confirmed" | "cancelled";
  created_at: string;
  ip_address?: string | null;
  user_agent?: string | null;
};

export type Product = {
  id: string;
  name: string;
  category: "bridal" | "party" | "pret";
  fabric?: string | null;
  embroidery?: string | null;
  price_pkr?: number | null;
  price_on_request: boolean;
  image_url?: string | null;
  image_alt?: string | null;
  whatsapp_enquiry_text?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  caption?: string | null;
  category: string;
  display_order: number;
  visible: boolean;
  created_at: string;
};

export type Review = {
  id: string;
  name: string;
  role?: string | null;
  content: string;
  rating: number;
  approved: boolean;
  pinned: boolean;
  created_at: string;
};

export type Customer = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  source?: string | null;
  utm_campaign?: string | null;
  interest?: string | null;
  notes?: string | null;
  created_at: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  source?: string | null;
  read: boolean;
  created_at: string;
};

let _serverClient: SupabaseClient | null = null;

export function getServerClient(): SupabaseClient {
  if (!_serverClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error("Supabase env vars not configured (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)");
    }
    _serverClient = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return _serverClient;
}
