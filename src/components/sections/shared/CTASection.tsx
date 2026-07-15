import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_NUMBER } from '@/config/company';

export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-surface-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <h2 className="text-3xl md:text-5xl font-display font-semibold text-primary mb-6">
          Wujudkan Rumah Mewah Impian Anda
        </h2>
        <p className="text-lg md:text-xl font-body text-on-surface-variant mb-10 max-w-3xl mx-auto">
          Konsultasikan ide Anda bersama tim arsitek dan kontraktor ahli kami. Kami siap memberikan solusi terbaik dengan kualitas premium dan proses transparan.
        </p>

        <div className="flex justify-center items-center">
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary hover:bg-primary/90 transition-colors duration-300 font-medium font-body rounded-full shadow-lg flex items-center justify-center gap-3"
          >
            <Image src="/assets/images/layout/wa.svg" alt="WhatsApp" width={24} height={24} />
            Hubungi Kami
          </Link>
        </div>
      </div>
    </section>
  );
}
