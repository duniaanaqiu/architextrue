import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/config/company';
import { Button } from "@/components/ui/button";

export function HeroBangunSection() {
  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex justify-center pt-32 md:pt-36 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/home/services1.jpg"
          alt="Konstruksi Bangun Rumah Mewah ARCHITEXTRUE"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        <div className="absolute bottom-0 w-full h-32 md:h-48 bg-gradient-to-t from-background from-15% via-background/60 via-50% to-transparent"></div>
      </div>

      <div className="relative z-10 w-full container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="w-full lg:w-2/3 flex flex-col text-center lg:text-left">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-on-primary leading-tight mb-stack-md drop-shadow-lg">
            Jasa Bangun Rumah Mewah di Yogyakarta
          </h1>

          <p className="text-lg md:text-xl font-body text-surface-container-low mb-stack-lg drop-shadow-md">
            Berhenti mengkhawatirkan over-budget dan kualitas material yang ditukar. ARCHITEXTRUE menghadirkan layanan kontraktor terintegrasi dengan transparansi penuh untuk rumah impian Anda.
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
                Konsultasi Proyek Anda
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-[1.5px] border-on-primary text-on-primary px-8 py-4 rounded-lg hover:bg-on-primary/10 text-center backdrop-blur-sm"
              size="lg"
              asChild
            >
              <Link href="/portfolio" className="flex items-center justify-center gap-2">
                Lihat Kualitas Kami
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
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
