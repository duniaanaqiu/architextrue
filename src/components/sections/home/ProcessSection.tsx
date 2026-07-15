

const processSteps = [
  {
    id: "01",
    title: "Konsultasi & Ideasi",
    description: "Diskusi mendalam tentang visi, kebutuhan ruang, dan anggaran untuk rumah impian Anda."
  },
  {
    id: "02",
    title: "Desain Arsitektur",
    description: "Pembuatan konsep desain komprehensif, dari denah 2D hingga visualisasi 3D fotorealistik."
  },
  {
    id: "03",
    title: "Perencanaan Teknis",
    description: "Penyusunan RAB detail, gambar kerja struktur, MEP, dan pengurusan perizinan."
  },
  {
    id: "04",
    title: "Konstruksi & Build",
    description: "Pelaksanaan pembangunan dengan material premium dan pengawasan ketat oleh tim ahli."
  },
  {
    id: "05",
    title: "Serah Terima",
    description: "Inspeksi akhir bersama dan penyerahan kunci beserta garansi pemeliharaan."
  }
];

export function ProcessSection() {
  return (
    <section className="py-16 md:py-20 bg-surface text-on-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Proses Kerja Kami
          </h2>
          <p className="text-on-surface/80 max-w-2xl mx-auto font-body">
            Transparan, terstruktur, dan berorientasi pada detail. Kami memastikan setiap tahap pembangunan rumah mewah Anda berjalan lancar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Line connector for large screens */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[1px] bg-primary/20" />
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center text-2xl font-display text-primary bg-background z-10 mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  {step.id}
                </div>
                <h3 className="text-xl font-display font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-on-surface/70">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
