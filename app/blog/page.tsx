import { prisma } from "@/lib/prisma";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights - ARCHITEXTRUE",
  description: "Temukan artikel terbaru, inspirasi desain, dan tips membangun rumah dari para ahli di ARCHITEXTRUE.",
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section for Blog */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary mb-6 animate-fade-in-up">
            Insights & <span className="text-tertiary">Inspirations</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-body animate-fade-in-up delay-100">
            Jelajahi berbagai artikel menarik seputar arsitektur modern, panduan renovasi, hingga tren desain interior masa kini.
          </p>
        </div>

        {/* Client Component for Search and Filters */}
        <BlogListClient initialPosts={posts} categories={categories} />
        
      </div>
    </main>
  );
}
