import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from '@/config/company';

export function PricingRenovasiSection() {
  return (
    <section className="py-20 bg-background text-on-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="bg-surface-container rounded-3xl p-8 md:p-12 border border-primary/10 ambient-shadow-lg text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-body font-bold text-primary tracking-wider uppercase">
              Transparansi Biaya
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-primary mb-6">
            RAB Detail, Tanpa Biaya Tersembunyi
          </h2>
          
          <p className="text-lg md:text-xl font-body text-on-surface-variant mb-12 max-w-3xl mx-auto leading-relaxed">
            Berbeda dengan bangun baru yang bisa diestimasi per meter persegi, renovasi memiliki variabel yang sangat dinamis tergantung kondisi eksisting. Kami menolak sistem borongan buta demi melindungi anggaran Anda.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background rounded-2xl p-6 text-center border border-on-surface/5">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/assets/images/layout/survey.svg" alt="Survei Lokasi" width={24} height={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-on-surface mb-2">Survei Lokasi</h3>
              <p className="text-sm text-on-surface-variant">Penilaian kondisi struktur dan pengukuran luasan area.</p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 text-center border border-on-surface/5">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/assets/images/layout/rab.svg" alt="Perhitungan RAB" width={24} height={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-on-surface mb-2">Perhitungan RAB</h3>
              <p className="text-sm text-on-surface-variant">Rincian volume bongkaran, material, dan upah tenaga kerja.</p>
            </div>
            
            <div className="bg-background rounded-2xl p-6 text-center border border-on-surface/5">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Image src="/assets/images/layout/pembayaran.svg" alt="Kesepakatan Harga" width={24} height={24} className="text-primary" />
              </div>
              <h3 className="font-semibold text-on-surface mb-2">Kesepakatan Harga</h3>
              <p className="text-sm text-on-surface-variant">Harga pasti yang mengikat di dalam kontrak kerja tertulis.</p>
            </div>
          </div>

          <Button size="lg" asChild className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-6 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-auto whitespace-normal">
            <Link href={`https://wa.me/${WHATSAPP_NUMBER}`}>
              Jadwalkan Survei Gratis Sekarang
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
