import { HeroPortfolioSection } from "@/components/sections/portfolio/HeroPortfolioSection";
import { FeaturedGallerySection } from "@/components/sections/portfolio/FeaturedGallerySection";
import { ProjectFilterGridSection } from "@/components/sections/portfolio/ProjectFilterGridSection";
import { CTASection } from "@/components/sections/shared/CTASection";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateBreadcrumbSchema, generateLocalBusinessSchema, generateWebPageSchema } from "@/lib/utils";
import { portfolioData } from "@/lib/data/portfolio";

export const metadata = {
  title: "Portfolio | ARCHITEXTRUE - Koleksi Mahakarya Kami",
  description: "Eksplorasi kumpulan karya terbaik ARCHITEXTRUE, dari bangun baru hingga renovasi rumah mewah.",
};

export default function PortfolioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Portfolio", href: "/portfolio" },
  ]);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": portfolioData.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://architextrue.com/portfolio#${project.id}`,
      "name": project.title
    }))
  };

  const localBusinessSchema = generateLocalBusinessSchema();
  const webpageSchema = generateWebPageSchema({
    name: "Portfolio Mahakarya - ARCHITEXTRUE",
    description: "Eksplorasi kumpulan karya terbaik ARCHITEXTRUE, dari bangun baru hingga renovasi rumah mewah.",
    url: "/portfolio"
  });

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={itemListSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={webpageSchema} />
      
      <HeroPortfolioSection />
      <FeaturedGallerySection />
      <ProjectFilterGridSection />
      <CTASection />
    </main>
  );
}
