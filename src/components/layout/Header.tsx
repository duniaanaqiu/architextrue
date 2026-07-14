"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/company";

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
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`top-0 fixed z-50 w-full transition-all duration-300 ${isScrolled ? "glass-nav border-b border-surface-container py-2" : "bg-transparent py-4"}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 container-max mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={isScrolled ? "/assets/images/layout/logo-primary.png" : "/assets/images/layout/logo-white.png"}
            alt="ARCHITEXTRUE Logo"
            width={240}
            height={60}
            className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-gutter items-center">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-label-md text-label-md transition-colors ${isScrolled ? "text-secondary hover:text-tertiary" : "text-on-primary hover:text-white/80 drop-shadow-md"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <Button
          variant={isScrolled ? "default" : "outline"}
          className={`hidden md:inline-flex font-label-md text-label-md px-6 py-3 rounded-lg transition-all ${isScrolled
            ? "bg-primary text-on-primary ambient-shadow-1 hover:bg-primary-container"
            : "border-[1.5px] border-on-primary text-on-primary hover:bg-on-primary/10 backdrop-blur-sm"
            }`}
          asChild
        >
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Konsultasi
          </Link>
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${isScrolled ? "text-primary" : "text-on-primary drop-shadow-md"}`}
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
                {item.label}
              </Link>
            ))}
            <Button
              variant="default"
              className="mt-2 bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg ambient-shadow-1 hover:bg-primary-container transition-all"
              asChild
            >
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                Konsultasi
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}