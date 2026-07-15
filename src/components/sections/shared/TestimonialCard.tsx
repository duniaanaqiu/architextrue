import Image from "next/image";
import { Testimonial } from "@prisma/client";

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-surface p-8 rounded-2xl shadow-sm border border-on-surface/5 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
      <p className="font-body text-on-surface/80 italic mb-8 flex-grow">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-4 mt-auto">
        {testimonial.image ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
            <Image 
              src={testimonial.image} 
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-display font-bold text-lg">
              {testimonial.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-display font-medium text-lg leading-tight mb-1">
            {testimonial.name}
          </h4>
          <p className="text-sm font-body text-on-surface/60 leading-tight">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
