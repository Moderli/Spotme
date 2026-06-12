"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10 transition-all duration-300 z-[101]">
        <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">

          {/* Left side: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="font-serif text-3xl font-bold text-primary italic tracking-tight">
              Spotme
            </Link>
          </div>

          {/* Middle: Nav links */}
          <div className="hidden md:flex gap-8 items-center justify-center flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-sans text-[15px] font-medium transition-colors duration-200 nav-underline pb-1 ${isActive
                      ? "text-primary font-semibold border-b-2 border-primary"
                      : "text-on-surface-variant hover:text-primary"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right side: Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-on-surface-variant font-sans font-semibold text-sm hover:text-primary transition-all px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/inquire"
              className="bg-primary text-on-primary font-sans font-semibold text-sm px-6 py-2.5 rounded-xl hover:scale-[1.05] active:scale-95 duration-200 shadow-sm transition-all text-center inline-block"
            >
              Inquire
            </Link>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 text-on-surface hover:text-primary transition-colors focus:outline-none cursor-pointer z-[102]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Side Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[1002] md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[280px] bg-surface p-6 shadow-2xl flex flex-col justify-between animate-slide-in">
            <div className="flex flex-col gap-8">
              {/* Drawer Header */}
              <div className="flex justify-between items-center">
                <Link
                  href="/"
                  className="font-serif text-2xl font-bold text-primary italic tracking-tight"
                  onClick={() => setIsOpen(false)}
                >
                  Spotme
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
                  aria-label="Close Menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-6 mt-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`font-sans text-lg font-medium transition-colors ${
                        isActive ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons in Drawer (Login + Inquire) */}
            <div className="flex flex-col gap-3 mt-auto pb-8 border-t border-outline-variant/20 pt-6">
              <Link
                href="/login"
                className="w-full text-center border border-outline-variant text-on-surface font-sans font-semibold text-sm py-3 rounded-xl hover:bg-surface-container-low transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/inquire"
                className="w-full text-center bg-primary text-on-primary font-sans font-semibold text-sm py-3 rounded-xl hover:scale-[1.02] active:scale-95 duration-200 transition-all"
                onClick={() => setIsOpen(false)}
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
