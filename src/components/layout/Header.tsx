"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  href: string;
  label: string;
  idn: string;
}

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home", idn: "Beranda" },
  { href: "/services", label: "Services", idn: "Layanan" },
  { href: "/portfolio", label: "Portfolio", idn: "Portfolio" },
  { href: "/about", label: "About", idn: "Tentang Kami" },
  { href: "/blog", label: "Blog", idn: "Blog" },
  { href: "/contact", label: "Contact", idn: "Kontak" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="glass-nav top-0 sticky z-50 w-full transition-all duration-300 border-b border-surface-container">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 container-max mx-auto">
        {/* Logo */}
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary tracking-tight">
          ARCHITEXTRUE
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-gutter items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-label-md text-label-md text-secondary hover:text-tertiary transition-colors"
            >
              {item.idn}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <Button 
          variant="default" 
          className="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg ambient-shadow-1 hover:bg-primary-container transition-all"
          asChild
        >
          <Link href="/contact">
            Konsultasi Gratis
          </Link>
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-surface-container">
          <div className="px-margin-mobile py-4 flex flex-col gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-label-md text-label-md text-primary py-2 hover:text-tertiary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.idn}
              </Link>
            ))}
            <Button 
              variant="default" 
              className="mt-2 bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg ambient-shadow-1 hover:bg-primary-container transition-all"
              asChild
            >
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                Konsultasi Gratis
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}