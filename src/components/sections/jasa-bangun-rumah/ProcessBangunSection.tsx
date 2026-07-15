

const buildProcessSteps = [
  {
    id: "01",
    title: "Survei & Analisis Tapak",
    description: "Pengukuran kontur tanah, pengecekan kondisi lingkungan, dan analisis tata letak untuk mengoptimalkan pencahayaan dan sirkulasi udara alami."
  },
  {
    id: "02",
    title: "Desain Arsitektur & RAB",
    description: "Pembuatan konsep desain komprehensif (3D visualisasi) dilanjutkan dengan perhitungan RAB detail berdasarkan volume pekerjaan dan spesifikasi material."
  },
  {
    id: "03",
    title: "Legalitas & Persiapan",
    description: "Proses pengurusan IMB/PBG, pembuatan jadwal proyek (Kurva S), dan mobilisasi alat kerja serta material awal ke lokasi proyek."
  },
  {
    id: "04",
    title: "Konstruksi & Opname",
    description: "Pelaksanaan pembangunan dengan kontrol kualitas ketat. Penagihan termin dilakukan secara berkala berdasarkan berita acara opname progres di lapangan."
  },
  {
    id: "05",
    title: "Handover & Retensi",
    description: "Inspeksi akhir bersama (defects liability period) diikuti serah terima kunci. Kami memberikan jaminan pemeliharaan (masa retensi) pasca serah terima."
  }
];

export function ProcessBangunSection() {
  return (
    <section className="py-16 md:py-20 bg-background text-on-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4 text-primary">
            Alur Kerja Pembangunan
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-body">
            Setiap proyek dikelola dengan manajemen yang terstruktur untuk memastikan ketepatan waktu, efisiensi biaya, dan kualitas maksimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {buildProcessSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Line connector for large screens */}
              {index < buildProcessSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-full h-[1px] bg-primary/20" />
              )}
              
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full border-2 border-primary/20 flex items-center justify-center text-2xl font-display text-primary bg-background z-10 mb-6 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                  {step.id}
                </div>
                <h3 className="text-xl font-display font-medium mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-body text-on-surface-variant">
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
