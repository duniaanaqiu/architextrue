"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center pt-20 mb-section-gap">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="bg-cover bg-center w-full h-full bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAAw_n3PyggfoncFJq36EKrcq69FIJJIEcaMS6TrSjec96eyJlby5fjWdw1yn6KgsnBd8TSNE7sGRagXP3Uip8mFhJqFMhs9AHP1rO9sjrVob7S5pmr9C8O8e6ntLXMogKfL6I4kp7WwB-q4Fc7TJQvTRAITLQkvIqhtWch30EfIO1O0Px5VyDu1YRfOSEYHgaHFKXVIfoaZIhle5EWj_udVnFcCV6yEg3IvQALJEi63D8OWvVFxS5jyg')]">
          {/* Image alt text for accessibility */}
          <span className="sr-only">
            A breathtaking, wide-angle architectural photograph of a luxurious modern tropical home in Indonesia during golden hour. The design features expansive glass walls, natural timber cladding, and a sleek flat roof, blending seamlessly with lush tropical landscaping.
          </span>
        </div>
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container-max mx-auto px-margin-mobile md:px-margin-desktop text-center md:text-left flex flex-col md:w-2/3 lg:w-1/2 md:mr-auto">
        <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-primary mb-stack-md drop-shadow-lg">
          Bangun Hunian Impian Anda di Yogyakarta Bersama Ahlinya
        </h1>
        
        <p className="font-body-lg text-body-lg text-surface-container-low mb-stack-lg drop-shadow-md">
          Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Button 
            variant="tertiary" 
            className="px-8 py-4 rounded-lg ambient-shadow-2 text-center"
            size="lg"
            asChild
          >
            <Link href="/contact">
              Konsultasi Gratis
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="border-[1.5px] border-on-primary text-on-primary px-8 py-4 rounded-lg hover:bg-on-primary/10 text-center backdrop-blur-sm"
            size="lg"
            asChild
          >
            <Link href="/portfolio">
              Lihat Portfolio
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-on-primary">50+</div>
            <div className="text-sm text-surface-container-low mt-1">Proyek Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-on-primary">15+</div>
            <div className="text-sm text-surface-container-low mt-1">Tahun Pengalaman</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-on-primary">100%</div>
            <div className="text-sm text-surface-container-low mt-1">Klien Puas</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
        <div className="animate-bounce">
          <ChevronRight className="h-6 w-6 text-on-primary rotate-90" />
        </div>
      </div>
    </section>
  );
}