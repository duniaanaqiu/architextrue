import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Testimonial } from "@prisma/client";
import { TestimonialCard } from "../shared/TestimonialCard";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  const displayTestimonials = testimonials.slice(0, 3);
  const hasMore = testimonials.length > 3;

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {displayTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <Link 
              href="/testimonials"
              className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-on-primary rounded-full font-body font-semibold hover:bg-primary/90 transition-all hover:pr-6"
            >
              Lihat Semua Testimoni
              <ArrowRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
