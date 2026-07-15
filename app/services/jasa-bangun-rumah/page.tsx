import { Metadata } from "next";
import { generateMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/utils";
import { StructuredData } from "@/components/shared/StructuredData";
import { faqBangun } from "@/lib/data/faqBangun";

import { HeroBangunSection } from "@/components/sections/jasa-bangun-rumah/HeroBangunSection";
import { BenefitSection } from "@/components/sections/jasa-bangun-rumah/BenefitSection";
import { ScopeSection } from "@/components/sections/jasa-bangun-rumah/ScopeSection";
import { PricingModelSection } from "@/components/sections/jasa-bangun-rumah/PricingModelSection";
import { ProcessBangunSection } from "@/components/sections/jasa-bangun-rumah/ProcessBangunSection";
import { FeaturedProjectsSection } from "@/components/sections/jasa-bangun-rumah/FeaturedProjectsSection";
import { FAQSection } from "@/components/sections/shared/FAQSection";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = generateMetadata({
  title: "Jasa Bangun Rumah Mewah di Yogyakarta | ARCHITEXTRUE",
  description: "Wujudkan rumah mewah impian Anda dari nol bersama ARCHITEXTRUE. Layanan kontraktor bangun rumah premium dengan RAB transparan dan garansi struktur.",
  path: "/services/jasa-bangun-rumah",
});

export default function JasaBangunRumahPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/#layanan" },
    { name: "Jasa Bangun Rumah", href: "/services/jasa-bangun-rumah" },
  ]);

  const faqSchema = generateFAQSchema(faqBangun);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Jasa Bangun Rumah Mewah",
    "name": "Jasa Bangun Rumah Mewah di Yogyakarta",
    "description": "Layanan kontraktor profesional untuk pembangunan rumah mewah dari nol dengan material premium dan pengawasan ketat.",
    "provider": {
      "@type": "ConstructionBusiness",
      "name": "ARCHITEXTRUE",
      "url": "https://architextrue.com",
    },
    "areaServed": {
      "@type": "State",
      "name": "Yogyakarta",
    },
    "url": "https://architextrue.com/services/jasa-bangun-rumah",
    "offers": {
      "@type": "Offer",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "IDR",
        "minPrice": "5000000",
        "description": "Estimasi per meter persegi. Harga menyesuaikan kompleksitas desain dan spesifikasi material.",
      }
    }
  };

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />

      <main>
        <HeroBangunSection />
        <BenefitSection />
        <ScopeSection />
        <PricingModelSection />
        <ProcessBangunSection />
        <FeaturedProjectsSection />
        <FAQSection data={faqBangun} />
        <CTASection />
      </main>
    </>
  );
}
