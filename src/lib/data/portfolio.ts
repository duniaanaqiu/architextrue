export type ProjectCategory = "Bangun dari Nol" | "Renovasi" | "Arsitektur" | "Interior";

export interface ProjectData {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  image: string;
  description: string;
}

export const portfolioData: ProjectData[] = [
  {
    id: "project-1",
    title: "Modern Tropical Villa",
    category: "Bangun dari Nol",
    location: "Sleman, Yogyakarta",
    year: "2023",
    image: "/assets/images/portfolio/port1.jpg",
    description: "Villa tropis modern dengan desain open-space, memaksimalkan pencahayaan alami dan sirkulasi udara silang."
  },
  {
    id: "project-2",
    title: "Classic Contemporary Residence",
    category: "Bangun dari Nol",
    location: "Bantul, Yogyakarta",
    year: "2024",
    image: "/assets/images/portfolio/port2.jpg",
    description: "Hunian dua lantai bergaya klasik kontemporer yang elegan dengan pilar kokoh dan fasad simetris."
  },
  {
    id: "project-3",
    title: "Panoramic Tropical Villa",
    category: "Bangun dari Nol",
    location: "Kulonprogo, Yogyakarta",
    year: "2023",
    image: "/assets/images/portfolio/port3.jpg",
    description: "Desain villa tropis mewah bergaya resort dengan infinity pool luar ruangan yang menghadap langsung ke perbukitan Menoreh."
  },
  {
    id: "project-4",
    title: "Urban Facade Makeover",
    category: "Renovasi",
    location: "Sleman, Yogyakarta",
    year: "2022",
    image: "/assets/images/portfolio/port4.jpg",
    description: "Renovasi fasad bergaya industrial modern, dilengkapi penambahan kolam renang dan aksen dinding batu alam elegan pada lantai dasar."
  },
  {
    id: "project-5",
    title: "Premium Modern Minimalist Makeover",
    category: "Renovasi",
    location: "Bantul, Yogyakarta",
    year: "2024",
    image: "/assets/images/portfolio/port5.jpg",
    description: "Transformasi total fasad rumah dua lantai menjadi desain modern minimalis premium yang tegas dan elegan."
  },
  {
    id: "project-6",
    title: "Heritage House Extension",
    category: "Renovasi",
    location: "Magelang, Jawa Tengah",
    year: "2023",
    image: "/assets/images/portfolio/port6.jpg",
    description: "Perluasan bangunan rumah gaya kolonial dengan sentuhan modern tanpa menghilangkan karakter aslinya."
  }
];
