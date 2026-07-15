"use client";

import { useEffect, useState } from "react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" } // trigger when heading is near the top
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="bg-surface border border-surface-container rounded-3xl p-6 sticky top-24">
      <h3 className="font-display font-bold text-lg text-primary mb-4">Daftar Isi</h3>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={`${heading.level === 3 ? "ml-4" : ""} transition-all duration-300`}
          >
            <a
              href={`#${heading.id}`}
              className={`text-sm font-body block hover:text-primary transition-colors ${
                activeId === heading.id
                  ? "text-primary font-semibold translate-x-1"
                  : "text-on-surface-variant"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
