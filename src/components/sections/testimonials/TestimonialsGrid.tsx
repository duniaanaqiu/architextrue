import { Testimonial } from "@prisma/client";
import { TestimonialCard } from "../shared/TestimonialCard";

export function TestimonialsGrid({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) {
    return (
      <div className="w-full text-center py-20 bg-surface-container rounded-2xl">
        <p className="text-on-surface-variant font-body">Belum ada testimonial yang dipublikasikan.</p>
      </div>
    );
  }

  return (
    <section className="w-full flex flex-col items-center justify-start py-8 md:py-12 bg-background">
      <div className="container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
