import { MetadataRoute } from "next";

const baseUrl = "https://architextrue.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/jasa-bangun-rumah`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/jasa-renovasi-rumah`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    // Add portfolio project pages dynamically here
    // Add blog post pages dynamically here
  ];

  // Example dynamic routes (in production, these would come from your database)
  const portfolioProjects = [
    { slug: "rumah-modern-tropis-yogyakarta" },
    { slug: "villa-mewah-kaliurang" },
    { slug: "renovasi-rumah-kuno" },
  ];

  const blogPosts = [
    { slug: "tips-membangun-rumah-mewah" },
    { slug: "material-berkualitas-untuk-konstruksi" },
    { slug: "renovasi-rumah-tanpa-ribet" },
  ];

  portfolioProjects.forEach((project) => {
    routes.push({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  });

  blogPosts.forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });
  });

  return routes;
}