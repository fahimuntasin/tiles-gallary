"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { LogIn, LogOut, User, Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-tiles", label: "All Tiles" },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const { signOut } = await import("@/lib/auth-client");
    await signOut();
    window.location.href = "/";
  };

  return (
    <nav className="bg-[#1e3a5f] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-[#c8a97e]">
            TilesGallery
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-[#c8a97e] text-[#1e3a5f]"
                    : "text-white hover:bg-[#2d5a8e]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2d5a8e] hover:bg-[#3a6ea5] transition-colors"
                >
                  {session.user.image ? (
                    <Image src={session.user.image} alt={session.user.name || "User"} width={32} height={32} className="rounded-full object-cover w-8 h-8" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#c8a97e] flex items-center justify-center">
                      <span className="text-[#1e3a5f] text-sm font-bold">
                        {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  )}
                  <span className="text-white text-sm font-medium max-w-[120px] truncate">{session.user.name}</span>
                  <ChevronDown className={`h-4 w-4 text-white transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                      <p className="font-semibold text-[#1e3a5f] text-sm truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <div className="p-2 flex flex-col gap-1">
                      <Link
                        href="/my-profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#1e3a5f]/5 transition-colors text-[#1e3a5f] font-medium"
                      >
                        <User className="h-4 w-4 text-[#c8a97e]" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-red-600 font-medium w-full text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 bg-[#c8a97e] text-[#1e3a5f] font-semibold hover:bg-[#dfc9a8] px-4 py-2 rounded-md text-sm transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#2d5a8e] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium mt-1 ${
                isActive(link.href) ? "bg-[#c8a97e] text-[#1e3a5f]" : "text-white hover:bg-[#1e3a5f]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
            {!session?.user ? (
              <Link href="/login" className="flex items-center justify-center gap-2 bg-[#c8a97e] text-[#1e3a5f] px-5 py-2 rounded-md font-semibold" onClick={() => setMobileOpen(false)}>
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            ) : (
              <>
                <Link href="/my-profile" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 bg-[#c8a97e] text-[#1e3a5f] px-5 py-2 rounded-md font-semibold">
                  <User className="h-4 w-4" />
                  My Profile
                </Link>
                <button
                  className="flex items-center justify-center gap-2 bg-red-500/90 hover:bg-red-600 text-white px-5 py-2 rounded-md font-semibold transition-colors"
                  onClick={async () => {
                    setMobileOpen(false);
                    await handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}