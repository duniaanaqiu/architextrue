import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import { TableOfContents, HeadingItem } from "@/components/blog/TableOfContents";
import { BlogCard } from "@/components/blog/BlogCard";
import { Metadata } from "next";
import { StructuredData } from "@/components/shared/StructuredData";
import { generateBreadcrumbSchema, generateArticleSchema, generateWebPageSchema } from "@/lib/utils";

// Helper to generate slug from text
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

// Parse HTML string to inject IDs and extract headings
function processContentAndHeadings(htmlContent: string) {
  const headings: HeadingItem[] = [];
  
  // A simple regex to find h2 and h3 tags, and inject IDs.
  // Note: For a production app with complex HTML, a DOM parser is better,
  // but since we control the Tiptap output, this regex works perfectly.
  const modifiedContent = htmlContent.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match, tag, attrs, innerText) => {
    // Strip nested tags to get plain text for the slug
    const plainText = innerText.replace(/<[^>]+>/g, '').trim();
    const id = slugify(plainText);
    
    // Only push if there's actual text
    if (plainText) {
      headings.push({
        id,
        text: plainText,
        level: parseInt(tag.replace('h', ''), 10)
      });
    }

    // Return the tag with the injected id attribute
    return `<${tag} id="${id}"${attrs}>${innerText}</${tag}>`;
  });

  return { modifiedContent, headings };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({ where: { slug: resolvedParams.slug } });
  if (!post) return {};
  
  return {
    title: `${post.seoTitle || post.title} - ARCHITEXTRUE`,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      images: post.featuredImage ? [post.featuredImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { slug: resolvedParams.slug, isPublished: true },
    include: {
      author: true,
      categories: true,
      tags: true,
    }
  });

  if (!post) {
    notFound();
  }

  const { modifiedContent, headings } = processContentAndHeadings(post.content);

  // Get Previous and Next Post based on publishedAt
  const prevPost = await prisma.post.findFirst({
    where: {
      isPublished: true,
      publishedAt: { lt: post.publishedAt || post.createdAt }
    },
    orderBy: { publishedAt: 'desc' },
    select: { title: true, slug: true }
  });

  const nextPost = await prisma.post.findFirst({
    where: {
      isPublished: true,
      publishedAt: { gt: post.publishedAt || post.createdAt }
    },
    orderBy: { publishedAt: 'asc' },
    select: { title: true, slug: true }
  });

  // Get Related Posts (same category, excluding current post)
  const categoryIds = post.categories.map(c => c.id);
  const relatedPosts = categoryIds.length > 0 ? await prisma.post.findMany({
    where: {
      isPublished: true,
      id: { not: post.id },
      categories: { some: { id: { in: categoryIds } } }
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    include: { categories: true }
  }) : [];

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt))
    : "Baru saja";

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]);

  const articleSchema = generateArticleSchema({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    url: `/blog/${post.slug}`,
    image: post.featuredImage,
    datePublished: (post.publishedAt || post.createdAt).toISOString(),
    dateModified: post.updatedAt.toISOString(),
    authorName: post.author.name || "ARCHITEXTRUE Editor"
  });

  const webpageSchema = generateWebPageSchema({
    name: `${post.seoTitle || post.title} - ARCHITEXTRUE`,
    description: post.seoDescription || post.excerpt,
    url: `/blog/${post.slug}`
  });

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={articleSchema} />
      <StructuredData data={webpageSchema} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Back Link */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-body mb-8">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
        </Link>

        {/* Article Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content (Left, 70%) */}
          <div className="lg:w-8/12">
            {/* Header */}
            <div className="mb-8 space-y-6">
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map(cat => (
                    <span key={cat.id} className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm font-body">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name || "Editor"}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <span>•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" priority />
              </div>
            )}

            {/* Content (Prose) */}
            <article 
              className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-p:text-on-surface prose-a:text-tertiary hover:prose-a:text-tertiary/80 prose-strong:text-primary"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />

            {/* Tags Bottom */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-surface-container flex flex-wrap items-center gap-3">
                <Tag className="w-5 h-5 text-outline" />
                {post.tags.map(tag => (
                  <span key={tag.id} className="px-3 py-1.5 border border-surface-container rounded-lg text-sm text-on-surface hover:border-primary/50 transition-colors cursor-default">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Prev / Next Navigation */}
            <div className="mt-12 pt-8 border-t border-surface-container flex flex-col sm:flex-row justify-between gap-6">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="flex-1 flex flex-col gap-2 group">
                  <span className="text-sm font-semibold text-outline group-hover:text-tertiary transition-colors flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Sebelumnya
                  </span>
                  <span className="font-display font-medium text-primary line-clamp-2">{prevPost.title}</span>
                </Link>
              ) : <div className="flex-1"></div>}
              
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="flex-1 flex flex-col gap-2 text-right group items-end">
                  <span className="text-sm font-semibold text-outline group-hover:text-tertiary transition-colors flex items-center gap-1">
                    Selanjutnya <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="font-display font-medium text-primary line-clamp-2">{nextPost.title}</span>
                </Link>
              ) : <div className="flex-1"></div>}
            </div>
          </div>

          {/* Sidebar (Right, 30%) */}
          <div className="lg:w-4/12 hidden lg:block">
            <TableOfContents headings={headings} />
          </div>

        </div>

        {/* Related Articles Footer */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-surface-container">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-display font-bold text-primary mb-2">Artikel Terkait</h2>
                <p className="text-on-surface-variant font-body">Mungkin Anda juga tertarik dengan ini.</p>
              </div>
              <Link href="/blog" className="text-tertiary font-semibold hover:text-tertiary/80 transition-colors flex items-center gap-1">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(rp => (
                <BlogCard key={rp.id} post={rp} />
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
