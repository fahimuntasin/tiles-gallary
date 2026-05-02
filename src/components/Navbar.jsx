"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@heroui/react";
import { LayoutGrid, LogIn, LogOut, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: LayoutGrid },
    { href: "/all-tiles", label: "All Tiles", icon: LayoutGrid },
    { href: "/my-profile", label: "My Profile", icon: User },
  ];

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-[#1e3a5f] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#c8a97e]">
            <LayoutGrid className="h-7 w-7" />
            TilesGallery
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive(link.href)
                    ? "bg-[#c8a97e] text-[#1e3a5f]"
                    : "text-white hover:bg-[#2d5a8e]"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    as="button"
                    size="sm"
                    src={session.user.image || undefined}
                    name={session.user.name || "User"}
                    className="cursor-pointer bg-[#c8a97e] text-[#1e3a5f] font-bold"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User menu">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="my-profile" href="/my-profile" startContent={<User className="h-4 w-4" />}>
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut className="h-4 w-4" />}
                    onPress={async () => {
                      const { signOut } = await import("@/lib/auth-client");
                      await signOut();
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Button
                as={Link}
                href="/login"
                className="bg-[#c8a97e] text-[#1e3a5f] font-semibold hover:bg-[#dfc9a8]"
                size="sm"
                startContent={<LogIn className="h-4 w-4" />}
              >
                Login
              </Button>
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
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium mt-1 ${
                isActive(link.href) ? "bg-[#c8a97e] text-[#1e3a5f]" : "text-white hover:bg-[#1e3a5f]"
              }`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-white/10 pt-3">
            {!session?.user ? (
              <Link href="/login" className="flex items-center justify-center gap-2 bg-[#c8a97e] text-[#1e3a5f] px-5 py-2 rounded-md font-semibold" onClick={() => setMobileOpen(false)}>
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            ) : (
              <button
                className="flex items-center justify-center gap-2 text-red-400 font-semibold w-full py-2"
                onClick={async () => {
                  const { signOut } = await import("@/lib/auth-client");
                  await signOut();
                  window.location.href = "/";
                }}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}