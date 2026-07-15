"use client";

import Image from "next/image";
import { Portfolio } from "@prisma/client";

export function FeaturedGallerySection({ portfolios }: { portfolios: Portfolio[] }) {
  const featuredProjects = portfolios.slice(0, 6);

  return (
    <section className="w-full flex flex-col items-center justify-start pt-16 pb-8 md:pt-24 md:pb-12">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
          Mahakarya Terkini
        </h2>
        <p className="text-base md:text-lg text-on-surface-variant max-w-3xl mx-auto font-body">
          Koleksi visual dari karya-karya terbaru kami – setiap sudut dirancang dengan presisi, 
          estetika, dan gaya yang khas.
        </p>
      </div>

      {/* Accordion Gallery */}
      <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-3 md:h-[600px] w-full container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {featuredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="relative group flex-grow transition-all duration-500 ease-out w-full md:w-20 h-[120px] sm:h-[180px] md:h-full rounded-2xl overflow-hidden hover:h-[300px] sm:hover:h-[400px] md:hover:w-[800px] md:hover:h-full cursor-pointer shadow-sm hover:shadow-2xl"
          >
            <Image
              src={project.images[0] || "/images/placeholder.jpg"}
              alt={project.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 md:opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end translate-y-2 md:translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-secondary font-label-md text-sm md:text-base mb-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {project.serviceType === "JASA_BANGUN_RUMAH" ? "Bangun Rumah" : "Renovasi"}
              </span>
              <h3 className="text-white font-display text-xl md:text-3xl font-semibold leading-tight line-clamp-1 group-hover:line-clamp-none drop-shadow-md">
                {project.title}
              </h3>
              <div 
                className="text-white/80 font-body text-sm md:text-base mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2 md:line-clamp-3"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
