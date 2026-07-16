import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PostProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | null;
  publishedAt: Date | null;
  readingTime: number;
  categories: Category[];
}

interface BlogCardProps {
  post: PostProps;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(post.publishedAt))
    : "Baru saja";

  return (
    <Link href={`/blog/${post.slug}`} className="group h-full flex flex-col bg-surface border border-surface-container rounded-3xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
            <span className="text-on-surface-variant font-body">No image</span>
          </div>
        )}
        
        {/* Category Badge */}
        {post.categories.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/90 text-on-primary text-xs font-semibold backdrop-blur-sm">
              {post.categories[0].name}
            </span>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <span>•</span>
          <span>{post.readingTime} min read</span>
        </div>

        <h3 className="font-display font-bold text-xl text-primary mb-3 line-clamp-2 group-hover:text-tertiary transition-colors">
          {post.title}
        </h3>
        
        <p className="font-body text-on-surface-variant line-clamp-3 mb-6 flex-grow">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center gap-2 text-primary font-semibold text-sm group-hover:text-tertiary transition-colors">
          Read Article
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
