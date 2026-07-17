"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/config/company";

interface FooterLink {
  href: string;
  label: string;
}

const footerLinks = {
  services: [
    { href: "/services/jasa-bangun-rumah", label: "Jasa Bangun Rumah" },
    { href: "/services/jasa-renovasi-rumah", label: "Jasa Renovasi Rumah" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
  ],
};

const contactInfo = {
  address: "Jl. Kaliurang KM 8, Yogyakarta",
  email: "info@architextrue.com",
  phone: "+62 812 1000 4453",
  whatsapp: WHATSAPP_NUMBER,
};

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname === "/login") {
    return null;
  }

  return (
    <footer className="bg-primary text-on-primary w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 px-margin-mobile md:px-margin-desktop py-section-gap container-max mx-auto">
        {/* Brand Section */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start pr-0 lg:pr-12">
          <Link href="/">
            <Image
              src="/assets/images/layout/logo-white.png"
              alt="ARCHITEXTRUE Logo"
              width={240}
              height={60}
              className="h-8 md:h-10 w-auto object-contain mb-stack-md cursor-pointer hover:opacity-90 transition-opacity"
            />
          </Link>
          <p className="font-body-md text-body-md text-primary-fixed-dim mt-4">
            Spesialis jasa bangun dan renovasi rumah mewah area Yogyakarta dan sekitarnya. Kualitas pengerjaan terbaik dan transparan.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6">
            <Link href="https://www.tiktok.com/@architextrue" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/images/layout/tiktok-white.svg" alt="TikTok" width={24} height={24} className="hover:opacity-80 transition-opacity" />
            </Link>
            <Link href="https://www.instagram.com/architextrue_" target="_blank" rel="noopener noreferrer">
              <Image src="/assets/images/layout/instagram-white.svg" alt="Instagram" width={24} height={24} className="hover:opacity-80 transition-opacity" />
            </Link>
          </div>
        </div>

        {/* Services Links */}
        <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-bold mb-2">
            Services
          </span>
          {footerLinks.services.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-primary-fixed-dim hover:text-white transition-all opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Company Links */}
        <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-bold mb-2">
            Company
          </span>
          {footerLinks.company.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-primary-fixed-dim hover:text-white transition-all opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact Information */}
        <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-3">
          <span className="font-label-md text-label-md text-white font-bold mb-2">
            Contact Us
          </span>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Image src="/assets/images/layout/map.svg" alt="Address" width={20} height={20} className="mt-0.5 flex-shrink-0" />
              <p className="font-body-md text-body-md text-primary-fixed-dim opacity-80">
                {contactInfo.address}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/assets/images/layout/mail.svg" alt="Email" width={20} height={20} className="flex-shrink-0" />
              <Link
                href={`mailto:${contactInfo.email}`}
                className="font-body-md text-body-md text-primary-fixed-dim opacity-80 hover:text-white hover:opacity-100"
              >
                {contactInfo.email}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/assets/images/layout/wa.svg" alt="WhatsApp" width={20} height={20} className="flex-shrink-0" />
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body-md text-body-md text-primary-fixed-dim opacity-80 hover:text-white hover:opacity-100"
              >
                {contactInfo.phone}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-on-primary-fixed-variant/30">
        <div className="px-margin-mobile md:px-margin-desktop py-6 container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body-md text-body-md text-primary-fixed-dim opacity-80 text-center md:text-left">
              © {new Date().getFullYear()} ARCHITEXTRUE. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="text-xs text-primary-fixed-dim opacity-60 flex gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <Link
        href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-3 md:p-4 rounded-full ambient-shadow-2 hover:scale-105 transition-transform z-50 flex items-center justify-center"
        aria-label="Chat di WhatsApp"
      >
        <Image src="/assets/images/layout/wa.svg" alt="WhatsApp" width={28} height={28} className="w-8 h-8 md:w-10 md:h-10" />
      </Link>
    </footer>
  );
}