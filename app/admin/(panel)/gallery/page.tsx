export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase";
import type { GalleryImage } from "@/lib/supabase";
import GalleryManager from "./GalleryManager";

async function getImages(): Promise<GalleryImage[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    return (data as GalleryImage[]) ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const images = await getImages();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gallery Manager</h1>
        <span className="text-sm text-gray-500">{images.filter((i) => i.visible).length} visible · {images.length} total</span>
      </div>
      <GalleryManager initialImages={images} />
    </div>
  );
}
