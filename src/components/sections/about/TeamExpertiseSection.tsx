import Image from "next/image";

export function TeamExpertiseSection() {
  return (
    <section className="py-10 md:py-16 overflow-hidden bg-background">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
              Di Balik Setiap Mahakarya
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
              ARCHITEXTRUE didukung oleh tim profesional dengan pengalaman lebih dari 15 tahun dalam industri konstruksi hunian premium. 
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-10">
              Setiap anggota tim kami adalah spesialis di bidangnya masing-masing—mulai dari arsitek visioner, insinyur struktur yang cermat, hingga seniman <i>finishing</i> yang berdedikasi. Kami bekerja dalam orkestrasi yang sempurna untuk memastikan tidak ada satu detail pun yang terlewat.
            </p>
            
            {/* Stats/Highlight */}
            <div className="flex gap-8 border-t border-surface-container-low/20 pt-8">
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">15+</div>
                <div className="text-sm font-label-md text-on-surface-variant uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
              <div className="w-px bg-surface-container-low/20"></div>
              <div>
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">50+</div>
                <div className="text-sm font-label-md text-on-surface-variant uppercase tracking-wider">Pakar Tersertifikasi</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            {/* Main Image Container - Arch shape */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-t-full rounded-b-2xl overflow-hidden ambient-shadow-2 border-[8px] border-surface">
              <Image 
                src="/assets/images/about/tim.jpg"
                alt="Tim Ahli ARCHITEXTRUE"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[110%] aspect-square bg-primary/5 rounded-full -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
