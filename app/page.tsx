import { Metadata } from "next";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { IntroductionSection } from "@/components/sections/home/IntroductionSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { FAQSection } from "@/components/sections/shared/FAQSection";
import { CTASection } from "@/components/sections/shared/CTASection";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateMetadata, generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema, generateWebPageSchema } from "@/lib/utils";
import { faqHome } from "@/lib/data/faq";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = generateMetadata({
  title: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
  description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta. Jasa bangun rumah dan renovasi rumah premium.",
  path: "/",
});

export default async function HomePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", href: "/" },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();

  const webpageSchema = generateWebPageSchema({
    name: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
    description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
    url: "/"
  });

  const faqSchema = generateFAQSchema(faqHome);

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

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
        <TestimonialsSection testimonials={testimonials} />
        <FAQSection data={faqHome} />
        <CTASection />
      </main>
    </>
  );
}