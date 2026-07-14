import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARCHITEXTRUE - Jasa Bangun Rumah Mewah di Yogyakarta",
    short_name: "ARCHITEXTRUE",
    description: "Kontraktor spesialis rumah mewah dengan kualitas pengerjaan terbaik dan transparan di Yogyakarta",
    start_url: "/",
    display: "standalone",
    background_color: "#041632",
    theme_color: "#041632",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192-maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-desktop.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "ARCHITEXTRUE Desktop Screenshot",
      },
      {
        src: "/screenshot-mobile.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
        label: "ARCHITEXTRUE Mobile Screenshot",
      },
    ],
    categories: ["business", "construction"],
    lang: "id-ID",
    dir: "ltr",
    orientation: "any",
    related_applications: [],
    prefer_related_applications: false,
    shortcuts: [
      {
        name: "Konsultasi Gratis",
        short_name: "Konsultasi",
        description: "Hubungi kami untuk konsultasi gratis",
        url: "/contact",
        icons: [
          {
            src: "/icon-96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
      {
        name: "Portfolio",
        short_name: "Portfolio",
        description: "Lihat proyek-proyek kami",
        url: "/portfolio",
        icons: [
          {
            src: "/icon-96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    ],
  };
}