const processSteps = [
  {
    step: "01",
    title: "Survei & Assessment Struktur",
    description: "Tahap paling krusial. Tim kami akan datang mengukur luasan, mengecek kondisi eksisting, dan melakukan uji kelayakan struktur (apakah kolom/pondasi lama masih sanggup menopang beban baru).",
  },
  {
    step: "02",
    title: "Desain & Perencanaan RAB",
    description: "Arsitek kami merancang layout baru dan 3D visual. Setelah desain disetujui, kami membuat Rencana Anggaran Biaya (RAB) terperinci berdasarkan volume material dan tenaga kerja yang dibutuhkan.",
  },
  {
    step: "03",
    title: "Proteksi & Pembongkaran",
    description: "Sebelum membongkar, kami memasang sekat proteksi agar debu tidak menyebar ke area yang tidak direnovasi. Pembongkaran dilakukan hati-hati agar tidak merusak struktur utama yang dipertahankan.",
  },
  {
    step: "04",
    title: "Konstruksi & Perkuatan",
    description: "Fase pengerjaan sipil, termasuk suntik struktur (jika ada), pemasangan instalasi mekanikal & elektrikal (MEP) baru, hingga pengerjaan finishing interior dan eksterior.",
  },
  {
    step: "05",
    title: "Serah Terima & Garansi",
    description: "Setelah pembersihan akhir (deep cleaning) dan inspeksi mutu (quality control) bersama klien, kami melakukan serah terima kunci dilengkapi dengan masa garansi pemeliharaan.",
  },
];

export function ProcessRenovasiSection() {
  return (
    <section className="py-20 bg-background text-on-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
            Alur Kerja Renovasi Transparan
          </h2>
          <p className="text-lg font-body text-on-background/80 max-w-2xl mx-auto">
            Proses sistematis untuk memastikan proyek renovasi Anda selesai tepat waktu, tepat anggaran, dan berkualitas tinggi.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connecting steps on large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2"></div>

          <div className="space-y-12 lg:space-y-0 relative">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex flex-col lg:flex-row items-center lg:mb-16 last:mb-0">
                  {/* Left or Right content */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 text-left lg:ml-auto'}`}>
                    <div className="bg-surface-container p-6 rounded-2xl border border-on-surface/5 relative z-10 ambient-shadow-1">
                      <div className="text-sm font-bold text-tertiary mb-2">TAHAP {step.step}</div>
                      <h3 className="text-xl font-display font-semibold text-on-surface mb-3">
                        {step.title}
                      </h3>
                      <p className="text-on-surface-variant font-body leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node (Number) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary border-4 border-background items-center justify-center z-20 shadow-lg">
                    <span className="text-on-primary font-display font-bold text-xl">{step.step}</span>
                  </div>
                  
                  {/* Mobile Number Indicator */}
                  <div className="lg:hidden flex absolute -top-4 left-4 w-10 h-10 rounded-full bg-primary border-4 border-background items-center justify-center z-20">
                    <span className="text-on-primary font-display font-bold text-sm">{step.step}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
