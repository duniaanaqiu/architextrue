"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/config/company";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex justify-center pt-32 md:pt-36 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/home/bg-hero-home.jpg"
          alt="A breathtaking, wide-angle architectural photograph of a luxurious modern tropical home in Indonesia during golden hour. The design features expansive glass walls, natural timber cladding, and a sleek flat roof, blending seamlessly with lush tropical landscaping."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute bottom-0 w-full h-32 md:h-48 bg-gradient-to-t from-background from-15% via-background/60 via-50% to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">

        {/* Left Column: Text & CTA */}
        <div className="w-full lg:w-1/2 flex flex-col text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight text-on-primary mb-stack-md drop-shadow-lg">
            Bangun Hunian Impian Anda di Yogyakarta Bersama Ahlinya
          </h1>

          <p className="text-lg md:text-xl font-body text-surface-container-low mb-stack-lg drop-shadow-md">
            Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              variant="tertiary"
              className="px-8 py-4 rounded-lg ambient-shadow-2 text-center"
              size="lg"
              asChild
            >
              <Link href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                <Image src="/assets/images/layout/wa.svg" alt="WhatsApp" width={24} height={24} />
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
        </div>

        {/* Right Column: Trust Indicators Grid */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="text-center bg-white/5 backdrop-blur-md border border-white/20 px-4 py-6 rounded-2xl ambient-shadow-lg flex flex-col justify-center transition-transform hover:-translate-y-1 hover:bg-white/10">
              <div className="text-4xl font-bold text-on-primary drop-shadow-md">50+</div>
              <div className="text-sm text-on-primary/90 mt-2 font-medium">Proyek Selesai</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-md border border-white/20 px-4 py-6 rounded-2xl ambient-shadow-lg flex flex-col justify-center transition-transform hover:-translate-y-1 hover:bg-white/10">
              <div className="text-4xl font-bold text-on-primary drop-shadow-md">15+</div>
              <div className="text-sm text-on-primary/90 mt-2 font-medium">Tahun Pengalaman</div>
            </div>
            {/* The 3rd indicator spans 2 columns */}
            <div className="col-span-2 text-center bg-white/5 backdrop-blur-md border border-white/20 px-6 py-6 rounded-2xl ambient-shadow-lg flex flex-col sm:flex-row items-center justify-center gap-3 transition-transform hover:-translate-y-1 hover:bg-white/10">
              <div className="text-4xl font-bold text-on-primary drop-shadow-md">100%</div>
              <div className="text-sm sm:text-base text-on-primary/90 font-medium text-center sm:text-left">Klien Puas dengan Hasil Karya Kami</div>
            </div>
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