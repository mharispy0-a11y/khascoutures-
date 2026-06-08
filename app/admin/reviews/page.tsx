export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getServerClient } from "@/lib/supabase";
import type { Review } from "@/lib/supabase";
import ReviewsManager from "./ReviewsManager";

async function getReviews(): Promise<Review[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Review[]) ?? [];
  } catch {
    return [];
  }
}

export default async function ReviewsAdminPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");
  const reviews = await getReviews();
  const pending = reviews.filter((r) => !r.approved).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Reviews</h1>
        {pending > 0 && (
          <span className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
            {pending} awaiting approval
          </span>
        )}
      </div>
      <ReviewsManager initialReviews={reviews} />
    </div>
  );
}
