"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function IntroductionSection() {
  return (
    <section className="w-full container-max mx-auto px-margin-mobile md:px-margin-desktop pt-12 md:pt-16 pb-8 md:pb-12 grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
      {/* Image Column */}
      <div className="relative h-[500px] rounded-xl overflow-hidden ambient-shadow-2">
        <div className="relative w-full h-full">
          <Image
            src="/assets/images/home/introduction.jpg"
            alt="A meticulously composed close-up photograph of architectural blueprints and a brass compass resting on a pristine white oak desk. Soft, diffused daylight filters through a nearby window, casting subtle, elegant shadows. The scene embodies a premium, minimalist light-mode aesthetic, conveying precision, professional reliability, and high-end design planning."
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
          />
        </div>
      </div>

      {/* Content Column */}
      <div className="flex flex-col h-full justify-center py-4">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-stack-md">
          Dedikasi Pada Kualitas
        </h2>

        <p className="text-base font-body text-on-surface-variant mb-stack-lg">
          ARCHITEXTRUE lahir dari pemahaman bahwa sebuah rumah bukan hanya sebatas bangunan fisik, melainkan mahakarya kehidupan. Berbasis di Yogyakarta, kami memadukan kekokohan struktural dengan estetika tropis modern yang elegan.
        </p>

        <p className="text-base font-body text-on-surface-variant mb-stack-lg">
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
              <h3 className="text-lg font-display font-medium text-primary mb-1">
                Material Premium
              </h3>
              <p className="text-sm font-body text-on-surface-variant">
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
              <h3 className="text-lg font-display font-medium text-primary mb-1">
                Tim Profesional
              </h3>
              <p className="text-sm font-body text-on-surface-variant">
                Tenaga ahli berpengalaman dengan sertifikasi terkini
              </p>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-4 pt-6 border-t border-primary/10">
          <blockquote className="text-xl md:text-2xl font-display italic text-primary/90 leading-relaxed">
            "Sebuah bangunan tidak hanya diukur dari kekokohannya, tetapi dari kehidupan dan memori yang akan tumbuh di dalamnya."
          </blockquote>
          <p className="text-xs font-body text-primary/60 mt-3 font-bold tracking-widest uppercase">
            — Tim ARCHITEXTRUE
          </p>
        </div>

      </div>
    </section>
  );
}