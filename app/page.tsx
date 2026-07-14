import { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroductionSection } from "@/components/sections/home/IntroductionSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateMetadata, generateLocalBusinessSchema, generateBreadcrumbSchema } from "@/lib/utils";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa itu ARCHITEXTRUE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ARCHITEXTRUE adalah kontraktor spesialis rumah mewah berbasis di Yogyakarta yang menyediakan jasa bangun rumah dan renovasi rumah dengan kualitas terbaik dan proses transparan."
        }
      },
      {
        "@type": "Question",
        "name": "Di mana lokasi layanan ARCHITEXTRUE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Kami melayani seluruh wilayah Yogyakarta dan sekitarnya dengan fokus pada proyek hunian mewah dan berkualitas tinggi."
        }
      },
      {
        "@type": "Question",
        "name": "Bagaimana cara konsultasi dengan ARCHITEXTRUE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anda dapat menghubungi kami melalui WhatsApp di +62 812 1000 4453 atau mengisi formulir konsultasi gratis di website kami."
        }
      },
    ],
  };

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
      </main>
    </>
  );
}