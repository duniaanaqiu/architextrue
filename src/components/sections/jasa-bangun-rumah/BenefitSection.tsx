

const benefits = [
  {
    icon: "request_quote",
    title: "100% Transparansi RAB",
    description: "Tidak ada biaya tersembunyi. Semua material dan harga dibreakdown secara detail dalam Rencana Anggaran Biaya sebelum konstruksi dimulai."
  },
  {
    icon: "verified",
    title: "Jaminan Kualitas Material",
    description: "Kami bekerja sama dengan supplier terpercaya. Apa yang tertulis di spesifikasi kontrak, itulah yang akan dipasang di rumah Anda."
  },
  {
    icon: "engineering",
    title: "Pengawasan Ketat Ahli",
    description: "Setiap tahap pembangunan diawasi oleh site manager dan engineer profesional untuk memastikan standar struktural terpenuhi."
  },
  {
    icon: "gavel",
    title: "Garansi Pemeliharaan",
    description: "Kami tidak lari setelah serah terima. Ada masa retensi (garansi) untuk memastikan bangunan sempurna tanpa cacat."
  }
];

export function BenefitSection() {
  return (
    <section className="py-20 bg-surface-container">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg font-body text-on-surface-variant max-w-2xl mx-auto">
            Membangun rumah mewah adalah investasi besar. Jangan pertaruhkan dengan kontraktor abal-abal. Ini adalah komitmen kami untuk Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-surface p-8 rounded-2xl shadow-sm border border-on-surface/5 hover:border-primary/20 transition-colors duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <span className="material-symbols-outlined text-3xl">{benefit.icon}</span>
              </div>
              <h3 className="text-xl font-display font-medium text-on-surface mb-3">
                {benefit.title}
              </h3>
              <p className="text-base font-body text-on-surface-variant leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
