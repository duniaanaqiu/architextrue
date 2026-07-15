"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const beforeAfterProjects = [
  {
    id: 1,
    title: "Renovasi Fasad Tropis Modern",
    description: "Mengubah fasad rumah era 90-an menjadi gaya tropis modern dengan roster dan material kayu, meningkatkan sirkulasi udara dan estetika.",
    beforeImage: "/assets/images/home/services1.jpg",
    afterImage: "/assets/images/home/services2.jpg",
  },
  {
    id: 2,
    title: "Ekstensi Ruang Keluarga",
    description: "Memaksimalkan sisa lahan belakang untuk ruang keluarga open space yang menyatu dengan taman dalam (inner courtyard).",
    beforeImage: "/assets/images/home/introduction.jpg",
    afterImage: "/assets/images/home/bg-hero-home.jpg",
  },
  {
    id: 3,
    title: "Penambahan Lantai 2",
    description: "Suntik struktur pondasi dan kolom untuk menambah lantai dua tanpa harus merobohkan bangunan asli lantai dasar.",
    beforeImage: "/assets/images/home/services2.jpg",
    afterImage: "/assets/images/home/services1.jpg",
  }
];

export function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % beforeAfterProjects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + beforeAfterProjects.length) % beforeAfterProjects.length);
  };

  return (
    <section id="before-after" className="py-20 bg-surface-container overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary mb-4">
            Hasil Transformasi Kami
          </h2>
          <p className="text-lg font-body text-on-surface-variant max-w-2xl mx-auto">
            Beberapa hasil proyek renovasi yang telah kami kerjakan. Bukti nyata perubahan drastis yang membawa kenyamanan baru.
          </p>
          
          {/* Desktop Top Bullets (Optional based on user's screenshot, but let's put it below the title as requested) */}
          <div className="hidden md:flex justify-center gap-2 mt-6">
            {beforeAfterProjects.map((_, idx) => (
              <button
                key={`top-dot-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-on-surface/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-on-surface/10 rounded-full items-center justify-center text-primary shadow-sm hover:shadow-md hover:bg-surface transition-all z-10 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-background border border-on-surface/10 rounded-full items-center justify-center text-primary shadow-sm hover:shadow-md hover:bg-surface transition-all z-10 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden rounded-2xl bg-background ambient-shadow-2">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {beforeAfterProjects.map((project) => (
                <div key={project.id} className="w-full shrink-0 flex flex-col md:flex-row">
                  
                  {/* Images Container */}
                  <div className="w-full md:w-2/3 flex flex-col sm:flex-row h-[400px] sm:h-[450px]">
                    <div className="relative w-full sm:w-1/2 h-1/2 sm:h-full">
                      <Image 
                        src={project.beforeImage} 
                        alt={`Before ${project.title}`} 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-error/90 text-on-error px-3 py-1 text-xs font-bold rounded shadow-sm backdrop-blur-sm">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative w-full sm:w-1/2 h-1/2 sm:h-full">
                      <Image 
                        src={project.afterImage} 
                        alt={`After ${project.title}`} 
                        fill 
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-tertiary/90 text-on-tertiary px-3 py-1 text-xs font-bold rounded shadow-sm backdrop-blur-sm">
                        AFTER
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-on-surface/10">
                    <h3 className="text-2xl font-display font-semibold text-on-background mb-4">
                      {project.title}
                    </h3>
                    <p className="text-on-background/80 font-body leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="mt-auto">
                       <span className="text-sm font-medium text-primary">Geser untuk melihat foto lainnya</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Mobile Bottom Bullets */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {beforeAfterProjects.map((_, idx) => (
              <button
                key={`bottom-dot-${idx}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-8 bg-primary' : 'w-2.5 bg-on-surface/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
