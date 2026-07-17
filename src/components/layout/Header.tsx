"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/company";

interface NavigationItem {
  href: string;
  label: string;
  idn: string;
  subItems?: { href: string; label: string }[];
}

const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home", idn: "Beranda" },
  {
    href: "#services-dropdown",
    label: "Services",
    idn: "Layanan",
    subItems: [
      { href: "/services/jasa-bangun-rumah", label: "Jasa Bangun Rumah" },
      { href: "/services/jasa-renovasi-rumah", label: "Jasa Renovasi Rumah" },
    ]
  },
  { href: "/portfolio", label: "Portfolio", idn: "Portfolio" },
  { href: "/about", label: "About", idn: "Tentang Kami" },
  { href: "/blog", label: "Blog", idn: "Blog" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const pathname = usePathname();

  const isForceScrolled = pathname.startsWith("/blog") || pathname.startsWith("/terms") || pathname.startsWith("/privacy");
  const effectiveIsScrolled = isScrolled || isForceScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <header className={`top-0 fixed z-50 w-full transition-all duration-300 ${effectiveIsScrolled ? "glass-nav border-b border-surface-container py-2" : "bg-transparent py-4"}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 container-max mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={effectiveIsScrolled ? "/assets/images/layout/logo-primary.png" : "/assets/images/layout/logo-white.png"}
            alt="ARCHITEXTRUE Logo"
            width={240}
            height={60}
            className="h-8 md:h-10 w-auto object-contain transition-all duration-300"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-gutter items-center">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href));

            return (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <button
                    className={`flex items-center gap-1 font-label-md text-label-md transition-colors relative py-2 cursor-pointer ${effectiveIsScrolled ? "text-secondary hover:text-tertiary" : "text-white hover:text-white/80 drop-shadow-md"
                      }`}
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />

                    {/* Active Indicator Line (Glassmorphic) */}
                    {isActive && (
                      <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full backdrop-blur-sm transition-colors ${effectiveIsScrolled ? 'bg-primary/50' : 'bg-white/50'
                        }`}></span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 font-label-md text-label-md transition-colors relative py-2 ${effectiveIsScrolled ? "text-secondary hover:text-tertiary" : "text-white hover:text-white/80 drop-shadow-md"
                      }`}
                  >
                    {item.label}
                    {/* Active Indicator Line (Glassmorphic) */}
                    {isActive && (
                      <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full backdrop-blur-sm transition-colors ${effectiveIsScrolled ? 'bg-primary/50' : 'bg-white/50'
                        }`}></span>
                    )}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className={`backdrop-blur-md rounded-xl p-2 min-w-[240px] shadow-xl flex flex-col gap-1 transition-colors ${effectiveIsScrolled ? "bg-surface/95 border border-surface-container" : "bg-white/5 border border-white/20"
                      }`}>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`px-4 py-3 text-sm font-label-md rounded-lg transition-colors ${effectiveIsScrolled
                              ? pathname === sub.href ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-surface-container hover:text-primary"
                              : pathname === sub.href ? "bg-white/20 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <Button
          variant={effectiveIsScrolled ? "default" : "outline"}
          className={`hidden md:inline-flex font-label-md text-label-md px-6 py-3 rounded-lg transition-all ${effectiveIsScrolled
            ? "bg-primary text-white ambient-shadow-1 hover:bg-primary-container hover:text-white"
            : "border-[1.5px] border-white text-white hover:bg-white/10 backdrop-blur-sm"
            }`}
          asChild
        >
          <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Konsultasi
          </Link>
        </Button>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden p-2 transition-colors ${effectiveIsScrolled ? "text-primary" : "text-white drop-shadow-md"}`}
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
        <div className={`md:hidden border-t transition-colors duration-300 ${effectiveIsScrolled ? "bg-surface border-surface-container" : "bg-white/5 backdrop-blur-md border-white/20"}`}>
          <div className="px-margin-mobile py-4 flex flex-col gap-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.subItems && item.subItems.some(sub => pathname === sub.href));

              return (
                <div key={item.label} className="flex flex-col">
                  {item.subItems ? (
                    <button
                      className={`w-full font-label-md text-label-md py-3 px-2 rounded-lg transition-colors flex items-center justify-between ${effectiveIsScrolled
                          ? isActive ? "bg-primary/5 text-tertiary font-bold" : "text-primary hover:bg-surface-container hover:text-tertiary"
                          : isActive ? "bg-white/10 text-white font-bold" : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                      onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 opacity-70 transition-transform duration-300 ${expandedMobileItem === item.label ? "rotate-180" : ""}`} />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`font-label-md text-label-md py-3 px-2 rounded-lg transition-colors flex items-center justify-between ${effectiveIsScrolled
                          ? isActive ? "bg-primary/5 text-tertiary font-bold" : "text-primary hover:bg-surface-container hover:text-tertiary"
                          : isActive ? "bg-white/10 text-white font-bold" : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )}

                  {item.subItems && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ${expandedMobileItem === item.label ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className={`flex flex-col pl-4 border-l-2 ml-4 mt-1 mb-2 gap-1 ${effectiveIsScrolled ? "border-surface-container" : "border-white/20"}`}>
                        {item.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`font-label-md text-sm py-2 px-2 rounded-lg transition-colors ${effectiveIsScrolled
                                ? pathname === sub.href ? "text-tertiary font-bold bg-primary/5" : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                                : pathname === sub.href ? "text-white font-bold bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                              }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <div className={`pt-4 mt-2 border-t ${effectiveIsScrolled ? "border-surface-container" : "border-white/10"}`}>
              <Button
                className={`w-full font-label-md text-label-md py-6 rounded-lg ambient-shadow-1 transition-all !text-white ${effectiveIsScrolled ? "bg-primary hover:bg-primary-container" : "bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30"
                  }`}
                asChild
              >
                <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/assets/images/layout/wa.svg" alt="WhatsApp" width={24} height={24} className="brightness-0 invert" />
                  <span className="!text-white">Konsultasi</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}