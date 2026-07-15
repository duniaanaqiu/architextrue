import { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroductionSection } from "@/components/sections/home/IntroductionSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { FAQSection } from "@/components/sections/shared/FAQSection";
import { CTASection } from "@/components/sections/shared/CTASection";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateMetadata, generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/utils";
import { faqHome } from "@/lib/data/faq";

export const metadata: Metadata = generateMetadata({
  title: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
  description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta. Jasa bangun rumah dan renovasi rumah premium.",
  path: "/",
});

export default function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", href: "/" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
    "description": "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
    "url": "https://architextrue.com",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Beranda",
          "item": "https://architextrue.com",
        },
      ],
    },
  };

  const faqSchema = generateFAQSchema(faqHome);

  return (
    <>
      {/* Structured Data Components */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={webpageSchema} />
      <StructuredData data={faqSchema} />

      <main>
        <HeroSection />
        <IntroductionSection />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <FAQSection data={faqHome} />
        <CTASection />
      </main>
    </>
  );
}