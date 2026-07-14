import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

interface FooterLink {
  href: string;
  label: string;
}

const footerLinks = {
  services: [
    { href: "/services/jasa-bangun-rumah", label: "Jasa Bangun Rumah" },
    { href: "/services/jasa-renovasi-rumah", label: "Jasa Renovasi Rumah" },
  ],
  legal: [
    { href: "/privacy", label: "Kebijakan Privasi" },
    { href: "/terms", label: "Syarat & Ketentuan" },
  ],
  company: [
    { href: "/about", label: "Tentang Kami" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Kontak" },
  ],
};

const contactInfo = {
  address: "Jl. Kaliurang KM 8, Yogyakarta",
  email: "info@architextrue.com",
  phone: "+62 812 3456 7890",
  whatsapp: "+62 812 3456 7890",
};

export function Footer() {
  return (
    <footer className="bg-primary text-on-primary w-full mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap container-max mx-auto">
        {/* Brand Section */}
        <div className="md:col-span-1 flex flex-col items-start">
          <span className="font-headline-lg text-headline-lg text-tertiary-fixed mb-stack-md">
            ARCHITEXTRUE
          </span>
          <p className="font-body-md text-body-md text-primary-fixed-dim mt-4">
            Yogyakarta. Konstruksi Hunian Mewah & Terpercaya.
          </p>
          
          {/* WhatsApp CTA */}
          <Button
            variant="outline"
            className="mt-6 border-tertiary-fixed text-tertiary-fixed hover:bg-tertiary-fixed hover:text-on-tertiary-fixed"
            asChild
          >
            <Link 
              href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="mr-2 h-4 w-4" />
              Chat via WhatsApp
            </Link>
          </Button>
        </div>

        {/* Services Links */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <span className="font-label-md text-label-md text-tertiary-fixed font-bold mb-2">
            Layanan
          </span>
          {footerLinks.services.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-primary-fixed-dim hover:text-white hover:text-tertiary-fixed-dim transition-all opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Legal Links */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <span className="font-label-md text-label-md text-tertiary-fixed font-bold mb-2">
            Legal
          </span>
          {footerLinks.legal.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-primary-fixed-dim hover:text-white hover:text-tertiary-fixed-dim transition-all opacity-80 hover:opacity-100"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact Information */}
        <div className="md:col-span-1 flex flex-col gap-3">
          <span className="font-label-md text-label-md text-tertiary-fixed font-bold mb-2">
            Kontak
          </span>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-tertiary-fixed-dim mt-0.5 flex-shrink-0" />
              <p className="font-body-md text-body-md text-primary-fixed-dim opacity-80">
                {contactInfo.address}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-tertiary-fixed-dim flex-shrink-0" />
              <Link
                href={`mailto:${contactInfo.email}`}
                className="font-body-md text-body-md text-primary-fixed-dim opacity-80 hover:text-white hover:opacity-100"
              >
                {contactInfo.email}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-tertiary-fixed-dim flex-shrink-0" />
              <Link
                href={`tel:${contactInfo.phone}`}
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
              © {new Date().getFullYear()} ARCHITEXTRUE Yogyakarta. Konstruksi Hunian Mewah & Terpercaya.
            </p>
            
            {/* Structured Data Attribution */}
            <div className="text-xs text-primary-fixed-dim opacity-60">
              <Link 
                href="https://schema.org/ConstructionBusiness" 
                className="hover:text-tertiary-fixed-dim"
                target="_blank"
                rel="noopener noreferrer"
              >
                ConstructionBusiness Schema
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
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full ambient-shadow-2 hover:scale-105 transition-transform z-50 flex items-center justify-center"
        aria-label="Chat di WhatsApp"
      >
        <Phone className="h-6 w-6" />
      </Link>
    </footer>
  );
}