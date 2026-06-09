"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleSignOut } from "../actions";

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

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const currentPage = navLinks.find((l) => pathname?.startsWith(l.href))?.label ?? "Admin";

  return (
    <div className="min-h-dvh bg-gray-50">
      {/* Top bar */}
      <nav className="bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="font-semibold text-gray-900 text-sm flex-shrink-0 select-none">
            KhasCouture
          </span>

          {/* Desktop nav links — visible at md+ with horizontal scroll if needed */}
          <div className="hidden md:flex items-center gap-0.5 text-xs overflow-x-auto flex-shrink min-w-0 [&::-webkit-scrollbar]:hidden">
            {navLinks.map((l) => {
              const active = pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`px-2.5 py-1.5 rounded whitespace-nowrap flex-shrink-0 transition-colors ${
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

          {/* Mobile: show current page name */}
          <span className="md:hidden text-sm text-gray-500 truncate">{currentPage}</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <form action={handleSignOut} className="hidden md:block">
            <button
              type="submit"
              className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded text-gray-600 transition-colors whitespace-nowrap"
            >
              Sign Out
            </button>
          </form>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2.5 -mr-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Full-width drawer — slides in from right on mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[320px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 flex-shrink-0">
          <span className="font-semibold text-gray-900">KhasCouture Admin</span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2.5 -mr-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links — large tap targets */}
        <nav className="flex-1 overflow-y-auto py-1" role="navigation">
          {navLinks.map((l) => {
            const active = pathname?.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center px-5 min-h-[52px] text-base font-medium transition-colors touch-manipulation ${
                  active
                    ? "bg-amber-50 text-amber-700 border-r-[3px] border-amber-500"
                    : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Sign out at bottom */}
        <div className="border-t border-gray-100 p-4 flex-shrink-0 pb-safe">
          <form action={handleSignOut}>
            <button
              type="submit"
              className="w-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 min-h-[52px] text-sm font-medium rounded-xl transition-colors touch-manipulation"
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
