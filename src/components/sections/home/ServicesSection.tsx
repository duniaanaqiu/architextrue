"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/shared/StructuredData";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "jasa-bangun-rumah",
    title: "Jasa Bangun Rumah",
    description: "Mewujudkan desain impian menjadi struktur nyata dengan pengawasan ketat, material premium, dan timeline yang terukur.",
    image: "/assets/images/home/services1.jpg",
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
    image: "/assets/images/home/services2.jpg",
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
    <section className="w-full bg-surface-container py-16 md:py-20" id="layanan">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-stack-sm tracking-tight">
            Layanan Unggulan Kami
          </h2>
          <div className="w-16 h-1 bg-tertiary-container mx-auto mb-stack-md"></div>
          <p className="text-lg font-body text-on-surface-variant max-w-2xl mx-auto">
            Solusi komprehensif dan terintegrasi untuk mewujudkan hunian mewah yang mencerminkan kepribalian Anda.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
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
        <h3 className="text-xl md:text-2xl font-display font-medium text-primary mb-stack-md">
          {service.title}
        </h3>

        <p className="text-base font-body text-on-surface-variant mb-stack-lg leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-4 mb-stack-lg">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <Image src="/assets/images/layout/check3.svg" alt="Check" width={20} height={20} className="flex-shrink-0" />
              <span className="text-base font-body font-medium text-on-surface">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={service.href}
          className="inline-flex items-center gap-2 text-primary font-body font-medium text-base group/link hover:opacity-80 transition-opacity"
        >
          <span>Detail Layanan</span>
          <ArrowRight className="text-sm transition-transform group-hover/link:translate-x-2" />
        </Link>
      </div>
    </Card>
  );
}