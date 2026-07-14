"use client";

import { useEffect } from "react";

export function OrganizationSchema() {
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "ConstructionBusiness",
      "name": "ARCHITEXTRUE",
      "description": "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta.",
      "url": "https://architextrue.com",
      "logo": "https://architextrue.com/logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Kaliurang KM 8",
        "addressLocality": "Yogyakarta",
        "addressRegion": "Yogyakarta",
        "addressCountry": "ID"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62 812 1000 4453",
        "contactType": "Customer Service",
        "email": "info@architextrue.com",
        "availableLanguage": ["Indonesian"]
      },
      "sameAs": [
        // Add social media links here
      ],
      "areaServed": {
        "@type": "State",
        "name": "Yogyakarta"
      }
    };

    // Create script element
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(organizationSchema);
    script.async = true;

    // Add to head
    document.head.appendChild(script);

    // Cleanup
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
}