"use client";

import { useState } from "react";
import Image from "next/image";
import { Portfolio } from "@prisma/client";

const CATEGORIES: ("Semua" | "Bangun dari Nol" | "Renovasi")[] = ["Semua", "Bangun dari Nol", "Renovasi"];

export function ProjectFilterGridSection({ portfolios }: { portfolios: Portfolio[] }) {
  const [activeCategory, setActiveCategory] = useState<"Semua" | "Bangun dari Nol" | "Renovasi">("Semua");
  const [visibleCount, setVisibleCount] = useState(6); // Default 6 items

  const filteredProjects = portfolios.filter((project, index) => {
    if (activeCategory === "Semua") {
      // Jika total portofolio > 6, skip 6 pertama karena sudah tampil di Featured section atasnya.
      // Jika <= 6, tetap tampilkan agar grid tidak kosong.
      if (portfolios.length > 6) {
        return index >= 6;
      }
      return true;
    }
    if (activeCategory === "Bangun dari Nol") return project.serviceType === "JASA_BANGUN_RUMAH";
    if (activeCategory === "Renovasi") return project.serviceType === "JASA_RENOVASI_RUMAH";
    return true;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  // Reset count when category changes
  const handleCategoryChange = (category: "Semua" | "Bangun dari Nol" | "Renovasi") => {
    setActiveCategory(category);
    setVisibleCount(6);
  };

  return (
    <section className="w-full flex flex-col items-center justify-start pt-8 pb-16 md:pt-12 md:pb-24 bg-surface">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 md:mb-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-2">
              Galeri Proyek
            </h2>
            <p className="text-on-surface-variant font-body">
              Eksplorasi kumpulan karya terbaik kami di berbagai kategori.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2 rounded-full font-label-md text-sm transition-all duration-300 ${
                  activeCategory === category 
                    ? "bg-primary text-on-primary ambient-shadow-1" 
                    : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProjects.map((project) => (
            <div key={project.id} className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-surface-container">
              <Image
                src={project.images[0] || "/images/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Overlay content on hover */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-secondary font-label-md text-sm mb-2 block drop-shadow-md">
                    {project.serviceType === "JASA_BANGUN_RUMAH" ? "Bangun Rumah" : "Renovasi"}
                  </span>
                  <h3 className="text-white font-display text-xl md:text-2xl font-semibold mb-1 drop-shadow-md">
                    {project.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
                    <p className="text-white/80 font-body text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                      {project.location}
                    </p>
                    <span className="text-white/60 text-xs font-label-sm border border-white/20 rounded-full px-3 py-1">
                      {new Date(project.completedAt).getFullYear()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="w-full text-center py-20 bg-surface-container rounded-2xl mt-8">
            <p className="text-on-surface-variant font-body">Belum ada proyek yang dipublikasikan di kategori ini.</p>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <div className="w-full flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-8 py-3 rounded-full font-label-md text-on-surface border-[1.5px] border-surface-container-high hover:bg-surface-container transition-all"
            >
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
