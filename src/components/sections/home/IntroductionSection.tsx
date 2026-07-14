"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function IntroductionSection() {
  return (
    <section className="w-full container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
      {/* Image Column */}
      <div className="relative h-[500px] rounded-xl overflow-hidden ambient-shadow-2">
        <div className="relative w-full h-full">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGERgntWrA5zpWNUG3BeSNiqRlUUKpzRWsxMDN4Di0gaSZzxzXgD5fm5ycQV0BEWH2JacF_JDdsDbruwKRwPchlBvWuSy3tf-cPsVuMO7_WZhXqfJOXTK-s1iYzbc_rAvEPZy58lKjcLEWFkGpOhKBFqWh4PtDOq-aAlgN-luJEsbGc7LUvZLYBE_OB9eZT-PzzFAwDAx1X2EbZZYVDMNdxpR9P_b6npSqmtJfQx819757GsB1UYKpUA"
            alt="A meticulously composed close-up photograph of architectural blueprints and a brass compass resting on a pristine white oak desk. Soft, diffused daylight filters through a nearby window, casting subtle, elegant shadows. The scene embodies a premium, minimalist light-mode aesthetic, conveying precision, professional reliability, and high-end design planning."
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </div>

      {/* Content Column */}
      <div className="flex flex-col">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-stack-md">
          Dedikasi Pada Kualitas Sejati
        </h2>
        
        <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
          ARCHITEXTRUE lahir dari pemahaman bahwa sebuah rumah bukan sekadar bangunan, melainkan mahakarya kehidupan. Berbasis di Yogyakarta, kami memadukan kekokohan struktural dengan estetika tropis modern yang elegan.
        </p>
        
        <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
          Dengan pengalaman menangani berbagai proyek hunian premium, tim kami menjamin setiap detail dikerjakan dengan presisi tinggi, menggunakan material terbaik, dan proses yang sepenuhnya transparan.
        </p>

        {/* Values List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-stack-lg">
          <div className="flex items-start gap-3">
            <div className="bg-tertiary-container/10 p-2 rounded-lg">
              <div className="h-8 w-8 bg-tertiary-container rounded-lg flex items-center justify-center">
                <span className="text-on-tertiary-container font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-primary mb-1">
                Material Premium
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                Hanya menggunakan material berkualitas tinggi dan teruji
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-tertiary-container/10 p-2 rounded-lg">
              <div className="h-8 w-8 bg-tertiary-container rounded-lg flex items-center justify-center">
                <span className="text-on-tertiary-container font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-primary mb-1">
                Tim Profesional
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                Tenaga ahli berpengalaman dengan sertifikasi terkini
              </p>
            </div>
          </div>
        </div>

        {/* CTA Link */}
        <div>
          <Button
            variant="link"
            className="inline-flex items-center gap-2 text-primary font-label-md text-label-md hover:text-tertiary group p-0"
            asChild
          >
            <Link href="/about">
              Pelajari Lebih Lanjut
              <ArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>


      </div>
    </section>
  );
}