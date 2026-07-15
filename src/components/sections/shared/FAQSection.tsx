"use client";

import { useState } from 'react';
import { type FAQItem } from '@/lib/data/faq';

interface FAQSectionProps {
  data: FAQItem[];
}

export function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-20 bg-surface text-on-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-on-surface/80 max-w-2xl mx-auto font-body">
            Temukan jawaban untuk pertanyaan umum seputar layanan dan proses kerja kami.
          </p>
        </div>

        <div className="space-y-4">
          {data.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-lg transition-colors duration-200 ${
                  isOpen ? 'border-primary/50 bg-primary/5' : 'border-on-surface/10 bg-background'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-lg text-on-surface pr-8">
                    {faq.question}
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-300 text-primary ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-0 font-body text-on-surface/80">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
