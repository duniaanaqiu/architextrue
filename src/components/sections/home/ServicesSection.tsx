"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/shared/StructuredData";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "jasa-bangun-rumah",
    title: "Jasa Bangun Rumah",
    description: "Mewujudkan desain impian menjadi struktur nyata dengan pengawasan ketat, material premium, dan timeline yang terukur.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzzbTRD0sJn7YNshfkt9I3pfHlDs1GGKZh8UuTKDMiml3CKpLNxN9yGw_C_YdOCBGI71fisvlp_LgsvBlP2Br1tKQOXr105_8okVaG82Gmmz0HTdImwLnXMooNjBfnvnctVUVL10OCY_hbL8J7xuYQxWn_w-TO2919IjIGuDDEU2rG87a6wmp68A-vfsJDyI72JUh4p3jst-TdjeI4Hz9KOoFTnnuH0268ec_JzDsuj7FgK8WygJRtdA",
    imageAlt: "A bright, airy construction site of a modern luxury villa in its framing stage. Concrete pillars and clean wooden formwork stand strong against a clear blue sky. The image uses a high-key, light-mode palette with crisp contrasts, emphasizing structural integrity and orderly construction processes.",
    features: [
      "Perencanaan Terintegrasi",
      "Manajemen Proyek Profesional",
      "Material Berkualitas Premium",
      "Timeline yang Terukur",
    ],
    href: "/services/jasa-bangun-rumah",
  },
  {
    id: "jasa-renovasi-rumah",
    title: "Jasa Renovasi Rumah",
    description: "Transformasi cerdas untuk menyegarkan tampilan dan fungsi hunian lama Anda menjadi mahakarya modern yang bernilai tinggi.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9u6fnMLkyqFIMXcSCvELHhCGjulJ5Ui1Yp_WU3CajE5lEjIfF5Xv9GvFZkaNG-OD69EkTZkzIx1s3rYU3MyI6ghotWuoYz5FeI2hVhBZHyNoOymEyd8P2e2dbCJ_3-4z2tO34TzNpdZEfAf7vRgPsciLwl1poSay2GdetfD8UbPA1ozgTtBqJ2AIBJ8iaJn7aqnPZ4Vou-N0NREa2pXr47ClGujN-V2pynhML8ld86-VX15HoIRe1KA",
    imageAlt: "A beautifully renovated interior space transitioning from old to new. A sleek, modern minimalist living area with polished concrete floors and warm wood accents, bathed in soft, natural light from expansive windows. The light-mode aesthetic highlights the seamless integration of high-end materials and refined craftsmanship.",
    features: [
      "Audit Struktur Awal",
      "Pembaruan Estetika & Utilitas",
      "Minimal Gangguan Hunian",
      "Peningkatan Nilai Properti",
    ],
    href: "/services/jasa-renovasi-rumah",
  },
];

export function ServicesSection() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": services.map((service) => ({
      "@type": "Service",
      "serviceType": service.title,
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "ConstructionBusiness",
        "name": "ARCHITEXTRUE",
        "url": "https://architextrue.com",
      },
      "areaServed": {
        "@type": "State",
        "name": "Yogyakarta",
      },
      "url": `https://architextrue.com${service.href}`,
    })),
  };

  return (
    <section className="w-full bg-surface-container py-section-gap" id="layanan">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-stack-sm tracking-tight">
            Layanan Unggulan Kami
          </h2>
          <div className="w-16 h-1 bg-tertiary-container mx-auto mb-stack-md"></div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Solusi komprehensif dan terintegrasi untuk mewujudkan hunian mewah yang mencerminkan kepribalian Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* All Services CTA */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            className="px-8 py-4 rounded-lg border-primary text-primary hover:bg-primary hover:text-on-primary"
            size="lg"
            asChild
          >
            <Link href="/services">
              Lihat Semua Layanan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Structured Data for Services */}
        <StructuredData data={serviceSchema} />


      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <Card className="bg-surface rounded-xl ambient-shadow-1 overflow-hidden group hover:-translate-y-2 transition-all duration-500 border border-surface-variant/30">
      {/* Image */}
      <div className="h-72 overflow-hidden relative">
        <div className="relative w-full h-full">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500"></div>
      </div>

      {/* Content */}
      <div className="p-8 md:p-10">
        <h3 className="font-headline-md text-headline-md text-primary mb-stack-md">
          {service.title}
        </h3>
        
        <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-4 mb-stack-lg">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircle className="text-tertiary-container h-5 w-5 flex-shrink-0" />
              <span className="font-label-md text-label-md text-on-surface">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button
          variant="link"
          className="inline-flex items-center gap-2 text-primary font-label-md text-label-md group/link p-0"
          asChild
        >
          <Link href={service.href}>
            <span>Detail Layanan</span>
            <ArrowRight className="text-sm transition-transform group-hover/link:translate-x-2" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}