import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/config/company';

export function HeroBangunSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-24 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/home/services1.jpg"
          alt="Konstruksi Bangun Rumah Mewah ARCHITEXTRUE"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/60 via-50% to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl">

          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-on-background leading-tight mb-6">
            Wujudkan Rumah Mewah dari Nol.
          </h1>
          
          <p className="text-lg md:text-xl font-body text-on-background/80 mb-10 max-w-2xl leading-relaxed">
            Berhenti mengkhawatirkan over-budget dan kualitas material yang ditukar. ARCHITEXTRUE menghadirkan layanan kontraktor terintegrasi dengan transparansi penuh untuk rumah impian Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-primary text-on-primary hover:bg-primary/90 transition-colors duration-300 font-medium font-body rounded-lg shadow-lg flex items-center justify-center gap-3"
            >
              <Image src="/assets/images/layout/wa.svg" alt="WhatsApp" width={24} height={24} />
              Konsultasi Proyek Anda
            </Link>
            
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-surface-container border border-on-surface/10 text-on-surface hover:bg-surface-container-high transition-colors duration-300 font-medium font-body rounded-lg flex items-center justify-center gap-2"
            >
              Lihat Kualitas Kami
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
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
