import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Admin | KhasCouture",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-gray-800 text-sm">KhasCouture Admin</span>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <Link href="/admin/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
            <Link href="/admin/appointments" className="text-gray-600 hover:text-gray-900">Appointments</Link>
            <Link href="/admin/products" className="text-gray-600 hover:text-gray-900">Products</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">← View Site</Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button type="submit" className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-gray-600 transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
