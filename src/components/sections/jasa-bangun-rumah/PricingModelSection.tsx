import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function PricingModelSection() {
  return (
    <section className="py-20 bg-surface-container text-on-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="bg-primary text-on-primary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
                Estimasi Biaya Transparan
              </h2>
              <p className="text-lg font-body text-on-primary/80 mb-6">
                Investasi untuk kenyamanan jangka panjang. Biaya pembangunan disesuaikan dengan tingkat kerumitan desain dan pilihan material premium Anda.
              </p>
              
              <div className="bg-white/10 p-6 rounded-xl border border-white/20 inline-block text-left">
                <span className="block text-sm font-body text-on-primary/70 uppercase tracking-wider mb-1">
                  Mulai Dari
                </span>
                <span className="block text-3xl font-display font-bold text-white mb-1">
                  Rp 5.000.000 <span className="text-xl font-normal text-white/70">/ m²</span>
                </span>
                <span className="block text-xs font-body text-white/50">
                  *Harga estimasi. RAB pasti dihitung setelah desain disetujui.
                </span>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Image src="/assets/images/layout/rab.svg" alt="RAB" width={20} height={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-medium mb-2">RAB Terperinci</h4>
                  <p className="text-sm font-body text-on-primary/70">
                    Anda akan menerima dokumen Rencana Anggaran Biaya (RAB) yang menjabarkan setiap paku, semen, hingga material finishing secara detail sebelum kontrak ditandatangani.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Image src="/assets/images/layout/pembayaran.svg" alt="Pembayaran" width={20} height={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-display font-medium mb-2">Pembayaran Termin Berbasis Progres</h4>
                  <p className="text-sm font-body text-on-primary/70">
                    Sistem pembayaran yang aman bagi Anda. Tagihan (termin) hanya dikeluarkan berdasarkan progres pekerjaan riil di lapangan (opname) yang telah Anda setujui.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/konsultasi" className="text-white hover:text-white/80 font-body font-medium flex items-center gap-2 transition-colors">
                  Simulasikan biaya proyek Anda sekarang 
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
