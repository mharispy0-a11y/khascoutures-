import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Admin | KhasCouture",
  robots: { index: false, follow: false },
};

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1 overflow-x-auto">
          <span className="font-semibold text-gray-800 text-sm mr-4 flex-shrink-0">KhasCouture Admin</span>
          <div className="hidden sm:flex items-center gap-1 text-xs">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link href="/" className="text-xs text-gray-500 hover:text-gray-700">← Site</Link>
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
