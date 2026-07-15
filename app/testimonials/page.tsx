import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { TestimonialsGrid } from "@/components/sections/testimonials/TestimonialsGrid";
import { CTASection } from "@/components/sections/shared/CTASection";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateMetadata, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = generateMetadata({
  title: "Testimonial Klien | ARCHITEXTRUE - Bukti Kepuasan Layanan Kami",
  description: "Baca pengalaman jujur dan testimoni klien kami yang telah mempercayakan pembangunan serta renovasi rumah mewah mereka kepada ARCHITEXTRUE.",
  path: "/testimonials",
});

export default async function TestimonialsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Testimonials", href: "/testimonials" },
  ]);

  const webpageSchema = generateWebPageSchema({
    name: "Testimonial Klien - ARCHITEXTRUE",
    description: "Baca pengalaman jujur dan testimoni klien kami yang telah mempercayakan pembangunan serta renovasi rumah mewah mereka kepada ARCHITEXTRUE.",
    url: "/testimonials"
  });

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webpageSchema} />

      {/* Hero Section */}
      <section className="w-full bg-surface-container pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6 animate-in slide-in-from-bottom-8 duration-700">
            Apa Kata Klien Kami
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Kepercayaan adalah fondasi dari setiap proyek yang kami kerjakan. Simak pengalaman mereka yang telah mewujudkan hunian impian bersama ARCHITEXTRUE.
          </p>
        </div>
      </section>

      <TestimonialsGrid testimonials={testimonials} />
      
      <CTASection />
    </main>
  );
}
