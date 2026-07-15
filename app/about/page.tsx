import { Metadata } from "next";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateMetadata, generateBreadcrumbSchema, generateLocalBusinessSchema, generateWebPageSchema } from "@/lib/utils";

import { HeroAboutSection } from "@/components/sections/about/HeroAboutSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { TeamExpertiseSection } from "@/components/sections/about/TeamExpertiseSection";
import { CTASection } from "@/components/sections/shared/CTASection";

export const metadata: Metadata = generateMetadata({
  title: "Tentang Kami - ARCHITEXTRUE",
  description: "Kenali lebih dalam tentang ARCHITEXTRUE, kontraktor spesialis rumah mewah di Yogyakarta dengan dedikasi pada kualitas sejati.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const webpageSchema = generateWebPageSchema({
    name: "Tentang ARCHITEXTRUE",
    description: "Kontraktor spesialis rumah mewah di Yogyakarta dengan pengalaman lebih dari 15 tahun dalam membangun hunian premium.",
    url: "/about"
  });

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Tentang ARCHITEXTRUE",
    "description": "Kontraktor spesialis rumah mewah di Yogyakarta dengan pengalaman lebih dari 15 tahun dalam membangun hunian premium.",
    "url": "https://architextrue.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ARCHITEXTRUE",
      "description": "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": "Tim ARCHITEXTRUE"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "50+"
      },
      "location": {
        "@type": "Place",
        "name": "Yogyakarta, Indonesia"
      }
    }
  };

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={webpageSchema} />
      <StructuredData data={aboutPageSchema} />

      <main className="min-h-screen bg-background">
        <HeroAboutSection />
        <StorySection />
        <ValuesSection />
        <TeamExpertiseSection />
        <CTASection />
      </main>
    </>
  );
}