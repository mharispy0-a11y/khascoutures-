export const dynamic = "force-dynamic";

import { getServerClient } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";
import ProductsTable from "./ProductsTable";

async function getProducts(): Promise<Product[]> {
  try {
    const db = getServerClient();
    const { data } = await db
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });
    return (data as Product[]) ?? [];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
        <span className="text-sm text-gray-500">{products.filter((p) => p.is_active).length} active</span>
      </div>
      <ProductsTable initialData={products} />
    </div>
  );
}
