const testimonials = [
  {
    id: 1,
    name: "Bpk. Hendra",
    role: "Pengusaha",
    content: "ARCHITEXTRUE benar-benar mewujudkan rumah impian keluarga kami. Desainnya sangat mewah, pengerjaannya rapi, dan yang paling penting komunikasinya sangat transparan dari awal hingga akhir.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ibu Sarah",
    role: "Dokter",
    content: "Saya sangat terkesan dengan ketelitian tim ARCHITEXTRUE. Setiap detail diperhatikan dengan seksama. Hasil akhirnya melebihi ekspektasi kami. Sangat direkomendasikan untuk yang mencari kontraktor premium.",
    rating: 5,
  },
  {
    id: 3,
    name: "Bpk. Budi & Keluarga",
    role: "Eksekutif",
    content: "Renovasi rumah lama kami menjadi hunian modern klasik berjalan sangat lancar. Pemilihan material sangat tepat dan manajemen waktunya luar biasa bagus.",
    rating: 5,
  }
];

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-background text-on-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Apa Kata Klien Kami
          </h2>
          <p className="text-on-background/80 max-w-2xl mx-auto font-body">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami. Berikut adalah pengalaman mereka membangun rumah bersama ARCHITEXTRUE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-surface p-8 rounded-2xl shadow-sm border border-on-surface/5 flex flex-col h-full">
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="font-body text-on-surface/80 italic mb-8 flex-grow">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-display font-medium text-lg">
                  {testimonial.name}
                </h4>
                <p className="text-sm font-body text-on-surface/60">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
