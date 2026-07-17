
import Image from 'next/image';
import Link from 'next/link';

const featuredProjects = [
  {
    id: 1,
    title: "Villa Tropis Modern",
    location: "Sleman, Yogyakarta",
    image: "/assets/images/jasa-bangun-rumah/Villa-Tropis-Modern.jpg",
    specs: "Luas Bangunan: 450 m² | 2 Lantai | Kolam Renang"
  },
  {
    id: 2,
    title: "Classic Contemporary House",
    location: "Bantul, Yogyakarta",
    image: "/assets/images/jasa-bangun-rumah/Classic-Contemporary-House.jpg",
    specs: "Luas Bangunan: 600 m² | 3 Lantai | Smart Home"
  }
];

export function FeaturedProjectsSection() {
  return (
    <section className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
              Mahakarya Kami
            </h2>
            <p className="text-lg font-body text-on-surface-variant">
              Lihat beberapa proyek bangun rumah mewah yang telah sukses kami selesaikan dengan spesifikasi material tertinggi.
            </p>
          </div>
          <Link href="/portfolio" className="text-primary hover:text-primary/80 font-body font-medium flex items-center gap-2 whitespace-nowrap">
            Lihat Semua Portfolio
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="group rounded-2xl overflow-hidden shadow-lg border border-on-surface/5 bg-background">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 text-white/90 mb-2">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span className="text-sm font-body">{project.location}</span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-white mb-2">
                    {project.title}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-body text-on-surface-variant">
                  {project.specs}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
