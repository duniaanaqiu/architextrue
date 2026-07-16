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
      <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-primary via-[#0f172a] to-primary text-on-primary overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
        </div>

        <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 animate-in slide-in-from-bottom-8 duration-700">
            Apa Kata Klien Kami
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-body max-w-3xl mx-auto animate-in slide-in-from-bottom-8 duration-700 delay-100">
            Kepercayaan adalah fondasi dari setiap proyek yang kami kerjakan. Simak pengalaman mereka yang telah mewujudkan hunian impian bersama ARCHITEXTRUE.
          </p>
        </div>
      </section>

      <TestimonialsGrid testimonials={testimonials} />
      
      <CTASection />
    </main>
  );
}
