import { HeroRenovasiSection } from "@/components/sections/jasa-renovasi-rumah/HeroRenovasiSection";
import { BenefitRenovasiSection } from "@/components/sections/jasa-renovasi-rumah/BenefitRenovasiSection";
import { ScopeRenovasiSection } from "@/components/sections/jasa-renovasi-rumah/ScopeRenovasiSection";
import { BeforeAfterSection } from "@/components/sections/jasa-renovasi-rumah/BeforeAfterSection";
import { PricingRenovasiSection } from "@/components/sections/jasa-renovasi-rumah/PricingRenovasiSection";
import { ProcessRenovasiSection } from "@/components/sections/jasa-renovasi-rumah/ProcessRenovasiSection";
import { FAQSection } from "@/components/sections/shared/FAQSection";
import { CTASection } from "@/components/sections/shared/CTASection";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema, generateLocalBusinessSchema, generateWebPageSchema } from "@/lib/utils";
import { faqRenovasi } from "@/lib/data/faqRenovasi";

export const metadata = {
  title: "Jasa Renovasi Rumah Mewah & Eksklusif di Yogyakarta | ARCHITEXTRUE",
  description: "Transformasi hunian lama Anda menjadi mahakarya baru. Layanan renovasi rumah mewah, fasad, hingga penambahan lantai dengan assessment struktur menyeluruh.",
};

export default function JasaRenovasiRumahPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "/#layanan" },
    { name: "Jasa Renovasi Rumah", href: "/services/jasa-renovasi-rumah" },
  ]);

  const faqSchema = generateFAQSchema(faqRenovasi);

  const serviceSchema = generateServiceSchema({
    name: "Jasa Renovasi Rumah Mewah di Yogyakarta",
    description: "Layanan kontraktor profesional untuk perombakan total, penambahan lantai, dan transformasi fasad rumah mewah.",
    url: "/services/jasa-renovasi-rumah",
    serviceType: "Jasa Renovasi Rumah Mewah"
  });

  const localBusinessSchema = generateLocalBusinessSchema();
  
  const webpageSchema = generateWebPageSchema({
    name: "Jasa Renovasi Rumah Mewah & Eksklusif di Yogyakarta | ARCHITEXTRUE",
    description: "Transformasi hunian lama Anda menjadi mahakarya baru. Layanan renovasi rumah mewah, fasad, hingga penambahan lantai dengan assessment struktur menyeluruh.",
    url: "/services/jasa-renovasi-rumah"
  });

  return (
    <main className="flex min-h-screen flex-col">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={serviceSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={webpageSchema} />
      
      <HeroRenovasiSection />
      <BenefitRenovasiSection />
      <ScopeRenovasiSection />
      <BeforeAfterSection />
      <ProcessRenovasiSection />
      <PricingRenovasiSection />
      <FAQSection title="Pertanyaan Seputar Renovasi" data={faqRenovasi} />
      <CTASection />
    </main>
  );
}
