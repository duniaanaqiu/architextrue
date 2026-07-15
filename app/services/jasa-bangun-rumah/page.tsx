import { Metadata } from "next";
import { generateMetadata, generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema, generateLocalBusinessSchema, generateWebPageSchema } from "@/lib/utils";
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

  const serviceSchema = generateServiceSchema({
    name: "Jasa Bangun Rumah Mewah di Yogyakarta",
    description: "Layanan kontraktor profesional untuk pembangunan rumah mewah dari nol dengan material premium dan pengawasan ketat.",
    url: "/services/jasa-bangun-rumah",
    serviceType: "Jasa Bangun Rumah Mewah"
  });

  const localBusinessSchema = generateLocalBusinessSchema();
  const webpageSchema = generateWebPageSchema({
    name: "Jasa Bangun Rumah Mewah di Yogyakarta | ARCHITEXTRUE",
    description: "Layanan kontraktor bangun rumah baru dengan desain eksklusif, struktur kokoh, dan laporan transparan.",
    url: "/services/jasa-bangun-rumah"
  });

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={webpageSchema} />

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
