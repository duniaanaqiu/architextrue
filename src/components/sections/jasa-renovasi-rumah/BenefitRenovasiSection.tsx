import Image from 'next/image';

const benefits = [
  {
    title: "Inspeksi Struktur Menyeluruh",
    description: "Kami tidak asal bongkar. Sebelum renovasi dimulai, tim struktur kami akan mengevaluasi kelayakan pondasi dan kolom eksisting untuk memastikan keamanan bangunan Anda.",
    icon: "/assets/images/layout/inspeksi.svg",
  },
  {
    title: "Manajemen Proyek Bersih",
    description: "Khawatir renovasi parsial membuat seisi rumah kotor? Kami mengisolasi area kerja dengan sekat proteksi standar tinggi, meminimalisir debu dan gangguan aktivitas keluarga.",
    icon: "/assets/images/layout/manajemen.svg",
  },
  {
    title: "RAB Pasti, Tanpa Kejutan",
    description: "Banyak pemborong sengaja menekan harga awal lalu menaikkannya di tengah proyek. Kami memberikan Rencana Anggaran Biaya (RAB) yang akurat setelah survei untuk menghindari over-budget.",
    icon: "/assets/images/layout/rab1.svg",
  },
];

export function BenefitRenovasiSection() {
  return (
    <section className="py-20 bg-background text-on-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
            Mengapa Renovasi Bersama Ahlinya?
          </h2>
          <p className="text-lg font-body text-on-background/80 max-w-2xl mx-auto">
            Renovasi lebih berisiko dibandingkan bangun baru. Jangan pertaruhkan struktur dan kenyamanan Anda dengan pengerjaan amatir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-surface-container rounded-2xl p-8 border border-on-surface/5 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Image src={benefit.icon} alt={benefit.title} width={28} height={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-on-surface mb-3">
                {benefit.title}
              </h3>
              <p className="text-on-surface-variant font-body leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
