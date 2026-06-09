import { getServerClient } from "@/lib/supabase";
import type { Announcement } from "@/lib/supabase";

async function getAnnouncements(category: string): Promise<Announcement[]> {
  try {
    const db = getServerClient();
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await db
      .from("announcements")
      .select("id,title,body,category,pinned,ends_at")
      .eq("active", true)
      .or(`starts_at.is.null,starts_at.lte.${today}`)
      .or(`ends_at.is.null,ends_at.gte.${today}`)
      .in("category", category === "all" ? ["all"] : ["all", category])
      .order("pinned", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);
    return (data as Announcement[]) ?? [];
  } catch {
    return [];
  }
}

export default async function AnnouncementBanner({ category = "all" }: { category?: string }) {
  const items = await getAnnouncements(category);
  if (items.length === 0) return null;

  return (
    <div className="bg-charcoal/95 border-b border-gold/20">
      {items.map((item) => (
        <div
          key={item.id}
          className={`px-4 py-2.5 text-center ${item.pinned ? "bg-gold/10" : ""}`}
        >
          <p className="font-body text-xs text-ivory/90 max-w-3xl mx-auto">
            {item.pinned && <span className="text-gold mr-2">★</span>}
            <span className="font-semibold text-gold">{item.title}</span>
            <span className="mx-2 text-ivory/40">·</span>
            <span>{item.body}</span>
            {item.ends_at && (
              <span className="text-ivory/50 ml-2 text-[10px]">
                Until {new Date(item.ends_at).toLocaleDateString("en-PK", { day: "numeric", month: "short" })}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
