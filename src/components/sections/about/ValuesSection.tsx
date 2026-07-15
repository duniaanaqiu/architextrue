import { ShieldCheck, Scale, Lightbulb } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      title: "Kualitas",
      description: "Tidak ada kompromi untuk kualitas. Kami menyeleksi material premium dan menerapkan standar Quality Control yang ketat di setiap detail pengerjaan.",
      icon: <ShieldCheck className="w-8 h-8 text-primary" />
    },
    {
      title: "Integritas",
      description: "Transparansi penuh dalam proses operasional, pelaporan, dan komunikasi keuangan dengan klien tanpa ada biaya tersembunyi.",
      icon: <Scale className="w-8 h-8 text-primary" />
    },
    {
      title: "Inovasi",
      description: "Terus mengadopsi perkembangan terbaru dalam teknologi konstruksi dan tata ruang untuk menghasilkan hunian yang fungsional dan tak lekang oleh waktu.",
      icon: <Lightbulb className="w-8 h-8 text-primary" />
    }
  ];

  return (
    <section className="py-10 md:py-16 bg-surface relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      
      <div className="relative z-10 container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Nilai-nilai Fundamental</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Tiga pilar utama yang menjiwai setiap keputusan dan tindakan kami dalam mewujudkan mahakarya arsitektur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, idx) => (
            <div 
              key={idx}
              className="bg-background rounded-2xl p-8 lg:p-10 ambient-shadow-1 hover:ambient-shadow-lg transition-all duration-500 hover:-translate-y-2 border border-surface-container-low/30 group"
            >
              <div className="bg-primary/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                {value.icon}
              </div>
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                {value.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
