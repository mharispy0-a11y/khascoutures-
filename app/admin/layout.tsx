"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "./actions";

const navLinks = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/appointments", label: "Appointments" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/sales", label: "Sales Log" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Login page: no nav wrapper at all
  if (!pathname || pathname === "/admin/login" || pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  const currentPage = navLinks.find((l) => pathname?.startsWith(l.href))?.label ?? "Admin";

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Top bar */}
      <nav className="bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 min-w-0">
          <span className="font-semibold text-gray-900 text-sm flex-shrink-0 select-none">
            KhasCouture
          </span>
          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 text-xs">
            {navLinks.map((l) => {
              const active = pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-3 py-1.5 rounded whitespace-nowrap transition-colors ${
                    active
                      ? "bg-amber-50 text-amber-700 font-medium"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
          {/* Mobile: current page name */}
          <span className="lg:hidden text-sm text-gray-600 truncate">{currentPage}</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <form action={handleSignOut} className="hidden lg:block">
            <button
              type="submit"
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-gray-600 transition-colors"
            >
              Sign Out
            </button>
          </form>
          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 lg:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Drawer (right side) */}
      <div
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-200 flex-shrink-0">
          <span className="font-semibold text-gray-900 text-sm">KhasCouture Admin</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded hover:bg-gray-100 transition-colors -mr-2"
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navLinks.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center px-5 py-3.5 text-sm transition-colors ${
                  active
                    ? "bg-amber-50 text-amber-700 font-medium border-r-[3px] border-amber-500"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out */}
        <div className="border-t border-gray-200 p-4 flex-shrink-0">
          <form action={handleSignOut}>
            <button
              type="submit"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 text-sm font-medium rounded transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>

      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
