import Image from "next/image";

export function StorySection() {
  return (
    <section className="py-10 md:py-16 overflow-hidden bg-background">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden ambient-shadow-2">
              <Image
                src="/assets/images/about/kantor-architextrue.jpg"
                alt="Kantor Pusat ARCHITEXTRUE"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle tint overlay to make it look premium */}
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>

            {/* Premium blurred decorative glows */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-tertiary-container/30 rounded-full blur-[60px] -z-10"></div>
            <div className="absolute -top-8 -left-8 w-64 h-64 bg-primary/10 rounded-full blur-[60px] -z-10"></div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-8 lg:mb-12">
              Fondasi Sebuah Kepercayaan
            </h2>

            <div className="flex flex-col gap-8">
              {/* Visi */}
              <div className="relative pl-6 border-l-2 border-primary">
                <h3 className="text-2xl font-display font-bold text-primary mb-3">Visi Kami</h3>
                <p className="text-lg font-body text-on-surface-variant leading-relaxed">
                  Menjadi kontraktor terdepan dalam pembangunan hunian mewah di Yogyakarta yang diakui atas inovasi, integritas tak tertandingi, dan standar kualitas pengerjaan kelas dunia.
                </p>
              </div>

              {/* Misi */}
              <div className="relative pl-6 border-l-2 border-tertiary">
                <h3 className="text-2xl font-display font-bold text-primary mb-3">Misi Kami</h3>
                <p className="text-lg font-body text-on-surface-variant leading-relaxed">
                  Mewujudkan solusi konstruksi *end-to-end* yang presisi dan transparan. Kami berkomitmen mendampingi setiap langkah klien—dari goresan sketsa pertama hingga serah terima kunci—dengan dedikasi penuh pada kesempurnaan detail.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
