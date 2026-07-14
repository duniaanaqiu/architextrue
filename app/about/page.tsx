import { Metadata } from "next";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateMetadata, generateBreadcrumbSchema } from "@/lib/utils";

export const metadata: Metadata = generateMetadata({
  title: "Tentang Kami - ARCHITEXTRUE",
  description: "Kenali lebih dalam tentang ARCHITEXTRUE, kontraktor spesialis rumah mewah di Yogyakarta dengan dedikasi pada kualitas sejati.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
  ]);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Tentang ARCHITEXTRUE",
    "description": "Kontraktor spesialis rumah mewah di Yogyakarta dengan pengalaman lebih dari 15 tahun dalam membangun hunian premium.",
    "url": "https://architextrue.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ARCHITEXTRUE",
      "description": "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
      "foundingDate": "2010",
      "founder": {
        "@type": "Person",
        "name": "Tim ARCHITEXTRUE"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "value": "50+"
      },
      "location": {
        "@type": "Place",
        "name": "Yogyakarta, Indonesia"
      }
    }
  };

  return (
    <>
      {/* Structured Data */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={aboutPageSchema} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-section-gap bg-primary text-on-primary">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="max-w-3xl">
              <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg mb-stack-md">
                Tentang ARCHITEXTRUE
              </h1>
              <p className="font-body-lg text-body-lg text-primary-fixed-dim">
                Lebih dari sekadar kontraktor, kami adalah mitra terpercaya dalam mewujudkan hunian impian Anda di Yogyakarta.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-section-gap">
          <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg prose-primary max-w-none">
                <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
                  Visi & Misi Kami
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-stack-lg">
                  <div className="bg-surface rounded-xl p-8 ambient-shadow-1">
                    <h3 className="font-headline-md text-headline-md text-primary mb-4">Visi</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Menjadi kontraktor terdepan dalam pembangunan hunian mewah di Yogyakarta yang dikenal akan kualitas, inovasi, dan kepercayaan.
                    </p>
                  </div>
                  <div className="bg-surface rounded-xl p-8 ambient-shadow-1">
                    <h3 className="font-headline-md text-headline-md text-primary mb-4">Misi</h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Memberikan solusi konstruksi terbaik dengan mengutamakan kualitas material, presisi pengerjaan, dan transparansi proses bagi setiap klien.
                    </p>
                  </div>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
                  Nilai-nilai Kami
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-stack-lg">
                  <div className="text-center">
                    <div className="bg-tertiary-container/10 p-6 rounded-xl mb-4">
                      <div className="h-16 w-16 bg-tertiary-container rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-on-tertiary-container font-bold text-2xl">✓</span>
                      </div>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2">
                      Kualitas
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Tidak ada kompromi untuk kualitas terbaik dalam setiap detail.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-tertiary-container/10 p-6 rounded-xl mb-4">
                      <div className="h-16 w-16 bg-tertiary-container rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-on-tertiary-container font-bold text-2xl">✓</span>
                      </div>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2">
                      Integritas
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Transparansi penuh dalam proses dan komunikasi dengan klien.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="bg-tertiary-container/10 p-6 rounded-xl mb-4">
                      <div className="h-16 w-16 bg-tertiary-container rounded-lg flex items-center justify-center mx-auto">
                        <span className="text-on-tertiary-container font-bold text-2xl">✓</span>
                      </div>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-primary mb-2">
                      Inovasi
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Terus mengikuti perkembangan terbaru dalam teknologi konstruksi.
                    </p>
                  </div>
                </div>

                <h2 className="font-headline-lg text-headline-lg text-primary mb-stack-md">
                  Tim Kami
                </h2>
                
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
                  ARCHITEXTRUE didukung oleh tim profesional dengan pengalaman lebih dari 15 tahun dalam industri konstruksi. Setiap anggota tim kami adalah ahli di bidangnya, mulai dari arsitek, insinyur struktur, hingga ahli finishing yang berdedikasi untuk memberikan hasil terbaik.
                </p>

                <div className="bg-surface rounded-xl p-8 ambient-shadow-1 mt-8">
                  <h3 className="font-headline-md text-headline-md text-primary mb-4">
                    Siap Membangun Bersama Anda
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                    Percayakan hunian impian Anda kepada kami. Dengan ARCHITEXTRUE, setiap proyek bukan sekadar bangunan, melainkan mahakarya kehidupan yang akan Anda tinggali.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/contact"
                      className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-primary-container transition-colors text-center"
                    >
                      Konsultasi Gratis
                    </a>
                    <a
                      href="/portfolio"
                      className="border border-primary text-primary font-label-md text-label-md px-6 py-3 rounded-lg hover:bg-primary hover:text-on-primary transition-colors text-center"
                    >
                      Lihat Portfolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}