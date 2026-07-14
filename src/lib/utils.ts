import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// URL utilities
export function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "https://architextrue.com"
}

export function absoluteUrl(path: string) {
  return `${getBaseUrl()}${path}`
}

// SEO utilities
export function generateMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string
  description: string
  path: string
  image?: string
}) {
  const baseUrl = getBaseUrl()
  const url = `${baseUrl}${path}`
  const ogImage = image || `${baseUrl}/og-image.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  }
}

// Schema.org utilities
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    "name": "ARCHITEXTRUE",
    "image": "https://architextrue.com/logo.png",
    "@id": "https://architextrue.com",
    "url": "https://architextrue.com",
    "telephone": "+62 812 1000 4453",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Kaliurang KM 8",
      "addressLocality": "Yogyakarta",
      "addressRegion": "Yogyakarta",
      "addressCountry": "ID",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-7.7829",
      "longitude": "110.3671",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      "opens": "08:00",
      "closes": "17:00",
    },
    "priceRange": "$$$",
    "serviceArea": {
      "@type": "State",
      "name": "Yogyakarta",
    },
  }
}

export function generateBreadcrumbSchema(paths: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": paths.map((path, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": path.name,
      "item": `${getBaseUrl()}${path.href}`,
    })),
  }
}

// Content utilities
export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function calculateReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}