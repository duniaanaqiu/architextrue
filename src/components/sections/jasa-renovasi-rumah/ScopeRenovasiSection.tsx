import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const scopes = [
  {
    title: "Renovasi Fasad & Tampilan",
    description: "Ubah total wajah hunian Anda. Dari desain lama yang membosankan menjadi fasad modern tropis, minimalis, atau klasik elegan tanpa harus merobohkan struktur utama.",
    image: "/assets/images/jasa-renovasi-rumah/renovasi-fasad.jpg",
  },
  {
    title: "Suntik Struktur & Penambahan Lantai",
    description: "Keluarga bertambah tapi lahan terbatas? Kami melayani penambahan ruang secara vertikal dengan penguatan pondasi (suntik struktur) yang dijamin aman dan kokoh.",
    image: "/assets/images/jasa-renovasi-rumah/suntik-struktur.jpg",
  },
  {
    title: "Renovasi Total (Major Makeover)",
    description: "Perombakan layout besar-besaran. Mengubah susunan denah, membongkar dinding untuk open-space, hingga pembaharuan seluruh instalasi MEP (plumbing & kelistrikan).",
    image: "/assets/images/jasa-renovasi-rumah/renovasi-total.jpg",
  },
];

export function ScopeRenovasiSection() {
  return (
    <section className="py-20 bg-surface-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
            Ruang Lingkup Renovasi Kami
          </h2>
          <p className="text-lg font-body text-on-surface-variant max-w-3xl mx-auto">
            Spesialisasi kami adalah perombakan skala menengah hingga besar yang membutuhkan presisi arsitektural dan perhitungan struktur.
          </p>
        </div>

        <div className="space-y-12">
          {scopes.map((scope, index) => (
            <div
              key={index}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ambient-shadow-2">
                  <Image
                    src={scope.image}
                    alt={scope.title}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col justify-center px-4 md:px-8">
                <h3 className="text-2xl md:text-3xl font-display font-semibold text-on-surface mb-4">
                  {scope.title}
                </h3>
                <p className="text-on-surface-variant font-body leading-relaxed text-lg mb-6">
                  {scope.description}
                </p>
                <Button variant="outline" asChild className="self-start border-[1.5px] border-primary text-primary hover:bg-primary hover:text-on-primary">
                  <Link href="/portfolio">
                    Lihat Hasil Kerja Kami
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
